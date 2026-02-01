/**
 * Module Registry
 * Single source of truth for ERP module IDs
 * Maps module keys to backend module IDs
 */

export type ModuleKey =
  | 'shell'
  | 'hr'
  | 'finance'
  | 'srm'
  | 'pm'
  | 'warehouses';

export interface ModuleConfig {
  readonly key: ModuleKey;
  readonly id: number;
  readonly name: string;
  readonly route: string;
}

/**
 * Module Registry - Config-driven module definitions
 * IDs match backend module IDs
 */
export const MODULE_REGISTRY: Record<ModuleKey, ModuleConfig> = {
  shell: {
    key: 'shell',
    id: 10,
    name: 'Shell',
    route: '/',
  },
  hr: {
    key: 'hr',
    id: 12,
    name: 'HR & Payroll',
    route: '/hr',
  },
  finance: {
    key: 'finance',
    id: 8,
    name: 'Finance',
    route: '/finance',
  },
  srm: {
    key: 'srm',
    id: 7,
    name: 'SRM',
    route: '/srm',
  },
  pm: {
    key: 'pm',
    id: 5,
    name: 'Project Management',
    route: '/pm',
  },
  warehouses: {
    key: 'warehouses',
    id: 9,
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
 * Dashboard and shell-only routes return null (no module context)
 */
export function getModuleKeyByRoute(route: string): ModuleKey | null {
  // Dashboard and root routes don't belong to any specific module
  if (route === '/dashboard' || route === '/' || route === '') {
    return null;
  }

  // Find module by route prefix (excluding shell)
  const entry = Object.values(MODULE_REGISTRY)
    .filter((config) => config.key !== 'shell')
    .find((config) => route.startsWith(config.route));

  return entry?.key ?? null;
}

/**
 * Get module config by key
 */
export function getModuleConfig(moduleKey: ModuleKey): ModuleConfig {
  return MODULE_REGISTRY[moduleKey];
}
