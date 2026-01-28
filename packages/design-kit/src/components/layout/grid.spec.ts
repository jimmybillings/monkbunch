import { expect, fixture, html } from '@open-wc/testing';
import './grid.js';
import type { MonkGrid } from './grid.js';

describe('MonkGrid', () => {
  it('renders with default properties', async () => {
    const el = await fixture<MonkGrid>(html`
      <monk-grid>
        <div>1</div>
        <div>2</div>
      </monk-grid>
    `);

    expect(el).to.exist;
    expect(el.autoFlow).to.equal('row');
    expect(el.inline).to.be.false;
  });

  it('renders with columns as number', async () => {
    const el = await fixture<MonkGrid>(html`
      <monk-grid columns="3">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </monk-grid>
    `);

    expect(el.columns).to.equal('3');
    expect(el.style.gridTemplateColumns).to.equal('repeat(3, 1fr)');
  });

  it('renders with columns as custom value', async () => {
    const el = await fixture<MonkGrid>(html`
      <monk-grid columns="200px 1fr 2fr">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </monk-grid>
    `);

    expect(el.columns).to.equal('200px 1fr 2fr');
    expect(el.style.gridTemplateColumns).to.equal('200px 1fr 2fr');
  });

  it('renders with rows as number', async () => {
    const el = await fixture<MonkGrid>(html`
      <monk-grid rows="2">
        <div>1</div>
        <div>2</div>
      </monk-grid>
    `);

    expect(el.rows).to.equal('2');
    expect(el.style.gridTemplateRows).to.equal('repeat(2, 1fr)');
  });

  it('renders with gap', async () => {
    const el = await fixture<MonkGrid>(html`
      <monk-grid gap="4">
        <div>1</div>
        <div>2</div>
      </monk-grid>
    `);

    expect(el.gap).to.equal('4');
    expect(el.getAttribute('gap')).to.equal('4');
  });

  it('renders with column-gap and row-gap', async () => {
    const el = await fixture<MonkGrid>(html`
      <monk-grid column-gap="4" row-gap="2">
        <div>1</div>
        <div>2</div>
      </monk-grid>
    `);

    expect(el.columnGap).to.equal('4');
    expect(el.rowGap).to.equal('2');
  });

  it('renders with min-column-width for responsive grid', async () => {
    const el = await fixture<MonkGrid>(html`
      <monk-grid min-column-width="200px">
        <div>1</div>
        <div>2</div>
      </monk-grid>
    `);

    expect(el.minColumnWidth).to.equal('200px');
    expect(el.style.gridTemplateColumns).to.equal('repeat(auto-fit, minmax(200px, 1fr))');
  });

  it('renders with auto-flow', async () => {
    const el = await fixture<MonkGrid>(html`
      <monk-grid auto-flow="column">
        <div>1</div>
        <div>2</div>
      </monk-grid>
    `);

    expect(el.autoFlow).to.equal('column');
    expect(el.getAttribute('auto-flow')).to.equal('column');
  });

  it('renders as inline-grid', async () => {
    const el = await fixture<MonkGrid>(html`
      <monk-grid inline>
        <div>1</div>
        <div>2</div>
      </monk-grid>
    `);

    expect(el.inline).to.be.true;
  });

  it('renders slotted content', async () => {
    const el = await fixture<MonkGrid>(html`
      <monk-grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </monk-grid>
    `);

    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;

    const slottedItems = el.querySelectorAll('div');
    expect(slottedItems.length).to.equal(2);
    expect(slottedItems[0].textContent).to.equal('Item 1');
  });
});
