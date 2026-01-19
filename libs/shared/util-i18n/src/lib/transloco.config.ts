import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  inject,
  Injectable,
} from '@angular/core';
import {
  Translation,
  TranslocoLoader,
  translocoConfig,
  provideTransloco,
} from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';

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
        prodMode: false, // In real app, check environment.production
      },
      loader: TranslocoHttpLoader,
    }),
  ]);
}
