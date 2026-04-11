import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/filiere-list.component').then((m) => m.FiliereListComponent),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./detail/filiere-details.component').then((m) => m.FiliereDetailsComponent),
  },
];
