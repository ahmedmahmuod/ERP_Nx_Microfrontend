/**
 * Auth Service
 *
 * Manages authentication state and operations.
 * Uses TokenStorage abstraction for consistent token management across Shell and remotes.
 */

import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyFacade } from '@erp/shared/util-state';
import { TokenStorage, TOKEN_STORAGE } from '@erp/shared/data-access';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly companyFacade = inject(CompanyFacade);
  private readonly tokenStorage = inject(TOKEN_STORAGE);
  private readonly USER_KEY = 'erp-user';

  // Auth state - currentUser only (isAuthenticated is computed dynamically)
  private readonly currentUserSignal = signal<User | null>(this.loadUser());

  // Public readonly signals
  readonly currentUser = this.currentUserSignal.asReadonly();

  /**
   * Check if user is authenticated (always checks TokenStorage in real-time)
   * This ensures authentication state is always current, even after login from remote apps
   */
  isAuthenticated(): boolean {
    return this.tokenStorage.hasTokens();
  }

  /**
   * Load user from storage
   */
  private loadUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Login (mock implementation)
   */
  async login(email: string, password: string): Promise<boolean> {
    // Mock login - replace with actual API call
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: 'Ahmed Mahmoud',
        email: email,
        role: 'admin',
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      this.tokenStorage.setAccessToken(mockToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(mockUser));

      // Update current user signal
      this.currentUserSignal.set(mockUser);

      return true;
    }

    return false;
  }

  /**
   * Logout
   */
  logout(): void {
    // Clear company state
    this.companyFacade.clearCompany();

    // Clear auth state
    this.tokenStorage.clearTokens();
    localStorage.removeItem(this.USER_KEY);

    // Clear current user signal
    this.currentUserSignal.set(null);

    this.router.navigate(['/auth/login']);
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    return this.tokenStorage.getAccessToken();
  }
}
