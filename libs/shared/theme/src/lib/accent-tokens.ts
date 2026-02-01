/**
 * Accent Tokens for Remote Applications
 *
 * Defines accent color tokens for each remote application.
 * These tokens are used to brand the sidebar and UI elements
 * when navigating between different remote applications.
 */

export interface AccentTokenConfig {
  /** Token identifier */
  token: string;
  /** Primary accent color */
  primary: string;
  /** Lighter variant for hover states */
  light: string;
  /** Darker variant for active states */
  dark: string;
  /** Contrast color for text on accent background */
  contrast: string;
}

/**
 * Accent token configurations for all applications
 */
export const ACCENT_TOKENS: Record<string, AccentTokenConfig> = {
  shell: {
    token: 'shell',
    primary: '#60a5fa', // Sky Blue
    light: '#93c5fd', // Lighter blue for hover
    dark: '#3b82f6', // Darker blue for active
    contrast: '#ffffff',
  },
  finance: {
    token: 'finance',
    primary: '#10b981', // Emerald
    light: '#34d399',
    dark: '#059669',
    contrast: '#ffffff',
  },
  hr: {
    token: 'hr',
    primary: '#f59e0b', // Amber
    light: '#fbbf24',
    dark: '#d97706',
    contrast: '#ffffff',
  },
  supply: {
    token: 'supply',
    primary: '#3b82f6', // Blue (deprecated, kept for compatibility)
    light: '#60a5fa',
    dark: '#2563eb',
    contrast: '#ffffff',
  },
  srm: {
    token: 'srm',
    primary: '#8b5cf6', // Violet
    light: '#a78bfa',
    dark: '#7c3aed',
    contrast: '#ffffff',
  },
  warehouses: {
    token: 'warehouses',
    primary: '#f97316', // Orange
    light: '#fb923c',
    dark: '#ea580c',
    contrast: '#ffffff',
  },
  pm: {
    token: 'pm',
    primary: '#ec4899', // Pink
    light: '#f472b6',
    dark: '#db2777',
    contrast: '#ffffff',
  },
  auth: {
    token: 'auth',
    primary: '#60a5fa', // Sky Blue (Matching Shell)
    light: '#93c5fd',
    dark: '#3b82f6',
    contrast: '#ffffff',
  },
};

/**
 * Apply accent token CSS variables to the document root
 */
export function applyAccentToken(token: string): void {
  const config = ACCENT_TOKENS[token] || ACCENT_TOKENS['shell'];
  const root = document.documentElement;

  root.style.setProperty('--accent-primary', config.primary);
  root.style.setProperty('--accent-light', config.light);
  root.style.setProperty('--accent-dark', config.dark);
  root.style.setProperty('--accent-contrast', config.contrast);
}

/**
 * Get accent token configuration
 */
export function getAccentToken(token: string): AccentTokenConfig {
  return ACCENT_TOKENS[token] || ACCENT_TOKENS['shell'];
}
