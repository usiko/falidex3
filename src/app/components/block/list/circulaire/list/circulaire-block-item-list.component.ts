import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ICirculaire, ICollectionLink, IFiliere, ISignification, ISymbol } from 'src/app/models/linked-data-models';
import { ISubBaseCirculaire, ISubBaseFiliere, ISubBaseSignification } from 'src/app/models/sub-base-data-models';
import { ListItem } from '../../list-item';

/**
 * item block of symbole list showing
 */
@Component({
    selector: 'app-block-circulaire-item-list',
    templateUrl: './circulaire-block-item-list.component.html',
    styleUrls: ['./circulaire-block-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CirculaireBlockItemListComponent extends ListItem<ICirculaire> implements OnInit {
    /**
     * symbole item to show
     */
    @Input() item: ICirculaire;

    /**
     * show if this item is specific
     * @deprecated (?)
     */
    @Input() showSpe = true;

    /**
     * show navigation arrow
     */
    @Input() navigation: string = null;

    constructor(protected changedetector: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {}

    click() {
        this.onclick.emit();
    }
}
