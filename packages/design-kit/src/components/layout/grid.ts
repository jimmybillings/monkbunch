import { html, css, type CSSResultArray, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MonkBaseElement } from '../../core/base-element.js';
import { coreStyles, reducedMotionStyles } from '../../core/styles.js';

/**
 * Grid gap size (maps to spacing scale)
 */
export type GridGap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';

/**
 * Grid auto-flow
 */
export type GridAutoFlow = 'row' | 'column' | 'row-dense' | 'column-dense';

/**
 * Grid component - CSS Grid layout primitive
 *
 * @element monk-grid
 *
 * @example
 * ```html
 * <monk-grid columns="3" gap="4">
 *   <monk-box>1</monk-box>
 *   <monk-box>2</monk-box>
 *   <monk-box>3</monk-box>
 * </monk-grid>
 * ```
 *
 * @cssprop --monk-space-* - Spacing tokens for gap
 * @csspart grid - The grid element
 */
@customElement('monk-grid')
export class MonkGrid extends MonkBaseElement {
  /**
   * Number of columns (can be a number or custom grid-template-columns value)
   * @example columns="3" → grid-template-columns: repeat(3, 1fr)
   * @example columns="200px 1fr 2fr" → grid-template-columns: 200px 1fr 2fr
   */
  @property({ type: String, reflect: true })
  columns?: string;

  /**
   * Number of rows (can be a number or custom grid-template-rows value)
   * @example rows="3" → grid-template-rows: repeat(3, 1fr)
   * @example rows="auto 1fr auto" → grid-template-rows: auto 1fr auto
   */
  @property({ type: String, reflect: true })
  rows?: string;

  /**
   * Gap between grid items (uses spacing scale)
   * @default '4'
   */
  @property({ type: String, reflect: true })
  gap?: GridGap;

  /**
   * Column gap (overrides gap for columns)
   */
  @property({ type: String, reflect: true, attribute: 'column-gap' })
  columnGap?: GridGap;

  /**
   * Row gap (overrides gap for rows)
   */
  @property({ type: String, reflect: true, attribute: 'row-gap' })
  rowGap?: GridGap;

  /**
   * Minimum column width for auto-fit columns
   * @example min-column-width="200px" → grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
   */
  @property({ type: String, reflect: true, attribute: 'min-column-width' })
  minColumnWidth?: string;

  /**
   * Grid auto-flow
   * @default 'row'
   */
  @property({ type: String, reflect: true, attribute: 'auto-flow' })
  autoFlow: GridAutoFlow = 'row';

  /**
   * Whether to use inline-grid instead of grid
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  inline = false;

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      :host {
        display: grid;
      }

      :host([inline]) {
        display: inline-grid;
      }

      /* Gap values */
      :host([gap='0']) {
        gap: var(--monk-space-0);
      }
      :host([gap='1']) {
        gap: var(--monk-space-1);
      }
      :host([gap='2']) {
        gap: var(--monk-space-2);
      }
      :host([gap='3']) {
        gap: var(--monk-space-3);
      }
      :host([gap='4']) {
        gap: var(--monk-space-4);
      }
      :host([gap='5']) {
        gap: var(--monk-space-5);
      }
      :host([gap='6']) {
        gap: var(--monk-space-6);
      }
      :host([gap='8']) {
        gap: var(--monk-space-8);
      }
      :host([gap='10']) {
        gap: var(--monk-space-10);
      }
      :host([gap='12']) {
        gap: var(--monk-space-12);
      }
      :host([gap='16']) {
        gap: var(--monk-space-16);
      }

      /* Column gap values */
      :host([column-gap='0']) {
        column-gap: var(--monk-space-0);
      }
      :host([column-gap='1']) {
        column-gap: var(--monk-space-1);
      }
      :host([column-gap='2']) {
        column-gap: var(--monk-space-2);
      }
      :host([column-gap='3']) {
        column-gap: var(--monk-space-3);
      }
      :host([column-gap='4']) {
        column-gap: var(--monk-space-4);
      }
      :host([column-gap='5']) {
        column-gap: var(--monk-space-5);
      }
      :host([column-gap='6']) {
        column-gap: var(--monk-space-6);
      }
      :host([column-gap='8']) {
        column-gap: var(--monk-space-8);
      }
      :host([column-gap='10']) {
        column-gap: var(--monk-space-10);
      }
      :host([column-gap='12']) {
        column-gap: var(--monk-space-12);
      }
      :host([column-gap='16']) {
        column-gap: var(--monk-space-16);
      }

      /* Row gap values */
      :host([row-gap='0']) {
        row-gap: var(--monk-space-0);
      }
      :host([row-gap='1']) {
        row-gap: var(--monk-space-1);
      }
      :host([row-gap='2']) {
        row-gap: var(--monk-space-2);
      }
      :host([row-gap='3']) {
        row-gap: var(--monk-space-3);
      }
      :host([row-gap='4']) {
        row-gap: var(--monk-space-4);
      }
      :host([row-gap='5']) {
        row-gap: var(--monk-space-5);
      }
      :host([row-gap='6']) {
        row-gap: var(--monk-space-6);
      }
      :host([row-gap='8']) {
        row-gap: var(--monk-space-8);
      }
      :host([row-gap='10']) {
        row-gap: var(--monk-space-10);
      }
      :host([row-gap='12']) {
        row-gap: var(--monk-space-12);
      }
      :host([row-gap='16']) {
        row-gap: var(--monk-space-16);
      }

      /* Auto-flow */
      :host([auto-flow='row']) {
        grid-auto-flow: row;
      }
      :host([auto-flow='column']) {
        grid-auto-flow: column;
      }
      :host([auto-flow='row-dense']) {
        grid-auto-flow: row dense;
      }
      :host([auto-flow='column-dense']) {
        grid-auto-flow: column dense;
      }
    `,
  ];

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }

  protected override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    // Handle dynamic columns
    if (changedProperties.has('columns') && this.columns) {
      const isNumber = /^\d+$/.test(this.columns);
      if (isNumber) {
        this.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
      } else {
        this.style.gridTemplateColumns = this.columns;
      }
    }

    // Handle dynamic rows
    if (changedProperties.has('rows') && this.rows) {
      const isNumber = /^\d+$/.test(this.rows);
      if (isNumber) {
        this.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
      } else {
        this.style.gridTemplateRows = this.rows;
      }
    }

    // Handle min-column-width for auto-fit responsive grids
    if (changedProperties.has('minColumnWidth') && this.minColumnWidth) {
      this.style.gridTemplateColumns = `repeat(auto-fit, minmax(${this.minColumnWidth}, 1fr))`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-grid': MonkGrid;
  }
}
