import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { from, Observable, of } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root',
})
export class SwService {
    constructor(private updates: SwUpdate, private configService: ConfigService) {}

    init() {
        console.log('init', 'SwService');
        this.updates.versionUpdates.subscribe((evt) => {
            switch (evt.type) {
                case 'VERSION_DETECTED':
                    console.log(`SW Downloading new app version: ${evt.version.hash}`);
                    break;
                case 'VERSION_READY':
                    console.log(`SW Current app version: ${evt.currentVersion.hash}`);
                    console.log(`SW New app version ready for use: ${evt.latestVersion.hash}`);
                    break;
                case 'VERSION_INSTALLATION_FAILED':
                    console.log(`SW  Failed to install app version '${evt.version.hash}': ${evt.error}`);
                    break;
            }
        });
        const config = this.configService.getConfig();
        console.log('SwService', 'config', config);
        if (config.updateApp === 'everytimes') {
            console.log('SwService', 'force update');
            return this.checkForUpdate().pipe(
                mergeMap((statut: boolean) => {
                    console.log('SwService', 'check update');
                    if (statut) {
                        console.log('SwService', 'active update');
                        return this.activateUpdate().pipe(
                            tap((statut: boolean) => {
                                if (statut) {
                                    console.log('SwService', 'end update');
                                    document.location.reload();
                                } else {
                                    console.log('SwService', 'fail update');
                                }
                            })
                        );
                    } else {
                        console.log('SwService', 'no update');
                        return of(null);
                    }
                }),
                catchError((error) => {
                    return of(null);
                })
            );
        } else {
            return of(null);
        }
    }

    private checkForUpdate(): Observable<boolean> {
        return from(this.updates.checkForUpdate()).pipe(
            catchError((error) => {
                console.warn('sw checkForUpdate', error);
                return of(false);
            })
        );
    }

    private activateUpdate(): Observable<boolean> {
        return from(this.updates.activateUpdate()).pipe(
            catchError((error) => {
                console.warn('sw activateUpdate', error);
                return of(false);
            })
        );
    }
}
