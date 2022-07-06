import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { SidebarFiltreModule } from './filtres/sidebar-filtres.module';

import { NavigationComponent } from './navigation/navigation.component';

/**
 * side menu bar module
 */
@NgModule({
    imports: [AppRoutingModule, SidebarFiltreModule, SharedModule],
    declarations: [NavigationComponent],
    exports: [NavigationComponent, SidebarFiltreModule],
    entryComponents: [],
    providers: [],
})
export class SidebarModule {}
