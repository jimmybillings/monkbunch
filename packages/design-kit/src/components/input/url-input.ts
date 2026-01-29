import { customElement } from 'lit/decorators.js';
import { BaseInput } from './base-input.js';

/**
 * URL input component - URL input with browser validation
 *
 * @element monk-url-input
 *
 * @example
 * ```html
 * <!-- Basic URL input -->
 * <monk-url-input label="Website" placeholder="https://example.com"></monk-url-input>
 *
 * <!-- With validation -->
 * <monk-url-input
 *   label="Portfolio URL"
 *   required
 *   validate
 *   .validators=${[validators.url]}
 *   validation-message="Please enter a valid URL"
 *   helper-text="Include https://"
 * ></monk-url-input>
 * ```
 *
 * @fires input-change - Fired when the input value changes (on input event)
 * @fires input-changed - Fired when the input value is committed (on change event)
 * @fires input-focus - Fired when the input receives focus
 * @fires input-blur - Fired when the input loses focus
 * @fires input-keydown - Fired on keydown event
 * @fires input-invalid - Fired when validation fails
 * @fires input-valid - Fired when validation succeeds
 */
@customElement('monk-url-input')
export class MonkURLInput extends BaseInput {
  protected override get inputType(): string {
    return 'url';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-url-input': MonkURLInput;
  }
}
