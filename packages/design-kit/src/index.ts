/**
 * Monkbunch Design Kit
 * A white-label design system built with Lit web components
 *
 * @packageDocumentation
 */

// Core exports
export * from './core/index.js';

// Theme
export * from './theme/index.js';

// Typography components
export * from './components/typography/index.js';

// Layout components
export * from './components/layout/index.js';

// Button component
export * from './components/button/index.js';

// Import theme CSS variables
// This makes the design tokens available when the package is imported
import './theme/index.js';
