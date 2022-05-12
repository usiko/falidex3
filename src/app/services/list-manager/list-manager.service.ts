import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { FilterOperatorEnum } from 'src/app/models/filters/filter-model';
import { ICollectionData } from 'src/app/models/linked-data-models';
import { Sort, SortEnum } from 'src/app/models/sort/sort.model';
import { IDisplayFilters } from '../../models/filters/filter-model';
import { FilterService } from '../filter/filter.service';

@Injectable()
export class ListManagerService<Item extends ICollectionData> implements OnDestroy {
    /**
     * pagination slicer
     */
    private partialParam = {
        from: 0,
        to: 0,
    };

    /**
     * filtered sorted sliced list
     */
    public items$ = new BehaviorSubject<Item[]>([]);

    /**
     * current active sort
     */
    public currentSorts: Sort;

    /**
     * pagination size, number of element per adding
     */
    protected pageSize = 18;

    /**
     * current page number loaded
     */
    private pageNumber = 1;

    /**
     * initial full true list of data
     */
    public collection$: BehaviorSubject<Item[]>;

    /**
     * all subscriptions of page
     */
    public subscriptions = new Subscription();

    /**
     * information of date size
     */
    private dataSize = 0;

    /**
     * subject fired when filtering is update
     */
    public filterChange = new Subject<never>();

    constructor(private filterService: FilterService<Item>) {}

    /**
     * initializeing service and connecting it to collection, initial full true list
     * @param  {BehaviorSubject<Item[]>} collectionSuject$
     */
    init(collectionSuject$: BehaviorSubject<Item[]>) {
        this.collection$ = collectionSuject$;
        this.filterService.init(this.collection$);

        this.subscriptions.add(
            this.filterService.filteredCollection$.subscribe((filtered) => {
                this.filterChange.next();
                this.updateItems();
            })
        );
    }
    /**
     * destroying service
     */
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * returning the current size of list to show
     * @returns number
     */
    getDataSize(): number {
        return this.dataSize;
    }

    /**
     * changing huw many items to show per page
     * @param  {number} pageSize
     */
    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
        this.updatePartial();
    }

    /**
     * changing the current number of active page
     * @param  {number} pageNumber
     */
    setPageNumber(pageNumber: number) {
        this.pageNumber = pageNumber;
        this.updatePartial();
    }

    /**
     * changing the current sort applying on list
     * @param  {string} property
     * @param  {SortEnum} order
     */
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

    /**
     * adding a  custom colleciton filter applying on list data
     * @param  {string} propertyToFilter
     * @param  {any[]} values
     * @param  {FilterOperatorEnum} operator
     * @param  {()=>any} linkToFilter?
     * @returns number
     */
    addFilter(propertyToFilter: string, values: any[], operator: FilterOperatorEnum, linkToFilter?: () => any): number {
        return this.filterService.addCollectionFilter(propertyToFilter, values, operator, linkToFilter);
    }

    /**
     * updating a collection filter from his index, applying on list data
     * @param  {number} index
     * @param  {string} property
     * @param  {any[]} values
     * @param  {FilterOperatorEnum} operator
     * @param  {()=>any} linkToFilter?
     */
    updateFilter(index: number, property: string, values: any[], operator: FilterOperatorEnum, linkToFilter?: () => any) {
        this.filterService.updateCollectionFilter(index, property, values, operator);
    }

    /**
     * remove a filter from his index, applying on list data
     * @param  {number} index
     */
    removeFilter(index) {
        this.filterService.removeCollectionFilter(index);
    }

    /**
     * set or update the list of displayed filter, applying on the menu bindind to the store
     * @param  {IDisplayFilters<Item>[]} displayFilters
     */
    setDisplayFilters(displayFilters: IDisplayFilters<Item>[]) {
        this.filterService.setDisplayFilters(displayFilters);
    }

    /**
     */
    private updatePartial() {
        this.setPartial(0, this.pageNumber * this.pageSize);
    }

    /**
     * cut a list using partial option object
     * @param  {number} from
     * @param  {number} to
     */
    private setPartial(from: number, to: number) {
        this.partialParam.from = from;
        this.partialParam.to = to;
        this.updateItems();
    }

    /**
     * updating current items subject list
     */
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
