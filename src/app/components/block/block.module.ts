import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { AppSharedModule } from '../shared/shared.module';
import { CirculaireDetailsBlockComponent } from './details/circulaire/circulaire-details-block/circulaire-details-block.component';
import { FiliereDetailsBlockComponent } from './details/filiere/filiere-details-block/filiere-details-block.component';
import { SpeDetailsBlockComponent } from './details/spe/spe-details-block.component';
import { SymboleDetailsBlockComponent } from './details/symbole/symbole-details-block/symbole-details-block.component';
import { BlockListModule } from './list/block-list.module';

/**
 * All reusable block of pages
 */
@NgModule({
    imports: [
        SharedModule,
        AppSharedModule,
        BlockListModule

    ],
    exports: [
        FiliereDetailsBlockComponent,
        CirculaireDetailsBlockComponent,
        SymboleDetailsBlockComponent,
        SpeDetailsBlockComponent,
        SharedModule,
        BlockListModule
    ],
    declarations: [
        FiliereDetailsBlockComponent,
        CirculaireDetailsBlockComponent,
        SymboleDetailsBlockComponent,
        SpeDetailsBlockComponent,
    ],
    providers: []
})
export class BlockModule { }