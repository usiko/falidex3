import { NgModule } from "@angular/core";
import { PositionNameListPipe } from "./position-name.pipe";

@NgModule({
    declarations: [PositionNameListPipe],
    exports: [PositionNameListPipe],
    providers: []
})
export class PipeModule { }