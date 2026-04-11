import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CiculaireMatiereEnum } from 'src/app/models/circulaire-matiere.enum';
import { IFiliere } from 'src/app/models/linked-data-models';
import { SortEnum } from 'src/app/models/sort/sort.model';
import { FiliereCollectionService } from 'src/app/services/collection-item/filiere/filiere-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { FilterPreset } from 'src/app/services/filter/filter.preset';
import { FilterService } from 'src/app/services/filter/filter.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
import { PageItemList } from '../../pages-list';
import { IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/shared/header/header.component";
import { LisContainerComponent } from "src/app/components/block/list/list-container/list-container.component";
import { FiliereBlockItemListComponent } from "src/app/components/block/list/filiere/list/filiere-block-item-list.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-filiere-list',
    templateUrl: './filiere-list.component.html',
    styleUrls: ['./filiere-list.component.scss'],
    providers: [ListManagerService, FilterService],
    imports: [IonHeader, HeaderComponent, IonContent, LisContainerComponent, IonInfiniteScroll, IonInfiniteScrollContent, FiliereBlockItemListComponent,CommonModule],
})
export class FiliereListComponent extends PageItemList<IFiliere> implements OnInit {
    /**
     * main page container
     */
    @ViewChild(IonContent) override content!: IonContent;

    override showScrollTopBtn = true;
    public override pageSize = 0;
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
        this.initDisplayFilters([FilterPreset.getCirculaireType('Type de circulaire'), FilterPreset.getSpecificity('Specificité')]);
    }
}
