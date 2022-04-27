import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { BlockModule } from '../../block/block.module';
import { AppSharedModule } from '../../shared/shared.module';
import { SpeListComponent } from './list/spe-list.component';

@NgModule({
    imports: [SharedModule, AppSharedModule, BlockModule],
    exports: [SpeListComponent],
    declarations: [SpeListComponent],
    providers: [],
})
export class SpePagesModule {}
