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
  /**
   * Cursor position to restore after mask reformats the value
   */
  private cursorPosition: number | null = null;

  protected override get inputType(): string {
    return 'text';
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.initializeMask();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    // Sync programmatically-set values to the input element
    // BaseInput.updated() would overwrite the formatted value, so we handle it manually
    if (changedProperties.has('value') && this._input && !this._input.value.includes('$')) {
      this._input.value = this.formatCurrency(this.value || '0');
    }

    // Restore cursor position after mask reformatting
    if (this.cursorPosition !== null && this._input) {
      this._input.setSelectionRange(this.cursorPosition, this.cursorPosition);
      this.cursorPosition = null;
    }
  }

  protected override _handleInput(event: Event): void {
    this.processInput(event.target as HTMLInputElement, true);
  }

  protected override _handleChange(event: Event): void {
    this.processInput(event.target as HTMLInputElement, false);

    // Trigger validation if validateOn is 'change'
    if (this.validate && this.validateOn === 'change') {
      this.performValidation();
    }

    // Dispatch event with unmasked numeric value (not the formatted display value)
    this.dispatchEvent(
      new CustomEvent('input-changed', {
        detail: { value: this.value, originalEvent: event },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Process input value: extract numeric value, validate decimals, and update cursor
   */
  private processInput(input: HTMLInputElement, trackCursor: boolean): void {
    const cursorPos = input.selectionStart ?? 0;

    // Extract numeric value (digits and decimal point only)
    const numericValue = input.value.replace(/[^0-9.]/g, '');

    // Enforce max 2 decimal places for currency
    if (!this.isValidCurrency(numericValue)) {
      input.value = this.formatCurrency(this.value);
      return;
    }

    // Calculate cursor position before updating value
    // This ensures cursor stays in the right place when commas are added/removed
    if (trackCursor) {
      const beforeCursor = input.value.slice(0, cursorPos).replace(/[^0-9.]/g, '');
      this.cursorPosition = this.calculateCursorPosition(numericValue, beforeCursor.length);
    }

    this.value = numericValue;

    // Trigger validation if enabled
    if (this.validate && this.validateOn === 'input' && trackCursor) {
      this.performValidation();
    }

    // Dispatch event with unmasked numeric value
    if (trackCursor) {
      this.dispatchEvent(
        new CustomEvent('input-change', {
          detail: { value: this.value, originalEvent: event },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  /**
   * Check if value has valid decimal places (max 2 for currency)
   */
  private isValidCurrency(val: string): boolean {
    const parts = val.split('.');
    // Reject multiple decimal points or more than 2 decimal places
    return parts.length <= 2 && (parts.length === 1 || parts[1].length <= 2);
  }

  /**
   * Calculate where cursor should be positioned after formatting
   * @param formattedValue - The numeric value that will be formatted
   * @param numericCharsBeforeCursor - Number of numeric chars before cursor
   * @returns The cursor position in the formatted string
   */
  private calculateCursorPosition(formattedValue: string, numericCharsBeforeCursor: number): number {
    const formatted = this.formatCurrency(formattedValue);
    let numericCount = 0;

    // Find where the nth numeric character ends up in the formatted string
    for (let i = 0; i < formatted.length; i++) {
      if (/[0-9.]/.test(formatted[i])) {
        numericCount++;
        if (numericCount === numericCharsBeforeCursor) {
          return i + 1;
        }
      }
    }

    return formatted.length;
  }

  /**
   * Format a numeric string to currency format
   * Handles decimal places intelligently: shows them only when present
   */
  private formatCurrency(val: string): string {
    if (!val) return '$0';

    // Determine how many characters to slice off for decimal handling
    // If no decimal: slice off ".00" (3 chars)
    // If 1 decimal place: slice off "0" (1 char)
    // If 2 decimal places: slice off nothing (0 chars)
    const decimalIndex = val.indexOf('.');
    const decimalPlaces = decimalIndex === -1 ? 0 : val.length - decimalIndex - 1;
    const charsToSlice = Math.max(0, 3 - decimalPlaces - (decimalIndex === -1 ? 0 : 1));

    const formatted = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(val));

    return charsToSlice > 0 ? formatted.slice(0, -charsToSlice) : formatted;
  }

  /**
   * Initialize the maska input mask for currency formatting
   */
  private initializeMask(): void {
    const inputElement = this._input;
    if (!inputElement) return;

    new MaskInput(inputElement, {
      preProcess: (val) => val.replace(/[$,]/g, ''),
      postProcess: (val) => {
        if (!val) return '';

        // Use same logic as formatCurrency for consistency
        const decimalIndex = val.indexOf('.');
        const decimalPlaces = decimalIndex === -1 ? 0 : val.length - decimalIndex - 1;
        const charsToSlice = Math.max(0, 3 - decimalPlaces - (decimalIndex === -1 ? 0 : 1));

        const formatted = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(parseFloat(val));

        return charsToSlice > 0 ? formatted.slice(0, -charsToSlice) : formatted;
      },
    });

    // Set initial formatted value
    inputElement.value = this.formatCurrency(this.value || '0');
  }

  /**
   * Get the unmasked numeric value
   * Useful for storing in database or sending to API
   */
  public getNumericValue(): number {
    return parseFloat(this.value) || 0;
  }

  /**
   * Get the formatted dollar string with full precision
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
