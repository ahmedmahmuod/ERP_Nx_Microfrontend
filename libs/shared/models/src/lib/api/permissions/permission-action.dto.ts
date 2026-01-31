/**
 * Permission Action DTO
 * Represents an action permission from the API
 */

export interface PermissionActionDto {
  readonly ID?: number;
  readonly ActionID?: number;
  readonly ActionName?: string;
  readonly ActionValue?: string;
  readonly ModuleID?: number;
  readonly IsActive?: boolean;
  [key: string]: unknown;
}
