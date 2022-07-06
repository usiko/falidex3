import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfigService } from './services/config/config.service';
import { InstallAppService } from './services/install/install-app.service';
import { PictureService } from './services/picture/picture.service';
import { SwService } from './services/service-worker/sw-service.service';
import { StorageService } from './services/storage/storage.service';

export const initializeConfig = (
    configService: ConfigService,
    storageService: StorageService,
    swService: SwService,
    pictureService: PictureService,
    installApp: InstallAppService
) => {
    return (): Promise<any> => {
        return configService
            .loadConfig()
            .pipe(
                mergeMap(() => {
                    return forkJoin([
                        storageService.init().pipe(
                            mergeMap(() => {
                                return pictureService.init();
                            })
                        ),
                        swService.init(),
                        installApp.init('beforeinstallprompt'),
                    ]);
                })
            )
            .toPromise();
    };
};
