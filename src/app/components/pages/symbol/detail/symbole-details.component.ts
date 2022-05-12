import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ICollectionLink, IFiliere, ISignification, ISymbol } from 'src/app/models/linked-data-models';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { PageItemDetail } from '../../detail-page';

@Component({
    selector: 'app-symbole-details',
    templateUrl: './symbole-details.component.html',
    styleUrls: ['./symbole-details.component.scss'],
})
export class SymboleDetailsComponent extends PageItemDetail<ISymbol> implements OnInit {
    constructor(
        protected collectionService: SymbolCollectionService,
        protected changeDetector: ChangeDetectorRef,
        protected activatedRoute: ActivatedRoute
    ) {
        super();
    }
    ngOnInit() {
        super.init();
    }
}
