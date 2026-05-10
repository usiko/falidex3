import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent, IonMenu, IonHeader, IonToolbar, IonTitle, IonItem, IonSelect, IonSelectOption, SelectCustomEvent, IonLabel } from '@ionic/angular/standalone';
import { CirculaireCollectionService } from './services/collection-item/circulaire/circulaire-collection.service';
import { CodeSpeCollectionService } from './services/collection-item/code-spe/code-spe-collection.service';
import { FiliereCollectionService } from './services/collection-item/filiere/filiere-collection.service';
import { SignificationCollectionService } from './services/collection-item/signification/signification-collection.service';
import { SymbolCollectionService } from './services/collection-item/symbol/symbol-collection.service';
import { DataLoaderStoreService } from './services/data-store/loader/data-loader-store.service';
import { SubStoreService } from './services/data-store/sub-store/sub-store.service';
import { GlobalSearchService } from './services/globale-search/global-search.service';
import { DataRelationsService } from './services/relations/data-relations.service';
import { SwService } from './services/service-worker/sw-service.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NavigationComponent } from "./components/sidebar/navigation/navigation.component";
import { FiltresComponent } from "./components/sidebar/filtres/filtres.component";
import packageJson from '../../package.json';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    IonApp,
    IonRouterOutlet,
    IonContent,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonSelect,
    IonSelectOption,
    FaIconComponent,
    FontAwesomeModule,
    IonLabel,
    CommonModule,
    NavigationComponent,
    FiltresComponent
],
})
export class AppComponent implements OnInit {
    private loaderStoreService= inject(DataLoaderStoreService);
    private circulaireService= inject(CirculaireCollectionService);
    private significationsService= inject(SignificationCollectionService);
    private filieresService= inject(FiliereCollectionService);
    private symbolService= inject(SymbolCollectionService);
    private codeSpeService= inject(CodeSpeCollectionService);
    private globaleSearch= inject(GlobalSearchService);
    private subStore= inject(SubStoreService);
    private relationService= inject(DataRelationsService);
    private updateService= inject(SwService);
    private iconLibrary = inject(FaIconLibrary)

    public appPages: { title: string; url: string; icon?:string; src?: string; disabled?: boolean }[] = []

    //public relationsData$ = new BehaviorSubject<{ name: string; id: string }[]>([]);
    protected relationList = toSignal(this.relationService.getRelationList())
    protected currentRelation = toSignal(this.relationService.getCurrentRelation())
    public menuFilters = false;
    public version = signal<string|undefined>(undefined);
    constructor()
    {
        effect(()=>{
            const current= this.currentRelation();
            if(current)
            {
                this.setMenu();
            }
        })
    }
    ngOnInit() {
        this.version.set(`${packageJson.name} v${packageJson.version}`);
        this.initIcons();
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
        this.globaleSearch.init();
        this.updateService.init().subscribe(() => {
            this.initData();
        });
    }

    setMenu() {
        const appPages: { title: string; url: string; icon?: string; src?: string; disabled?: boolean }[] = [
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

    private initIcons()
    {
        this.iconLibrary.addIconPacks(fas)
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

    public setCurrentRelation(event:SelectCustomEvent) {
        this.relationService.setCurrentRelation(event.detail.value);
    }
}
