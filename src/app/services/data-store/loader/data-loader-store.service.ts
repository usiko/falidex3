import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, mergeMap, take, tap } from 'rxjs/operators';
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
import { IRelationData } from 'src/app/models/base-relations.models';
import { ILoadingSteps } from '../../../models/config.model';
import { ILoadingBarState } from '../../../models/global.model';
import { AuthService } from '../../auth/auth.service';
import { ConfigService } from '../../config/config.service';
import { EventService } from '../../event/event.service';
import { StoreService } from '../base-store/store.service';
import { HttpDataCollectionService } from '../http-data/http-data-collection.service';

@Injectable({
    providedIn: 'root',
})
export class DataLoaderStoreService {
    private loadingSteps: ILoadingSteps[] = [];
    private numberOfSteps = 12;
    constructor(
        private store: StoreService,
        private event: EventService,
        private config: ConfigService,
        private authService: AuthService,
        private httpData: HttpDataCollectionService
    ) {}

    loadData(): void {
        this.loadingSteps = this.config.getConfig().loadingSteps;

        let currentStep = 1;
        this.authService
            .login()
            .pipe(
                catchError((error) => {
                    this.displayError();
                    return throwError(error);
                }),
                map(() => {
                    this.displayStep(currentStep, this.numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadPlacements(), this.store.placements$);
                }),
                tap(() => {
                    this.displayStep(currentStep, this.numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadSymbolsAccessory(), this.store.symbolesAccessories$);
                }),
                tap(() => {
                    this.displayStep(currentStep, this.numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadPositions(), this.store.positions$);
                }),
                tap(() => {
                    this.displayStep(currentStep, this.numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadCirculaires(), this.store.circulaires$);
                }),
                tap(() => {
                    this.displayStep(currentStep, this.numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadCirculairesColors(), this.store.circulairesColors$);
                }),
                tap(() => {
                    this.displayStep(currentStep, this.numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadColors(), this.store.colors$);
                }),
                tap(() => {
                    this.displayStep(currentStep, this.numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadFilieres(), this.store.filieres$);
                }),
                tap(() => {
                    this.displayStep(currentStep, this.numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadSymbols(), this.store.symboles$);
                }),
                tap(() => {
                    this.displayStep(currentStep, this.numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadSymbolsSens(), this.store.symbolesSens$);
                }),
                tap(() => {
                    this.displayStep(currentStep, this.numberOfSteps);
                    currentStep++;
                }),
                mergeMap(() => {
                    return this.dispactIntoSubject(this.loadSignifications(), this.store.significations$);
                }),
                tap(() => {
                    this.displayStep(currentStep, this.numberOfSteps);
                    currentStep++;
                }),

                mergeMap(() => {
                    return this.loadRelations();
                }),
                tap(() => {
                    this.displayStep(currentStep, this.numberOfSteps);
                    currentStep++;
                })
            )
            .subscribe(() => {
                console.log('colleciton loaded');
                this.displayStep(currentStep, this.numberOfSteps);
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
            error: false,
            buffer: nextvalue,
            message: this.getStepMessage(currentStep) ? this.getStepMessage(currentStep).message : '',
        });
        if (nextvalue === 1) {
            setTimeout(() => {
                this.displayLoading({
                    enable: false,
                    error: false,
                    value: 0,
                    buffer: 0,
                    message: '',
                });
            }, 750);
        }
    }
    private displayError() {
        this.displayLoading({
            enable: true,
            error: true,
            value: 0,
            buffer: this.numberOfSteps,
            message: this.config.getConfig()?.loadingErrorMessage || 'erreur',
        });
        setTimeout(() => {
            this.displayLoading({
                enable: false,
                error: false,
                value: 0,
                buffer: 0,
                message: '',
            });
        }, 3000);
    }

    private loadRelations(): Observable<IRelationData[]> {
        return this.httpData.getDataLink().pipe(
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
        return this.httpData.getCirculaires();
    }

    private loadCirculairesColors(): Observable<IBaseCirculaireColor[]> {
        return this.httpData.getCirculaireColors();
    }

    private loadColors(): Observable<IBaseColor[]> {
        return this.httpData.getColors();
    }

    private loadFilieres(): Observable<IBaseFiliere[]> {
        return this.httpData.getFilieres();
    }
    private loadSignifications(): Observable<IBaseSignification[]> {
        return this.httpData.getSignifications();
    }
    private loadSymbols(): Observable<IBaseSymbol[]> {
        return this.httpData.getSymbols();
    }
    private loadSymbolsSens(): Observable<IBaseSymbolSens[]> {
        return this.httpData.getSymbolsSens();
    }
    private loadSymbolsAccessory(): Observable<IBaseSymbolAcessory[]> {
        return this.httpData.getSymbolsAccessories();
    }
    private loadPlacements(): Observable<IBasePlacement[]> {
        return this.httpData.getPlacements();
    }
    private loadPositions(): Observable<IBasePosition[]> {
        return this.httpData.getPositions();
    }

    private dispactIntoSubject(obs: Observable<IBaseCollectionData[]>, subject: BehaviorSubject<IBaseCollectionData[]>) {
        return obs.pipe(
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
        console.log('displayLoading', loadingState);
        this.event.publish('loadingBarState', loadingState);
    }
}
