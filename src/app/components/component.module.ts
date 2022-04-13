import { NgModule } from '@angular/core';
import { AnimatedSplashscreenComponent } from './animated-splashscreen/animated-splashscreen.component';
import { PagesModule } from './pages/pages.module';
import { AppSharedModule } from './shared/shared.module';
import { SidebarModule } from './sidebar/sidebar.module';

/**
 * all components modules
 */
@NgModule({
    imports: [SidebarModule, PagesModule, AppSharedModule],
    exports: [SidebarModule],
    declarations: [AnimatedSplashscreenComponent],
    providers: [],
})
export class ComponentModule {}
