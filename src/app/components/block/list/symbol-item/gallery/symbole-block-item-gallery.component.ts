import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISymbol } from 'src/app/models/linked-data-models';
import { ListItem } from '../../list-item';

/**
 * item block of symbole gallery showing
 */
@Component({
    selector: 'app-symbol-block-item-gallery',
    templateUrl: './symbole-block-item-gallery.component.html',
    styleUrls: ['./symbole-block-item-gallery.component.scss'],
})
export class SymbolBlockItemGalleryComponent extends ListItem<ISymbol> implements OnInit {
    
    /**
     * symbole item to show
     */
     @Input() item: ISymbol;

     /**
      * show if this item is specific
      * @deprecated (?)
      */
     @Input() showSpe = true;
 
     /**
      * show navigation arrow
      */
     @Input() navigation = false;

    constructor() {
        super();
    }

    ngOnInit() { }
    click() {
        this.onclick.emit();
    }
}
