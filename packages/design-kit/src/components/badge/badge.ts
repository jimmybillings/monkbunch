import { html, css, type CSSResultArray, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MonkBaseElement } from '../../core/base-element.js';
import { coreStyles, reducedMotionStyles } from '../../core/styles.js';

/**
 * Badge variants
 */
export type BadgeVariant = 'solid' | 'subtle' | 'outline';

/**
 * Badge color schemes (semantic intent)
 */
export type BadgeColorScheme = 'primary' | 'neutral' | 'success' | 'error' | 'warning' | 'info';

/**
 * Badge sizes
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge component - Status indicators and labels
 *
 * @element monk-badge
 *
 * @example
 * ```html
 * <!-- Status badge (default) -->
 * <monk-badge>Active</monk-badge>
 *
 * <!-- Success badge -->
 * <monk-badge color-scheme="success">Approved</monk-badge>
 *
 * <!-- Error badge -->
 * <monk-badge color-scheme="error">Failed</monk-badge>
 *
 * <!-- Notification count -->
 * <monk-badge color-scheme="error" variant="solid">12</monk-badge>
 *
 * <!-- Subtle variant -->
 * <monk-badge variant="subtle" color-scheme="warning">Pending</monk-badge>
 *
 * <!-- Outline variant -->
 * <monk-badge variant="outline" color-scheme="info">Beta</monk-badge>
 *
 * <!-- Custom colors -->
 * <monk-badge style="--badge-bg: #ff6b6b; --badge-color: white;">Custom</monk-badge>
 * <monk-badge style="--badge-bg: #ffd93d; --badge-color: #333;">Gold</monk-badge>
 * <monk-badge variant="outline" style="--badge-border-color: #a855f7; --badge-color: #a855f7;">Purple</monk-badge>
 * ```
 *
 * @accessibility
 * - Uses semantic span element
 * - Proper color contrast ratios (WCAG AA)
 * - Respects prefers-reduced-motion
 *
 * @cssprop --monk-color-bg-* - Background color tokens
 * @cssprop --monk-color-text-* - Text color tokens
 * @cssprop --monk-color-border-* - Border color tokens
 * @cssprop --monk-space-* - Spacing tokens
 * @cssprop --monk-font-* - Typography tokens
 * @cssprop --badge-bg - Custom background color (overrides color-scheme)
 * @cssprop --badge-color - Custom text color (overrides color-scheme)
 * @cssprop --badge-border-color - Custom border color (overrides color-scheme)
 *
 * @csspart badge - The badge element for external styling via ::part()
 */
@customElement('monk-badge')
export class MonkBadge extends MonkBaseElement {
  /**
   * Visual style variant
   * @default 'solid'
   */
  @property({ type: String, reflect: true })
  variant: BadgeVariant = 'solid';

  /**
   * Semantic color scheme
   * @default 'primary'
   */
  @property({ type: String, reflect: true, attribute: 'color-scheme' })
  colorScheme: BadgeColorScheme = 'primary';

  /**
   * Badge size
   * @default 'md'
   */
  @property({ type: String, reflect: true })
  size: BadgeSize = 'md';

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      :host {
        display: inline-block;
      }

      .badge {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: var(--monk-font-family-base);
        font-weight: var(--monk-font-weight-semibold);
        border-radius: var(--monk-radius-full);
        border: 1px solid transparent;
        white-space: nowrap;
        vertical-align: middle;
        text-transform: uppercase;
        letter-spacing: 0.025em;

        /* CSS custom properties for custom colors */
        background: var(--badge-bg);
        color: var(--badge-color);
        border-color: var(--badge-border-color, transparent);
      }

      /* Sizes */
      :host([size='sm']) .badge {
        padding: var(--monk-space-1) var(--monk-space-2);
        font-size: var(--monk-font-size-xs);
        line-height: var(--monk-font-lineHeight-tight);
      }

      :host([size='md']) .badge {
        padding: var(--monk-space-1) var(--monk-space-3);
        font-size: var(--monk-font-size-sm);
        line-height: var(--monk-font-lineHeight-tight);
      }

      :host([size='lg']) .badge {
        padding: var(--monk-space-2) var(--monk-space-4);
        font-size: var(--monk-font-size-base);
        line-height: var(--monk-font-lineHeight-normal);
      }

      /* Solid Variant - Primary */
      :host([variant='solid'][color-scheme='primary']) {
        --badge-bg: var(--monk-color-bg-primary);
        --badge-color: var(--monk-color-text-on-primary);
      }

      /* Solid Variant - Neutral */
      :host([variant='solid'][color-scheme='neutral']) {
        --badge-bg: var(--monk-color-bg-neutral);
        --badge-color: var(--monk-color-text-on-neutral);
      }

      /* Solid Variant - Success */
      :host([variant='solid'][color-scheme='success']) {
        --badge-bg: var(--monk-color-bg-success);
        --badge-color: var(--monk-color-text-on-success);
      }

      /* Solid Variant - Error */
      :host([variant='solid'][color-scheme='error']) {
        --badge-bg: var(--monk-color-bg-error);
        --badge-color: var(--monk-color-text-on-error);
      }

      /* Solid Variant - Warning */
      :host([variant='solid'][color-scheme='warning']) {
        --badge-bg: var(--monk-color-bg-warning);
        --badge-color: var(--monk-color-text-on-warning);
      }

      /* Solid Variant - Info */
      :host([variant='solid'][color-scheme='info']) {
        --badge-bg: var(--monk-color-bg-info);
        --badge-color: var(--monk-color-text-on-info);
      }

      /* Subtle Variant - Primary */
      :host([variant='subtle'][color-scheme='primary']) {
        --badge-bg: var(--monk-color-bg-primary-subtle);
        --badge-color: var(--monk-color-bg-primary);
      }

      /* Subtle Variant - Neutral */
      :host([variant='subtle'][color-scheme='neutral']) {
        --badge-bg: var(--monk-color-bg-neutral-subtle);
        --badge-color: var(--monk-color-text-primary);
      }

      /* Subtle Variant - Success */
      :host([variant='subtle'][color-scheme='success']) {
        --badge-bg: var(--monk-color-bg-success-subtle);
        --badge-color: var(--monk-color-bg-success);
      }

      /* Subtle Variant - Error */
      :host([variant='subtle'][color-scheme='error']) {
        --badge-bg: var(--monk-color-bg-error-subtle);
        --badge-color: var(--monk-color-bg-error);
      }

      /* Subtle Variant - Warning */
      :host([variant='subtle'][color-scheme='warning']) {
        --badge-bg: var(--monk-color-bg-warning-subtle);
        --badge-color: var(--monk-color-bg-warning-active);
      }

      /* Subtle Variant - Info */
      :host([variant='subtle'][color-scheme='info']) {
        --badge-bg: var(--monk-color-bg-info-subtle);
        --badge-color: var(--monk-color-bg-info);
      }

      /* Outline Variant - Primary */
      :host([variant='outline'][color-scheme='primary']) {
        --badge-bg: transparent;
        --badge-border-color: var(--monk-color-bg-primary);
        --badge-color: var(--monk-color-bg-primary);
      }

      /* Outline Variant - Neutral */
      :host([variant='outline'][color-scheme='neutral']) {
        --badge-bg: transparent;
        --badge-border-color: var(--monk-color-border-default);
        --badge-color: var(--monk-color-text-primary);
      }

      /* Outline Variant - Success */
      :host([variant='outline'][color-scheme='success']) {
        --badge-bg: transparent;
        --badge-border-color: var(--monk-color-bg-success);
        --badge-color: var(--monk-color-bg-success);
      }

      /* Outline Variant - Error */
      :host([variant='outline'][color-scheme='error']) {
        --badge-bg: transparent;
        --badge-border-color: var(--monk-color-bg-error);
        --badge-color: var(--monk-color-bg-error);
      }

      /* Outline Variant - Warning */
      :host([variant='outline'][color-scheme='warning']) {
        --badge-bg: transparent;
        --badge-border-color: var(--monk-color-bg-warning);
        --badge-color: var(--monk-color-bg-warning-active);
      }

      /* Outline Variant - Info */
      :host([variant='outline'][color-scheme='info']) {
        --badge-bg: transparent;
        --badge-border-color: var(--monk-color-bg-info);
        --badge-color: var(--monk-color-bg-info);
      }
    `,
  ];

  protected override render(): TemplateResult {
    const partValue = `badge ${this.variant} ${this.colorScheme} ${this.size}`;

    return html`
      <span part="${partValue}" class="badge">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-badge': MonkBadge;
  }
}
