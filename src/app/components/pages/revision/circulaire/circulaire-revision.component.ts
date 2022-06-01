import { Component, OnInit } from '@angular/core';
import { ICirculaire, IFiliere } from 'src/app/models/linked-data-models';
import { PageItemList } from '../../pages-list';
import { RevisionPage } from '../revision-page';

@Component({
    selector: 'app-circulaire-revision',
    templateUrl: './circulaire-revision.component.html',
    styleUrls: ['./circulaire-revision.component.scss'],
})
export class CirculaireRevisionComponent extends RevisionPage<ICirculaire> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() {
        this.init();
    }
}
