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
import { ILoadingSteps } from '../../../models/config.model';
import { ILoadingBarState } from '../../../models/global.model';
import { AuthService } from '../../auth/auth.service';
import { ConfigService } from '../../config/config.service';
import { EventService } from '../../event/event.service';
import { IRelationData } from 'src/app/models/base-relations.models';
import { StoreService } from '../base-store/store.service';
import { HttpDataCollectionService } from '../http-data/http-data-collection.service';
import { throwError, Observable, forkJoin, of, BehaviorSubject } from 'rxjs';
import { catchError, map, mergeMap, tap, delay, take } from 'rxjs/operators';
import { PictureService } from '../../picture/picture.service';
import { StorageService } from '../../storage/storage.service';

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
        private httpData: HttpDataCollectionService,
        private pictureService: PictureService,
        private storageService: StorageService
    ) {}

    loadData(): void {
        const isAllStored = this.httpData.isAllStored();
        if (isAllStored) {
            console.log('isallstored','splashLeave' )
            this.event.publish('splashLeave', true);
        }
        this.loadingSteps = this.config.getConfig().loadingSteps;

        let currentStep = 1;
        this.displayStep(currentStep, this.numberOfSteps);
        this.authService
            .login()
            .pipe(
                /*catchError((error) => {
                    this.displayError();
                    return throwError(error);
                }),*/
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
                this.displayStep(currentStep, this.numberOfSteps);
                currentStep++;
                this.event.publish('splashLeave', true);
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
            mergeMap((items) => {
                this.store.dataRelations$.next(items);
                return this.storageService.get('currentRelation', undefined).pipe(
                    map((stored) => {
                        if (stored) {
                            const find = items.find((item) => item.id === stored);
                            this.store.currentDataRelations$.next(find ? find : items[0]);
                        } else {
                            const findDefault = items.find((item) => item.default);
                            if (findDefault) {
                                this.store.currentDataRelations$.next(findDefault);
                            } else {
                                this.store.currentDataRelations$.next(items[0]);
                            }
                        }
                        return items;
                    })
                );
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
        //return this.httpData.getSymbols();
        return this.httpData.getSymbols().pipe(
            mergeMap((symbols: IBaseSymbol[]) => {
                const pictures = Symbols.reduce((acc, symbol) => {
                    if (symbol.imgs) {
                        acc.push(...symbol.imgs.map((img) => img.url));
                    }
                    return acc;
                }, []);
                return forkJoin(pictures.map((pic) => this.pictureService.preload(pic))).pipe(
                    map(() => {
                        return symbols;
                    })
                );
            })
        );
        /*return this.httpData.getSymbols().pipe(mergeMap((symbols => {
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
            return this.picturePrelaoder.preload(pictures).pipe(map(() => {
                return symbols;
            }));
        })))*/
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
        this.event.publish('loadingBarState', loadingState);
    }
}
