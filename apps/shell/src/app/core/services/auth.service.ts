/**
 * Auth Service
 * 
 * Manages authentication state and operations.
 */

import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly STORAGE_KEY = 'erp-auth-token';
  private readonly USER_KEY = 'erp-user';
  
  // Auth state
  private readonly isAuthenticatedSignal = signal<boolean>(this.checkAuth());
  private readonly currentUserSignal = signal<User | null>(this.loadUser());
  
  // Public readonly signals
  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();
  readonly currentUser = this.currentUserSignal.asReadonly();
  
  /**
   * Check if user is authenticated
   */
  private checkAuth(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
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
        role: 'admin'
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem(this.STORAGE_KEY, mockToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(mockUser));
      
      this.isAuthenticatedSignal.set(true);
      this.currentUserSignal.set(mockUser);
      
      return true;
    }
    
    return false;
  }
  
  /**
   * Logout
   */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    this.isAuthenticatedSignal.set(false);
    this.currentUserSignal.set(null);
    
    this.router.navigate(['/auth/login']);
  }
  
  /**
   * Get auth token
   */
  getToken(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }
}
