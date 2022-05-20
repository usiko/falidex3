import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

/**
 * List dislayer and switcher
 */
@Component({
    selector: 'app-list-container',
    templateUrl: './list-container.component.html',
    styleUrls: ['./list-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LisContainerComponent implements AfterViewInit, OnDestroy, OnInit {
    @ViewChild(IonSlides) slides: IonSlides;
    @ViewChild('cdkList') cdkList: CdkVirtualScrollViewport;
    @ViewChild('cdkGallery') cdkGallery: CdkVirtualScrollViewport;
    @ViewChild('cdkSlideList') cdkSlideList: CdkVirtualScrollViewport;
    @ViewChild('cdkSlideGallery') cdkSlideGallery: CdkVirtualScrollViewport;

    /***
     * loading state
     */
    @Input() loading = false;

    @Input() navigationPath: string;

    @Input() initLoading: boolean;

    @Input() activeListMode: {
        list?: TemplateRef<any>;
        gallery?: TemplateRef<any>;
    };

    @Input() showScrollTopBtn = false;

    public listMode: string;
    @Input() items$: BehaviorSubject<any[]>;

    @Input() itemListSize;
    @Input() itemGallerySize;

    public emptyItems: null[] = [];

    constructor(private changeDetector: ChangeDetectorRef) {}

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
        this.changeDetector.detectChanges();
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
                this.changeDetector.detectChanges();
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
        } else if (!this.activeListMode.gallery || !this.activeListMode.list) {
            if (this.activeListMode.gallery) {
                this.listMode = 'gallery';
            }
            if (this.activeListMode.list) {
                this.listMode = 'list';
            }
        }
    }

    ngOnInit(): void {
        this.initEmptyList();
        // init listmode without slide
        if (this.activeListMode && !(this.activeListMode.gallery && this.activeListMode.list)) {
            if (this.activeListMode.list) {
                this.listMode = 'list';
            } else if (this.activeListMode.gallery) {
                this.listMode = 'gallery';
            }
        }
    }

    scrollToTop() {
        let cdk: CdkVirtualScrollViewport;
        if (!this.activeListMode.gallery || !this.activeListMode.list) {
            if (this.listMode == 'list') {
                cdk = this.cdkList;
            }
            if (this.listMode == 'gallery') {
                cdk = this.cdkGallery;
            }
        } else {
            if (this.listMode == 'list') {
                cdk = this.cdkSlideList;
            }
            if (this.listMode == 'gallery') {
                cdk = this.cdkSlideGallery;
            }
        }
        if (cdk) {
            cdk.scrollToOffset(0, 'smooth');
        } else {
            console.warn('nocdk');
        }
    }

    /**
     * track by forngfor list
     * @param index number, index in list
     * @param item Item current item iterrated
     *
     */
    trackByFn(index: Number, item: any) {
        return item.id;
    }

    /**
     * show an empty list loading at the first show
     */
    initEmptyList() {
        this.emptyItems = [];
        for (let i = 0; i < 30; i++) {
            this.emptyItems.push(null);
        }
    }

    ngOnDestroy(): void {}
}
