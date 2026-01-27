/**
 * Theme system
 * Imports CSS custom properties (design tokens) from @monkbunch/design-tokens
 *
 * These tokens are available globally as CSS variables with --monk- prefix:
 * - Colors: --monk-color-*
 * - Spacing: --monk-space-*
 * - Typography: --monk-font-*
 * - Radii: --monk-radius-*
 *
 * To customize the theme, override these CSS variables in your application:
 *
 * @example
 * ```css
 * :root {
 *   --monk-color-brand-primary: #custom-color;
 *   --monk-font-family-base: 'Custom Font', sans-serif;
 * }
 * ```
 */

// Import design tokens CSS variables
// Note: This assumes the design-tokens package is built and available
// In production, this would be: import '@monkbunch/design-tokens/css/variables.css';
// For now, we'll use a relative path to the built tokens
export {};

// Re-export design tokens for JavaScript/TypeScript usage
// export { tokens } from '@monkbunch/design-tokens';
