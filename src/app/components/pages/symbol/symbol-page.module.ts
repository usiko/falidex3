import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { BlockModule } from '../../block/block.module';
import { AppSharedModule } from '../../shared/shared.module';
import { SymboleDetailsComponent } from './detail/symbole-details.component';
import { SymbolListComponent } from './list/symbol-list.component';

@NgModule({
    imports: [SharedModule, AppSharedModule, BlockModule],
    exports: [],
    declarations: [SymbolListComponent, SymboleDetailsComponent],
    providers: [],
})
export class SymbolPagesModule {}
