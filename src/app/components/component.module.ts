import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { AppSharedModule } from './shared/shared.module';
import { SidebarModule } from './sidebar/sidebar.module';

@NgModule({
    imports: [
        SidebarModule,
        PagesModule,
        AppSharedModule
    ],
    exports: [
        SidebarModule,
    ],
    declarations: [],
    providers: []
})
export class ComponentModule { }