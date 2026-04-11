import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/spe-list.component').then((m) => m.SpeListComponent),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./detail/spe-details.component').then((m) => m.SpeDetailsComponent),
  },
];
