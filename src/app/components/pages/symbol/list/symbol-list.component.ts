import { Component, OnInit } from '@angular/core';
import { ISymbol } from 'src/app/models/linked-data-models';
import { ISubBaseSymbol } from 'src/app/models/sub-base-data-models';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
import { PageItemList } from '../../pages-list';


@Component({
    selector: 'app-symbol-list',
    templateUrl: './symbol-list.component.html',
    styleUrls: ['./symbol-list.component.scss'],
    providers: [ListManagerService]
})
export class SymbolListComponent extends PageItemList<ISymbol> implements OnInit {
    showScrollTopBtn = true;
    constructor(
        protected collectionService: SymbolCollectionService,
        protected events: EventService,
        protected listManagerService: ListManagerService<ISymbol>) {
        super();
    }

    ngOnInit() {
        super.init();
    }




}
