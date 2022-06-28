import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfigService } from './services/config/config.service';
import { SwService } from './services/service-worker/sw-service.service';
import { StorageService } from './services/storage/storage.service';

export const initializeConfig = (configService: ConfigService, storageService: StorageService, swService: SwService) => {
    return (): Promise<any> => {
        return configService
            .loadConfig()
            .pipe(
                mergeMap(() => {
                    return forkJoin([storageService.init(), swService.init()]);
                })
            )
            .toPromise();
    };
};
