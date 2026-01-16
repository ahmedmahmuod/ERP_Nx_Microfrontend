import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';
import type { Configuration } from 'webpack';
import webpack from 'webpack';

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default async (webpackConfig: Configuration) => {
  const federatedConfig = await withModuleFederation(config, { dts: false });
  const mergedConfig = federatedConfig(webpackConfig);

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
