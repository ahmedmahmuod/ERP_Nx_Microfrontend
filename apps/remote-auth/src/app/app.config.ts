import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslocoConfig } from '@erp/shared/util-i18n';
import { appRoutes } from './app.routes';
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
  ],
};
