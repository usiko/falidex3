import { ChangeDetectorRef, Component, OnInit, model, ViewChild, effect } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICodeSpe, ICollectionData, IFiliere, ISymbol } from 'src/app/models/linked-data-models';
import { CodeSpeCollectionService } from 'src/app/services/collection-item/code-spe/code-spe-collection.service';
import { FiliereCollectionService } from 'src/app/services/collection-item/filiere/filiere-collection.service';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
import { PageItemList } from '../../pages-list';
import { IonContent, IonHeader, IonFab, IonFabButton, IonListHeader, IonLabel, IonList, IonFooter, IonTabBar, IonTabButton, IonBadge } from '@ionic/angular/standalone';
import { IBaseCollectionData } from 'src/app/models/base-data-models';
import { ICollectionItem } from 'src/app/services/collection-item/collection.service';
import { HeaderComponent } from "src/app/components/shared/header/header.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { SpeBlockItemListComponent } from "src/app/components/block/list/spe/list/spe-block-item-list.component";
import { FiliereBlockItemListComponent } from "src/app/components/block/list/filiere/list/filiere-block-item-list.component";
import { SymbolBlockItemListComponent } from "src/app/components/block/list/symbol-item/list/symbole-block-item-list.component";
import { CommonModule } from '@angular/common';
import { SliderComponent } from 'src/app/components/shared/slider/slider.component';
import { SlideDirective } from 'src/app/components/shared/slider/slide.directive';

@Component({
    selector: 'app-spe-list',
    templateUrl: './spe-list.component.html',
    styleUrls: ['./spe-list.component.scss'],
    providers: [ListManagerService, FilterService],
    imports: [IonHeader, HeaderComponent, IonContent, IonFab, IonFabButton, FaIconComponent, IonListHeader, IonLabel, IonList, SpeBlockItemListComponent, FiliereBlockItemListComponent, SymbolBlockItemListComponent, IonFooter, IonTabBar, IonTabButton, IonBadge, CommonModule, SliderComponent, SlideDirective],
})
export class SpeListComponent extends PageItemList<ICodeSpe> implements OnInit {
    /**
         * main page container
         */
    @ViewChild(IonContent) override content!: IonContent;
    public activeSlide = model(0);

    public filieres$ = new BehaviorSubject<IFiliere[]>([]);
    public symbols$ = new BehaviorSubject<ISymbol[]>([]);
    override showScrollTopBtn = true;
    protected override collectionService: ICollectionItem<IBaseCollectionData, ICodeSpe> | undefined = undefined;

    constructor(
        protected symbolsService: SymbolCollectionService,
        protected filieresService: FiliereCollectionService,
        protected SpeService: CodeSpeCollectionService,
        protected events: EventService,
        protected listManagerService: ListManagerService<ICollectionData>,
        protected changeDetector: ChangeDetectorRef
    ) {
        super();
        effect(() => {
            // Écoute les changements de slide pour scroll to top
            this.activeSlide();
            this.scrollToTop();
        });
    }

    ngOnInit() {
        this.symbolsService.getCollectionSpe().subscribe((items) => {
            this.symbols$.next(items);
        });
        this.filieresService.getCollectionSpe().subscribe((items) => {
            this.filieres$.next(items);
        });
        this.SpeService.collection$.subscribe((items) => {
            this.items$.next(items);
        });
        // text spe service
    }
}
