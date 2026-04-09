import { Routes } from '@angular/router';
import { AnimatedSplashscreenComponent } from './components/animated-splashscreen/animated-splashscreen.component';

export const routes: Routes = [
  { path: '', component: AnimatedSplashscreenComponent },
  {
    path: 'home',
    loadComponent: () => import('./components/pages/home/home.page.component').then((m) => m.HomePageComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
