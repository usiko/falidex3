import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, merge, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private database: Storage | null = null;

    public ages = {};
    constructor(private storage: Storage) {}
    init(): Observable<any> {
        return from(this.storage.create()).pipe(
            tap((storage) => {
                this.database = storage;
            }),
            mergeMap(() => {
                return this.loadAges();
            })
        );
        //this.database = storage;
    }
    // Create and expose methods that users of this service can
    // call, for example:
    public set(key: string, value: any, ageProperty = 'age'): Observable<any> {
        if (this.database) {
            return from(this.database?.set(key, value)).pipe(
                tap(() => {
                    let date = value[ageProperty];
                    if (!date) {
                        date = new Date().toISOString();
                    }
                    this.saveAge(key, date);
                })
            );
        } else {
            return throwError('no database');
        }

        //this.database?.set(key, JSON.stringify(value));
    }

    // Create and expose methods that users of this service can
    // call, for example:
    public get(key: string, emptyValue: any): Observable<any> {
        if (this.database) {
            return from(this.database.get(key)).pipe(
                map((data) => {
                    if (data === null) {
                        return emptyValue;
                    } else {
                        return data;
                    }
                }),
                catchError((error) => {
                    return of(emptyValue);
                })
            );
        } else {
            return throwError('no database');
        }

        //JSON.parse();
    }

    public remove(key: string): Observable<any> {
        if (this.database) {
            return from(this.database?.remove(key));
        } else {
            return throwError('no database');
        }
    }

    public saveAge(key, value): void {
        this.ages[key] = value;
        this.set('ageIndex', this.ages);
    }

    public loadAges() {
        return this.get('ageIndex', {}).pipe(
            tap((data) => {
                this.ages = data;
            })
        );
    }

    public getAge(key): string {
        return this.ages[key];
    }
}
