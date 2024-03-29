import { NgModule } from '@angular/core';
import { ArrayGroupPipe } from './array-groupe.pipe';
import { FilterLinkPipe } from './filter-links.pipe';
import { PositionNameListPipe } from './position-name.pipe';
import { ResourcePicurePipe } from './resource-picture.pipe';
import { SatinizeUrlPipe } from './satinize-url.pipe';

@NgModule({
    declarations: [PositionNameListPipe, FilterLinkPipe, ArrayGroupPipe, ResourcePicurePipe, SatinizeUrlPipe],
    exports: [PositionNameListPipe, FilterLinkPipe, ArrayGroupPipe, ResourcePicurePipe, SatinizeUrlPipe],
    providers: [],
})
export class PipeModule {}
