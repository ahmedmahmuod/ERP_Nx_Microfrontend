import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { LayoutComponent } from './layout/layout.component';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { RemoteUnavailableComponent } from './pages/remote-unavailable/remote-unavailable.component';

// Fallback routes for when remotes are unavailable
const remoteFallbackRoutes: Route[] = [
  {
    path: '**',
    component: RemoteUnavailableComponent,
  },
];

export const appRoutes: Route[] = [
  // Auth routes (no layout, guest only)
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () =>
      loadRemoteModule('remoteAuth', './Routes')
        .then((m) => m.remoteRoutes)
        .catch(() => remoteFallbackRoutes),
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
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'finance',
        loadChildren: () =>
          loadRemoteModule('remoteFinance', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'hr',
        loadChildren: () =>
          loadRemoteModule('remoteHr', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'srm',
        loadChildren: () =>
          loadRemoteModule('remoteSrm', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'pm',
        loadChildren: () =>
          loadRemoteModule('remotePm', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'warehouses',
        loadChildren: () =>
          loadRemoteModule('remoteWarehouses', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'design-system',
        loadComponent: () =>
          import('./design-system/design-system.component').then(
            (m) => m.DesignSystemComponent,
          ),
      },
      {
        path: 'showcase',
        loadComponent: () =>
          import('./showcase/showcase.component').then(
            (m) => m.ShowcaseComponent,
          ),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  // Redirect to login by default
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
