import { customElement } from 'lit/decorators.js';
import { BaseInput } from './base-input.js';

/**
 * Search input component - Search field with browser-specific UI
 *
 * @element monk-search-input
 *
 * @example
 * ```html
 * <!-- Basic search input -->
 * <monk-search-input placeholder="Search..."></monk-search-input>
 *
 * <!-- With label -->
 * <monk-search-input
 *   label="Search Products"
 *   placeholder="Enter product name..."
 *   helper-text="Search by name, SKU, or category"
 * >
 *   <span slot="prefix">🔍</span>
 * </monk-search-input>
 * ```
 *
 * @fires input-change - Fired when the input value changes (on input event)
 * @fires input-changed - Fired when the input value is committed (on change event)
 * @fires input-focus - Fired when the input receives focus
 * @fires input-blur - Fired when the input loses focus
 * @fires input-keydown - Fired on keydown event
 */
@customElement('monk-search-input')
export class MonkSearchInput extends BaseInput {
  protected override get inputType(): string {
    return 'search';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-search-input': MonkSearchInput;
  }
}
