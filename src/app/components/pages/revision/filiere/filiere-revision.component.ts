import { Component, OnInit } from '@angular/core';
import { IFiliere } from 'src/app/models/linked-data-models';
import { RevisionPage } from '../revision-page';

@Component({
    selector: 'app-filiere-revision',
    templateUrl: './filiere-revision.component.html',
    styleUrls: ['./filiere-revision.component.scss'],
})
export class FiliereRevisionComponent extends RevisionPage<IFiliere> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() {
        this.init();
    }
}
