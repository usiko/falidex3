import { Component, Input, OnInit } from '@angular/core';
import { ISignification } from 'src/app/models/linked-data-models';
import { IonItem, IonLabel } from "@ionic/angular/standalone";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";


@Component({
    selector: 'app-signification-item-block',
    templateUrl: './signification-item-block.component.html',
    styleUrls: ['./signification-item-block.component.scss'],
    imports: [IonItem, IonLabel, FaIconComponent],
})
export class SignificationItemBlockComponent implements OnInit {
    @Input() signification: ISignification;

    constructor() { }

    ngOnInit() { }

}
