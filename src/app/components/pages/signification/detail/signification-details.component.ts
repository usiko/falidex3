import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISignification } from 'src/app/models/linked-data-models';
import { SignificationCollectionService } from 'src/app/services/collection-item/signification/signification-collection.service';
import { PageItemDetail } from '../../detail-page';

@Component({
    selector: 'app-signification-details',
    templateUrl: './signification-details.component.html',
    styleUrls: ['./signification-details.component.scss'],
})
export class SignificationDetailsComponent extends PageItemDetail<ISignification> implements OnInit {
    constructor(
        protected collectionService: SignificationCollectionService,
        protected changeDetector: ChangeDetectorRef,
        protected activatedRoute: ActivatedRoute
    ) {
        super();
    }
    ngOnInit() {
        super.init();
    }
}
