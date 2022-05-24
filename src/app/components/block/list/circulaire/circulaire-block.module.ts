import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/components/shared/shared.module';
import { SharedModule } from 'src/app/shared.module';
import { FiliereNosymbBlockItemListComponent } from './filiere-nosymb-block-item-list/filiere-nosymb-block-item-list.component';
import { CirculaireBlockItemListComponent } from './list/circulaire-block-item-list.component';
import { FiliereBlockItemListComponent } from './list/filiere-block-item-list.component';

@NgModule({
    imports: [SharedModule, AppSharedModule],
    exports: [CirculaireBlockItemListComponent],
    declarations: [CirculaireBlockItemListComponent],
    providers: [],
})
export class CirculaireBlockItemModule {}
