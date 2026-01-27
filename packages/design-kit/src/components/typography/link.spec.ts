import { expect, fixture, elementUpdated, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import './link.js';
import type { MonkLink } from './link.js';

describe('monk-link', () => {
  describe('Accessibility', () => {
    it('passes automated accessibility audit', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="/about">About Us</monk-link>
      `);
      await expect(el).to.be.accessible();
    });

    it('is keyboard focusable', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="/contact">Contact</monk-link>
      `);
      expect(el.getAttribute('tabindex')).to.equal('0');

      // Verify the internal anchor is present
      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor).to.exist;
    });

    it('has proper ARIA label for external links', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="https://example.com" target="_blank">
          External Site
        </monk-link>
      `);
      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('aria-label')).to.equal('opens in new window');
    });

    it('does not have ARIA label for same-window links', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="/internal" target="_self">
          Internal Link
        </monk-link>
      `);
      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.hasAttribute('aria-label')).to.be.false;
    });

    it('has security attributes for target="_blank"', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="https://external.com" target="_blank">
          External Link
        </monk-link>
      `);
      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('rel')).to.equal('noopener noreferrer');
    });

    it('passes accessibility with underline disabled', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test" underline="false">No Underline</monk-link>
      `);
      await expect(el).to.be.accessible();
    });
  });

  describe('Rendering', () => {
    it('renders with default properties', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="/default">Default Link</monk-link>
      `);
      expect(el.href).to.equal('/default');
      expect(el.target).to.equal('_self');
      expect(el.underline).to.be.true;
      expect(el.textContent?.trim()).to.equal('Default Link');
    });

    it('renders href correctly', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="https://example.com">Example</monk-link>
      `);
      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('href')).to.equal('https://example.com');
    });

    it('renders slotted content correctly', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test">
          <span>Complex</span> <strong>Content</strong>
        </monk-link>
      `);
      const slot = el.shadowRoot?.querySelector('slot');
      expect(slot).to.exist;
    });

    it('can be hidden', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="/hidden" hidden>Hidden Link</monk-link>
      `);
      expect(el.hidden).to.be.true;
      expect(el.hasAttribute('hidden')).to.be.true;
    });
  });

  describe('Target Attribute', () => {
    it('defaults to _self', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test">Link</monk-link>
      `);
      expect(el.target).to.equal('_self');
    });

    it('supports _blank target', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="https://example.com" target="_blank">
          New Window
        </monk-link>
      `);
      expect(el.target).to.equal('_blank');
      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('target')).to.equal('_blank');
    });

    it('supports _parent target', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test" target="_parent">Parent</monk-link>
      `);
      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('target')).to.equal('_parent');
    });

    it('supports _top target', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test" target="_top">Top</monk-link>
      `);
      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('target')).to.equal('_top');
    });
  });

  describe('Underline Property', () => {
    it('shows underline by default', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test">Underlined</monk-link>
      `);
      expect(el.underline).to.be.true;
    });

    it('can disable underline', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test" .underline=${false}>No Underline</monk-link>
      `);
      expect(el.underline).to.be.false;
      expect(el.hasAttribute('underline')).to.be.false;
    });

    it('updates underline dynamically', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test">Link</monk-link>
      `);
      expect(el.underline).to.be.true;

      el.underline = false;
      await elementUpdated(el);
      expect(el.hasAttribute('underline')).to.be.false;
    });
  });

  describe('Download Attribute', () => {
    it('supports download attribute', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="/file.pdf" download="document.pdf">
          Download PDF
        </monk-link>
      `);
      expect(el.download).to.equal('document.pdf');
      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('download')).to.equal('document.pdf');
    });
  });

  describe('Custom Rel Attribute', () => {
    it('uses custom rel when provided', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="https://example.com" rel="nofollow">
          External
        </monk-link>
      `);
      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('rel')).to.equal('nofollow');
    });

    it('prefers custom rel over automatic _blank rel', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link
          href="https://example.com"
          target="_blank"
          rel="nofollow noopener"
        >
          Custom Rel
        </monk-link>
      `);
      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('rel')).to.equal('nofollow noopener');
    });
  });

  describe('Events', () => {
    it('emits monk-click event on click', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test">Click Me</monk-link>
      `);

      setTimeout(() => {
        const anchor = el.shadowRoot?.querySelector('a');
        anchor?.click();
      });

      const { detail } = await oneEvent(el, 'monk-click');
      expect(detail).to.have.property('href', '#test');
      expect(detail).to.have.property('target', '_self');
    });

    it('prevents default for empty href', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="">Empty Href</monk-link>
      `);

      const anchor = el.shadowRoot?.querySelector('a');
      let defaultPrevented = false;

      anchor?.addEventListener('click', (e: Event) => {
        defaultPrevented = e.defaultPrevented;
      });

      anchor?.click();
      await elementUpdated(el);

      expect(defaultPrevented).to.be.true;
    });

    it('prevents default for javascript:void href', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="javascript:void(0)">JavaScript Void</monk-link>
      `);

      const anchor = el.shadowRoot?.querySelector('a');
      let defaultPrevented = false;

      anchor?.addEventListener('click', (e: Event) => {
        defaultPrevented = e.defaultPrevented;
      });

      anchor?.click();
      await elementUpdated(el);

      expect(defaultPrevented).to.be.true;
    });
  });

  describe('Keyboard Navigation', () => {
    it('can be focused via tabindex', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test">Focusable Link</monk-link>
      `);

      el.focus();
      // In a real browser, document.activeElement would be the link
      // In tests, we verify tabindex is set correctly
      expect(el.getAttribute('tabindex')).to.equal('0');
    });

    it('maintains tabindex after updates', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test">Link</monk-link>
      `);

      el.href = '/new-page';
      await elementUpdated(el);

      expect(el.getAttribute('tabindex')).to.equal('0');
    });
  });

  describe('Dynamic Updates', () => {
    it('updates href dynamically', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="/original">Link</monk-link>
      `);

      el.href = '#updated';
      await elementUpdated(el);

      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('href')).to.equal('#updated');
    });

    it('updates target dynamically', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test" target="_self">Link</monk-link>
      `);

      el.target = '_blank';
      await elementUpdated(el);

      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('target')).to.equal('_blank');
      // Should also add security rel
      expect(anchor?.getAttribute('rel')).to.equal('noopener noreferrer');
    });
  });

  describe('Token Integration', () => {
    it('applies color tokens', async () => {
      const el = await fixture<MonkLink>(html`
        <monk-link href="#test">Styled Link</monk-link>
      `);

      const anchor = el.shadowRoot?.querySelector('a');
      const styles = getComputedStyle(anchor as Element);
      const color = styles.getPropertyValue('color');

      // Verify color is applied
      expect(color).to.not.equal('');
    });
  });
});
