import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslocoConfig } from '@erp/shared/util-i18n';
import { MessageService } from 'primeng/api';
import { appRoutes } from './app.routes';
import { ConfigService } from '@erp/shared/config';
import { PermissionsStore } from '@erp/shared/util-state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideTranslocoConfig(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    MessageService,
    provideAppInitializer(async () => {
      const configService = inject(ConfigService);
      const permissionsStore = inject(PermissionsStore);
      await configService.load('finance');
      return permissionsStore.loadPermissions(
        configService.getModuleId(),
        true,
      );
    }),
  ],
};
