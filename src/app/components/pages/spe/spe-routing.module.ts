import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeDetailsComponent } from './detail/spe-details.component';
import { SpePagesModule } from './spe-page.module';

const routes: Routes = [
	{ path: '', component: SpeListComponent },
	{ path: 'detail/:id', component: SpeDetailsComponent },
	//{ path: 'details/:id', component: SymboleDetailsComponent },
];

@NgModule({
	imports: [SpePagesModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SpeRoutingModule {}
