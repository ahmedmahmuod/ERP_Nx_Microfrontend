/**
 * User Role Response DTO
 * API contract for user role and permissions response
 */

import { PermissionPageDto } from './permission-page.dto';
import { PermissionActionDto } from './permission-action.dto';

export interface SelectedCompanyDto {
  readonly ID?: number;
  readonly Name?: string;
  readonly Logo?: string;
  [key: string]: unknown;
}

export interface UserRoleResponseDto {
  readonly RoleID: number;
  readonly Pages: PermissionPageDto[];
  readonly Actions: PermissionActionDto[];
  readonly SelectedCompany: SelectedCompanyDto;
  readonly IsThereException: boolean;
  readonly ExceptionMessage: string | null;
}
