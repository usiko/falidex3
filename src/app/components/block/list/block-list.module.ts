import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { AppSharedModule } from '../../shared/shared.module';
import { LisContainerComponent } from './list-container/list-container.component';
import { SignificationItemBlockComponent } from './signification/signification-item-block/signification-item-block.component';



@NgModule({
    imports: [
        SharedModule,
        AppSharedModule,
    ],
    exports: [
        LisContainerComponent,
        SignificationItemBlockComponent
    ],
    declarations: [LisContainerComponent, SignificationItemBlockComponent],
    providers: []
})
export class BlockListModule { }