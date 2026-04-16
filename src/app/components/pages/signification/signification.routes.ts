import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'detail/:id',
    loadComponent: () => import('./detail/signification-details.component').then((m) => m.SignificationDetailsComponent),
  },
];
