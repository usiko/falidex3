import { Injectable } from '@angular/core';
import Circulaires from '../mocks/item-data/circulaires.json';
import CirculairesColors from '../mocks/item-data/circulaires-colors.json';
import Colors from '../mocks/item-data/colors.json';
import Filieres from '../mocks/item-data/filieres.json';
import Significations from '../mocks/item-data/significations.json';
import Symbols from '../mocks/item-data/symboles.json';
import Placements from '../mocks/item-data/placements.json';
import Positions from '../mocks/item-data/positions.json';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, take, map } from 'rxjs/operators';
import { IBaseCirculaire, IBaseCirculaireColor, IBaseCollectionData, IBaseColor, IBaseFiliere, IBasePlacement, IBasePosition, IBaseSignification, IBaseSymbol } from 'src/app/models/base-data-models';
import { SubjectsStoreService } from './subjects-store.service';

@Injectable({
    providedIn: 'root'
})
export class DataStoreService {

    constructor(private store: SubjectsStoreService) { }

    loadCollection(): void {
        this.dispactIntoSubject(this.loadCirculaires(), this.store.circulaires$);
        this.dispactIntoSubject(this.loadCirculairesColors(), this.store.circulairesColors$);
        this.dispactIntoSubject(this.loadColors(), this.store.colors$);
        this.dispactIntoSubject(this.loadFilieres(), this.store.filieres$);
        this.dispactIntoSubject(this.loadSymbols(), this.store.symboles$);
        this.dispactIntoSubject(this.loadPlacements(), this.store.placements$);
        this.dispactIntoSubject(this.loadPositions(), this.store.positions$);
        this.dispactIntoSubject(this.loadSignifications(), this.store.circulaires$);
    }

    private loadCirculaires(): Observable<IBaseCirculaire[]> {
        return of(Circulaires)
    }

    private loadCirculairesColors(): Observable<IBaseCirculaireColor[]> {
        return of(CirculairesColors)
    }

    private loadColors(): Observable<IBaseColor[]> {
        return of(Colors)
    }

    private loadFilieres(): Observable<IBaseFiliere[]> {
        return of(Filieres)
    }
    private loadSignifications(): Observable<IBaseSignification[]> {
        return of(Significations)
    }
    private loadSymbols(): Observable<IBaseSymbol[]> {
        return of(Symbols)
    }
    private loadPlacements(): Observable<IBasePlacement[]> {
        return of(Placements)
    }
    private loadPositions(): Observable<IBasePosition[]> {
        return of(Positions)
    }

    private dispactIntoSubject(obs: Observable<IBaseCollectionData[]>, subjects: BehaviorSubject<IBaseCollectionData[]>) {
        obs
            .pipe(
                take(1),
                map((items) => {
                    console.log(items.length, 'items loaded');
                    return items;
                }),
                catchError((error) => {
                    console.error(error);
                    return of([]);
                })
            )
            .subscribe(items => {
                subjects.next(items);
            })
    }



}
