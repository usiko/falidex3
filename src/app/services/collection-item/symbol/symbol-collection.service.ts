import { Injectable } from '@angular/core';
import { IRelationItem } from 'src/app/models/base-relations.models';
import { ISymbol } from 'src/app/models/linked-data-models';
import { ISubBaseSymbol } from 'src/app/models/sub-base-data-models';
import { SubStoreService } from '../../data-store/sub-store/sub-store.service';
import { ICollectionItem } from '../collection.service';

@Injectable({
    providedIn: 'root'
})
export class SymbolCollectionService extends ICollectionItem<ISubBaseSymbol, ISymbol> {
    protected baseCollection$ = this.store.symboles$;
    constructor(protected store: SubStoreService) {
        super();
    }

    init() {
        super.init();
        this.bindSubjectToBuild(this.store.positions$);
        this.bindSubjectToBuild(this.store.placements$);
        this.bindSubjectToBuild(this.store.symbolesAccessories$);
        this.bindSubjectToBuild(this.store.symbolesSens$);
        this.bindSubjectToBuild(this.store.filieres$);
        this.bindSubjectToBuild(this.store.circulaires$);
    }

    protected linkFinder(item: ISubBaseSymbol, links: IRelationItem[]): IRelationItem[] {
        const returned: IRelationItem[] = [];
        for (const rel of links) {
            //specfik
            if (rel.symboleId === item.id) {
                returned.push(
                    {
                        ...rel,
                        symboleId: undefined
                    }
                );
            }
        }

        return returned;
    }

}
