const config = {
  name: 'shell',
  remotes: [
    'remoteAuth',
    'remoteFinance',
    'remoteHr',
    'remoteSrm',
    'remotePm',
    'remoteWarehouses',
  ],
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

export default config;
