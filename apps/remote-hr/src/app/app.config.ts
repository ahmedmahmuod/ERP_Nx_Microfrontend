import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslocoConfig } from '@erp/shared/util-i18n';
import { MessageService } from 'primeng/api';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideTranslocoConfig(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    MessageService,
  ],
};
