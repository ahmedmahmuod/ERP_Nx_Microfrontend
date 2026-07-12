import type { Configuration } from 'webpack';
import * as webpack from 'webpack';

export default async (webpackConfig: Configuration): Promise<Configuration> => {
  // Fix import.meta issue in Tailwind CSS by disabling it in the parser
  if (!webpackConfig.module) {
    webpackConfig.module = {};
  }

  if (!webpackConfig.module.parser) {
    webpackConfig.module.parser = {};
  }

  // Type assertion to handle the parser configuration
  const parser = webpackConfig.module.parser as Record<string, unknown>;
  parser.javascript = {
    ...(typeof parser.javascript === 'object' ? parser.javascript : {}),
    importMeta: false,
  };

  // Add DefinePlugin to inject environment variables
  if (!webpackConfig.plugins) {
    webpackConfig.plugins = [];
  }

  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'globalThis.API_BASE_URL': JSON.stringify(process.env['API_BASE_URL'] || ''),
    })
  );

  return webpackConfig;
};
