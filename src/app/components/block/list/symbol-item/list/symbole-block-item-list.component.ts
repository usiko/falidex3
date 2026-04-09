import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ICirculaire, ICollectionLink, IFiliere, ISignification, ISymbol } from 'src/app/models/linked-data-models';
import { ISubBaseCirculaire, ISubBaseFiliere, ISubBaseSignification } from 'src/app/models/sub-base-data-models';
import { ListItem } from '../../list-item';
import { IonItem, IonThumbnail, IonLabel, IonSkeletonText } from "@ionic/angular/standalone";
import { ImgLoaderComponent } from "src/app/components/shared/img-loader/img-loader.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { RouterModule } from '@angular/router';

/**
 * item block of symbole list showing
 */
@Component({
    selector: 'app-block-symbol-item-list',
    templateUrl: './symbole-block-item-list.component.html',
    styleUrls: ['./symbole-block-item-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonItem, IonThumbnail, ImgLoaderComponent, IonLabel, FaIconComponent, IonSkeletonText, RouterModule],
})
export class SymbolBlockItemListComponent extends ListItem<ISymbol> implements OnInit {
    /**
     * symbole item to show
     */
    @Input() item: ISymbol;

    /**
     * show if this item is specific
     * @deprecated (?)
     */
    @Input() showSpe = true;

    /**
     * show navigation arrow
     */
    @Input() navigation: string = null;

    constructor(protected override changedetector: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {}

    override  click() {
        this.onclick.emit();
    }
}
