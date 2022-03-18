import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PipeModule } from './pipes/pipe.module';

import { ImgLoaderComponent } from './img-loader/img-loader.component';
import { CirculaireRepresentationComponent } from './circulaire-representation/circulaire-representation.component';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
    imports: [
        SharedModule,
        PipeModule
    ],
    declarations: [HeaderComponent, ImgLoaderComponent, CirculaireRepresentationComponent],
    exports: [PipeModule, HeaderComponent, ImgLoaderComponent, CirculaireRepresentationComponent],
    providers: []
})
export class AppSharedModule { }