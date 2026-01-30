import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { MonkPhoneInput } from './phone-input.js';

describe('MonkPhoneInput', () => {
  it('should be defined', () => {
    const element = document.createElement('monk-phone-input');
    expect(element).to.be.instanceOf(MonkPhoneInput);
  });

  it('should render with default properties', async () => {
    const element = await fixture<MonkPhoneInput>(html`<monk-phone-input></monk-phone-input>`);

    expect(element.size).to.equal('md');
    expect(element.variant).to.equal('outline');
    expect(element.value).to.equal('');
    expect(element.disabled).to.be.false;
    expect(element.readonly).to.be.false;
    expect(element.required).to.be.false;
    expect(element.invalid).to.be.false;
  });

  describe('Phone Number Masking', () => {
    it('should show prompt on initial render', async () => {
      const element = await fixture<MonkPhoneInput>(html`<monk-phone-input></monk-phone-input>`);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.equal('(###) ###-####');
    });

    it('should format as (###) ###-#### pattern', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input value="5551234567"></monk-phone-input>
      `);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.include('(555) 123-4567');
    });

    it('should format partial phone numbers', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input value="555"></monk-phone-input>
      `);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.include('(555)');
    });

    it('should add parentheses around area code', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input value="555123"></monk-phone-input>
      `);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.match(/\(555\) 123/);
    });

    it('should add dash between prefix and line number', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input value="5551234567"></monk-phone-input>
      `);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.match(/123-4567/);
    });
  });

  describe('Value Storage', () => {
    it('should store unmasked value', async () => {
      const element = await fixture<MonkPhoneInput>(html`<monk-phone-input></monk-phone-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = '(555) 123-4567####';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      // Value should contain only digits
      expect(element.value).to.match(/^\d+$/);
    });

    it('should remove formatting characters from value', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input value="5551234567"></monk-phone-input>
      `);

      expect(element.value).to.not.include('(');
      expect(element.value).to.not.include(')');
      expect(element.value).to.not.include(' ');
      expect(element.value).to.not.include('-');
    });
  });

  describe('getUnmaskedValue()', () => {
    it('should return only digits', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input value="5551234567"></monk-phone-input>
      `);

      const unmasked = element.getUnmaskedValue();
      expect(unmasked).to.equal('5551234567');
      expect(unmasked).to.match(/^\d+$/);
    });

    it('should work with partial numbers', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input value="555"></monk-phone-input>
      `);

      const unmasked = element.getUnmaskedValue();
      expect(unmasked).to.equal('555');
    });

    it('should return empty string for empty value', async () => {
      const element = await fixture<MonkPhoneInput>(html`<monk-phone-input></monk-phone-input>`);

      const unmasked = element.getUnmaskedValue();
      expect(unmasked).to.equal('');
    });
  });

  describe('getMaskedValue()', () => {
    it('should return formatted phone number', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input value="5551234567"></monk-phone-input>
      `);

      const masked = element.getMaskedValue();
      expect(masked).to.equal('(555) 123-4567');
    });

    it('should format partial numbers', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input value="555123"></monk-phone-input>
      `);

      const masked = element.getMaskedValue();
      expect(masked).to.equal('(555) 123');
    });
  });

  describe('Input Type', () => {
    it('should use tel input type', async () => {
      const element = await fixture<MonkPhoneInput>(html`<monk-phone-input></monk-phone-input>`);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.type).to.equal('tel');
    });
  });

  describe('Events', () => {
    it('should emit input-change event', async () => {
      const element = await fixture<MonkPhoneInput>(html`<monk-phone-input></monk-phone-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = '(555) 123-4567####';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });

      const event = await oneEvent(element, 'input-change');
      expect(event.detail.value).to.match(/^\d+$/);
    });

    it('should emit input-changed event on change', async () => {
      const element = await fixture<MonkPhoneInput>(html`<monk-phone-input></monk-phone-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = '(555) 123-4567####';
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });

      const event = await oneEvent(element, 'input-changed');
      expect(event).to.exist;
    });
  });

  describe('Validation', () => {
    it('should validate complete phone numbers', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input
          value="5551234567"
          validate
          .validators=${[(val: string) => val.length === 10]}
        ></monk-phone-input>
      `);

      const isValid = element.checkValidity();
      expect(isValid).to.be.true;
    });

    it('should invalidate incomplete phone numbers', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input
          value="555"
          validate
          .validators=${[(val: string) => val.length === 10]}
          validation-message="Phone number must be 10 digits"
        ></monk-phone-input>
      `);

      element.performValidation();
      expect(element.invalid).to.be.true;
    });
  });

  describe('Programmatic Value Setting', () => {
    it('should format when value is set programmatically', async () => {
      const element = await fixture<MonkPhoneInput>(html`<monk-phone-input></monk-phone-input>`);

      element.value = '5551234567';
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.include('(555) 123-4567');
    });

    it('should handle partial values', async () => {
      const element = await fixture<MonkPhoneInput>(html`<monk-phone-input></monk-phone-input>`);

      element.value = '555123';
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.include('(555) 123');
    });
  });

  describe('Accessibility', () => {
    it('should set aria-invalid on invalid state', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input invalid></monk-phone-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should support autocomplete attribute', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input autocomplete="tel"></monk-phone-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('autocomplete')).to.equal('tel');
    });
  });

  describe('Integration with BaseInput', () => {
    it('should support all variants', async () => {
      const outline = await fixture<MonkPhoneInput>(html`
        <monk-phone-input variant="outline"></monk-phone-input>
      `);
      expect(outline.variant).to.equal('outline');

      const filled = await fixture<MonkPhoneInput>(html`
        <monk-phone-input variant="filled"></monk-phone-input>
      `);
      expect(filled.variant).to.equal('filled');
    });

    it('should support all sizes', async () => {
      const sm = await fixture<MonkPhoneInput>(html`<monk-phone-input size="sm"></monk-phone-input>`);
      expect(sm.size).to.equal('sm');

      const lg = await fixture<MonkPhoneInput>(html`<monk-phone-input size="lg"></monk-phone-input>`);
      expect(lg.size).to.equal('lg');
    });

    it('should support labels', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input label="Phone Number"></monk-phone-input>
      `);

      expect(element.label).to.equal('Phone Number');
    });

    it('should support helper text', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input helper-text="Enter your mobile number"></monk-phone-input>
      `);

      expect(element.helperText).to.equal('Enter your mobile number');
    });
  });

  describe('Validation', () => {
    it('should validate on input when validateOn is "input"', async () => {
      const element = await fixture<MonkPhoneInput>(html`
        <monk-phone-input
          validate
          validate-on="input"
          .validators=${[(val: string) => val.length === 10]}
          validation-message="Phone must be 10 digits"
        ></monk-phone-input>
      `);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      // Type incomplete phone number
      input.value = '(555) 123';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      element.performValidation();
      expect(element.invalid).to.be.true;

      // Complete the phone number
      input.value = '(555) 123-4567';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      element.performValidation();
      expect(element.invalid).to.be.false;
    });
  });
});
