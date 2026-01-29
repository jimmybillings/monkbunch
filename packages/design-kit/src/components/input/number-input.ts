import { customElement } from 'lit/decorators.js';
import { BaseInput } from './base-input.js';

/**
 * Number input component - Numeric input with spinner controls
 *
 * @element monk-number-input
 *
 * @example
 * ```html
 * <!-- Basic number input -->
 * <monk-number-input label="Age"></monk-number-input>
 *
 * <!-- With validation -->
 * <monk-number-input
 *   label="Quantity"
 *   value="1"
 *   required
 *   validate
 *   .validators=${[validators.min(1), validators.max(100)]}
 *   validation-message="Quantity must be between 1 and 100"
 * ></monk-number-input>
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
@customElement('monk-number-input')
export class MonkNumberInput extends BaseInput {
  protected override get inputType(): string {
    return 'number';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-number-input': MonkNumberInput;
  }
}
