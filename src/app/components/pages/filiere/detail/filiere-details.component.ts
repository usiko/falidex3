import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFiliere } from 'src/app/models/linked-data-models';
import { FiliereCollectionService } from 'src/app/services/collection-item/filiere/filiere-collection.service';
import { PageItemDetail } from '../../detail-page';
import { IonHeader, IonContent } from "@ionic/angular/standalone";
import { HeaderComponent } from "src/app/components/shared/header/header.component";
import { CommonModule } from '@angular/common';
import { FiliereDetailsBlockComponent } from "src/app/components/block/details/filiere/filiere-details-block/filiere-details-block.component";
import { NoItemComponent } from "src/app/components/block/details/no-item/no-item.component";

@Component({
    selector: 'app-filiere-details',
    templateUrl: './filiere-details.component.html',
    styleUrls: ['./filiere-details.component.scss'],
    imports: [IonHeader, HeaderComponent, IonContent, CommonModule, FiliereDetailsBlockComponent, NoItemComponent],
})
export class FiliereDetailsComponent extends PageItemDetail<IFiliere> implements OnInit {
    constructor(
        protected override collectionService: FiliereCollectionService,
        protected override changeDetector: ChangeDetectorRef,
        protected override activatedRoute: ActivatedRoute
    ) {
        super();
    }
    ngOnInit() {
        super.init();
    }
}
