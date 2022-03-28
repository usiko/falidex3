import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICollectionData } from 'src/app/models/linked-data-models';


@Injectable()
export class ListManagerService<Item extends ICollectionData> {
    private collection$ = new BehaviorSubject<Item[]>([]) // fullCollection
    private partialParam = {
        from: 0,
        to: 0
    }

    public items$ = new BehaviorSubject<Item[]>([]);

    public currentSorts: any[];
    public currentFilters: any[];

    private collectionSubscription = new Subscription();
    private filterSubscription = new Subscription();
    protected pageSize = 20;

    private pageNumber = 1;


    setCollection(collection: BehaviorSubject<Item[]>) {
        this.collection$ = collection;
        this.collectionSubscription.unsubscribe();
        this.collectionSubscription.add(this.collection$.subscribe(items => {
            this.updateItems()
        }));
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
        this.updatePartial();
    }

    setPageNumber(pageNumber: number) {
        this.pageNumber = pageNumber;
        this.updatePartial();
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
        this.items$.next(this.collection$.getValue()
            .slice(this.partialParam.from, this.partialParam.to)
            .filter((item) => {
                return true;
            })
            .sort((item) => {
                return 1;
            })
        )
    }
}