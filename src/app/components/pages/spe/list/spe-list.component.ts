import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ICodeSpe, ICollectionData, IFiliere, ISymbol } from 'src/app/models/linked-data-models';
import { CodeSpeCollectionService } from 'src/app/services/collection-item/code-spe/code-spe-collection.service';
import { FiliereCollectionService } from 'src/app/services/collection-item/filiere/filiere-collection.service';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { EventService } from 'src/app/services/event/event.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { ListManagerService } from 'src/app/services/list-manager/list-manager.service';
import { PageItemList } from '../../pages-list';

@Component({
    selector: 'app-spe-list',
    templateUrl: './spe-list.component.html',
    styleUrls: ['./spe-list.component.scss'],
    providers: [ListManagerService, FilterService],
})
export class SpeListComponent extends PageItemList<ICodeSpe> implements OnInit {
    @ViewChild(IonSlides) slide: IonSlides;
    public activeSlide = 0;

    public filieres$ = new BehaviorSubject<IFiliere[]>([]);
    public symbols$ = new BehaviorSubject<ISymbol[]>([]);
    showScrollTopBtn = true;
    constructor(
        protected symbolsService: SymbolCollectionService,
        protected filieresService: FiliereCollectionService,
        protected SpeService: CodeSpeCollectionService,
        protected events: EventService,
        protected listManagerService: ListManagerService<ICollectionData>,
        protected changeDetector: ChangeDetectorRef
    ) {
        super();
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

    switch(num: number) {
        this.activeSlide = num;
        if (this.slide) {
            this.slide.slideTo(num);
        }
        
    }

    slidesChange(data) {
        this.scrollToTop();
        if (this.slide) {
            this.slide.getActiveIndex().then((num) => {
                this.activeSlide = num;
            });
        }
    }
}
