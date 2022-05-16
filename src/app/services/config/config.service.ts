import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IConfig } from '../../models/config.model';
import { GlobalConfig } from '../../models/config.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private config: GlobalConfig;
    private configUrl = 'assets/config/config.json';
    constructor(private http: HttpClient) {}
    loadConfig(): Observable<void> {
        return this.http.get(this.configUrl).pipe(
            map((value: IConfig) => {
                this.config = new GlobalConfig(value);
            })
        );
    }
    getConfig(): GlobalConfig {
        if (this.config) {
            return this.config;
        } else {
            return new GlobalConfig();
        }
    }
}
