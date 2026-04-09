import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IFiliere } from 'src/app/models/linked-data-models';
import { IonItem, IonLabel, IonSkeletonText } from "@ionic/angular/standalone";
import { CirculaireRepresentationComponent } from "src/app/components/shared/circulaire-representation/circulaire-representation.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { CommonModule } from '@angular/common';
import { FilterLinkPipe } from 'src/app/components/shared/pipes/filter-links.pipe';

@Component({
    selector: 'app-filiere-nosymb-block-item-list',
    templateUrl: './filiere-nosymb-block-item-list.component.html',
    styleUrls: ['./filiere-nosymb-block-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IonItem, IonLabel, CirculaireRepresentationComponent, FaIconComponent, IonSkeletonText,FilterLinkPipe],
})
export class FiliereNosymbBlockItemListComponent {
    item = input.required<IFiliere>();
    showSpe = input(true);
    navigation = input<string|null>(null);
    cssClass = input<string|undefined>();

    onclick = output<void>();

    constructor() {}

    click() {
        this.onclick.emit();
    }
}
