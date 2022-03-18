import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { AppSharedModule } from '../shared/shared.module';
import { CirculaireDetailsBlockComponent } from './details/circulaire/circulaire-details-block/circulaire-details-block.component';
import { FiliereDetailsBlockComponent } from './details/filiere/filiere-details-block/filiere-details-block.component';
import { SymboleDetailsBlockComponent } from './details/symbole/symbole-details-block/symbole-details-block.component';
import { CirculaireFiliereViewComponent } from './filiere-view/circulaire-filiere-view.component';
import { SignificationItemBlockComponent } from './list/signification/signification-item-block/signification-item-block.component';


@NgModule({
    imports: [
        SharedModule,
        AppSharedModule,

    ],
    exports: [
        CirculaireFiliereViewComponent,
        FiliereDetailsBlockComponent,
        SignificationItemBlockComponent,
        CirculaireDetailsBlockComponent,
        SymboleDetailsBlockComponent,
        SharedModule
    ],
    declarations: [CirculaireFiliereViewComponent,
        SymboleDetailsBlockComponent,
        CirculaireDetailsBlockComponent,
        FiliereDetailsBlockComponent,
        SignificationItemBlockComponent],
    providers: []
})
export class BlockModule { }