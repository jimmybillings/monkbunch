import { html, css, type CSSResultArray, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MonkBaseElement } from '../../core/base-element.js';
import { coreStyles, reducedMotionStyles } from '../../core/styles.js';

/**
 * Flex direction
 */
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

/**
 * Flex alignment
 */
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/**
 * Flex justify
 */
export type FlexJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

/**
 * Flex wrap
 */
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Spacing scale values (0-16)
 */
export type FlexGap =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '8'
  | '10'
  | '12'
  | '16';

/**
 * Flex component - Flexbox layout primitive with common patterns
 *
 * @element monk-flex
 *
 * @example
 * ```html
 * <monk-flex justify="between" align="center" gap="4">
 *   <div>Left</div>
 *   <div>Right</div>
 * </monk-flex>
 * ```
 *
 * @cssprop --monk-space-* - Spacing tokens (0-16)
 *
 * @csspart flex - The flex container for external styling via ::part()
 */
@customElement('monk-flex')
export class MonkFlex extends MonkBaseElement {
  /**
   * Flex direction
   * @default 'row'
   */
  @property({ type: String, reflect: true })
  direction: FlexDirection = 'row';

  /**
   * Align items on cross axis
   * @default 'stretch'
   */
  @property({ type: String, reflect: true })
  align: FlexAlign = 'stretch';

  /**
   * Justify content on main axis
   * @default 'start'
   */
  @property({ type: String, reflect: true })
  justify: FlexJustify = 'start';

  /**
   * Flex wrap behavior
   * @default 'nowrap'
   */
  @property({ type: String, reflect: true })
  wrap: FlexWrap = 'nowrap';

  /**
   * Gap between flex items (uses space scale: 0-16)
   */
  @property({ type: String, reflect: true })
  gap?: FlexGap;

  /**
   * Whether flex container should be inline-flex
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  inline = false;

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      :host {
        display: flex;
        box-sizing: border-box;
      }

      :host([inline]) {
        display: inline-flex;
      }

      /* Direction */
      :host([direction='row']) {
        flex-direction: row;
      }
      :host([direction='row-reverse']) {
        flex-direction: row-reverse;
      }
      :host([direction='column']) {
        flex-direction: column;
      }
      :host([direction='column-reverse']) {
        flex-direction: column-reverse;
      }

      /* Alignment */
      :host([align='start']) {
        align-items: flex-start;
      }
      :host([align='center']) {
        align-items: center;
      }
      :host([align='end']) {
        align-items: flex-end;
      }
      :host([align='stretch']) {
        align-items: stretch;
      }
      :host([align='baseline']) {
        align-items: baseline;
      }

      /* Justify */
      :host([justify='start']) {
        justify-content: flex-start;
      }
      :host([justify='center']) {
        justify-content: center;
      }
      :host([justify='end']) {
        justify-content: flex-end;
      }
      :host([justify='between']) {
        justify-content: space-between;
      }
      :host([justify='around']) {
        justify-content: space-around;
      }
      :host([justify='evenly']) {
        justify-content: space-evenly;
      }

      /* Wrap */
      :host([wrap='nowrap']) {
        flex-wrap: nowrap;
      }
      :host([wrap='wrap']) {
        flex-wrap: wrap;
      }
      :host([wrap='wrap-reverse']) {
        flex-wrap: wrap-reverse;
      }

      /* Gap */
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
    `,
  ];

  protected override render(): TemplateResult {
    const partValue = `flex ${this.direction}`;
    return html`<slot part="${partValue}"></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-flex': MonkFlex;
  }
}
