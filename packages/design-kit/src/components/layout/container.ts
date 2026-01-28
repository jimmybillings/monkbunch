import { html, css, type CSSResultArray, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MonkBaseElement } from '../../core/base-element.js';
import { coreStyles, reducedMotionStyles } from '../../core/styles.js';

/**
 * Container size (maps to breakpoint tokens)
 */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/**
 * Container component - Constrains content width for responsive layouts
 *
 * @element monk-container
 *
 * @example
 * ```html
 * <monk-container size="lg">
 *   <monk-stack spacing="8">
 *     <monk-heading level="h1">Welcome</monk-heading>
 *     <monk-text>Content automatically centers and constrains at lg breakpoint.</monk-text>
 *   </monk-stack>
 * </monk-container>
 * ```
 *
 * @cssprop --monk-container-* - Container max-width tokens
 * @csspart container - The container element
 */
@customElement('monk-container')
export class MonkContainer extends MonkBaseElement {
  /**
   * Maximum width of the container (maps to breakpoint tokens)
   * @default 'xl'
   */
  @property({ type: String, reflect: true })
  size: ContainerSize = 'xl';

  /**
   * Whether to center content horizontally
   * @default true
   */
  @property({ type: Boolean, reflect: true, attribute: 'center-content' })
  centerContent = true;

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .container {
        width: 100%;
        padding-left: var(--monk-space-4);
        padding-right: var(--monk-space-4);
      }

      :host([center-content]) .container {
        margin-left: auto;
        margin-right: auto;
      }

      /* Container sizes */
      :host([size='sm']) .container {
        max-width: var(--monk-container-sm);
      }

      :host([size='md']) .container {
        max-width: var(--monk-container-md);
      }

      :host([size='lg']) .container {
        max-width: var(--monk-container-lg);
      }

      :host([size='xl']) .container {
        max-width: var(--monk-container-xl);
      }

      :host([size='2xl']) .container {
        max-width: var(--monk-container-2xl);
      }

      :host([size='full']) .container {
        max-width: 100%;
      }
    `,
  ];

  protected override render(): TemplateResult {
    return html`
      <div class="container" part="container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-container': MonkContainer;
  }
}
