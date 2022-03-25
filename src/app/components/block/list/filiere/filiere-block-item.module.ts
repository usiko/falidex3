import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/components/shared/shared.module';
import { SharedModule } from 'src/app/shared.module';
import { FiliereBlockItemListComponent } from './list/filiere-block-item-list.component';





@NgModule({
    imports: [
        SharedModule,
        AppSharedModule,
    ],
    exports: [
        FiliereBlockItemListComponent
    ],
    declarations: [FiliereBlockItemListComponent],
    providers: []
})
export class FiliereBlockItemModule { }