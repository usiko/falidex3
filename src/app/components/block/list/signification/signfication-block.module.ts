import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/components/shared/shared.module';
import { SharedModule } from 'src/app/shared.module';
import { SignificationBlockItemListComponent } from './list/signification-block-item-list.component';
import { SignificationItemBlockComponent } from './signification-item-block/signification-item-block.component';

@NgModule({
    imports: [SharedModule, AppSharedModule],
    exports: [SignificationBlockItemListComponent, SignificationItemBlockComponent],
    declarations: [SignificationBlockItemListComponent, SignificationItemBlockComponent],
    providers: [],
})
export class SignificationBlockItemModule {}
