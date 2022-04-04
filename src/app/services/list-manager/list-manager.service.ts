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
	public currentFilters: ICollectionFilter[] = [];

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

	public setDisplayFilters() {}

	addFilter(property: string, value: any, operator: FilterOperatorEnum, propertyGetter?: () => any): number {
		const index = this.currentFilters.push({
			property,
			value,
			operator,
		});
		this.updateItems();
		return index - 1;
	}
	updateFilter(index: number, property: string, value: any, operator: FilterOperatorEnum, propertyGetter?: () => any) {
		const filter = this.currentFilters[index];
		if (filter) {
			filter.property = property;
			filter.value = value;
			filter.operator = operator;
			filter.valueGetter = propertyGetter;
			this.updateItems();
		}
	}
	removeFilter(index) {
		if (this.currentFilters[index]) {
			this.currentFilters.splice(index, 0);
			this.updateItems();
		}
	}

	setDisplayFilters(displayFilters: IDisplayFilters[]) {
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

	private applyFilters(item: ICollectionData): boolean {
		for (const filter of this.currentFilters) {
			const value = filter.value;
			if (item[filter.property] && value) {
				switch (filter.operator) {
					case FilterOperatorEnum.contain:
						return item[filter.property].includes(value);
					case FilterOperatorEnum.different:
						return item[filter.property] !== value;
					case FilterOperatorEnum.equal:
						return item[filter.property] === value;
					case FilterOperatorEnum.exclude:
						return !item[filter.property].includes(value);
				}
			}
		}

		return true;
	}
}
