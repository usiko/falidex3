import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { NavigationComponent } from './navigation/navigation.component';


/**
 * side menu bar module
 */
@NgModule({
    imports: [
        IonicModule, AppRoutingModule, CommonModule
    ],
    declarations: [NavigationComponent],
    exports: [NavigationComponent],
    entryComponents: [],
    providers: []
})
export class SidebarModule { }
