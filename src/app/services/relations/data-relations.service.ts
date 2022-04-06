import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { IRelationData } from 'src/app/models/base-relations.models';
import { SubStoreService } from '../data-store/sub-store/sub-store.service';

@Injectable({
    providedIn: 'root',
})
export class DataRelationsService {
    private relations: BehaviorSubject<IRelationData[]> = this.store.dataRelations$;
    private currentRelation: BehaviorSubject<IRelationData> = this.store.currentDataRelations$;
    constructor(private store: SubStoreService) {}

    getRelationList(): Observable<{ name: string; id: string }[]> {
        return this.relations.pipe(
            map((items) => {
                return items.map((item) => {
                    return {
                        name: item.name,
                        id: item.id,
                    };
                });
            })
        );
    }

    getCurrentRelation(): Observable<{ name: string; id: string }> {
        return this.currentRelation.pipe(
            filter((item) => {
                return !!item;
            }),
            map((item) => {
                if (item) {
                    return {
                        name: item.name,
                        id: item.id,
                    };
                } else {
                    return {
                        name: null,
                        id: null,
                    };
                }
            })
        );
    }

    setCurrentRelation(id: string) {
        const relations = this.relations.getValue();
        const find = relations.find((item) => {
            return item.id === id;
        });
        if (find) {
            this.currentRelation.next(find);
        } else {
            console.warn('relation not found', id);
        }
    }
}
