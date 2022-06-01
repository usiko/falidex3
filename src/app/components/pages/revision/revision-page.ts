import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICollectionData } from 'src/app/models/linked-data-models';
import { PageItemDetail } from '../detail-page';

export class RevisionPage<Item extends ICollectionData> extends PageItemDetail<Item> {
    protected routerService: Router;

    constructor() {
        super();
    }
    /**
     * cant work
     * naviguer vers id random de la collection courante
     */
    private navigateToRandomId() {
        const collection = this.collection$.getValue();
        if (collection.length > 0) {
            const collectionIds = this.collection$.getValue().map((item) => item.id);
            const id = collectionIds[this.randomIntFromInterval(0, collectionIds.length - 1)];
            this.currentId = undefined;
            this.routerService.navigate([this.routerService?.routerState?.snapshot?.url, id]);
        } else {
            console.warn('no collection data yet');
        }
    }

    /**
     * full overrinding ; on doit bindé une unlinked collection
     */
    protected getCollectionSubject(): BehaviorSubject<Item[]> {
        return this.collectionService.unlinkedCollection$;
    }

    /**
     * override updateitem pour gerer les cas ou l'id n'est plus valable
     */
    protected updateItem() {
        console.log('update items', this.collection$.getValue().length, this.currentId);
        if (this.currentId) {
            const collectionIds = this.collection$.getValue().map((item) => item.id);
            if (!collectionIds.includes(this.currentId)) {
                console.log('item not found');
                this.navigateToRandomId();
            }
        } else if (this.currentId === null) {
            this.navigateToRandomId();
        }
        super.updateItem();
    }

    protected onRouteChange(params) {
        super.onRouteChange(params);
        console.log('onRouteChange', params, this.currentId);
        if (this.currentId === null) {
            console.log('no id routechange');
            this.navigateToRandomId();
        }
    }

    /**
     * retourne un nb au hasard, min/max incluent
     */
    private randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
