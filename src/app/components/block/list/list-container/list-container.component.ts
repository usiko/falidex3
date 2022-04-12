import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonContent, IonInfiniteScroll, IonSlides } from '@ionic/angular';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

/**
 * List dislayer and switcher
 */
@Component({
    selector: 'app-list-container',
    templateUrl: './list-container.component.html',
    styleUrls: ['./list-container.component.scss'],
})
export class LisContainerComponent implements AfterViewInit, OnDestroy, OnInit {
    @ViewChild(IonSlides) slides: IonSlides;

    /***
     * loading state
     */
    @Input() loading = false;

    @Input() activeListMode: {
        list?: boolean;
        gallery?: boolean;
    };

    public listMode: string;

    constructor() {}

    /**
     * switching of list mode
     * @param  {string} listMode
     */
    switchListMode(listMode: string) {
        if (listMode == 'list') {
            this.slides.lockSwipes(false);
            this.slides.slideTo(0);
            this.slides.lockSwipes(true);
        }
        if (listMode == 'gallery') {
            this.slides.lockSwipes(false);
            this.slides.slideTo(1);
            this.slides.lockSwipes(true);
        }
    }

    /**
     * getting list mode from slide
     */
    private getListMode() {
        if (this.slides) {
            this.slides.getActiveIndex().then((index) => {
                if (index === 0) {
                    this.listMode = 'list';
                }
                if (index === 1) {
                    this.listMode = 'gallery';
                }
            });
        }
    }

    ngAfterViewInit(): void {
        if (this.slides) {
            this.slides.slideTo(0);
            this.slides.lockSwipes(true);
            this.slides.stopAutoplay();
            this.slides.ionSlideDidChange.subscribe((event) => {
                this.getListMode();
            });
            this.getListMode();
        }
    }

    ngOnInit(): void {
        // init listmode without slide
        if (this.activeListMode && !(this.activeListMode.gallery && this.activeListMode.list)) {
            if (this.activeListMode.list) {
                this.listMode = 'list';
            } else if (this.activeListMode.gallery) {
                this.listMode = 'gallery';
            }
        }
    }

    ngOnDestroy(): void {}
}
