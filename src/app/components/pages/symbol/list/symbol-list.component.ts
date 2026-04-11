import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ISymbol } from 'src/app/models/linked-data-models';
import { SortEnum } from 'src/app/models/sort/sort.model';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { FilterPreset } from 'src/app/services/filter/filter.preset';
import { FilterService } from 'src/app/services/filter/filter.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
import { PageItemList } from '../../pages-list';
import { IonHeader, IonContent, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/angular/standalone";
import { HeaderComponent } from "src/app/components/shared/header/header.component";
import { LisContainerComponent } from "src/app/components/block/list/list-container/list-container.component";
import { SymbolBlockItemListComponent } from "src/app/components/block/list/symbol-item/list/symbole-block-item-list.component";
import { SymbolBlockItemGalleryComponent } from "src/app/components/block/list/symbol-item/gallery/symbole-block-item-gallery.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-symbol-list',
    templateUrl: './symbol-list.component.html',
    styleUrls: ['./symbol-list.component.scss'],
    providers: [ListManagerService, FilterService],
    imports: [IonHeader,CommonModule, HeaderComponent, IonContent, LisContainerComponent, IonInfiniteScroll, IonInfiniteScrollContent, SymbolBlockItemListComponent, SymbolBlockItemGalleryComponent],
})
export class SymbolListComponent extends PageItemList<ISymbol> implements OnInit {
    /**
     * main page container
     */
    @ViewChild(IonContent) override content!: IonContent;

    override showScrollTopBtn = true;
    constructor(
        protected override collectionService: SymbolCollectionService,
        protected override events: EventService,
        protected override listManagerService: ListManagerService<ISymbol>,
        protected override changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit() {
        this.setSort('name', SortEnum.asc);
        super.init();
        this.initDisplayFilters([
            FilterPreset.getDataType('Représente'),
            FilterPreset.getCirculaireType('Type de circulaire'),
            FilterPreset.getSpecificity('Specificité'),
        ]);
    }
}
