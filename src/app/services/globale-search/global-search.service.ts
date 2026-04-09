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

    private searchText: string = '';
    constructor(
        private symbolCollection: SymbolCollectionService,
        private filiereCollection: FiliereCollectionService,
        private circulaireCollection: CirculaireCollectionService,
        private significationCollection: SignificationCollectionService,
        private codeSpeCollection: CodeSpeCollectionService
    ) {}

    init() {
        this.initCollection(this.symbols$ as any, this.symbolCollection.collection$ as any);
        this.initCollection(this.filieres$ as any, this.filiereCollection.collection$ as any);
        this.initCollection(this.circulaire$ as any, this.circulaireCollection.collection$ as any);
        this.initCollection(this.signification$ as any, this.significationCollection.collection$ as any);
        this.initCollection(this.codeSpe$ as any, this.codeSpeCollection.collection$ as any);
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
                symbols: this.searchInCollection(this.symbols$ as any),
                filieres: this.searchInCollection(this.filieres$ as any),
                circulaire: this.searchInCollection(this.circulaire$ as any),
                signification: this.searchInCollection(this.signification$ as any),
                codeSpe: this.searchInCollection(this.codeSpe$ as any),
            };
            const dependenciesResult = {
                symbols: this.searchInCollectionDependencies(this.symbols$ as any),
                filieres: this.searchInCollectionDependencies(this.filieres$ as any),
                circulaire: this.searchInCollectionDependencies(this.circulaire$ as any),
                signification: this.searchInCollectionDependencies(this.signification$ as any),
                codeSpe: this.searchInCollectionDependencies(this.codeSpe$ as any),
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
                (item as any).content?.toLowerCase().includes(this.searchText.toLowerCase()) ||
                (item as any).text?.toLowerCase().includes(this.searchText.toLowerCase()) ||
                (item as any).note?.toLowerCase().includes(this.searchText.toLowerCase())
            );
        });
    }

    private searchInCollectionDependencies(collection: BehaviorSubject<ICollectionData[]>): ICollectionData[] {
        return collection.getValue().filter((item) => {
            if (!item.links || item.links.length === 0) {
                return false;
            }
            const foundIndex = item.links?.findIndex((link) => {
                for (const key in link) {
                    if (Object.prototype.hasOwnProperty.call(link, key)) {
                        const element = (link as any)[key];
                        if (element) {
                            const found =
                                link.note?.toLowerCase().includes(this.searchText.toLowerCase()) ||
                                element.name?.toLowerCase().includes(this.searchText.toLowerCase()) ||
                                (element as any).content?.toLowerCase().includes(this.searchText.toLowerCase()) ||
                                (element as any).text?.toLowerCase().includes(this.searchText.toLowerCase()) ||
                                (element as any).note?.toLowerCase().includes(this.searchText.toLowerCase());
                            if (found) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            });
            return foundIndex !== -1;
        });
    }

    private initCollection(localCollection:BehaviorSubject<ICollectionData[]>, storeCollection:BehaviorSubject<ICollectionData[]>) {
        storeCollection.subscribe((collection) => {
            localCollection.next(collection);
        });

        localCollection.subscribe(() => {
            this.applySearch();
        });
    }
}
