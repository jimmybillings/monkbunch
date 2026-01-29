import { html, css, type CSSResultArray, type PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { MonkBaseElement } from '../../core/base-element.js';
import { coreStyles, reducedMotionStyles } from '../../core/styles.js';
import { type ValidatorFn } from './validators.js';

/**
 * Input size
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Input variant (visual style)
 */
export type InputVariant = 'outline' | 'filled' | 'flushed';

/**
 * When to trigger validation
 */
export type ValidateOn = 'blur' | 'input' | 'change' | 'submit';

/**
 * Base input class for all input components
 * Provides common functionality for text, email, password, etc.
 */
export abstract class BaseInput extends MonkBaseElement {
  /**
   * Input size
   * @default 'md'
   */
  @property({ type: String, reflect: true })
  size: InputSize = 'md';

  /**
   * Visual style variant
   * @default 'outline'
   */
  @property({ type: String, reflect: true })
  variant: InputVariant = 'outline';

  /**
   * Input name (for forms)
   */
  @property({ type: String, reflect: true })
  name?: string;

  /**
   * Input value
   */
  @property({ type: String })
  value = '';

  /**
   * Placeholder text
   */
  @property({ type: String })
  placeholder?: string;

  /**
   * Label text
   */
  @property({ type: String })
  label?: string;

  /**
   * Helper text (appears below input)
   */
  @property({ type: String, attribute: 'helper-text' })
  helperText?: string;

  /**
   * Error message (appears below input, replaces helper text)
   */
  @property({ type: String, attribute: 'error-message' })
  errorMessage?: string;

  /**
   * Whether the input is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the input is readonly
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the input is required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the input is invalid (shows error state)
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * Autocomplete attribute
   */
  @property({ type: String })
  autocomplete?: string;

  /**
   * Maximum length
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Whether to show character count
   * @default false
   */
  @property({ type: Boolean, attribute: 'show-count' })
  showCount = false;

  /**
   * Enable automatic validation
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  validate = false;

  /**
   * When to validate
   * - 'blur': Validate when input loses focus (recommended)
   * - 'input': Validate on every keystroke
   * - 'change': Validate on change event
   * - 'submit': Only validate when explicitly called (form submit)
   * @default 'blur'
   */
  @property({ type: String, attribute: 'validate-on' })
  validateOn: ValidateOn = 'blur';

  /**
   * Array of custom validator functions
   * Each function receives the input value and returns true if valid
   */
  @property({ type: Array, attribute: false })
  validators?: ValidatorFn[];

  /**
   * Custom validation error message
   * Used when custom validators fail
   */
  @property({ type: String, attribute: 'validation-message' })
  validationMessage?: string;

  /**
   * Internal focus state
   */
  @state()
  protected _focused = false;

  /**
   * Reference to the native input element
   */
  @query('input')
  protected _input!: HTMLInputElement;

  /**
   * Get the input type (to be implemented by subclasses)
   */
  protected abstract get inputType(): string;

  static override styles: CSSResultArray = [
    coreStyles,
    reducedMotionStyles,
    css`
      :host {
        display: block;
        box-sizing: border-box;
        font-family: var(--monk-font-family-base);
      }

      .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--monk-space-2);
      }

      /* Label */
      .label {
        display: flex;
        align-items: center;
        gap: var(--monk-space-1);
        font-size: var(--monk-font-size-sm);
        font-weight: var(--monk-font-weight-medium);
        color: var(--monk-color-text-primary);
      }

      .required-indicator {
        color: var(--monk-color-text-error);
      }

      /* Input container */
      .input-container {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--monk-space-2);
        transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out;
      }

      /* Variant: Outline (default) */
      :host([variant='outline']) .input-container {
        border: 1px solid var(--monk-color-border-default);
        border-radius: var(--monk-radius-md);
        background: var(--monk-color-bg-canvas);
      }

      :host([variant='outline']) .input-container:hover:not(.disabled) {
        border-color: var(--monk-color-border-accent);
      }

      :host([variant='outline']) .input-container.focused {
        border-color: var(--monk-color-border-accent);
        box-shadow: 0 0 0 3px var(--monk-focus-ring-color);
      }

      :host([variant='outline'][invalid]) .input-container {
        border-color: var(--monk-color-border-error);
      }

      :host([variant='outline'][invalid]) .input-container.focused {
        border-color: var(--monk-color-border-error);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }

      /* Variant: Filled */
      :host([variant='filled']) .input-container {
        border: 1px solid transparent;
        border-radius: var(--monk-radius-md);
        background: var(--monk-color-bg-subtle);
      }

      :host([variant='filled']) .input-container:hover:not(.disabled) {
        background: var(--monk-color-bg-muted);
      }

      :host([variant='filled']) .input-container.focused {
        border-color: var(--monk-color-border-accent);
        background: var(--monk-color-bg-canvas);
        box-shadow: 0 0 0 3px var(--monk-focus-ring-color);
      }

      :host([variant='filled'][invalid]) .input-container {
        border-color: var(--monk-color-border-error);
      }

      :host([variant='filled'][invalid]) .input-container.focused {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }

      /* Variant: Flushed (underline only) */
      :host([variant='flushed']) .input-container {
        border: none;
        border-bottom: 2px solid var(--monk-color-border-default);
        border-radius: 0;
        background: transparent;
        padding-left: 0;
        padding-right: 0;
      }

      :host([variant='flushed']) .input-container:hover:not(.disabled) {
        border-bottom-color: var(--monk-color-border-accent);
      }

      :host([variant='flushed']) .input-container.focused {
        border-bottom-color: var(--monk-color-border-accent);
      }

      :host([variant='flushed'][invalid]) .input-container {
        border-bottom-color: var(--monk-color-border-error);
      }

      /* Size: Small */
      :host([size='sm']) .input-container {
        padding: var(--monk-space-2) var(--monk-space-3);
        min-height: 32px;
      }

      :host([size='sm']) input {
        font-size: var(--monk-font-size-sm);
      }

      /* Size: Medium (default) */
      :host([size='md']) .input-container {
        padding: var(--monk-space-3) var(--monk-space-4);
        min-height: 40px;
      }

      :host([size='md']) input {
        font-size: var(--monk-font-size-base);
      }

      /* Size: Large */
      :host([size='lg']) .input-container {
        padding: var(--monk-space-4) var(--monk-space-5);
        min-height: 48px;
      }

      :host([size='lg']) input {
        font-size: var(--monk-font-size-lg);
      }

      /* Native input */
      input {
        flex: 1;
        border: none;
        background: transparent;
        color: var(--monk-color-text-primary);
        font-family: inherit;
        line-height: var(--monk-font-lineHeight-normal);
        outline: none;
        width: 100%;
        min-width: 0;
      }

      input::placeholder {
        color: var(--monk-color-text-secondary);
        opacity: 0.6;
      }

      input:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      /* Disabled state */
      .input-container.disabled {
        opacity: 0.6;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Readonly state */
      :host([readonly]) input {
        cursor: default;
      }

      /* Prefix and suffix slots */
      ::slotted([slot='prefix']),
      ::slotted([slot='suffix']) {
        display: flex;
        align-items: center;
        color: var(--monk-color-text-secondary);
      }

      /* Helper text and error message */
      .helper-text,
      .error-message {
        font-size: var(--monk-font-size-sm);
        line-height: var(--monk-font-lineHeight-tight);
      }

      .helper-text {
        color: var(--monk-color-text-secondary);
      }

      .error-message {
        color: var(--monk-color-text-error);
      }

      /* Character count */
      .char-count {
        font-size: var(--monk-font-size-xs);
        color: var(--monk-color-text-secondary);
        text-align: right;
      }

      :host([invalid]) .char-count {
        color: var(--monk-color-text-error);
      }

      @media (prefers-reduced-motion: reduce) {
        .input-container {
          transition: none;
        }
      }
    `,
  ];

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    // Sync initial value
    if (this._input && this.value) {
      this._input.value = this.value;
    }
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    // Sync value to native input
    if (changedProperties.has('value') && this._input) {
      if (this._input.value !== this.value) {
        this._input.value = this.value;
      }
    }
  }

  /**
   * Focus the input
   */
  focus(options?: FocusOptions): void {
    this._input?.focus(options);
  }

  /**
   * Blur the input
   */
  blur(): void {
    this._input?.blur();
  }

  /**
   * Select the input text
   */
  select(): void {
    this._input?.select();
  }

  /**
   * Check if the input passes HTML5 constraint validation
   * @returns true if valid, false otherwise
   */
  public checkValidity(): boolean {
    return this._input?.checkValidity() ?? true;
  }

  /**
   * Check validity and show browser validation UI if invalid
   * @returns true if valid, false otherwise
   */
  public reportValidity(): boolean {
    return this._input?.reportValidity() ?? true;
  }

  /**
   * Set a custom validation message
   * Pass an empty string to clear the error
   * @param message - Error message or empty string to clear
   */
  public setCustomValidity(message: string): void {
    this._input?.setCustomValidity(message);
    if (message) {
      this.invalid = true;
      this.errorMessage = message;
    } else {
      this.invalid = false;
      this.errorMessage = '';
    }
  }

  /**
   * Convenience method to set an error (alias for setCustomValidity)
   * @param message - Error message
   */
  public setError(message: string): void {
    this.setCustomValidity(message);
  }

  /**
   * Convenience method to clear error (alias for setCustomValidity(''))
   */
  public clearError(): void {
    this.setCustomValidity('');
  }

  /**
   * Manually trigger validation
   * Runs custom validators first, then HTML5 validation
   * @returns true if valid, false if invalid
   */
  public performValidation(): boolean {
    if (!this.validate) return true;

    // Run custom validators first
    if (this.validators && this.validators.length > 0) {
      const hasError = this.validators.some((validator) => !validator(this.value));
      if (hasError) {
        this.invalid = true;
        this.errorMessage = this.validationMessage || 'Validation failed';
        this.dispatchEvent(
          new CustomEvent('input-invalid', {
            detail: { value: this.value, message: this.errorMessage },
            bubbles: true,
            composed: true,
          })
        );
        return false;
      }
    }

    // Then check HTML5 validity
    const isValid = this.checkValidity();
    this.invalid = !isValid;

    if (!isValid) {
      this.errorMessage = this.validationMessage || this._input.validationMessage;
      this.dispatchEvent(
        new CustomEvent('input-invalid', {
          detail: { value: this.value, message: this.errorMessage },
          bubbles: true,
          composed: true,
        })
      );
    } else {
      this.errorMessage = '';
      this.dispatchEvent(
        new CustomEvent('input-valid', {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        })
      );
    }

    return isValid;
  }

  protected _handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    // Trigger validation if validateOn is 'input'
    if (this.validate && this.validateOn === 'input') {
      this.performValidation();
    }

    this.dispatchEvent(
      new CustomEvent('input-change', {
        detail: { value: this.value, originalEvent: event },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected _handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    // Trigger validation if validateOn is 'change'
    if (this.validate && this.validateOn === 'change') {
      this.performValidation();
    }

    this.dispatchEvent(
      new CustomEvent('input-changed', {
        detail: { value: this.value, originalEvent: event },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected _handleFocus(event: FocusEvent): void {
    this._focused = true;

    this.dispatchEvent(
      new CustomEvent('input-focus', {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected _handleBlur(event: FocusEvent): void {
    this._focused = false;

    // Trigger validation if validateOn is 'blur' (default)
    if (this.validate && this.validateOn === 'blur') {
      this.performValidation();
    }

    this.dispatchEvent(
      new CustomEvent('input-blur', {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected _handleKeyDown(event: KeyboardEvent): void {
    this.dispatchEvent(
      new CustomEvent('input-keydown', {
        detail: { key: event.key, originalEvent: event },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected renderLabel() {
    if (!this.label) return null;

    return html`
      <label class="label" for="input">
        ${this.label}
        ${this.required ? html`<span class="required-indicator">*</span>` : ''}
      </label>
    `;
  }

  protected renderHelperText() {
    if (this.invalid && this.errorMessage) {
      return html`
        <div class="error-message" role="alert" aria-live="polite">${this.errorMessage}</div>
      `;
    }

    if (this.helperText) {
      return html`<div class="helper-text">${this.helperText}</div>`;
    }

    return null;
  }

  protected renderCharCount() {
    if (!this.showCount || !this.maxlength) return null;

    const count = this.value.length;
    const max = this.maxlength;

    return html`<div class="char-count">${count} / ${max}</div>`;
  }

  protected renderInput() {
    const containerClasses = {
      'input-container': true,
      focused: this._focused,
      disabled: this.disabled,
    };

    return html`
      <div class=${classMap(containerClasses)} part="input-container">
        <slot name="prefix"></slot>
        <input
          id="input"
          part="input"
          type=${this.inputType}
          name=${ifDefined(this.name)}
          .value=${this.value}
          placeholder=${ifDefined(this.placeholder)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          autocomplete=${ifDefined(this.autocomplete)}
          maxlength=${ifDefined(this.maxlength)}
          aria-invalid=${this.invalid ? 'true' : 'false'}
          aria-describedby=${ifDefined(
            this.errorMessage ? 'error-message' : this.helperText ? 'helper-text' : undefined
          )}
          @input=${this._handleInput}
          @change=${this._handleChange}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          @keydown=${this._handleKeyDown}
        />
        <slot name="suffix"></slot>
      </div>
    `;
  }

  protected override render() {
    return html`
      <div class="input-wrapper" part="wrapper">
        ${this.renderLabel()} ${this.renderInput()} ${this.renderHelperText()}
        ${this.renderCharCount()}
      </div>
    `;
  }
}
