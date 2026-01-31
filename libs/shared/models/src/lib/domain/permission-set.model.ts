/**
 * Permission Set Domain Model
 * Normalized structure for fast permission checks
 */

export interface PermissionSet {
  readonly roleId: number;
  readonly companyId: string;
  readonly moduleId: number;
  readonly allowedPages: Set<string>;
  readonly allowedActions: Set<string>;
}
