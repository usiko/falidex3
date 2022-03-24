import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISymbol } from 'src/app/models/linked-data-models';
import { ListItem } from '../../list-item';

@Component({
    selector: 'app-symbole-item-gallery',
    templateUrl: './symbole-item-gallery.component.html',
    styleUrls: ['./symbole-item-gallery.component.scss'],
})
export class SymboleItemGalleryComponent extends ListItem<ISymbol> implements OnInit {
    @Input() item: ISymbol;
    @Input() showSpe = true;
    @Input() navigation = false;
    constructor() {
        super();
    }

    ngOnInit() { }
    click() {
        this.onclick.emit();
    }
}
