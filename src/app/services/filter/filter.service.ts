import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IDisplayFilters, ICollectionFilter } from 'src/app/models/filters/filter-model';
import { FilterStoreService } from '../data-store/filter-store/filter-store.service';
import { map } from 'rxjs/operators';

@Injectable()
export class FilterService implements OnDestroy {
	public filters$ = new BehaviorSubject<ICollectionFilter[]>([]);
	public displayFilters$ = new BehaviorSubject<IDisplayFilters[]>([]);
	private storeIndex: number;

	/**
	 * all service subscriptions
	 */
	private filterSubscription = new Subscription();

	constructor(private store: FilterStoreService) {
		this.init();
	}

	init() {
		this.storeIndex = this.store.createStoreFilter();
		this.getFilters();
	}

	getFilters() {
		this.filterSubscription.unsubscribe();
		const subject = this.store.getCurrentFilter(this.storeIndex);
		if (subject) {
			this.filterSubscription.add(
				subject.pipe(
					map((filters: IDisplayFilters[]) => {
						this.displayFilters$.next(filters);
						return filters.reduce((acc: ICollectionFilter[], item: IDisplayFilters) => {
							acc.push(...item.getFilters());
							return acc;
						}, []);
					}).subscribe((filters: ICollectionFilter[]) => {
						this.filters$.next(filters);
					})
				)
			);
		}
	}

    setDisplayFilters(filters: IDisplayFilters[]) {
        
    }
	ngOnDestroy(): void {
		this.filterSubscription.unsubscribe();
		this.store.removeCollectionFilter(this.storeIndex);
	}
}
