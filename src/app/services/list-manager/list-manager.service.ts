import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICollectionData } from 'src/app/models/linked-data-models';


@Injectable()
export class ListManagerService<Item extends ICollectionData> {
    private partialParam = {
        from: 0,
        to: 0
    }

    public items$ = new BehaviorSubject<Item[]>([]);

    public currentSorts: {
        property: string,
        order: string
    }
    public currentFilters: any[];

    protected pageSize = 20;

    private pageNumber = 1;

    public collection: Item[] = [];
    setCollection(collection: Item[]) {
        this.collection = collection;
        this.updateItems()
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
        this.updatePartial();
    }

    setPageNumber(pageNumber: number) {
        this.pageNumber = pageNumber;
        this.updatePartial();
    }

    setSort(property: string, order: string) {
        this.currentSorts = {
            property,
            order
        };
        this.updateItems();
    }
    private updatePartial() {
        this.setPartial(0, this.pageNumber * this.pageSize)
    }

    private setPartial(from: number, to: number) {
        this.partialParam.from = from;
        this.partialParam.to = to;
        this.updateItems();
    }

    private updateItems() {
        let collection = this.collection.slice();
        if (this.currentSorts && this.currentSorts.property) {
            collection = collection.sort((a, b) => {
                const aProp: string = a[this.currentSorts.property];
                const bProp: string = b[this.currentSorts.property];
                if (aProp.toLowerCase() < bProp.toLowerCase()) { return -1; }
                if (aProp.toLowerCase() > bProp.toLowerCase()) { return 1; }
            })
        }
        collection = collection.slice(this.partialParam.from, this.partialParam.to);
        console.log('list manager update', this.currentSorts, this.collection, collection)
        this.items$.next(collection)
    }
}