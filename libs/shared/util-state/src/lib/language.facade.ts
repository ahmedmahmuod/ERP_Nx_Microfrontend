import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type Language = 'en' | 'ar';

@Injectable({
  providedIn: 'root',
})
export class LanguageFacade {
  private readonly STORAGE_KEY = 'erp_language';

  // State
  private readonly _activeLanguage = signal<Language>(this.loadSavedLanguage());
  private readonly transloco = inject(TranslocoService);

  readonly availableLanguages = signal<
    { code: Language; label: string; flag: string }[]
  >([
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ]);

  // Selectors
  readonly activeLanguage = computed(() => this._activeLanguage());
  readonly isRtl = computed(() => this._activeLanguage() === 'ar');

  constructor() {
    // Sync with Transloco and Dir
    effect(() => {
      const lang = this._activeLanguage();
      this.transloco.setActiveLang(lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem(this.STORAGE_KEY, lang);
    });
  }

  setLanguage(lang: Language): void {
    this._activeLanguage.set(lang);
  }

  private loadSavedLanguage(): Language {
    const saved = localStorage.getItem(this.STORAGE_KEY) as Language;
    return saved === 'ar' ? 'ar' : 'en'; // Default to 'en'
  }
}
