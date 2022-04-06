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
    private filterSubscription = new Subscription();

    /**
     * current number of items to show per page
     */
    protected pageSize = 20;

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
     * current data loading state
     */
    public loading = false;

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

    /**
     * init the the component
     */
    init() {
        this.listManagerService.init();
        this.initEmptyList();
        this.collection$ = this.collectionService.collection$;
        this.collection$.subscribe((collection) => {
            this.listManagerService.setCollection(collection);
            console.log('update items', this.items$.getValue(), this.collection$.getValue());
        });

        this.items$.subscribe(
            () => {
                console.log('update items', this.items$.getValue(), this.collection$.getValue());
                this.loading = false;
                this.changeDetector.detectChanges();
            },
            (err) => {
                this.loading = false;
                this.changeDetector.detectChanges();
            }
        );
        this.listManagerService.items$.pipe(debounceTime(500)).subscribe((items) => {
            this.items$.next(items);
        });
        this.collection$.subscribe((items) => {
            this.dataLength = items.length;
        });
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
        this.listManagerService.setFilters();
    }

    /**
     * event of leaving view
     */
    ionViewWillLeave() {
        /*if (this.pageSubscribers) {
            this.pageSubscribers.unsubscribe();
        }*/
    }

    protected initDisplayFilters(filters: IDisplayFilters<Item>[]) {
        this.listManagerService.setDisplayFilters(filters);
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
        /*this.collectionService.resetPage();
        this.pageNumber = 1;
        this.collectionService.changePageSize(this.pageSize * this.pageNumber);
        if (search && search.length > 0) {
            this.collectionService.addFilter({ name: FilterName.name, value: search });
        } else {
            this.collectionService.removeFilter(FilterName.name);
        }*/
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
    filterChange(name, value) {
        this.scrollToTop();
        /*switch (name) {
            case FilterName.circulaireMat:

                if (value.length === 2) {
                    this.collectionService.removeFilter(name);
                } else {
                    this.collectionService.addFilter({ name, value });
                }

                break;
            case FilterName.spe:
                if (value === 'all') {
                    this.collectionService.removeFilter(name);
                } else {
                    this.collectionService.addFilter({ name, value });
                }
                break;
        }*/
    }

    /**
     * getting data with or without filters
     */
    /*getFilteresData(reset = false) {
        this.dataLength = null;
        console.log(reset, this.listData.slice())
        if (this.listData.length > 0 && this.listData.filter(data => data === null).length === 0) {
            this.loading = true;
        } else {
            this.initEmptyList();
        }
        if (reset) {
            this.listData = [];
            this.collectionService.resetPage();
        }

        const sub = this.collectionService.getList().debounceTime(350).subscribe(data => {
            console.log(data);
            this.listData.push(...data.data);
            this.dataLength = data.count;
            if (this.infiniteScroll) {
                this.infiniteScroll.complete();
            }
        }, (err) => {
            this.loading = false;
            if (this.infiniteScroll) {
                this.infiniteScroll.complete();
            }
        });
        this.subscribers.add(sub);

    }*/

    /**
     * destroying view
     */
    onDestroy() {
        this.listManagerService.destroy();
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
     * load more data from collection
     */
    getMore() {
        console.log('get more');
        this.loading = true;
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
