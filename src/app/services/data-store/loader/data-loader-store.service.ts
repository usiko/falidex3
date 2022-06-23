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
import { ILoadingSteps } from '../../../models/config.model';
import { ConfigService } from '../../config/config.service';

@Injectable({
    providedIn: 'root',
})
export class DataLoaderStoreService {
    private delay = 0;
    private loadingSteps: ILoadingSteps[] = [];
    constructor(private store: StoreService, private event: EventService, private config: ConfigService) {}

    loadData(): void {
        this.loadingSteps = this.config.getConfig().loadingSteps;
        const numberOfSteps = 11;
        let currentStep = 1;
        of(null)
            .pipe(
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadPlacements(), this.store.placements$);
                }),
                tap(() => {
                    this.displayStep(currentStep, numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadSymbolsAccessory(), this.store.symbolesAccessories$);
                }),
                tap(() => {
                    this.displayStep(currentStep, numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadPositions(), this.store.positions$);
                }),
                tap(() => {
                    this.displayStep(currentStep, numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadCirculaires(), this.store.circulaires$);
                }),
                tap(() => {
                    this.displayStep(currentStep, numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadCirculairesColors(), this.store.circulairesColors$);
                }),
                tap(() => {
                    this.displayStep(currentStep, numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadColors(), this.store.colors$);
                }),
                tap(() => {
                    this.displayStep(currentStep, numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadFilieres(), this.store.filieres$);
                }),
                tap(() => {
                    this.displayStep(currentStep, numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadSymbols(), this.store.symboles$);
                }),
                tap(() => {
                    this.displayStep(currentStep, numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadSymbolsSens(), this.store.symbolesSens$);
                }),
                tap(() => {
                    this.displayStep(currentStep, numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadSignifications(), this.store.significations$);
                }),
                tap(() => {
                    this.displayStep(currentStep, numberOfSteps);
                    currentStep++;
                }),

                mergeMap(() => {
                    return this.loadRelations();
                }),
                tap(() => {
                    this.displayStep(currentStep, numberOfSteps);
                    currentStep++;
                })
            )
            .subscribe(() => {
                console.log('colleciton loaded');
                this.displayStep(currentStep, numberOfSteps);
                currentStep++;
            });
    }

    private getStepMessage(stepNumber: number) {
        if (this.loadingSteps.length === 0) {
            return null;
        } else {
            if (!this.loadingSteps[stepNumber]) {
                return this.loadingSteps[this.loadingSteps.length - 1];
            } else {
                return this.loadingSteps[stepNumber - 1];
            }
        }
    }

    private displayStep(currentStep: number, numberOfSteps: number) {
        let nextvalue = (1 / numberOfSteps) * currentStep;
        let lastvalue = (1 / numberOfSteps) * (currentStep - 1);
        if (nextvalue > 1) {
            nextvalue = 1;
        }
        if (lastvalue > 1) {
            lastvalue = 1;
        }
        console.log(lastvalue, nextvalue);
        this.displayLoading({
            enable: !!this.getStepMessage(currentStep),
            value: lastvalue,
            buffer: nextvalue,
            message: this.getStepMessage(currentStep) ? this.getStepMessage(currentStep).message : '',
        });
        if (nextvalue === 1) {
            setTimeout(() => {
                this.displayLoading({
                    enable: false,
                    value: 0,
                    buffer: 0,
                    message: '',
                });
            }, 750);
        }
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
