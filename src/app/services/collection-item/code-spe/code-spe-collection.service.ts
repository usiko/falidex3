import { Injectable } from '@angular/core';
import { IRelationItem } from 'src/app/models/base-relations.models';
import { IFiliere } from 'src/app/models/linked-data-models';
import { ISubBaseFiliere } from 'src/app/models/sub-base-data-models';
import { ICodeSpe } from '../../../models/base-data-models';
import { SubStoreService } from '../../data-store/sub-store/sub-store.service';
import { ICollectionItem } from '../collection.service';

@Injectable({
	providedIn: 'root',
})
export class CodeSpeCollectionService extends ICollectionItem<ICodeSpe, ICodeSpe> {
	protected baseCollection$ = this.store.codeSpeText$;
	constructor(protected store: SubStoreService) {
		super();
	}

	init() {
		super.init();
	}
}
