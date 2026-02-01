/**
 * Environment Configuration Service
 * Centralized environment management
 * Following Singleton Pattern
 */

import { Injectable } from '@angular/core';
import { APP_URLS, HOSTS, PORTS, API } from '../constants/app.constants';

export type Environment = 'development' | 'staging' | 'production';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private readonly _environment: Environment;
  private readonly _isProduction: boolean;
  private readonly _isDevelopment: boolean;
  private readonly _isStaging: boolean;

  constructor() {
    // Determine environment from various sources
    this._environment = this.detectEnvironment();
    this._isProduction = this._environment === 'production';
    this._isDevelopment = this._environment === 'development';
    this._isStaging = this._environment === 'staging';
  }

  /**
   * Get current environment
   */
  get environment(): Environment {
    return this._environment;
  }

  /**
   * Check if running in production
   */
  get isProduction(): boolean {
    return this._isProduction;
  }

  /**
   * Check if running in development
   */
  get isDevelopment(): boolean {
    return this._isDevelopment;
  }

  /**
   * Check if running in staging
   */
  get isStaging(): boolean {
    return this._isStaging;
  }

  /**
   * Get application URLs based on environment
   */
  getAppUrls() {
    return APP_URLS;
  }

  /**
   * Get specific app URL
   */
  getAppUrl(appName: keyof typeof APP_URLS): string {
    return APP_URLS[appName];
  }

  /**
   * Get host configuration
   */
  getHostConfig() {
    return this._isProduction ? HOSTS.PRODUCTION : HOSTS.DEVELOPMENT;
  }

  /**
   * Get ports configuration
   */
  getPorts() {
    return PORTS;
  }

  /**
   * Build URL for specific port
   */
  buildUrl(port: number): string {
    const host = this.getHostConfig();
    return this._isDevelopment
      ? `${host.PROTOCOL}://${host.DOMAIN}:${port}`
      : `${host.PROTOCOL}://${host.DOMAIN}`;
  }

  /**
   * Detect environment from various sources
   */
  private detectEnvironment(): Environment {
    // Check hostname (browser-safe detection)
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;

      // Development detection
      if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
        return 'development';
      }

      // Staging detection
      if (hostname.includes('staging') || hostname.includes('stg')) {
        return 'staging';
      }

      // Production detection
      if (
        hostname.includes('.com') ||
        hostname.includes('.net') ||
        hostname.includes('.org')
      ) {
        return 'production';
      }
    }

    // Default to development for safety
    return 'development';
  }

  /**
   * Get API base URL based on environment
   */
  getApiBaseUrl(): string {
    // Use centralized API constant
    return API.BASE_URL;
  }

  /**
   * Check if feature flag is enabled
   * Note: For runtime feature flags, implement a proper feature flag service
   * that fetches configuration from a backend or uses localStorage
   */
  isFeatureEnabled(featureName: string): boolean {
    // In development, all features are enabled by default
    if (this._isDevelopment) {
      return true;
    }

    // Check localStorage for feature flags (browser-safe)
    if (typeof window !== 'undefined' && window.localStorage) {
      const flagKey = `feature_${featureName.toLowerCase()}`;
      const flagValue = localStorage.getItem(flagKey);
      return flagValue === 'true';
    }

    // Default to false in production
    return false;
  }

  /**
   * Get environment-specific configuration value
   * Note: For runtime configuration, use localStorage or fetch from backend
   */
  getConfig<T>(key: string, defaultValue: T): T {
    // Check localStorage for configuration (browser-safe)
    if (typeof window !== 'undefined' && window.localStorage) {
      const configValue = localStorage.getItem(`config_${key}`);
      if (configValue !== null) {
        try {
          return JSON.parse(configValue) as T;
        } catch {
          return configValue as T;
        }
      }
    }

    // Return default value
    return defaultValue;
  }
}
