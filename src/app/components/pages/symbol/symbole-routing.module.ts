import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SymboleDetailsComponent } from './detail/symbole-details.component';
import { SymbolListComponent } from './list/symbol-list.component';
import { SymbolPagesModule } from './symbol-page.module';

const routes: Routes = [
    { path: '', component: SymbolListComponent },
    { path: 'detail/:id', component: SymboleDetailsComponent },
];

@NgModule({
    imports: [SymbolPagesModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SymbolRoutingModule {}
