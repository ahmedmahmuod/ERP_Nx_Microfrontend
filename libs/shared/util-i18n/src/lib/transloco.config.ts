import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  inject,
  Injectable,
} from '@angular/core';
import {
  Translation,
  TranslocoLoader,
  provideTransloco,
} from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';

/**
 * Single Source of Truth: All translations loaded from /assets/i18n/{lang}.json
 * Micro-frontends load translations from the shell host application
 */
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
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
