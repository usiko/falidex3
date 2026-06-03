import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { IonItem, IonLabel, IonSkeletonText, IonThumbnail } from "@ionic/angular/standalone";
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";
import { FilterLinkPipe } from 'src/app/components/shared/pipes/filter-links.pipe';
import { ISymbol } from 'src/app/models/linked-data-models';

/**
 * item block of symbole list showing
 */
@Component({
    selector: 'app-block-symbol-item-list',
    templateUrl: './symbole-block-item-list.component.html',
    styleUrls: ['./symbole-block-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonItem, IonThumbnail, ImgLoaderComponent, IonLabel, FaIconComponent, IonSkeletonText, RouterModule,CommonModule,FilterLinkPipe],
})
export class SymbolBlockItemListComponent {
    /**
     * symbole item to show
     */
    item = input.required<ISymbol>()

    imgs = computed<(string|undefined)[]>(() => {
        const item = this.item();
        if (item && item.imgs && item.imgs.length > 0) {
            return [item.imgs[0]?.thumbnail, item.imgs[0]?.url];
        }
        return [];
    });

    /**
     * show if this item is specific
     * @deprecated (?)
     */
    showSpe = input(true);

    /**
     * show navigation arrow
     */
    navigation =  input<string|null>(null)

    onclick = output<void>()

    

    ngOnInit() {}

    click() {
        this.onclick.emit(void 0);
    }
}
