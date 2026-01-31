/**
 * LocalStorage Token Storage Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { LocalStorageTokenStorage } from './local-storage-token-storage.service';

describe('LocalStorageTokenStorage', () => {
  let storage: LocalStorageTokenStorage;

  beforeEach(() => {
    storage = new LocalStorageTokenStorage();
    localStorage.clear();
  });

  it('should store and retrieve access token', () => {
    storage.setAccessToken('test-access-token');
    expect(storage.getAccessToken()).toBe('test-access-token');
  });

  it('should store and retrieve refresh token', () => {
    storage.setRefreshToken('test-refresh-token');
    expect(storage.getRefreshToken()).toBe('test-refresh-token');
  });

  it('should clear all tokens', () => {
    storage.setAccessToken('test-access-token');
    storage.setRefreshToken('test-refresh-token');

    storage.clearTokens();

    expect(storage.getAccessToken()).toBeNull();
    expect(storage.getRefreshToken()).toBeNull();
  });

  it('should check if tokens exist', () => {
    expect(storage.hasTokens()).toBe(false);

    storage.setAccessToken('test-token');
    expect(storage.hasTokens()).toBe(true);
  });

  it('should return null when no token exists', () => {
    expect(storage.getAccessToken()).toBeNull();
    expect(storage.getRefreshToken()).toBeNull();
  });
});
