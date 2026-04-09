import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IFiliere } from 'src/app/models/linked-data-models';
import { ListItem } from '../../list-item';
import { IonItem, IonLabel, IonSkeletonText } from "@ionic/angular/standalone";
import { CirculaireRepresentationComponent } from "src/app/components/shared/circulaire-representation/circulaire-representation.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'app-filiere-nosymb-block-item-list',
    templateUrl: './filiere-nosymb-block-item-list.component.html',
    styleUrls: ['./filiere-nosymb-block-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonItem, IonLabel, CirculaireRepresentationComponent, FaIconComponent, IonSkeletonText],
})
export class FiliereNosymbBlockItemListComponent extends ListItem<IFiliere> implements OnInit {
    @Input() item: IFiliere;
    @Input() showSpe = true;
    @Input() navigation: string = null;
    @Input() cssClass: string;

    constructor(protected changedetector: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {}
}
