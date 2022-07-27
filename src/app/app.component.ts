import { Component, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { CirculaireCollectionService } from './services/collection-item/circulaire/circulaire-collection.service';
import { CodeSpeCollectionService } from './services/collection-item/code-spe/code-spe-collection.service';
import { FiliereCollectionService } from './services/collection-item/filiere/filiere-collection.service';
import { SignificationCollectionService } from './services/collection-item/signification/signification-collection.service';
import { SymbolCollectionService } from './services/collection-item/symbol/symbol-collection.service';
import { ConfigService } from './services/config/config.service';
import { DataLoaderStoreService } from './services/data-store/loader/data-loader-store.service';
import { SubStoreService } from './services/data-store/sub-store/sub-store.service';
import { GlobalSearchService } from './services/globale-search/global-search.service';
import { DataRelationsService } from './services/relations/data-relations.service';
import { environment } from '../environments/environment';
import { InstallAppService } from './services/install/install-app.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    public appPages: { title: string; url: string; icon?: IconName; src?: string; disabled?: boolean }[];

    public relationsData$ = new BehaviorSubject<{ name: string; id: string }[]>([]);
    public currentRelationsData$ = new BehaviorSubject<{ name: string; id: string }>(null);
    public menuFilters = false;

    constructor(
        private loaderStoreService: DataLoaderStoreService,
        private circulaireService: CirculaireCollectionService,
        private significationsService: SignificationCollectionService,
        private filieresService: FiliereCollectionService,
        private symbolService: SymbolCollectionService,
        private codeSpeService: CodeSpeCollectionService,
        private globaleSearch: GlobalSearchService,
        private subStore: SubStoreService,
        private relationService: DataRelationsService
    ) {}

    ngOnInit() {
        if (environment.production) {
            console.log('prod mode');
        } else {
            console.log('dev mode');
        }

        this.filieresService.collection$.subscribe((items) => {
            this.setMenu();
        });
        this.symbolService.collection$.subscribe((items) => {
            this.setMenu();
        });
        this.initData();

        this.relationService.getRelationList().subscribe((items) => {
            this.relationsData$.next(items);
        });
        this.relationService.getCurrentRelation().subscribe((item) => {
            this.currentRelationsData$.next(item);
            this.setMenu();
        });
        this.globaleSearch.init();
    }

    setMenu() {
        const appPages: { title: string; url: string; icon?: IconName; src?: string; disabled?: boolean }[] = [
            {
                title: 'Acceuil',
                url: '/home',
                icon: 'house',
            },
            {
                title: 'Insignes/emblemes',
                url: 'symbols',
                icon: 'award',
                disabled: this.symbolService.collection$.getValue().length == 0,
            },
            {
                title: 'Filières',
                url: 'filieres',
                icon: 'graduation-cap',
                disabled: this.filieresService.collection$.getValue().length == 0,
            },
            {
                title: 'Toutes les spés',
                url: '/spes',
                icon: 'file-circle-exclamation',
                disabled: false,
            },
            {
                title: 'Revisions',
                url: '/revisions',
                icon: 'lightbulb',
                disabled: true,
            },
        ];

        /*
        if (this.databuilder.getFileCode().length !== 0) {
            appPages.push(
                {
                    title: 'Codes',
                    url: '/codes',
                    icon: 'scroll',
                    disabled: true
                });
        }*/
        this.appPages = appPages;
    }

    private initData() {
        this.circulaireService.init();
        this.significationsService.init();
        this.filieresService.init();
        this.symbolService.init();
        this.subStore.init();
        this.codeSpeService.init();
        this.loaderStoreService.loadData();
    }

    public setCurrentRelation(event) {
        this.relationService.setCurrentRelation(event.detail.value);
    }
}
