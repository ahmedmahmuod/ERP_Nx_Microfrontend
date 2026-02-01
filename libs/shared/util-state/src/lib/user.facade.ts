/**
 * User Facade
 *
 * Manages authenticated user state.
 * Single source of truth for user information across the application.
 * User data is stored in localStorage by AuthFacadeService during login.
 */

import { Injectable, signal, effect, computed, inject } from '@angular/core';
import { ApiClient } from '@erp/shared/data-access';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  private readonly STORAGE_KEY = 'erp-user';
  private readonly apiClient = inject(ApiClient);

  // State
  private readonly _user = signal<User | null>(this.loadUserFromStorage());

  // Public readonly selectors
  readonly user = this._user.asReadonly();

  // Computed values
  readonly userName = computed(() => this._user()?.name ?? '');
  readonly userEmail = computed(() => this._user()?.email ?? '');
  readonly userInitials = computed(() => {
    const name = this._user()?.name;
    if (!name) return '';

    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  });
  readonly userFirstName = computed(() => {
    const name = this._user()?.name;
    if (!name) return '';
    return name.trim().split(' ')[0];
  });

  readonly userId = computed(() => this._user()?.id ?? '');

  /**
   * Computed full avatar URL using API architecture
   * Uses ApiClient to build proper asset URL following existing patterns
   * Returns null if user has no avatar
   */
  readonly userAvatarUrl = computed(() => {
    const avatar = this._user()?.avatar;
    if (!avatar) return null;
    return this.apiClient.buildAssetUrl('shell', 'profilePictures', avatar);
  });

  constructor() {
    // Persistence effect - sync with localStorage
    effect(() => {
      const user = this._user();
      if (user) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      }
    });
  }

  /**
   * Set user data (called after login or when user data updates)
   */
  setUser(user: User): void {
    this._user.set(user);
  }

  /**
   * Clear user data (used on logout)
   */
  clearUser(): void {
    this._user.set(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Refresh user data from localStorage
   * Useful when user data might have been updated externally
   */
  refreshUser(): void {
    this._user.set(this.loadUserFromStorage());
  }

  /**
   * Load user from localStorage if exists
   */
  private loadUserFromStorage(): User | null {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  }
}
