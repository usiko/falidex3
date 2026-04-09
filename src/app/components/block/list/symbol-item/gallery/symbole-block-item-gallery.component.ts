import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { ISymbol } from 'src/app/models/linked-data-models';
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";

/**
 * item block of symbole gallery showing
 */
@Component({
    selector: 'app-symbol-block-item-gallery',
    templateUrl: './symbole-block-item-gallery.component.html',
    styleUrls: ['./symbole-block-item-gallery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ImgLoaderComponent],
})
export class SymbolBlockItemGalleryComponent {
    /**
     * symbole item to show
     */
    item = input.required<ISymbol>();

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
