import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFiliere } from 'src/app/models/linked-data-models';
import { FiliereCollectionService } from 'src/app/services/collection-item/filiere/filiere-collection.service';
import { PageItemDetail } from '../../detail-page';

@Component({
    selector: 'app-filiere-details',
    templateUrl: './filiere-details.component.html',
    styleUrls: ['./filiere-details.component.scss'],
})
export class FiliereDetailsComponent extends PageItemDetail<IFiliere> implements OnInit {
    constructor(
        protected collectionService: FiliereCollectionService,
        protected changeDetector: ChangeDetectorRef,
        protected activatedRoute: ActivatedRoute
    ) {
        super();
    }
    ngOnInit() {
        super.init();
    }
}
