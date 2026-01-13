import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'remoteSupply',
    loadChildren: () =>
      import('remoteSupply/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'remoteHr',
    loadChildren: () => import('remoteHr/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'remoteFinance',
    loadChildren: () =>
      import('remoteFinance/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'remoteAuth',
    loadChildren: () =>
      import('remoteAuth/Routes').then((m) => m!.remoteRoutes),
  },
];
