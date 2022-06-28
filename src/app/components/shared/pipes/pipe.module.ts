import { NgModule } from '@angular/core';
import { ArrayGroupPipe } from './array-groupe.pipe';
import { FilterLinkPipe } from './filter-links.pipe';
import { PositionNameListPipe } from './position-name.pipe';

@NgModule({
    declarations: [PositionNameListPipe, FilterLinkPipe, ArrayGroupPipe],
    exports: [PositionNameListPipe, FilterLinkPipe, ArrayGroupPipe],
    providers: [],
})
export class PipeModule {}
