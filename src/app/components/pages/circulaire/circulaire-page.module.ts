import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { BlockModule } from '../../block/block.module';
import { AppSharedModule } from '../../shared/shared.module';
import { CirculaireDetailsComponent } from './detail/circulaire-details.component';

@NgModule({
    imports: [SharedModule, AppSharedModule, BlockModule],
    exports: [CirculaireDetailsComponent],
    declarations: [CirculaireDetailsComponent],
    providers: [],
})
export class CirculairePagesModule {}
