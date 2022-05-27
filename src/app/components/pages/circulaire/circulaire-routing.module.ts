import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CirculairePagesModule } from './circulaire-page.module';
import { CirculaireDetailsComponent } from './detail/circulaire-details.component';

const routes: Routes = [{ path: 'detail/:id', component: CirculaireDetailsComponent }];

@NgModule({
    imports: [CirculairePagesModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CirculaireRoutingModule {}
