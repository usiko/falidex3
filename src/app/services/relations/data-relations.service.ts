import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { IRelationData } from 'src/app/models/base-relations.models';
import { SubStoreService } from '../data-store/sub-store/sub-store.service';
import { StorageService } from '../storage/storage.service';
import { EventService } from '../event/event.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DataRelationsService {
    private store = inject(SubStoreService);
    private storage = inject(StorageService);
    private eventService = inject(EventService);
    private relations: BehaviorSubject<IRelationData[]> = this.store.dataRelations$;
    private currentRelation$: BehaviorSubject<IRelationData | null> = this.store.currentDataRelations$;

    getRelationList(): Observable<IRelationData[]> {
        const sub = this.eventService.getObs('devMode');
        if(!sub)
        {
            return of([]);
        }
        return sub.pipe(switchMap((devMode:boolean)=>{
            return this.relations.pipe(
            map((items) => {
                return items
                .filter(item=>{
                    return item.visible!==false ||devMode ||environment.production===false;
                })
                .sort((a,b)=>{
                    if (a.default !== b.default) {
                        return (b.default ? 1 : 0) - (a.default ? 1 : 0);
                    }
                    if (a.annee !== b.annee) {
                        return b.annee - a.annee;
                    }
                    if (a.national !== b.national) {
                        return (b.national ? 1 : 0) - (a.national ? 1 : 0);
                    }
                    return a.name.localeCompare(b.name);
                });
            })
        );
        }))
        
    }

    getCurrentRelation(): Observable<IRelationData | null> {
        return this.currentRelation$.pipe(
            filter((item) => {
                return !!item;
            }),
            map((item) => {
                if (item) {
                    return item;
                } else {
                    return null;
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
            this.storage.set('currentRelation',id).subscribe();
            this.currentRelation$.next(find);
        } else {
            this.storage.remove('currentRelation').subscribe();
            console.log('relation not found', id);
        }
    }
}
