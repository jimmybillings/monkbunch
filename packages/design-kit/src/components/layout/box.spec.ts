import { expect, fixture, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import './box.js';
import type { MonkBox } from './box.js';

describe('monk-box', () => {
  describe('Accessibility', () => {
    it('passes automated accessibility audit', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box padding="4" bg="surface">Content</monk-box>
      `);
      await expect(el).to.be.accessible();
    });

    it('supports ARIA attributes', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box aria-label="Navigation container" role="navigation">
          <nav>Links here</nav>
        </monk-box>
      `);
      expect(el.getAttribute('aria-label')).to.equal('Navigation container');
      expect(el.getAttribute('role')).to.equal('navigation');
      await expect(el).to.be.accessible();
    });
  });

  describe('Rendering', () => {
    it('renders with default properties', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box>Default Box</monk-box>
      `);
      expect(el.display).to.equal('block');
      expect(el.textContent?.trim()).to.equal('Default Box');
    });

    it('renders slotted content correctly', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </monk-box>
      `);
      const slot = el.shadowRoot?.querySelector('slot');
      expect(slot).to.exist;
    });

    it('can be hidden', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box hidden>Hidden Box</monk-box>
      `);
      expect(el.hidden).to.be.true;
      expect(el.hasAttribute('hidden')).to.be.true;
    });
  });

  describe('Display Modes', () => {
    it('defaults to block display', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box>Block</monk-box>
      `);
      expect(el.display).to.equal('block');
      expect(el.getAttribute('display')).to.equal('block');
    });

    it('supports flex display', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box display="flex">Flex</monk-box>
      `);
      expect(el.display).to.equal('flex');
      expect(el.getAttribute('display')).to.equal('flex');
    });

    it('supports grid display', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box display="grid">Grid</monk-box>
      `);
      expect(el.display).to.equal('grid');
      expect(el.getAttribute('display')).to.equal('grid');
    });

    it('updates display dynamically', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box>Box</monk-box>
      `);
      expect(el.display).to.equal('block');

      el.display = 'flex';
      await elementUpdated(el);
      expect(el.getAttribute('display')).to.equal('flex');
    });
  });

  describe('Spacing', () => {
    it('applies padding', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box padding="4">Padded</monk-box>
      `);
      expect(el.padding).to.equal('4');
      expect(el.getAttribute('padding')).to.equal('4');
    });

    it('applies margin', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box margin="8">Margined</monk-box>
      `);
      expect(el.margin).to.equal('8');
      expect(el.getAttribute('margin')).to.equal('8');
    });

    it('applies both padding and margin', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box padding="4" margin="2">Spaced</monk-box>
      `);
      expect(el.padding).to.equal('4');
      expect(el.margin).to.equal('2');
    });

    it('updates spacing dynamically', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box>Box</monk-box>
      `);
      expect(el.padding).to.be.undefined;

      el.padding = '8';
      await elementUpdated(el);
      expect(el.getAttribute('padding')).to.equal('8');
    });
  });

  describe('Background Colors', () => {
    it('applies surface background', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box bg="surface">Surface</monk-box>
      `);
      expect(el.bg).to.equal('surface');
      expect(el.getAttribute('bg')).to.equal('surface');
    });

    it('applies primary background', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box bg="primary">Primary</monk-box>
      `);
      expect(el.bg).to.equal('primary');
      expect(el.getAttribute('bg')).to.equal('primary');
    });

    it('updates background dynamically', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box>Box</monk-box>
      `);
      expect(el.bg).to.be.undefined;

      el.bg = 'subtle';
      await elementUpdated(el);
      expect(el.getAttribute('bg')).to.equal('subtle');
    });
  });

  describe('Shadows', () => {
    it('applies medium shadow', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box shadow="md">Shadow</monk-box>
      `);
      expect(el.shadow).to.equal('md');
      expect(el.getAttribute('shadow')).to.equal('md');
    });

    it('applies large shadow', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box shadow="lg">Shadow</monk-box>
      `);
      expect(el.shadow).to.equal('lg');
      expect(el.getAttribute('shadow')).to.equal('lg');
    });

    it('updates shadow dynamically', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box shadow="sm">Box</monk-box>
      `);
      expect(el.shadow).to.equal('sm');

      el.shadow = 'xl';
      await elementUpdated(el);
      expect(el.getAttribute('shadow')).to.equal('xl');
    });
  });

  describe('Border Radius', () => {
    it('applies medium radius', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box radius="md">Rounded</monk-box>
      `);
      expect(el.radius).to.equal('md');
      expect(el.getAttribute('radius')).to.equal('md');
    });

    it('applies full radius', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box radius="full">Circle</monk-box>
      `);
      expect(el.radius).to.equal('full');
      expect(el.getAttribute('radius')).to.equal('full');
    });

    it('updates radius dynamically', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box radius="sm">Box</monk-box>
      `);
      expect(el.radius).to.equal('sm');

      el.radius = 'lg';
      await elementUpdated(el);
      expect(el.getAttribute('radius')).to.equal('lg');
    });
  });

  describe('Border', () => {
    it('applies border', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box border="1px">Bordered</monk-box>
      `);
      expect(el.border).to.equal('1px');
      expect(el.getAttribute('border')).to.equal('1px');
    });
  });

  describe('Combined Properties', () => {
    it('applies multiple properties together', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box
          display="flex"
          padding="8"
          bg="surface"
          radius="lg"
          shadow="md"
          border="1px"
        >
          Card-like Box
        </monk-box>
      `);
      expect(el.display).to.equal('flex');
      expect(el.padding).to.equal('8');
      expect(el.bg).to.equal('surface');
      expect(el.radius).to.equal('lg');
      expect(el.shadow).to.equal('md');
      expect(el.border).to.equal('1px');
      await expect(el).to.be.accessible();
    });
  });

  describe('White-Label Customization', () => {
    it('exposes CSS part for external styling', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box display="flex">Styled Box</monk-box>
      `);
      const boxEl = el.shadowRoot?.querySelector('.box');
      expect(boxEl).to.exist;
      expect(boxEl?.getAttribute('part')).to.include('box');
      expect(boxEl?.getAttribute('part')).to.include('flex');
    });

    it('updates CSS part when display changes', async () => {
      const el = await fixture<MonkBox>(html`
        <monk-box display="block">Box</monk-box>
      `);
      let boxEl = el.shadowRoot?.querySelector('.box');
      expect(boxEl?.getAttribute('part')).to.include('block');

      el.display = 'grid';
      await elementUpdated(el);
      boxEl = el.shadowRoot?.querySelector('.box');
      expect(boxEl?.getAttribute('part')).to.include('grid');
    });
  });
});
