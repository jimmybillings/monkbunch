import { css } from 'lit';

/**
 * Core CSS utilities used across all components
 * These styles provide a consistent foundation and accessibility baseline
 */
export const coreStyles = css`
  :host {
    box-sizing: border-box;
  }

  :host([hidden]) {
    display: none;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

/**
 * Focus visible styles for keyboard navigation
 * Provides accessible focus indicators that only show for keyboard users
 */
export const focusVisibleStyles = css`
  :host(:focus-visible) {
    outline: 2px solid var(--monk-color-brand-primary);
    outline-offset: 2px;
    border-radius: 2px;
  }

  :host(:focus:not(:focus-visible)) {
    outline: none;
  }
`;

/**
 * Screen reader only content
 * Visually hides content but keeps it accessible to screen readers
 */
export const srOnlyStyles = css`
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

/**
 * Respects user's motion preferences
 * Disables animations/transitions for users who prefer reduced motion
 */
export const reducedMotionStyles = css`
  @media (prefers-reduced-motion: reduce) {
    :host {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
