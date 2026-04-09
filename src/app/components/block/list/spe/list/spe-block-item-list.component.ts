import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ICodeSpe } from 'src/app/models/linked-data-models';
import { IonItem, IonLabel, IonThumbnail, IonSkeletonText } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-spe-block-item-list',
    templateUrl: './spe-block-item-list.component.html',
    styleUrls: ['./spe-block-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonItem, IonLabel, IonThumbnail, IonSkeletonText,CommonModule,RouterModule],
})
export class SpeBlockItemListComponent {
    item = input.required<ICodeSpe>();
    showSpe = input(true);
    navigation = input<string|null>(null);
    cssClass = input<string|undefined>();

    onclick = output<void>();

    constructor() {}

    click() {
        this.onclick.emit();
    }
}
