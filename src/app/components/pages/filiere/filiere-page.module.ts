import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { BlockModule } from '../../block/block.module';
import { AppSharedModule } from '../../shared/shared.module';
import { FiliereDetailsComponent } from './detail/filiere-details.component';
import { FiliereListComponent } from './list/filiere-list.component';

@NgModule({
    imports: [SharedModule, AppSharedModule, BlockModule],
    exports: [],
    declarations: [FiliereListComponent, FiliereDetailsComponent],
    providers: [],
})
export class FilierePagesModule {}
