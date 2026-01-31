import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslocoConfig } from '@erp/shared/util-i18n';
import { appRoutes } from './app.routes';
import { ERPTheme } from '@erp/shared/theme';
import {
  authTokenInterceptor,
  errorHandlingInterceptor,
  correlationIdInterceptor,
  TOKEN_STORAGE,
  LocalStorageTokenStorage,
} from '@erp/shared/data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        correlationIdInterceptor,
        authTokenInterceptor,
        errorHandlingInterceptor,
      ])
    ),
    {
      provide: TOKEN_STORAGE,
      useClass: LocalStorageTokenStorage,
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
  ],
};
