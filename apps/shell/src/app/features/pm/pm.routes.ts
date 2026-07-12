import { Route } from '@angular/router';

export const pmRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'projects/all',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'projects/create',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'projects/templates',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'tasks/my',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'tasks/all',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'tasks/kanban',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'team',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'team/members',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'team/workload',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'team/roles',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'milestones',
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
