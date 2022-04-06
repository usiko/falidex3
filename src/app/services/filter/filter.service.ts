import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDisplayFilters, ICollectionFilter, ILinkFilters, IDataFilter, LinkFilters } from 'src/app/models/filters/filter-model';
import { ICollectionData } from 'src/app/models/linked-data-models';
import { FilterStoreService } from '../data-store/filter-store/filter-store.service';

@Injectable()
export class FilterService implements OnDestroy {
    public collectionfilters$ = new BehaviorSubject<ICollectionFilter<ICollectionData>[]>([]);
    public linksfilters$ = new BehaviorSubject<ILinkFilters[]>([]);

    public displayFilters$ = new BehaviorSubject<IDisplayFilters<ICollectionData>[]>([]);
    private currentBindDisplayFilters$: BehaviorSubject<IDisplayFilters<ICollectionData>[]>;
    private storeIndex: number;

    /**
     * all service subscriptions
     */
    private filterSubscription: Subscription;

    constructor(private store: FilterStoreService) {
        this.init();
    }

    init() {
        this.storeIndex = this.store.createStoreFilter();
        this.getFilters();
    }

    getFilters() {
        const subject = this.store.getCurrentFilter(this.storeIndex);
        console.log('get filters binding', this.storeIndex);
        if (subject) {
            if (this.filterSubscription) {
                this.filterSubscription.unsubscribe();
                console.log('filter unsub', this.storeIndex);
            }

            this.currentBindDisplayFilters$ = subject;
            console.log('filter sub', this.storeIndex);
            this.filterSubscription = subject
                .pipe(
                    map((filters: IDisplayFilters<any>[]) => {
                        console.log('want to update filters');
                        this.displayFilters$.next(filters);
                        return filters.reduce((acc: IDataFilter<any>[], item) => {
                            const filters = item.filters
                                .filter((el) => {
                                    return !el.enabled && el.filter;
                                })
                                .map((el) => {
                                    return el.filter;
                                });
                            acc.push(...filters);
                            return acc;
                        }, []);
                    })
                )
                .subscribe((filters: IDataFilter<any>[]) => {
                    console.log('update filters', filters);
                    const collection = <ICollectionFilter<any>[]>filters.filter((item) => item.type == 'collection');
                    const links = <LinkFilters[]>filters.filter((item) => item.type == 'link');
                    this.collectionfilters$.next(collection);
                    this.linksfilters$.next(links);
                });
        }
    }

    setDisplayFilters(filters: IDisplayFilters<ICollectionData>[]) {
        if (this.currentBindDisplayFilters$) {
            this.currentBindDisplayFilters$.next(filters);
        }
    }
    ngOnDestroy(): void {
        console.log('filter unsub', this.storeIndex);
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
        this.store.removeCollectionFilter(this.storeIndex);
    }
}
