import { Component, OnInit } from '@angular/core';
import { ISubBaseSymbol } from 'src/app/models/sub-base-data-models';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { PageItemList } from '../../../pages-list';

@Component({
    selector: 'app-symbol-list',
    templateUrl: './symbol-list.component.html',
    styleUrls: ['./symbol-list.component.scss'],
})
export class SymbolListComponent extends PageItemList<ISubBaseSymbol> implements OnInit {
    showScrollTopBtn = true;
    constructor(protected collectionService: SymbolCollectionService) {
        super();
    }

    ngOnInit() {
        super.init();
    }



}
