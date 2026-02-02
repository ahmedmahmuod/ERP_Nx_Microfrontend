/**
 * Permission Page DTO
 * Represents a page permission from the API
 */

export interface PermissionPageDto {
  readonly ID?: number;
  readonly PageID?: number; // Some endpoints might return this
  readonly PageName?: string;
  readonly PageValue?: string;
  readonly Type?: string; // Correct property from JSON (PascalCase)
  readonly type?: string; // Correct property from JSON (camelCase)
  readonly ModuleID?: number;
  readonly IsActive?: boolean;
  readonly isActive?: boolean; // Handle camelCase
  [key: string]: unknown;
}
