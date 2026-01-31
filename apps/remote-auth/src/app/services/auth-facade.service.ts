/**
 * Auth Facade Service
 *
 * Facade pattern for authentication state and operations.
 * Isolates auth logic from UI components.
 * Uses domain models from @erp/shared/models
 */

import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  AuthApiService,
  TokenStorage,
  TOKEN_STORAGE,
  ApiError,
} from '@erp/shared/data-access';
import { CompanyFacade, PermissionsFacade } from '@erp/shared/util-state';
import { User, mapLoginResponseDtoToAuthSession } from '@erp/shared/models';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  private readonly authApi = inject(AuthApiService);
  private readonly tokenStorage = inject(TOKEN_STORAGE);
  private readonly companyFacade = inject(CompanyFacade);
  private readonly permissionsFacade = inject(PermissionsFacade);
  private readonly router = inject(Router);

  /**
   * Auth state signal
   */
  private readonly _state = signal<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  });

  /**
   * Public readonly state
   */
  readonly state = this._state.asReadonly();

  /**
   * Computed: Current user
   */
  readonly currentUser = computed(() => this._state().user);

  /**
   * Computed: Is authenticated
   */
  readonly isAuthenticated = computed(() => this._state().isAuthenticated);

  /**
   * Computed: Is loading
   */
  readonly isLoading = computed(() => this._state().isLoading);

  /**
   * Computed: Error message
   */
  readonly error = computed(() => this._state().error);

  /**
   * Login with credentials
   */
  async login(credentials: LoginCredentials): Promise<void> {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));

    try {
      // Call real API
      const response = await firstValueFrom(
        this.authApi.login({
          email: credentials.email,
          password: credentials.password,
        })
      );

      // Check response status
      if (!response.status) {
        throw new Error(response.message || 'Login failed');
      }

      // Map DTO to domain model using mapper
      const authSession = mapLoginResponseDtoToAuthSession(response, credentials.email);

      // Store access token only (backend sends only 1 token)
      this.tokenStorage.setAccessToken(authSession.tokens.accessToken);

      // Store user data
      localStorage.setItem('erp-user', JSON.stringify(authSession.user));

      // Update state
      this._state.update(state => ({
        ...state,
        user: authSession.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }));

      // Store company list in CompanyFacade (persisted to localStorage automatically)
      this.companyFacade.setCompanies(authSession.companies);
    } catch (error: unknown) {
      // Handle ApiError
      if (this.isApiError(error)) {
        this._state.update(state => ({
          ...state,
          isLoading: false,
          error: error.messageKey
        }));
      } else {
        this._state.update(state => ({
          ...state,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Login failed'
        }));
      }
      throw error;
    }
  }

  /**
   * Type guard for ApiError
   */
  private isApiError(error: unknown): error is ApiError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'kind' in error &&
      'messageKey' in error
    );
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<void> {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));

    try {
      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Mock API call - replace with real implementation
      await this.mockApiDelay(1000);

      const user: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: 'user'
      };

      this._state.update(state => ({
        ...state,
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }));

      // Store token (mock)
      const mockToken = 'mock-jwt-token-' + Date.now();
      this.tokenStorage.setAccessToken(mockToken);
      localStorage.setItem('erp-user', JSON.stringify(user));
    } catch (error) {
      this._state.update(state => ({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      }));
      throw error;
    }
  }

  /**
   * Logout
   */
  logout(): void {
    this._state.set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });

    // Clear tokens using TokenStorage
    this.tokenStorage.clearTokens();

    // Clear user data
    localStorage.removeItem('erp-user');

    // Clear companies
    this.companyFacade.clearCompanies();
    this.companyFacade.clearCompany();

    // Clear permissions
    this.permissionsFacade.clearPermissions();
  }

  /**
   * Clear error
   */
  clearError(): void {
    this._state.update(state => ({
      ...state,
      error: null
    }));
  }

  /**
   * Check if user is authenticated (on app init)
   */
  checkAuth(): void {
    const token = this.tokenStorage.getAccessToken();

    if (token) {
      // Mock user restoration - replace with real API call
      const user: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@erp.com',
        role: 'admin'
      };

      this._state.update(state => ({
        ...state,
        user,
        isAuthenticated: true
      }));
    }
  }

  /**
   * Mock API delay
   */
  private mockApiDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
