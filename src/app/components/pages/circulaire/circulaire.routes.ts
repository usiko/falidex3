import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'detail/:id',
    loadComponent: () => import('./detail/circulaire-details.component').then((m) => m.CirculaireDetailsComponent),
  },
];
