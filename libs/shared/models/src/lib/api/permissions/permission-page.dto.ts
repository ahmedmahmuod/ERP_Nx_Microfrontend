/**
 * Permission Page DTO
 * Represents a page permission from the API
 */

export interface PermissionPageDto {
  readonly ID?: number;
  readonly PageID?: number;
  readonly PageName?: string;
  readonly PageValue?: string;
  readonly ModuleID?: number;
  readonly IsActive?: boolean;
  [key: string]: unknown;
}
