import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { BlockModule } from '../block/block.module';
import { AppSharedModule } from '../shared/shared.module';
import { CirculairePagesModule } from './circulaire/circulaire-page.module';
import { FilierePagesModule } from './filiere/filiere-page.module';
import { HomePagesModule } from './home/home-page.module';
import { HomePageComponent } from './home/home.page.component';
import { SignificationPagesModule } from './signification/signification-page.module';
import { SpePagesModule } from './spe/spe-page.module';
import { SymbolPagesModule } from './symbol/symbol-page.module';

/**
 * all page, routing components
 */
@NgModule({
    imports: [
        SharedModule,
        AppSharedModule,
        BlockModule,
        SymbolPagesModule,
        FilierePagesModule,
        SpePagesModule,
        HomePagesModule,
        CirculairePagesModule,
        SignificationPagesModule,
    ],
    exports: [],
    declarations: [HomePageComponent],
    providers: [],
})
export class PagesModule {}
