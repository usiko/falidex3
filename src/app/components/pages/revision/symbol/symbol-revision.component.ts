import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFiliere, ISymbol } from 'src/app/models/linked-data-models';
import { SymbolCollectionService } from 'src/app/services/collection-item/symbol/symbol-collection.service';
import { RevisionPage } from '../revision-page';

@Component({
    selector: 'app-symbol-revision',
    templateUrl: './symbol-revision.component.html',
    styleUrls: ['./symbol-revision.component.scss'],
})
export class SymbolRevisionComponent extends RevisionPage<ISymbol> implements OnInit {
    constructor(
        protected collectionService: SymbolCollectionService,
        protected changeDetector: ChangeDetectorRef,
        protected activatedRoute: ActivatedRoute,
        protected routerService: Router
    ) {
        super();
    }

    ngOnInit() {
        this.init();
    }
}
