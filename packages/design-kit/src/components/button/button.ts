import { html, css, type CSSResultArray, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MonkBaseElement } from '../../core/base-element.js';
import { coreStyles, reducedMotionStyles } from '../../core/styles.js';

/**
 * Button variants
 */
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

/**
 * Button color schemes (semantic intent)
 */
export type ButtonColorScheme = 'primary' | 'neutral' | 'success' | 'error' | 'warning';

/**
 * Button sizes
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Button component - Interactive element for user actions
 *
 * @element monk-button
 *
 * @example
 * ```html
 * <!-- Primary solid button (default) -->
 * <monk-button>Click me</monk-button>
 *
 * <!-- Outline variant -->
 * <monk-button variant="outline" color-scheme="neutral">Cancel</monk-button>
 *
 * <!-- Success action -->
 * <monk-button color-scheme="success">Save</monk-button>
 *
 * <!-- Destructive action -->
 * <monk-button color-scheme="error">Delete</monk-button>
 *
 * <!-- Link style -->
 * <monk-button variant="link">Learn more</monk-button>
 * ```
 *
 * @accessibility
 * - Uses native button element for keyboard navigation
 * - Supports disabled state with aria-disabled
 * - Focus visible styles for keyboard users
 * - Proper color contrast ratios (WCAG AA)
 * - Respects prefers-reduced-motion
 *
 * @cssprop --monk-color-bg-* - Background color tokens
 * @cssprop --monk-color-text-* - Text color tokens
 * @cssprop --monk-color-border-* - Border color tokens
 * @cssprop --monk-space-* - Spacing tokens
 * @cssprop --monk-font-* - Typography tokens
 *
 * @csspart button - The button element for external styling via ::part()
 */
@customElement('monk-button')
export class MonkButton extends MonkBaseElement {
  /**
   * Visual style variant
   * @default 'solid'
   */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'solid';

  /**
   * Semantic color scheme
   * @default 'primary'
   */
  @property({ type: String, reflect: true, attribute: 'color-scheme' })
  colorScheme: ButtonColorScheme = 'primary';

  /**
   * Button size
   * @default 'md'
   */
  @property({ type: String, reflect: true })
  size: ButtonSize = 'md';

  /**
   * Disabled state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Full width button
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  /**
   * Button type (for forms)
   * @default 'button'
   */
  @property({ type: String, reflect: true })
  type: 'button' | 'submit' | 'reset' = 'button';

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      :host {
        display: inline-block;
      }

      :host([full-width]) {
        display: block;
      }

      .button {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--monk-space-2);
        font-family: var(--monk-font-family-sans);
        font-weight: var(--monk-font-weight-semibold);
        border-radius: var(--monk-radius-md);
        border: 1px solid transparent;
        cursor: pointer;
        transition:
          background-color var(--monk-duration-normal, 250ms) var(--monk-easing-ease-out, ease-out),
          border-color var(--monk-duration-normal, 250ms) var(--monk-easing-ease-out, ease-out),
          color var(--monk-duration-normal, 250ms) var(--monk-easing-ease-out, ease-out),
          box-shadow var(--monk-duration-normal, 250ms) var(--monk-easing-ease-out, ease-out);
        text-decoration: none;
        user-select: none;
        white-space: nowrap;
      }

      :host([full-width]) .button {
        width: 100%;
      }

      /* Sizes */
      :host([size='xs']) .button {
        padding: var(--monk-space-1) var(--monk-space-2);
        font-size: var(--monk-font-size-xs);
        line-height: var(--monk-font-lineHeight-tight);
      }

      :host([size='sm']) .button {
        padding: var(--monk-space-2) var(--monk-space-3);
        font-size: var(--monk-font-size-sm);
        line-height: var(--monk-font-lineHeight-tight);
      }

      :host([size='md']) .button {
        padding: var(--monk-space-3) var(--monk-space-4);
        font-size: var(--monk-font-size-base);
        line-height: var(--monk-font-lineHeight-normal);
      }

      :host([size='lg']) .button {
        padding: var(--monk-space-4) var(--monk-space-6);
        font-size: var(--monk-font-size-lg);
        line-height: var(--monk-font-lineHeight-normal);
      }

      :host([size='xl']) .button {
        padding: var(--monk-space-5) var(--monk-space-8);
        font-size: var(--monk-font-size-xl);
        line-height: var(--monk-font-lineHeight-normal);
      }

      /* Solid Variant - Primary */
      :host([variant='solid'][color-scheme='primary']) .button {
        background: var(--monk-color-bg-primary);
        color: var(--monk-color-text-on-primary);
      }

      :host([variant='solid'][color-scheme='primary']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-primary-hover);
      }

      :host([variant='solid'][color-scheme='primary']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-primary-active);
      }

      /* Solid Variant - Neutral */
      :host([variant='solid'][color-scheme='neutral']) .button {
        background: var(--monk-color-bg-neutral);
        color: var(--monk-color-text-on-neutral);
      }

      :host([variant='solid'][color-scheme='neutral']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-neutral-hover);
      }

      :host([variant='solid'][color-scheme='neutral']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-neutral-active);
      }

      /* Solid Variant - Success */
      :host([variant='solid'][color-scheme='success']) .button {
        background: var(--monk-color-bg-success);
        color: var(--monk-color-text-on-success);
      }

      :host([variant='solid'][color-scheme='success']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-success-hover);
      }

      :host([variant='solid'][color-scheme='success']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-success-active);
      }

      /* Solid Variant - Error */
      :host([variant='solid'][color-scheme='error']) .button {
        background: var(--monk-color-bg-error);
        color: var(--monk-color-text-on-error);
      }

      :host([variant='solid'][color-scheme='error']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-error-hover);
      }

      :host([variant='solid'][color-scheme='error']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-error-active);
      }

      /* Solid Variant - Warning */
      :host([variant='solid'][color-scheme='warning']) .button {
        background: var(--monk-color-bg-warning);
        color: var(--monk-color-text-on-warning);
      }

      :host([variant='solid'][color-scheme='warning']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-warning-hover);
      }

      :host([variant='solid'][color-scheme='warning']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-warning-active);
      }

      /* Outline Variant - Primary */
      :host([variant='outline'][color-scheme='primary']) .button {
        background: transparent;
        border-color: var(--monk-color-bg-primary);
        color: var(--monk-color-bg-primary);
      }

      :host([variant='outline'][color-scheme='primary']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-primary-subtle);
        border-color: var(--monk-color-bg-primary-hover);
        color: var(--monk-color-bg-primary-hover);
      }

      :host([variant='outline'][color-scheme='primary']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-primary-subtle);
        border-color: var(--monk-color-bg-primary-active);
        color: var(--monk-color-bg-primary-active);
      }

      /* Outline Variant - Neutral */
      :host([variant='outline'][color-scheme='neutral']) .button {
        background: transparent;
        border-color: var(--monk-color-border-default);
        color: var(--monk-color-text-primary);
      }

      :host([variant='outline'][color-scheme='neutral']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-hover);
        border-color: var(--monk-color-border-hover);
      }

      :host([variant='outline'][color-scheme='neutral']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-active);
        border-color: var(--monk-color-border-emphasized);
      }

      /* Outline Variant - Success */
      :host([variant='outline'][color-scheme='success']) .button {
        background: transparent;
        border-color: var(--monk-color-bg-success);
        color: var(--monk-color-bg-success);
      }

      :host([variant='outline'][color-scheme='success']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-success-subtle);
        border-color: var(--monk-color-bg-success-hover);
        color: var(--monk-color-bg-success-hover);
      }

      :host([variant='outline'][color-scheme='success']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-success-subtle);
        border-color: var(--monk-color-bg-success-active);
        color: var(--monk-color-bg-success-active);
      }

      /* Outline Variant - Error */
      :host([variant='outline'][color-scheme='error']) .button {
        background: transparent;
        border-color: var(--monk-color-bg-error);
        color: var(--monk-color-bg-error);
      }

      :host([variant='outline'][color-scheme='error']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-error-subtle);
        border-color: var(--monk-color-bg-error-hover);
        color: var(--monk-color-bg-error-hover);
      }

      :host([variant='outline'][color-scheme='error']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-error-subtle);
        border-color: var(--monk-color-bg-error-active);
        color: var(--monk-color-bg-error-active);
      }

      /* Outline Variant - Warning */
      :host([variant='outline'][color-scheme='warning']) .button {
        background: transparent;
        border-color: var(--monk-color-bg-warning);
        color: var(--monk-color-bg-warning-active);
      }

      :host([variant='outline'][color-scheme='warning']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-warning-subtle);
        border-color: var(--monk-color-bg-warning-hover);
      }

      :host([variant='outline'][color-scheme='warning']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-warning-subtle);
        border-color: var(--monk-color-bg-warning-active);
      }

      /* Ghost Variant - Primary */
      :host([variant='ghost'][color-scheme='primary']) .button {
        background: transparent;
        color: var(--monk-color-bg-primary);
      }

      :host([variant='ghost'][color-scheme='primary']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-primary-subtle);
        color: var(--monk-color-bg-primary-hover);
      }

      :host([variant='ghost'][color-scheme='primary']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-primary-subtle);
        color: var(--monk-color-bg-primary-active);
      }

      /* Ghost Variant - Neutral */
      :host([variant='ghost'][color-scheme='neutral']) .button {
        background: transparent;
        color: var(--monk-color-text-primary);
      }

      :host([variant='ghost'][color-scheme='neutral']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-hover);
      }

      :host([variant='ghost'][color-scheme='neutral']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-active);
      }

      /* Ghost Variant - Success */
      :host([variant='ghost'][color-scheme='success']) .button {
        background: transparent;
        color: var(--monk-color-bg-success);
      }

      :host([variant='ghost'][color-scheme='success']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-success-subtle);
        color: var(--monk-color-bg-success-hover);
      }

      :host([variant='ghost'][color-scheme='success']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-success-subtle);
        color: var(--monk-color-bg-success-active);
      }

      /* Ghost Variant - Error */
      :host([variant='ghost'][color-scheme='error']) .button {
        background: transparent;
        color: var(--monk-color-bg-error);
      }

      :host([variant='ghost'][color-scheme='error']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-error-subtle);
        color: var(--monk-color-bg-error-hover);
      }

      :host([variant='ghost'][color-scheme='error']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-error-subtle);
        color: var(--monk-color-bg-error-active);
      }

      /* Ghost Variant - Warning */
      :host([variant='ghost'][color-scheme='warning']) .button {
        background: transparent;
        color: var(--monk-color-bg-warning-active);
      }

      :host([variant='ghost'][color-scheme='warning']) .button:hover:not(:disabled) {
        background: var(--monk-color-bg-warning-subtle);
      }

      :host([variant='ghost'][color-scheme='warning']) .button:active:not(:disabled) {
        background: var(--monk-color-bg-warning-subtle);
      }

      /* Link Variant - All color schemes use text colors */
      :host([variant='link']) .button {
        background: transparent;
        border: none;
        padding: 0;
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      :host([variant='link'][color-scheme='primary']) .button {
        color: var(--monk-color-text-link);
      }

      :host([variant='link'][color-scheme='primary']) .button:hover:not(:disabled) {
        color: var(--monk-color-bg-primary-hover);
      }

      :host([variant='link'][color-scheme='neutral']) .button {
        color: var(--monk-color-text-primary);
      }

      :host([variant='link'][color-scheme='neutral']) .button:hover:not(:disabled) {
        color: var(--monk-color-text-secondary);
      }

      :host([variant='link'][color-scheme='success']) .button {
        color: var(--monk-color-text-success);
      }

      :host([variant='link'][color-scheme='error']) .button {
        color: var(--monk-color-text-error);
      }

      :host([variant='link'][color-scheme='warning']) .button {
        color: var(--monk-color-text-warning);
      }

      /* Disabled State */
      .button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      /* Focus State */
      .button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 var(--monk-focus-ring-width, 2px) var(--monk-focus-ring-color);
        outline-offset: var(--monk-focus-ring-offset, 2px);
      }

      /* Reduced Motion */
      @media (prefers-reduced-motion: reduce) {
        .button {
          transition: none;
        }
      }
    `,
  ];

  protected override render(): TemplateResult {
    const partValue = `button ${this.variant} ${this.colorScheme} ${this.size}`;

    return html`
      <button
        part="${partValue}"
        class="button"
        type="${this.type}"
        ?disabled="${this.disabled}"
        aria-disabled="${this.disabled}"
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-button': MonkButton;
  }
}
