import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
} from '@angular/core';
import {
  Translation,
  TranslocoLoader,
  provideTransloco,
  TRANSLOCO_SCOPE,
} from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';

/**
 * Map of Transloco scopes to their remote host URLs
 * Example: { 'auth': 'http://localhost:4201' }
 */
export const TRANSLOCO_REMOTE_MAP = new InjectionToken<Record<string, string>>(
  'TRANSLOCO_REMOTE_MAP',
);

/**
 * Decentralized Loader: Loads translations from the shell or from remote servers
 * based on the requested scope.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  private remoteMap = inject(TRANSLOCO_REMOTE_MAP, { optional: true }) || {};

  getTranslation(path: string) {
    // path can be a language 'en' or a scoped path 'auth/en'
    const isScoped = path.includes('/');
    const [scope, lang] = isScoped ? path.split('/') : [null, path];

    if (scope) {
      const baseUrl = this.remoteMap[scope];
      if (baseUrl) {
        // Fetch from remote microfrontend assets
        return this.http.get<Translation>(
          `${baseUrl}/assets/i18n/${lang}.json`,
        );
      } else {
        // Fetch from host application assets with scope subfolder
        return this.http.get<Translation>(`/assets/i18n/${scope}/${lang}.json`);
      }
    }

    // Default: fetch from host application assets (root)
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export function provideTranslocoConfig(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideTransloco({
      config: {
        availableLangs: ['en', 'ar'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: false,
      },
      loader: TranslocoHttpLoader,
    }),
  ]);
}

/**
 * Utility to provide a translation scope in a component or module
 */
export function provideTranslocoScope(scope: string): any {
  return {
    provide: TRANSLOCO_SCOPE,
    useValue: scope,
  };
}
