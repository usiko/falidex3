import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/symbol-list.component').then((m) => m.SymbolListComponent),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./detail/symbole-details.component').then((m) => m.SymboleDetailsComponent),
  },
];
