import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICirculaire, ICodeSpe, ICollectionData, IFiliere, ISignification, ISymbol } from 'src/app/models/linked-data-models';
import { CirculaireCollectionService } from '../collection-item/circulaire/circulaire-collection.service';
import { CodeSpeCollectionService } from '../collection-item/code-spe/code-spe-collection.service';
import { FiliereCollectionService } from '../collection-item/filiere/filiere-collection.service';
import { SignificationCollectionService } from '../collection-item/signification/signification-collection.service';
import { SymbolCollectionService } from '../collection-item/symbol/symbol-collection.service';
export interface IGlobalResult {
    symbols: ICollectionData[];
    filieres: ICollectionData[];
    circulaire: ICollectionData[];
    signification: ICollectionData[];
    codeSpe: ICollectionData[];
    total: number;
}
@Injectable({
    providedIn: 'root',
})
export class GlobalSearchService {
    symbols$ = new BehaviorSubject<ISymbol[]>([]);
    filieres$ = new BehaviorSubject<IFiliere[]>([]);
    circulaire$ = new BehaviorSubject<ICirculaire[]>([]);
    signification$ = new BehaviorSubject<ISignification[]>([]);
    codeSpe$ = new BehaviorSubject<ICodeSpe[]>([]);

    searchResult$ = new BehaviorSubject<{
        mainResult: IGlobalResult;
        dependenciesResult: IGlobalResult;
    }>({
        mainResult: {
            symbols: [],
            filieres: [],
            circulaire: [],
            signification: [],
            codeSpe: [],
            total: 0,
        },
        dependenciesResult: {
            symbols: [],
            filieres: [],
            circulaire: [],
            signification: [],
            codeSpe: [],
            total: 0,
        },
    });

    private searchText: string;
    constructor(
        private symbolCollection: SymbolCollectionService,
        private filiereCollection: FiliereCollectionService,
        private circulaireCollection: CirculaireCollectionService,
        private significationCollection: SignificationCollectionService,
        private codeSpeCollection: CodeSpeCollectionService
    ) {}

    init() {
        this.initCollection(this.symbols$, this.symbolCollection.collection$);
        this.initCollection(this.filieres$, this.filiereCollection.collection$);
        this.initCollection(this.circulaire$, this.circulaireCollection.collection$);
        this.initCollection(this.signification$, this.significationCollection.collection$);
        this.initCollection(this.codeSpe$, this.codeSpeCollection.collection$);
    }

    updateSearchText(searchText: string) {
        this.searchText = searchText;
        this.applySearch();
    }

    resetSearch() {
        this.searchResult$.next({
            mainResult: {
                symbols: [],
                filieres: [],
                circulaire: [],
                signification: [],
                codeSpe: [],
                total: 0,
            },
            dependenciesResult: {
                symbols: [],
                filieres: [],
                circulaire: [],
                signification: [],
                codeSpe: [],
                total: 0,
            },
        });
    }

    private applySearch() {
        if (this.searchText && this.searchText.trim().length > 0) {
            const mainResult = {
                symbols: this.searchInCollection(this.symbols$),
                filieres: this.searchInCollection(this.filieres$),
                circulaire: this.searchInCollection(this.circulaire$),
                signification: this.searchInCollection(this.signification$),
                codeSpe: this.searchInCollection(this.codeSpe$),
            };
            const dependenciesResult = {
                symbols: this.searchInCollectionDependencies(this.symbols$),
                filieres: this.searchInCollectionDependencies(this.filieres$),
                circulaire: this.searchInCollectionDependencies(this.circulaire$),
                signification: this.searchInCollectionDependencies(this.signification$),
                codeSpe: this.searchInCollectionDependencies(this.codeSpe$),
            };
            this.searchResult$.next({
                mainResult: {
                    ...mainResult,
                    total:
                        mainResult.circulaire.length +
                        mainResult.codeSpe.length +
                        mainResult.filieres.length +
                        mainResult.signification.length +
                        mainResult.symbols.length,
                },
                dependenciesResult: {
                    ...dependenciesResult,
                    total:
                        dependenciesResult.circulaire.length +
                        dependenciesResult.codeSpe.length +
                        dependenciesResult.filieres.length +
                        dependenciesResult.signification.length +
                        dependenciesResult.symbols.length,
                },
            });
        } else {
            this.resetSearch();
        }
    }

    private searchInCollection(collection: BehaviorSubject<ICollectionData[]>): ICollectionData[] {
        return collection.getValue().filter((item) => {
            return (
                item.name?.toLowerCase().includes(this.searchText.toLowerCase()) ||
                (item as any).content?.toLowerCase().includes(this.searchText.toLowerCase())
            );
        });
    }

    private searchInCollectionDependencies(collection: BehaviorSubject<ICollectionData[]>): ICollectionData[] {
        return collection.getValue().filter((item) => {
            return (
                item.links?.findIndex((link) => {
                    for (const key in link) {
                        if (Object.prototype.hasOwnProperty.call(link, key)) {
                            const element = link[key];
                            return (
                                element.name?.toLowerCase().includes(this.searchText.toLowerCase()) ||
                                (element as any).content?.toLowerCase().includes(this.searchText.toLowerCase())
                            );
                        }
                    }
                }) !== -1
            );
        });
    }

    private initCollection(localCollection, storeCollection) {
        storeCollection.subscribe((collection) => {
            localCollection.next(collection);
        });

        localCollection.subscribe(() => {
            this.applySearch();
        });
    }
}
