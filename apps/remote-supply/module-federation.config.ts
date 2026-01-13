import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'remoteSupply',
  exposes: {
    './Routes': 'apps/remote-supply/src/app/remote-entry/entry.routes.ts',
  },
  shared: (libraryName: string, defaultConfig: any) => {
    // Angular core packages MUST be singletons
    if (libraryName.startsWith('@angular/')) {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      };
    }

    // RxJS should also be singleton
    if (libraryName === 'rxjs') {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      };
    }

    return defaultConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
