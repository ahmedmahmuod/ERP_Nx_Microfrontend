/**
 * Auth Token Interceptor Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { authTokenInterceptor } from './auth-token.interceptor';
import { TOKEN_STORAGE } from '../storage/token-storage.token';
import { TokenStorage } from '../storage/token-storage.interface';

describe('authTokenInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let mockTokenStorage: TokenStorage;

  beforeEach(() => {
    mockTokenStorage = {
      getAccessToken: vi.fn().mockReturnValue('test-token'),
      setAccessToken: vi.fn(),
      getRefreshToken: vi.fn(),
      setRefreshToken: vi.fn(),
      clearTokens: vi.fn(),
      hasTokens: vi.fn().mockReturnValue(true),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authTokenInterceptor])),
        provideHttpClientTesting(),
        { provide: TOKEN_STORAGE, useValue: mockTokenStorage },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should attach Authorization header with Bearer token', () => {
    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');

    req.flush({});
  });

  it('should not attach token to login endpoint', () => {
    httpClient.post('/api/Account/UserLogin', {}).subscribe();

    const req = httpMock.expectOne('/api/Account/UserLogin');
    expect(req.request.headers.has('Authorization')).toBe(false);

    req.flush({});
  });

  it('should not attach token when no token exists', () => {
    mockTokenStorage.getAccessToken = vi.fn().mockReturnValue(null);

    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBe(false);

    req.flush({});
  });
});
