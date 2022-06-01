import { ChangeDetectorRef, Injectable, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IBaseCollectionData } from 'src/app/models/base-data-models';
import { ICollectionData } from 'src/app/models/linked-data-models';
import { ICollectionItem } from 'src/app/services/collection-item/collection.service';

/**
 * Parent of all details pages
 */
@Injectable()
export class PageItemDetail<Item extends ICollectionData> {
    /**
     * main page container
     */
    @ViewChild(IonContent, null) content: IonContent;

    /**
     * Must import service in child
     * data service
     */
    protected collectionService: ICollectionItem<IBaseCollectionData, Item>;

    /**
     * Must import service in child
     * angular changedetector, to update manualy view
     */
    protected changeDetector: ChangeDetectorRef;

    protected activatedRoute: ActivatedRoute;

    /**
     * collection subject of data to show, dircetly from data store,  without any change
     */
    protected collection$: BehaviorSubject<Item[]>;

    public item$ = new BehaviorSubject<Item>(null);

    protected subscription = new Subscription();

    protected currentId: string;

    /**
     * init the the component
     */
    init() {
        this.collectionService.init();
        this.collection$ = this.getCollectionSubject();
        this.subscription.add(
            this.activatedRoute.params.subscribe((params) => {
                this.onRouteChange(params);
            })
        );
        this.subscription.add(
            this.collection$.subscribe((items) => {
                this.updateItem();
            })
        );
    }

    /**
     * action of updating item
     */
    protected updateItem() {
        console.log('update items', this.collection$.getValue().length, this.currentId);
        if (this.collection$ && this.currentId) {
            const item = this.collection$.getValue().find((item) => {
                return item.id === this.currentId;
            });
            this.item$.next(item);
        } else {
            this.item$.next(null);
        }
    }

    /**
     * retourn la collection sur laquelle se binder
     */
    protected getCollectionSubject(): BehaviorSubject<Item[]> {
        return this.collectionService.collection$;
    }

    /**
     * action whne route is changing
     */
    protected onRouteChange(params) {
        if (params.id) {
            this.currentId = params?.id;
        } else {
            this.currentId = null;
        }

        this.updateItem();
    }

    protected destroy() {
        this.subscription.unsubscribe();
    }
}
