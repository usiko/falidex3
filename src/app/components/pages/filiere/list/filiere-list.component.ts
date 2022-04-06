import { Component, OnInit, ViewChild, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { CiculaireMatiereEnum } from 'src/app/models/circulaire-matiere.enum';
import {
    DifferentLinkFilter,
    DisplayFilters,
    DisplayToggleFilter,
    EqualLinkFilter,
    ExludeLinkFilter,
} from 'src/app/models/filters/filter-model';
import { ICollectionLink, IFiliere } from 'src/app/models/linked-data-models';
import { SortEnum } from 'src/app/models/sort/sort.model';
import { FiliereCollectionService } from 'src/app/services/collection-item/filiere/filiere-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
import { PageItemList } from '../../pages-list';

@Component({
    selector: 'app-filiere-list',
    templateUrl: './filiere-list.component.html',
    styleUrls: ['./filiere-list.component.scss'],
    providers: [ListManagerService, FilterService],
})
export class FiliereListComponent extends PageItemList<IFiliere> implements OnInit {
    showScrollTopBtn = true;
    public pageSize = 15;
    public circulaireMatEnum = CiculaireMatiereEnum;
    constructor(
        protected collectionService: FiliereCollectionService,
        protected events: EventService,
        protected listManagerService: ListManagerService<IFiliere>,
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
                            values: ['VELOURS', undefined],
                            propertyGetter: (link) => {
                                return link.circulaire?.matiere;
                            },
                        }),
                    }),
                    new DisplayToggleFilter<ICollectionLink>({
                        label: 'satin',
                        enabled: true,
                        filter: new ExludeLinkFilter({
                            values: ['SATIN', undefined],
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
                        filter: new EqualLinkFilter({
                            values: [true],
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
