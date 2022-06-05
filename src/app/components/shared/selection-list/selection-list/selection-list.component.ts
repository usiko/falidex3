import { Component, Input, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-selection-list',
    templateUrl: './selection-list.component.html',
    styleUrls: ['./selection-list.component.scss'],
})
export class SelectionListComponent implements OnInit {
    @Input() title: string = '';
    @Input() options: { label: string; value: string; icon?: IconName }[] = [];
    @Input() dismiss$: Subject<string> = new Subject();
    constructor() {}

    ngOnInit() {}

    onDismiss(value?: string) {
        if (this.dismiss$) {
            this.dismiss$.next(value);
        }
    }
}
