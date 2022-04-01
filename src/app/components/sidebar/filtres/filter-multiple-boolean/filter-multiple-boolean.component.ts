import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
    selector: 'app-filter-multiple-boolean',
    templateUrl: './filter-multiple-boolean.component.html',
    styleUrls: ['./filter-multiple-boolean.component.scss'],
})
export class FilterMultipleBooleanComponent implements OnInit {
    @Input() value: string[];
    @Input() filters: any[] = [];
   // @Input() filters: FilterBoolean[] = [];
    @Output() onchange = new EventEmitter();
    constructor() { }

    ngOnInit() { }

    filterChange() {
        const values = [];
        this.filters.forEach(filter => {
            if (filter.value) {
                values.push(filter.name);
            }
        });
        this.onchange.emit(values);
    }

}
