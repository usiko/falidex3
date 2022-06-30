import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identity, Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class PictureService {
    constructor(private config: ConfigService, private http: HttpClient, private storage: StorageService) {}
    pictureIndexer: {
        [key: string]: number;
    } = {};

    init() {
        return this.storage.get('pictureIndexer', {}).pipe(
            tap((data) => {
                this.pictureIndexer = data;
            })
        );
    }
    getFullResourceUrl(src: string) {
        if (src && src[0] == '/') {
            src = src.slice(1);
        }
        const config = this.config.getConfig();
        if (config) {
            const baseUrl = config.urls.pictureServer;
            const salt = config.pictureServerSalt;
            if (baseUrl && src) {
                if (salt) {
                    return `${baseUrl}?getPicture=${src}&littleSalty=${salt}`;
                } else {
                    return `${baseUrl}?getPicture?=${src}`;
                }
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    preload(src) {
        if (src && src[0] == '/') {
            src = src.slice(1);
        }
        const params = {};
        if (this.pictureIndexer && this.pictureIndexer[src]) {
            params['mtime'] = this.pictureIndexer[src];
        }
        return this.http
            .get(this.getFullResourceUrl(src), {
                responseType: 'blob',
                params,
            })
            .pipe(
                mergeMap((blob) => {
                    if (blob.size > 0) {
                        return this.blobToBase64(blob).pipe(
                            mergeMap((base64) => {
                                console.log(src, 'saved');
                                this.pictureIndexer[src] = new Date().getTime() / 1000;
                                this.updateIndexer();
                                return this.storage.set('picture-' + src, base64);
                            })
                        );
                    } else {
                        console.log('storage already up to date');
                        return of(null);
                    }
                }),
                catchError((error) => {
                    console.log('preload', error);
                    return of(undefined);
                })
            );
    }

    blobToBase64(blob): Observable<string> {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Observable((obs) => {
            reader.onloadend = () => {
                obs.next(reader.result as string);
                obs.complete();
            };
            reader.onerror = () => {
                obs.error();
                obs.complete();
            };
        });
    }

    getBase64(src): Observable<string> {
        if (src && src[0] == '/') {
            src = src.slice(1);
        }

        if (this.pictureIndexer[src]) {
            return this.storage.get('picture-' + src, undefined).pipe(
                mergeMap((data) => {
                    if (!data && data == 'data:') {
                        delete this.pictureIndexer[src];
                        this.updateIndexer();
                        return throwError('unable to get base64');
                    } else {
                        return of(data);
                    }
                })
            );
        } else {
            return throwError('no base 64 indexed');
        }
    }

    public deleteResource(src): void {
        if (src && src[0] == '/') {
            src = src.slice(1);
        }
        if (this.pictureIndexer[src]) {
            this.storage.remove('picture-' + src).subscribe(
                () => {
                    delete this.pictureIndexer[src];
                    this.updateIndexer();
                    console.log(src, 'deleted');
                },
                (error) => {
                    console.log('fail delete', src, error);
                }
            );
        }
    }

    private updateIndexer(): void {
        this.storage.set('pictureIndexer', this.pictureIndexer).subscribe();
    }
}
