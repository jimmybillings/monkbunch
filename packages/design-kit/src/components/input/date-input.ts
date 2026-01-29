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

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);

    // Convert ISO date format (YYYY-MM-DD) to UI format (MM/DD/YYYY) if needed
    const apiDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (this._input && apiDatePattern.test(this._input.value)) {
      this._input.value = this.formatDateApiToUi(this._input.value);
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    // Convert API format to UI format before maska initialization
    if (this._input) {
      const apiDatePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (apiDatePattern.test(this._input.value)) {
        this._input.value = this.formatDateApiToUi(this._input.value);
      }
    }
    super.firstUpdated(changedProperties);
  }

  /**
   * Format ISO date string (YYYY-MM-DD) to UI format (MM/DD/YYYY)
   */
  private formatDateApiToUi(isoString: string): string {
    const [year, month, day] = isoString.split('T')[0].split('-');
    return `${month}/${day}/${year}`;
  }

  /**
   * Format UI date string (MM/DD/YYYY) to ISO format (YYYY-MM-DD)
   */
  public formatDateUiToApi(uiString: string): string {
    const [month, day, year] = uiString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  /**
   * Get the date value in ISO format (YYYY-MM-DD) for API submission
   */
  public getApiValue(): string {
    return this.formatDateUiToApi(this.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-date-input': MonkDateInput;
  }
}
