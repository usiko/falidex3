import { EventEmitter, Injectable, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICollectionData } from 'src/app/models/linked-data-models';


@Injectable()
export class ListItem<T extends ICollectionData> implements OnChanges {
    @Input() item: T;
    @Input() showSpe = true;
    @Input() navigation = true;
    @Output() onclick = new EventEmitter<never>();

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['items$']) {
            this.itemChange();
        }
    }


    protected itemChange(): void {

    }
}