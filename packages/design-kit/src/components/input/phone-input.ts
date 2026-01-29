import { customElement } from 'lit/decorators.js';
import { Mask } from 'maska';
import { type PropertyValues } from 'lit';
import { MaskedInput } from './masked-input.js';

/**
 * Phone input component - US phone number with (XXX) XXX-XXXX format
 *
 * @element monk-phone-input
 *
 * @example
 * ```html
 * <!-- Basic phone input -->
 * <monk-phone-input label="Phone Number"></monk-phone-input>
 *
 * <!-- With validation -->
 * <monk-phone-input
 *   label="Phone"
 *   required
 *   validate
 *   helper-text="Enter your 10-digit phone number"
 * ></monk-phone-input>
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
@customElement('monk-phone-input')
export class MonkPhoneInput extends MaskedInput {
  protected readonly prompt = '(###) ###-####';
  protected readonly mask: Mask = new Mask({ eager: false, mask: '(###) ###-####' });

  protected override get inputType(): string {
    return 'tel';
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);

    // Format phone number if pasted without mask
    if (!this._input?.value.includes('-')) {
      this._input.value = this.formatPhoneNumber(this._input.value);
    }
  }

  /**
   * Format a raw phone number string to (XXX) XXX-XXXX
   */
  private formatPhoneNumber(input: string): string {
    const cleaned = input.replace(/\D/g, '');

    if (cleaned.length === 10) {
      const areaCode = cleaned.slice(0, 3);
      const firstPart = cleaned.slice(3, 6);
      const secondPart = cleaned.slice(6, 10);
      return `(${areaCode}) ${firstPart}-${secondPart}`;
    }

    return input;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-phone-input': MonkPhoneInput;
  }
}
