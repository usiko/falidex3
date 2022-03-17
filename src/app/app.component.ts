import { Component, OnInit } from '@angular/core';
import { CirculaireCollectionService } from './services/collection-item/circulaire/circulaire-collection.service';
import { FiliereCollectionService } from './services/collection-item/filiere/filiere-collection.service';
import { SignificationCollectionService } from './services/collection-item/signification/signification-collection.service';
import { SymbolCollectionService } from './services/collection-item/symbol/symbol-collection.service';
import { DataLoaderStoreService } from './services/data-store/loader/data-loader-store.service';
import { SubStoreService } from './services/data-store/sub-store/sub-store.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    public appPages: { title: string, url: string, icon?: string, src?: string, disabled?: boolean }[];

    constructor(
        private loaderStoreService: DataLoaderStoreService,
        private circulaireService: CirculaireCollectionService,
        private significationsService: SignificationCollectionService,
        private filieresService: FiliereCollectionService,
        private symbolService: SymbolCollectionService,
        private subStore: SubStoreService
    ) { }

    ngOnInit() {
        this.circulaireService.collection$.subscribe(items => {
            console.log(items);
        });
        this.significationsService.collection$.subscribe(items => {
            console.log(items);
        });
        this.filieresService.collection$.subscribe(items => {
            console.log(items);
        });
        this.symbolService.collection$.subscribe(items => {
            console.log(items);
        });
        this.initData();
        this.setMenu();

    }

    setMenu() {
        const appPages: { title: string, url: string, icon?: string, src?: string, disabled?: boolean }[] = [
            {
                title: 'Acceuil',
                url: '/',
                icon: 'home'
            }];
        /*if (this.databuilder.getSymboles().length !== 0) {
            appPages.push(
                {
                    title: 'Insignes/emblemes',
                    url: '/symboles',
                    icon: 'medal',
                });
        }
        if (this.databuilder.getFilieres().length !== 0) {
            appPages.push(
                {
                    title: 'Filières',
                    url: '/filieres',
                    icon: 'school'
                });
        }
        if (this.databuilder.getSpes().length !== 0) {
            appPages.push(
                {
                    title: 'Toutes les spés',
                    url: '/spes',
                    src: 'assets/svg/file-info.svg'
                });
        }
        if (this.databuilder.getFileCode().length !== 0) {
            appPages.push(
                {
                    title: 'Codes',
                    url: '/codes',
                    icon: 'paper',
                    disabled: true
                });
        }
        if (this.databuilder.getSymboles().length !== 0 || this.databuilder.getFilieres().length !== 0) {
            appPages.push(
                {
                    title: 'Revisions',
                    url: '/revisions',
                    icon: 'bulb',
                    disabled: false
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
        this.loaderStoreService.loadCollection();
        this.loaderStoreService.loadRelations();
    }
}
