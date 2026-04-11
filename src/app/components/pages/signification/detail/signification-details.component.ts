import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISignification } from 'src/app/models/linked-data-models';
import { SignificationCollectionService } from 'src/app/services/collection-item/signification/signification-collection.service';
import { PageItemDetail } from '../../detail-page';
import { IonHeader, IonContent } from "@ionic/angular/standalone";
import { HeaderComponent } from "src/app/components/shared/header/header.component";
import { SignificationDetailsBlockComponent } from "src/app/components/block/details/signification/signification-details-block/signification-details-block.component";
import { NoItemComponent } from "src/app/components/block/details/no-item/no-item.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signification-details',
    templateUrl: './signification-details.component.html',
    styleUrls: ['./signification-details.component.scss'],
    imports: [IonHeader, HeaderComponent, IonContent, SignificationDetailsBlockComponent, NoItemComponent,CommonModule],
})
export class SignificationDetailsComponent extends PageItemDetail<ISignification> implements OnInit {
    constructor(
        protected override collectionService: SignificationCollectionService,
        protected override changeDetector: ChangeDetectorRef,
        protected override activatedRoute: ActivatedRoute
    ) {
        super();
    }
    ngOnInit() {
        super.init();
    }
}
