import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { BlockModule } from '../block/block.module';
import { AppSharedModule } from '../shared/shared.module';
import { FilierePagesModule } from './filiere/filiere-page.module';
import { HomePageComponent } from './home/home.page.component';
import { SpePagesModule } from './spe/spe-page.module';
import { SymbolPagesModule } from './symbol/symbol-page.module';

/**
 * all page, routing components
 */
@NgModule({
    imports: [SharedModule, AppSharedModule, BlockModule, SymbolPagesModule, FilierePagesModule, SpePagesModule],
    exports: [],
    declarations: [HomePageComponent],
    providers: [],
})
export class PagesModule {}
