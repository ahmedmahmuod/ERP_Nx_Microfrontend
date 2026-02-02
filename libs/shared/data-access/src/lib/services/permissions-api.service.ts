import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from './api-client.service';
import { UserRoleResponseDto } from '@erp/shared/models';

export interface GetUserRolePayload {
  CompanyID: string;
  UserID: string;
  ModuleID: number;
}

@Injectable({
  providedIn: 'root',
})
export class PermissionsApiService {
  private readonly apiClient = inject(ApiClient);

  /**
   * Get user permissions for a specific module and company
   */
  getUserRoleInCompany(
    payload: GetUserRolePayload,
  ): Observable<UserRoleResponseDto> {
    // Calling the Gateway service (Shell/Gateway api)
    const url = this.apiClient.buildUrl(
      'gateway',
      '/UserRole/GetUserRoleInCompany',
    );
    return this.apiClient.post<UserRoleResponseDto>(url, payload);
  }
}
