import { Route } from '@angular/router';

export const hrRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'employees/all',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'employees/add',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'employees/departments',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'attendance',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'attendance/daily',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'attendance/leave',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'attendance/timesheets',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'payroll',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'payroll/process',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'payroll/structure',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'payroll/payslips',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'recruitment',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'recruitment/openings',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'recruitment/candidates',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'recruitment/interviews',
    loadComponent: () =>
      import('./entry/entry').then((m) => m.RemoteEntry),
  },
  {
    path: 'performance',
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
