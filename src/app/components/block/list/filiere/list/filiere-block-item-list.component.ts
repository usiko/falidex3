import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IFiliere } from 'src/app/models/linked-data-models';
import { ListItem } from '../../list-item';

@Component({
    selector: 'app-filiere-block-item-list',
    templateUrl: './filiere-block-item-list.component.html',
    styleUrls: ['./filiere-block-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiliereBlockItemListComponent extends ListItem<IFiliere> implements OnInit {
    @Input() item: IFiliere;
    @Input() showSpe = true;
    @Input() navigation: string = null;
    @Input() cssClass: string;

    constructor(protected changedetector: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {}
}
