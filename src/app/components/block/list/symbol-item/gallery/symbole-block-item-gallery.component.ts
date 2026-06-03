import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { ISymbol } from 'src/app/models/linked-data-models';
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * item block of symbole gallery showing
 */
@Component({
    selector: 'app-symbol-block-item-gallery',
    templateUrl: './symbole-block-item-gallery.component.html',
    styleUrls: ['./symbole-block-item-gallery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ImgLoaderComponent, RouterModule,CommonModule],
})
export class SymbolBlockItemGalleryComponent {
    /**
     * symbole item to show
     */
    item = input.required<ISymbol>();
    imgs = computed<(string|undefined)[]>(()=>{
        let item = this.item()
        if(item && item.imgs && item.imgs.length > 0)
        {
            return [
                item.imgs[0]?.thumbnail,
                item.imgs[0]?.url
            ]
        }
        return []
    })

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
