import { html, css, type CSSResultArray, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MonkBaseElement } from '../../core/base-element.js';
import { coreStyles, reducedMotionStyles } from '../../core/styles.js';

/**
 * Card variant (visual style)
 */
export type CardVariant = 'elevated' | 'outline' | 'filled';

/**
 * Card component - Container for related content and actions
 *
 * @element monk-card
 *
 * @example
 * ```html
 * <!-- Elevated card with shadow -->
 * <monk-card>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </monk-card>
 *
 * <!-- Outline card with border -->
 * <monk-card variant="outline">
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </monk-card>
 *
 * <!-- Interactive card with hover effect -->
 * <monk-card interactive>
 *   <h3>Clickable Card</h3>
 *   <p>This card has hover effects</p>
 * </monk-card>
 * ```
 *
 * @cssprop --monk-color-bg-* - Background color tokens
 * @cssprop --monk-color-border-* - Border color tokens
 * @cssprop --monk-shadow-* - Shadow tokens
 * @cssprop --monk-radius-* - Border radius tokens
 * @cssprop --monk-space-* - Spacing tokens
 *
 * @csspart card - The card container element
 *
 * @slot - Default slot for card content
 */
@customElement('monk-card')
export class MonkCard extends MonkBaseElement {
  /**
   * Visual style variant
   * @default 'elevated'
   */
  @property({ type: String, reflect: true })
  variant: CardVariant = 'elevated';

  /**
   * Whether the card is interactive (adds hover effects)
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  interactive = false;

  /**
   * Padding using space scale (e.g., '4', '6', '8')
   * If not specified, uses variant default
   */
  @property({ type: String, reflect: true })
  padding?: string;

  /**
   * Border radius (e.g., 'sm', 'md', 'lg')
   * @default 'md'
   */
  @property({ type: String, reflect: true })
  radius: string = 'md';

  /**
   * Shadow level (e.g., 'sm', 'md', 'lg', 'xl')
   * Only applies to elevated variant
   */
  @property({ type: String, reflect: true })
  shadow?: string;

  /**
   * Custom background color (overrides variant default)
   */
  @property({ type: String, reflect: true })
  bg?: string;

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      :host {
        display: block;
        box-sizing: border-box;
      }

      .card {
        display: block;
        box-sizing: border-box;
        border-radius: var(--monk-radius-md);
        transition: transform 150ms ease-in-out, box-shadow 150ms ease-in-out;
      }

      @media (prefers-reduced-motion: reduce) {
        .card {
          transition: none;
        }
      }

      /* Variant: Elevated (default) - Card with shadow */
      :host([variant='elevated']) .card {
        background: var(--monk-color-bg-surface);
        box-shadow: var(--monk-shadow-md);
        border: none;
      }

      :host([variant='elevated']:not([padding])) .card {
        padding: var(--monk-space-6);
      }

      /* Variant: Outline - Card with border */
      :host([variant='outline']) .card {
        background: var(--monk-color-bg-canvas);
        border: 1px solid var(--monk-color-border-default);
        box-shadow: none;
      }

      :host([variant='outline']:not([padding])) .card {
        padding: var(--monk-space-6);
      }

      /* Variant: Filled - Card with subtle background */
      :host([variant='filled']) .card {
        background: var(--monk-color-bg-subtle);
        border: none;
        box-shadow: none;
      }

      :host([variant='filled']:not([padding])) .card {
        padding: var(--monk-space-6);
      }

      /* Interactive state */
      :host([interactive]) .card {
        cursor: pointer;
      }

      :host([interactive][variant='elevated']) .card:hover {
        transform: translateY(-2px);
        box-shadow: var(--monk-shadow-lg);
      }

      :host([interactive][variant='outline']) .card:hover {
        border-color: var(--monk-color-border-accent);
        background: var(--monk-color-bg-surface);
      }

      :host([interactive][variant='filled']) .card:hover {
        background: var(--monk-color-bg-muted);
      }

      /* Focus state for interactive cards */
      :host([interactive]) .card:focus-visible {
        outline: var(--monk-focus-ring-width) solid var(--monk-focus-ring-color);
        outline-offset: var(--monk-focus-ring-offset);
      }

      /* Padding scale */
      :host([padding='0']) .card {
        padding: var(--monk-space-0);
      }
      :host([padding='1']) .card {
        padding: var(--monk-space-1);
      }
      :host([padding='2']) .card {
        padding: var(--monk-space-2);
      }
      :host([padding='3']) .card {
        padding: var(--monk-space-3);
      }
      :host([padding='4']) .card {
        padding: var(--monk-space-4);
      }
      :host([padding='5']) .card {
        padding: var(--monk-space-5);
      }
      :host([padding='6']) .card {
        padding: var(--monk-space-6);
      }
      :host([padding='8']) .card {
        padding: var(--monk-space-8);
      }
      :host([padding='10']) .card {
        padding: var(--monk-space-10);
      }
      :host([padding='12']) .card {
        padding: var(--monk-space-12);
      }
      :host([padding='16']) .card {
        padding: var(--monk-space-16);
      }

      /* Border radius */
      :host([radius='none']) .card {
        border-radius: 0;
      }
      :host([radius='sm']) .card {
        border-radius: var(--monk-radius-sm);
      }
      :host([radius='md']) .card {
        border-radius: var(--monk-radius-md);
      }
      :host([radius='lg']) .card {
        border-radius: var(--monk-radius-lg);
      }
      :host([radius='xl']) .card {
        border-radius: var(--monk-radius-xl);
      }

      /* Shadow scale (for elevated variant) */
      :host([shadow='none']) .card {
        box-shadow: none;
      }
      :host([shadow='sm']) .card {
        box-shadow: var(--monk-shadow-sm);
      }
      :host([shadow='md']) .card {
        box-shadow: var(--monk-shadow-md);
      }
      :host([shadow='lg']) .card {
        box-shadow: var(--monk-shadow-lg);
      }
      :host([shadow='xl']) .card {
        box-shadow: var(--monk-shadow-xl);
      }
      :host([shadow='2xl']) .card {
        box-shadow: var(--monk-shadow-2xl);
      }
    `,
  ];

  protected override render(): TemplateResult {
    const partValue = `card ${this.variant}${this.interactive ? ' interactive' : ''}`;

    // Apply custom background if provided
    const style = this.bg ? `background: ${this.bg};` : '';

    return html`
      <div
        part="${partValue}"
        class="card"
        style="${style}"
        role="${this.interactive ? 'button' : 'article'}"
        tabindex="${this.interactive ? '0' : undefined}"
        @click="${this._handleClick}"
        @keydown="${this._handleKeydown}"
      >
        <slot></slot>
      </div>
    `;
  }

  private _handleClick(event: MouseEvent) {
    if (this.interactive) {
      this.dispatchEvent(
        new CustomEvent('card-click', {
          detail: { originalEvent: event },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private _handleKeydown(event: KeyboardEvent) {
    if (this.interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.dispatchEvent(
        new CustomEvent('card-click', {
          detail: { originalEvent: event },
          bubbles: true,
          composed: true,
        })
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-card': MonkCard;
  }
}
