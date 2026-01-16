import { withModuleFederation } from '@nx/angular/module-federation';
import config from './module-federation.config';
import type { Configuration } from 'webpack';
import webpack from 'webpack';

export default async (webpackConfig: Configuration) => {
  const federatedConfig = await withModuleFederation(config);
  const mergedConfig = federatedConfig(webpackConfig);

  // Fix import.meta issue in Tailwind CSS by disabling it in the parser
  if (!mergedConfig.module) {
    mergedConfig.module = {};
  }

  if (!mergedConfig.module.parser) {
    mergedConfig.module.parser = {};
  }

  // Type assertion to handle the parser configuration
  const parser = mergedConfig.module.parser as Record<string, unknown>;
  parser.javascript = {
    ...(typeof parser.javascript === 'object' ? parser.javascript : {}),
    importMeta: false,
  };

  // Add DefinePlugin to inject environment variables
  if (!mergedConfig.plugins) {
    mergedConfig.plugins = [];
  }

  mergedConfig.plugins.push(
    new webpack.DefinePlugin({
      'globalThis.API_BASE_URL': JSON.stringify(process.env['API_BASE_URL'] || ''),
    })
  );

  return mergedConfig;
};
