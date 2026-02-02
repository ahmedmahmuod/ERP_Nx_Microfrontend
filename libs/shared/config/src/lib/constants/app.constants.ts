/**
 * Application-wide Constants
 * Single source of truth for application configuration
 * Following DRY principle - change once, apply everywhere
 */

/**
 * Application Metadata
 */
export const APP_METADATA = {
  NAME: 'Assemble ERP',
  DESCRIPTION: 'Professional Enterprise Resource Planning System',
  VERSION: '1.0.0',
  AUTHOR: 'Assemble Team',
  COPYRIGHT: `© ${new Date().getFullYear()} Assemble ERP. All rights reserved.`,
} as const;

/**
 * Port Configuration for Microfrontends
 * Centralized port management for all applications
 */
export const PORTS = {
  SHELL: 4200,
  REMOTE_AUTH: 4201,
  REMOTE_FINANCE: 4202,
  REMOTE_HR: 4203,
  REMOTE_SRM: 4207,
  REMOTE_PM: 4205,
  REMOTE_WAREHOUSES: 4206,
  REMOTE_SUPPLY: 4204,
} as const;

/**
 * Host Configuration
 * Base URLs for different environments
 */
export const HOSTS = {
  DEVELOPMENT: {
    PROTOCOL: 'http',
    DOMAIN: 'localhost',
  },
  PRODUCTION: {
    PROTOCOL: 'https',
    DOMAIN: 'assemblestage.com', // Updated for production/stage
  },
} as const;

/**
 * Build URL helper
 */
export const buildUrl = (port: number, isDevelopment = true): string => {
  const host = isDevelopment ? HOSTS.DEVELOPMENT : HOSTS.PRODUCTION;
  return isDevelopment
    ? `${host.PROTOCOL}://${host.DOMAIN}:${port}`
    : `${host.PROTOCOL}://${host.DOMAIN}`;
};

/**
 * Application URLs
 */
export const APP_URLS = {
  SHELL: buildUrl(PORTS.SHELL),
  REMOTE_AUTH: buildUrl(PORTS.REMOTE_AUTH),
  REMOTE_FINANCE: buildUrl(PORTS.REMOTE_FINANCE),
  REMOTE_HR: buildUrl(PORTS.REMOTE_HR),
  REMOTE_SUPPLY: buildUrl(PORTS.REMOTE_SUPPLY),
} as const;

/**
 * API Configuration
 * @deprecated Use ConfigService for dynamic configuration
 */
export const API = {
  BASE_URL:
    (globalThis as any).API_BASE_URL || 'https://assemblestage:44382/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

/**
 * Storage Keys
 * Centralized local/session storage keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'erp_auth_token',
  REFRESH_TOKEN: 'erp_refresh_token',
  USER_DATA: 'erp_user_data',
  THEME: 'erp_theme',
  LANGUAGE: 'erp_language',
  SIDEBAR_STATE: 'erp_sidebar_collapsed',
  REMEMBER_ME: 'erp_remember_me',
} as const;

/**
 * Pagination Defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

/**
 * Date/Time Formats
 */
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss",
  TIME_ONLY: 'HH:mm',
} as const;

/**
 * File Upload Configuration
 */
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 10,
  MAX_SIZE_BYTES: 10 * 1024 * 1024,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
} as const;

/**
 * Toast/Notification Configuration
 */
export const TOAST_CONFIG = {
  DURATION: {
    SUCCESS: 3000,
    INFO: 4000,
    WARNING: 5000,
    ERROR: 6000,
  },
  POSITION: 'top-center',
} as const;

/**
 * Animation Durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

/**
 * Debounce/Throttle Delays (in milliseconds)
 */
export const DELAYS = {
  SEARCH_DEBOUNCE: 300,
  AUTO_SAVE: 2000,
  TOOLTIP_SHOW: 500,
  NAVIGATION_DELAY: 100,
} as const;

/**
 * Z-Index Layers
 * Centralized z-index management
 */
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
} as const;

/**
 * Breakpoints (matching Tailwind)
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
