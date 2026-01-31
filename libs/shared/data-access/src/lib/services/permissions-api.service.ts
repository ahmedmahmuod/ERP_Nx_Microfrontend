/**
 * Permissions API Service
 * Handles all permission-related API calls
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from './api-client.service';
import {
  UserRoleRequestDto,
  UserRoleResponseDto,
} from '@erp/shared/models';

@Injectable({
  providedIn: 'root',
})
export class PermissionsApiService {
  private readonly apiClient = inject(ApiClient);

  /**
   * Get user role and permissions for a specific company and module
   */
  getUserRoleInCompany(
    request: UserRoleRequestDto
  ): Observable<UserRoleResponseDto> {
    const url = this.apiClient.buildUrl('shell', '/UserRole/GetUserRoleInCompany');
    return this.apiClient.post<UserRoleResponseDto>(url, request);
  }
}
