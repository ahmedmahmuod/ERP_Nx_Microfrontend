/**
 * Permission Mapper
 * Maps between Permission DTOs and domain models
 * Single source of truth for permission normalization
 */

import { UserRoleResponseDto } from '../api/permissions/user-role-response.dto';
import { PermissionSet } from '../domain/permission-set.model';

/**
 * Normalize permission response into fast-lookup structure
 * Uses PageValue and ActionValue as unique identifiers
 */
export function mapUserRoleResponseToPermissionSet(
  dto: UserRoleResponseDto,
  companyId: string,
  moduleId: number
): PermissionSet {
  // Extract page identifiers (prefer PageValue, fallback to PageID)
  const allowedPages = new Set<string>(
    dto.Pages
      .filter(page => page.IsActive !== false)
      .map(page => page.PageValue || page.PageID?.toString() || '')
      .filter(Boolean)
  );

  // Extract action identifiers (prefer ActionValue, fallback to ActionID)
  const allowedActions = new Set<string>(
    dto.Actions
      .filter(action => action.IsActive !== false)
      .map(action => action.ActionValue || action.ActionID?.toString() || '')
      .filter(Boolean)
  );

  return {
    roleId: dto.RoleID,
    companyId,
    moduleId,
    allowedPages,
    allowedActions,
  };
}
