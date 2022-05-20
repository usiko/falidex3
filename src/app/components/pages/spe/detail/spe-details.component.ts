import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICodeSpe } from 'src/app/models/linked-data-models';
import { CodeSpeCollectionService } from '../../../../services/collection-item/code-spe/code-spe-collection.service';
import { PageItemDetail } from '../../detail-page';

@Component({
    selector: 'app-spe-details',
    templateUrl: './spe-details.component.html',
    styleUrls: ['./spe-details.component.scss'],
})
export class SpeDetailsComponent extends PageItemDetail<ICodeSpe> implements OnInit {
    constructor(
        protected collectionService: CodeSpeCollectionService,
        protected changeDetector: ChangeDetectorRef,
        protected activatedRoute: ActivatedRoute
    ) {
        super();
    }
    ngOnInit() {
        super.init();
    }
}
