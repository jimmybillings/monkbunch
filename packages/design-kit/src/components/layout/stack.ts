import { html, css, type CSSResultArray, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MonkBaseElement } from '../../core/base-element.js';
import { coreStyles, reducedMotionStyles } from '../../core/styles.js';

/**
 * Spacing scale values (0-16)
 */
export type StackSpacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';

/**
 * Stack direction
 */
export type StackDirection = 'vertical' | 'horizontal';

/**
 * Stack alignment
 */
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';

/**
 * Stack justify
 */
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

/**
 * Stack component - Layouts children with consistent spacing
 *
 * @element monk-stack
 *
 * @example
 * ```html
 * <monk-stack spacing="4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </monk-stack>
 * ```
 *
 * @cssprop --monk-space-* - Spacing tokens (0-16)
 *
 * @csspart stack - The stack container for external styling via ::part()
 */
@customElement('monk-stack')
export class MonkStack extends MonkBaseElement {
  /**
   * Direction of stack (vertical or horizontal)
   * @default 'vertical'
   */
  @property({ type: String, reflect: true })
  direction: StackDirection = 'vertical';

  /**
   * Spacing between children (uses space scale: 0-16)
   * @default '4'
   */
  @property({ type: String, reflect: true })
  spacing: StackSpacing = '4';

  /**
   * Alignment of children on cross axis
   * @default 'stretch'
   */
  @property({ type: String, reflect: true })
  align: StackAlign = 'stretch';

  /**
   * Justify children on main axis
   * @default 'start'
   */
  @property({ type: String, reflect: true })
  justify: StackJustify = 'start';

  /**
   * Whether to wrap children
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  wrap = false;

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      :host {
        display: flex;
        box-sizing: border-box;
      }

      /* Direction */
      :host([direction='vertical']) {
        flex-direction: column;
      }

      :host([direction='horizontal']) {
        flex-direction: row;
      }

      /* Spacing - vertical */
      :host([direction='vertical'][spacing='0']) {
        gap: var(--monk-space-0);
      }
      :host([direction='vertical'][spacing='1']) {
        gap: var(--monk-space-1);
      }
      :host([direction='vertical'][spacing='2']) {
        gap: var(--monk-space-2);
      }
      :host([direction='vertical'][spacing='3']) {
        gap: var(--monk-space-3);
      }
      :host([direction='vertical'][spacing='4']) {
        gap: var(--monk-space-4);
      }
      :host([direction='vertical'][spacing='5']) {
        gap: var(--monk-space-5);
      }
      :host([direction='vertical'][spacing='6']) {
        gap: var(--monk-space-6);
      }
      :host([direction='vertical'][spacing='8']) {
        gap: var(--monk-space-8);
      }
      :host([direction='vertical'][spacing='10']) {
        gap: var(--monk-space-10);
      }
      :host([direction='vertical'][spacing='12']) {
        gap: var(--monk-space-12);
      }
      :host([direction='vertical'][spacing='16']) {
        gap: var(--monk-space-16);
      }

      /* Spacing - horizontal */
      :host([direction='horizontal'][spacing='0']) {
        gap: var(--monk-space-0);
      }
      :host([direction='horizontal'][spacing='1']) {
        gap: var(--monk-space-1);
      }
      :host([direction='horizontal'][spacing='2']) {
        gap: var(--monk-space-2);
      }
      :host([direction='horizontal'][spacing='3']) {
        gap: var(--monk-space-3);
      }
      :host([direction='horizontal'][spacing='4']) {
        gap: var(--monk-space-4);
      }
      :host([direction='horizontal'][spacing='5']) {
        gap: var(--monk-space-5);
      }
      :host([direction='horizontal'][spacing='6']) {
        gap: var(--monk-space-6);
      }
      :host([direction='horizontal'][spacing='8']) {
        gap: var(--monk-space-8);
      }
      :host([direction='horizontal'][spacing='10']) {
        gap: var(--monk-space-10);
      }
      :host([direction='horizontal'][spacing='12']) {
        gap: var(--monk-space-12);
      }
      :host([direction='horizontal'][spacing='16']) {
        gap: var(--monk-space-16);
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
      :host([wrap]) {
        flex-wrap: wrap;
      }
    `,
  ];

  protected override render(): TemplateResult {
    const partValue = `stack ${this.direction}`;
    return html`<slot part="${partValue}"></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-stack': MonkStack;
  }
}
