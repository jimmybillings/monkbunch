import { customElement } from 'lit/decorators.js';
import { BaseInput } from './base-input.js';

/**
 * Email input component - Email address input field with validation
 *
 * @element monk-email-input
 *
 * @example
 * ```html
 * <!-- Basic email input -->
 * <monk-email-input label="Email" placeholder="you@example.com"></monk-email-input>
 *
 * <!-- With validation -->
 * <monk-email-input
 *   label="Email Address"
 *   required
 *   invalid
 *   error-message="Please enter a valid email address"
 * ></monk-email-input>
 *
 * <!-- With prefix icon -->
 * <monk-email-input label="Email">
 *   <span slot="prefix">📧</span>
 * </monk-email-input>
 * ```
 *
 * @fires input-change - Fired when the input value changes (on input event)
 * @fires input-changed - Fired when the input value is committed (on change event)
 * @fires input-focus - Fired when the input receives focus
 * @fires input-blur - Fired when the input loses focus
 * @fires input-keydown - Fired on keydown event
 *
 * @cssprop --monk-color-border-* - Border color tokens
 * @cssprop --monk-color-bg-* - Background color tokens
 * @cssprop --monk-color-text-* - Text color tokens
 * @cssprop --monk-font-size-* - Font size tokens
 * @cssprop --monk-space-* - Spacing tokens
 *
 * @csspart wrapper - The wrapper container
 * @csspart input-container - The input container
 * @csspart input - The native input element
 *
 * @slot prefix - Content to display before the input (e.g., icons, text)
 * @slot suffix - Content to display after the input (e.g., icons, buttons)
 */
@customElement('monk-email-input')
export class MonkEmailInput extends BaseInput {
  /**
   * Get the input type
   */
  protected override get inputType(): string {
    return 'email';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-email-input': MonkEmailInput;
  }
}
