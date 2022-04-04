import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CirculaireCollectionService } from './services/collection-item/circulaire/circulaire-collection.service';
import { FiliereCollectionService } from './services/collection-item/filiere/filiere-collection.service';
import { SignificationCollectionService } from './services/collection-item/signification/signification-collection.service';
import { SymbolCollectionService } from './services/collection-item/symbol/symbol-collection.service';
import { DataLoaderStoreService } from './services/data-store/loader/data-loader-store.service';
import { SubStoreService } from './services/data-store/sub-store/sub-store.service';
import { EventService } from './services/event/event.service';
import { DataRelationsService } from './services/relations/data-relations.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
	public appPages: {
		title: string;
		url: string;
		icon?: string;
		src?: string;
		disabled?: boolean;
	}[];

	public relationsData$ = new BehaviorSubject<{ name: string; id: string }[]>([]);
	public currentRelationsData$ = new BehaviorSubject<{
		name: string;
		id: string;
	}>(null);

	constructor(
		private loaderStoreService: DataLoaderStoreService,
		private circulaireService: CirculaireCollectionService,
		private significationsService: SignificationCollectionService,
		private filieresService: FiliereCollectionService,
		private symbolService: SymbolCollectionService,
		private subStore: SubStoreService,
		private relationService: DataRelationsService
	) {}

	ngOnInit() {
		this.initListeners();
		this.initData();
	}

	setMenu() {
		const appPages: {
			title: string;
			url: string;
			icon?: string;
			src?: string;
			disabled?: boolean;
		}[] = [
			{
				title: 'Accueil',
				url: '/',
				icon: 'home',
			},
			{
				title: 'Insignes/emblemes',
				url: '/symbols',
				icon: 'medal',
				disabled: this.symbolService.collection$.getValue().length == 0,
			},
			{
				title: 'Filières',
				url: '/filieres',
				icon: 'school',
				disabled: this.filieresService.collection$.getValue().length == 0,
			},
		];

		/*if (this.databuilder.getSpes().length !== 0) {
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

	public setCurrentRelation(event) {
		this.relationService.setCurrentRelation(event.detail.value);
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

	private initListeners() {
		// updating menu from data
		this.filieresService.collection$.subscribe((items) => {
			this.setMenu();
		});
		this.symbolService.collection$.subscribe((items) => {
			this.setMenu();
		});

		this.relationService.getRelationList().subscribe((items) => {
			this.relationsData$.next(items);
		});
		this.relationService.getCurrentRelation().subscribe((item) => {
			this.currentRelationsData$.next(item);
		});
	}
}
