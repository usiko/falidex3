import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeConfig } from './app.initializer';
import { ComponentModule } from './components/component.module';
import { AuthService } from './services/auth/auth.service';
import { ConfigService } from './services/config/config.service';
import { EventService } from './services/event/event.service';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        IonicModule.forRoot({
            rippleEffect: false,
            mode: 'md',
        }),

        FontAwesomeModule,
        AppRoutingModule,
        ComponentModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
    ],
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeConfig,
            deps: [ConfigService],
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
        EventService,
    ],
    bootstrap: [AppComponent],
    schemas: [
        //CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, fab, far);
    }
}
