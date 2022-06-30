import { NgModule } from '@angular/core';
import { ArrayGroupPipe } from './array-groupe.pipe';
import { FilterLinkPipe } from './filter-links.pipe';
import { PositionNameListPipe } from './position-name.pipe';
import { ResourcePicurePipe } from './resource-picture.pipe';

@NgModule({
    declarations: [PositionNameListPipe, FilterLinkPipe, ArrayGroupPipe, ResourcePicurePipe],
    exports: [PositionNameListPipe, FilterLinkPipe, ArrayGroupPipe, ResourcePicurePipe],
    providers: [],
})
export class PipeModule {}
