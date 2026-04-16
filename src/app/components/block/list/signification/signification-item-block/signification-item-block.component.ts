import { Component, input } from '@angular/core';
import { ISignification } from 'src/app/models/linked-data-models';
import { IonItem, IonLabel } from "@ionic/angular/standalone";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { CommonModule } from '@angular/common';
import { FilterLinkPipe } from 'src/app/components/shared/pipes/filter-links.pipe';


@Component({
    selector: 'app-signification-item-block',
    templateUrl: './signification-item-block.component.html',
    styleUrls: ['./signification-item-block.component.scss'],
    imports: [IonItem, IonLabel, FaIconComponent,CommonModule,FilterLinkPipe],
})
export class SignificationItemBlockComponent {
    signification = input.required<ISignification>();

    constructor() { }
}
