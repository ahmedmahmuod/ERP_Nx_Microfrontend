/**
 * API Configuration Model
 * Typed configuration for API base URLs, timeouts, and feature flags
 */

export interface ApiConfig {
  /**
   * Base URLs for different backend services
   */
  readonly baseUrls: {
    readonly auth: string;
    readonly shell: string;
    readonly finance: string;
    readonly hr: string;
    readonly srm: string;
    readonly pm: string;
    readonly warehouses: string;
  };

  /**
   * HTTP timeout in milliseconds
   */
  readonly timeout: number;

  /**
   * Enable request/response logging
   */
  readonly enableLogging: boolean;

  /**
   * Enable correlation ID header
   */
  readonly enableCorrelationId: boolean;

  /**
   * Retry configuration
   */
  readonly retry: {
    readonly maxAttempts: number;
    readonly delayMs: number;
  };

  /**
   * Asset paths for static resources (images, files, etc.)
   */
  readonly assetPaths: {
    readonly profilePictures: string;
  };
}

/**
 * Default API Configuration
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  baseUrls: {
    auth: 'https://assemble-erp.com:44381/api',
    shell: 'https://assemble-erp.com:44382/api',
    finance: 'https://assemble-erp.com:44381/api',
    hr: 'https://assemble-erp.com:44381/api',
    srm: 'https://assemble-erp.com:44381/api',
    pm: 'https://assemble-erp.com:44381/api',
    warehouses: 'https://assemble-erp.com:44381/api',
  },
  timeout: 30000,
  enableLogging: false,
  enableCorrelationId: true,
  retry: {
    maxAttempts: 3,
    delayMs: 1000,
  },
  assetPaths: {
    profilePictures: '/Uploads/ProfilePictures',
  },
};

/**
 * Development API Configuration
 */
export const DEVELOPMENT_API_CONFIG: ApiConfig = {
  ...DEFAULT_API_CONFIG,
  enableLogging: true,
};
