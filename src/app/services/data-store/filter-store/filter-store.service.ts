import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDisplayFilters, DisplayFilters, ICollectionFilter } from 'src/app/models/filters/filter-model';
import { ICollectionData } from 'src/app/models/linked-data-models';

@Injectable({
    providedIn: 'root',
})
export class FilterStoreService {
    private collectionDisplayFilters$ = new BehaviorSubject<Map<number, BehaviorSubject<DisplayFilters<ICollectionData>[]>>>(new Map());

    /**
     * only for filters page
     */
    currentDisplayFilter$ = new BehaviorSubject<DisplayFilters<ICollectionData>[]>([])
    private currentFilterId: number = 0;
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
    getCurrentFilter(id: number): BehaviorSubject<IDisplayFilters<ICollectionData>[]>|undefined {
        const map = this.collectionDisplayFilters$.getValue();
        if (map.has(id)) {
            this.updateCurrentFilter(id);
            return map.get(id);
        }
        return undefined;
    }
    public updateCurrentDataFilter(filters: IDisplayFilters<ICollectionData>[]) {
        console.log('update filter', this.currentFilterId);
        if (this.collectionDisplayFilters$.getValue().has(this.currentFilterId)) {
            this.collectionDisplayFilters$.getValue().get(this.currentFilterId)?.next(filters);
        }
    }

    /**
     * @param  {number} id
     */
    private updateCurrentFilter(id: number) {
        const subject = this.collectionDisplayFilters$.getValue().get(id);
        if (subject) {
            this.currentFilterId = id;
            console.log('set current page filter index', id);
            this.currentDisplayFilter$.next(subject.getValue());
        }
    }

    /**
     * @param  {number} id
     * @param  {IDisplayFilters[]} filters
     */
    addCollectionFilter(id: number, filters: IDisplayFilters<ICollectionData>[]) {
        const map = this.collectionDisplayFilters$.getValue();
        console.log('set map filter', id);
        if (!map.has(id)) {
            const subject = new BehaviorSubject(
                filters.map((item) => {
                    return new DisplayFilters(item);
                })
            );
            (subject as any)['id-test'] = id + '--' + new Date().getTime();
            map.set(id, subject);
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
            if(subject)
            {
                subject.complete();
                subject.unsubscribe();
            }
            map.delete(id);
        }
        this.collectionDisplayFilters$.next(map);
    }

    /**
     * @param  {number} id
     * @param  {IDisplayFilters[]} filters
     */
    updateCollectionFilter(id: number, filters: IDisplayFilters<ICollectionData>[]) {
        const map = this.collectionDisplayFilters$.getValue();
        if (map.has(id)) {
            const subject = map.get(id);
           if(subject)
           {
             subject.next(
                filters.map((item) => {
                    return new DisplayFilters(item);
                })
            );
           }
        }
    }
}
