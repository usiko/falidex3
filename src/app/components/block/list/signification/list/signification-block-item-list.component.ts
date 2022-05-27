import { Component, Input, OnInit } from '@angular/core';
import { ISignification } from 'src/app/models/linked-data-models';
import { ListItem } from '../../list-item';

@Component({
    selector: 'app-signification-block-item-list',
    templateUrl: './signification-block-item-list.component.html',
    styleUrls: ['./signification-block-item-list.component.scss'],
})
export class SignificationBlockItemListComponent extends ListItem<ISignification> implements OnInit {
    @Input() item: ISignification;

    /**
     * show navigation arrow
     */
    @Input() navigation: string = null;

    constructor() {
        super();
    }

    ngOnInit() {}
}
