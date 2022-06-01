import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICirculaire } from 'src/app/models/linked-data-models';
import { CirculaireCollectionService } from 'src/app/services/collection-item/circulaire/circulaire-collection.service';
import { RevisionPage } from '../revision-page';

@Component({
    selector: 'app-circulaire-revision',
    templateUrl: './circulaire-revision.component.html',
    styleUrls: ['./circulaire-revision.component.scss'],
})
export class CirculaireRevisionComponent extends RevisionPage<ICirculaire> implements OnInit {
    constructor(
        protected collectionService: CirculaireCollectionService,
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
