import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject,
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
import { ConfigService } from '@erp/shared/config';
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
    provideTranslocoConfig(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    // Load Configuration and Permissions on app initialization
    provideAppInitializer(async () => {
      const configService = inject(ConfigService);
      const permissionsStore = inject(PermissionsStore);

      // 1. Load runtime configuration from centralized workspace-config
      await configService.load('auth');

      // 2. Load permissions using moduleId from config
      const moduleId = configService.getModuleId();
      return permissionsStore.loadPermissions(moduleId, true);
    }),
  ],
};
