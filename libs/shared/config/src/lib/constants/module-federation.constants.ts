/**
 * Module Federation Constants
 * Centralized configuration for all microfrontends
 * Following Single Responsibility Principle
 */

import { PORTS, buildUrl } from './app.constants';

/**
 * Remote Application Names
 * Consistent naming across the application
 */
export const REMOTE_NAMES = {
  AUTH: 'remoteAuth',
  FINANCE: 'remoteFinance',
  HR: 'remoteHr',
  SUPPLY: 'remoteSupply',
} as const;

/**
 * Remote Entry Points
 * Exposed module paths for each remote
 */
export const REMOTE_ENTRY_POINTS = {
  [REMOTE_NAMES.AUTH]: 'apps/remote-auth/src/app/remote-entry/entry.routes.ts',
  [REMOTE_NAMES.FINANCE]: 'apps/remote-finance/src/app/remote-entry/entry.routes.ts',
  [REMOTE_NAMES.HR]: 'apps/remote-hr/src/app/remote-entry/entry.routes.ts',
  [REMOTE_NAMES.SUPPLY]: 'apps/remote-supply/src/app/remote-entry/entry.routes.ts',
} as const;

/**
 * Remote Exposed Modules
 * What each remote exposes to the shell
 */
export const REMOTE_EXPOSES = {
  ROUTES: './Routes',
} as const;

/**
 * Shared Library Configuration
 * Libraries that must be shared across microfrontends
 */
export const SHARED_LIBRARIES = {
  ANGULAR_CORE: '@angular/',
  RXJS: 'rxjs',
  PRIMENG: 'primeng',
  PRIMEICONS: 'primeicons',
} as const;

/**
 * Shared Library Settings
 * Configuration for how libraries should be shared
 */
export const SHARED_LIBRARY_CONFIG = {
  SINGLETON: true,
  STRICT_VERSION: false,
  REQUIRED_VERSION: 'auto',
} as const;

/**
 * Module Federation Ports
 * Re-export for convenience
 */
export const MF_PORTS = PORTS;

/**
 * Build Remote URLs
 * Helper to generate remote URLs for different environments
 */
export const buildRemoteUrl = (remoteName: string, port: number, isDevelopment = true): string => {
  return buildUrl(port, isDevelopment);
};

/**
 * Remote URLs Configuration
 */
export const REMOTE_URLS = {
  [REMOTE_NAMES.AUTH]: buildRemoteUrl(REMOTE_NAMES.AUTH, PORTS.REMOTE_AUTH),
  [REMOTE_NAMES.FINANCE]: buildRemoteUrl(REMOTE_NAMES.FINANCE, PORTS.REMOTE_FINANCE),
  [REMOTE_NAMES.HR]: buildRemoteUrl(REMOTE_NAMES.HR, PORTS.REMOTE_HR),
  [REMOTE_NAMES.SUPPLY]: buildRemoteUrl(REMOTE_NAMES.SUPPLY, PORTS.REMOTE_SUPPLY),
} as const;

/**
 * Webpack DTS Plugin Configuration
 */
export const DTS_CONFIG = {
  ENABLED: false, // Nx already provides typing support
} as const;
