import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ComponentModule } from './components/component.module';
import { EventService } from './services/event/event.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        CommonModule,
        IonicModule.forRoot(
            {
                rippleEffect: false,
                mode: 'md'
            }
        ),
        AppRoutingModule,
        ComponentModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        EventService
    ],
    bootstrap: [AppComponent],
    schemas: [
        //CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
