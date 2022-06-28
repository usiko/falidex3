import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { AppSharedModule } from '../shared/shared.module';
import { CirculaireDetailsBlockComponent } from './details/circulaire/circulaire-details-block/circulaire-details-block.component';
import { FiliereDetailsBlockComponent } from './details/filiere/filiere-details-block/filiere-details-block.component';
import { NoItemComponent } from './details/no-item/no-item.component';
import { SignificationDetailsBlockComponent } from './details/signification/signification-details-block/signification-details-block.component';
import { SpeDetailsBlockComponent } from './details/spe/spe-details-block.component';
import { SymboleDetailsBlockComponent } from './details/symbole/symbole-details-block/symbole-details-block.component';
import { BlockListModule } from './list/block-list.module';

/**
 * All reusable block of pages
 */
@NgModule({
    imports: [SharedModule, AppSharedModule, BlockListModule],
    exports: [
        FiliereDetailsBlockComponent,
        CirculaireDetailsBlockComponent,
        SymboleDetailsBlockComponent,
        SpeDetailsBlockComponent,
        SignificationDetailsBlockComponent,
        NoItemComponent,
        SharedModule,
        BlockListModule,
    ],
    declarations: [
        FiliereDetailsBlockComponent,
        CirculaireDetailsBlockComponent,
        SignificationDetailsBlockComponent,
        SymboleDetailsBlockComponent,
        SpeDetailsBlockComponent,
        NoItemComponent,
    ],
    providers: [],
})
export class BlockModule {}
