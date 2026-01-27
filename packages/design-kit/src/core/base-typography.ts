import { css, type CSSResultArray } from 'lit';
import { property } from 'lit/decorators.js';
import { MonkBaseElement } from './base-element.js';
import { coreStyles, reducedMotionStyles } from './styles.js';

/**
 * Text alignment options
 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Text transform options
 */
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

/**
 * Base typography component for all text-based elements
 * Provides common typography utilities and styling
 *
 * @fires {CustomEvent} align-change - Fired when text alignment changes
 */
export class MonkBaseTypography extends MonkBaseElement {
  /**
   * Text alignment
   * @default 'left'
   */
  @property({ type: String, reflect: true })
  align: TextAlign = 'left';

  /**
   * Text transformation
   * @default 'none'
   */
  @property({ type: String, reflect: true })
  transform: TextTransform = 'none';

  /**
   * Whether text should be italic
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  italic = false;

  /**
   * Whether text should wrap
   * @default false (text wraps normally)
   */
  @property({ type: Boolean, reflect: true })
  nowrap = false;

  /**
   * Whether to truncate text with ellipsis
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  truncate = false;

  /**
   * Number of lines to clamp (for multi-line truncation)
   * Only applies when truncate is true
   * @default undefined (single line truncation)
   */
  @property({ type: Number, reflect: true, attribute: 'line-clamp' })
  lineClamp?: number;

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      /* Text alignment */
      :host([align='left']) {
        text-align: left;
      }

      :host([align='center']) {
        text-align: center;
      }

      :host([align='right']) {
        text-align: right;
      }

      :host([align='justify']) {
        text-align: justify;
      }

      /* Text transform */
      :host([transform='none']) {
        text-transform: none;
      }

      :host([transform='uppercase']) {
        text-transform: uppercase;
      }

      :host([transform='lowercase']) {
        text-transform: lowercase;
      }

      :host([transform='capitalize']) {
        text-transform: capitalize;
      }

      /* Font style */
      :host([italic]) {
        font-style: italic;
      }

      /* White space control */
      :host([nowrap]) {
        white-space: nowrap;
      }

      /* Single line truncation */
      :host([truncate]:not([line-clamp])) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* Multi-line truncation with line-clamp */
      :host([truncate][line-clamp]) {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      :host([truncate][line-clamp='1']) {
        -webkit-line-clamp: 1;
      }
      :host([truncate][line-clamp='2']) {
        -webkit-line-clamp: 2;
      }
      :host([truncate][line-clamp='3']) {
        -webkit-line-clamp: 3;
      }
      :host([truncate][line-clamp='4']) {
        -webkit-line-clamp: 4;
      }
      :host([truncate][line-clamp='5']) {
        -webkit-line-clamp: 5;
      }
    `,
  ];

  protected override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('align')) {
      this.emitEvent('align-change', { align: this.align });
    }
  }
}
