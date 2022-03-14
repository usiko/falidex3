import { Injectable } from '@angular/core';
import { IBaseCollectionData } from 'src/app/models/base-data-models';
import { IRelationData } from 'src/app/models/base-relations.models';
import { SubjectsStoreService } from '../../data-store/subjects-store.service';
import { ICollectionItem } from '../collection.service';

@Injectable({
    providedIn: 'root'
})
export class SignificationCollectionService extends ICollectionItem {
    baseCollection$ = this.store.significations$;
    constructor(protected store: SubjectsStoreService) {
        super()
    }
    buildCollection(collection: IBaseCollectionData[], relation: IRelationData) {
        console.log('build signification')

        // build here 
        return collection;
    }

    init() {
        super.init();
        this.bindSubjectToBuild(this.store.positions$);
        this.bindSubjectToBuild(this.store.placements$);
    }
}
