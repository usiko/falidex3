import { Component, OnInit } from '@angular/core';
import { ISymbol } from 'src/app/models/linked-data-models';
import { ISubBaseSymbol } from 'src/app/models/sub-base-data-models';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { PageItemList } from '../../pages-list';


@Component({
    selector: 'app-symbol-list',
    templateUrl: './symbol-list.component.html',
    styleUrls: ['./symbol-list.component.scss'],
})
export class SymbolListComponent extends PageItemList<ISymbol> implements OnInit {
    showScrollTopBtn = true;
    constructor(protected collectionService: SymbolCollectionService, protected events: EventService) {
        super();
    }

    ngOnInit() {
        super.init();
    }




}
