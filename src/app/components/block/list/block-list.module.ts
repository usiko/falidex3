import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { AppSharedModule } from '../../shared/shared.module';
import { FiliereBlockItemModule } from './filiere/filiere-block-item.module';
import { LisContainerComponent } from './list-container/list-container.component';
import { SignificationItemBlockComponent } from './signification/signification-item-block/signification-item-block.component';
import { SymboleBlockItemModule } from './symbol-item/symbole-block-item.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CirculaireBlockItemModule } from './circulaire/circulaire-block.module';

/**
 * all reussable block of list page
 */
@NgModule({
    imports: [SharedModule, AppSharedModule, SymboleBlockItemModule, FiliereBlockItemModule,CirculaireBlockItemModule, ScrollingModule],
    exports: [LisContainerComponent, SignificationItemBlockComponent, SymboleBlockItemModule,CirculaireBlockItemModule, FiliereBlockItemModule],
    declarations: [LisContainerComponent, SignificationItemBlockComponent],
    providers: [],
})
export class BlockListModule {}
