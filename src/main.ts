import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideAppInitializer, isDevMode } from '@angular/core';
import { appInitiealizerFn } from './app/app.initializer';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAppInitializer(appInitiealizerFn),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), 
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
    provideHttpClient()
  ],
});
