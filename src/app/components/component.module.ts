import { NgModule } from '@angular/core';
import { SidebarModule } from './sidebar/sidebar.module';

@NgModule({
    imports: [
        SidebarModule
    ],
    exports: [
        SidebarModule
    ],
    declarations: [],
    providers: []
})
export class ComponentModule { }