import { Injectable } from '@angular/core';
import { IRelationItem } from 'src/app/models/base-relations.models';
import { ISignification } from 'src/app/models/linked-data-models';
import { ISubBaseSignification } from 'src/app/models/sub-base-data-models';
import { SubStoreService } from '../../data-store/sub-store/sub-store.service';
import { ICollectionItem } from '../collection.service';

@Injectable({
    providedIn: 'root'
})
export class SignificationCollectionService extends ICollectionItem<ISubBaseSignification, ISignification> {
    protected baseCollection$ = this.store.significations$;
    constructor(protected store: SubStoreService) {
        super();
    }

    init() {
        super.init();
        this.bindSubjectToBuild(this.store.positions$);
        this.bindSubjectToBuild(this.store.placements$);
        this.bindSubjectToBuild(this.store.symboles$);
        this.bindSubjectToBuild(this.store.symbolesAccessories$);
        this.bindSubjectToBuild(this.store.symbolesSens$);
    }

    protected linkFinder(item: ISubBaseSignification, links: IRelationItem[]): IRelationItem[] {
        const returned: IRelationItem[] = [];
        for (const rel of links) {
            //specfik
            if (rel.significationId === item.id) {
                returned.push(
                    {
                        ...rel,
                        significationId: undefined
                    }
                );
            }
        }

        return returned;
    }
}
