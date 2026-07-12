import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideTranslocoConfig,
  TRANSLOCO_REMOTE_MAP,
} from '@erp/shared/util-i18n';
import { appRoutes } from './app.routes';
import {
  TOKEN_STORAGE,
  LocalStorageTokenStorage,
  provideErpHttpClient,
} from '@erp/shared/data-access';
import { ConfigService } from '@erp/shared/config';
import { PermissionsStore } from '@erp/shared/util-state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideErpHttpClient(),
    {
      provide: TOKEN_STORAGE,
      useClass: LocalStorageTokenStorage,
    },
    {
      provide: TRANSLOCO_REMOTE_MAP,
      useValue: {
        auth: 'http://localhost:4201',
      },
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
