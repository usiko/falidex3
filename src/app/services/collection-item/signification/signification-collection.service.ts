import { Injectable } from '@angular/core';
import { IBaseCollectionData, IBaseSignification } from 'src/app/models/base-data-models';
import { IRelationData } from 'src/app/models/base-relations.models';
import { ISignification } from 'src/app/models/linked-data-models';
import { SubjectsStoreService } from '../../data-store/subjects-store.service';
import { ICollectionItem } from '../collection.service';

@Injectable({
    providedIn: 'root'
})
export class SignificationCollectionService extends ICollectionItem<IBaseSignification, ISignification> {
    baseCollection$ = this.store.significations$;
    constructor(protected store: SubjectsStoreService) {
        super();
    }

    init() {
        super.init();
        this.bindSubjectToBuild(this.store.positions$);
        this.bindSubjectToBuild(this.store.placements$);
        this.bindSubjectToBuild(this.store.symboles$);
    }
}
