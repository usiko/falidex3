import { Injectable } from '@angular/core';
import { IBaseCodeSpe } from 'src/app/models/base-data-models';
import { ICodeSpe } from 'src/app/models/linked-data-models';
import { SubStoreService } from '../../data-store/sub-store/sub-store.service';
import { ICollectionItem } from '../collection.service';

@Injectable({
    providedIn: 'root',
})
export class CodeSpeCollectionService extends ICollectionItem<IBaseCodeSpe, ICodeSpe> {
    protected baseCollection$ = this.store.codeSpeText$;
    constructor(protected store: SubStoreService) {
        super();
    }

    init() {
        // aucune opération on prends que les info direct
        this.baseCollection$.subscribe((item) => {
            this.collection$.next(item as ICodeSpe[]);
        });
    }
}
