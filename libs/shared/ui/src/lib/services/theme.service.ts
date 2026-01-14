/**
 * Theme Service
 * 
 * Manages application theme (light/dark/system) with localStorage persistence.
 * Follows modern Angular patterns with signals and inject().
 * 
 * @example
 * ```typescript
 * export class MyComponent {
 *   private themeService = inject(ThemeService);
 *   
 *   theme = this.themeService.currentTheme;
 *   isDark = this.themeService.isDarkMode;
 *   
 *   toggleTheme() {
 *     this.themeService.toggleTheme();
 *   }
 *   
 *   setTheme(theme: ThemeMode) {
 *     this.themeService.setTheme(theme);
 *   }
 * }
 * ```
 */

import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeMode } from '../core/types/component.types';

const THEME_STORAGE_KEY = 'erp-theme-preference';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  /**
   * Current theme mode signal
   */
  private readonly _currentTheme = signal<ThemeMode>(this.getInitialTheme());
  
  /**
   * System preference signal
   */
  private readonly _systemPreference = signal<'light' | 'dark'>(this.getSystemPreference());
  
  /**
   * Public readonly current theme
   */
  readonly currentTheme = this._currentTheme.asReadonly();
  
  /**
   * Computed: Effective theme (resolves 'system' to actual theme)
   */
  readonly effectiveTheme = computed<'light' | 'dark'>(() => {
    const theme = this._currentTheme();
    if (theme === 'system') {
      return this._systemPreference();
    }
    return theme;
  });
  
  /**
   * Computed: Is dark mode active
   */
  readonly isDarkMode = computed(() => this.effectiveTheme() === 'dark');
  
  /**
   * Computed: Is light mode active
   */
  readonly isLightMode = computed(() => this.effectiveTheme() === 'light');
  
  /**
   * Computed: Is system mode selected
   */
  readonly isSystemMode = computed(() => this._currentTheme() === 'system');
  
  constructor() {
    // Apply theme to document
    effect(() => {
      this.applyTheme(this.effectiveTheme());
    });
    
    // Listen to system preference changes
    if (this.isBrowser) {
      this.listenToSystemPreference();
    }
  }
  
  /**
   * Set theme mode
   */
  setTheme(theme: ThemeMode): void {
    this._currentTheme.set(theme);
    this.saveThemePreference(theme);
  }
  
  /**
   * Toggle between light and dark
   */
  toggleTheme(): void {
    const current = this.effectiveTheme();
    const newTheme: ThemeMode = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  /**
   * Set to light mode
   */
  setLightMode(): void {
    this.setTheme('light');
  }
  
  /**
   * Set to dark mode
   */
  setDarkMode(): void {
    this.setTheme('dark');
  }
  
  /**
   * Set to system mode
   */
  setSystemMode(): void {
    this.setTheme('system');
  }
  
  /**
   * Get initial theme from localStorage or system
   */
  private getInitialTheme(): ThemeMode {
    if (!this.isBrowser) {
      return 'light';
    }
    
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && this.isValidTheme(stored)) {
        return stored as ThemeMode;
      }
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
    }
    
    return 'system';
  }
  
  /**
   * Get system color scheme preference
   */
  private getSystemPreference(): 'light' | 'dark' {
    if (!this.isBrowser) {
      return 'light';
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  /**
   * Listen to system preference changes
   */
  private listenToSystemPreference(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handler = (e: MediaQueryListEvent) => {
      this._systemPreference.set(e.matches ? 'dark' : 'light');
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
    }
  }
  
  /**
   * Apply theme to document
   */
  private applyTheme(theme: 'light' | 'dark'): void {
    if (!this.isBrowser) {
      return;
    }
    
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    // Also set data attribute for CSS
    root.setAttribute('data-theme', theme);
  }
  
  /**
   * Save theme preference to localStorage
   */
  private saveThemePreference(theme: ThemeMode): void {
    if (!this.isBrowser) {
      return;
    }
    
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }
  
  /**
   * Validate theme string
   */
  private isValidTheme(theme: string): boolean {
    return ['light', 'dark', 'system'].includes(theme);
  }
}
