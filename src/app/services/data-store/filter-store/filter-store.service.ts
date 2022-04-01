import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICollectionFilter } from 'src/app/models/filters/filter-model';

@Injectable({
  providedIn: 'root',
})
export class FilterStoreService {
  collectionFilters$ = new BehaviorSubject<Map<string, ICollectionFilter[]>>(
    new Map()
  );
  currentFilter$: BehaviorSubject<ICollectionFilter[]> = new BehaviorSubject(
    []
  );
  private currentFilterId: string;

    
    
  /**
   * @param  {string} id
   */
  setCurrentFilter(id: string) {
    if (this.collectionFilters$.getValue().has(id)) {
      this.currentFilterId = id;
    }
  }
  /**
   * @param  {string} id
   * @param  {ICollectionFilter[]} filters
   */
  addCollectionFilter(id: string, filters: ICollectionFilter[]) {
    const map = this.collectionFilters$.getValue();
    if (!map.has(id)) {
      map.set(id, filters);
    }
    this.collectionFilters$.next(map);
  }
  /**
   * @param  {string} id
   */
  removeCollectionFilter(id: string) {
    const map = this.collectionFilters$.getValue();
    if (map.has(id)) {
      map.delete(id);
    }
    this.collectionFilters$.next(map);
  }
  /**
   * @param  {string} id
   * @param  {ICollectionFilter[]} filters
   */
  updateCollectionFilter(id: string, filters: ICollectionFilter[]) {
    const map = this.collectionFilters$.getValue();
    if (map.has(id)) {
      map.set(id, filters);
    }
    this.collectionFilters$.next(map);
  }
  /**
   */
  private updateFilter() {
    this.currentFilter$.next(
      this.collectionFilters$.getValue().get(this.currentFilterId)
    );
  }
}
