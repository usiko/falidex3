import { Component, ChangeDetectionStrategy, computed, input, output } from '@angular/core';
import { IFiliere } from 'src/app/models/linked-data-models';
import { IonItem, IonThumbnail, IonLabel, IonSkeletonText } from "@ionic/angular/standalone";
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";
import { CirculaireRepresentationComponent } from "src/app/components/shared/circulaire-representation/circulaire-representation.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterLinkPipe } from 'src/app/components/shared/pipes/filter-links.pipe';

@Component({
    selector: 'app-filiere-block-item-list',
    templateUrl: './filiere-block-item-list.component.html',
    styleUrls: ['./filiere-block-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, IonItem, IonThumbnail, ImgLoaderComponent, IonLabel, CirculaireRepresentationComponent, FaIconComponent, IonSkeletonText,FilterLinkPipe],
})
export class FiliereBlockItemListComponent {
    item = input.required<IFiliere>();
    showSpe = input(true);
    navigation = input<string|null>(null);
    cssClass = input<string|undefined>();

    imgs = computed<(string|undefined)[]>(() => {
        const links = this.item()?.links;
        if (!links) return [];
        const circSymboles = links.filter(l => l.circulaire && l.symbols);
        if (circSymboles.length === 0) return [];
        const imgs = circSymboles[0].symbols?.imgs;
        if (imgs && imgs.length > 0) {
            return [imgs[0]?.thumbnail, imgs[0]?.url];
        }
        return [];
    });

    onclick = output<void>();

    constructor() {}

    click() {
        this.onclick.emit();
    }
}
