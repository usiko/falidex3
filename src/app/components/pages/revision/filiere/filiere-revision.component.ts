import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFiliere } from 'src/app/models/linked-data-models';
import { FiliereCollectionService } from 'src/app/services/collection-item/filiere/filiere-collection.service';
import { RevisionPage } from '../revision-page';

@Component({
    selector: 'app-filiere-revision',
    templateUrl: './filiere-revision.component.html',
    styleUrls: ['./filiere-revision.component.scss'],
})
export class FiliereRevisionComponent extends RevisionPage<IFiliere> implements OnInit {
    constructor(
        protected collectionService: FiliereCollectionService,
        protected changeDetector: ChangeDetectorRef,
        protected activatedRoute: ActivatedRoute,
        protected routerService: Router
    ) {
        super();
    }

    ngOnInit() {
        this.init();
    }
}
