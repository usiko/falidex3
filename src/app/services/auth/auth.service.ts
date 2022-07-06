import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { HttpDataCollectionService } from '../data-store/http-data/http-data-collection.service';
import { EventService } from '../event/event.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token;
    constructor(private http: HttpClient, private configService: ConfigService, private storageService: StorageService, private httpData:HttpDataCollectionService, private eventService:EventService) {

    }

    login() {
        const login = 'user';
        const password = 'password';
        const url = this.configService.getConfig()?.urls?.dataServer;
        //return throwError(null);
        return this.http
            .post(url + '/auth/login', {
                username: 'john',
                password: 'changeme',
            })
            .pipe(
                tap((data: { access_token: string }) => {
                    this.setToken(data.access_token);
                }),
                catchError((error) => {
                    const isAllStored = this.httpData.isAllStored();
                    if (!isAllStored)
                    {
                        this.setToken(undefined);
                        return throwError(error);
                    }
                    else {
                        return of(null);
                    }
                    
                })
            );
    }

    private setToken(token: string) {
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }
}
