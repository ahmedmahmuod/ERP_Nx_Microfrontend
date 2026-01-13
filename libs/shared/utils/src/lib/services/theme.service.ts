/**
 * Theme Service
 * Manages application theme (light/dark mode)
 * Uses modern Angular patterns: signals, inject(), effect()
 * Persists theme preference to localStorage
 */

import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Theme Service
 * Single Responsibility: Theme management
 * Dependency Inversion: Uses browser APIs through abstractions
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  private readonly STORAGE_KEY = 'erp-theme-mode';
  
  /**
   * Current theme mode signal
   */
  private readonly themeMode = signal<ThemeMode>(this.getInitialTheme());
  
  /**
   * System preference signal
   */
  private readonly systemPreference = signal<'light' | 'dark'>(this.getSystemPreference());
  
  /**
   * Computed active theme (resolves 'system' to actual theme)
   */
  readonly activeTheme = computed(() => {
    const mode = this.themeMode();
    if (mode === 'system') {
      return this.systemPreference();
    }
    return mode;
  });
  
  /**
   * Public readonly signals
   */
  readonly currentMode = this.themeMode.asReadonly();
  readonly isDark = computed(() => this.activeTheme() === 'dark');
  readonly isLight = computed(() => this.activeTheme() === 'light');
  
  constructor() {
    // Effect to apply theme to DOM
    effect(() => {
      this.applyTheme(this.activeTheme());
    });
    
    // Effect to persist theme
    effect(() => {
      this.persistTheme(this.themeMode());
    });
    
    // Listen to system preference changes
    if (this.isBrowser) {
      this.listenToSystemPreference();
    }
  }
  
  /**
   * Set theme mode
   */
  setTheme(mode: ThemeMode): void {
    this.themeMode.set(mode);
  }
  
  /**
   * Toggle between light and dark
   */
  toggleTheme(): void {
    const current = this.activeTheme();
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }
  
  /**
   * Get initial theme from localStorage or system
   */
  private getInitialTheme(): ThemeMode {
    if (!this.isBrowser) {
      return 'light';
    }
    
    const stored = localStorage.getItem(this.STORAGE_KEY) as ThemeMode;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored;
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
    
    mediaQuery.addEventListener('change', (e) => {
      this.systemPreference.set(e.matches ? 'dark' : 'light');
    });
  }
  
  /**
   * Apply theme to DOM
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
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#030712' : '#ffffff');
    }
  }
  
  /**
   * Persist theme to localStorage
   */
  private persistTheme(mode: ThemeMode): void {
    if (!this.isBrowser) {
      return;
    }
    
    localStorage.setItem(this.STORAGE_KEY, mode);
  }
}
