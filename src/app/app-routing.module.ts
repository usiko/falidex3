import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SymbolListComponent } from './components/pages/symbol/list/symbol-list/symbol-list.component';

const routes: Routes = [

    /*{ path: '', component: HomePage },
    { path: 'list', component: ListPage },
    { path: 'spes', component: SpesComponent },
    { path: 'spe/:id', component: SpeDetailsComponent },

    { path: 'symboles', loadChildren: './components/pages/symboles/symbole-routing.module#SymboleRoutingModule' },
    { path: 'revisions', loadChildren: './components/pages/revisions/revisions-routing.module#RevisionsRoutingModule' },
    { path: 'filieres', loadChildren: './components/pages/filieres/filieres-routing.module#FilieresRoutingModule' },
    { path: 'circulaires', loadChildren: './components/pages/circulaires/circulaires-routing.module#CirculairesRoutingModule' },
    { path: 'spes', loadChildren: './components/pages/spe/spe-routing.module#SpeRoutingModule' },
    { path: 'codes', loadChildren: './components/pages/filecode/filecode-routing.module#FilecodeRoutingModule' }*/
    { path: '', component: SymbolListComponent }

    /*{ path: 'symboles', children: symboleRoutes },
    { path: 'filieres', children: filiereRoutes },
    { path: 'circulaires', children: circulaireRoutes },
    { path: 'spes', children: speRoutes }*/


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
