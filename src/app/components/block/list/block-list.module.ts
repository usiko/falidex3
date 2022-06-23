import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { AppSharedModule } from '../../shared/shared.module';
import { CirculaireBlockItemModule } from './circulaire/circulaire-block.module';
import { FiliereBlockItemModule } from './filiere/filiere-block-item.module';
import { LisContainerComponent } from './list-container/list-container.component';
import { SignificationBlockItemModule } from './signification/signfication-block.module';
import { SpeBlockItemModule } from './spe/spe-block-item.module';
import { SymboleBlockItemModule } from './symbol-item/symbole-block-item.module';

/**
 * all reussable block of list page
 */
@NgModule({
    imports: [
        SharedModule,
        AppSharedModule,
        SymboleBlockItemModule,
        FiliereBlockItemModule,
        CirculaireBlockItemModule,
        SignificationBlockItemModule,
        SpeBlockItemModule,
        ScrollingModule,
    ],
    exports: [
        LisContainerComponent,
        SymboleBlockItemModule,
        CirculaireBlockItemModule,
        FiliereBlockItemModule,
        SignificationBlockItemModule,
        SpeBlockItemModule,
    ],
    declarations: [LisContainerComponent],
    providers: [],
})
export class BlockListModule {}
