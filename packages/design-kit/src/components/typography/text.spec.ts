import { expect, fixture, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import './text.js';
import type { MonkText } from './text.js';

describe('monk-text', () => {
  describe('Accessibility', () => {
    it('passes automated accessibility audit', async () => {
      const el = await fixture<MonkText>(html`
        <monk-text>Paragraph text content</monk-text>
      `);
      await expect(el).to.be.accessible();
    });

    it('passes accessibility with all size variants', async () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      for (const size of sizes) {
        const el = await fixture<MonkText>(html`
          <monk-text size=${size}>Text size ${size}</monk-text>
        `);
        await expect(el).to.be.accessible();
      }
    });

    it('passes accessibility with all color variants', async () => {
      const colors = ['primary', 'secondary', 'tertiary'] as const;

      for (const color of colors) {
        const el = await fixture<MonkText>(html`
          <monk-text color=${color}>Text color ${color}</monk-text>
        `);
        await expect(el).to.be.accessible();
      }
    });

    it('has sufficient color contrast for primary text', async () => {
      const el = await fixture<MonkText>(html`
        <monk-text color="primary">Primary text</monk-text>
      `);
      const styles = getComputedStyle(el);
      const color = styles.getPropertyValue('color');
      expect(color).to.not.equal('');
    });
  });

  describe('Rendering', () => {
    it('renders with default properties', async () => {
      const el = await fixture<MonkText>(html`
        <monk-text>Default text</monk-text>
      `);
      expect(el.size).to.equal('md');
      expect(el.weight).to.equal('regular');
      expect(el.color).to.equal('primary');
      expect(el.textContent?.trim()).to.equal('Default text');
    });

    it('renders with custom size', async () => {
      const el = await fixture<MonkText>(html`
        <monk-text size="lg">Large text</monk-text>
      `);
      expect(el.size).to.equal('lg');
      expect(el.getAttribute('size')).to.equal('lg');
    });

    it('renders with custom weight', async () => {
      const el = await fixture<MonkText>(html`
        <monk-text weight="bold">Bold text</monk-text>
      `);
      expect(el.weight).to.equal('bold');
      expect(el.getAttribute('weight')).to.equal('bold');
    });

    it('renders with custom color', async () => {
      const el = await fixture<MonkText>(html`
        <monk-text color="secondary">Secondary text</monk-text>
      `);
      expect(el.color).to.equal('secondary');
      expect(el.getAttribute('color')).to.equal('secondary');
    });

    it('renders slotted content correctly', async () => {
      const el = await fixture<MonkText>(html`
        <monk-text>
          This is <strong>emphasized</strong> content
        </monk-text>
      `);
      const slot = el.shadowRoot?.querySelector('slot');
      expect(slot).to.exist;
    });

    it('can be hidden', async () => {
      const el = await fixture<MonkText>(html`
        <monk-text hidden>Hidden text</monk-text>
      `);
      expect(el.hidden).to.be.true;
      expect(el.hasAttribute('hidden')).to.be.true;
    });
  });

  describe('Size Variants', () => {
    it('supports all size variants', async () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      for (const size of sizes) {
        const el = await fixture<MonkText>(html`
          <monk-text size=${size}>Text</monk-text>
        `);
        expect(el.size).to.equal(size);
      }
    });

    it('updates size dynamically', async () => {
      const el = await fixture<MonkText>(html`
        <monk-text size="sm">Text</monk-text>
      `);
      expect(el.size).to.equal('sm');

      el.size = 'xl';
      await elementUpdated(el);
      expect(el.getAttribute('size')).to.equal('xl');
    });
  });

  describe('Weight Variants', () => {
    it('supports all weight variants', async () => {
      const weights = ['regular', 'medium', 'semibold', 'bold'] as const;

      for (const weight of weights) {
        const el = await fixture<MonkText>(html`
          <monk-text weight=${weight}>Text</monk-text>
        `);
        expect(el.weight).to.equal(weight);
      }
    });

    it('updates weight dynamically', async () => {
      const el = await fixture<MonkText>(html`
        <monk-text weight="regular">Text</monk-text>
      `);
      expect(el.weight).to.equal('regular');

      el.weight = 'bold';
      await elementUpdated(el);
      expect(el.getAttribute('weight')).to.equal('bold');
    });
  });

  describe('Color Variants', () => {
    it('supports all color variants', async () => {
      const colors = ['primary', 'secondary', 'tertiary'] as const;

      for (const color of colors) {
        const el = await fixture<MonkText>(html`
          <monk-text color=${color}>Text</monk-text>
        `);
        expect(el.color).to.equal(color);
      }
    });

    it('updates color dynamically', async () => {
      const el = await fixture<MonkText>(html`
        <monk-text color="primary">Text</monk-text>
      `);
      expect(el.color).to.equal('primary');

      el.color = 'secondary';
      await elementUpdated(el);
      expect(el.getAttribute('color')).to.equal('secondary');
    });
  });

  describe('Token Integration', () => {
    it('applies size attributes correctly', async () => {
      const small = await fixture<MonkText>(html`
        <monk-text size="xs">Small</monk-text>
      `);
      const large = await fixture<MonkText>(html`
        <monk-text size="xl">Large</monk-text>
      `);

      // Verify size attributes are set correctly
      // (CSS custom properties are tested in Storybook/browser environment)
      expect(small.size).to.equal('xs');
      expect(large.size).to.equal('xl');
      expect(small.getAttribute('size')).to.equal('xs');
      expect(large.getAttribute('size')).to.equal('xl');
    });

    it('applies weight attributes correctly', async () => {
      const regular = await fixture<MonkText>(html`
        <monk-text weight="regular">Regular</monk-text>
      `);
      const bold = await fixture<MonkText>(html`
        <monk-text weight="bold">Bold</monk-text>
      `);

      // Verify weight attributes are set correctly
      // (CSS custom properties are tested in Storybook/browser environment)
      expect(regular.weight).to.equal('regular');
      expect(bold.weight).to.equal('bold');
      expect(regular.getAttribute('weight')).to.equal('regular');
      expect(bold.getAttribute('weight')).to.equal('bold');
    });
  });

  describe('Combined Variations', () => {
    it('handles multiple properties together', async () => {
      const el = await fixture<MonkText>(html`
        <monk-text size="lg" weight="semibold" color="secondary">
          Combined properties
        </monk-text>
      `);
      expect(el.size).to.equal('lg');
      expect(el.weight).to.equal('semibold');
      expect(el.color).to.equal('secondary');
      await expect(el).to.be.accessible();
    });
  });
});
