/**
 * Theme Constants
 * Centralized theme configuration
 * Matching Tailwind CSS design tokens
 */

/**
 * Color Palette
 * Primary brand colors
 */
export const COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main primary
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  SECONDARY: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7', // Main secondary
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  SUCCESS: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main success
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  WARNING: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Main warning
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  DANGER: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Main danger
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  INFO: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4', // Main info
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },
  NEUTRAL: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
} as const;

/**
 * Theme Modes
 */
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

/**
 * Default Theme
 */
export const DEFAULT_THEME = THEME_MODES.LIGHT;

/**
 * Spacing Scale (rem)
 */
export const SPACING = {
  XS: '0.25rem', // 4px
  SM: '0.5rem', // 8px
  MD: '1rem', // 16px
  LG: '1.5rem', // 24px
  XL: '2rem', // 32px
  '2XL': '3rem', // 48px
  '3XL': '4rem', // 64px
} as const;

/**
 * Border Radius
 */
export const BORDER_RADIUS = {
  NONE: '0',
  SM: '0.125rem', // 2px
  DEFAULT: '0.25rem', // 4px
  MD: '0.375rem', // 6px
  LG: '0.5rem', // 8px
  XL: '0.75rem', // 12px
  '2XL': '1rem', // 16px
  '3XL': '1.5rem', // 24px
  FULL: '9999px',
} as const;

/**
 * Font Families
 */
export const FONT_FAMILIES = {
  SANS: [
    'Inter',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(', '),
  MONO: [
    '"Fira Code"',
    '"JetBrains Mono"',
    'Menlo',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace',
  ].join(', '),
} as const;

/**
 * Font Sizes
 */
export const FONT_SIZES = {
  XS: '0.75rem', // 12px
  SM: '0.875rem', // 14px
  BASE: '1rem', // 16px
  LG: '1.125rem', // 18px
  XL: '1.25rem', // 20px
  '2XL': '1.5rem', // 24px
  '3XL': '1.875rem', // 30px
  '4XL': '2.25rem', // 36px
  '5XL': '3rem', // 48px
} as const;

/**
 * Font Weights
 */
export const FONT_WEIGHTS = {
  LIGHT: 300,
  NORMAL: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
  EXTRABOLD: 800,
} as const;

/**
 * Shadows
 */
export const SHADOWS = {
  SM: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  MD: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  LG: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  XL: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2XL': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  INNER: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  NONE: 'none',
} as const;

/**
 * Transitions
 */
export const TRANSITIONS = {
  FAST: 'all 0.15s ease',
  BASE: 'all 0.3s ease',
  SLOW: 'all 0.5s ease',
  COLORS: 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
} as const;

/**
 * Layout Dimensions
 */
export const LAYOUT = {
  HEADER_HEIGHT: '5rem', // 80px
  SIDEBAR_WIDTH: '16rem', // 256px
  SIDEBAR_COLLAPSED_WIDTH: '4rem', // 64px
  FOOTER_HEIGHT: '4rem', // 64px
  CONTENT_MAX_WIDTH: '1920px',
} as const;

/**
 * Icon Sizes
 */
export const ICON_SIZES = {
  XS: '0.75rem', // 12px
  SM: '1rem', // 16px
  BASE: '1.25rem', // 20px
  LG: '1.5rem', // 24px
  XL: '2rem', // 32px
  '2XL': '2.5rem', // 40px
} as const;
