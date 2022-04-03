import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICollectionFilter } from 'src/app/models/filters/filter-model';
import { FilterStoreService } from 'src/app/services/data-store/filter-store/filter-store.service';


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
    public filters$:BehaviorSubject<ICollectionFilter[]>
    constructor(private filterStore:FilterStoreService) { }

    ngOnInit() {
       this.filters$ = this.filterStore.currentFilter$

    }


    ngOnDestroy() {

    }

   

}
