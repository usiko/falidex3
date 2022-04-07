import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
    IDisplayFilters,
    ICollectionFilter,
    ILinkFilters,
    IDataFilter,
    LinkFilters,
    FilterOperatorEnum,
} from 'src/app/models/filters/filter-model';
import { ICollectionData, ICollectionLink } from 'src/app/models/linked-data-models';
import { FilterStoreService } from '../data-store/filter-store/filter-store.service';

@Injectable()
export class FilterService<Item extends ICollectionData> implements OnDestroy {
    public collectionfilters$ = new BehaviorSubject<ICollectionFilter<ICollectionData>[]>([]);
    public linksfilters$ = new BehaviorSubject<ILinkFilters[]>([]);

    public filteredCollection$ = new BehaviorSubject<Item[]>([]);
    private collection$: BehaviorSubject<Item[]>;

    public displayFilters$ = new BehaviorSubject<IDisplayFilters<ICollectionData>[]>([]);
    private currentBindDisplayFilters$: BehaviorSubject<IDisplayFilters<ICollectionData>[]>;
    private storeIndex: number;

    /**
     * all service subscriptions
     */
    private filterSubscription: Subscription;

    constructor(private store: FilterStoreService) {}

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

    removeCollectionFilter(index) {
        const filters = this.collectionfilters$.getValue();
        if (filters[index]) {
            filters.splice(index, 0);
            this.collectionfilters$.next(filters);
        }
    }

    private applyFiltersOnCollection() {
        console.log('filtered', this.collection$);
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
                return this.applyCollectionFilters(item) && item.links.length > 0;
            });
            this.filteredCollection$.next(collection);
        }
    }

    private applyCollectionFilters(item: Item): boolean {
        // il faut dans un premier temps filtrer les links pas les items
        for (const filter of this.collectionfilters$.getValue()) {
            let compared;
            if (filter.propertyGetter) {
                compared = filter.propertyGetter(item);
            } else {
                compared = item[filter.propertyToFilter];
            }

            const result = this.applyFilters(compared, filter);
            if (!result) {
                return false;
            }
        }

        return true;
    }

    private applyLinksFilters(item: ICollectionLink) {
        for (const filter of this.linksfilters$.getValue()) {
            const compared = filter.propertyGetter(item);

            const result = this.applyFilters(compared, filter);
            if (!result) {
                return false;
            }
        }
        return true;
    }

    private applyFilters(compared, filter: IDataFilter<any>) {
        let result = true;
        if (filter.values && filter.values.length > 0) {
            switch (filter.operator) {
                case FilterOperatorEnum.contain:
                    if (compared) {
                        result =
                            filter.values.findIndex((val) => {
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
                        result =
                            filter.values.findIndex((val) => {
                                return compared.includes(val);
                            }) == -1;
                    }

                    break;
            }
            console.log('compare', compared, filter.values, filter.operator, result);
        }
        return result;
    }

    ngOnDestroy(): void {
        console.log('filter unsub', this.storeIndex);
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
        this.store.removeCollectionFilter(this.storeIndex);
    }
}
