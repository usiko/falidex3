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
import { catchError, take, map, mergeMap, delay, tap } from 'rxjs/operators';
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
import { EventService } from '../../event/event.service';
import { IRelationData } from 'src/app/models/base-relations.models';

@Injectable({
	providedIn: 'root',
})
export class DataLoaderStoreService {
	private delay = 0;
	constructor(private store: StoreService, private event: EventService, private picturePrelaoder: PicturePreloaderService) {}

	loadData(): void {
		of(null)
			.pipe(
				mergeMap(() => {
					return this.dispactIntoSubject(this.loadPlacements(), this.store.placements$);
				}),
				tap(() => {
					this.displayLoading({
						enable: true,
						value: 0,
						buffer: 0.08,
						message: 'Accrochage des grelots',
					});
				}),
				mergeMap(() => {
					return this.dispactIntoSubject(this.loadSymbolsAccessory(), this.store.symbolesAccessories$);
				}),
				tap(() => {
					this.displayLoading({
						enable: true,
						value: 0.08,
						buffer: 0.16,
						message: 'Tocardisation des tocards',
					});
				}),
				mergeMap(() => {
					return this.dispactIntoSubject(this.loadPositions(), this.store.positions$);
				}),
				tap(() => {
					this.displayLoading({
						enable: true,
						value: 0.16,
						buffer: 0.3,
						message: 'Cuisson de la faluche',
					});
				}),
				mergeMap(() => {
					return this.dispactIntoSubject(this.loadCirculaires(), this.store.circulaires$);
				}),
				tap(() => {
					this.displayLoading({
						enable: true,
						value: 0.3,
						buffer: 0.38,
						message: 'Drama satin/velours',
					});
				}),
				mergeMap(() => {
					return this.dispactIntoSubject(this.loadCirculairesColors(), this.store.circulairesColors$);
				}),
				tap(() => {
					this.displayLoading({
						enable: true,
						value: 0.38,
						buffer: 0.46,
						message: 'Coloriage des rubans',
					});
				}),
				mergeMap(() => {
					return this.dispactIntoSubject(this.loadColors(), this.store.colors$);
				}),
				tap(() => {
					this.displayLoading({
						enable: true,
						value: 0.46,
						buffer: 0.54,
						message: 'Couture des circulaires',
					});
				}),
				mergeMap(() => {
					return this.dispactIntoSubject(this.loadFilieres(), this.store.filieres$);
				}),
				tap(() => {
					this.displayLoading({
						enable: true,
						value: 0.54,
						buffer: 0.62,
						message: 'Décuvage des PMs',
					});
				}),
				mergeMap(() => {
					return this.dispactIntoSubject(this.loadSymbols(), this.store.symboles$);
				}),
				tap(() => {
					this.displayLoading({
						enable: true,
						value: 0.62,
						buffer: 0.7,
						message: 'Décernement des singes',
					});
				}),
				mergeMap(() => {
					return this.dispactIntoSubject(this.loadSymbolsSens(), this.store.symbolesSens$);
				}),
				tap(() => {
					this.displayLoading({
						enable: true,
						value: 0.7,
						buffer: 0.78,
						message: 'Prepatation des pichets',
					});
				}),
				mergeMap(() => {
					return this.dispactIntoSubject(this.loadSignifications(), this.store.significations$);
				}),
				tap(() => {
					this.displayLoading({
						enable: true,
						value: 0.78,
						buffer: 0.86,
						message: 'Tarte aux pommes',
					});
				}),

				mergeMap(() => {
					return this.loadRelations();
				}),
				tap(() => {
					this.displayLoading({
						enable: true,
						value: 0.86,
						buffer: 1,
						message: 'Lecture du code',
					});
				})
			)
			.subscribe(() => {
				console.log('colleciton loaded');
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

	private loadRelations(): Observable<IRelationData[]> {
		return of([TLNRelation, NATRelation]).pipe(
			delay(750),
			map((items) => {
				console.log('relation loaded');
				this.store.dataRelations$.next(items);
				console.log('relation selected');
				this.store.currentDataRelations$.next(items[0]);
				return items;
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
		const pictures = Symbols.reduce(
			(acc,
			(symbol) => {
				if (symbol.imgs) {
					acc.push(symbol.imgs.map((img) => img.url));
				}
				return acc;
			},
			[])
		);
		return forkJoin([of(Symbols), this.picturePrelaoder.preload(pictures)]);
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
		return obs.pipe(
			take(1),
			delay(this.delay),
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
		console.log('displayLoading', loadingState);
		this.event.publish('loadingBarState', loadingState);
	}
}
