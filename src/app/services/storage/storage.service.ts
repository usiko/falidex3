import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    public ages: { [key: string]: string } = {};
    
    constructor() {}
    
    init(): Observable<any> {
        return this.loadAges();
    }
    // Create and expose methods that users of this service can
    // call, for example:
    public set(key: string, value: any, ageProperty = 'age'): Observable<any> {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            let date = value[ageProperty];
            if (!date) {
                date = new Date().toISOString();
            }
            this.saveAge(key, date);
            return of(value);
        } catch (error) {
            return throwError(() => error);
        }
    }

    // Create and expose methods that users of this service can
    // call, for example:
    public get(key: string, emptyValue: any,ageProperty = 'age',maxAge?:number): Observable<any> {
        try {
            const data = localStorage.getItem(key);
            if (data === null) {
                return of(emptyValue);
            } else {
                const storedAge = this.getAge(key);
                
                if(maxAge && storedAge)
                {
                    const ageDate = new Date(storedAge);
                    const now = new Date();
                    const diffInMs = now.getTime() - ageDate.getTime();
                    
                    // Si la donnée est trop vieille (maxAge en millisecondes)
                    if (diffInMs > maxAge) {
                        console.log(`⏰ Donnée expirée pour la clé "${key}" (${diffInMs}ms > ${maxAge}ms)`);
                        return of(emptyValue);
                    }
                }
                
                // Parser les données et ajouter la propriété age
                const parsedData = JSON.parse(data);
                if (storedAge && typeof parsedData === 'object' && parsedData !== null) {
                    parsedData[ageProperty] = storedAge;
                }
                
                return of(parsedData);
            }
        } catch (error) {
            return of(emptyValue);
        }
    }

    public remove(key: string): Observable<any> {
        try {
            localStorage.removeItem(key);
            return of(null);
        } catch (error) {
            return throwError(() => error);
        }
    }

    public saveAge(key: string, value: string): void {
        this.ages[key] = value;
        this.set('ageIndex', this.ages).subscribe();
    }

    public loadAges() {
        return this.get('ageIndex', {}).pipe(
            tap((data) => {
                this.ages = data;
            })
        );
    }

    public getAge(key: string): string {
        return this.ages[key];
    }

    public clear(): Observable<void> {
        try {
            localStorage.clear();
            console.log('storage cleared');
            return of(undefined);
        } catch (error) {
            return throwError(() => error);
        }
    }
}
