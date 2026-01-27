import { html, css, type CSSResultArray, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeStatic, html as staticHtml } from 'lit/static-html.js';
import { MonkBaseTypography } from '../../core/base-typography.js';
import { coreStyles, reducedMotionStyles } from '../../core/styles.js';

/**
 * Heading levels supported by the component
 */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Color variants for headings
 */
export type HeadingColor = 'primary' | 'secondary' | 'tertiary';

/**
 * Heading component for displaying semantic headings (h1-h6)
 *
 * @element monk-heading
 *
 * @fires {CustomEvent} change - Fired when heading level changes programmatically
 *
 * @example
 * ```html
 * <monk-heading level="h1">Main Page Title</monk-heading>
 * <monk-heading level="h2" align="center">Centered Section Heading</monk-heading>
 * ```
 *
 * @accessibility
 * - Uses proper semantic HTML heading elements (h1-h6)
 * - Maintains heading hierarchy for screen readers
 * - Color contrast meets WCAG AA standards (4.5:1 minimum)
 * - Font sizes are token-driven for consistent readability
 * - Respects prefers-reduced-motion for animations
 *
 * @cssprop --monk-font-size-4xl - Font size for h1 (default: 36px)
 * @cssprop --monk-font-size-3xl - Font size for h2 (default: 30px)
 * @cssprop --monk-font-size-2xl - Font size for h3 (default: 24px)
 * @cssprop --monk-font-size-xl - Font size for h4 (default: 20px)
 * @cssprop --monk-font-size-lg - Font size for h5 (default: 18px)
 * @cssprop --monk-font-size-md - Font size for h6 (default: 16px)
 * @cssprop --monk-font-weight-bold - Font weight for h1-h2 (default: 700)
 * @cssprop --monk-font-weight-semibold - Font weight for h3-h6 (default: 600)
 * @cssprop --monk-color-text-primary - Text color (default: gray-900)
 * @cssprop --monk-color-text-secondary - Secondary text color (default: gray-600)
 * @cssprop --monk-color-text-tertiary - Tertiary text color (default: gray-500)
 * @cssprop --monk-font-family-base - Font family (default: system fonts)
 * @cssprop --monk-font-line-height-tight - Line height for large headings (default: 1.2)
 * @cssprop --monk-font-line-height-normal - Line height for smaller headings (default: 1.5)
 *
 * @csspart heading - The heading element (h1-h6) for external styling via ::part()
 */
@customElement('monk-heading')
export class MonkHeading extends MonkBaseTypography {
  /**
   * The semantic heading level to render (h1-h6)
   * @default 'h2'
   */
  @property({ type: String, reflect: true })
  level: HeadingLevel = 'h2';

  /**
   * The color variant for the heading
   * @default 'primary'
   */
  @property({ type: String, reflect: true })
  color: HeadingColor = 'primary';

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      :host {
        display: block;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: var(--monk-font-family-base);
        color: var(--monk-color-text-primary);
        margin: 0;
      }

      /* Heading level styles */
      h1 {
        font-size: var(--monk-font-size-4xl);
        font-weight: var(--monk-font-weight-bold);
        line-height: var(--monk-font-line-height-tight);
      }

      h2 {
        font-size: var(--monk-font-size-3xl);
        font-weight: var(--monk-font-weight-bold);
        line-height: var(--monk-font-line-height-tight);
      }

      h3 {
        font-size: var(--monk-font-size-2xl);
        font-weight: var(--monk-font-weight-semibold);
        line-height: var(--monk-font-line-height-normal);
      }

      h4 {
        font-size: var(--monk-font-size-xl);
        font-weight: var(--monk-font-weight-semibold);
        line-height: var(--monk-font-line-height-normal);
      }

      h5 {
        font-size: var(--monk-font-size-lg);
        font-weight: var(--monk-font-weight-medium);
        line-height: var(--monk-font-line-height-normal);
      }

      h6 {
        font-size: var(--monk-font-size-md);
        font-weight: var(--monk-font-weight-medium);
        line-height: var(--monk-font-line-height-normal);
      }

      /* Color variants */
      :host([color='primary']) h1,
      :host([color='primary']) h2,
      :host([color='primary']) h3,
      :host([color='primary']) h4,
      :host([color='primary']) h5,
      :host([color='primary']) h6 {
        color: var(--monk-color-text-primary);
      }

      :host([color='secondary']) h1,
      :host([color='secondary']) h2,
      :host([color='secondary']) h3,
      :host([color='secondary']) h4,
      :host([color='secondary']) h5,
      :host([color='secondary']) h6 {
        color: var(--monk-color-text-secondary);
      }

      :host([color='tertiary']) h1,
      :host([color='tertiary']) h2,
      :host([color='tertiary']) h3,
      :host([color='tertiary']) h4,
      :host([color='tertiary']) h5,
      :host([color='tertiary']) h6 {
        color: var(--monk-color-text-tertiary);
      }
    `,
  ];

  protected override render(): TemplateResult {
    // Render actual semantic heading with part attribute for external styling
    const tag = unsafeStatic(this.level);
    const partValue = `heading ${this.level} ${this.color}`;

    return staticHtml`<${tag} part=${partValue}><slot></slot></${tag}>`;
  }

  /**
   * Lifecycle: Called when observed properties change
   * Emits change event when level changes
   */
  protected override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('level')) {
      this.emitEvent('change', { level: this.level });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-heading': MonkHeading;
  }
}
