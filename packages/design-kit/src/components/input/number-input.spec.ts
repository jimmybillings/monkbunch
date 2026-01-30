import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { MonkNumberInput } from './number-input.js';

describe('MonkNumberInput', () => {
  it('should be defined', () => {
    const element = document.createElement('monk-number-input');
    expect(element).to.be.instanceOf(MonkNumberInput);
  });

  it('should render with default properties', async () => {
    const element = await fixture<MonkNumberInput>(html`<monk-number-input></monk-number-input>`);

    expect(element.size).to.equal('md');
    expect(element.variant).to.equal('outline');
    expect(element.value).to.equal('');
  });

  describe('Input Type', () => {
    it('should use number input type', async () => {
      const element = await fixture<MonkNumberInput>(html`<monk-number-input></monk-number-input>`);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.type).to.equal('number');
    });
  });

  describe('Numeric Values', () => {
    it('should accept integer values', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input value="42"></monk-number-input>
      `);

      expect(element.value).to.equal('42');
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.equal('42');
    });

    it('should accept decimal values', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input value="3.14"></monk-number-input>
      `);

      expect(element.value).to.equal('3.14');
    });

    it('should accept negative values', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input value="-10"></monk-number-input>
      `);

      expect(element.value).to.equal('-10');
    });
  });

  describe('Min/Max Attributes', () => {
    it('should support min attribute', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input min="0"></monk-number-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.min).to.equal('0');
    });

    it('should support max attribute', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input max="100"></monk-number-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.max).to.equal('100');
    });

    it('should support step attribute', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input step="0.01"></monk-number-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.step).to.equal('0.01');
    });
  });

  describe('Browser Spinner Controls', () => {
    it('should display spinner controls by default', async () => {
      const element = await fixture<MonkNumberInput>(html`<monk-number-input></monk-number-input>`);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.type).to.equal('number');
    });
  });

  describe('Events', () => {
    it('should emit input-change event', async () => {
      const element = await fixture<MonkNumberInput>(html`<monk-number-input></monk-number-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = '100';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });

      const event = await oneEvent(element, 'input-change');
      expect(event.detail.value).to.equal('100');
    });

    it('should emit input-changed event on change', async () => {
      const element = await fixture<MonkNumberInput>(html`<monk-number-input></monk-number-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = '50';
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });

      const event = await oneEvent(element, 'input-changed');
      expect(event.detail.value).to.equal('50');
    });
  });

  describe('Validation', () => {
    it('should validate against min value', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input
          min="10"
          value="5"
          validate
          .validators=${[(val: string) => parseInt(val) >= 10]}
        ></monk-number-input>
      `);

      element.performValidation();
      expect(element.invalid).to.be.true;
    });

    it('should validate against max value', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input
          max="100"
          value="150"
          validate
          .validators=${[(val: string) => parseInt(val) <= 100]}
        ></monk-number-input>
      `);

      element.performValidation();
      expect(element.invalid).to.be.true;
    });

    it('should accept valid values within range', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input
          min="10"
          max="100"
          value="50"
          validate
          .validators=${[(val: string) => {
            const num = parseInt(val);
            return num >= 10 && num <= 100;
          }]}
        ></monk-number-input>
      `);

      element.performValidation();
      expect(element.invalid).to.be.false;
    });
  });

  describe('Accessibility', () => {
    it('should set aria-invalid on invalid state', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input invalid></monk-number-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should support inputmode attribute', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input inputmode="numeric"></monk-number-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('inputmode')).to.equal('numeric');
    });
  });

  describe('Integration with BaseInput', () => {
    it('should support all variants', async () => {
      const outline = await fixture<MonkNumberInput>(html`
        <monk-number-input variant="outline"></monk-number-input>
      `);
      expect(outline.variant).to.equal('outline');
    });

    it('should support all sizes', async () => {
      const lg = await fixture<MonkNumberInput>(html`<monk-number-input size="lg"></monk-number-input>`);
      expect(lg.size).to.equal('lg');
    });

    it('should support labels', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input label="Quantity"></monk-number-input>
      `);

      expect(element.label).to.equal('Quantity');
    });

    it('should support disabled state', async () => {
      const element = await fixture<MonkNumberInput>(html`
        <monk-number-input disabled></monk-number-input>
      `);

      expect(element.disabled).to.be.true;
    });
  });
});
