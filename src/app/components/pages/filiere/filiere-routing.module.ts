import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FilierePagesModule } from "./filiere-page.module";
import { FiliereListComponent } from "./list/filiere-list.component";
const routes: Routes = [
    { path: '', component: FiliereListComponent },
    //{ path: 'details/:id', component: SymboleDetailsComponent },
];

@NgModule({
    imports: [
        FilierePagesModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class FiliereRoutingModule { }