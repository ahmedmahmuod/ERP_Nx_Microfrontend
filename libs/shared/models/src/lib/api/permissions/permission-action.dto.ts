/**
 * Permission Action DTO
 * Represents an action permission from the API
 */

export interface PermissionActionDto {
  readonly ID?: number;
  readonly ActionID?: number;
  readonly ActionName?: string;
  readonly ActionValue?: string;
  readonly Type?: string; // Correct property from JSON
  readonly type?: string; // camelCase from JSON
  readonly ModuleID?: number;
  readonly IsActive?: boolean;
  readonly isActive?: boolean; // camelCase
  [key: string]: unknown;
}
