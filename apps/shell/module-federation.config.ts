const config = {
  name: 'shell',
  remotes: ['remoteAuth', 'remoteFinance', 'remoteHr', 'remoteSupply'],
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

export default config;
