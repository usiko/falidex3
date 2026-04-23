import { inject, Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ConfigService } from './services/config/config.service';
import { InstallAppService } from './services/install/install-app.service';
import { PictureService } from './services/picture/picture.service';
import { SwService } from './services/service-worker/sw-service.service';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';


export const appInitiealizerFn = ()=>{
    const configService = inject(ConfigService);
    const storageService = inject(StorageService);
    const pictureService = inject(PictureService);
    const installApp = inject(InstallAppService);
    const authService = inject(AuthService);
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
                //swService.init(),
                installApp.init('beforeinstallprompt'),
            ]);
        })
    );
}


