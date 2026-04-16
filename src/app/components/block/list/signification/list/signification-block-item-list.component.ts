import { Component, input, output } from '@angular/core';
import { ISignification } from 'src/app/models/linked-data-models';
import { IonItem, IonLabel } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { FilterLinkPipe } from 'src/app/components/shared/pipes/filter-links.pipe';

@Component({
    selector: 'app-signification-block-item-list',
    templateUrl: './signification-block-item-list.component.html',
    styleUrls: ['./signification-block-item-list.component.scss'],
    imports: [CommonModule, RouterModule, IonItem, IonLabel, FaIconComponent,FilterLinkPipe],
})
export class SignificationBlockItemListComponent {
    item = input.required<ISignification>();

    /**
     * show navigation arrow
     */
    navigation = input<string|null>(null);

    onclick = output<void>();

    constructor() {}

    click() {
        this.onclick.emit();
    }
}
