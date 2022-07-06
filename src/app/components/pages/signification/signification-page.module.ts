import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { BlockModule } from '../../block/block.module';
import { AppSharedModule } from '../../shared/shared.module';
import { SignificationDetailsComponent } from './detail/signification-details.component';

@NgModule({
    imports: [SharedModule, AppSharedModule, BlockModule],
    exports: [SignificationDetailsComponent],
    declarations: [SignificationDetailsComponent],
    providers: [],
})
export class SignificationPagesModule {}
