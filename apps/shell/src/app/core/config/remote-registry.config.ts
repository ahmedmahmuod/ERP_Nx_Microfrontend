/**
 * Remote Registry Configuration
 *
 * Single source of truth for all remote application configurations.
 * Ensures consistency between routing, module federation, and manifest loading.
 */

export interface RemoteConfig {
  /** Unique application identifier */
  appId: string;
  /** Module federation remote name (must match remote's config) */
  remoteName: string;
  /** Routes expose key */
  routesKey: string;
  /** Manifest expose key */
  manifestKey: string;
  /** Human-readable display name */
  displayName: string;
}

/**
 * Centralized registry of all remote applications
 * This is the ONLY place where remote configuration should be defined
 */
export const REMOTE_REGISTRY: Record<string, RemoteConfig> = {
  finance: {
    appId: 'finance',
    remoteName: 'remoteFinance',
    routesKey: './Routes',
    manifestKey: './Manifest',
    displayName: 'Finance',
  },
  hr: {
    appId: 'hr',
    remoteName: 'remoteHr',
    routesKey: './Routes',
    manifestKey: './Manifest',
    displayName: 'HR & Payroll',
  },
  srm: {
    appId: 'srm',
    remoteName: 'remoteSrm',
    routesKey: './Routes',
    manifestKey: './Manifest',
    displayName: 'SRM',
  },
  pm: {
    appId: 'pm',
    remoteName: 'remotePm',
    routesKey: './Routes',
    manifestKey: './Manifest',
    displayName: 'Project Management',
  },
  warehouses: {
    appId: 'warehouses',
    remoteName: 'remoteWarehouses',
    routesKey: './Routes',
    manifestKey: './Manifest',
    displayName: 'Warehouses',
  },
  auth: {
    appId: 'auth',
    remoteName: 'remoteAuth',
    routesKey: './Routes',
    manifestKey: './Manifest',
    displayName: 'Authentication',
  },
} as const;

/**
 * Get remote configuration by app ID
 */
export function getRemoteConfig(appId: string): RemoteConfig | undefined {
  return REMOTE_REGISTRY[appId];
}

/**
 * Get all registered remote app IDs
 */
export function getAllRemoteAppIds(): string[] {
  return Object.keys(REMOTE_REGISTRY);
}

/**
 * Check if an app ID is registered
 */
export function isRegisteredRemote(appId: string): boolean {
  return appId in REMOTE_REGISTRY;
}
