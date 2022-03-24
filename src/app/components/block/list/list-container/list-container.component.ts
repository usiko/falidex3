import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-list-container',
    templateUrl: './list-container.component.html',
    styleUrls: ['./list-container.component.scss'],
})
export class LisContainerComponent implements OnInit {
    private targetScroll;

    @Input() dataLength: number; // full length
    private itemLengthValue: number;
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
    @Input() showListMode = true;
    @Input() loading = false;
    @Input() listMode = 'list';



    @Output() ongetMore = new EventEmitter();


    constructor() { }
    switchListMode(listMode: string) {
        this.listMode = listMode;
    }
    getMore(event) {
        this.targetScroll = event.target;
        this.ongetMore.emit();
    }

    ngOnInit() { }

}
