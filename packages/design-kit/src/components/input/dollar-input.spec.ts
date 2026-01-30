import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { MonkDollarInput } from './dollar-input.js';

describe('MonkDollarInput', () => {
  it('should be defined', () => {
    const element = document.createElement('monk-dollar-input');
    expect(element).to.be.instanceOf(MonkDollarInput);
  });

  it('should render with default properties', async () => {
    const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

    expect(element.size).to.equal('md');
    expect(element.variant).to.equal('outline');
    expect(element.value).to.equal('');
    expect(element.disabled).to.be.false;
    expect(element.readonly).to.be.false;
    expect(element.required).to.be.false;
    expect(element.invalid).to.be.false;
  });

  describe('Initial Formatting', () => {
    it('should show $0 when empty', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.equal('$0');
    });

    it('should format initial numeric value', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input value="1234"></monk-dollar-input>
      `);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.equal('$1,234');
    });

    it('should format initial value with decimals', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input value="1234.56"></monk-dollar-input>
      `);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.equal('$1,234.56');
    });

    it('should format large amounts with commas', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input value="1234567.89"></monk-dollar-input>
      `);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.equal('$1,234,567.89');
    });
  });

  describe('Currency Formatting', () => {
    it('should show $4 when typing 4', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = '$4';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      expect(element.value).to.equal('4');
      expect(input.value).to.equal('$4');
    });

    it('should show $45 when typing 45', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = '$45';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      expect(element.value).to.equal('45');
      expect(input.value).to.equal('$45');
    });

    it('should add comma for thousands', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = '$1,234';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      expect(element.value).to.equal('1234');
      expect(input.value).to.equal('$1,234');
    });
  });

  describe('Decimal Handling', () => {
    it('should allow decimal point', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = '$4.';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      expect(element.value).to.equal('4.');
      expect(input.value).to.equal('$4.');
    });

    it('should show one decimal place', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = '$4.5';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      expect(element.value).to.equal('4.5');
      expect(input.value).to.equal('$4.5');
    });

    it('should show two decimal places', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = '$4.50';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      expect(element.value).to.equal('4.50');
      expect(input.value).to.equal('$4.50');
    });

    it('should not allow more than 2 decimal places', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input value="234.23"></monk-dollar-input>
      `);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input.value).to.equal('$234.23');

      // Try to add a third decimal place
      input.value = '$234.234';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      // Should revert to previous value
      expect(element.value).to.equal('234.23');
      expect(input.value).to.equal('$234.23');
    });

    it('should not allow multiple decimal points', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input value="234.5"></monk-dollar-input>
      `);
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      // Try to add another decimal point
      input.value = '$234.5.6';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      // Should revert to previous value
      expect(element.value).to.equal('234.5');
      expect(input.value).to.equal('$234.5');
    });
  });

  describe('Value Extraction', () => {
    it('should store unformatted numeric value', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = '$1,234.56';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      expect(element.value).to.equal('1234.56');
    });

    it('should remove dollar sign from value', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = '$100';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      expect(element.value).to.not.include('$');
      expect(element.value).to.equal('100');
    });

    it('should remove commas from value', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = '$1,234,567';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      expect(element.value).to.not.include(',');
      expect(element.value).to.equal('1234567');
    });
  });

  describe('Public API Methods', () => {
    it('should return numeric value via getNumericValue()', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input value="1234.56"></monk-dollar-input>
      `);

      expect(element.getNumericValue()).to.equal(1234.56);
    });

    it('should return 0 for empty value', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      expect(element.getNumericValue()).to.equal(0);
    });

    it('should return formatted string via getFormattedValue()', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input value="1234.56"></monk-dollar-input>
      `);

      expect(element.getFormattedValue()).to.equal('$1,234.56');
    });

    it('should format with 2 decimal places in getFormattedValue()', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input value="1234"></monk-dollar-input>
      `);

      // getFormattedValue always shows .00
      expect(element.getFormattedValue()).to.equal('$1,234.00');
    });
  });

  describe('Events', () => {
    it('should emit input-change event with numeric value', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = '$100';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });

      const event = await oneEvent(element, 'input-change');
      expect(event.detail.value).to.equal('100');
    });

    it('should emit input-changed event on change', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = '$250.50';
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });

      const event = await oneEvent(element, 'input-changed');
      expect(event.detail.value).to.equal('250.50');
    });
  });

  describe('Programmatic Value Setting', () => {
    it('should format when value is set programmatically', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      element.value = '5000';
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.equal('$5,000');
    });

    it('should handle decimal values set programmatically', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      element.value = '999.99';
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.equal('$999.99');
    });
  });

  describe('Accessibility', () => {
    it('should have correct input type', async () => {
      const element = await fixture<MonkDollarInput>(html`<monk-dollar-input></monk-dollar-input>`);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.type).to.equal('text');
    });

    it('should set aria-invalid on invalid state', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input invalid></monk-dollar-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).to.equal('true');
    });
  });

  describe('Integration with BaseInput', () => {
    it('should support all variants', async () => {
      const outline = await fixture<MonkDollarInput>(html`
        <monk-dollar-input variant="outline"></monk-dollar-input>
      `);
      expect(outline.variant).to.equal('outline');

      const filled = await fixture<MonkDollarInput>(html`
        <monk-dollar-input variant="filled"></monk-dollar-input>
      `);
      expect(filled.variant).to.equal('filled');

      const flushed = await fixture<MonkDollarInput>(html`
        <monk-dollar-input variant="flushed"></monk-dollar-input>
      `);
      expect(flushed.variant).to.equal('flushed');
    });

    it('should support all sizes', async () => {
      const sm = await fixture<MonkDollarInput>(html`<monk-dollar-input size="sm"></monk-dollar-input>`);
      expect(sm.size).to.equal('sm');

      const md = await fixture<MonkDollarInput>(html`<monk-dollar-input size="md"></monk-dollar-input>`);
      expect(md.size).to.equal('md');

      const lg = await fixture<MonkDollarInput>(html`<monk-dollar-input size="lg"></monk-dollar-input>`);
      expect(lg.size).to.equal('lg');
    });

    it('should support disabled state', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input disabled></monk-dollar-input>
      `);

      expect(element.disabled).to.be.true;
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.disabled).to.be.true;
    });

    it('should support readonly state', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input readonly></monk-dollar-input>
      `);

      expect(element.readonly).to.be.true;
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.readOnly).to.be.true;
    });

    it('should support labels and helper text', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input
          label="Loan Amount"
          helper-text="Enter the total loan amount"
        ></monk-dollar-input>
      `);

      expect(element.label).to.equal('Loan Amount');
      expect(element.helperText).to.equal('Enter the total loan amount');
    });
  });

  describe('Validation', () => {
    it('should validate on input when validateOn is "input"', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input
          validate
          validate-on="input"
          .validators=${[(val: string) => parseFloat(val) >= 100]}
          validation-message="Minimum amount is $100"
        ></monk-dollar-input>
      `);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      // Type amount less than $100
      input.value = '$50';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      element.performValidation();
      expect(element.invalid).to.be.true;

      // Type amount >= $100
      input.value = '$150';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      element.performValidation();
      expect(element.invalid).to.be.false;
    });

    it('should validate on change when validateOn is "change"', async () => {
      const element = await fixture<MonkDollarInput>(html`
        <monk-dollar-input
          validate
          validate-on="change"
          .validators=${[(val: string) => parseFloat(val) <= 10000]}
          validation-message="Maximum amount is $10,000"
        ></monk-dollar-input>
      `);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      // Type amount > $10,000
      input.value = '$15000';
      input.dispatchEvent(new Event('change', { bubbles: true }));
      await element.updateComplete;

      element.performValidation();
      expect(element.invalid).to.be.true;

      // Type amount <= $10,000
      input.value = '$5000';
      input.dispatchEvent(new Event('change', { bubbles: true }));
      await element.updateComplete;

      element.performValidation();
      expect(element.invalid).to.be.false;
    });
  });
});
