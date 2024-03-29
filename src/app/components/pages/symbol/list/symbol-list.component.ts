import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ISymbol } from 'src/app/models/linked-data-models';
import { SortEnum } from 'src/app/models/sort/sort.model';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { FilterPreset } from 'src/app/services/filter/filter.preset';
import { FilterService } from 'src/app/services/filter/filter.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
import { PageItemList } from '../../pages-list';

@Component({
    selector: 'app-symbol-list',
    templateUrl: './symbol-list.component.html',
    styleUrls: ['./symbol-list.component.scss'],
    providers: [ListManagerService, FilterService],
})
export class SymbolListComponent extends PageItemList<ISymbol> implements OnInit {
    /**
     * main page container
     */
    @ViewChild(IonContent) content: IonContent;

    showScrollTopBtn = true;
    constructor(
        protected collectionService: SymbolCollectionService,
        protected events: EventService,
        protected listManagerService: ListManagerService<ISymbol>,
        protected changeDetector: ChangeDetectorRef
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
