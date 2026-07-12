/**
 * Auth API Service
 * Handles authentication-related API calls
 * Uses DTOs from @erp/shared/models for type contracts
 *
 * ⚠️  MOCK MODE ENABLED — Real API calls are disabled for local testing.
 *     To restore real API calls, remove the mock returns and uncomment the real code.
 */

import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiClient } from '../services/api-client.service';
import { LoginResponseDto } from '@erp/shared/models';

// ---------------------------------------------------------------------------
// 🧪 Mock Data — Admin user session returned by every login attempt
// ---------------------------------------------------------------------------
const MOCK_LOGIN_RESPONSE: LoginResponseDto = {
  status: true,
  message: null,
  access_token: 'mock-access-token-admin-12345',
  refresh_token: 'mock-refresh-token-admin-12345',
  token_type: 'Bearer',
  userID: 1,
  userName: 'Admin User',
  accountID: 1,
  userProfileImage: null,
  companyList: [
    {
      ID: 1,
      Name: 'Assemble Corp (Mock)',
      Phone: '+1-000-000-0000',
      Email: 'admin@mock.local',
      Location: 'Mock City',
      Logo: null,
      profileImage: null,
      EntityID: 1,
      IsDeleted: false,
      CreatedBy: 1,
      CreatedDateTime: '2024-01-01T00:00:00',
      DeletedBy: null,
      DeletedDateTime: null,
      HistoryKey: null,
      CompanyID: 1,
      AccountID: 1,
    },
  ],
  user_plan: null,
  stamp_security: 'mock-stamp',
  raw_claim: 'mock-claim',
  expiration: null,
  rolesAndClaims: null,
};
// ---------------------------------------------------------------------------

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly apiClient = inject(ApiClient);

  /**
   * Login user
   * 🧪 MOCK: Returns a fake successful admin login response.
   */
  login(credentials: { email: string; password: string }): Observable<LoginResponseDto> {
    // --- REAL CODE (uncomment to restore) ---
    // const url = this.apiClient.buildUrl('auth', '/Account/UserLogin');
    // const payload: LoginRequestDto = {
    //   Email: credentials.email,
    //   Password: credentials.password,
    // };
    // return this.apiClient.post<LoginResponseDto>(url, payload);
    // ----------------------------------------
    console.log('[AuthApiService] 🧪 MOCK login called for:', credentials.email);
    return of({ ...MOCK_LOGIN_RESPONSE });
  }

  /**
   * Refresh access token
   * 🧪 MOCK: Returns a refreshed mock token.
   */
  refreshToken(refreshToken: string): Observable<LoginResponseDto> {
    // --- REAL CODE (uncomment to restore) ---
    // const url = this.apiClient.buildUrl('auth', '/Account/RefreshToken');
    // const payload: RefreshTokenRequestDto = {
    //   refresh_token: refreshToken,
    // };
    // return this.apiClient.post<LoginResponseDto>(url, payload);
    // ----------------------------------------
    console.log('[AuthApiService] 🧪 MOCK refreshToken called');
    return of({ ...MOCK_LOGIN_RESPONSE, access_token: 'mock-refreshed-token-' + Date.now() });
  }

  /**
   * Logout user
   * 🧪 MOCK: Returns void immediately.
   */
  logout(): Observable<void> {
    // --- REAL CODE (uncomment to restore) ---
    // const url = this.apiClient.buildUrl('auth', '/Account/Logout');
    // return this.apiClient.post<void>(url);
    // ----------------------------------------
    console.log('[AuthApiService] 🧪 MOCK logout called');
    return of(undefined);
  }
}
