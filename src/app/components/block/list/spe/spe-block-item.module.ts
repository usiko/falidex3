import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/components/shared/shared.module';
import { SharedModule } from 'src/app/shared.module';
import { SpeBlockItemListComponent } from './list/spe-block-item-list.component';

@NgModule({
    imports: [SharedModule, AppSharedModule],
    exports: [SpeBlockItemListComponent],
    declarations: [SpeBlockItemListComponent],
    providers: [],
})
export class SpeBlockItemModule {}
