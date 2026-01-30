import { type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { type Mask, MaskInput } from 'maska';
import { BaseInput } from './base-input.js';

/**
 * Abstract base class for masked input components
 * Uses maska library for input masking with smart cursor positioning
 *
 * @abstract
 */
export abstract class MaskedInput extends BaseInput {
  /**
   * Prompt to show when input is empty (e.g., "MM/DD/YYYY", "(###) ###-####")
   */
  protected abstract readonly prompt: string;

  /**
   * Maska mask configuration
   */
  protected abstract readonly mask: Mask;

  /**
   * Internal cursor position override for smart cursor positioning
   */
  private cursorPositionOverride: number | null = null;

  /**
   * Get the input type (defaults to 'text' for masked inputs)
   */
  protected override get inputType(): string {
    return 'text';
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);

    // Move cursor to appropriate position after mask is applied
    if (this.cursorPositionOverride !== null) {
      this._input?.setSelectionRange(this.cursorPositionOverride, this.cursorPositionOverride);
      this.cursorPositionOverride = null;
    }
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    // Override BaseInput's updated to sync unmasked value to masked display
    if (changedProperties.has('value') && this._input) {
      const maskedValue = this.mask.masked(this.value);
      const displayValue = `${maskedValue}${this.prompt.slice(maskedValue.length)}`;

      if (this._input.value !== displayValue) {
        this._input.value = displayValue;
      }
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    const inputElement = this._input;
    if (!inputElement) return;

    // Set initial prompt if empty
    if (!inputElement.value) {
      inputElement.value = this.prompt;
    }

    // Initialize MaskInput with smart cursor positioning
    new MaskInput(inputElement, {
      ...this.mask.opts,
      postProcess: (v) => {
        // Called after text field is updated, but before mask is applied
        // Adjust cursor position to place it after most recently typed character,
        // accounting for changes due to mask application

        // Cursor position after most recent change in the raw input
        const idxLead = inputElement.selectionStart ?? 0;

        // Determine the length of the leading part of value after mask application

        // Lead part before formatting (may not conform to mask)
        // e.g., for phone mask "(###) ###-####" leadRaw may be "(1234)" after typing "4"
        const leadRaw = inputElement.value.slice(0, idxLead);

        // By unmasking and masking again, ensure the lead is formatted properly
        // e.g., in the example above it becomes "(123) 4"
        const leadMasked = this.mask.masked(this.mask.unmasked(leadRaw));

        // After leading part is properly formatted, the new cursor position is right after it
        this.cursorPositionOverride = leadMasked.length;
        return v;
      },
      onMaska: (v) => {
        // maska doesn't display full prompt, so manually append it
        // e.g., "01/01/2" -> "01/01/2YYY"
        inputElement.value = `${v.masked}${this.prompt.slice(v.masked.length)}`;
      },
    });

    // Prevent forcing cursor to always be at the end of the input after initial render
    this.cursorPositionOverride = null;
  }

  protected override _handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Store unmasked value, but display masked value
    const unmaskedValue = this.mask.unmasked(input.value);
    this.value = unmaskedValue;

    // Trigger validation if validateOn is 'input'
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

  protected override _handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Store unmasked value
    const unmaskedValue = this.mask.unmasked(input.value);
    this.value = unmaskedValue;

    // Trigger validation if validateOn is 'change'
    if (this.validate && this.validateOn === 'change') {
      this.performValidation();
    }

    // Dispatch event with unmasked value
    this.dispatchEvent(
      new CustomEvent('input-changed', {
        detail: { value: this.value, originalEvent: event },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Get the unmasked value (raw digits/characters)
   * Useful for storing in database or sending to API
   */
  public getUnmaskedValue(): string {
    return this.mask.unmasked(this.value);
  }

  /**
   * Get the masked value (formatted)
   */
  public getMaskedValue(): string {
    return this.mask.masked(this.value);
  }
}
