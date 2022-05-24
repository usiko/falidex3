import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/components/shared/shared.module';
import { SharedModule } from 'src/app/shared.module';
import { CirculaireBlockItemListComponent } from './list/circulaire-block-item-list.component';

@NgModule({
    imports: [SharedModule, AppSharedModule],
    exports: [CirculaireBlockItemListComponent],
    declarations: [CirculaireBlockItemListComponent],
    providers: [],
})
export class CirculaireBlockItemModule {}
