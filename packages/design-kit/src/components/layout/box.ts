import { html, css, type CSSResultArray, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MonkBaseElement } from '../../core/base-element.js';
import { coreStyles, reducedMotionStyles } from '../../core/styles.js';

/**
 * Display modes for box
 */
export type BoxDisplay = 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid';

/**
 * Spacing scale values (0-16)
 */
export type SpacingScale = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';

/**
 * Background color semantic tokens
 */
export type BoxBg = 'canvas' | 'surface' | 'surface-raised' | 'subtle' | 'muted' | 'accent' | 'accent-subtle';

/**
 * Border radius scale
 */
export type BoxRadius = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Shadow scale
 */
export type BoxShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Box component - The foundational layout primitive
 *
 * @element monk-box
 *
 * @example
 * ```html
 * <monk-box padding="4" bg="surface" radius="md">
 *   <p>Content goes here</p>
 * </monk-box>
 *
 * <monk-box display="flex" padding="8" shadow="card">
 *   <p>Card content</p>
 * </monk-box>
 * ```
 *
 * @accessibility
 * - Uses semantic div element
 * - Proper color contrast maintained through semantic tokens
 * - Respects prefers-reduced-motion for transitions
 * - Supports all standard ARIA attributes
 *
 * @cssprop --monk-space-* - Spacing tokens (0-16)
 * @cssprop --monk-color-bg-* - Background color tokens
 * @cssprop --monk-color-border-* - Border color tokens
 * @cssprop --monk-shadow-* - Shadow tokens
 * @cssprop --monk-radius-* - Border radius tokens
 *
 * @csspart box - The box element for external styling via ::part()
 */
@customElement('monk-box')
export class MonkBox extends MonkBaseElement {
  /**
   * Display mode
   * @default 'block'
   */
  @property({ type: String, reflect: true })
  display: BoxDisplay = 'block';

  /**
   * Padding (uses space scale: 0-16)
   * @default undefined
   */
  @property({ type: String, reflect: true })
  padding?: SpacingScale;

  /**
   * Margin (uses space scale: 0-16)
   * @default undefined
   */
  @property({ type: String, reflect: true })
  margin?: SpacingScale;

  /**
   * Background color (semantic token name)
   * @default undefined
   */
  @property({ type: String, reflect: true })
  bg?: BoxBg;

  /**
   * Border width (in pixels)
   * @default undefined
   */
  @property({ type: String, reflect: true })
  border?: string;

  /**
   * Border radius (uses radius scale)
   * @default undefined
   */
  @property({ type: String, reflect: true })
  radius?: BoxRadius;

  /**
   * Box shadow (uses shadow scale)
   * @default undefined
   */
  @property({ type: String, reflect: true })
  shadow?: BoxShadow;

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      :host {
        box-sizing: border-box;
      }

      .box {
        box-sizing: border-box;
      }

      /* Display modes */
      :host([display='block']) .box { display: block; }
      :host([display='inline-block']) .box { display: inline-block; }
      :host([display='flex']) .box { display: flex; }
      :host([display='inline-flex']) .box { display: inline-flex; }
      :host([display='grid']) .box { display: grid; }
      :host([display='inline-grid']) .box { display: inline-grid; }

      /* Padding (single values) */
      :host([padding='0']) .box { padding: var(--monk-space-0); }
      :host([padding='1']) .box { padding: var(--monk-space-1); }
      :host([padding='2']) .box { padding: var(--monk-space-2); }
      :host([padding='3']) .box { padding: var(--monk-space-3); }
      :host([padding='4']) .box { padding: var(--monk-space-4); }
      :host([padding='5']) .box { padding: var(--monk-space-5); }
      :host([padding='6']) .box { padding: var(--monk-space-6); }
      :host([padding='8']) .box { padding: var(--monk-space-8); }
      :host([padding='10']) .box { padding: var(--monk-space-10); }
      :host([padding='12']) .box { padding: var(--monk-space-12); }
      :host([padding='16']) .box { padding: var(--monk-space-16); }

      /* Margin (single values) */
      :host([margin='0']) .box { margin: var(--monk-space-0); }
      :host([margin='1']) .box { margin: var(--monk-space-1); }
      :host([margin='2']) .box { margin: var(--monk-space-2); }
      :host([margin='3']) .box { margin: var(--monk-space-3); }
      :host([margin='4']) .box { margin: var(--monk-space-4); }
      :host([margin='5']) .box { margin: var(--monk-space-5); }
      :host([margin='6']) .box { margin: var(--monk-space-6); }
      :host([margin='8']) .box { margin: var(--monk-space-8); }
      :host([margin='10']) .box { margin: var(--monk-space-10); }
      :host([margin='12']) .box { margin: var(--monk-space-12); }
      :host([margin='16']) .box { margin: var(--monk-space-16); }

      /* Background colors */
      :host([bg='canvas']) .box { background: var(--monk-color-bg-canvas); }
      :host([bg='surface']) .box { background: var(--monk-color-bg-surface); }
      :host([bg='surface-raised']) .box { background: var(--monk-color-bg-surface-raised); }
      :host([bg='subtle']) .box { background: var(--monk-color-bg-subtle); }
      :host([bg='muted']) .box { background: var(--monk-color-bg-muted); }
      :host([bg='accent']) .box { background: var(--monk-color-bg-accent); }
      :host([bg='accent-subtle']) .box { background: var(--monk-color-bg-accent-subtle); }

      /* Border */
      :host([border]) .box {
        border-width: 1px;
        border-style: solid;
        border-color: var(--monk-color-border-default);
      }

      /* Shadows */
      :host([shadow='none']) .box { box-shadow: var(--monk-shadow-none); }
      :host([shadow='sm']) .box { box-shadow: var(--monk-shadow-sm); }
      :host([shadow='md']) .box { box-shadow: var(--monk-shadow-md); }
      :host([shadow='lg']) .box { box-shadow: var(--monk-shadow-lg); }
      :host([shadow='xl']) .box { box-shadow: var(--monk-shadow-xl); }
      :host([shadow='2xl']) .box { box-shadow: var(--monk-shadow-2xl); }

      /* Border radius */
      :host([radius='sm']) .box { border-radius: var(--monk-radius-sm); }
      :host([radius='md']) .box { border-radius: var(--monk-radius-md); }
      :host([radius='lg']) .box { border-radius: var(--monk-radius-lg); }
      :host([radius='xl']) .box { border-radius: var(--monk-radius-xl); }
      :host([radius='full']) .box { border-radius: var(--monk-radius-full); }

      /* Smooth transitions for interactive boxes */
      .box {
        transition: box-shadow var(--monk-duration-normal, 250ms) var(--monk-easing-ease-out, ease-out);
      }

      @media (prefers-reduced-motion: reduce) {
        .box {
          transition: none;
        }
      }
    `,
  ];

  protected override render(): TemplateResult {
    // Part value includes display mode for targeted styling
    const partValue = `box ${this.display}`;

    return html`<div part="${partValue}" class="box"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-box': MonkBox;
  }
}
