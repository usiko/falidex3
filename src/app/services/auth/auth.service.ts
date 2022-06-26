import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token;
    constructor(private http: HttpClient, private configService: ConfigService) {
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
                username: 'john',
                password: 'changeme',
            })
            .pipe(
                tap((data: { access_token: string }) => {
                    this.setToken(data.access_token);
                }),
                catchError((error) => {
                    this.setToken(undefined);
                    return of(error);
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
