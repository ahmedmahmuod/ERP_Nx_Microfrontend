/**
 * Route Context Service
 *
 * Centralized service for detecting the current route context.
 * Determines if the user is in a remote application area or shell-only pages.
 *
 * Features:
 * - Signal-based reactive state
 * - Clean route detection logic
 * - Follows SOLID principles
 */

import { Injectable, inject, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Remote module route prefixes
 * These are the first segments of URLs that belong to remote applications
 */
const REMOTE_ROUTE_PREFIXES = ['hr', 'finance', 'srm', 'pm', 'warehouses'] as const;

@Injectable({
  providedIn: 'root',
})
export class RouteContextService {
  private readonly router = inject(Router);

  /**
   * Current URL as a signal
   */
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ),
    { initialValue: new NavigationEnd(0, this.router.url, this.router.url) }
  );

  /**
   * Computed signal: Is the user currently in a remote application area?
   */
  readonly isInRemoteArea = computed(() => {
    const url = this.currentUrl()?.urlAfterRedirects || this.router.url;
    return this.detectRemoteArea(url);
  });

  /**
   * Computed signal: Is the user currently in a shell-only page?
   */
  readonly isInShellArea = computed(() => !this.isInRemoteArea());

  /**
   * Detect if a URL belongs to a remote application area
   *
   * @param url - The URL to check
   * @returns true if the URL belongs to a remote area, false otherwise
   */
  private detectRemoteArea(url: string): boolean {
    // Remove query params and fragments
    const cleanUrl = url.split('?')[0].split('#')[0];

    // Extract first segment after leading slash
    const segments = cleanUrl.split('/').filter(Boolean);
    const firstSegment = segments[0];

    if (!firstSegment) {
      return false;
    }

    // Check if first segment matches any remote route prefix
    return REMOTE_ROUTE_PREFIXES.some(prefix => firstSegment === prefix);
  }

  /**
   * Get the home route (dashboard)
   */
  getHomeRoute(): string {
    return '/dashboard';
  }

  /**
   * Navigate to home
   */
  navigateToHome(): void {
    this.router.navigate([this.getHomeRoute()]);
  }
}
