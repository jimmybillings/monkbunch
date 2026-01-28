import { expect, fixture, html } from '@open-wc/testing';
import './container.js';
import type { MonkContainer } from './container.js';

describe('MonkContainer', () => {
  it('renders with default properties', async () => {
    const el = await fixture<MonkContainer>(html`
      <monk-container>
        <p>Content</p>
      </monk-container>
    `);

    expect(el).to.exist;
    expect(el.size).to.equal('xl');
    expect(el.centerContent).to.be.true;
  });

  it('renders with custom size', async () => {
    const el = await fixture<MonkContainer>(html`
      <monk-container size="lg">
        <p>Content</p>
      </monk-container>
    `);

    expect(el.size).to.equal('lg');
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('renders with centerContent disabled', async () => {
    const el = await fixture<MonkContainer>(html`
      <monk-container .centerContent=${false}>
        <p>Content</p>
      </monk-container>
    `);

    expect(el.centerContent).to.be.false;
    expect(el.hasAttribute('center-content')).to.be.false;
  });

  it('renders slotted content', async () => {
    const el = await fixture<MonkContainer>(html`
      <monk-container>
        <p>Test content</p>
      </monk-container>
    `);

    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;

    const slottedContent = el.querySelector('p');
    expect(slottedContent?.textContent).to.equal('Test content');
  });

  it('supports all container sizes', async () => {
    const sizes: Array<'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'> = [
      'sm',
      'md',
      'lg',
      'xl',
      '2xl',
      'full',
    ];

    for (const size of sizes) {
      const el = await fixture<MonkContainer>(html`
        <monk-container size=${size}>Content</monk-container>
      `);

      expect(el.size).to.equal(size);
    }
  });

  it('has accessible shadow DOM structure', async () => {
    const el = await fixture<MonkContainer>(html`
      <monk-container>
        <p>Content</p>
      </monk-container>
    `);

    const container = el.shadowRoot!.querySelector('.container');
    expect(container).to.exist;
    expect(container?.getAttribute('part')).to.equal('container');
  });
});
