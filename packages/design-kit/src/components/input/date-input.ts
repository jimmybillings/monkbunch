import { customElement } from 'lit/decorators.js';
import { Mask } from 'maska';
import { type PropertyValues } from 'lit';
import { MaskedInput } from './masked-input.js';

/**
 * Date input component - Date with MM/DD/YYYY format
 *
 * @element monk-date-input
 *
 * @example
 * ```html
 * <!-- Basic date input -->
 * <monk-date-input label="Birth Date"></monk-date-input>
 *
 * <!-- With validation -->
 * <monk-date-input
 *   label="Expiration Date"
 *   required
 *   validate
 *   .validators=${[validators.futureDate]}
 *   validation-message="Date must be in the future"
 * ></monk-date-input>
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
@customElement('monk-date-input')
export class MonkDateInput extends MaskedInput {
  protected readonly prompt = 'MM/DD/YYYY';
  protected readonly mask: Mask = new Mask({ eager: false, mask: '##/##/####' });

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    // Convert different date formats to unmasked format (MMDDYYYY) BEFORE rendering
    if (changedProperties.has('value')) {
      // Convert ISO format (YYYY-MM-DD) to unmasked format (MMDDYYYY)
      const apiDatePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (apiDatePattern.test(this.value)) {
        const [year, month, day] = this.value.split('T')[0].split('-');
        this.value = `${month}${day}${year}`;
      }

      // Convert UI format with slashes (MM/DD/YYYY or M/D/YYYY) to unmasked format
      const uiDatePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      if (uiDatePattern.test(this.value)) {
        const [month, day, year] = this.value.split('/');
        this.value = `${month.padStart(2, '0')}${day.padStart(2, '0')}${year}`;
      }
    }

    super.willUpdate(changedProperties);
  }

  /**
   * Format unmasked date string (MMDDYYYY) to ISO format (YYYY-MM-DD)
   */
  private formatUnmaskedToApi(unmasked: string): string {
    if (unmasked.length !== 8) {
      return '';
    }
    const month = unmasked.slice(0, 2);
    const day = unmasked.slice(2, 4);
    const year = unmasked.slice(4, 8);
    return `${year}-${month}-${day}`;
  }

  /**
   * Get the date value in ISO format (YYYY-MM-DD) for API submission
   */
  public getApiValue(): string {
    return this.formatUnmaskedToApi(this.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-date-input': MonkDateInput;
  }
}
