import { Route } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('../pages/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('../pages/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
      {
        path: 'select-company',
        loadComponent: () =>
          import('../pages/select-company/select-company.component').then(
            (m) => m.SelectCompanyComponent,
          ),
      },
    ],
  },
];
