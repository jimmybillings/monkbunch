import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { MonkURLInput } from './url-input.js';

describe('MonkURLInput', () => {
  it('should be defined', () => {
    const element = document.createElement('monk-url-input');
    expect(element).to.be.instanceOf(MonkURLInput);
  });

  it('should render with default properties', async () => {
    const element = await fixture<MonkURLInput>(html`<monk-url-input></monk-url-input>`);

    expect(element.size).to.equal('md');
    expect(element.variant).to.equal('outline');
    expect(element.value).to.equal('');
  });

  describe('Input Type', () => {
    it('should use url input type', async () => {
      const element = await fixture<MonkURLInput>(html`<monk-url-input></monk-url-input>`);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.type).to.equal('url');
    });
  });

  describe('URL Values', () => {
    it('should accept valid URLs', async () => {
      const element = await fixture<MonkURLInput>(html`
        <monk-url-input value="https://example.com"></monk-url-input>
      `);

      expect(element.value).to.equal('https://example.com');
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.equal('https://example.com');
    });

    it('should accept URLs with paths', async () => {
      const element = await fixture<MonkURLInput>(html`
        <monk-url-input value="https://example.com/path/to/page"></monk-url-input>
      `);

      expect(element.value).to.equal('https://example.com/path/to/page');
    });

    it('should accept URLs with query parameters', async () => {
      const element = await fixture<MonkURLInput>(html`
        <monk-url-input value="https://example.com?foo=bar&baz=qux"></monk-url-input>
      `);

      expect(element.value).to.include('foo=bar');
    });

    it('should accept different protocols', async () => {
      const http = await fixture<MonkURLInput>(html`
        <monk-url-input value="http://example.com"></monk-url-input>
      `);
      expect(http.value).to.include('http://');

      const https = await fixture<MonkURLInput>(html`
        <monk-url-input value="https://example.com"></monk-url-input>
      `);
      expect(https.value).to.include('https://');

      const ftp = await fixture<MonkURLInput>(html`
        <monk-url-input value="ftp://files.example.com"></monk-url-input>
      `);
      expect(ftp.value).to.include('ftp://');
    });
  });

  describe('Browser Validation', () => {
    it('should leverage native URL validation', async () => {
      const element = await fixture<MonkURLInput>(html`<monk-url-input></monk-url-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      // Set invalid URL
      input.value = 'not a url';
      const isValid = input.checkValidity();
      expect(isValid).to.be.false;
    });

    it('should validate properly formed URLs', async () => {
      const element = await fixture<MonkURLInput>(html`<monk-url-input></monk-url-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      // Set valid URL
      input.value = 'https://example.com';
      const isValid = input.checkValidity();
      expect(isValid).to.be.true;
    });
  });

  describe('Events', () => {
    it('should emit input-change event', async () => {
      const element = await fixture<MonkURLInput>(html`<monk-url-input></monk-url-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = 'https://example.com';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });

      const event = await oneEvent(element, 'input-change');
      expect(event.detail.value).to.equal('https://example.com');
    });

    it('should emit input-changed event on change', async () => {
      const element = await fixture<MonkURLInput>(html`<monk-url-input></monk-url-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = 'https://example.com';
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });

      const event = await oneEvent(element, 'input-changed');
      expect(event.detail.value).to.equal('https://example.com');
    });
  });

  describe('Validation', () => {
    it('should validate URL format with custom validator', async () => {
      const element = await fixture<MonkURLInput>(html`
        <monk-url-input
          value="https://example.com"
          validate
          .validators=${[(val: string) => val.startsWith('https://')]}
        ></monk-url-input>
      `);

      element.performValidation();
      expect(element.invalid).to.be.false;
    });

    it('should invalidate non-https URLs when required', async () => {
      const element = await fixture<MonkURLInput>(html`
        <monk-url-input
          value="http://example.com"
          validate
          .validators=${[(val: string) => val.startsWith('https://')]}
          validation-message="Please use HTTPS"
        ></monk-url-input>
      `);

      element.performValidation();
      expect(element.invalid).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('should set aria-invalid on invalid state', async () => {
      const element = await fixture<MonkURLInput>(html`
        <monk-url-input invalid></monk-url-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should support autocomplete attribute', async () => {
      const element = await fixture<MonkURLInput>(html`
        <monk-url-input autocomplete="url"></monk-url-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('autocomplete')).to.equal('url');
    });
  });

  describe('Integration with BaseInput', () => {
    it('should support all variants', async () => {
      const filled = await fixture<MonkURLInput>(html`
        <monk-url-input variant="filled"></monk-url-input>
      `);
      expect(filled.variant).to.equal('filled');
    });

    it('should support all sizes', async () => {
      const sm = await fixture<MonkURLInput>(html`<monk-url-input size="sm"></monk-url-input>`);
      expect(sm.size).to.equal('sm');
    });

    it('should support labels', async () => {
      const element = await fixture<MonkURLInput>(html`
        <monk-url-input label="Website"></monk-url-input>
      `);

      expect(element.label).to.equal('Website');
    });

    it('should support placeholder', async () => {
      const element = await fixture<MonkURLInput>(html`
        <monk-url-input placeholder="https://example.com"></monk-url-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.placeholder).to.equal('https://example.com');
    });

    it('should support helper text', async () => {
      const element = await fixture<MonkURLInput>(html`
        <monk-url-input helper-text="Include https://"></monk-url-input>
      `);

      expect(element.helperText).to.equal('Include https://');
    });
  });
});
