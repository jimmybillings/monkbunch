import { html, css, type CSSResultArray } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseInput } from './base-input.js';

/**
 * Password input component - Password field with show/hide toggle
 *
 * @element monk-password-input
 *
 * @example
 * ```html
 * <!-- Basic password input -->
 * <monk-password-input label="Password"></monk-password-input>
 *
 * <!-- With show/hide toggle -->
 * <monk-password-input
 *   label="Password"
 *   show-toggle
 * ></monk-password-input>
 *
 * <!-- With validation -->
 * <monk-password-input
 *   label="Password"
 *   required
 *   invalid
 *   error-message="Password must be at least 8 characters"
 * ></monk-password-input>
 *
 * <!-- With character count -->
 * <monk-password-input
 *   label="New Password"
 *   maxlength="128"
 *   show-count
 *   show-toggle
 * ></monk-password-input>
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
 * @csspart toggle-button - The show/hide toggle button
 *
 * @slot prefix - Content to display before the input (e.g., icons, text)
 * @slot suffix - Content to display after the input (e.g., icons, buttons)
 */
@customElement('monk-password-input')
export class MonkPasswordInput extends BaseInput {
  /**
   * Whether to show the toggle button for show/hide password
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-toggle' })
  showToggle = false;

  /**
   * Internal state for password visibility
   */
  @state()
  private _showPassword = false;

  /**
   * Get the input type (password or text based on visibility)
   */
  protected override get inputType(): string {
    return this._showPassword ? 'text' : 'password';
  }

  static override styles: CSSResultArray = [
    ...(BaseInput.styles as CSSResultArray),
    css`
      .toggle-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--monk-space-1);
        border: none;
        background: transparent;
        color: var(--monk-color-text-secondary);
        cursor: pointer;
        border-radius: var(--monk-radius-sm);
        transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
        font-size: var(--monk-font-size-lg);
        line-height: 1;
        min-width: 32px;
        min-height: 32px;
      }

      .toggle-button:hover {
        background: var(--monk-color-bg-subtle);
        color: var(--monk-color-text-primary);
      }

      .toggle-button:focus-visible {
        outline: 2px solid var(--monk-focus-ring-color);
        outline-offset: 2px;
      }

      .toggle-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      @media (prefers-reduced-motion: reduce) {
        .toggle-button {
          transition: none;
        }
      }
    `,
  ];

  private _handleToggle(): void {
    this._showPassword = !this._showPassword;
  }

  protected override renderInput() {
    // Get the base input container from parent
    const baseInput = super.renderInput();

    // If no toggle, just return base input
    if (!this.showToggle) {
      return baseInput;
    }

    // Otherwise, we need to add the toggle button
    // We'll use a custom template that includes the toggle
    const containerClasses = {
      'input-container': true,
      focused: this._focused,
      disabled: this.disabled,
    };

    return html`
      <div class=${containerClasses} part="input-container">
        <slot name="prefix"></slot>
        <input
          id="input"
          part="input"
          type=${this.inputType}
          name=${this.name || undefined}
          .value=${this.value}
          placeholder=${this.placeholder || undefined}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          autocomplete=${this.autocomplete || undefined}
          maxlength=${this.maxlength || undefined}
          aria-invalid=${this.invalid ? 'true' : 'false'}
          aria-describedby=${this.errorMessage
            ? 'error-message'
            : this.helperText
              ? 'helper-text'
              : undefined}
          @input=${this._handleInput}
          @change=${this._handleChange}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          @keydown=${this._handleKeyDown}
        />
        <button
          type="button"
          class="toggle-button"
          part="toggle-button"
          ?disabled=${this.disabled}
          aria-label=${this._showPassword ? 'Hide password' : 'Show password'}
          @click=${this._handleToggle}
        >
          ${this._showPassword ? '🙈' : '👁️'}
        </button>
        <slot name="suffix"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-password-input': MonkPasswordInput;
  }
}
