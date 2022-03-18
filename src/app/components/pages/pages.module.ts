import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { AppSharedModule } from '../shared/shared.module';
import { SymbolListComponent } from './symbol/list/symbol-list/symbol-list.component';


@NgModule({
    imports: [
        SharedModule,
        AppSharedModule,

        /*RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),*/

    ],
    exports: [

    ],
    declarations: [SymbolListComponent],
    providers: [

    ]
})
export class PagesModule { }
