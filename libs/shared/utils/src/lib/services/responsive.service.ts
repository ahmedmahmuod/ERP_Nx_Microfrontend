/**
 * Responsive Service
 * Manages responsive breakpoints and viewport detection
 * Uses modern Angular patterns: signals, inject()
 */

import { Injectable, signal, computed, PLATFORM_ID, inject, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface BreakpointConfig {
  name: Breakpoint;
  minWidth: number;
  maxWidth?: number;
}

/**
 * Responsive Service
 * Single Responsibility: Viewport and breakpoint management
 */
@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  /**
   * Breakpoint configuration matching Tailwind
   */
  private readonly breakpoints: BreakpointConfig[] = [
    { name: 'xs', minWidth: 0, maxWidth: 639 },
    { name: 'sm', minWidth: 640, maxWidth: 767 },
    { name: 'md', minWidth: 768, maxWidth: 1023 },
    { name: 'lg', minWidth: 1024, maxWidth: 1279 },
    { name: 'xl', minWidth: 1280, maxWidth: 1535 },
    { name: '2xl', minWidth: 1536 }
  ];
  
  /**
   * Current viewport width signal
   */
  private readonly viewportWidth = signal<number>(this.getViewportWidth());
  
  /**
   * Current viewport height signal
   */
  private readonly viewportHeight = signal<number>(this.getViewportHeight());
  
  /**
   * Current breakpoint signal
   */
  readonly currentBreakpoint = computed(() => this.calculateBreakpoint(this.viewportWidth()));
  
  /**
   * Breakpoint checks
   */
  readonly isXs = computed(() => this.currentBreakpoint() === 'xs');
  readonly isSm = computed(() => this.currentBreakpoint() === 'sm');
  readonly isMd = computed(() => this.currentBreakpoint() === 'md');
  readonly isLg = computed(() => this.currentBreakpoint() === 'lg');
  readonly isXl = computed(() => this.currentBreakpoint() === 'xl');
  readonly is2Xl = computed(() => this.currentBreakpoint() === '2xl');
  
  /**
   * Device type checks
   */
  readonly isMobile = computed(() => {
    const bp = this.currentBreakpoint();
    return bp === 'xs' || bp === 'sm';
  });
  
  readonly isTablet = computed(() => this.currentBreakpoint() === 'md');
  
  readonly isDesktop = computed(() => {
    const bp = this.currentBreakpoint();
    return bp === 'lg' || bp === 'xl' || bp === '2xl';
  });
  
  /**
   * Orientation
   */
  readonly isPortrait = computed(() => this.viewportHeight() > this.viewportWidth());
  readonly isLandscape = computed(() => this.viewportWidth() >= this.viewportHeight());
  
  /**
   * Public readonly signals
   */
  readonly width = this.viewportWidth.asReadonly();
  readonly height = this.viewportHeight.asReadonly();
  
  constructor() {
    if (this.isBrowser) {
      this.listenToResize();
    }
  }
  
  /**
   * Check if current breakpoint is at least the specified one
   */
  isBreakpointUp(breakpoint: Breakpoint): boolean {
    const current = this.currentBreakpoint();
    const currentIndex = this.breakpoints.findIndex(bp => bp.name === current);
    const targetIndex = this.breakpoints.findIndex(bp => bp.name === breakpoint);
    return currentIndex >= targetIndex;
  }
  
  /**
   * Check if current breakpoint is at most the specified one
   */
  isBreakpointDown(breakpoint: Breakpoint): boolean {
    const current = this.currentBreakpoint();
    const currentIndex = this.breakpoints.findIndex(bp => bp.name === current);
    const targetIndex = this.breakpoints.findIndex(bp => bp.name === breakpoint);
    return currentIndex <= targetIndex;
  }
  
  /**
   * Get viewport width
   */
  private getViewportWidth(): number {
    if (!this.isBrowser) {
      return 1024; // Default for SSR
    }
    return window.innerWidth;
  }
  
  /**
   * Get viewport height
   */
  private getViewportHeight(): number {
    if (!this.isBrowser) {
      return 768; // Default for SSR
    }
    return window.innerHeight;
  }
  
  /**
   * Calculate breakpoint from width
   */
  private calculateBreakpoint(width: number): Breakpoint {
    for (const bp of this.breakpoints) {
      if (width >= bp.minWidth && (bp.maxWidth === undefined || width <= bp.maxWidth)) {
        return bp.name;
      }
    }
    return 'xs';
  }
  
  /**
   * Listen to window resize events
   */
  private listenToResize(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(150),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.viewportWidth.set(this.getViewportWidth());
        this.viewportHeight.set(this.getViewportHeight());
      });
  }
}
