/**
 * Responsive Service
 * 
 * Manages responsive breakpoints with signal-based state.
 * Aligned with Tailwind CSS breakpoints.
 * 
 * @example
 * ```typescript
 * export class MyComponent {
 *   private responsiveService = inject(ResponsiveService);
 *   
 *   isMobile = this.responsiveService.isMobile;
 *   isTablet = this.responsiveService.isTablet;
 *   isDesktop = this.responsiveService.isDesktop;
 *   currentBreakpoint = this.responsiveService.currentBreakpoint;
 *   
 *   constructor() {
 *     effect(() => {
 *       if (this.isMobile()) {
 *         console.log('Mobile view');
 *       }
 *     });
 *   }
 * }
 * ```
 */

import { Injectable, signal, computed, PLATFORM_ID, inject, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface BreakpointConfig {
  name: Breakpoint;
  minWidth: number;
  maxWidth?: number;
}

const BREAKPOINTS: BreakpointConfig[] = [
  { name: 'xs', minWidth: 0, maxWidth: 639 },
  { name: 'sm', minWidth: 640, maxWidth: 767 },
  { name: 'md', minWidth: 768, maxWidth: 1023 },
  { name: 'lg', minWidth: 1024, maxWidth: 1279 },
  { name: 'xl', minWidth: 1280, maxWidth: 1535 },
  { name: '2xl', minWidth: 1536 }
];

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  /**
   * Current window width signal
   */
  private readonly _windowWidth = signal<number>(this.getInitialWidth());
  
  /**
   * Current window height signal
   */
  private readonly _windowHeight = signal<number>(this.getInitialHeight());
  
  /**
   * Public readonly window width
   */
  readonly windowWidth = this._windowWidth.asReadonly();
  
  /**
   * Public readonly window height
   */
  readonly windowHeight = this._windowHeight.asReadonly();
  
  /**
   * Computed: Current breakpoint
   */
  readonly currentBreakpoint = computed<Breakpoint>(() => {
    const width = this._windowWidth();
    const breakpoint = BREAKPOINTS.find(bp => {
      if (bp.maxWidth) {
        return width >= bp.minWidth && width <= bp.maxWidth;
      }
      return width >= bp.minWidth;
    });
    return breakpoint?.name || 'xs';
  });
  
  /**
   * Computed: Is extra small (< 640px)
   */
  readonly isXs = computed(() => this.currentBreakpoint() === 'xs');
  
  /**
   * Computed: Is small (640px - 767px)
   */
  readonly isSm = computed(() => this.currentBreakpoint() === 'sm');
  
  /**
   * Computed: Is medium (768px - 1023px)
   */
  readonly isMd = computed(() => this.currentBreakpoint() === 'md');
  
  /**
   * Computed: Is large (1024px - 1279px)
   */
  readonly isLg = computed(() => this.currentBreakpoint() === 'lg');
  
  /**
   * Computed: Is extra large (1280px - 1535px)
   */
  readonly isXl = computed(() => this.currentBreakpoint() === 'xl');
  
  /**
   * Computed: Is 2x extra large (>= 1536px)
   */
  readonly is2xl = computed(() => this.currentBreakpoint() === '2xl');
  
  /**
   * Computed: Is mobile (xs or sm)
   */
  readonly isMobile = computed(() => {
    const bp = this.currentBreakpoint();
    return bp === 'xs' || bp === 'sm';
  });
  
  /**
   * Computed: Is tablet (md)
   */
  readonly isTablet = computed(() => this.currentBreakpoint() === 'md');
  
  /**
   * Computed: Is desktop (lg, xl, or 2xl)
   */
  readonly isDesktop = computed(() => {
    const bp = this.currentBreakpoint();
    return bp === 'lg' || bp === 'xl' || bp === '2xl';
  });
  
  /**
   * Computed: Is touch device
   */
  readonly isTouchDevice = computed(() => {
    if (!this.isBrowser) return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  });
  
  /**
   * Computed: Orientation
   */
  readonly orientation = computed<'portrait' | 'landscape'>(() => {
    const width = this._windowWidth();
    const height = this._windowHeight();
    return width > height ? 'landscape' : 'portrait';
  });
  
  /**
   * Computed: Is portrait
   */
  readonly isPortrait = computed(() => this.orientation() === 'portrait');
  
  /**
   * Computed: Is landscape
   */
  readonly isLandscape = computed(() => this.orientation() === 'landscape');
  
  constructor() {
    if (this.isBrowser) {
      this.setupResizeListener();
    }
  }
  
  /**
   * Check if current breakpoint matches
   */
  isBreakpoint(breakpoint: Breakpoint): boolean {
    return this.currentBreakpoint() === breakpoint;
  }
  
  /**
   * Check if current breakpoint is at least the given breakpoint
   */
  isBreakpointUp(breakpoint: Breakpoint): boolean {
    const breakpointIndex = BREAKPOINTS.findIndex(bp => bp.name === breakpoint);
    const currentIndex = BREAKPOINTS.findIndex(bp => bp.name === this.currentBreakpoint());
    return currentIndex >= breakpointIndex;
  }
  
  /**
   * Check if current breakpoint is at most the given breakpoint
   */
  isBreakpointDown(breakpoint: Breakpoint): boolean {
    const breakpointIndex = BREAKPOINTS.findIndex(bp => bp.name === breakpoint);
    const currentIndex = BREAKPOINTS.findIndex(bp => bp.name === this.currentBreakpoint());
    return currentIndex <= breakpointIndex;
  }
  
  /**
   * Get initial window width
   */
  private getInitialWidth(): number {
    if (!this.isBrowser) {
      return 1024; // Default SSR width
    }
    return window.innerWidth;
  }
  
  /**
   * Get initial window height
   */
  private getInitialHeight(): number {
    if (!this.isBrowser) {
      return 768; // Default SSR height
    }
    return window.innerHeight;
  }
  
  /**
   * Setup resize listener
   */
  private setupResizeListener(): void {
    let resizeTimeout: ReturnType<typeof setTimeout>;
    
    const handleResize = () => {
      // Debounce resize events
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this._windowWidth.set(window.innerWidth);
        this._windowHeight.set(window.innerHeight);
      }, 150);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    });
  }
}
