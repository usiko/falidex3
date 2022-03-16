import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBaseCirculaire } from 'src/app/models/base-data-models';
import { IRelationData } from 'src/app/models/base-relations.models';
import { ICirculaire } from 'src/app/models/linked-data-models';
import { SubjectsStoreService } from '../../data-store/subjects-store.service';
import { ICollectionItem } from '../collection.service';

@Injectable({
    providedIn: 'root'
})
export class CirculaireCollectionService extends ICollectionItem<IBaseCirculaire, ICirculaire> {

    baseCollection$ = new BehaviorSubject<any[]>([]);

    // specificité circulaire - color
    colors$ = this.store.colors$;
    colorsRelations$ = this.store.circulairesColors$;
    circulaires$ = this.store.circulaires$;

    constructor(protected store: SubjectsStoreService) {
        super();
        //on va builds avec ces data la aussi donc on les ecoute aussi


    }

    init() {
        super.init();
        this.bindSubjectToBuild(this.store.positions$);
        this.bindSubjectToBuild(this.store.filieres$);
        this.bindSubjectToBuild(this.store.symboles$);
        this.bindSubjectToBuild(this.store.placements$);
        this.colors$.subscribe(() => {
            this.buildColorsCirculaires();
        });
        this.colorsRelations$.subscribe(() => {
            this.buildColorsCirculaires();
        });
        this.circulaires$.subscribe(() => {
            this.buildColorsCirculaires();
        });

    }

    /**
     * les circulaire sont particuliers,
     * ils sont un ensemble de circulaire et de couleur qu'il faut associé dans un premier temps
     */
    private buildColorsCirculaires() {
        const circualires = this.baseCollection$.getValue();
        const colorsRelations = this.colorsRelations$.getValue();
        const circulaires = this.collection$.getValue();

        //build
        this.collection$.next([]);
    }
}
