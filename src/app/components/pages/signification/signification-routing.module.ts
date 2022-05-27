import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignificationDetailsComponent } from './detail/signification-details.component';
import { SignificationPagesModule } from './signification-page.module';

const routes: Routes = [{ path: 'detail/:id', component: SignificationDetailsComponent }];

@NgModule({
    imports: [SignificationPagesModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SignificationRoutingModule {}
