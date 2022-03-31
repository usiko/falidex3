import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SymbolListComponent } from "./list/symbol-list.component";
import { SymbolPagesModule } from "./symbol-page.module";

const routes: Routes = [
    { path: '', component: SymbolListComponent },
    //{ path: 'details/:id', component: SymboleDetailsComponent },
];

@NgModule({
    imports: [
        SymbolPagesModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SymbolRoutingModule { }