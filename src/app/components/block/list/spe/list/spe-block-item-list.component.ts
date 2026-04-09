import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ICodeSpe } from 'src/app/models/linked-data-models';
import { ListItem } from '../../list-item';

@Component({
    selector: 'app-spe-block-item-list',
    templateUrl: './spe-block-item-list.component.html',
    styleUrls: ['./spe-block-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeBlockItemListComponent extends ListItem<ICodeSpe> implements OnInit {
    @Input() item: ICodeSpe;
    @Input() showSpe = true;
    @Input() navigation: string = null;
    @Input() cssClass: string;

    constructor(protected changedetector: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {}
}
