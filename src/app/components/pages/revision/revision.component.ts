import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter/filter.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';

@Component({
    selector: 'app-revision',
    templateUrl: './revision.component.html',
    styleUrls: ['./revision.component.scss'],
    providers: [ListManagerService, FilterService],
})
export class RevisionPageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
