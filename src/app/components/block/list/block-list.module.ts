import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { AppSharedModule } from '../../shared/shared.module';
import { FiliereBlockItemModule } from './filiere/filiere-block-item.module';
import { LisContainerComponent } from './list-container/list-container.component';
import { SignificationItemBlockComponent } from './signification/signification-item-block/signification-item-block.component';
import { SymboleBlockItemModule } from './symbol-item/symbole-block-item.module';



@NgModule({
    imports: [
        SharedModule,
        AppSharedModule,
        SymboleBlockItemModule,
        FiliereBlockItemModule
    ],
    exports: [
        LisContainerComponent,
        SignificationItemBlockComponent,
        SymboleBlockItemModule,
        FiliereBlockItemModule
    ],
    declarations: [LisContainerComponent, SignificationItemBlockComponent],
    providers: []
})
export class BlockListModule { }