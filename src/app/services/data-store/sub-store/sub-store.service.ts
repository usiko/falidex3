import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { IBaseCirculaire, IBaseCirculaireColor, IBaseColor, IBaseCollectionData, IBaseCodeSpe } from 'src/app/models/base-data-models';
import { ICirculaire } from 'src/app/models/linked-data-models';
import {
    ISubBaseCirculaire,
    ISubBaseCollectionData,
    ISubBaseFiliere,
    ISubBasePlacement,
    ISubBasePosition,
    ISubBaseSignification,
    ISubBaseSymbol,
    ISubBaseSymbolAcessory,
    ISubSymbolSens,
} from 'src/app/models/sub-base-data-models';
import { StoreService } from '../base-store/store.service';

@Injectable({
    providedIn: 'root',
})
export class SubStoreService {
    constructor(private store: StoreService) {}

    // items data debouncers Debouncer  //limitations des appels successifs
    private circulairesDebouncer$ = new BehaviorSubject<ISubBaseCirculaire[]>([]);
    private filieresDebouncer$ = new BehaviorSubject<ISubBaseFiliere[]>([]);
    private placementsDebouncer$ = new BehaviorSubject<ISubBasePlacement[]>([]);
    private positionsDebouncer$ = new BehaviorSubject<ISubBasePosition[]>([]);
    private significationsDebouncer$ = new BehaviorSubject<ISubBaseSignification[]>([]);
    private symbolesDebouncer$ = new BehaviorSubject<ISubBaseSymbol[]>([]);
    private symbolesSensDebouncer$ = new BehaviorSubject<ISubSymbolSens[]>([]);
    private symbolesAccessoryDebouncer$ = new BehaviorSubject<ISubBaseSymbolAcessory[]>([]);

    // items data
    public circulaires$ = new BehaviorSubject<ISubBaseCirculaire[]>([]);
    public filieres$ = new BehaviorSubject<ISubBaseFiliere[]>([]);
    public placements$ = new BehaviorSubject<ISubBasePlacement[]>([]);
    public positions$ = new BehaviorSubject<ISubBasePosition[]>([]);
    public significations$ = new BehaviorSubject<ISubBaseSignification[]>([]);
    public symboles$ = new BehaviorSubject<ISubBaseSymbol[]>([]);
    public symbolesSens$ = new BehaviorSubject<ISubSymbolSens[]>([]);
    public symbolesAccessories$ = new BehaviorSubject<ISubSymbolSens[]>([]);

    // links

    public dataRelations$ = this.store.dataRelations$;
    public currentDataRelations$ = this.store.currentDataRelations$;

    public codeSpeText$: BehaviorSubject<IBaseCodeSpe[]> = this.store.codeSpeText$;

    public getItemById(id: string, subject: BehaviorSubject<ISubBaseCollectionData[]>): ISubBaseCollectionData {
        const items = subject.getValue();
        const find = items.find((item) => {
            return item.id === id;
        });
        if (!find) {
            console.warn('not found', id, items);
        }
        return find;
    }

    private listenStore(
        storeSubjects: BehaviorSubject<IBaseCollectionData[]>[],
        debouncer: BehaviorSubject<ISubBaseCollectionData[]>,
        localSubject: BehaviorSubject<ISubBaseCollectionData[]>,
        adapter?: (IBaseCollectionData) => ISubBaseCollectionData[]
    ) {
        debouncer.pipe(debounceTime(500)).subscribe((items) => {
            localSubject.next(items);
        });

        storeSubjects.map((subject) => {
            subject
                .pipe(
                    map((item) => {
                        if (!adapter) {
                            return item;
                        }
                        return adapter(item as ISubBaseCollectionData[]);
                    })
                )
                .subscribe((items) => {
                    console.log('substore fire', items.length);
                    debouncer.next(items);
                });
        });
    }

    public init() {
        this.listenStore([this.store.significations$], this.significationsDebouncer$, this.significations$);
        this.listenStore([this.store.filieres$], this.filieresDebouncer$, this.filieres$);
        this.listenStore([this.store.placements$], this.placementsDebouncer$, this.placements$);
        this.listenStore([this.store.positions$], this.positionsDebouncer$, this.positions$);
        this.listenStore([this.store.symboles$], this.symbolesDebouncer$, this.symboles$);
        this.listenStore([this.store.symbolesSens$], this.symbolesSensDebouncer$, this.symbolesSens$);
        this.listenStore([this.store.symbolesAccessories$], this.symbolesAccessoryDebouncer$, this.symbolesAccessories$);

        /**
         * assemblage circulaires et couleurs
         */
        this.listenStore(
            [this.store.circulaires$, this.store.colors$, this.store.circulairesColors$],
            this.circulairesDebouncer$,
            this.circulaires$,
            (items) => {
                const circulaires: IBaseCirculaire[] = this.store.circulaires$.getValue();
                const colors: IBaseColor[] = this.store.colors$.getValue();
                const circulairesColors: IBaseCirculaireColor[] = this.store.circulairesColors$.getValue();
                return circulaires.map((circulaire: IBaseCirculaire) => {
                    const localcolors = [];
                    const rel = circulairesColors.find((item) => {
                        return item.circulaireId === circulaire.id;
                    });
                    if (rel) {
                        for (const colorId of rel.colorIds) {
                            const localcolor = colors.find((item) => item.id === colorId);
                            if (localcolor) {
                                localcolors.push(localcolor);
                            }
                        }
                    }
                    return {
                        ...circulaire,
                        colors: localcolors,
                    } as ISubBaseCirculaire;
                });
            }
        );
        this.codeSpeText$.subscribe((item) => {
            console.log(item);
        });
        this.currentDataRelations$.subscribe((relations) => {
            if (relations) {
                this.store.codeSpeText$.next(relations.specificites);
            }
        });
    }
}
