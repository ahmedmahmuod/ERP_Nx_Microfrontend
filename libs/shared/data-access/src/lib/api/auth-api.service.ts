/**
 * Auth API Service
 * Handles authentication-related API calls
 * Uses DTOs from @erp/shared/models for type contracts
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginRequestDto,
  LoginResponseDto,
  RefreshTokenRequestDto,
} from '@erp/shared/models';
import { ApiClient } from '../services/api-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly apiClient = inject(ApiClient);

  /**
   * Login user
   */
  login(credentials: { email: string; password: string }): Observable<LoginResponseDto> {
    const url = this.apiClient.buildUrl('auth', '/Account/UserLogin');
    const payload: LoginRequestDto = {
      Email: credentials.email,
      Password: credentials.password,
    };

    return this.apiClient.post<LoginResponseDto>(url, payload);
  }

  /**
   * Refresh access token
   */
  refreshToken(refreshToken: string): Observable<LoginResponseDto> {
    const url = this.apiClient.buildUrl('auth', '/Account/RefreshToken');
    const payload: RefreshTokenRequestDto = {
      refresh_token: refreshToken,
    };

    return this.apiClient.post<LoginResponseDto>(url, payload);
  }

  /**
   * Logout user
   */
  logout(): Observable<void> {
    const url = this.apiClient.buildUrl('auth', '/Account/Logout');
    return this.apiClient.post<void>(url);
  }
}
