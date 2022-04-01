import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { Filter } from 'src/app/services/filters/filters.types';

@Component({
    selector: 'app-filtres',
    templateUrl: './filtres.component.html',
    styleUrls: ['./filtres.component.scss'],
})
export class FiltresComponent implements OnInit, OnDestroy {

    @Input() filters: Filter[] = [];
    @Output() onfilterChange = new EventEmitter<{
        name: string,
        value: Filter
    }>();
    constructor() { }

    ngOnInit() {

    }


    ngOnDestroy() {

    }

    filterChange(name: string, filter: any) {
        this.onfilterChange.emit({
            name,
            value: filter
        });
    }

}
