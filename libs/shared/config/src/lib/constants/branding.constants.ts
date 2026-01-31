/**
 * Branding Constants
 * Centralized branding configuration
 * Change brand identity from a single location
 */

/**
 * Brand Identity
 */
export const BRAND = {
  NAME: 'Assemble ERP',
  SHORT_NAME: 'ASSEMBLE',
  TAGLINE: 'Professional Enterprise Resource Planning System',
  LOGO_PATH: '/assemble-logo.png',
  FAVICON_PATH: '/assemble-logo.png',
  FALLBACK_ICON: 'pi-building',
} as const;

/**
 * Company Information
 */
export const COMPANY = {
  NAME: 'Assemble Corporation',
  EMAIL: 'info@assemble.com',
  SUPPORT_EMAIL: 'support@assemble.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: '123 Business Street, Tech City, TC 12345',
  WEBSITE: 'https://www.assemble.com',
} as const;

/**
 * Social Media Links
 */
export const SOCIAL_MEDIA = {
  FACEBOOK: 'https://facebook.com/assemble',
  TWITTER: 'https://twitter.com/assemble',
  LINKEDIN: 'https://linkedin.com/company/assemble',
  GITHUB: 'https://github.com/assemble',
  YOUTUBE: 'https://youtube.com/assemble',
} as const;

/**
 * Demo/Test Account Credentials
 * For development and testing purposes
 */
export const DEMO_CREDENTIALS = {
  EMAIL: 'admin@admin.com',
  PASSWORD: '1234567',
  DISPLAY_ON_LOGIN: true, // Set to false in production
} as const;

/**
 * Legal Information
 */
export const LEGAL = {
  PRIVACY_POLICY_URL: '/legal/privacy',
  TERMS_OF_SERVICE_URL: '/legal/terms',
  COOKIE_POLICY_URL: '/legal/cookies',
  LICENSE: 'MIT',
} as const;

/**
 * Support & Documentation
 */
export const SUPPORT = {
  DOCUMENTATION_URL: '/docs',
  HELP_CENTER_URL: '/help',
  FAQ_URL: '/faq',
  CONTACT_URL: '/contact',
  FEEDBACK_URL: '/feedback',
} as const;
