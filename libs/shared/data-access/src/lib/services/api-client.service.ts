/**
 * API Client Service
 * Typed HTTP wrapper with centralized error handling and timeout support
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { API_CONFIG } from '../config/api-config.token';
import { createApiError } from '../models/api-error.model';

export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG);

  /**
   * GET request
   */
  get<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.request<T>('GET', url, undefined, options);
  }

  /**
   * POST request
   */
  post<T>(
    url: string,
    body?: unknown,
    options?: RequestOptions,
  ): Observable<T> {
    return this.request<T>('POST', url, body, options);
  }

  /**
   * PUT request
   */
  put<T>(url: string, body?: unknown, options?: RequestOptions): Observable<T> {
    return this.request<T>('PUT', url, body, options);
  }

  /**
   * PATCH request
   */
  patch<T>(
    url: string,
    body?: unknown,
    options?: RequestOptions,
  ): Observable<T> {
    return this.request<T>('PATCH', url, body, options);
  }

  /**
   * DELETE request
   */
  delete<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.request<T>('DELETE', url, undefined, options);
  }

  /**
   * Generic request handler
   */
  private request<T>(
    method: string,
    url: string,
    body?: unknown,
    options?: RequestOptions,
  ): Observable<T> {
    let request$: Observable<T>;

    switch (method) {
      case 'GET':
        request$ = this.http.get<T>(url, options as object);
        break;
      case 'POST':
        request$ = this.http.post<T>(url, body, options as object);
        break;
      case 'PUT':
        request$ = this.http.put<T>(url, body, options as object);
        break;
      case 'PATCH':
        request$ = this.http.patch<T>(url, body, options as object);
        break;
      case 'DELETE':
        request$ = this.http.delete<T>(url, options as object);
        break;
      default:
        return throwError(
          () => new Error(`Unsupported HTTP method: ${method}`),
        );
    }

    return request$.pipe(
      timeout(this.config.timeout),
      catchError((error) => {
        // Convert timeout errors
        if (error instanceof TimeoutError) {
          return throwError(() => createApiError(error));
        }

        // Convert HTTP errors
        return throwError(() => createApiError(error));
      }),
    );
  }

  /**
   * Build full URL for a service
   */
  buildUrl(service: keyof typeof this.config.baseUrls, path: string): string {
    const baseUrl = this.config.baseUrls[service];
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  }

  /**
   * Build full URL for static assets (images, files, etc.)
   * @param service - The service hosting the asset (e.g., 'shell')
   * @param assetType - Type of asset (e.g., 'profilePictures')
   * @param filename - The asset filename
   * @returns Full URL to the asset
   */
  buildAssetUrl(
    service: keyof typeof this.config.baseUrls,
    assetType: keyof typeof this.config.assetPaths,
    filename: string,
  ): string {
    const baseUrl = this.config.baseUrls[service];
    const assetPath = this.config.assetPaths[assetType];
    // Remove '/api' suffix from base URL for assets
    const cleanBaseUrl = baseUrl.replace(/\/api$/, '');
    return `${cleanBaseUrl}${assetPath}/${filename}`;
  }
}
