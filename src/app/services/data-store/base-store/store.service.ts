import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    IBaseCirculaire,
    IBaseCirculaireColor,
    IBaseCodeSpe,
    IBaseCollectionData,
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

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    constructor() {}

    // items data
    public circulaires$ = new BehaviorSubject<IBaseCirculaire[]>([]);
    public circulairesColors$ = new BehaviorSubject<IBaseCirculaireColor[]>([]);
    public colors$ = new BehaviorSubject<IBaseColor[]>([]);

    public filieres$ = new BehaviorSubject<IBaseFiliere[]>([]);
    public placements$ = new BehaviorSubject<IBasePlacement[]>([]);
    public positions$ = new BehaviorSubject<IBasePosition[]>([]);
    public significations$ = new BehaviorSubject<IBaseSignification[]>([]);
    public symboles$ = new BehaviorSubject<IBaseSymbol[]>([]);
    public symbolesSens$ = new BehaviorSubject<IBaseSymbolSens[]>([]);
    public symbolesAccessories$ = new BehaviorSubject<IBaseSymbolAcessory[]>([]);

    // links

    public dataRelations$ = new BehaviorSubject<IRelationData[]>([]);
    public currentDataRelations$ = new BehaviorSubject<IRelationData>(null);

    // spe code text

    public codeSpeText$ = new BehaviorSubject<IBaseCodeSpe[]>([]);
}
