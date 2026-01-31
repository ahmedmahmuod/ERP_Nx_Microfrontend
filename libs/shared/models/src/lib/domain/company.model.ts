/**
 * Company Domain Model
 * Business entity for company data used in application state
 */

export interface Company {
  readonly id: string;
  readonly name: string;
  readonly logo?: string;
  readonly description?: string;
  readonly status: 'active' | 'inactive';
}
