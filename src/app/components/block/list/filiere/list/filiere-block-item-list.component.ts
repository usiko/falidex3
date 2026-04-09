import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IFiliere } from 'src/app/models/linked-data-models';
import { ListItem } from '../../list-item';
import { IonItem, IonThumbnail, IonLabel, IonSkeletonText } from "@ionic/angular/standalone";
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";
import { CirculaireRepresentationComponent } from "src/app/components/shared/circulaire-representation/circulaire-representation.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'app-filiere-block-item-list',
    templateUrl: './filiere-block-item-list.component.html',
    styleUrls: ['./filiere-block-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonItem, IonThumbnail, ImgLoaderComponent, IonLabel, CirculaireRepresentationComponent, FaIconComponent, IonSkeletonText],
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
