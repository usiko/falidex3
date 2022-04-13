import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AnimatedSplashscreenComponent } from './components/animated-splashscreen/animated-splashscreen.component';
import { FiliereRoutingModule } from './components/pages/filiere/filiere-routing.module';
import { HomePage } from './components/pages/home/home.page';
import { SymbolRoutingModule } from './components/pages/symbol/symbole-routing.module';

const routes: Routes = [
    { path: '', component: AnimatedSplashscreenComponent },
    { path: 'home', component: HomePage },
    /*{ path: 'list', component: ListPage },
    { path: 'spes', component: SpesComponent },
    { path: 'spe/:id', component: SpeDetailsComponent },

    { path: 'symboles', loadChildren: './components/pages/symboles/symbole-routing.module#SymboleRoutingModule' },
    { path: 'revisions', loadChildren: './components/pages/revisions/revisions-routing.module#RevisionsRoutingModule' },
    { path: 'filieres', loadChildren: './components/pages/filieres/filieres-routing.module#FilieresRoutingModule' },
    { path: 'circulaires', loadChildren: './components/pages/circulaires/circulaires-routing.module#CirculairesRoutingModule' },
    { path: 'spes', loadChildren: './components/pages/spe/spe-routing.module#SpeRoutingModule' },
    { path: 'codes', loadChildren: './components/pages/filecode/filecode-routing.module#FilecodeRoutingModule' }*/
    { path: 'symbols', loadChildren: () => SymbolRoutingModule },
    { path: 'filieres', loadChildren: () => FiliereRoutingModule },

    /*{ path: 'symboles', children: symboleRoutes },
    { path: 'filieres', children: filiereRoutes },
    { path: 'circulaires', children: circulaireRoutes },
    { path: 'spes', children: speRoutes }*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
