/**
 * Remote Warehouses Module Federation Configuration
 *
 * NOTE: This file CANNOT import from @erp/shared/config because module federation
 * configs are loaded during Nx's JIT compilation phase, before workspace libraries
 * are built. All configuration must be inlined.
 */
const config = {
  name: 'remoteWarehouses',
  exposes: {
    './Routes': 'apps/remote-warehouses/src/app/remote-entry/entry.routes.ts',
    './Manifest': 'apps/remote-warehouses/src/app/remote-entry/manifest.ts',
  },
  shared: (libraryName: string, defaultConfig: any) => {
    // Angular core packages MUST be singletons
    if (libraryName.startsWith('@angular/')) {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: 'auto',
      };
    }

    // RxJS should also be singleton
    if (libraryName === 'rxjs') {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: 'auto',
      };
    }

    return defaultConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution
 * of the module federation graph.
 */
export default config;
