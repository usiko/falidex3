import { ChangeDetectorRef, Injectable, ViewChild } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IBaseCollectionData } from 'src/app/models/base-data-models';
import { FilterOperatorEnum } from 'src/app/models/filters/filter-model';
import { ICollectionData } from 'src/app/models/linked-data-models';
import { SortEnum } from 'src/app/models/sort/sort.model';
import { ICollectionItem } from 'src/app/services/collection-item/collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
import { IDisplayFilters } from '../../models/filters/filter-model';
import { InfiniteScrollCustomEvent, IonContent } from '@ionic/angular/standalone';

/**
 * Parent of all list pages
 */
@Injectable()
export abstract class PageItemList<Item extends ICollectionData> {
    /**
     * main page container
     */
    public abstract content: IonContent;

    /**
     * Must import service in child
     * data service
     */
    protected abstract collectionService: ICollectionItem<IBaseCollectionData, Item>|undefined;

    /**
     * Must import service in child
     * list manager service
     */
    protected abstract listManagerService: ListManagerService<Item>;

    /**
     * Must import service in child
     * angular changedetector, to update manualy view
     */
    protected abstract changeDetector: ChangeDetectorRef;

    /**
     * Must import service in child
     * Global event service
     */
    protected abstract events: EventService;

    /**
     * collection subject of data to show, dircetly from data store,  without any change
     */
    protected collection$: BehaviorSubject<Item[]>|undefined;

    //protected content;

    /**
     * current number of items to show per page
     */
    protected pageSize = 0;

    /**
     * current page, start on 1
     */
    private pageNumber = 1;

    /**
     * index of search filter, used to find, remove or update searh text filter
     */
    private  searchFilterIndex: number|undefined;

    // protected filterDebouncer: Subject<any> = new Subject();

    //protected pageSubscribers = new Subscription();
    //protected subscribers = new Subscription();

    /**
     * show a scrolltop bouton
     */
    public showScrollTopBtn = false;

    /**
     * current intial data loading state
     */
    public initLoading = false;

    /**
     * current scroll data loading state
     */
    public loadingScroll = false;

    /**
     * list of items to show, filtered, sorted, sliced
     */
    public items$ = new BehaviorSubject<Item[]>([]);

    public emptyItems:null[] = [];

    /**
     * lentgh total of items
     * (probably useless now)
     */
    public dataLength:number|null = null;

    private subscription = new Subscription();

    private targetScroll:HTMLIonInfiniteScrollElement|undefined;

    /**
     * init the the component
     */
    init() {
        if(this.collectionService)
        {
            this.collection$ = this.collectionService.collection$;
        }
        if(this.collection$)
        {
            this.listManagerService.init(this.collection$);
        }
        
        
        this.initLoading = true;
        this.loadingScroll = true;
        this.initEmptyList();

        this.subscription.add(
            this.items$.subscribe(() => {
                this.dataLength = this.listManagerService.getDataSize();
                this.loadingScroll = false;
                if (this.targetScroll) {
                    this.targetScroll.complete();
                    this.targetScroll = undefined;
                }
                if (this.dataLength > 0) {
                    this.initLoading = false;
                }
                this.changeDetector.detectChanges();
            })
        );
        this.subscription.add(
            this.listManagerService.filterChange.subscribe(() => {
                this.filterChange();
            })
        );
        this.subscription.add(
            this.listManagerService.items$.pipe(debounceTime(500)).subscribe((items) => {
                this.items$.next(items);
            })
        );
        this.listManagerService.setPageNumber(this.pageNumber);
        this.listManagerService.setPageSize(this.pageSize);
    }

    /**
     * event of back into this view
     */
    ionViewDidEnter() {
        //this.pageSubscribers = new Subscription();
        /*this.filterSubscription.add(this.events.getObs('filtersChange').subscribe((data: { name: FilterName, value: any }) => {
            if (this.listData) {
                this.filterChange(data.name, data.value);
            }
        }));*/
    }

    /**
     * event of leaving view
     */
    ionViewWillLeave() {
        /*if (this.pageSubscribers) {
            this.pageSubscribers.unsubscribe();
        }*/
    }

    /**
     * initializing showed filter in menu
     * @param  {IDisplayFilters<any>[]} filters
     */
    protected initDisplayFilters(filters: IDisplayFilters<any>[]) {
        this.listManagerService.setDisplayFilters(filters);
        this.listManagerService.setFilters();
    }

    /**
     * searching in list
     * @param search string
     */
    search(search: string) {
        this.scrollToTop();
        if (this.searchFilterIndex !== undefined) {
            this.listManagerService.updateFilter(this.searchFilterIndex, 'name', [search], FilterOperatorEnum.contain);
        } else {
            this.searchFilterIndex = this.listManagerService.addFilter('name', [search], FilterOperatorEnum.contain);
        }
    }

    /**
     * showing scrolltop btn
     */
    scrolling(event: any /*CustomEvent*/) {
        this.showScrollTopBtn = event.detail.scrollTop > 500;

        /**
         * scrolling to top
         */
    }
    scrollToTop() {
        if (this.content) {
            this.content.scrollToTop(350);
        } else {
            console.warn('unable to scrolltop not content');
        }
    }

    /**
     * adding new filter to service
     */
    filterChange() {
        //this.scrollToTop();
    }

    /**
     * destroying view
     */
    onDestroy() {
        this.subscription.unsubscribe();
        //this.subscribers.unsubscribe();
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
    /**
     * event loading infinite scroll trigered
     * @param  {InfiniteScrollCustomEvent} event
     */
    getMore(event:InfiniteScrollCustomEvent) {
        this.targetScroll = event.target;
        console.log('get more');
        this.loadingScroll = true;
        this.pageNumber++;
        this.listManagerService.setPageNumber(this.pageNumber);
    }

    /**
     * setting a sorting of list
     * @param property string,
     * @param order SortEnum
     */
    setSort(property: string, order: SortEnum) {
        this.listManagerService.setSort(property, order);
    }

    /**
     * track by forngfor list
     * @param index number, index in list
     * @param item Item current item iterrated
     *
     */
    trackByFn(index: Number, item: Item) {
        return item.id;
    }
}
