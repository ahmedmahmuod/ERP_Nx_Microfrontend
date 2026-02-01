/**
 * Shell Tabs Service
 * Manages Shell-specific tab navigation (Main/Payment/Needs/Docs)
 * Persists active tab in localStorage as UI preference
 */

import { Injectable, signal } from '@angular/core';

export type ShellTabCategory = 'main' | 'payment' | 'needs' | 'docs';

export interface ShellTab {
  id: ShellTabCategory;
  label: string;
  icon: string;
}

const SHELL_TABS: ShellTab[] = [
  { id: 'main', label: 'tabs.main', icon: 'pi-th-large' },
  { id: 'payment', label: 'tabs.payment', icon: 'pi-credit-card' },
  { id: 'needs', label: 'tabs.needs', icon: 'pi-shopping-cart' },
  { id: 'docs', label: 'tabs.docs', icon: 'pi-file' },
];

const STORAGE_KEY = 'shell-active-tab';

@Injectable({
  providedIn: 'root',
})
export class ShellTabsService {
  private readonly activeTabSignal = signal<ShellTabCategory>(
    this.loadActiveTabFromStorage(),
  );

  readonly tabs = SHELL_TABS;
  readonly activeTab = this.activeTabSignal.asReadonly();

  /**
   * Set active tab and persist to localStorage
   */
  setActiveTab(tabId: ShellTabCategory): void {
    this.activeTabSignal.set(tabId);
    localStorage.setItem(STORAGE_KEY, tabId);
  }

  /**
   * Load active tab from localStorage or default to 'main'
   */
  private loadActiveTabFromStorage(): ShellTabCategory {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && this.isValidTab(stored)) {
      return stored as ShellTabCategory;
    }
    return 'main';
  }

  /**
   * Check if tab ID is valid
   */
  private isValidTab(tabId: string): boolean {
    return SHELL_TABS.some((tab) => tab.id === tabId);
  }
}
