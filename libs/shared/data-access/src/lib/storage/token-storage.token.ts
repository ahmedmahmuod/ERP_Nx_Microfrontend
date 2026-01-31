/**
 * Token Storage Injection Token
 * Allows swapping storage implementations
 */

import { InjectionToken } from '@angular/core';
import { TokenStorage } from './token-storage.interface';

export const TOKEN_STORAGE = new InjectionToken<TokenStorage>('TOKEN_STORAGE');
