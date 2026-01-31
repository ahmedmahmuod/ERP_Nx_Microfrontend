/**
 * Login Request DTO
 * API contract for login endpoint
 */

export interface LoginRequestDto {
  readonly Email: string;
  readonly Password: string;
}
