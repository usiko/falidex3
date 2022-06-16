import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, forkJoin, Observable } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { FileSystemService } from '../../capacitor/file-system.service';
import { StorageService } from '../../storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class PicturePreloaderService {
    pictureIndex: {
        [key: string]: {
            localPath: string;
            modificationDate: string;
        };
    } = {};
    constructor(private http: HttpClient, private storageService: StorageService, private fileSystem: FileSystemService) {}
    init() {
        return this.storageService.get('pictureIndex', {}).pipe(
            map((storage) => {
                this.pictureIndex = storage;
            })
        );
    }
    preloadAll(pictures: { id: string; src: string; modificationDate: Date }[]): void {
        const obs = pictures.map((pic) => {
            return this.http.get(pic.src).pipe(
                catchError(() => {
                    return of(null);
                }),
                switchMap((src) => {
                    if (src) {
                        if (src.modificationDate !== pic.modificationDate) {
                            return this.fileSystem.savePicture(pic.src, pic.id);
                        } else {
                            return of(null);
                        }
                    } else {
                        return of(null);
                    }
                }),
                catchError(() => {
                    //handle local fail
                    return of(null);
                }),
                switchMap((localPath) => {
                    if (localPath) {
                        return this.updateIndex(src, localPath);
                    } else {
                        return of(null);
                    }
                })
            );
        });
        return forkJoin([...src, removeUnused]);
    }

    getLocalPath(src): string {
        return this.pictureIndex[src] ? this.pictureIndex[src].localPath : src;
    }

    getFromStorage(key: string): Observable<{
        localPath: string;
        modificationDate: string;
    }> {
        return this.storageService.get('pictureIndex', {}).pipe(
            map((storage) => {
                return storage[key];
            })
        );
    }

    private setToStorage(
        key: string,
        value: {
            localPath: string;
            modificationDate: string;
        }
    ): Observable<never> {
        return this.storageService.get('pictureIndex', {}).pipe(
            mergeMap((storage) => {
                storage[key] = value;
                return this.storageService.set('pictureIndex', storage);
            })
        );
    }

    private updateIndex(picture: { id: string; src: string; modificationDate: Date }, localPath: string): Observable<never> {
        return this.setToStorage(picture.src, {
            localPath,
            modificationDate: picture.modificationDate,
        }).pipe(
            map((storage) => {
                this.pictureIndex = storage;
            })
        );
    }

    private removeUnused(pictures: string[]) {
        return this.storageService.get('pictureIndex', {}).pipe(
            mergeMap((storage) => {
                const usedKeys = Object.keys(storage).filter((key) => pictures.includes(key));
                const newStorage = {};
                for (const key of usedKeys) {
                    newStorage[key] = storage[key];
                }
                this.pictureIndex = newStorage;
                return this.storageService.set('pictureIndex', newStorage);
            })
        );
    }
}
