import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { MonkSearchInput } from './search-input.js';

describe('MonkSearchInput', () => {
  it('should be defined', () => {
    const element = document.createElement('monk-search-input');
    expect(element).to.be.instanceOf(MonkSearchInput);
  });

  it('should render with default properties', async () => {
    const element = await fixture<MonkSearchInput>(html`<monk-search-input></monk-search-input>`);

    expect(element.size).to.equal('md');
    expect(element.variant).to.equal('outline');
    expect(element.value).to.equal('');
  });

  describe('Input Type', () => {
    it('should use search input type', async () => {
      const element = await fixture<MonkSearchInput>(html`<monk-search-input></monk-search-input>`);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.type).to.equal('search');
    });
  });

  describe('Search Features', () => {
    it('should accept search query text', async () => {
      const element = await fixture<MonkSearchInput>(html`
        <monk-search-input value="search query"></monk-search-input>
      `);

      expect(element.value).to.equal('search query');
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.equal('search query');
    });

    it('should support placeholder for search hints', async () => {
      const element = await fixture<MonkSearchInput>(html`
        <monk-search-input placeholder="Search products..."></monk-search-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.placeholder).to.equal('Search products...');
    });
  });

  describe('Browser UI', () => {
    it('should provide browser-native search icon', async () => {
      const element = await fixture<MonkSearchInput>(html`<monk-search-input></monk-search-input>`);

      const input = element.shadowRoot?.querySelector('input');
      // Search inputs have browser-specific UI including search icon
      expect(input?.type).to.equal('search');
    });

    it('should provide browser-native clear button when value exists', async () => {
      const element = await fixture<MonkSearchInput>(html`
        <monk-search-input value="search"></monk-search-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      // Browser provides clear button for search inputs with values
      expect(input?.value).to.not.be.empty;
    });
  });

  describe('Events', () => {
    it('should emit input-change event', async () => {
      const element = await fixture<MonkSearchInput>(html`<monk-search-input></monk-search-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = 'search query';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });

      const event = await oneEvent(element, 'input-change');
      expect(event.detail.value).to.equal('search query');
    });

    it('should emit input-changed event on change', async () => {
      const element = await fixture<MonkSearchInput>(html`<monk-search-input></monk-search-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = 'search query';
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });

      const event = await oneEvent(element, 'input-changed');
      expect(event.detail.value).to.equal('search query');
    });

    it('should handle Enter key for search submission', async () => {
      const element = await fixture<MonkSearchInput>(html`<monk-search-input></monk-search-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = 'search query';
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
        });
        input.dispatchEvent(enterEvent);
      });

      const event = await oneEvent(element, 'input-keydown');
      expect(event.detail.key).to.equal('Enter');
    });
  });

  describe('Common Search UX Patterns', () => {
    it('should work in search bars', async () => {
      const element = await fixture<MonkSearchInput>(html`
        <monk-search-input
          size="lg"
          placeholder="Search thousands of products..."
        ></monk-search-input>
      `);

      expect(element.size).to.equal('lg');
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.placeholder).to.include('products');
    });

    it('should work in sidebar filters', async () => {
      const element = await fixture<MonkSearchInput>(html`
        <monk-search-input
          size="sm"
          placeholder="Filter menu..."
        ></monk-search-input>
      `);

      expect(element.size).to.equal('sm');
    });

    it('should work in header navigation', async () => {
      const element = await fixture<MonkSearchInput>(html`
        <monk-search-input
          variant="filled"
          placeholder="Search..."
        ></monk-search-input>
      `);

      expect(element.variant).to.equal('filled');
    });
  });

  describe('Accessibility', () => {
    it('should set aria-invalid on invalid state', async () => {
      const element = await fixture<MonkSearchInput>(html`
        <monk-search-input invalid></monk-search-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should support autocomplete attribute', async () => {
      const element = await fixture<MonkSearchInput>(html`
        <monk-search-input autocomplete="off"></monk-search-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('autocomplete')).to.equal('off');
    });

    it('should support role attribute for search', async () => {
      const element = await fixture<MonkSearchInput>(html`
        <monk-search-input role="search"></monk-search-input>
      `);

      expect(element.getAttribute('role')).to.equal('search');
    });
  });

  describe('Integration with BaseInput', () => {
    it('should support all variants', async () => {
      const outline = await fixture<MonkSearchInput>(html`
        <monk-search-input variant="outline"></monk-search-input>
      `);
      expect(outline.variant).to.equal('outline');

      const filled = await fixture<MonkSearchInput>(html`
        <monk-search-input variant="filled"></monk-search-input>
      `);
      expect(filled.variant).to.equal('filled');

      const flushed = await fixture<MonkSearchInput>(html`
        <monk-search-input variant="flushed"></monk-search-input>
      `);
      expect(flushed.variant).to.equal('flushed');
    });

    it('should support all sizes', async () => {
      const sm = await fixture<MonkSearchInput>(html`<monk-search-input size="sm"></monk-search-input>`);
      expect(sm.size).to.equal('sm');

      const md = await fixture<MonkSearchInput>(html`<monk-search-input size="md"></monk-search-input>`);
      expect(md.size).to.equal('md');

      const lg = await fixture<MonkSearchInput>(html`<monk-search-input size="lg"></monk-search-input>`);
      expect(lg.size).to.equal('lg');
    });

    it('should support labels', async () => {
      const element = await fixture<MonkSearchInput>(html`
        <monk-search-input label="Search"></monk-search-input>
      `);

      expect(element.label).to.equal('Search');
    });

    it('should support helper text', async () => {
      const element = await fixture<MonkSearchInput>(html`
        <monk-search-input helper-text="Try searching for 'laptop', 'phone', or 'headphones'"></monk-search-input>
      `);

      expect(element.helperText).to.include('laptop');
    });

    it('should support disabled state', async () => {
      const element = await fixture<MonkSearchInput>(html`
        <monk-search-input disabled></monk-search-input>
      `);

      expect(element.disabled).to.be.true;
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.disabled).to.be.true;
    });
  });
});
