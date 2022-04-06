import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FilterOperatorEnum, ICollectionFilter } from 'src/app/models/filters/filter-model';
import { ICollectionData } from 'src/app/models/linked-data-models';
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
    public currentFilters: ICollectionFilter<Item>[] = [];

    protected pageSize = 20;

    private pageNumber = 1;

    public collection: Item[] = [];

    public subscriptions = new Subscription();

    constructor(private filterService: FilterService) {}

    init() {
        this.filterService.init();
        this.subscriptions.add(
            this.filterService.filters$.subscribe((filters) => {
                this.currentFilters = filters;
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
        const index = this.currentFilters.push({
            propertyToFilter,
            values,
            operator,
        });
        this.updateItems();
        return index - 1;
    }
    updateFilter(index: number, property: string, values: any[], operator: FilterOperatorEnum, linkToFilter?: () => any) {
        const filter = this.currentFilters[index];
        if (filter) {
            filter.propertyToFilter = property;
            filter.values = values;
            filter.operator = operator;
            filter.linkToFilter = linkToFilter;
            this.updateItems();
        }
    }
    removeFilter(index) {
        if (this.currentFilters[index]) {
            this.currentFilters.splice(index, 0);
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
        let collection = this.collection.slice();
        // apply filter

        if (this.currentFilters.length != 0) {
            collection = collection.filter((item) => {
                return this.applyFilters(item);
            });
        }

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

    private applyFilters(item: Item): boolean {
        // il faut dans un premier temps filtrer les links pas les items
        for (const filter of this.currentFilters) {
            const values = filter.values;
            let compared;
            if (filter.propertyGetter) {
                compared = filter.propertyGetter(item);
            } else {
                compared = item[filter.propertyToFilter];
            }

            let result = true;
            if (compared && values && values.length > 0) {
                switch (filter.operator) {
                    case FilterOperatorEnum.contain:
                        result =
                            values.findIndex((val) => {
                                return compared.includes(val);
                            }) !== -1;
                        break;
                    case FilterOperatorEnum.different:
                        result = !values.includes(compared);
                        break;
                    case FilterOperatorEnum.equal:
                        result = values.includes(compared);
                        break;
                    case FilterOperatorEnum.exclude:
                        result =
                            values.findIndex((val) => {
                                return compared.includes(val);
                            }) == -1;
                        break;
                }
                console.log(compared, values, filter.operator, result);
                if (!result) {
                    return false;
                }
            }
        }

        return true;
    }
}
