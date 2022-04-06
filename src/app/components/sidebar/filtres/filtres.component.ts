import { Component, OnDestroy, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ICollectionFilter, IDisplayFilters } from 'src/app/models/filters/filter-model'
import { ICollectionData } from 'src/app/models/linked-data-models'
import { FilterStoreService } from 'src/app/services/data-store/filter-store/filter-store.service'

@Component({
    selector: 'app-filtres',
    templateUrl: './filtres.component.html',
    styleUrls: ['./filtres.component.scss'],
})
export class FiltresComponent implements OnInit, OnDestroy {
    /*@Input() filters: Filter[] = [];
    @Output() onfilterChange = new EventEmitter<{
        name: string,
        value: Filter
    }>();*/
    public filtersList$: BehaviorSubject<IDisplayFilters<ICollectionData>[]>
    constructor(private filterStore: FilterStoreService) {}

    ngOnInit() {
        this.filtersList$ = this.filterStore.currentDisplayFilter$
    }

    filterChange() {
        this.filterStore.updateCurrentDataFilter(this.filtersList$.getValue())
    }

    ngOnDestroy() {}
}
