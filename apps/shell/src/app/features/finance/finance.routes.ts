import { Route } from '@angular/router';

export const financeRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'invoices',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'invoices/all',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'invoices/create',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'invoices/pending',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'accounts',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'accounts/chart',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'accounts/bank',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'reports/pl',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'reports/balance',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'reports/cashflow',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'budget',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
];
