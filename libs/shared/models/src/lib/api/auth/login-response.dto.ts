/**
 * Login Response DTO
 * API contract for login endpoint response
 */

import { CompanyDto } from '../common/company.dto';

export interface LoginResponseDto {
  readonly status: boolean;
  readonly message: string | null;
  readonly access_token: string;
  readonly refresh_token: string;
  readonly token_type: string;
  readonly userID: number;
  readonly userName: string;
  readonly accountID: number;
  readonly userProfileImage: string | null;
  readonly companyList: CompanyDto[];
  readonly user_plan: unknown | null;
  readonly stamp_security: string;
  readonly raw_claim: string;
  readonly expiration: string | null;
  readonly rolesAndClaims: unknown | null;
}
