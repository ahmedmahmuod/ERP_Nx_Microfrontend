import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../pages/login/login.component').then((m) => m.LoginComponent),
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
];
