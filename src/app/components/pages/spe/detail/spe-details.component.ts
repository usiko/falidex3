import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICodeSpe } from 'src/app/models/linked-data-models';
import { CodeSpeCollectionService } from '../../../../services/collection-item/code-spe/code-spe-collection.service';
import { PageItemDetail } from '../../detail-page';
import { IonHeader, IonContent } from "@ionic/angular/standalone";
import { HeaderComponent } from "src/app/components/shared/header/header.component";
import { SpeDetailsBlockComponent } from "src/app/components/block/details/spe/spe-details-block.component";
import { NoItemComponent } from "src/app/components/block/details/no-item/no-item.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-spe-details',
    templateUrl: './spe-details.component.html',
    styleUrls: ['./spe-details.component.scss'],
    imports: [IonHeader, HeaderComponent, IonContent, SpeDetailsBlockComponent, NoItemComponent,CommonModule],
})
export class SpeDetailsComponent extends PageItemDetail<ICodeSpe> implements OnInit {
    constructor(
        protected override collectionService: CodeSpeCollectionService,
        protected override changeDetector: ChangeDetectorRef,
        protected override activatedRoute: ActivatedRoute
    ) {
        super();
    }
    ngOnInit() {
        super.init();
    }
}
