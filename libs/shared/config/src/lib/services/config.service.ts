import { Injectable } from '@angular/core';
import { AppConfig } from '../models/config.models';
import { WORKSPACE_CONFIG } from '../config/workspace-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: AppConfig | null = null;

  /**
   * Check if configuration is loaded
   */
  get isLoaded(): boolean {
    return !!this.config;
  }

  /**
   * Initialize configuration from the centralized TypeScript config
   * @param appCode The key for the specific solution in the master config
   */
  async load(appCode: string): Promise<void> {
    try {
      const data = WORKSPACE_CONFIG;

      if (!data || !data.globals || !data.solutions[appCode]) {
        throw new Error(
          `Config validation failed: Solution "${appCode}" not found in workspace-config.ts`,
        );
      }

      const { globals, solutions } = data;
      const appSolution = solutions[appCode];

      // Build API map based on solution requirements
      const api: any = {};
      const domain = globals.domain;

      appSolution.services.forEach((service: keyof AppConfig['api']) => {
        const port =
          globals.servicePorts[service] || globals.servicePorts['gateway'];
        api[service] = `https://${domain}:${port}/api`;
      });

      this.config = {
        envName: globals.envName,
        domain: domain,
        baseUrl: `https://${domain}`,
        api: api,
        app: {
          name: appSolution.name,
          code: appCode,
          moduleId: appSolution.moduleId,
        },
        constants: {
          enableCorrelationId: true,
          version: '1.0.0',
        },
      };

      console.log(
        `[ConfigService] Configuration initialized for ${this.config?.app.name} (${this.config?.envName}) from centralized TypeScript config`,
      );

      return Promise.resolve();
    } catch (error) {
      console.error(
        '[ConfigService] Failed to initialize configuration:',
        error,
      );
      throw error;
    }
  }

  /**
   * Get the full configuration
   * @throws Error if config is not loaded
   */
  get(): AppConfig {
    if (!this.config) {
      throw new Error(
        'ConfigService: Configuration not loaded. Call load() first.',
      );
    }
    return this.config;
  }

  /**
   * Get API base URL for a specific key
   */
  getApiBase(key: keyof AppConfig['api'] = 'gateway'): string {
    const config = this.get();
    return (
      (config.api as Record<string, string | undefined>)[key] ||
      config.api.gateway
    );
  }

  /**
   * Get application domain
   */
  getDomain(): string {
    return this.get().domain;
  }

  /**
   * Get application name
   */
  getAppName(): string {
    return this.get().app.name;
  }

  /**
   * Get module ID for permissions
   */
  getModuleId(): number {
    return this.get().app.moduleId;
  }

  /**
   * Get environment name
   */
  getEnvName(): string {
    return this.get().envName;
  }
}
