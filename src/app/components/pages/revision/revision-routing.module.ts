import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiliereDetailsComponent } from './detail/filiere-details.component';
import { FilierePagesModule } from './filiere-page.module';
import { FiliereListComponent } from './list/filiere-list.component';
const routes: Routes = [
	{ path: '', component: FiliereListComponent },
	{ path: 'filiere/:id?', component: FiliereDetailsComponent },
	{ path: 'circulaire/:id?', component: FiliereDetailsComponent },
	{ path: 'symbol/:id?', component: FiliereDetailsComponent },
	//{ path: 'details/:id', component: SymboleDetailsComponent },
];

@NgModule({
	imports: [FilierePagesModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RevisionRoutingModule {}
