import { html, css, type CSSResultArray, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MonkBaseElement } from '../../core/base-element.js';
import { coreStyles, reducedMotionStyles } from '../../core/styles.js';

/**
 * Divider orientation
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider variant (line style)
 */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/**
 * Divider thickness
 */
export type DividerThickness = 'thin' | 'medium' | 'thick';

/**
 * Divider component - Visual separator with optional label
 *
 * @element monk-divider
 *
 * @example
 * ```html
 * <!-- Simple horizontal divider -->
 * <monk-divider></monk-divider>
 *
 * <!-- With label -->
 * <monk-divider label="OR"></monk-divider>
 *
 * <!-- Vertical divider -->
 * <monk-divider orientation="vertical"></monk-divider>
 *
 * <!-- Dashed style -->
 * <monk-divider variant="dashed"></monk-divider>
 *
 * <!-- Custom color -->
 * <monk-divider color="#ff6b6b"></monk-divider>
 * ```
 *
 * @cssprop --divider-color - Custom divider color (overrides semantic colors)
 * @cssprop --divider-thickness - Custom thickness value
 * @cssprop --monk-color-border-* - Semantic border color tokens
 * @cssprop --monk-space-* - Spacing tokens
 *
 * @csspart divider - The divider container
 * @csspart line - The divider line element
 * @csspart label - The label text (when present)
 */
@customElement('monk-divider')
export class MonkDivider extends MonkBaseElement {
  /**
   * Orientation of the divider
   * @default 'horizontal'
   */
  @property({ type: String, reflect: true })
  orientation: DividerOrientation = 'horizontal';

  /**
   * Visual style variant (line style)
   * @default 'solid'
   */
  @property({ type: String, reflect: true })
  variant: DividerVariant = 'solid';

  /**
   * Thickness of the divider line
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  thickness: DividerThickness = 'medium';

  /**
   * Optional label text (appears in the middle of the divider)
   * Only works with horizontal orientation
   */
  @property({ type: String, reflect: true })
  label?: string;

  /**
   * Custom divider color (overrides semantic colors)
   * Example: "#ff6b6b" or "rgb(255, 107, 107)"
   */
  @property({ type: String, reflect: true })
  color?: string;

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      :host {
        display: block;
        box-sizing: border-box;
      }

      /* Default horizontal orientation */
      :host([orientation='horizontal']) {
        width: 100%;
        --divider-color: var(--monk-color-border-default);
      }

      /* Vertical orientation */
      :host([orientation='vertical']) {
        height: 100%;
        display: inline-flex;
        align-self: stretch;
        --divider-color: var(--monk-color-border-default);
      }

      /* Divider container */
      .divider {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      :host([orientation='horizontal']) .divider {
        flex-direction: row;
      }

      :host([orientation='vertical']) .divider {
        flex-direction: column;
        justify-content: center;
      }

      /* Divider line */
      .line {
        flex: 1;
        border: none;
        background: transparent;
      }

      /* Horizontal lines */
      :host([orientation='horizontal']) .line {
        height: 0;
        border-top-style: var(--line-style, solid);
        border-top-color: var(--divider-color);
        border-top-width: var(--divider-thickness);
      }

      /* Vertical lines */
      :host([orientation='vertical']) .line {
        width: 0;
        border-left-style: var(--line-style, solid);
        border-left-color: var(--divider-color);
        border-left-width: var(--divider-thickness);
      }

      /* Variant: solid */
      :host([variant='solid']) {
        --line-style: solid;
      }

      /* Variant: dashed */
      :host([variant='dashed']) {
        --line-style: dashed;
      }

      /* Variant: dotted */
      :host([variant='dotted']) {
        --line-style: dotted;
      }

      /* Thickness: thin */
      :host([thickness='thin']) {
        --divider-thickness: 1px;
      }

      /* Thickness: medium (default) */
      :host([thickness='medium']) {
        --divider-thickness: 1px;
      }

      /* Thickness: thick */
      :host([thickness='thick']) {
        --divider-thickness: 2px;
      }

      /* Label styling */
      .label {
        padding: 0 var(--monk-space-3);
        color: var(--monk-color-text-secondary);
        font-size: var(--monk-font-size-sm);
        font-weight: var(--monk-font-weight-medium);
        white-space: nowrap;
        letter-spacing: 0.05em;
      }

      :host([orientation='vertical']) .label {
        padding: var(--monk-space-3) 0;
        writing-mode: vertical-rl;
        text-orientation: mixed;
      }

      /* When label is present, lines should not span full width */
      :host([label]) .line {
        flex: 1;
      }

      /* Accessibility: Ensure divider is not focusable */
      :host {
        pointer-events: none;
      }
    `,
  ];

  protected override render(): TemplateResult {
    const partValue = `divider ${this.orientation} ${this.variant} ${this.thickness}`;

    // Apply custom color if provided
    if (this.color) {
      this.style.setProperty('--divider-color', this.color);
    }

    const hasLabel = this.label && this.orientation === 'horizontal';

    return html`
      <div part="${partValue}" class="divider" role="separator" aria-orientation="${this.orientation}">
        <hr part="line" class="line" />
        ${hasLabel
          ? html`
              <span part="label" class="label">${this.label}</span>
              <hr part="line" class="line" />
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-divider': MonkDivider;
  }
}
