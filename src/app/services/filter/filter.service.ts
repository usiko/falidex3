import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IDisplayFilterModel } from 'src/app/models/filters/filter-model';
import { FilterStoreService } from '../data-store/filter-store/filter-store.service';

@Injectable()
export class FilterService implements OnDestroy {
  public filters$ = new BehaviorSubject<IDisplayFilterModel[]>([]);
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
        subject.subscribe((filters) => {
          this.filters$.next(filters);
        })
      );
    }
  }
  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
    this.store.removeCollectionFilter(this.storeIndex);
  }
}
