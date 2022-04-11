import { EventEmitter, Injectable, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICollectionData } from 'src/app/models/linked-data-models';

/**
 * Parent of all list block component
 */
@Injectable()
export class ListItem<T extends ICollectionData> implements OnChanges {
    /**
     *  current item to show
     */
    @Input() item: T;

    /**
     * show if this item is specific
     * @deprecated (?)
     */
    @Input() showSpe = true;

    /**
     * show arrow navigation
     */
    @Input() navigation: string = null;

    /**
     * click item list event
     */
    @Output() onclick = new EventEmitter<never>();

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['item']) {
            this.itemChange();
        }
    }

    protected itemChange(): void {}
}
