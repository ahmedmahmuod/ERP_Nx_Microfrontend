import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { LayoutComponent } from './layout/layout.component';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { companyGuard } from './core/guards/company.guard';
import { RemoteUnavailableComponent } from './pages/remote-unavailable/remote-unavailable.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';

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
      // Dashboard (requires both auth AND company)
      {
        path: 'dashboard',
        canActivate: [companyGuard],
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      // Access Denied page
      {
        path: 'access-denied',
        component: AccessDeniedComponent,
      },
      // All modules require company selection
      {
        path: 'finance',
        canActivate: [companyGuard],
        loadChildren: () =>
          loadRemoteModule('remoteFinance', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'hr',
        canActivate: [companyGuard],
        loadChildren: () =>
          loadRemoteModule('remoteHr', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'srm',
        canActivate: [companyGuard],
        loadChildren: () =>
          loadRemoteModule('remoteSrm', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'pm',
        canActivate: [companyGuard],
        loadChildren: () =>
          loadRemoteModule('remotePm', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'warehouses',
        canActivate: [companyGuard],
        loadChildren: () =>
          loadRemoteModule('remoteWarehouses', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
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
