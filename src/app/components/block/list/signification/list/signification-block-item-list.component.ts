import { Component, Input, OnInit } from '@angular/core';
import { ISignification } from 'src/app/models/linked-data-models';

@Component({
    selector: 'app-signification-block-item-list',
    templateUrl: './signification-block-item-list.component.html',
    styleUrls: ['./signification-block-item-list.component.scss'],
})
export class SignificationBlockItemListComponent implements OnInit {
    @Input() signification: ISignification;

    constructor() {}

    ngOnInit() {}
}
