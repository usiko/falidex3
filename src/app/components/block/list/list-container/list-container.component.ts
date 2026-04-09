import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    effect,
    input,
    Input,
    model,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IonFab, IonFabButton, IonItemGroup, IonItemDivider, IonLabel, IonButtons, IonButton } from "@ionic/angular/standalone";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SlideDirective } from 'src/app/components/shared/slider/slide.directive';
import { SliderComponent } from 'src/app/components/shared/slider/slider.component';
import { CommonModule } from '@angular/common';
import { ArrayGroupPipe } from 'src/app/components/shared/pipes/array-groupe.pipe';
/**
 * List dislayer and switcher
 */
@Component({
    selector: 'app-list-container',
    templateUrl: './list-container.component.html',
    styleUrls: ['./list-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonFab, IonFabButton, IonItemGroup, FaIconComponent, ScrollingModule, CommonModule, ArrayGroupPipe, SlideDirective, SliderComponent, IonItemDivider, IonLabel, IonButtons, IonButton],
})
export class LisContainerComponent implements OnDestroy, OnInit {
    @ViewChild('cdkList') cdkList!: CdkVirtualScrollViewport;
    @ViewChild('cdkGallery') cdkGallery!: CdkVirtualScrollViewport;
    @ViewChild('cdkSlideList') cdkSlideList!: CdkVirtualScrollViewport;
    @ViewChild('cdkSlideGallery') cdkSlideGallery!: CdkVirtualScrollViewport;

    /***
     * loading state
     */
    @Input() loading = false;

    @Input() navigationPath!: string;

    @Input() initLoading!: boolean;

    activeListMode = input<{
        list?: TemplateRef<any>;
        gallery?: TemplateRef<any>;
    }>({})

    @Input() showScrollTopBtn = false;

    public listMode = computed(()=>{
        const index = this.slideIndex()
        if(index==0)
        {
            return 'list';
        }
        return 'gallery';

    })
    @Input() items$!: BehaviorSubject<any[]>;

    @Input() itemListSize:number=0;
    @Input() itemGallerySize:number=0;

    public emptyItems: null[] = [];

    protected slideIndex = model(0);

    constructor(private changeDetector: ChangeDetectorRef) {
        effect(()=>{
            {
            const activeListMode = this.activeListMode()
            if (activeListMode.list) {
                this.slideIndex.set(0)
            } else if (activeListMode.gallery) {
                this.slideIndex.set(1)
            }

        }
        })
        
    }

    /**
     * switching of list mode
     * @param  {string} listMode
     */
    switchListMode(listMode: string) {
        if (listMode == 'list') {
            this.slideIndex.set(0)

        }
        if (listMode == 'gallery') {
            this.slideIndex.set(1)
        }
        this.changeDetector.detectChanges();
    }




    ngOnInit(): void {
        this.initEmptyList();
        // init listmode without slide
        const activeListMode = this.activeListMode()
        if (activeListMode && !(activeListMode.gallery && activeListMode.list)) {
            if (activeListMode.list) {
                this.slideIndex.set(0)
            } else if (activeListMode.gallery) {
                this.slideIndex.set(1)
            }
        }
    }

    scrollToTop() {
        let cdk: CdkVirtualScrollViewport|undefined = undefined;
        const activeListMode = this.activeListMode()
        if (!activeListMode.gallery || !activeListMode.list) {
            if (this.listMode() == 'list') {
                cdk = this.cdkList;
            }
            if (this.listMode() == 'gallery') {
                cdk = this.cdkGallery;
            }
        } else {
            if (this.listMode() == 'list') {
                cdk = this.cdkSlideList;
            }
            if (this.listMode() == 'gallery') {
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
