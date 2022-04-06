import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ISymbol } from 'src/app/models/linked-data-models';
import { SortEnum } from 'src/app/models/sort/sort.model';
import { ISubBaseSymbol } from 'src/app/models/sub-base-data-models';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
import {
    CollectionFilter,
    ContainCollectionFilter,
    DifferentCollectionFilter,
    DisplayFilters,
    DisplayToggleFilter,
    EqualCollectionFilter,
    ExludeCollectionFilter,
} from '../../../../models/filters/filter-model';
import { PageItemList } from '../../pages-list';

@Component({
    selector: 'app-symbol-list',
    templateUrl: './symbol-list.component.html',
    styleUrls: ['./symbol-list.component.scss'],
    providers: [ListManagerService, FilterService],
})
export class SymbolListComponent extends PageItemList<ISymbol> implements OnInit {
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
            new DisplayFilters({
                label: 'Type de circulaire',
                filters: [
                    new DisplayToggleFilter({
                        label: 'velours',
                        enabled: true,
                        filter: new ExludeCollectionFilter<ISymbol>({
                            values: ['VELOURS'],
                            propertyGetter: (item) => {
                                return item.links.map((link) => {
                                    /*if (!link.circulaire) {
                                        return 'VELOURS';
                                    }*/
                                    return link.circulaire?.matiere;
                                });
                            },
                        }),
                    }),
                    new DisplayToggleFilter({
                        label: 'satin',
                        enabled: true,
                        filter: new ExludeCollectionFilter<ISymbol>({
                            values: ['SATIN'],
                            propertyGetter: (item) => {
                                return item.links.map((link) => {
                                    /*if (!link.circulaire) {
                                        return 'SATIN';
                                    }*/
                                    return link.circulaire?.matiere;
                                });
                            },
                        }),
                    }),
                ],
            }),
            new DisplayFilters({
                label: 'Specificité',
                filters: [
                    new DisplayToggleFilter({
                        label: 'commun',
                        enabled: true,
                        filter: new ExludeCollectionFilter({
                            values: [false, null, undefined],
                            propertyGetter: (item) => {
                                return item.links.map((link) => {
                                    return link.spe;
                                });
                            },
                        }),
                    }),
                    new DisplayToggleFilter({
                        label: 'specifique',
                        enabled: true,
                        filter: new ExludeCollectionFilter({
                            values: [true],
                            propertyGetter: (item) => {
                                return item.links.map((link) => {
                                    return link.spe;
                                });
                            },
                        }),
                    }),
                ],
            }),
        ]);
    }
}
