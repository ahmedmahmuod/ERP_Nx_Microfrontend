/**
 * Module Federation Configuration Factory
 * Factory Pattern implementation for creating consistent MF configs
 * Following DRY and Factory Design Pattern principles
 */

import { ModuleFederationConfig } from '@nx/module-federation';
import {
  SHARED_LIBRARIES,
  SHARED_LIBRARY_CONFIG,
} from '../constants/module-federation.constants';

/**
 * Shared library configuration function
 * Applies singleton pattern to Angular and RxJS libraries
 */
export const createSharedLibraryConfig = () => {
  return (libraryName: string, defaultConfig: any) => {
    // Angular core packages MUST be singletons
    if (libraryName.startsWith(SHARED_LIBRARIES.ANGULAR_CORE)) {
      return {
        ...defaultConfig,
        singleton: SHARED_LIBRARY_CONFIG.SINGLETON,
        strictVersion: SHARED_LIBRARY_CONFIG.STRICT_VERSION,
        requiredVersion: SHARED_LIBRARY_CONFIG.REQUIRED_VERSION,
      };
    }

    // RxJS should also be singleton
    if (libraryName === SHARED_LIBRARIES.RXJS) {
      return {
        ...defaultConfig,
        singleton: SHARED_LIBRARY_CONFIG.SINGLETON,
        strictVersion: SHARED_LIBRARY_CONFIG.STRICT_VERSION,
        requiredVersion: SHARED_LIBRARY_CONFIG.REQUIRED_VERSION,
      };
    }

    return defaultConfig;
  };
};

/**
 * Create Remote Module Federation Config
 * Factory function for creating remote application configs
 */
export interface RemoteConfigOptions {
  name: string;
  exposes: Record<string, string>;
}

export const createRemoteConfig = (
  options: RemoteConfigOptions
): ModuleFederationConfig => {
  return {
    name: options.name,
    exposes: options.exposes,
    shared: createSharedLibraryConfig(),
  };
};

/**
 * Create Shell Module Federation Config
 * Factory function for creating shell/host application config
 */
export interface ShellConfigOptions {
  name: string;
  remotes: string[];
}

export const createShellConfig = (options: ShellConfigOptions) => {
  return {
    name: options.name,
    remotes: options.remotes,
    shared: createSharedLibraryConfig(),
  };
};

/**
 * Common Module Federation Comments
 * Reusable documentation strings
 */
export const MF_COMMENTS = {
  NX_REQUIREMENT:
    'Nx requires a default export of the config to allow correct resolution of the module federation graph.',
  DTS_DISABLED:
    'DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation',
  DTS_INFO: 'The DTS Plugin can be enabled by setting dts: true',
  DTS_DOCS: 'Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html',
} as const;
