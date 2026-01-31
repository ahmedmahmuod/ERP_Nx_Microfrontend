/**
 * Token Storage Interface
 * Abstraction for token persistence (localStorage, sessionStorage, secure storage, etc.)
 */

export interface TokenStorage {
  /**
   * Get access token
   */
  getAccessToken(): string | null;

  /**
   * Set access token
   */
  setAccessToken(token: string): void;

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null;

  /**
   * Set refresh token
   */
  setRefreshToken(token: string): void;

  /**
   * Clear all tokens
   */
  clearTokens(): void;

  /**
   * Check if tokens exist
   */
  hasTokens(): boolean;
}
