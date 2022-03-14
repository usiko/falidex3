import { Component, OnInit } from '@angular/core';
import { CirculaireCollectionService } from './services/collection-item/circulaire/circulaire-collection.service';
import { SignificationCollectionService } from './services/collection-item/signification/signification-collection.service';
import { DataStoreService } from './services/data-store/data-store.service';
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
        private storeService: DataStoreService,
        private circulaireService: CirculaireCollectionService,
        private significationsService: SignificationCollectionService
    ) { }

    ngOnInit() {
        this.storeService.loadCollection();
        this.circulaireService.init();
        this.significationsService.init();
    }
}
