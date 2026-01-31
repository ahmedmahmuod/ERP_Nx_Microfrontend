/**
 * Auth Session Domain Model
 * Business entity for authentication session data
 */

import { User } from './user.model';
import { Company } from './company.model';

export interface AuthTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly tokenType: string;
}

export interface AuthSession {
  readonly user: User;
  readonly tokens: AuthTokens;
  readonly companies: Company[];
  readonly isAuthenticated: boolean;
}
