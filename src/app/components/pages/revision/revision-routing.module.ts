import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiliereDetailsComponent } from '../filiere/detail/filiere-details.component';
import { FilierePagesModule } from '../filiere/filiere-page.module';
import { FiliereListComponent } from '../filiere/list/filiere-list.component';
import { CirculaireRevisionComponent } from './circulaire/circulaire-revision.component';
import { FiliereRevisionComponent } from './filiere/filiere-revision.component';
import { RevisionPage } from './revision-page';
import { RevisionPageComponent } from './revision.component';
import { SymbolRevisionComponent } from './symbol/symbol-revision.component';

const routes: Routes = [
    { path: '', component: RevisionPageComponent },
    { path: 'filiere', component: FiliereRevisionComponent },
    { path: 'filiere/:id', component: FiliereRevisionComponent },
    { path: 'circulaire', component: CirculaireRevisionComponent },
    { path: 'circulaire/:id', component: CirculaireRevisionComponent },
    { path: 'symbol', component: SymbolRevisionComponent },
    { path: 'symbol/:id', component: SymbolRevisionComponent },
    //{ path: 'details/:id', component: SymboleDetailsComponent },
];

@NgModule({
    imports: [FilierePagesModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RevisionRoutingModule {}
