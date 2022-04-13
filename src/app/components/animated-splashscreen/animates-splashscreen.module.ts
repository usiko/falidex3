import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { AnimatedSplashscreenComponent } from './animated-splashscreen.component';

@NgModule({
    imports: [SharedModule],
    declarations: [AnimatedSplashscreenComponent],
    exports: [AnimatedSplashscreenComponent],
    providers: [],
})
export class AnimatedSplashscreenModule {}
