import { Component, Input, OnInit } from '@angular/core';
import { IFiliere } from 'src/app/models/linked-data-models';
import { ListItem } from '../../list-item';

@Component({
    selector: 'app-filiere-nosymb-block-item-list',
    templateUrl: './filiere-nosymb-block-item-list.component.html',
    styleUrls: ['./filiere-nosymb-block-item-list.component.scss'],
})
export class FiliereNosymbBlockItemListComponent extends ListItem<IFiliere> implements OnInit {
    @Input() item: IFiliere;
    @Input() showSpe = true;
    @Input() navigation: string = null;
    @Input() cssClass: string;

    constructor() {
        super();
    }

    ngOnInit() {}
}
