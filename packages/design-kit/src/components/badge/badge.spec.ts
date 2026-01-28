import { expect, fixture, html } from '@open-wc/testing';
import type { MonkBadge } from './badge.js';
import './badge.js';

describe('monk-badge', () => {
  describe('default behavior', () => {
    it('renders with default props', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge>Active</monk-badge>`);
      expect(el.variant).to.equal('solid');
      expect(el.colorScheme).to.equal('primary');
      expect(el.size).to.equal('md');
    });

    it('renders slotted content', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge>Test Badge</monk-badge>`);
      expect(el.textContent?.trim()).to.equal('Test Badge');
    });

    it('is accessible', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge>Active</monk-badge>`);
      await expect(el).to.be.accessible();
    });
  });

  describe('variants', () => {
    it('renders solid variant', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge variant="solid">Solid</monk-badge>`);
      expect(el.variant).to.equal('solid');
      expect(el.hasAttribute('variant')).to.be.true;
      expect(el.getAttribute('variant')).to.equal('solid');
    });

    it('renders subtle variant', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge variant="subtle">Subtle</monk-badge>`);
      expect(el.variant).to.equal('subtle');
      expect(el.getAttribute('variant')).to.equal('subtle');
    });

    it('renders outline variant', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge variant="outline">Outline</monk-badge>`);
      expect(el.variant).to.equal('outline');
      expect(el.getAttribute('variant')).to.equal('outline');
    });
  });

  describe('color schemes', () => {
    it('renders primary color scheme', async () => {
      const el = await fixture<MonkBadge>(
        html`<monk-badge color-scheme="primary">Primary</monk-badge>`
      );
      expect(el.colorScheme).to.equal('primary');
      expect(el.getAttribute('color-scheme')).to.equal('primary');
    });

    it('renders neutral color scheme', async () => {
      const el = await fixture<MonkBadge>(
        html`<monk-badge color-scheme="neutral">Neutral</monk-badge>`
      );
      expect(el.colorScheme).to.equal('neutral');
    });

    it('renders success color scheme', async () => {
      const el = await fixture<MonkBadge>(
        html`<monk-badge color-scheme="success">Success</monk-badge>`
      );
      expect(el.colorScheme).to.equal('success');
    });

    it('renders error color scheme', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge color-scheme="error">Error</monk-badge>`);
      expect(el.colorScheme).to.equal('error');
    });

    it('renders warning color scheme', async () => {
      const el = await fixture<MonkBadge>(
        html`<monk-badge color-scheme="warning">Warning</monk-badge>`
      );
      expect(el.colorScheme).to.equal('warning');
    });

    it('renders info color scheme', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge color-scheme="info">Info</monk-badge>`);
      expect(el.colorScheme).to.equal('info');
    });
  });

  describe('sizes', () => {
    it('renders small size', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge size="sm">Small</monk-badge>`);
      expect(el.size).to.equal('sm');
      expect(el.getAttribute('size')).to.equal('sm');
    });

    it('renders medium size', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge size="md">Medium</monk-badge>`);
      expect(el.size).to.equal('md');
    });

    it('renders large size', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge size="lg">Large</monk-badge>`);
      expect(el.size).to.equal('lg');
    });
  });

  describe('CSS parts', () => {
    it('exposes badge part for external styling', async () => {
      const el = await fixture<MonkBadge>(
        html`<monk-badge variant="solid" color-scheme="primary" size="md">Badge</monk-badge>`
      );
      const badgeEl = el.shadowRoot?.querySelector('span');
      expect(badgeEl).to.exist;
      expect(badgeEl?.getAttribute('part')).to.include('badge');
      expect(badgeEl?.getAttribute('part')).to.include('solid');
      expect(badgeEl?.getAttribute('part')).to.include('primary');
      expect(badgeEl?.getAttribute('part')).to.include('md');
    });
  });

  describe('attribute reflection', () => {
    it('reflects variant property to attribute', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge>Test</monk-badge>`);
      el.variant = 'subtle';
      await el.updateComplete;
      expect(el.getAttribute('variant')).to.equal('subtle');
    });

    it('reflects colorScheme property to attribute', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge>Test</monk-badge>`);
      el.colorScheme = 'success';
      await el.updateComplete;
      expect(el.getAttribute('color-scheme')).to.equal('success');
    });

    it('reflects size property to attribute', async () => {
      const el = await fixture<MonkBadge>(html`<monk-badge>Test</monk-badge>`);
      el.size = 'lg';
      await el.updateComplete;
      expect(el.getAttribute('size')).to.equal('lg');
    });
  });
});
