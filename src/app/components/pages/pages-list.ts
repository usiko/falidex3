import { ChangeDetectorRef, Injectable, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

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

/**
 * Parent of all list pages
 */
@Injectable()
export class PageItemList<Item extends ICollectionData> {
    /**
     * main page container
     */
    @ViewChild(IonContent, null) content: IonContent;

    /**
     * Must import service in child
     * data service
     */
    protected collectionService: ICollectionItem<IBaseCollectionData, Item>;

    /**
     * Must import service in child
     * list manager service
     */
    protected listManagerService: ListManagerService<Item>;

    /**
     * Must import service in child
     * angular changedetector, to update manualy view
     */
    protected changeDetector: ChangeDetectorRef;

    /**
     * Must import service in child
     * Global event service
     */
    protected events: EventService;

    /**
     * collection subject of data to show, dircetly from data store,  without any change
     */
    protected collection$: BehaviorSubject<Item[]>;

    //protected content;

    /**
     * current number of items to show per page
     */
    protected pageSize = 18;

    /**
     * current page, start on 1
     */
    private pageNumber = 1;

    /**
     * index of search filter, used to find, remove or update searh text filter
     */
    private searchFilterIndex: number;

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

    public emptyItems = [];

    /**
     * lentgh total of items
     * (probably useless now)
     */
    public dataLength = null;

    private subscription = new Subscription();

    private targetScroll;

    /**
     * init the the component
     */
    init() {
        this.collection$ = this.collectionService.collection$;
        this.listManagerService.init(this.collection$);
        this.initLoading = true;
        this.loadingScroll = true;
        this.initEmptyList();

        this.subscription.add(
            this.items$.subscribe(() => {
                this.dataLength = this.listManagerService.getDataSize();
                this.loadingScroll = false;
                if (this.targetScroll) {
                    this.targetScroll.complete();
                    this.targetScroll = null;
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
        this.content.scrollToTop(350);
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
    getMore(event) {
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
