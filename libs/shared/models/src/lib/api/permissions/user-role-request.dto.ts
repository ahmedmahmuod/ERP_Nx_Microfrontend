/**
 * User Role Request DTO
 * API contract for requesting user role and permissions
 */

export interface UserRoleRequestDto {
  readonly CompanyID: string;
  readonly UserID: number;
  readonly ModuleID: number;
}
