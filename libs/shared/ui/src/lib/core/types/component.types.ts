/**
 * Core type definitions for the UI component library
 * Following SOLID principles and TypeScript best practices
 */

/**
 * Component size variants
 * Used across all interactive components for consistency
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Semantic color variants for components
 * Aligned with design system tokens
 */
export type ComponentVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info' 
  | 'neutral';

/**
 * Component state for visual feedback
 */
export type ComponentState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';

/**
 * Theme modes supported by the design system
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Accessibility roles for components
 */
export type AriaRole = 
  | 'button' 
  | 'link' 
  | 'checkbox' 
  | 'radio' 
  | 'switch' 
  | 'tab' 
  | 'menuitem'
  | 'option';

/**
 * Base interface for all interactive components
 * Ensures consistent API across the component library
 */
export interface InteractiveComponent {
  readonly disabled: boolean;
  readonly ariaLabel?: string;
  readonly ariaDescribedBy?: string;
}

/**
 * Base interface for components with loading states
 */
export interface LoadableComponent {
  readonly loading: boolean;
}

/**
 * Base interface for components with size variants
 */
export interface SizableComponent {
  readonly size: ComponentSize;
}

/**
 * Base interface for components with color variants
 */
export interface VariantComponent {
  readonly variant: ComponentVariant;
}

/**
 * Configuration for component animations
 */
export interface AnimationConfig {
  readonly duration: number;
  readonly easing: string;
  readonly delay?: number;
}

/**
 * Type guard to check if a component is interactive
 */
export function isInteractiveComponent(component: unknown): component is InteractiveComponent {
  return (
    typeof component === 'object' &&
    component !== null &&
    'disabled' in component
  );
}

/**
 * Type guard to check if a component is loadable
 */
export function isLoadableComponent(component: unknown): component is LoadableComponent {
  return (
    typeof component === 'object' &&
    component !== null &&
    'loading' in component
  );
}
