import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { IRelationData } from 'src/app/models/base-relations.models';
import { SubStoreService } from '../data-store/sub-store/sub-store.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class DataRelationsService {
    private relations: BehaviorSubject<IRelationData[]> = this.store.dataRelations$;
    private currentRelation$: BehaviorSubject<IRelationData> = this.store.currentDataRelations$;
    constructor(private store: SubStoreService, private storage: StorageService) {}

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
        return this.currentRelation$.pipe(
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
            if (!find.default) {
                this.storage.set('currentRelation', id).subscribe();
            } else {
                this.storage.remove('currentRelation').subscribe();
            }
            this.currentRelation$.next(find);
        } else {
            console.log('relation not found', id);
        }
    }
}
