/**
 * PrimeNG Theme Configuration
 * Aligned with Tailwind CSS Design Tokens
 * Supports Light and Dark modes
 */

import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

/**
 * Custom PrimeNG theme preset matching Tailwind design tokens
 */
export const ERPTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    colorScheme: {
      light: {
        primary: {
          color: '#3b82f6',
          contrastColor: '#ffffff',
          hoverColor: '#2563eb',
          activeColor: '#1d4ed8'
        },
        surface: {
          0: '#ffffff',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        }
      },
      dark: {
        primary: {
          color: '#60a5fa',
          contrastColor: '#030712',
          hoverColor: '#3b82f6',
          activeColor: '#2563eb'
        },
        surface: {
          0: '#030712',
          50: '#111827',
          100: '#1f2937',
          200: '#374151',
          300: '#4b5563',
          400: '#6b7280',
          500: '#9ca3af',
          600: '#d1d5db',
          700: '#e5e7eb',
          800: '#f3f4f6',
          900: '#f9fafb',
          950: '#ffffff'
        }
      }
    }
  }
});
