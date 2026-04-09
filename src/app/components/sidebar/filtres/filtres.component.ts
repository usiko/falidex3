import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICollectionFilter, IDisplayFilterItem, IDisplayFilters } from 'src/app/models/filters/filter-model';
import { ICollectionData } from 'src/app/models/linked-data-models';
import { FilterStoreService } from 'src/app/services/data-store/filter-store/filter-store.service';
import { IonList, IonListHeader, IonItem, IonToggle, IonLabel } from "@ionic/angular/standalone";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-filtres',
    templateUrl: './filtres.component.html',
    styleUrls: ['./filtres.component.scss'],
    imports: [IonList, IonListHeader, IonItem, IonToggle, IonLabel, FaIconComponent, CommonModule,FormsModule],
})
export class FiltresComponent implements OnInit, OnDestroy {
    /*@Input() filters: Filter[] = [];
    @Output() onfilterChange = new EventEmitter<{
        name: string,
        value: Filter
    }>();*/
    public filtersList$ = new BehaviorSubject<IDisplayFilters<ICollectionData>[]>([]);
    private filterStore = inject(FilterStoreService);

    ngOnInit() {
        this.filtersList$ = this.filterStore.currentDisplayFilter$;
    }

    /**
     * updating current active date filter in store, using gloval current filter data
     */
    filterChange() {
        this.filterStore.updateCurrentDataFilter(this.filtersList$.getValue());
    }

    ngOnDestroy() {}
}
