import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslocoConfig } from '@erp/shared/util-i18n';
import { appRoutes } from './app.routes';
import { ERPTheme } from '@erp/shared/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
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
