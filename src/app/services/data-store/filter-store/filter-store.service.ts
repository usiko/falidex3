import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDisplayFilters, DisplayFilters } from 'src/app/models/filters/filter-model';

@Injectable({
	providedIn: 'root',
})
export class FilterStoreService {
	private collectionDisplayFilters$ = new BehaviorSubject<Map<number, BehaviorSubject<DisplayFilters[]>>>(new Map());

	/**
	 * only for filters page
	 */
	currentDisplayFilter$: BehaviorSubject<DisplayFilters[]> = new BehaviorSubject([]);
	private currentFilterId: number;
	private lastIndex = 0;

	createStoreFilter() {
		const index = this.lastIndex;
		this.addCollectionFilter(index, []);
		this.lastIndex++;
		return index;
	}

	/**
	 * @param  {number} id
	 */
	getCurrentFilter(id: number): BehaviorSubject<IDisplayFilters[]> {
		const map = this.collectionDisplayFilters$.getValue();
		if (map.has(id)) {
			this.updateCurrentFilter(id);
			return map.get(id);
		}
	}

	/**
	 * @param  {number} id
	 */
	private updateCurrentFilter(id: number) {
		if (this.collectionDisplayFilters$.getValue().has(id)) {
			this.currentFilterId = id;
			this.currentDisplayFilter$.next(this.collectionDisplayFilters$.getValue().get(this.currentFilterId).getValue());
		}
	}

	/**
	 * @param  {number} id
	 * @param  {IDisplayFilters[]} filters
	 */
	addCollectionFilter(id: number, filters: IDisplayFilters[]) {
		const map = this.collectionDisplayFilters$.getValue();
		if (!map.has(id)) {
			map.set(
				id,
				new BehaviorSubject(
					filters.map((item) => {
						return new DisplayFilters(item);
					})
				)
			);
		}
		this.collectionDisplayFilters$.next(map);
	}

	/**
	 * @param  {number} id
	 */
	removeCollectionFilter(id: number) {
		const map = this.collectionDisplayFilters$.getValue();
		if (map.has(id)) {
			const subject = map.get(id);
			subject.complete();
			subject.unsubscribe();
			map.delete(id);
		}
		this.collectionDisplayFilters$.next(map);
	}

	/**
	 * @param  {number} id
	 * @param  {IDisplayFilters[]} filters
	 */
	updateCollectionFilter(id: number, filters: IDisplayFilters[]) {
		const map = this.collectionDisplayFilters$.getValue();
		if (map.has(id)) {
			const subject = map.get(id);
			subject.next(
				filters.map((item) => {
					return new DisplayFilters(item);
				})
			);
		}
	}
}
