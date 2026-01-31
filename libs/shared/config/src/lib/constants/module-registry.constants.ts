/**
 * Module Registry
 * Single source of truth for ERP module IDs
 * Maps module keys to backend module IDs
 */

export type ModuleKey = 'hr' | 'finance' | 'srm' | 'pm' | 'warehouses';

export interface ModuleConfig {
  readonly key: ModuleKey;
  readonly id: number;
  readonly name: string;
  readonly route: string;
}

/**
 * Module Registry - Config-driven module definitions
 * Update IDs based on actual backend values
 */
export const MODULE_REGISTRY: Record<ModuleKey, ModuleConfig> = {
  hr: {
    key: 'hr',
    id: 1,
    name: 'HR & Payroll',
    route: '/hr',
  },
  finance: {
    key: 'finance',
    id: 2,
    name: 'Finance',
    route: '/finance',
  },
  srm: {
    key: 'srm',
    id: 3,
    name: 'SRM',
    route: '/srm',
  },
  pm: {
    key: 'pm',
    id: 4,
    name: 'Project Management',
    route: '/pm',
  },
  warehouses: {
    key: 'warehouses',
    id: 5,
    name: 'Warehouses',
    route: '/warehouses',
  },
} as const;

/**
 * Get module ID by key
 */
export function getModuleId(moduleKey: ModuleKey): number {
  return MODULE_REGISTRY[moduleKey].id;
}

/**
 * Get module key by route
 */
export function getModuleKeyByRoute(route: string): ModuleKey | null {
  const entry = Object.values(MODULE_REGISTRY).find(
    (config) => route.startsWith(config.route)
  );
  return entry?.key ?? null;
}

/**
 * Get module config by key
 */
export function getModuleConfig(moduleKey: ModuleKey): ModuleConfig {
  return MODULE_REGISTRY[moduleKey];
}
