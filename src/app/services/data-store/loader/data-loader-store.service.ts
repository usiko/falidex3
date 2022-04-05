import { Injectable } from '@angular/core';
import Circulaires from '../../mocks/item-data/circulaires.json';
import CirculairesColors from '../../mocks/item-data/circulaires-colors.json';
import Colors from '../../mocks/item-data/colors.json';
import Filieres from '../../mocks/item-data/filieres.json';
import Significations from '../../mocks/item-data/significations.json';
import Symbols from '../../mocks/item-data/symboles.json';
import SymbolsSens from '../../mocks/item-data/symboles-sens.json';
import SymbolAccessory from '../../mocks/item-data/symbole-accessoire.json';
import Placements from '../../mocks/item-data/placements.json';
import Positions from '../../mocks/item-data/positions.json';
import TLNRelation from '../../mocks/relations/toulon.json';
import NATRelation from '../../mocks/relations/national.json';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, take, map } from 'rxjs/operators';
import {
	IBaseCirculaire,
	IBaseCirculaireColor,
	IBaseCollectionData,
	IBaseColor,
	IBaseFiliere,
	IBasePlacement,
	IBasePosition,
	IBaseSignification,
	IBaseSymbol,
	IBaseSymbolAcessory,
	IBaseSymbolSens,
} from 'src/app/models/base-data-models';
import { StoreService } from '../base-store/store.service';
import { ILoadingBarState } from '../../../models/global.model';

@Injectable({
	providedIn: 'root',
})
export class DataLoaderStoreService {
	constructor(private store: StoreService, private event: EventService) {}

	loadData(): void {
		of()
			.pipe(
				switchMap(() => {
					this.displayLoading({
						enable: true,
						value: 0,
						buffer: 0.8,
						message: 'Accrochage des grelots',
					});
					return this.dispactIntoSubject(this.loadPlacements(), this.store.placements$);
				}),
				switchMap(() => {
					this.displayLoading({
						enable: true,
						value: 0.8,
						buffer: 1.6,
						message: 'Tocardisation des tocards',
					});
					return this.dispactIntoSubject(this.loadSymbolsAccessory(), this.store.symbolesAccessories$);
				}),
				switchMap(() => {
					this.displayLoading({
						enable: true,
						value: 1.6,
						buffer: 3,
						message: 'Cuisson de la faluche',
					});
					return this.dispactIntoSubject(this.loadPositions(), this.store.positions$);
				}),
				switchMap(() => {
					this.displayLoading({
						enable: true,
						value: 3,
						buffer: 3.8,
						message: 'Drama satin/velours',
					});
					this.dispactIntoSubject(this.loadCirculaires(), this.store.circulaires$);
				}),
				switchMap(() => {
					this.displayLoading({
						enable: true,
						value: 3.8,
						buffer: 4.6,
						message: 'Coloriage des rubans',
					});
					return this.dispactIntoSubject(this.loadCirculairesColors(), this.store.circulairesColors$);
				}),
				switchMap(() => {
					this.displayLoading({
						enable: true,
						value: 4.6,
						buffer: 5.4,
						message: 'Couture des circulaires',
					});
					return this.dispactIntoSubject(this.loadColors(), this.store.colors$);
				}),
				switchMap(() => {
					this.displayLoading({
						enable: true,
						value: 5.4,
						buffer: 6.2,
						message: 'Décuvage des PMs',
					});
					return this.dispactIntoSubject(this.loadFilieres(), this.store.filieres$);
				}),
				switchMap(() => {
					this.displayLoading({
						enable: true,
						value: 6.2,
						buffer: 7,
						message: 'Décernement des singes',
					});
					return this.dispactIntoSubject(this.loadSymbols(), this.store.symboles$);
				}),
				switchMap(() => {
					this.displayLoading({
						enable: true,
						value: 7,
						buffer: 7.8,
						message: 'Prepatation des pichets',
					});
					return this.dispactIntoSubject(this.loadSymbolsSens(), this.store.symbolesSens$);
				}),

				switchMap(() => {
					this.displayLoading({
						enable: true,
						value: 7.8,
						buffer: 8.6,
						message: 'Tarte aux pommes',
					});
					return this.dispactIntoSubject(this.loadSignifications(), this.store.significations$);
				}),

				switchMap(() => {
					this.displayLoading({
						enable: true,
						value: 8.6,
						buffer: 1,
						message: 'Lecture du code',
					});
					return this.loadRelations();
				})
			)
			.subscribe(() => {
				this.displayLoading({
					enable: true,
					value: 1,
					buffer: 1,
					message: '"La fal c`est un truc serieux"',
				});
				setTimeout(() => {
					this.displayLoading({
						enable: false,
						value: 0,
						buffer: 0,
						message: '',
					});
				}, 750);
			});
	}

	private loadRelations(): Observable<never> {
		of([TLNRelation, NATRelation]).pipe(
			map((items) => {
				console.log('relation loaded');
				this.store.dataRelations$.next(items);
				console.log('relation selected');
				this.store.currentDataRelations$.next(items[0]);
			})
		);
	}

	private loadCirculaires(): Observable<IBaseCirculaire[]> {
		return of(Circulaires);
	}

	private loadCirculairesColors(): Observable<IBaseCirculaireColor[]> {
		return of(CirculairesColors);
	}

	private loadColors(): Observable<IBaseColor[]> {
		return of(Colors);
	}

	private loadFilieres(): Observable<IBaseFiliere[]> {
		return of(Filieres);
	}
	private loadSignifications(): Observable<IBaseSignification[]> {
		return of(Significations);
	}
	private loadSymbols(): Observable<IBaseSymbol[]> {
		return of(Symbols);
	}
	private loadSymbolsSens(): Observable<IBaseSymbolSens[]> {
		return of(SymbolsSens);
	}
	private loadSymbolsAccessory(): Observable<IBaseSymbolAcessory[]> {
		return of(SymbolAccessory);
	}
	private loadPlacements(): Observable<IBasePlacement[]> {
		return of(Placements);
	}
	private loadPositions(): Observable<IBasePosition[]> {
		return of(Positions);
	}

	private dispactIntoSubject(obs: Observable<IBaseCollectionData[]>, subject: BehaviorSubject<IBaseCollectionData[]>) {
		obs.pipe(
			take(1),
			map((items) => {
				console.log(items.length, 'items loaded');
				subject.next(items);
				return items;
			}),
			//add delay here
			catchError((error) => {
				console.error(error);
				return of([]);
			})
		);
	}

	private displayLoading(loadingState: ILoadingBarState) {
		this.event.publish('loadingStateBar', loadingState);
	}
}
