import { Route } from '@angular/router';

export const srmRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'suppliers',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'suppliers/all',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'suppliers/add',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'suppliers/performance',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'procurement',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'procurement/requests',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'procurement/orders',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'procurement/contracts',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'quotes',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'quotes/rfq',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'quotes/all',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'quotes/compare',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'invoices',
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
