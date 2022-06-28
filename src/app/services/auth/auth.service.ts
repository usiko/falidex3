import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token;
    constructor(private http: HttpClient, private configService: ConfigService, private storageService: StorageService) {
        console.log('auth');
        this.login();
    }

    login() {
        const login = 'user';
        const password = 'password';
        const url = this.configService.getConfig()?.urls?.dataServer;
        //return throwError(null);
        return this.http
            .post(url + '/auth/login', {
                username: 'johnn',
                password: 'changeme',
            })
            .pipe(
                tap((data: { access_token: string }) => {
                    this.setToken(data.access_token);
                }),
                catchError((error) => {
                    const keys = Object.keys(this.configService.getConfig().paths);
                    const values = keys.map((key) => this.storageService.getAge(key));
                    if (values.length > 0) {
                    }
                    for (const val of values) {
                        if (!val) {
                            this.setToken(undefined);
                            return throwError(error);
                        }
                    }
                    return of(null);
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
