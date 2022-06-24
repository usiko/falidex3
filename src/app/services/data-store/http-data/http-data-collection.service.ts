import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

@Injectable({
    providedIn: 'root',
})
export class HttpDataCollectionService {
    constructor(private config: ConfigService, private http: HttpClient) {}

    getCirculaires(): Observable<IBaseCirculaire[]> {
        const url = this.getUrl('circulaires');
        return this.http.get(url) as Observable<IBaseCirculaire[]>;
    }

    getCirculaireColors(): Observable<IBaseCirculaireColor[]> {
        const url = this.getUrl('circulaireColors');
        return this.http.get(url) as Observable<IBaseCirculaireColor[]>;
    }
    getSymbols(): Observable<IBaseSymbol[]> {
        const url = this.getUrl('symbols');
        return this.http.get(url) as Observable<IBaseSymbol[]>;
    }
    getSymbolsSens(): Observable<IBaseSymbolSens[]> {
        const url = this.getUrl('symbolSens');
        return this.http.get(url) as Observable<ISymbol[]>;
    }
    getSymbolsAccessories(): Observable<IBaseSymbolAcessory[]> {
        const url = this.getUrl('symbolAccessories');
        return this.http.get(url) as Observable<IBaseSymbolAcessory[]>;
    }
    getSignifications(): Observable<IBaseSignification[]> {
        const url = this.getUrl('significations');
        return this.http.get(url) as Observable<IBaseSignification[]>;
    }
    getFilieres(): Observable<IBaseFiliere[]> {
        const url = this.getUrl('filieres');
        return this.http.get(url) as Observable<IBaseFiliere[]>;
    }
    getColors(): Observable<IBaseColor[]> {
        const url = this.getUrl('colors');
        return this.http.get(url) as Observable<IBaseColor[]>;
    }
    getPlacements(): Observable<IBasePlacement[]> {
        const url = this.getUrl('placements');
        return this.http.get(url) as Observable<IBasePlacement[]>;
    }
    getPositions(): Observable<IBasePosition[]> {
        const url = this.getUrl('positions');
        return this.http.get(url) as Observable<IBasePosition[]>;
    }
    getDataLink(): Observable<IRelationData[]> {
        const url = this.getUrl('dataLink');
        return this.http.get(url) as Observable<IRelationData[]>;
    }

    private getUrl(pathKey: string) {
        const config = this.config.getConfig();
        if (config.urls?.dataServer && config.paths && config.paths[pathKey]) {
            return config.urls?.dataServer + '/' + config.paths[pathKey];
        } else {
            console.warn('no path', pathKey);
        }
    }
}
