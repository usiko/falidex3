import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppConfigService } from './services/config/app.config.service';
import { InstallAppService } from './services/install/install-app.service';
import { StorageService } from './services/storage/storage.service';


export const appInitiealizerFn = ()=>{
    const configService = inject(AppConfigService);
    const storageService = inject(StorageService);
    const installApp = inject(InstallAppService);
    return configService
    .loadConfig(environment.configPaths)
    .pipe(
        mergeMap(() => {
            return forkJoin([
                storageService.init(),
                //swService.init(),
                installApp.init('beforeinstallprompt'),
            ]);
        })
    );
}


