import { expect, fixture, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import './button.js';
import type { MonkButton } from './button.js';

describe('monk-button', () => {
  describe('Accessibility', () => {
    it('passes automated accessibility audit', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Click me</monk-button>
      `);
      await expect(el).to.be.accessible();
    });

    it('has proper disabled state with aria-disabled', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button disabled>Disabled</monk-button>
      `);
      const button = el.shadowRoot?.querySelector('button');
      expect(button?.hasAttribute('disabled')).to.be.true;
      expect(button?.getAttribute('aria-disabled')).to.equal('true');
      await expect(el).to.be.accessible();
    });

    it('supports button type for forms', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button type="submit">Submit</monk-button>
      `);
      const button = el.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('type')).to.equal('submit');
    });
  });

  describe('Rendering', () => {
    it('renders with default properties', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Default Button</monk-button>
      `);
      expect(el.variant).to.equal('solid');
      expect(el.colorScheme).to.equal('primary');
      expect(el.size).to.equal('md');
      expect(el.disabled).to.be.false;
      expect(el.fullWidth).to.be.false;
      expect(el.type).to.equal('button');
    });

    it('renders slotted content correctly', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Click me</monk-button>
      `);
      expect(el.textContent?.trim()).to.equal('Click me');
    });

    it('can be hidden', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button hidden>Hidden</monk-button>
      `);
      expect(el.hidden).to.be.true;
      expect(el.hasAttribute('hidden')).to.be.true;
    });
  });

  describe('Variants', () => {
    it('defaults to solid variant', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Solid</monk-button>
      `);
      expect(el.variant).to.equal('solid');
      expect(el.getAttribute('variant')).to.equal('solid');
    });

    it('supports outline variant', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button variant="outline">Outline</monk-button>
      `);
      expect(el.variant).to.equal('outline');
      expect(el.getAttribute('variant')).to.equal('outline');
    });

    it('supports ghost variant', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button variant="ghost">Ghost</monk-button>
      `);
      expect(el.variant).to.equal('ghost');
      expect(el.getAttribute('variant')).to.equal('ghost');
    });

    it('supports link variant', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button variant="link">Link</monk-button>
      `);
      expect(el.variant).to.equal('link');
      expect(el.getAttribute('variant')).to.equal('link');
    });

    it('updates variant dynamically', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Button</monk-button>
      `);
      expect(el.variant).to.equal('solid');

      el.variant = 'outline';
      await elementUpdated(el);
      expect(el.getAttribute('variant')).to.equal('outline');
    });
  });

  describe('Color Schemes', () => {
    it('defaults to primary color scheme', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Primary</monk-button>
      `);
      expect(el.colorScheme).to.equal('primary');
      expect(el.getAttribute('color-scheme')).to.equal('primary');
    });

    it('supports neutral color scheme', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button color-scheme="neutral">Neutral</monk-button>
      `);
      expect(el.colorScheme).to.equal('neutral');
      expect(el.getAttribute('color-scheme')).to.equal('neutral');
    });

    it('supports success color scheme', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button color-scheme="success">Success</monk-button>
      `);
      expect(el.colorScheme).to.equal('success');
      expect(el.getAttribute('color-scheme')).to.equal('success');
    });

    it('supports error color scheme', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button color-scheme="error">Error</monk-button>
      `);
      expect(el.colorScheme).to.equal('error');
      expect(el.getAttribute('color-scheme')).to.equal('error');
    });

    it('supports warning color scheme', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button color-scheme="warning">Warning</monk-button>
      `);
      expect(el.colorScheme).to.equal('warning');
      expect(el.getAttribute('color-scheme')).to.equal('warning');
    });

    it('updates color scheme dynamically', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Button</monk-button>
      `);
      expect(el.colorScheme).to.equal('primary');

      el.colorScheme = 'success';
      await elementUpdated(el);
      expect(el.getAttribute('color-scheme')).to.equal('success');
    });
  });

  describe('Sizes', () => {
    it('defaults to md size', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Medium</monk-button>
      `);
      expect(el.size).to.equal('md');
      expect(el.getAttribute('size')).to.equal('md');
    });

    it('supports xs size', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button size="xs">Extra Small</monk-button>
      `);
      expect(el.size).to.equal('xs');
      expect(el.getAttribute('size')).to.equal('xs');
    });

    it('supports sm size', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button size="sm">Small</monk-button>
      `);
      expect(el.size).to.equal('sm');
      expect(el.getAttribute('size')).to.equal('sm');
    });

    it('supports lg size', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button size="lg">Large</monk-button>
      `);
      expect(el.size).to.equal('lg');
      expect(el.getAttribute('size')).to.equal('lg');
    });

    it('supports xl size', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button size="xl">Extra Large</monk-button>
      `);
      expect(el.size).to.equal('xl');
      expect(el.getAttribute('size')).to.equal('xl');
    });

    it('updates size dynamically', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Button</monk-button>
      `);
      expect(el.size).to.equal('md');

      el.size = 'lg';
      await elementUpdated(el);
      expect(el.getAttribute('size')).to.equal('lg');
    });
  });

  describe('Disabled State', () => {
    it('is not disabled by default', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Enabled</monk-button>
      `);
      expect(el.disabled).to.be.false;
      const button = el.shadowRoot?.querySelector('button');
      expect(button?.hasAttribute('disabled')).to.be.false;
    });

    it('can be disabled', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button disabled>Disabled</monk-button>
      `);
      expect(el.disabled).to.be.true;
      const button = el.shadowRoot?.querySelector('button');
      expect(button?.hasAttribute('disabled')).to.be.true;
    });

    it('updates disabled state dynamically', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Button</monk-button>
      `);
      expect(el.disabled).to.be.false;

      el.disabled = true;
      await elementUpdated(el);
      expect(el.hasAttribute('disabled')).to.be.true;
      const button = el.shadowRoot?.querySelector('button');
      expect(button?.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('Full Width', () => {
    it('is not full width by default', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Normal Width</monk-button>
      `);
      expect(el.fullWidth).to.be.false;
      expect(el.hasAttribute('full-width')).to.be.false;
    });

    it('can be full width', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button full-width>Full Width</monk-button>
      `);
      expect(el.fullWidth).to.be.true;
      expect(el.hasAttribute('full-width')).to.be.true;
    });

    it('updates full width dynamically', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Button</monk-button>
      `);
      expect(el.fullWidth).to.be.false;

      el.fullWidth = true;
      await elementUpdated(el);
      expect(el.hasAttribute('full-width')).to.be.true;
    });
  });

  describe('Combined Properties', () => {
    it('applies multiple properties together', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button
          variant="outline"
          color-scheme="success"
          size="lg"
          full-width
        >
          Save Changes
        </monk-button>
      `);
      expect(el.variant).to.equal('outline');
      expect(el.colorScheme).to.equal('success');
      expect(el.size).to.equal('lg');
      expect(el.fullWidth).to.be.true;
      await expect(el).to.be.accessible();
    });
  });

  describe('White-Label Customization', () => {
    it('exposes CSS part for external styling', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button variant="solid" color-scheme="primary" size="md">
          Styled Button
        </monk-button>
      `);
      const buttonEl = el.shadowRoot?.querySelector('button');
      expect(buttonEl).to.exist;
      expect(buttonEl?.getAttribute('part')).to.include('button');
      expect(buttonEl?.getAttribute('part')).to.include('solid');
      expect(buttonEl?.getAttribute('part')).to.include('primary');
      expect(buttonEl?.getAttribute('part')).to.include('md');
    });

    it('updates CSS part when properties change', async () => {
      const el = await fixture<MonkButton>(html`
        <monk-button>Button</monk-button>
      `);
      let buttonEl = el.shadowRoot?.querySelector('button');
      expect(buttonEl?.getAttribute('part')).to.include('solid');
      expect(buttonEl?.getAttribute('part')).to.include('primary');

      el.variant = 'outline';
      el.colorScheme = 'error';
      await elementUpdated(el);
      buttonEl = el.shadowRoot?.querySelector('button');
      expect(buttonEl?.getAttribute('part')).to.include('outline');
      expect(buttonEl?.getAttribute('part')).to.include('error');
    });
  });
});
