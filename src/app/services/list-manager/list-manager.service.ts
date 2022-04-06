import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FilterOperatorEnum, ICollectionFilter, IDataFilter, ILinkFilters, LinkFilters } from 'src/app/models/filters/filter-model';
import { ICollectionData, ICollectionLink } from 'src/app/models/linked-data-models';
import { Sort, SortEnum } from 'src/app/models/sort/sort.model';
import { IDisplayFilters } from '../../models/filters/filter-model';
import { FilterService } from '../filter/filter.service';

@Injectable()
export class ListManagerService<Item extends ICollectionData> {
    private partialParam = {
        from: 0,
        to: 0,
    };

    public items$ = new BehaviorSubject<Item[]>([]);

    public currentSorts: Sort;
    public currentCollectionFilters: ICollectionFilter<Item>[] = [];
    public currentLinkFilters: ILinkFilters[] = [];

    protected pageSize = 20;

    private pageNumber = 1;

    public collection: Item[] = [];

    public subscriptions = new Subscription();

    constructor(private filterService: FilterService) {}

    init() {
        this.filterService.init();
        this.subscriptions.add(
            this.filterService.collectionfilters$.subscribe((filters) => {
                this.currentCollectionFilters = filters;
                this.updateItems();
            })
        );
        this.subscriptions.add(
            this.filterService.linksfilters$.subscribe((filters) => {
                this.currentLinkFilters = filters;
                this.updateItems();
            })
        );
    }

    destroy() {
        this.subscriptions.unsubscribe();
    }
    setCollection(collection: Item[]) {
        this.collection = collection;
        this.updateItems();
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
        this.updatePartial();
    }

    setPageNumber(pageNumber: number) {
        this.pageNumber = pageNumber;
        this.updatePartial();
    }

    setSort(property: string, order: SortEnum) {
        this.currentSorts = {
            property,
            order,
        };
        this.updateItems();
    }

    /**
     * binding filters from store
     */
    public setFilters() {
        this.filterService.getFilters();
    }

    addFilter(propertyToFilter: string, values: any[], operator: FilterOperatorEnum, linkToFilter?: () => any): number {
        const index = this.currentCollectionFilters.push({
            propertyToFilter,
            values,
            operator,
        });
        this.updateItems();
        return index - 1;
    }
    updateFilter(index: number, property: string, values: any[], operator: FilterOperatorEnum, linkToFilter?: () => any) {
        const filter = this.currentCollectionFilters[index];
        if (filter) {
            filter.propertyToFilter = property;
            filter.values = values;
            filter.operator = operator;
            filter.linkToFilter = linkToFilter;
            this.updateItems();
        }
    }
    removeFilter(index) {
        if (this.currentCollectionFilters[index]) {
            this.currentCollectionFilters.splice(index, 0);
            this.updateItems();
        }
    }

    setDisplayFilters(displayFilters: IDisplayFilters<Item>[]) {
        this.filterService.setDisplayFilters(displayFilters);
    }
    private updatePartial() {
        this.setPartial(0, this.pageNumber * this.pageSize);
    }

    private setPartial(from: number, to: number) {
        this.partialParam.from = from;
        this.partialParam.to = to;
        this.updateItems();
    }

    private updateItems() {
        let collection = this.collection.map((item) => {
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

        //apply sort
        if (this.currentSorts && this.currentSorts.property) {
            collection = collection.sort((a, b) => {
                const aProp: string = a[this.currentSorts.property];
                const bProp: string = b[this.currentSorts.property];
                if (aProp.toLowerCase() < bProp.toLowerCase()) {
                    if (this.currentSorts.order == SortEnum.asc) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                if (aProp.toLowerCase() > bProp.toLowerCase()) {
                    if (this.currentSorts.order == SortEnum.asc) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            });
        }
        collection = collection.slice(this.partialParam.from, this.partialParam.to);
        console.log('list manager update', this.currentSorts, this.collection, collection);
        this.items$.next(collection);
    }

    private applyCollectionFilters(item: Item): boolean {
        // il faut dans un premier temps filtrer les links pas les items
        for (const filter of this.currentCollectionFilters) {
            let compared;
            if (filter.propertyGetter) {
                compared = filter.propertyGetter(item);
            } else {
                compared = item[filter.propertyToFilter];
            }

            const result = this.applyFilter(compared, filter);
            if (!result) {
                return false;
            }
        }

        return true;
    }

    private applyLinksFilters(item: ICollectionLink) {
        for (const filter of this.currentLinkFilters) {
            const compared = filter.propertyGetter(item);

            const result = this.applyFilter(compared, filter);
            if (!result) {
                return false;
            }
        }
        return true;
    }

    private applyFilter(compared, filter: IDataFilter<any>) {
        let result = true;
        if (compared && filter.values && filter.values.length > 0) {
            switch (filter.operator) {
                case FilterOperatorEnum.contain:
                    result =
                        filter.values.findIndex((val) => {
                            return compared.includes(val);
                        }) !== -1;
                    break;
                case FilterOperatorEnum.different:
                    result = !filter.values.includes(compared);
                    break;
                case FilterOperatorEnum.equal:
                    result = filter.values.includes(compared);
                    break;
                case FilterOperatorEnum.exclude:
                    result =
                        filter.values.findIndex((val) => {
                            return compared.includes(val);
                        }) == -1;
                    break;
            }
            console.log('compare', compared, filter.values, filter.operator, result);
            return result;
        }
    }
}
