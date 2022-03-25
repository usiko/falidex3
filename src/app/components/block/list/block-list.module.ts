import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { AppSharedModule } from '../../shared/shared.module';
import { LisContainerComponent } from './list-container/list-container.component';
import { SignificationItemBlockComponent } from './signification/signification-item-block/signification-item-block.component';
import { SymboleBlockItemModule } from './symbol-item/symbole-block-item.module';



@NgModule({
    imports: [
        SharedModule,
        AppSharedModule,
        SymboleBlockItemModule
    ],
    exports: [
        LisContainerComponent,
        SignificationItemBlockComponent,
        SymboleBlockItemModule
    ],
    declarations: [LisContainerComponent, SignificationItemBlockComponent],
    providers: []
})
export class BlockListModule { }