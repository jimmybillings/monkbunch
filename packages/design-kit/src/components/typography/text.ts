import { html, css, type CSSResultArray, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MonkBaseTypography } from '../../core/base-typography.js';
import { coreStyles, reducedMotionStyles } from '../../core/styles.js';

/**
 * Text size variants
 */
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Text weight variants
 */
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

/**
 * Text color variants (semantic)
 */
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Text component for displaying body text with various size, weight, and color options
 *
 * @element monk-text
 *
 * @example
 * ```html
 * <monk-text>Default paragraph text</monk-text>
 * <monk-text size="lg" weight="semibold">Large, semi-bold text</monk-text>
 * <monk-text color="secondary" size="sm">Small secondary text</monk-text>
 * ```
 *
 * @accessibility
 * - Uses semantic paragraph tag by default
 * - Color variants meet WCAG AA contrast ratios (4.5:1 minimum)
 * - Line height ensures readability (1.5 for body text)
 * - Respects prefers-reduced-motion for any transitions
 * - Font sizes are accessible and scalable
 *
 * @cssprop --monk-font-size-xs - Extra small text (default: 12px)
 * @cssprop --monk-font-size-sm - Small text (default: 14px)
 * @cssprop --monk-font-size-md - Medium text (default: 16px)
 * @cssprop --monk-font-size-lg - Large text (default: 18px)
 * @cssprop --monk-font-size-xl - Extra large text (default: 20px)
 * @cssprop --monk-font-weight-regular - Regular weight (default: 400)
 * @cssprop --monk-font-weight-medium - Medium weight (default: 500)
 * @cssprop --monk-font-weight-semibold - Semibold weight (default: 600)
 * @cssprop --monk-font-weight-bold - Bold weight (default: 700)
 * @cssprop --monk-color-text-primary - Primary text color (default: gray-900)
 * @cssprop --monk-color-text-secondary - Secondary text color (default: gray-600)
 * @cssprop --monk-color-text-tertiary - Tertiary text color (default: gray-500)
 * @cssprop --monk-font-family-base - Font family (default: system fonts)
 * @cssprop --monk-font-line-height-normal - Line height (default: 1.5)
 *
 * @csspart text - The text element (span) for external styling via ::part()
 */
@customElement('monk-text')
export class MonkText extends MonkBaseTypography {
  /**
   * Text size variant
   * @default 'md'
   */
  @property({ type: String, reflect: true })
  size: TextSize = 'md';

  /**
   * Text weight variant
   * @default 'regular'
   */
  @property({ type: String, reflect: true })
  weight: TextWeight = 'regular';

  /**
   * Text color variant (semantic)
   * @default 'primary'
   */
  @property({ type: String, reflect: true })
  color: TextColor = 'primary';

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      :host {
        display: block;
      }

      span {
        font-family: var(--monk-font-family-base);
        line-height: var(--monk-font-line-height-normal);
        margin: 0;
      }

      /* Size variants */
      :host([size='xs']) span {
        font-size: var(--monk-font-size-xs);
      }

      :host([size='sm']) span {
        font-size: var(--monk-font-size-sm);
      }

      :host([size='md']) span {
        font-size: var(--monk-font-size-md);
      }

      :host([size='lg']) span {
        font-size: var(--monk-font-size-lg);
      }

      :host([size='xl']) span {
        font-size: var(--monk-font-size-xl);
      }

      /* Weight variants */
      :host([weight='regular']) span {
        font-weight: var(--monk-font-weight-regular);
      }

      :host([weight='medium']) span {
        font-weight: var(--monk-font-weight-medium);
      }

      :host([weight='semibold']) span {
        font-weight: var(--monk-font-weight-semibold);
      }

      :host([weight='bold']) span {
        font-weight: var(--monk-font-weight-bold);
      }

      /* Color variants */
      :host([color='primary']) span {
        color: var(--monk-color-text-primary);
      }

      :host([color='secondary']) span {
        color: var(--monk-color-text-secondary);
      }

      :host([color='tertiary']) span {
        color: var(--monk-color-text-tertiary);
      }

      :host([color='link']) span {
        color: var(--monk-color-text-link);
      }

      :host([color='success']) span {
        color: var(--monk-color-text-success);
      }

      :host([color='warning']) span {
        color: var(--monk-color-text-warning);
      }

      :host([color='error']) span {
        color: var(--monk-color-text-error);
      }

      :host([color='info']) span {
        color: var(--monk-color-text-info);
      }
    `,
  ];

  protected override render(): TemplateResult {
    // Render with part attribute for external styling
    const partValue = `text ${this.size} ${this.weight} ${this.color}`;
    return html`<span part="${partValue}"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-text': MonkText;
  }
}
