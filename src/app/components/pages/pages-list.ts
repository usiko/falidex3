
import { Injectable, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

import { BehaviorSubject, Subscription, } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IBaseCollectionData } from 'src/app/models/base-data-models';
import { ICollectionData } from 'src/app/models/linked-data-models';
import { ICollectionItem } from 'src/app/services/collection-item/collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
@Injectable()
export class PageItemList<Item extends ICollectionData> {
    @ViewChild(IonContent, null) content: IonContent;
    protected collectionService: ICollectionItem<IBaseCollectionData, Item>;
    protected listManagerService: ListManagerService<Item>;
    protected collection$ = new BehaviorSubject<Item[]>([]) // fullCollection
    protected events: EventService;
    //protected content;
    private filterSubscription = new Subscription();

    protected pageSize = 20;

    private pageNumber = 1;


    // protected filterDebouncer: Subject<any> = new Subject();

    protected pageSubscribers = new Subscription();
    protected subscribers = new Subscription();
    public showScrollTopBtn = false;
    public loading = false;
    public items$ = new BehaviorSubject<Item[]>([]);
    public emptyItems = [];
    public dataLength = null;




    init() {
        this.initService();
        this.initEmptyList();
        this.collection$ = this.collectionService.collection$;
        this.listManagerService.setCollection(this.collection$);
        this.items$ = this.listManagerService.items$;
        this.items$
            .pipe(debounceTime(5000))
            .subscribe(() => {
                this.loading = false;
            }, (err) => {
                this.loading = false;
            });
        this.collection$.subscribe(items => {
            this.dataLength = items.length;
        });
        this.listManagerService.setPageNumber(this.pageNumber);
        this.listManagerService.setPageSize(this.pageSize);

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
        //const filters = this.collectionService.getFilters();
        //this.collectionService.resetPage();
        /* this.pageNumber = 1;
         if (this.pageSize) {
             this.updatePartial();
         }
         this.events.publish('filtersMenu', true);
         // this.events.publish('setFilters', filters);
         this.events.publish('resetFilters');*/



    }
    search(search: string) {
        this.scrollToTop();
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

    onDestroy() {
        this.subscribers.unsubscribe();
    }

    initEmptyList() {
        this.emptyItems = [];
        for (let i = 0; i < 30; i++) {
            this.emptyItems.push(null);
        }
    }

    getMore() {
        console.log('get more');
        this.loading = true;
        this.pageNumber++;
        this.listManagerService.setPageNumber(this.pageNumber);
    }

    initService() {
        /*this.collectionService.initData();
        this.collectionService.resetFilter();*/
    }



}
