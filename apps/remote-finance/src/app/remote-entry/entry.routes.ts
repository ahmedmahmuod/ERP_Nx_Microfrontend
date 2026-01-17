import { Route } from '@angular/router';
import { RemoteEntry } from './entry';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntry,
  },
  {
    path: 'invoices',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'invoices/all',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'invoices/create',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'invoices/pending',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'accounts',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'accounts/chart',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'accounts/bank',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'reports/pl',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'reports/balance',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'reports/cashflow',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'budget',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./entry').then((m) => m.RemoteEntry),
  },
];
