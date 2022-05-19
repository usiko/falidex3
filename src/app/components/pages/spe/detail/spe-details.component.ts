
  
import { Component, OnInit } from '@angular/core';
import { SpesService } from 'src/app/services/page-data-services/spes/spes.service';
import { TextSpe } from 'src/app/models/models';
import { ActivatedRoute } from '@angular/router';
import { CodeSpeCollectionService } from '../../../../services/collection-item/code-spe/code-spe-collection.service';

@Component({
    selector: 'app-spe-details',
    templateUrl: './spe-details.component.html',
    styleUrls: ['./spe-details.component.scss'],
})
export class SpeDetailsComponent   extends PageItemDetail<ICodeSpe> implements OnInit {

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