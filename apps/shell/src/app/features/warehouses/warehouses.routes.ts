import { Route } from '@angular/router';

export const warehousesRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'inventory',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'inventory/all',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'inventory/add',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'inventory/levels',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'locations',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'locations/all',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'locations/add',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'locations/zones',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'transfers',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'transfers/new',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'transfers/pending',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'transfers/history',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'receiving',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'shipping',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
];
