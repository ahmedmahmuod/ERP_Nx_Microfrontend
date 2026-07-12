/**
 * ⚠️  MOCK MODE ENABLED — Real API calls are disabled for local testing.
 *     To restore, remove the mock return and uncomment the real code block.
 */

import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiClient } from './api-client.service';
import { UserRoleResponseDto } from '@erp/shared/models';

export interface GetUserRolePayload {
  CompanyID: string;
  UserID: string;
  ModuleID: number;
}

// ---------------------------------------------------------------------------
// 🧪 Mock: Full admin permissions — all pages and all actions granted
// Includes ALL permission keys used by the dashboard module cards and
// operational items so every card is visible in mock mode.
// ---------------------------------------------------------------------------
function buildMockUserRoleResponse(payload: GetUserRolePayload): UserRoleResponseDto {
  // All permission keys checked by dashboard.component.ts and dashboard.registry.ts
  const allPageValues = [
    // ── APP Modules (colorful cards) ──────────────────────────────────────
    'PayrollModule',
    'FinanceModule',
    'WarehouseModule',
    'WarehousesModule',
    'SRMModule',
    'ProjectManagmentModule',   // Note: intentional backend typo preserved
    // ── Operational Items (gray cards) ───────────────────────────────────
    'EntitiesList',
    'Resources',
    'PiblineApp',               // Note: intentional backend typo preserved
    'PiblineAp',                // Secondary key variant in registry
    'PaymentRequest',
    'MyPaymentRequests',
    'NeedsRequest',
    'MyNeedRequests',
    'DocumnetsModule',          // Note: intentional backend typo preserved
    'Documents',
    'Contracts',
    // ── Generic page-level keys ───────────────────────────────────────────
    'dashboard', 'list', 'create', 'edit', 'details', 'reports',
    'view', 'delete', 'export', 'print',
  ];

  const allActionValues = [
    'view', 'create', 'edit', 'delete', 'export', 'print', 'approve', 'reject',
  ];

  return {
    RoleID: 1,
    IsThereException: false,
    ExceptionMessage: null,
    SelectedCompany: {
      ID: Number(payload.CompanyID) || 1,
      Name: 'Assemble Corp (Mock)',
      Logo: null,
    },
    Pages: allPageValues.map((value, index) => ({
      ID: index + 1,
      PageName: value,
      PageValue: value,
      Type: value,   // ← Mapper reads Type first; set it to the key so canAccessPage() matches
      ModuleID: payload.ModuleID,
      IsActive: true,
    })),
    Actions: allActionValues.map((value, index) => ({
      ID: index + 1,
      ActionName: value,
      ActionValue: value,
      Type: value,   // ← Same for actions
      ModuleID: payload.ModuleID,
      IsActive: true,
    })),
  };
}
// ---------------------------------------------------------------------------

@Injectable({
  providedIn: 'root',
})
export class PermissionsApiService {
  private readonly apiClient = inject(ApiClient);

  /**
   * Get user permissions for a specific module and company
   * 🧪 MOCK: Returns full admin permissions for any module/company.
   */
  getUserRoleInCompany(
    payload: GetUserRolePayload,
  ): Observable<UserRoleResponseDto> {
    // --- REAL CODE (uncomment to restore) ---
    // const url = this.apiClient.buildUrl(
    //   'gateway',
    //   '/UserRole/GetUserRoleInCompany',
    // );
    // return this.apiClient.post<UserRoleResponseDto>(url, payload);
    // ----------------------------------------
    console.log('[PermissionsApiService] 🧪 MOCK getUserRoleInCompany called:', payload);
    return of(buildMockUserRoleResponse(payload));
  }
}

