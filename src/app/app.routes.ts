import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user',
  },
  {
    path: '',
    loadChildren: () => import('./public/public.module').then((module) => module.PublicModule),
  },
  {
    path: '',
    loadChildren: () => import('./private/private.module').then((module) => module.PrivateModule),
  },
];
