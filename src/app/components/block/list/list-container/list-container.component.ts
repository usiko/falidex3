import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonContent, IonInfiniteScroll } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

/**
 * List dislayer and switcher
 */
@Component({
    selector: 'app-list-container',
    templateUrl: './list-container.component.html',
    styleUrls: ['./list-container.component.scss'],
})
export class LisContainerComponent implements OnInit {
    private targetScroll;
    /**
     * full data length to for infinit scroll
     */
    @Input() dataLength: number;

    /**
     * data loaded length for infinit scroll
     */
    private itemLengthValue: number;

    /**
     * setter data loaded length for infinit scroll
     */
    @Input() set itemLength(itemLength: number) {
        if (this.targetScroll) {
            this.targetScroll.complete();
            this.targetScroll = null;
        }
        this.itemLengthValue = itemLength;
    }
    get itemLength(): number {
        return this.itemLengthValue;
    }

    /**
     * Display list switcher
     */
    @Input() showListMode = true;

    /***
     * loading state
     */
    @Input() loading = false;

    /**
     * current list mode
     */
    @Input() listMode = 'list';

    /**
     * event for load more data
     */
    @Output() ongetMore = new EventEmitter();

    constructor() {}

    /**
     * switching of list mode
     * @param  {string} listMode
     */
    switchListMode(listMode: string) {
        this.listMode = listMode;
    }

    /**
     * event loading infinite scroll trigered
     * @param  {InfiniteScrollCustomEvent} event
     */
    getMore(event) {
        console.log('get more');
        this.targetScroll = event.target;
        this.ongetMore.emit();
    }

    /**
     * init view
     */
    ngOnInit() {}
}
