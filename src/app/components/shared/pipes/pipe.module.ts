import { NgModule } from "@angular/core";
import { FilterLinkPipe } from "./filter-links.pipe";
import { PositionNameListPipe } from "./position-name.pipe";

@NgModule({
    declarations: [PositionNameListPipe, FilterLinkPipe],
    exports: [PositionNameListPipe, FilterLinkPipe],
    providers: []
})
export class PipeModule { }