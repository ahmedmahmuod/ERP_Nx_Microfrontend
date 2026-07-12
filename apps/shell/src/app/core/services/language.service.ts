/**
 * Language Service
 * 
 * Manages application language (AR/EN) with RTL/LTR support.
 * Persists selection in localStorage.
 */

import { Injectable, signal, computed, effect } from '@angular/core';

export type Language = 'en' | 'ar';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'erp-language';
  
  // Available languages
  readonly languages: LanguageOption[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      direction: 'ltr',
      flag: '🇬🇧'
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      direction: 'rtl',
      flag: '🇸🇦'
    }
  ];
  
  // Current language state
  private readonly currentLanguageSignal = signal<Language>(this.getInitialLanguage());
  
  // Public readonly signals
  readonly currentLanguage = this.currentLanguageSignal.asReadonly();
  
  readonly currentLanguageOption = computed(() => {
    const code = this.currentLanguage();
    return this.languages.find(lang => lang.code === code) || this.languages[0];
  });
  
  readonly isRTL = computed(() => this.currentLanguageOption().direction === 'rtl');
  
  readonly direction = computed(() => this.currentLanguageOption().direction);
  
  constructor() {
    // Apply language on initialization
    this.applyLanguage(this.currentLanguage());
    
    // Watch for language changes and apply them
    effect(() => {
      const lang = this.currentLanguage();
      this.applyLanguage(lang);
    });
  }
  
  /**
   * Get initial language from localStorage or browser
   */
  private getInitialLanguage(): Language {
    // Try localStorage first
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === 'en' || stored === 'ar') {
      return stored;
    }
    
    // Try browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ar')) {
      return 'ar';
    }
    
    // Default to English
    return 'en';
  }
  
  /**
   * Set current language
   */
  setLanguage(language: Language): void {
    if (language !== this.currentLanguage()) {
      this.currentLanguageSignal.set(language);
      localStorage.setItem(this.STORAGE_KEY, language);
    }
  }
  
  /**
   * Toggle between English and Arabic
   */
  toggleLanguage(): void {
    const newLang = this.currentLanguage() === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }
  
  /**
   * Apply language to DOM
   */
  private applyLanguage(language: Language): void {
    const html = document.documentElement;
    const option = this.languages.find(lang => lang.code === language);
    
    if (option) {
      // Set lang attribute
      html.setAttribute('lang', language);
      
      // Set dir attribute
      html.setAttribute('dir', option.direction);
      
      // Add/remove RTL class
      if (option.direction === 'rtl') {
        html.classList.add('rtl');
        html.classList.remove('ltr');
      } else {
        html.classList.add('ltr');
        html.classList.remove('rtl');
      }
    }
  }
  
  /**
   * Get translation key (for future i18n integration)
   */
  translate(key: string): string {
    // Placeholder for future i18n integration
    // For now, return the key itself
    return key;
  }
}
