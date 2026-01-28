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
      :host([variant='solid'][color-scheme='primary']) .badge {
        background: var(--monk-color-bg-primary);
        color: var(--monk-color-text-on-primary);
      }

      /* Solid Variant - Neutral */
      :host([variant='solid'][color-scheme='neutral']) .badge {
        background: var(--monk-color-bg-neutral);
        color: var(--monk-color-text-on-neutral);
      }

      /* Solid Variant - Success */
      :host([variant='solid'][color-scheme='success']) .badge {
        background: var(--monk-color-bg-success);
        color: var(--monk-color-text-on-success);
      }

      /* Solid Variant - Error */
      :host([variant='solid'][color-scheme='error']) .badge {
        background: var(--monk-color-bg-error);
        color: var(--monk-color-text-on-error);
      }

      /* Solid Variant - Warning */
      :host([variant='solid'][color-scheme='warning']) .badge {
        background: var(--monk-color-bg-warning);
        color: var(--monk-color-text-on-warning);
      }

      /* Solid Variant - Info */
      :host([variant='solid'][color-scheme='info']) .badge {
        background: var(--monk-color-bg-info);
        color: var(--monk-color-text-on-info);
      }

      /* Subtle Variant - Primary */
      :host([variant='subtle'][color-scheme='primary']) .badge {
        background: var(--monk-color-bg-primary-subtle);
        color: var(--monk-color-bg-primary);
      }

      /* Subtle Variant - Neutral */
      :host([variant='subtle'][color-scheme='neutral']) .badge {
        background: var(--monk-color-bg-neutral-subtle);
        color: var(--monk-color-text-primary);
      }

      /* Subtle Variant - Success */
      :host([variant='subtle'][color-scheme='success']) .badge {
        background: var(--monk-color-bg-success-subtle);
        color: var(--monk-color-bg-success);
      }

      /* Subtle Variant - Error */
      :host([variant='subtle'][color-scheme='error']) .badge {
        background: var(--monk-color-bg-error-subtle);
        color: var(--monk-color-bg-error);
      }

      /* Subtle Variant - Warning */
      :host([variant='subtle'][color-scheme='warning']) .badge {
        background: var(--monk-color-bg-warning-subtle);
        color: var(--monk-color-bg-warning-active);
      }

      /* Subtle Variant - Info */
      :host([variant='subtle'][color-scheme='info']) .badge {
        background: var(--monk-color-bg-info-subtle);
        color: var(--monk-color-bg-info);
      }

      /* Outline Variant - Primary */
      :host([variant='outline'][color-scheme='primary']) .badge {
        background: transparent;
        border-color: var(--monk-color-bg-primary);
        color: var(--monk-color-bg-primary);
      }

      /* Outline Variant - Neutral */
      :host([variant='outline'][color-scheme='neutral']) .badge {
        background: transparent;
        border-color: var(--monk-color-border-default);
        color: var(--monk-color-text-primary);
      }

      /* Outline Variant - Success */
      :host([variant='outline'][color-scheme='success']) .badge {
        background: transparent;
        border-color: var(--monk-color-bg-success);
        color: var(--monk-color-bg-success);
      }

      /* Outline Variant - Error */
      :host([variant='outline'][color-scheme='error']) .badge {
        background: transparent;
        border-color: var(--monk-color-bg-error);
        color: var(--monk-color-bg-error);
      }

      /* Outline Variant - Warning */
      :host([variant='outline'][color-scheme='warning']) .badge {
        background: transparent;
        border-color: var(--monk-color-bg-warning);
        color: var(--monk-color-bg-warning-active);
      }

      /* Outline Variant - Info */
      :host([variant='outline'][color-scheme='info']) .badge {
        background: transparent;
        border-color: var(--monk-color-bg-info);
        color: var(--monk-color-bg-info);
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
