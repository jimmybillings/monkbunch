import { customElement } from 'lit/decorators.js';
import { BaseInput } from './base-input.js';

/**
 * Text input component - Single-line text input field
 *
 * @element monk-text-input
 *
 * @example
 * ```html
 * <!-- Basic text input -->
 * <monk-text-input label="Name" placeholder="Enter your name"></monk-text-input>
 *
 * <!-- With helper text -->
 * <monk-text-input
 *   label="Username"
 *   helper-text="Choose a unique username"
 * ></monk-text-input>
 *
 * <!-- With error -->
 * <monk-text-input
 *   label="Email"
 *   invalid
 *   error-message="This field is required"
 * ></monk-text-input>
 *
 * <!-- With prefix/suffix -->
 * <monk-text-input label="Website">
 *   <span slot="prefix">https://</span>
 *   <span slot="suffix">.com</span>
 * </monk-text-input>
 *
 * <!-- With character count -->
 * <monk-text-input
 *   label="Bio"
 *   maxlength="100"
 *   show-count
 * ></monk-text-input>
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
@customElement('monk-text-input')
export class MonkTextInput extends BaseInput {
  /**
   * Get the input type
   */
  protected override get inputType(): string {
    return 'text';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-text-input': MonkTextInput;
  }
}
