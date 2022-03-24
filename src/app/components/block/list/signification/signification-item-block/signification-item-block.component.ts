import { Component, Input, OnInit } from '@angular/core';
import { ISignification } from 'src/app/models/linked-data-models';


@Component({
    selector: 'app-signification-item-block',
    templateUrl: './signification-item-block.component.html',
    styleUrls: ['./signification-item-block.component.scss'],
})
export class SignificationItemBlockComponent implements OnInit {
    @Input() signification: ISignification;

    constructor() { }

    ngOnInit() { }

}
