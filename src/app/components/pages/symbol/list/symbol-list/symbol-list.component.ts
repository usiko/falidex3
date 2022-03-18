import { Component, OnInit } from '@angular/core';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';

@Component({
    selector: 'app-symbol-list',
    templateUrl: './symbol-list.component.html',
    styleUrls: ['./symbol-list.component.scss'],
})
export class SymbolListComponent implements OnInit {
    showScrollTopBtn = true;
    constructor(private service: SymbolCollectionService) { }
    items$ = this.service.collection$
    ngOnInit() { }
    search(ev) {

    }
    scrolling(ev) {

    }

    scrollToTop() {

    }


}
