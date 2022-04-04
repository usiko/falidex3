import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import {
    IDisplayFilters,
    ICollectionFilter,
} from 'src/app/models/filters/filter-model'
import { FilterStoreService } from '../data-store/filter-store/filter-store.service'

@Injectable()
export class FilterService implements OnDestroy {
    public filters$ = new BehaviorSubject<ICollectionFilter[]>([])
    public displayFilters$ = new BehaviorSubject<IDisplayFilters[]>([])
    private currentBindDisplayFilters$: BehaviorSubject<IDisplayFilters[]>
    private storeIndex: number

    /**
     * all service subscriptions
     */
    private filterSubscription = new Subscription()

    constructor(private store: FilterStoreService) {
        this.init()
    }

    init() {
        this.storeIndex = this.store.createStoreFilter()
        this.getFilters()
    }

    getFilters() {
        this.filterSubscription.unsubscribe()
        const subject = this.store.getCurrentFilter(this.storeIndex)
        if (subject) {
            this.currentBindDisplayFilters$ = subject
            this.filterSubscription.add(
                subject
                    .pipe(
                        map((filters: IDisplayFilters[]) => {
                            this.displayFilters$.next(filters)
                            return []
                        })
                    )
                    .subscribe((filters: ICollectionFilter[]) => {
                        this.filters$.next(filters)
                    })
            )
        }
    }

    setDisplayFilters(filters: IDisplayFilters[]) {
        if (this.currentBindDisplayFilters$) {
            this.currentBindDisplayFilters$.next(filters)
        }
    }
    ngOnDestroy(): void {
        this.filterSubscription.unsubscribe()
        this.store.removeCollectionFilter(this.storeIndex)
    }
}
