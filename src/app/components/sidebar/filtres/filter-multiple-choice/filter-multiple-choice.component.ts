import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-filter-multiple-choice',
    templateUrl: './filter-multiple-choice.component.html',
    styleUrls: ['./filter-multiple-choice.component.scss'],
})
export class FilterMultipleChoiceComponent implements OnInit {

    constructor() { }
    @Input() value: string;
    @Input() choices: any[];
    //@Input() choices: FilterChoice[];
    @Output() onchange = new EventEmitter();
    ngOnInit() {

    }
    radioChange(data: CustomEvent) {
        this.value = data.detail.value;
        this.onchange.emit(this.value);
    }

}
