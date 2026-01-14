/**
 * Auth Facade Service
 * 
 * Facade pattern for authentication state and operations.
 * Isolates auth logic from UI components.
 */

import { Injectable, signal, computed } from '@angular/core';

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

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
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
      // Mock API call - replace with real implementation
      await this.mockApiDelay(1000);
      
      // Validate credentials (mock)
      if (credentials.email === 'admin@erp.com' && credentials.password === 'admin123') {
        const user: AuthUser = {
          id: '1',
          name: 'Admin User',
          email: credentials.email,
          role: 'admin'
        };
        
        this._state.update(state => ({
          ...state,
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        }));
        
        // Store token (mock)
        if (credentials.rememberMe) {
          localStorage.setItem('auth_token', 'mock_token_123');
        } else {
          sessionStorage.setItem('auth_token', 'mock_token_123');
        }
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      this._state.update(state => ({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }));
      throw error;
    }
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
      
      const user: AuthUser = {
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
      sessionStorage.setItem('auth_token', 'mock_token_' + user.id);
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
    
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
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
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    
    if (token) {
      // Mock user restoration - replace with real API call
      const user: AuthUser = {
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
