import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ICollectionLink, ISymbol } from 'src/app/models/linked-data-models';
import { SortEnum } from 'src/app/models/sort/sort.model';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
import { DifferentLinkFilter, DisplayFilters, DisplayToggleFilter, ExludeLinkFilter } from '../../../../models/filters/filter-model';
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
            new DisplayFilters<any>({
                label: 'Type de circulaire',
                filters: [
                    new DisplayToggleFilter<ICollectionLink>({
                        label: 'velours',
                        enabled: true,
                        filter: new ExludeLinkFilter({
                            values: ['VELOURS'],
                            propertyGetter: (link) => {
                                return link.circulaire?.matiere;
                            },
                        }),
                    }),
                    new DisplayToggleFilter<ICollectionLink>({
                        label: 'satin',
                        enabled: true,
                        filter: new ExludeLinkFilter({
                            values: ['SATIN'],
                            propertyGetter: (link) => {
                                return link.circulaire?.matiere;
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
                        filter: new DifferentLinkFilter({
                            values: [false, null, undefined],
                            propertyGetter: (link) => {
                                return link.spe;
                            },
                        }),
                    }),
                    new DisplayToggleFilter({
                        label: 'specifique',
                        enabled: true,
                        filter: new DifferentLinkFilter({
                            values: [true],
                            propertyGetter: (link) => {
                                return link.spe;
                            },
                        }),
                    }),
                ],
            }),
        ]);
    }
}
