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
  TRANSLOCO_SCOPE,
} from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

// Scoped loader for 'auth' scope
@Injectable({ providedIn: 'root' })
export class AuthScopeLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/auth/${lang}.json`);
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
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'auth', loader: AuthScopeLoader },
      multi: true,
    },
  ]);
}
