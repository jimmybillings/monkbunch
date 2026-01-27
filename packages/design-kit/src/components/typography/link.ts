import { html, css, type CSSResultArray, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { MonkBaseTypography } from '../../core/base-typography.js';
import { coreStyles, focusVisibleStyles, reducedMotionStyles } from '../../core/styles.js';

/**
 * Link target options
 */
export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

/**
 * Link component for creating accessible hyperlinks
 *
 * @element monk-link
 *
 * @fires {CustomEvent} monk-click - Fired when link is clicked (in addition to native click)
 *
 * @example
 * ```html
 * <monk-link href="/about">About Us</monk-link>
 * <monk-link href="https://example.com" target="_blank">External Link</monk-link>
 * <monk-link href="/contact" underline="false">No Underline</monk-link>
 * ```
 *
 * @accessibility
 * - Uses semantic <a> tag with proper href attribute
 * - Keyboard accessible (Tab to focus, Enter to activate)
 * - :focus-visible indicator with 2px outline meeting 3:1 contrast ratio
 * - Opens in new tab only when explicitly set (with rel="noopener noreferrer" for security)
 * - External link indication for screen readers when target="_blank"
 * - Underline by default for usability (removable but discouraged)
 * - Color meets WCAG AA contrast (4.5:1 minimum for link color vs background)
 * - Hover state provides visual feedback
 * - Respects prefers-reduced-motion
 *
 * @cssprop --monk-color-text-link - Link color (default: blue-500)
 * @cssprop --monk-color-blue-600 - Link hover color (default: blue-600)
 * @cssprop --monk-color-brand-primary - Focus outline color (default: blue-500)
 */
@customElement('monk-link')
export class MonkLink extends MonkBaseTypography {
  /**
   * URL the link points to
   * @required
   */
  @property({ type: String })
  href = '';

  /**
   * Where to open the linked document
   * @default '_self'
   */
  @property({ type: String })
  target: LinkTarget = '_self';

  /**
   * Whether to show underline decoration
   * @default true
   */
  @property({ type: Boolean, reflect: true })
  underline = true;

  /**
   * Download attribute - prompts to save linked URL instead of navigating
   */
  @property({ type: String })
  download?: string;

  /**
   * Relationship of the linked document to the current document
   * Automatically set to "noopener noreferrer" when target="_blank"
   */
  @property({ type: String })
  rel?: string;

  static override styles: CSSResultArray = [
    coreStyles,
    focusVisibleStyles,
    reducedMotionStyles,
    css`
      :host {
        display: inline;
        cursor: pointer;
      }

      a {
        color: var(--monk-color-text-link);
        text-decoration: underline;
        transition: color 0.2s ease;
        cursor: pointer;
        /* Remove default outline, we use :focus-visible on host */
        outline: none;
      }

      a:hover {
        color: var(--monk-color-blue-600);
      }

      a:active {
        color: var(--monk-color-blue-700, var(--monk-color-blue-600));
      }

      :host([underline='false']) a {
        text-decoration: none;
      }

      /* Visited link styling */
      a:visited {
        color: var(--monk-color-text-link);
      }

      a:visited:hover {
        color: var(--monk-color-blue-600);
      }
    `,
  ];

  protected override render(): TemplateResult {
    // Determine rel attribute - automatically add security attributes for external links
    const computedRel = this.getComputedRel();

    // Determine if we need ARIA label for external links
    const ariaLabel = this.target === '_blank' ? 'opens in new window' : undefined;

    return html`
      <a
        href=${this.href || 'javascript:void(0)'}
        target=${ifDefined(this.target)}
        rel=${ifDefined(computedRel)}
        download=${ifDefined(this.download)}
        aria-label=${ifDefined(ariaLabel)}
        @click=${this.handleClick}
      >
        <slot></slot>
      </a>
    `;
  }

  /**
   * Handle link click - emit custom event for tracking
   */
  private handleClick(event: MouseEvent): void {
    // Emit custom event for applications to listen to
    this.emitEvent('monk-click', {
      href: this.href,
      target: this.target,
      originalEvent: event,
    });

    // If href is empty or javascript:void, prevent default
    if (!this.href || this.href === 'javascript:void(0)') {
      event.preventDefault();
    }
  }

  /**
   * Compute the rel attribute value
   * Automatically adds 'noopener noreferrer' for target="_blank" for security
   */
  private getComputedRel(): string | undefined {
    if (this.rel) {
      return this.rel;
    }

    // Security: prevent window.opener access and referrer leaking for external links
    if (this.target === '_blank') {
      return 'noopener noreferrer';
    }

    return undefined;
  }

  /**
   * Lifecycle: First update - set up accessibility
   */
  protected override firstUpdated(): void {
    // Make host focusable for keyboard navigation
    // The actual <a> inside will receive focus, but host styling provides focus indicator
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'monk-link': MonkLink;
  }
}
