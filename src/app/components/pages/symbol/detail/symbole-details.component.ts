import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ICollectionLink, IFiliere, ISignification, ISymbol } from 'src/app/models/linked-data-models';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { PageItemDetail } from '../../detail-page';
import { IonHeader, IonContent } from "@ionic/angular/standalone";
import { SymboleDetailsBlockComponent } from "src/app/components/block/details/symbole/symbole-details-block/symbole-details-block.component";
import { NoItemComponent } from "src/app/components/block/details/no-item/no-item.component";
import { HeaderComponent } from "src/app/components/shared/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-symbole-details',
    templateUrl: './symbole-details.component.html',
    styleUrls: ['./symbole-details.component.scss'],
    imports: [IonHeader, IonContent, SymboleDetailsBlockComponent, NoItemComponent, HeaderComponent,CommonModule],
})
export class SymboleDetailsComponent extends PageItemDetail<ISymbol> implements OnInit {
    constructor(
        protected override collectionService: SymbolCollectionService,
        protected override changeDetector: ChangeDetectorRef,
        protected override activatedRoute: ActivatedRoute
    ) {
        super();
    }
    ngOnInit() {
        super.init();
    }
}
