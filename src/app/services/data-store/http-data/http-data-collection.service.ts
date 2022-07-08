import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
    IBaseCirculaire,
    IBaseCirculaireColor,
    IBaseColor,
    IBaseFiliere,
    IBasePlacement,
    IBasePosition,
    IBaseSignification,
    IBaseSymbol,
    IBaseSymbolAcessory,
    IBaseSymbolSens,
} from 'src/app/models/base-data-models';
import { IRelationData } from 'src/app/models/base-relations.models';
import { ICirculaire, ISymbol } from 'src/app/models/linked-data-models';
import { ConfigService } from '../../config/config.service';
import { StorageService } from '../../storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class HttpDataCollectionService {
    constructor(private config: ConfigService, private http: HttpClient, private storageService: StorageService) {}

    isAllStored(): boolean {
        if (!this.getStorageEnabled()) {
            return false;
        }
        const keys = Object.keys(this.config.getConfig().paths);
        const values = keys.map((key) => this.storageService.getAge(key));
        if (values.length != keys.length) {
            return false;
        }
        for (const val of values) {
            if (!val) {
                return false;
            }
        }
        return true;
    }

    getCirculaires(): Observable<IBaseCirculaire[]> {
        const url = this.getUrl('circulaires');
        return this.http.get(url).pipe(
            map((data: any) => {
                return this.mapData(data, 'circulaires');
            }),
            catchError((error) => {
                return this.handleError('circulaires', error);
            })
        ) as Observable<IBaseCirculaire[]>;
    }

    getCirculaireColors(): Observable<IBaseCirculaireColor[]> {
        const url = this.getUrl('circulaireColors');
        return this.http.get(url).pipe(
            map((data: any) => {
                return this.mapData(data, 'circulaireColors');
            }),
            catchError((error) => {
                return this.handleError('circulaireColors', error);
            })
        ) as Observable<IBaseCirculaireColor[]>;
    }
    getSymbols(): Observable<IBaseSymbol[]> {
        const url = this.getUrl('symbols');
        return this.http.get(url).pipe(
            map((data: any) => {
                return this.mapData(data, 'symbols');
            }),
            catchError((error) => {
                return this.handleError('symbols', error);
            })
        ) as Observable<IBaseSymbol[]>;
    }
    getSymbolsSens(): Observable<IBaseSymbolSens[]> {
        const url = this.getUrl('symbolSens');
        return this.http.get(url).pipe(
            map((data: any) => {
                return this.mapData(data, 'symbolSens');
            }),
            catchError((error) => {
                return this.handleError('symbolSens', error);
            })
        ) as Observable<ISymbol[]>;
    }
    getSymbolsAccessories(): Observable<IBaseSymbolAcessory[]> {
        const url = this.getUrl('symbolAccessories');
        return this.http.get(url).pipe(
            map((data: any) => {
                return this.mapData(data, 'symbolAccessories');
            }),
            catchError((error) => {
                return this.handleError('symbolAccessories', error);
            })
        ) as Observable<IBaseSymbolAcessory[]>;
    }
    getSignifications(): Observable<IBaseSignification[]> {
        const url = this.getUrl('significations');
        return this.http.get(url).pipe(
            map((data: any) => {
                return this.mapData(data, 'significations');
            }),
            catchError((error) => {
                return this.handleError('significations', error);
            })
        ) as Observable<IBaseSignification[]>;
    }
    getFilieres(): Observable<IBaseFiliere[]> {
        const url = this.getUrl('filieres');
        return this.http.get(url).pipe(
            map((data: any) => {
                return this.mapData(data, 'filieres');
            }),
            catchError((error) => {
                return this.handleError('filieres', error);
            })
        ) as Observable<IBaseFiliere[]>;
    }
    getColors(): Observable<IBaseColor[]> {
        const url = this.getUrl('colors');
        return this.http.get(url).pipe(
            map((data: any) => {
                return this.mapData(data, 'colors');
            }),
            catchError((error) => {
                return this.handleError('colors', error);
            })
        ) as Observable<IBaseColor[]>;
    }
    getPlacements(): Observable<IBasePlacement[]> {
        const url = this.getUrl('placements');
        return this.http.get(url).pipe(
            map((data: any) => {
                return this.mapData(data, 'placements');
            }),
            catchError((error) => {
                return this.handleError('placements', error);
            })
        ) as Observable<IBasePlacement[]>;
    }
    getPositions(): Observable<IBasePosition[]> {
        const url = this.getUrl('positions');
        return this.http.get(url).pipe(
            map((data: any) => {
                return this.mapData(data, 'positions');
            }),
            catchError((error) => {
                return this.handleError('positions', error);
            })
        ) as Observable<IBasePosition[]>;
    }
    getDataLink(): Observable<IRelationData[]> {
        const url = this.getUrl('dataLink');
        return this.http.get(url).pipe(
            map((data: any) => {
                return this.mapData(data, 'dataLink');
            }),
            catchError((error) => {
                if (this.getStorageEnabled()) {
                    return this.storageService.get('dataLink', undefined).pipe(
                        mergeMap((data) => {
                            if (!data) {
                                return of([]);
                            } else {
                                return of(data);
                            }
                        })
                    );
                } else {
                    return of([]);
                }
            }),
            mergeMap((items: { name: string; id: string }[]) => {
                if (items?.length == 0) {
                    return of([]);
                }
                return forkJoin(
                    items.map((item) => {
                        return this.getDataLinkItem(url, item.id);
                    })
                );
            })
        ) as Observable<IRelationData[]>;
    }

    getDataLinkItem(url, id: string): Observable<IRelationData> {
        return this.http.get(url + '/' + id).pipe(
            tap((data) => {
                this.storageService.set(url + '-' + id, data).subscribe();
            }),
            catchError((error) => {
                return this.storageService.get(url + '-' + id, undefined).pipe(
                    catchError((storageError) => {
                        console.warn(storageError);
                        return throwError(error);
                    })
                );
            })
        ) as Observable<IRelationData>;
    }

    private mapData(data: any, url: string) {
        if (this.getStorageEnabled()) {
            this.storageService.set(url, data).subscribe();
        }
        return data;
    }

    private handleError(url: string, error): Observable<any> {
        if (this.getStorageEnabled()) {
            return this.storageService.get(url, undefined).pipe(
                map((data) => {
                    return data;
                }),
                catchError((storageError) => {
                    return of([]);
                })
            );
        } else {
            return of([]);
        }
    }

    private getUrl(pathKey: string) {
        const config = this.config.getConfig();
        if (config.urls?.dataServer && config.paths && config.paths[pathKey]) {
            return config.urls?.dataServer + '/' + config.paths[pathKey];
        } else {
            console.warn('no path', pathKey);
        }
    }

    private getStorageEnabled(): boolean {
        const conf = this.config.getConfig();
        return conf?.storeEnabled;
    }
}
