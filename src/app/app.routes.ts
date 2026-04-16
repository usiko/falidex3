import { Routes } from '@angular/router';
import { AnimatedSplashscreenComponent } from './components/animated-splashscreen/animated-splashscreen.component';

export const routes: Routes = [
  { path: '', component: AnimatedSplashscreenComponent },
  {
    path: 'home',
    loadComponent: () => import('./components/pages/home/home.page.component').then((m) => m.HomePageComponent),
  },
    {
        path: 'symbols',
        loadChildren: () => import('./components/pages/symbol/symbole.routes').then((m) =>m.routes),
    },
    {
        path: 'filieres',
        loadChildren: () => import('./components/pages/filiere/filiere.routes').then((m) =>m.routes),
    },
    {
        path: 'circulaires',
        loadChildren: () => import('./components/pages/circulaire/circulaire.routes').then((m) =>m.routes),
    },
    {
        path: 'spes',
        loadChildren: () => import('./components/pages/spe/spe.routes').then((m) =>m.routes),
    },
    {
        path: 'significations',
        loadChildren: () =>
            import('./components/pages/signification/signification.routes').then((m) =>m.routes),
         },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
