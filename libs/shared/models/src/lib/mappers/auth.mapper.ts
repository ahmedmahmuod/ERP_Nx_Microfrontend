/**
 * Auth Mapper
 * Maps between Auth DTOs and domain models
 */

import { LoginResponseDto } from '../api/auth/login-response.dto';
import { AuthSession, AuthTokens } from '../domain/auth-session.model';
import { User } from '../domain/user.model';
import { mapCompanyDtosToCompanies } from './company.mapper';

export function mapLoginResponseDtoToAuthSession(
  dto: LoginResponseDto,
  email: string
): AuthSession {
  const user: User = {
    id: dto.userID.toString(),
    name: dto.userName,
    email: email,
    role: 'user', // Backend doesn't provide role in login response
    avatar: dto.userProfileImage || undefined,
  };

  const tokens: AuthTokens = {
    accessToken: dto.access_token,
    refreshToken: dto.refresh_token,
    tokenType: dto.token_type,
  };

  const companies = mapCompanyDtosToCompanies(dto.companyList);

  return {
    user,
    tokens,
    companies,
    isAuthenticated: true,
  };
}
