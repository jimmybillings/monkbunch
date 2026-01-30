import { expect, fixture, html } from '@open-wc/testing';
import { MonkDateInput } from './date-input.js';

describe('MonkDateInput', () => {
  it('should be defined', () => {
    const element = document.createElement('monk-date-input');
    expect(element).to.be.instanceOf(MonkDateInput);
  });

  it('should render with default properties', async () => {
    const element = await fixture<MonkDateInput>(html`<monk-date-input></monk-date-input>`);

    expect(element.size).to.equal('md');
    expect(element.variant).to.equal('outline');
    expect(element.value).to.equal('');
  });

  describe('Date Masking', () => {
    it('should show prompt on initial render', async () => {
      const element = await fixture<MonkDateInput>(html`<monk-date-input></monk-date-input>`);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.equal('MM/DD/YYYY');
    });

    it('should format as MM/DD/YYYY pattern', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input value="01/15/2024"></monk-date-input>
      `);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.include('01/15/2024');
    });

    it('should format partial dates', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input value="01/15"></monk-date-input>
      `);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.include('01/15');
    });
  });

  describe('ISO Date Conversion', () => {
    it('should convert ISO date to UI format', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input value="2024-01-15"></monk-date-input>
      `);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.include('01/15/2024');
    });

    it('should convert UI format to ISO via getApiValue()', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input value="01/15/2024"></monk-date-input>
      `);

      const apiValue = element.getApiValue();
      expect(apiValue).to.equal('2024-01-15');
    });

    it('should handle single-digit months', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input value="1/15/2024"></monk-date-input>
      `);

      const apiValue = element.getApiValue();
      expect(apiValue).to.equal('2024-01-15');
    });

    it('should handle single-digit days', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input value="01/5/2024"></monk-date-input>
      `);

      const apiValue = element.getApiValue();
      expect(apiValue).to.equal('2024-01-05');
    });

    it('should return empty string for incomplete dates', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input value="01/15"></monk-date-input>
      `);

      const apiValue = element.getApiValue();
      expect(apiValue).to.equal('');
    });
  });

  describe('getUnmaskedValue()', () => {
    it('should return only digits', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input value="01/15/2024"></monk-date-input>
      `);

      const unmasked = element.getUnmaskedValue();
      expect(unmasked).to.equal('01152024');
      expect(unmasked).to.match(/^\d+$/);
    });

    it('should work with partial dates', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input value="01/15"></monk-date-input>
      `);

      const unmasked = element.getUnmaskedValue();
      expect(unmasked).to.equal('0115');
    });
  });

  describe('getMaskedValue()', () => {
    it('should return formatted date', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input value="01/15/2024"></monk-date-input>
      `);

      const masked = element.getMaskedValue();
      expect(masked).to.equal('01/15/2024');
    });

    it('should format partial dates', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input value="01/15"></monk-date-input>
      `);

      const masked = element.getMaskedValue();
      expect(masked).to.equal('01/15');
    });
  });

  describe('Input Type', () => {
    it('should use text input type', async () => {
      const element = await fixture<MonkDateInput>(html`<monk-date-input></monk-date-input>`);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.type).to.equal('text');
    });
  });

  describe('Validation', () => {
    it('should validate complete dates', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input
          value="01/15/2024"
          validate
          .validators=${[(val: string) => val.length === 10]}
        ></monk-date-input>
      `);

      const isValid = element.checkValidity();
      expect(isValid).to.be.true;
    });

    it('should invalidate incomplete dates', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input
          value="01/15"
          validate
          .validators=${[(val: string) => val.length === 10]}
          validation-message="Please enter a complete date"
        ></monk-date-input>
      `);

      element.performValidation();
      expect(element.invalid).to.be.true;
    });
  });

  describe('Programmatic Value Setting', () => {
    it('should format when UI date is set', async () => {
      const element = await fixture<MonkDateInput>(html`<monk-date-input></monk-date-input>`);

      element.value = '12/25/2024';
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.include('12/25/2024');
    });

    it('should convert and format when ISO date is set', async () => {
      const element = await fixture<MonkDateInput>(html`<monk-date-input></monk-date-input>`);

      element.value = '2024-12-25';
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.include('12/25/2024');
    });
  });

  describe('Accessibility', () => {
    it('should set aria-invalid on invalid state', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input invalid></monk-date-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).to.equal('true');
    });
  });

  describe('Integration with BaseInput', () => {
    it('should support labels', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input label="Birth Date"></monk-date-input>
      `);

      expect(element.label).to.equal('Birth Date');
    });

    it('should support helper text', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input helper-text="MM/DD/YYYY format"></monk-date-input>
      `);

      expect(element.helperText).to.equal('MM/DD/YYYY format');
    });

    it('should support disabled state', async () => {
      const element = await fixture<MonkDateInput>(html`
        <monk-date-input disabled></monk-date-input>
      `);

      expect(element.disabled).to.be.true;
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.disabled).to.be.true;
    });
  });
});
