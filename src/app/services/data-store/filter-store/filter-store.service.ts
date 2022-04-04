import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDisplayFilterModel, } from 'src/app/models/filters/filter-model';

@Injectable({
  providedIn: 'root',
})
export class FilterStoreService {
  collectionFilters$ = new BehaviorSubject<
    Map<number, BehaviorSubject<IDisplayFilterModel[]>>
  >(new Map());

  /**
   * only for filters page
   */
  currentFilter$: BehaviorSubject<IDisplayFilterModel[]> = new BehaviorSubject(
    []
  );
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
  getCurrentFilter(id: number): BehaviorSubject<IDisplayFilterModel[]> {
    const map = this.collectionFilters$.getValue();
      if (map.has(id)) {
          this.updateCurrentFilter(id);
      return map.get(id);
    }
  }

  /**
   * @param  {number} id
   */
  private updateCurrentFilter(id: number) {
    if (this.collectionFilters$.getValue().has(id)) {
      this.currentFilterId = id;
      this.currentFilter$.next(
        this.collectionFilters$.getValue().get(this.currentFilterId).getValue()
      );
    }
  }

  /**
   * @param  {number} id
   * @param  {IDisplayFilterModel[]} filters
   */
  addCollectionFilter(id: number, filters: IDisplayFilterModel[]) {
    const map = this.collectionFilters$.getValue();
    if (!map.has(id)) {
      map.set(id, new BehaviorSubject(filters));
    }
    this.collectionFilters$.next(map);
  }

  /**
   * @param  {number} id
   */
  removeCollectionFilter(id: number) {
    const map = this.collectionFilters$.getValue();
    if (map.has(id)) {
      const subject = map.get(id);
      subject.complete();
      subject.unsubscribe();
      map.delete(id);
    }
    this.collectionFilters$.next(map);
  }

  /**
   * @param  {number} id
   * @param  {IDisplayFilterModel[]} filters
   */
  updateCollectionFilter(id: number, filters: IDisplayFilterModel[]) {
    const map = this.collectionFilters$.getValue();
    if (map.has(id)) {
      const subject = map.get(id);
      subject.next(filters);
    }
  }
}
