/**
 * Accessibility Service
 * 
 * Manages accessibility features including focus management and reduced motion detection.
 * Follows WCAG 2.1 AA guidelines.
 * 
 * @example
 * ```typescript
 * export class MyComponent {
 *   private a11yService = inject(AccessibilityService);
 *   
 *   prefersReducedMotion = this.a11yService.prefersReducedMotion;
 *   
 *   focusElement(selector: string) {
 *     this.a11yService.focusElement(selector);
 *   }
 *   
 *   trapFocus(container: HTMLElement) {
 *     const cleanup = this.a11yService.trapFocus(container);
 *     // Call cleanup() when done
 *   }
 * }
 * ```
 */

import { Injectable, signal, computed, PLATFORM_ID, inject, DestroyRef, Renderer2, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly renderer: Renderer2;
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  /**
   * Prefers reduced motion signal
   */
  private readonly _prefersReducedMotion = signal<boolean>(this.getReducedMotionPreference());
  
  /**
   * Prefers high contrast signal
   */
  private readonly _prefersHighContrast = signal<boolean>(this.getHighContrastPreference());
  
  /**
   * Public readonly prefers reduced motion
   */
  readonly prefersReducedMotion = this._prefersReducedMotion.asReadonly();
  
  /**
   * Public readonly prefers high contrast
   */
  readonly prefersHighContrast = this._prefersHighContrast.asReadonly();
  
  /**
   * Computed: Should use animations
   */
  readonly shouldAnimate = computed(() => !this._prefersReducedMotion());
  
  /**
   * Focusable elements selector
   */
  private readonly focusableSelector = 
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  
  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    
    if (this.isBrowser) {
      this.setupMediaQueryListeners();
    }
  }
  
  /**
   * Focus an element by selector or element reference
   */
  focusElement(target: string | HTMLElement, options?: FocusOptions): boolean {
    if (!this.isBrowser) return false;
    
    try {
      const element = typeof target === 'string' 
        ? document.querySelector<HTMLElement>(target)
        : target;
      
      if (element && this.isFocusable(element)) {
        element.focus(options);
        return true;
      }
    } catch (error) {
      console.warn('Failed to focus element:', error);
    }
    
    return false;
  }
  
  /**
   * Focus the first focusable element in a container
   */
  focusFirst(container: HTMLElement): boolean {
    const focusable = this.getFocusableElements(container);
    if (focusable.length > 0) {
      return this.focusElement(focusable[0]);
    }
    return false;
  }
  
  /**
   * Focus the last focusable element in a container
   */
  focusLast(container: HTMLElement): boolean {
    const focusable = this.getFocusableElements(container);
    if (focusable.length > 0) {
      return this.focusElement(focusable[focusable.length - 1]);
    }
    return false;
  }
  
  /**
   * Trap focus within a container
   * Returns cleanup function
   */
  trapFocus(container: HTMLElement): () => void {
    if (!this.isBrowser) {
      return () => { /* no-op */ };
    }
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      
      const focusable = this.getFocusableElements(container);
      if (focusable.length === 0) return;
      
      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];
      
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }
  
  /**
   * Get all focusable elements within a container
   */
  getFocusableElements(container: HTMLElement): HTMLElement[] {
    if (!this.isBrowser) return [];
    
    const elements = Array.from(
      container.querySelectorAll<HTMLElement>(this.focusableSelector)
    );
    
    return elements.filter(el => this.isFocusable(el));
  }
  
  /**
   * Check if an element is focusable
   */
  isFocusable(element: HTMLElement): boolean {
    if (!this.isBrowser) return false;
    
    // Check if element is visible
    if (element.offsetParent === null) return false;
    
    // Check if element is disabled
    if (element.hasAttribute('disabled')) return false;
    
    // Check if element has tabindex="-1"
    const tabindex = element.getAttribute('tabindex');
    if (tabindex === '-1') return false;
    
    return true;
  }
  
  /**
   * Announce message to screen readers
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.isBrowser) return;
    
    const announcer = this.getOrCreateAnnouncer(priority);
    announcer.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  }
  
  /**
   * Set ARIA attribute on element
   */
  setAriaAttribute(element: HTMLElement, attribute: string, value: string | boolean | null): void {
    if (!this.isBrowser) return;
    
    const ariaAttr = attribute.startsWith('aria-') ? attribute : `aria-${attribute}`;
    
    if (value === null) {
      this.renderer.removeAttribute(element, ariaAttr);
    } else {
      this.renderer.setAttribute(element, ariaAttr, String(value));
    }
  }
  
  /**
   * Add skip link to page
   */
  addSkipLink(targetId: string, label = 'Skip to main content'): HTMLAnchorElement | null {
    if (!this.isBrowser) return null;
    
    const skipLink = this.renderer.createElement('a');
    this.renderer.setAttribute(skipLink, 'href', `#${targetId}`);
    this.renderer.setAttribute(skipLink, 'class', 'skip-link');
    this.renderer.setProperty(skipLink, 'textContent', label);
    
    const body = document.body;
    this.renderer.insertBefore(body, skipLink, body.firstChild);
    
    return skipLink;
  }
  
  /**
   * Get or create live region announcer
   */
  private getOrCreateAnnouncer(priority: 'polite' | 'assertive'): HTMLElement {
    const id = `a11y-announcer-${priority}`;
    let announcer = document.getElementById(id);
    
    if (!announcer) {
      announcer = this.renderer.createElement('div');
      this.renderer.setAttribute(announcer, 'id', id);
      this.renderer.setAttribute(announcer, 'role', 'status');
      this.renderer.setAttribute(announcer, 'aria-live', priority);
      this.renderer.setAttribute(announcer, 'aria-atomic', 'true');
      this.renderer.setStyle(announcer, 'position', 'absolute');
      this.renderer.setStyle(announcer, 'left', '-10000px');
      this.renderer.setStyle(announcer, 'width', '1px');
      this.renderer.setStyle(announcer, 'height', '1px');
      this.renderer.setStyle(announcer, 'overflow', 'hidden');
      
      this.renderer.appendChild(document.body, announcer);
    }
    
    return announcer as HTMLElement;
  }
  
  /**
   * Get reduced motion preference
   */
  private getReducedMotionPreference(): boolean {
    if (!this.isBrowser) return false;
    
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  /**
   * Get high contrast preference
   */
  private getHighContrastPreference(): boolean {
    if (!this.isBrowser) return false;
    
    return window.matchMedia('(prefers-contrast: high)').matches;
  }
  
  /**
   * Setup media query listeners
   */
  private setupMediaQueryListeners(): void {
    // Reduced motion listener
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      this._prefersReducedMotion.set(e.matches);
    };
    
    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    } else {
      reducedMotionQuery.addListener(handleReducedMotionChange);
    }
    
    // High contrast listener
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      this._prefersHighContrast.set(e.matches);
    };
    
    if (highContrastQuery.addEventListener) {
      highContrastQuery.addEventListener('change', handleHighContrastChange);
    } else {
      highContrastQuery.addListener(handleHighContrastChange);
    }
  }
}
