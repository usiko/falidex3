import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { ICirculaire } from 'src/app/models/linked-data-models';
import { IonItem, IonLabel, IonSkeletonText } from "@ionic/angular/standalone";
import { CirculaireRepresentationComponent } from "src/app/components/shared/circulaire-representation/circulaire-representation.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterLinkPipe } from 'src/app/components/shared/pipes/filter-links.pipe';

/**
 * item block of symbole list showing
 */
@Component({
    selector: 'app-block-circulaire-item-list',
    templateUrl: './circulaire-block-item-list.component.html',
    styleUrls: ['./circulaire-block-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, IonItem, IonLabel, CirculaireRepresentationComponent, FaIconComponent, IonSkeletonText,FilterLinkPipe],
})
export class CirculaireBlockItemListComponent {
    /**
     * symbole item to show
     */
    item = input.required<ICirculaire>();

    /**
     * show if this item is specific
     * @deprecated (?)
     */
    showSpe = input(true);

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
