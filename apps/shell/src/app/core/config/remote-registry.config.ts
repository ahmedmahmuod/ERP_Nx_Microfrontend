/**
 * Feature Registry Configuration
 *
 * Single source of truth for all feature application configurations.
 * Used for route detection, navigation, and manifest loading.
 */

export interface FeatureConfig {
  /** Unique application identifier */
  appId: string;
  /** Human-readable display name */
  displayName: string;
}

/**
 * Centralized registry of all feature applications
 */
export const REMOTE_REGISTRY: Record<string, FeatureConfig> = {
  finance: {
    appId: 'finance',
    displayName: 'Finance',
  },
  hr: {
    appId: 'hr',
    displayName: 'HR & Payroll',
  },
  srm: {
    appId: 'srm',
    displayName: 'SRM',
  },
  pm: {
    appId: 'pm',
    displayName: 'Project Management',
  },
  warehouses: {
    appId: 'warehouses',
    displayName: 'Warehouses',
  },
  auth: {
    appId: 'auth',
    displayName: 'Authentication',
  },
} as const;

/**
 * Get feature configuration by app ID
 */
export function getRemoteConfig(appId: string): FeatureConfig | undefined {
  return REMOTE_REGISTRY[appId];
}

/**
 * Get all registered feature app IDs
 */
export function getAllRemoteAppIds(): string[] {
  return Object.keys(REMOTE_REGISTRY);
}

/**
 * Check if an app ID is registered as a feature
 */
export function isRegisteredRemote(appId: string): boolean {
  return appId in REMOTE_REGISTRY;
}
