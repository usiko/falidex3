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

    protected pageSize = 20;

    private pageNumber = 1;

    public collection$: BehaviorSubject<Item[]>;

    public subscriptions = new Subscription();

    private dataSize = 0;

    constructor(private filterService: FilterService<Item>) {}

    init(collectionSuject$: BehaviorSubject<Item[]>) {
        this.collection$ = collectionSuject$;
        this.filterService.init(this.collection$);

        this.subscriptions.add(
            this.filterService.filteredCollection$.subscribe((filtered) => {
                console.log('filtered', filtered);
                this.updateItems();
            })
        );
    }

    destroy() {
        this.subscriptions.unsubscribe();
    }

    getDataSize(): number {
        return this.dataSize;
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
        return this.filterService.addCollectionFilter(propertyToFilter, values, operator, linkToFilter);
    }
    updateFilter(index: number, property: string, values: any[], operator: FilterOperatorEnum, linkToFilter?: () => any) {
        this.filterService.updateCollectionFilter(index, property, values, operator);
    }
    removeFilter(index) {
        this.filterService.removeCollectionFilter(index);
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
        //apply sort
        let collection = this.filterService.filteredCollection$.getValue();
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
        this.dataSize = collection.length;
        collection = collection.slice(this.partialParam.from, this.partialParam.to);
        this.items$.next(collection);
    }
}
