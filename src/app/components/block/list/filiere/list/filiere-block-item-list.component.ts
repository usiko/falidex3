import { Component, OnInit, Input } from '@angular/core';
import { IFiliere } from 'src/app/models/linked-data-models';
import { ListItem } from '../../list-item';

@Component({
    selector: 'app-filiere-block-item-list',
    templateUrl: './filiere-block-item-list.component.html',
    styleUrls: ['./filiere-block-item-list.component.scss'],
})
export class FiliereBlockItemListComponent extends ListItem<IFiliere> implements OnInit {
    @Input() item: IFiliere;
    @Input() showSpe = true;
    @Input() navigation: string = null;

    constructor() {
        super();
    }

    ngOnInit() {}
}
