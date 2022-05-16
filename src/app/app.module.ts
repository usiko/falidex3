import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ComponentModule } from './components/component.module';
import { EventService } from './services/event/event.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

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
	providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, EventService],
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
