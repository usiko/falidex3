import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICirculaire } from 'src/app/models/linked-data-models';
import { CirculaireCollectionService } from 'src/app/services/collection-item/circulaire/circulaire-collection.service';

import { PageItemDetail } from '../../detail-page';
import { IonHeader, IonContent } from "@ionic/angular/standalone";
import { HeaderComponent } from "src/app/components/shared/header/header.component";
import { CirculaireDetailsBlockComponent } from "src/app/components/block/details/circulaire/circulaire-details-block/circulaire-details-block.component";
import { NoItemComponent } from "src/app/components/block/details/no-item/no-item.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-circulaire-details',
    templateUrl: './circulaire-details.component.html',
    styleUrls: ['./circulaire-details.component.scss'],
    imports: [IonHeader, HeaderComponent, IonContent, CirculaireDetailsBlockComponent, NoItemComponent,CommonModule],
})
export class CirculaireDetailsComponent extends PageItemDetail<ICirculaire> implements OnInit {
    constructor(
        protected override collectionService: CirculaireCollectionService,
        protected override changeDetector: ChangeDetectorRef,
        protected override activatedRoute: ActivatedRoute
    ) {
        super();
    }
    ngOnInit() {
        super.init();
    }
}
