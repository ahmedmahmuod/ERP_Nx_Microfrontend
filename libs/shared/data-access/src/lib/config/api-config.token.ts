/**
 * API Configuration Injection Token
 * Provides typed configuration throughout the application
 */

import { InjectionToken } from '@angular/core';
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config.model';

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_API_CONFIG,
});
