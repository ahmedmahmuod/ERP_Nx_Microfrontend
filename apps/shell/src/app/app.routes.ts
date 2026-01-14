import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const appRoutes: Route[] = [
  // Auth routes (no layout, guest only)
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('remoteAuth/Routes').then((m) => m.remoteRoutes),
  },
  // Protected routes (with layout, auth required)
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'finance',
        loadChildren: () =>
          import('remoteFinance/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'hr',
        loadChildren: () =>
          import('remoteHr/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'supply',
        loadChildren: () =>
          import('remoteSupply/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'design-system',
        loadComponent: () =>
          import('./design-system/design-system.component').then(
            (m) => m.DesignSystemComponent
          ),
      },
      {
        path: 'showcase',
        loadComponent: () =>
          import('./showcase/showcase.component').then(
            (m) => m.ShowcaseComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  },
  // Redirect to login by default
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
