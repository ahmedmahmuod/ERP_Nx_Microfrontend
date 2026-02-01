import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  provideTranslocoConfig,
  TRANSLOCO_REMOTE_MAP,
} from '@erp/shared/util-i18n';
import { appRoutes } from './app.routes';
import { ERPTheme } from '@erp/shared/theme';
import {
  authTokenInterceptor,
  errorHandlingInterceptor,
  correlationIdInterceptor,
  TOKEN_STORAGE,
  LocalStorageTokenStorage,
} from '@erp/shared/data-access';
import { PermissionsStore } from '@erp/shared/util-state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        correlationIdInterceptor,
        authTokenInterceptor,
        errorHandlingInterceptor,
      ]),
    ),
    {
      provide: TOKEN_STORAGE,
      useClass: LocalStorageTokenStorage,
    },
    {
      provide: TRANSLOCO_REMOTE_MAP,
      useValue: {
        auth: 'http://localhost:4201',
        finance: 'http://localhost:4202',
        hr: 'http://localhost:4203',
        srm: 'http://localhost:4207',
        pm: 'http://localhost:4205',
        warehouses: 'http://localhost:4206',
      },
    },
    provideTranslocoConfig(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    MessageService,
    providePrimeNG({
      theme: {
        preset: ERPTheme,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
    // Load Shell permissions on app initialization
    // Using direct moduleId (10) to avoid circular dependency issues during bootstrap
    // Setting force=true to ensure permissions are refreshed from server on full page reload
    provideAppInitializer(() => {
      const permissionsStore = inject(PermissionsStore);
      return permissionsStore.loadPermissions(10, true); // (moduleId=10, force=true)
    }),
  ],
};
