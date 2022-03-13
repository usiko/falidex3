import { Injectable } from '@angular/core';
import Circulaires from '../mocks/item-data/circulaires.json';
import CirculairesColors from '../mocks/item-data/circulaires-colors.json';
import Colors from '../mocks/item-data/colors.json';
import Filieres from '../mocks/item-data/filieres.json';
import Significations from '../mocks/item-data/significations.json';
import Symbols from '../mocks/item-data/symboles.json';
import Placements from '../mocks/item-data/placements.json';
import Positions from '../mocks/item-data/positions.json';
import { Observable, of } from 'rxjs';
import { IBaseCirculaire, IBaseCirculaireColor, IBaseColor, IBaseFiliere, IBasePlacement, IBasePosition, IBaseSignification, IBaseSymbol } from 'src/app/models/base-data-models';

@Injectable({
    providedIn: 'root'
})
export class DataStoreService {

    constructor() { }

    getCirculaires(): Observable<IBaseCirculaire[]> {
        return of(Circulaires)
    }

    getCirculairesColors(): Observable<IBaseCirculaireColor[]> {
        return of(CirculairesColors)
    }

    getColors(): Observable<IBaseColor[]> {
        return of(Colors)
    }

    getFilieres(): Observable<IBaseFiliere[]> {
        return of(Filieres)
    }
    getSignifications(): Observable<IBaseSignification[]> {
        return of(Significations)
    }
    getSymbols(): Observable<IBaseSymbol[]> {
        return of(Symbols)
    }
    getPlacements(): Observable<IBasePlacement[]> {
        return of(Placements)
    }
    getPositions(): Observable<IBasePosition[]> {
        return of(Positions)
    }
}
