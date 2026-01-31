/**
 * User Domain Model
 * Business entity for user data used in application state
 */

export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: string;
  readonly avatar?: string;
}
