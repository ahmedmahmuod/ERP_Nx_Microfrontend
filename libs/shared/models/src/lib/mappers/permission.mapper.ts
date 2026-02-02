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
  moduleId: number,
): PermissionSet {
  // Extract page identifiers
  // Priority: Type (JSON 'type') > PageValue > PageID
  const allowedPages = new Set<string>(
    dto.Pages.filter((page) => {
      // Handle casing for IsActive
      const isActive = page.IsActive ?? page.isActive ?? page['isActive'];
      return isActive !== false;
    })
      .map((page) => {
        // Handle casing and property preference
        // JSON returns 'type': 'CompaniesList' -> matches registry 'pageKey'
        const key =
          page.Type ||
          page.type ||
          page['type'] ||
          page.PageValue ||
          page['value'] ||
          page.PageID?.toString() ||
          page['id']?.toString() ||
          '';
        return (key as string).trim();
      })
      .filter((k): k is string => !!k),
  );

  // Extract action identifiers
  // Priority: Type > ActionValue > ActionID
  const allowedActions = new Set<string>(
    dto.Actions.filter((action) => {
      const isActive = action.IsActive ?? action.isActive ?? action['isActive'];
      return isActive !== false;
    })
      .map((action) => {
        const key =
          action.Type ||
          action.type ||
          action['type'] ||
          action.ActionValue ||
          action['value'] ||
          action.ActionID?.toString() ||
          action['id']?.toString() ||
          '';
        return key as string;
      })
      .filter((k): k is string => !!k),
  );

  return {
    roleId: dto.RoleID,
    companyId,
    moduleId,
    allowedPages,
    allowedActions,
  };
}
