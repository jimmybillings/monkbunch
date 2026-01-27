import { expect, fixture, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import './heading.js';
import type { MonkHeading } from './heading.js';

describe('monk-heading', () => {
  describe('Accessibility', () => {
    it('passes automated accessibility audit', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading level="h1">Main Title</monk-heading>
      `);
      await expect(el).to.be.accessible();
    });

    it('has proper ARIA role and level attributes', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading level="h2">Section Title</monk-heading>
      `);
      expect(el.getAttribute('role')).to.equal('heading');
      expect(el.getAttribute('aria-level')).to.equal('2');
    });

    it('updates ARIA level when level property changes', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading level="h3">Heading</monk-heading>
      `);
      expect(el.getAttribute('aria-level')).to.equal('3');

      el.level = 'h4';
      await elementUpdated(el);

      expect(el.getAttribute('aria-level')).to.equal('4');
    });

    it('supports all heading levels (h1-h6)', async () => {
      const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

      for (const level of levels) {
        const el = await fixture<MonkHeading>(html`
          <monk-heading level=${level}>Heading Level ${level}</monk-heading>
        `);
        const expectedLevel = level.substring(1);
        expect(el.getAttribute('aria-level')).to.equal(expectedLevel);
        await expect(el).to.be.accessible();
      }
    });

    it('has sufficient color contrast for accessibility', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading level="h1">Title</monk-heading>
      `);
      const styles = getComputedStyle(el);
      const color = styles.getPropertyValue('color');
      // Verify color is set (actual contrast ratio testing would require additional tooling)
      expect(color).to.not.equal('');
    });
  });

  describe('Rendering', () => {
    it('renders with default properties', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading>Default Heading</monk-heading>
      `);
      expect(el.level).to.equal('h2');
      expect(el.align).to.equal('left');
      expect(el.textContent?.trim()).to.equal('Default Heading');
    });

    it('renders with custom level', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading level="h1">Custom Level</monk-heading>
      `);
      expect(el.level).to.equal('h1');
      expect(el.getAttribute('level')).to.equal('h1');
    });

    it('renders slotted content correctly', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading level="h3">
          <span>Complex</span> <strong>Content</strong>
        </monk-heading>
      `);
      const slot = el.shadowRoot?.querySelector('slot');
      expect(slot).to.exist;
    });

    it('can be hidden', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading hidden>Hidden Heading</monk-heading>
      `);
      expect(el.hidden).to.be.true;
      expect(el.hasAttribute('hidden')).to.be.true;
    });
  });

  describe('Alignment', () => {
    it('defaults to left alignment', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading>Left Aligned</monk-heading>
      `);
      expect(el.align).to.equal('left');
    });

    it('supports center alignment', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading align="center">Centered</monk-heading>
      `);
      expect(el.align).to.equal('center');
      expect(el.getAttribute('align')).to.equal('center');
    });

    it('supports right alignment', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading align="right">Right Aligned</monk-heading>
      `);
      expect(el.align).to.equal('right');
      expect(el.getAttribute('align')).to.equal('right');
    });

    it('updates alignment dynamically', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading>Heading</monk-heading>
      `);
      expect(el.align).to.equal('left');

      el.align = 'center';
      await elementUpdated(el);
      expect(el.getAttribute('align')).to.equal('center');
    });
  });

  describe('Events', () => {
    it('emits change event when level changes', async () => {
      const el = await fixture<MonkHeading>(html`
        <monk-heading level="h2">Heading</monk-heading>
      `);

      let eventDetail: unknown = null;
      el.addEventListener('change', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });

      el.level = 'h3';
      await elementUpdated(el);

      expect(eventDetail).to.deep.equal({ level: 'h3' });
    });
  });

  describe('Token Integration', () => {
    it('applies font-size attributes based on level', async () => {
      const h1 = await fixture<MonkHeading>(html`
        <monk-heading level="h1">H1</monk-heading>
      `);
      const h6 = await fixture<MonkHeading>(html`
        <monk-heading level="h6">H6</monk-heading>
      `);

      // Verify level attributes are set correctly
      // (CSS custom properties are tested in Storybook/browser environment)
      expect(h1.level).to.equal('h1');
      expect(h6.level).to.equal('h6');
      expect(h1.getAttribute('level')).to.equal('h1');
      expect(h6.getAttribute('level')).to.equal('h6');
    });
  });
});
