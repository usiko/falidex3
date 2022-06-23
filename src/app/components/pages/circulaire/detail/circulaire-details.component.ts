import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICirculaire } from 'src/app/models/linked-data-models';
import { CirculaireCollectionService } from 'src/app/services/collection-item/circulaire/circulaire-collection.service';

import { PageItemDetail } from '../../detail-page';

@Component({
    selector: 'app-circulaire-details',
    templateUrl: './circulaire-details.component.html',
    styleUrls: ['./circulaire-details.component.scss'],
})
export class CirculaireDetailsComponent extends PageItemDetail<ICirculaire> implements OnInit {
    constructor(
        protected collectionService: CirculaireCollectionService,
        protected changeDetector: ChangeDetectorRef,
        protected activatedRoute: ActivatedRoute
    ) {
        super();
    }
    ngOnInit() {
        super.init();
    }
}
