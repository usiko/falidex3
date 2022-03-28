import { Injectable } from '@angular/core';
import Circulaires from '../../mocks/item-data/circulaires.json';
import CirculairesColors from '../../mocks/item-data/circulaires-colors.json';
import Colors from '../../mocks/item-data/colors.json';
import Filieres from '../../mocks/item-data/filieres.json';
import Significations from '../../mocks/item-data/significations.json';
import Symbols from '../../mocks/item-data/symboles.json';
import SymbolsSens from '../../mocks/item-data/symboles-sens.json';
import SymbolAccessory from '../../mocks/item-data/symbole-accessoire.json';
import Placements from '../../mocks/item-data/placements.json';
import Positions from '../../mocks/item-data/positions.json';
import TLNRelation from '../../mocks/relations/toulon.json';
import NATRelation from '../../mocks/relations/national.json';


import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, take, map } from 'rxjs/operators';
import { IBaseCirculaire, IBaseCirculaireColor, IBaseCollectionData, IBaseColor, IBaseFiliere, IBasePlacement, IBasePosition, IBaseSignification, IBaseSymbol, IBaseSymbolAcessory, IBaseSymbolSens } from 'src/app/models/base-data-models';
import { StoreService } from '../base-store/store.service';

@Injectable({
    providedIn: 'root'
})
export class DataLoaderStoreService {

    constructor(private store: StoreService) { }

    loadCollection(): void {
        this.dispactIntoSubject(this.loadCirculaires(), this.store.circulaires$);
        this.dispactIntoSubject(this.loadCirculairesColors(), this.store.circulairesColors$);
        this.dispactIntoSubject(this.loadColors(), this.store.colors$);
        this.dispactIntoSubject(this.loadFilieres(), this.store.filieres$);
        this.dispactIntoSubject(this.loadSymbols(), this.store.symboles$);
        this.dispactIntoSubject(this.loadSymbolsSens(), this.store.symbolesSens$);
        this.dispactIntoSubject(this.loadSymbolsAccessory(), this.store.symbolesAccessories$);
        this.dispactIntoSubject(this.loadPlacements(), this.store.placements$);
        this.dispactIntoSubject(this.loadPositions(), this.store.positions$);
        this.dispactIntoSubject(this.loadSignifications(), this.store.significations$);
    }

    loadRelations(): void {
        of([TLNRelation, NATRelation]).subscribe((items) => {
            console.log('relation loaded');
            this.store.dataRelations$.next(items);
            console.log('relation selected');
            this.store.currentDataRelations$.next(items[0]);
        });
    }

    private loadCirculaires(): Observable<IBaseCirculaire[]> {
        return of(Circulaires);
    }

    private loadCirculairesColors(): Observable<IBaseCirculaireColor[]> {
        return of(CirculairesColors);
    }

    private loadColors(): Observable<IBaseColor[]> {
        return of(Colors);
    }

    private loadFilieres(): Observable<IBaseFiliere[]> {
        return of(Filieres);
    }
    private loadSignifications(): Observable<IBaseSignification[]> {
        return of(Significations);
    }
    private loadSymbols(): Observable<IBaseSymbol[]> {
        return of(Symbols);
    }
    private loadSymbolsSens(): Observable<IBaseSymbolSens[]> {
        return of(SymbolsSens);
    }
    private loadSymbolsAccessory(): Observable<IBaseSymbolAcessory[]> {
        return of(SymbolAccessory);
    }
    private loadPlacements(): Observable<IBasePlacement[]> {
        return of(Placements);
    }
    private loadPositions(): Observable<IBasePosition[]> {
        return of(Positions);
    }

    private dispactIntoSubject(obs: Observable<IBaseCollectionData[]>, subject: BehaviorSubject<IBaseCollectionData[]>) {
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
                subject.next(items);
            });
    }

}
