import { Injectable } from '@angular/core';
import { IRelationItem } from 'src/app/models/base-relations.models';
import { ICirculaire, ICollectionLink } from 'src/app/models/linked-data-models';
import { ISubBaseCirculaire } from 'src/app/models/sub-base-data-models';
import { SubStoreService } from '../../data-store/sub-store/sub-store.service';
import { ICollectionItem } from '../collection.service';

@Injectable({
    providedIn: 'root'
})
export class CirculaireCollectionService extends ICollectionItem<ISubBaseCirculaire, ICirculaire> {
    protected baseCollection$ = this.store.circulaires$;
    constructor(protected store: SubStoreService) {
        super();
        //on va builds avec ces data la aussi donc on les ecoute aussi


    }

    init() {
        super.init();
        this.bindSubjectToBuild(this.store.positions$);
        this.bindSubjectToBuild(this.store.filieres$);
        this.bindSubjectToBuild(this.store.symboles$);
        this.bindSubjectToBuild(this.store.placements$);
        this.bindSubjectToBuild(this.store.symbolesAccessories$);
        this.bindSubjectToBuild(this.store.symbolesSens$);
    }

    protected linkFinder(item: ISubBaseCirculaire, links: IRelationItem[]): IRelationItem[] {
        const returned: IRelationItem[] = [];
        for (const rel of links) {
            //specfik
            if (rel.circulaireId === item.id) {
                returned.push(
                    {
                        ...rel,
                        circulaireId: undefined
                    }
                );
            }
        }

        return returned;
    }
}
