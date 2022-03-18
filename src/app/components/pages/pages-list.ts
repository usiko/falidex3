
import { IonContent } from '@ionic/angular';

import { Subscription, } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ICollectionItem } from 'src/app/services/collection-item/collection.service';
import { EventService } from 'src/app/services/event/event.service';

export class PageListParent {
    protected content: IonContent;
    protected dataService: ICollectionItem<any, any>;
    protected events: EventService;
    private filterSubscription = new Subscription();

    protected pageSize;

    private pageNumber = 1;


    // protected filterDebouncer: Subject<any> = new Subject();

    protected pageSubscribers = new Subscription();
    protected subscribers = new Subscription();
    public showScrollTopBtn = false;
    public loading = false;
    public listData: any[] = [];
    public dataLength = null;

    init() {
        this.initService();
        this.initEmptyList();
        this.dataService.partialCollection$.pipe(
            debounceTime(350)
        ).subscribe(items => {


            /* return of(this.currentContainer).pipe(map(container => {
                 if (this.sizePage) {
                     this.offset += this.sizePage;
                 }
                 return container;
             }));*/

            this.listData = items;

            this.loading = false;

            this.dataLength = this.dataService.totalCount;
        }, (err) => {
            this.loading = false;
        });

    }
    ionViewDidEnter() {
        this.pageSubscribers = new Subscription();
        /*this.filterSubscription.add(this.events.getObs('filtersChange').subscribe((data: { name: FilterName, value: any }) => {
            if (this.listData) {
                this.filterChange(data.name, data.value);
            }
        }));*/
        this.initFilter();
    }
    ionViewWillLeave() {
        this.events.publish('filtersMenu', false);
        this.filterSubscription.unsubscribe();
        if (this.pageSubscribers) {
            this.pageSubscribers.unsubscribe();
        }


    }

    initFilter() {
        //const filters = this.dataService.getFilters();
        //this.dataService.resetPage();
        this.pageNumber = 1;
        if (this.pageSize) {
            this.dataService.setPartial(0, this.pageSize * this.pageNumber);
        }
        this.events.publish('filtersMenu', true);
        // this.events.publish('setFilters', filters);
        this.events.publish('resetFilters');
        this.dataService.setPartial(0, this.pageNumber * this.pageSize)


    }
    search(search: string) {
        this.scrollToTop();
        /*this.dataService.resetPage();
        this.pageNumber = 1;
        this.dataService.changePageSize(this.pageSize * this.pageNumber);
        if (search && search.length > 0) {
            this.dataService.addFilter({ name: FilterName.name, value: search });
        } else {
            this.dataService.removeFilter(FilterName.name);
        }*/

    }

    /**
     * showing scrolltop btn
     */
    scrolling(event: CustomEvent) {
        this.showScrollTopBtn = (event.detail.scrollTop > 500);


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
                    this.dataService.removeFilter(name);
                } else {
                    this.dataService.addFilter({ name, value });
                }

                break;
            case FilterName.spe:
                if (value === 'all') {
                    this.dataService.removeFilter(name);
                } else {
                    this.dataService.addFilter({ name, value });
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
            this.dataService.resetPage();
        }

        const sub = this.dataService.getList().debounceTime(350).subscribe(data => {
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

    onDestroy() {
        this.subscribers.unsubscribe();
    }

    initEmptyList() {
        this.listData = [];
        for (let i = 0; i < 30; i++) {
            this.listData.push(null);
        }
    }

    getMore() {
        this.loading = true;
        this.pageNumber++;
        //this.dataService.changePageSize(this.pageNumber * this.pageSize);
    }
    initService() {
        /*this.dataService.initData();
        this.dataService.resetFilter();*/
    }
}
