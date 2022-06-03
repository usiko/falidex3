import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    FilterOperatorEnum,
    ICollectionFilter,
    IDataFilter,
    IDisplayFilters,
    ILinkFilters,
    LinkFilters,
} from 'src/app/models/filters/filter-model';
import { ICollectionData, ICollectionLink } from 'src/app/models/linked-data-models';
import { FilterStoreService } from '../data-store/filter-store/filter-store.service';

@Injectable()
export class FilterService<Item extends ICollectionData> implements OnDestroy {
    /**
     * subject of filters for apply to collection data
     */
    public collectionfilters$ = new BehaviorSubject<ICollectionFilter<ICollectionData>[]>([]);

    /**
     * subject of filters for apply on links data
     */
    public linksfilters$ = new BehaviorSubject<ILinkFilters[]>([]);

    /**
     * collection on data filered
     */
    public filteredCollection$ = new BehaviorSubject<Item[]>([]);

    /**
     * initial true full collection
     */
    private collection$: BehaviorSubject<Item[]>;

    /**
     *  filters to display in the current list want to display
     */
    public displayFilters$ = new BehaviorSubject<IDisplayFilters<ICollectionData>[]>([]);

    /**
     * filter to display in the global menu
     */
    private currentBindDisplayFilters$: BehaviorSubject<IDisplayFilters<ICollectionData>[]>;

    /**
     * store index of filter
     */
    private storeIndex: number;

    /**
     * all service subscriptions
     */
    private filterSubscription: Subscription;

    constructor(private store: FilterStoreService) {}

    /**
     * initializing service and binding collection list of full true data
     * @param  {BehaviorSubject<Item[]>} collectionSuject$
     */
    init(collectionSuject$: BehaviorSubject<Item[]>) {
        this.collection$ = collectionSuject$;
        this.storeIndex = this.store.createStoreFilter();
        this.collectionfilters$
            .pipe(
                map((filters) => {
                    console.log('update collection');
                    const collectionFilter = this.collectionfilters$.getValue();
                    for (const filter of filters) {
                        const index = collectionFilter.findIndex((item) => item.idFilter == filter.idFilter);
                        if (index > -1) {
                            collectionFilter[index] = filter;
                        }
                    }
                    return collectionFilter;
                })
            )
            .subscribe(() => {
                this.applyFiltersOnCollection();
            });
        this.linksfilters$.subscribe(() => {
            this.applyFiltersOnCollection();
        });
        this.collection$.subscribe(() => {
            this.applyFiltersOnCollection();
        });
        this.getFilters();
    }

    /*
     * binding service filters from store
     */
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

    /**
     * add or update all displaying filters in gloval menu
     * @param  {IDisplayFilters<ICollectionData>[]} filters
     */
    setDisplayFilters(filters: IDisplayFilters<ICollectionData>[]) {
        if (this.currentBindDisplayFilters$) {
            this.currentBindDisplayFilters$.next(filters);
        }
    }

    /**
     * add a filter to apply on data
     * @param  {string} propertyToFilter
     * @param  {any[]} values
     * @param  {FilterOperatorEnum} operator
     * @param  {()=>any} linkToFilter?
     * @returns number
     */
    addCollectionFilter(propertyToFilter: string, values: any[], operator: FilterOperatorEnum, linkToFilter?: () => any): number {
        const filters = this.collectionfilters$.getValue();
        const index = filters.push({
            propertyToFilter,
            values,
            operator,
        });
        this.collectionfilters$.next(filters);
        return index - 1;
    }

    /**
     * update filters to apply on data
     * @param  {number} index
     * @param  {string} property
     * @param  {any[]} values
     * @param  {FilterOperatorEnum} operator
     * @param  {()=>any} linkToFilter?
     */
    updateCollectionFilter(index: number, property: string, values: any[], operator: FilterOperatorEnum, linkToFilter?: () => any) {
        const filters = this.collectionfilters$.getValue();
        const filter = filters[index];
        if (filter) {
            filter.propertyToFilter = property;
            filter.values = values;
            filter.operator = operator;
            filter.linkToFilter = linkToFilter;
        }
        this.collectionfilters$.next(filters);
    }

    /**
     * remove filter to apply on data
     * @param  {number} index
     */
    removeCollectionFilter(index: number) {
        const filters = this.collectionfilters$.getValue();
        if (filters[index]) {
            filters.splice(index, 0);
            this.collectionfilters$.next(filters);
        }
    }

    /**
     * applying current filter to full true list
     */
    private applyFiltersOnCollection() {
        if (this.collection$) {
            let collection = this.collection$.getValue().map((item) => {
                return { ...item };
            });
            //aply link filter
            collection = collection.map((item) => {
                item.links = item.links.slice().filter((link) => this.applyLinksFilters(link));
                return item;
            });

            // apply collection filter
            collection = collection.filter((item) => {
                return this.applyCollectionFilters(item);
                // return this.applyCollectionFilters(item) && item.links.length > 0;
            });
            this.filteredCollection$.next(collection);
        }
    }

    /**
     * applying currents collection filter on a  item
     * @param  {Item} item
     * @returns boolean
     */
    private applyCollectionFilters(item: Item): boolean {
        for (const filter of this.collectionfilters$.getValue()) {
            let compared;
            if (filter.propertyGetter) {
                compared = filter.propertyGetter(item);
            } else {
                compared = item[filter.propertyToFilter];
            }

            const result = this.compareFilters(compared, filter);
            if (!result) {
                return false;
            }
        }

        return true;
    }

    /**
     * applying currents link filter on a  item
     * @param  {ICollectionLink} item
     */
    private applyLinksFilters(item: ICollectionLink) {
        for (const filter of this.linksfilters$.getValue()) {
            const compared = filter.propertyGetter(item);

            const result = this.compareFilters(compared, filter);
            if (!result) {
                return false;
            }
        }
        return true;
    }

    /**
     * compare data to apply filter
     * @param  {any} compared
     * @param  {IDataFilter<any>} filter
     */
    private compareFilters(compared, filter: IDataFilter<any>) {
        let result = true;
        if (filter.values && filter.values.length > 0) {
            switch (filter.operator) {
                case FilterOperatorEnum.contain:
                    if (compared) {
                        if (typeof compared == 'string') {
                            compared = compared.toLowerCase();
                        }
                        result =
                            filter.values.findIndex((val) => {
                                if (typeof val == 'string') {
                                    val = val.toLowerCase();
                                }
                                return compared.includes(val);
                            }) !== -1;
                    }
                    break;
                case FilterOperatorEnum.different:
                    result = !filter.values.includes(compared);
                    break;
                case FilterOperatorEnum.equal:
                    result = filter.values.includes(compared);
                    break;
                case FilterOperatorEnum.exclude:
                    if (compared) {
                        if (typeof compared == 'string') {
                            compared = compared.toLowerCase();
                        }
                        result =
                            filter.values.findIndex((val) => {
                                if (typeof val == 'string') {
                                    val = val.toLowerCase();
                                }
                                return compared.includes(val);
                            }) == -1;
                    }

                    break;
            }
            console.log('compare', compared, filter.values, filter.operator, result);
        }
        return result;
    }

    /**
     * destroy service
     * @returns void
     */
    ngOnDestroy(): void {
        console.log('filter unsub', this.storeIndex);
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
        this.store.removeCollectionFilter(this.storeIndex);
    }
}
