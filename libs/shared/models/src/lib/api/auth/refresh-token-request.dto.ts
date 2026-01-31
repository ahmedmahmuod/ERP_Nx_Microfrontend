/**
 * Refresh Token Request DTO
 * API contract for token refresh endpoint
 */

export interface RefreshTokenRequestDto {
  readonly refresh_token: string;
}
