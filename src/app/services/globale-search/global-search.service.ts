import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICirculaire, ICodeSpe, ICollectionData, IFiliere, ISignification, ISymbol } from 'src/app/models/linked-data-models';
import { CirculaireCollectionService } from '../collection-item/circulaire/circulaire-collection.service';
import { CodeSpeCollectionService } from '../collection-item/code-spe/code-spe-collection.service';
import { FiliereCollectionService } from '../collection-item/filiere/filiere-collection.service';
import { SignificationCollectionService } from '../collection-item/signification/signification-collection.service';
import { SymbolCollectionService } from '../collection-item/symbol/symbol-collection.service';

@Injectable({
    providedIn: 'root',
})
export class GlobalSearchService {
    symbols$ = new BehaviorSubject<ISymbol[]>([]);
    filieres$ = new BehaviorSubject<IFiliere[]>([]);
    circulaire$ = new BehaviorSubject<ICirculaire[]>([]);
    signification$ = new BehaviorSubject<ISignification[]>([]);
    codeSpe$ = new BehaviorSubject<ICodeSpe[]>([]);

    searchResult$ = new BehaviorSubject({
        symbols: [],
        filieres: [],
        circulaire: [],
        signification: [],
        codeSpe: [],
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
            symbols: [],
            filieres: [],
            circulaire: [],
            signification: [],
            codeSpe: [],
        });
    }

    private applySearch() {
        if (this.searchText && this.searchText.trim().length > 0) {
            this.searchResult$.next({
                symbols: this.searchInCollection(this.symbols$),
                filieres: this.searchInCollection(this.filieres$),
                circulaire: this.searchInCollection(this.circulaire$),
                signification: this.searchInCollection(this.signification$),
                codeSpe: this.searchInCollection(this.codeSpe$),
            });
        } else {
            this.resetSearch();
        }
    }

    private searchInCollection(collection: BehaviorSubject<ICollectionData[]>) {
        return collection.getValue().filter((item) => {
            return (
                item.name?.toLowerCase().includes(this.searchText.toLowerCase()) ||
                (item as any).content?.toLowerCase().includes(this.searchText.toLowerCase())
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
