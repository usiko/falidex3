import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICirculaire, ICollectionLink, IFiliere, ISignification, ISymbol } from 'src/app/models/linked-data-models';
import { ISubBaseCirculaire, ISubBaseFiliere, ISubBaseSignification } from 'src/app/models/sub-base-data-models';
import { ListItem } from '../../list-item';


@Component({
    selector: 'app-block-symbol-item-list',
    templateUrl: './symbole-block-item-list.component.html',
    styleUrls: ['./symbole-block-item-list.component.scss'],
})
export class SymbolBlockItemListComponent extends ListItem<ISymbol> implements OnInit {

    @Input() item: ISymbol;
    @Input() showSpe = true;
    @Input() navigation = false;



    constructor() {
        super()
    }

    ngOnInit() { }

    click() {
        this.onclick.emit();
    }

}
