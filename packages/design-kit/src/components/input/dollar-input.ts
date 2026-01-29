import { customElement } from 'lit/decorators.js';
import { type PropertyValues } from 'lit';
import { MaskInput } from 'maska';
import { BaseInput } from './base-input.js';

/**
 * Dollar input component - Currency amount with $X,XXX.XX format
 *
 * @element monk-dollar-input
 *
 * @example
 * ```html
 * <!-- Basic dollar input -->
 * <monk-dollar-input label="Amount"></monk-dollar-input>
 *
 * <!-- With validation -->
 * <monk-dollar-input
 *   label="Loan Amount"
 *   value="250000"
 *   required
 *   validate
 *   .validators=${[validators.min(1000)]}
 *   validation-message="Minimum loan amount is $1,000"
 * ></monk-dollar-input>
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
@customElement('monk-dollar-input')
export class MonkDollarInput extends BaseInput {
  protected readonly prompt = '0';

  protected override get inputType(): string {
    return 'text';
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.createMask();
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);

    // Re-create mask if $ is missing (value was set programmatically)
    if (this._input && !this._input.value.includes('$')) {
      this.createMask();
    }
  }

  protected override _handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Extract numeric value (remove $ and ,)
    const updatedValue = input.value.replace(/\D/g, '');
    this.value = updatedValue;

    // Trigger validation if enabled
    if (this.validate && this.validateOn === 'input') {
      this.performValidation();
    }

    // Dispatch event with unmasked value
    this.dispatchEvent(
      new CustomEvent('input-change', {
        detail: { value: this.value, originalEvent: event },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Create the currency mask using Intl.NumberFormat
   */
  private createMask(): void {
    const inputElement = this._input;
    if (!inputElement) return;

    if (!inputElement.value) {
      inputElement.value = this.prompt;
    }

    new MaskInput(inputElement, {
      preProcess: (val) => val.replace(/[$,]/g, ''),
      postProcess: (val) => {
        if (!val) return '';

        // Calculate substring position for decimal handling
        const sub = 3 - (val.includes('.') ? val.length - val.indexOf('.') : 0);

        return Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        })
          .format(parseFloat(val))
          .slice(0, sub ? -sub : undefined);
      },
    });
  }

  /**
   * Get the unmasked numeric value
   * Useful for storing in database or sending to API
   */
  public getNumericValue(): number {
    return parseFloat(this.value) || 0;
  }

  /**
   * Get the formatted dollar string
   */
  public getFormattedValue(): string {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.getNumericValue());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-dollar-input': MonkDollarInput;
  }
}
