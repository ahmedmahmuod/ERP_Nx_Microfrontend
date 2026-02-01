/**
 * User Role Request DTO
 * API contract for requesting user role and permissions
 * IMPORTANT: CompanyID and UserID must be strings, ModuleID is number
 */

export interface UserRoleRequestDto {
  readonly CompanyID: string;
  readonly UserID: string;
  readonly ModuleID: number;
}
