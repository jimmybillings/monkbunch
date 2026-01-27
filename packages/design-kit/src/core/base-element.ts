import { LitElement, type CSSResultArray } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * Base element for all Monkbunch components
 * Provides common functionality, accessibility utilities, and base styles
 */
export class MonkBaseElement extends LitElement {
  /**
   * Whether the element is hidden
   * When true, display: none is applied
   */
  @property({ type: Boolean, reflect: true })
  hidden = false;

  /**
   * Base styles for all components
   * Override in subclasses to add component-specific styles
   */
  static styles: CSSResultArray = [];

  /**
   * Helper method to emit custom events
   * Automatically sets composed: true and bubbles: true for better event propagation
   */
  protected emitEvent<T = unknown>(
    eventName: string,
    detail?: T,
    options?: Partial<CustomEventInit<T>>
  ): boolean {
    const event = new CustomEvent<T>(eventName, {
      detail,
      bubbles: true,
      composed: true,
      ...options,
    });
    return this.dispatchEvent(event);
  }

  /**
   * Helper to check if an element is focusable
   * Useful for accessibility utilities
   */
  protected isFocusable(element: HTMLElement): boolean {
    if (element.hasAttribute('disabled') || element.getAttribute('tabindex') === '-1') {
      return false;
    }
    const tabindex = element.getAttribute('tabindex');
    return tabindex !== null || this.isNativelyFocusable(element);
  }

  /**
   * Check if element is natively focusable (button, input, a, etc.)
   */
  private isNativelyFocusable(element: HTMLElement): boolean {
    const focusableTags = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'];
    return focusableTags.includes(element.tagName);
  }
}
