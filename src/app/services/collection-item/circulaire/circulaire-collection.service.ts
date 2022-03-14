import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubjectsStoreService } from '../../data-store/subjects-store.service';
import { ICollectionItem } from '../collection.service';

@Injectable({
    providedIn: 'root'
})
export class CirculaireCollectionService extends ICollectionItem {

    baseCollection$ = new BehaviorSubject<any[]>([])
    // specificité circulaire - color
    colors$ = this.store.colors$
    colorsRelations$ = this.store.circulairesColors$;
    circulaires$ = this.store.circulaires$;

    constructor(protected store: SubjectsStoreService) {
        super()
        //on va builds avec ces data la aussi donc on les ecoute aussi


    }

    init() {
        super.init();
        this.colors$.subscribe(() => {
            this.buildColorsCirculaires();
        })
        this.colorsRelations$.subscribe(() => {
            this.buildColorsCirculaires();
        })
        this.circulaires$.subscribe(() => {
            this.buildColorsCirculaires();
        })

    }

    private buildColorsCirculaires() {
        const circualires = this.baseCollection$.getValue();
        const colorsRelations = this.colorsRelations$.getValue();
        const circulaires = this.collection$.getValue();
        this.collection$.next([])
    }

    buildCollection() {
        const circulaires = this.collection$.getValue();
        const relation = this.currentRelation$.getValue();
        console.log('build circulaires')
        // build here 
        return circulaires;
    }
}
