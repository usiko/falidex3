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
    public appPages = [
        { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
        { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
        { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
        { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
        { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
        { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
    ];
    public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
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
