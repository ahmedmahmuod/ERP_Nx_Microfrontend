import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { DesignSystemComponent } from './design-system/design-system.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'design-system',
        component: DesignSystemComponent
      },
      {
        path: 'showcase',
        component: ShowcaseComponent
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('remoteAuth/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'finance',
        loadChildren: () =>
          import('remoteFinance/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'hr',
        loadChildren: () => import('remoteHr/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'supply',
        loadChildren: () =>
          import('remoteSupply/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];
