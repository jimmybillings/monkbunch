import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { MonkTextInput } from './text-input.js';

describe('MonkTextInput', () => {
  it('should be defined', () => {
    const element = document.createElement('monk-text-input');
    expect(element).to.be.instanceOf(MonkTextInput);
  });

  it('should render with default properties', async () => {
    const element = await fixture<MonkTextInput>(html`<monk-text-input></monk-text-input>`);

    expect(element.size).to.equal('md');
    expect(element.variant).to.equal('outline');
    expect(element.value).to.equal('');
    expect(element.disabled).to.be.false;
    expect(element.readonly).to.be.false;
    expect(element.required).to.be.false;
    expect(element.invalid).to.be.false;
  });

  describe('Variants', () => {
    it('should render outline variant', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input variant="outline"></monk-text-input>
      `);

      expect(element.variant).to.equal('outline');
      expect(element.getAttribute('variant')).to.equal('outline');
    });

    it('should render filled variant', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input variant="filled"></monk-text-input>
      `);

      expect(element.variant).to.equal('filled');
      expect(element.getAttribute('variant')).to.equal('filled');
    });

    it('should render flushed variant', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input variant="flushed"></monk-text-input>
      `);

      expect(element.variant).to.equal('flushed');
      expect(element.getAttribute('variant')).to.equal('flushed');
    });
  });

  describe('Sizes', () => {
    it('should render small size', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input size="sm"></monk-text-input>`);

      expect(element.size).to.equal('sm');
      expect(element.getAttribute('size')).to.equal('sm');
    });

    it('should render medium size', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input size="md"></monk-text-input>`);

      expect(element.size).to.equal('md');
      expect(element.getAttribute('size')).to.equal('md');
    });

    it('should render large size', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input size="lg"></monk-text-input>`);

      expect(element.size).to.equal('lg');
      expect(element.getAttribute('size')).to.equal('lg');
    });
  });

  describe('Label', () => {
    it('should render without label by default', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input></monk-text-input>`);

      const label = element.shadowRoot?.querySelector('.label');
      expect(label).to.be.null;
    });

    it('should render with label', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input label="Username"></monk-text-input>
      `);

      expect(element.label).to.equal('Username');

      const label = element.shadowRoot?.querySelector('.label');
      expect(label).to.exist;
      expect(label?.textContent).to.include('Username');
    });

    it('should show required indicator when required', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input label="Email" required></monk-text-input>
      `);

      const indicator = element.shadowRoot?.querySelector('.required-indicator');
      expect(indicator).to.exist;
      expect(indicator?.textContent).to.equal('*');
    });
  });

  describe('Value', () => {
    it('should set initial value', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input value="test value"></monk-text-input>
      `);

      expect(element.value).to.equal('test value');

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.value).to.equal('test value');
    });

    it('should update value on input', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input></monk-text-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = 'new value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      expect(element.value).to.equal('new value');
    });

    it('should emit input-change event', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input></monk-text-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = 'new value';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });

      const event = await oneEvent(element, 'input-change');
      expect(event.detail.value).to.equal('new value');
    });

    it('should emit input-changed event on change', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input></monk-text-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.value = 'changed value';
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });

      const event = await oneEvent(element, 'input-changed');
      expect(event.detail.value).to.equal('changed value');
    });
  });

  describe('Placeholder', () => {
    it('should render with placeholder', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input placeholder="Enter text..."></monk-text-input>
      `);

      expect(element.placeholder).to.equal('Enter text...');

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.placeholder).to.equal('Enter text...');
    });
  });

  describe('States', () => {
    it('should render disabled state', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input disabled></monk-text-input>`);

      expect(element.disabled).to.be.true;
      expect(element.hasAttribute('disabled')).to.be.true;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.disabled).to.be.true;
    });

    it('should render readonly state', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input readonly></monk-text-input>`);

      expect(element.readonly).to.be.true;
      expect(element.hasAttribute('readonly')).to.be.true;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.readOnly).to.be.true;
    });

    it('should render required state', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input required></monk-text-input>`);

      expect(element.required).to.be.true;
      expect(element.hasAttribute('required')).to.be.true;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.required).to.be.true;
    });

    it('should render invalid state', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input invalid></monk-text-input>`);

      expect(element.invalid).to.be.true;
      expect(element.hasAttribute('invalid')).to.be.true;

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).to.equal('true');
    });
  });

  describe('Helper Text', () => {
    it('should render helper text', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input helper-text="This is a hint"></monk-text-input>
      `);

      const helperText = element.shadowRoot?.querySelector('.helper-text');
      expect(helperText).to.exist;
      expect(helperText?.textContent).to.equal('This is a hint');
    });
  });

  describe('Error Message', () => {
    it('should render error message when invalid', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input invalid error-message="This field is required"></monk-text-input>
      `);

      const errorMessage = element.shadowRoot?.querySelector('.error-message');
      expect(errorMessage).to.exist;
      expect(errorMessage?.textContent).to.equal('This field is required');
    });

    it('should replace helper text with error message', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input
          invalid
          helper-text="Helper"
          error-message="Error"
        ></monk-text-input>
      `);

      const errorMessage = element.shadowRoot?.querySelector('.error-message');
      const helperText = element.shadowRoot?.querySelector('.helper-text');

      expect(errorMessage).to.exist;
      expect(helperText).to.be.null;
    });
  });

  describe('Character Count', () => {
    it('should not show count by default', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input maxlength="100"></monk-text-input>
      `);

      const count = element.shadowRoot?.querySelector('.char-count');
      expect(count).to.be.null;
    });

    it('should show character count when enabled', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input maxlength="100" show-count></monk-text-input>
      `);

      const count = element.shadowRoot?.querySelector('.char-count');
      expect(count).to.exist;
      expect(count?.textContent).to.equal('0 / 100');
    });

    it('should update character count on input', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input maxlength="100" show-count value="test"></monk-text-input>
      `);

      await element.updateComplete;

      const count = element.shadowRoot?.querySelector('.char-count');
      expect(count?.textContent).to.equal('4 / 100');
    });
  });

  describe('Focus Methods', () => {
    it('should focus input when focus() is called', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input></monk-text-input>`);

      element.focus();
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('input');
      expect(document.activeElement).to.equal(element);
      expect(element.shadowRoot?.activeElement).to.equal(input);
    });

    it('should emit focus event', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input></monk-text-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => input.focus());

      const event = await oneEvent(element, 'input-focus');
      expect(event).to.exist;
    });

    it('should emit blur event', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input></monk-text-input>`);

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

      setTimeout(() => {
        input.focus();
        input.blur();
      });

      const event = await oneEvent(element, 'input-blur');
      expect(event).to.exist;
    });
  });

  describe('Slots', () => {
    it('should render prefix slot', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input>
          <span slot="prefix">$</span>
        </monk-text-input>
      `);

      const prefix = element.querySelector('[slot="prefix"]');
      expect(prefix).to.exist;
      expect(prefix?.textContent).to.equal('$');
    });

    it('should render suffix slot', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input>
          <span slot="suffix">.com</span>
        </monk-text-input>
      `);

      const suffix = element.querySelector('[slot="suffix"]');
      expect(suffix).to.exist;
      expect(suffix?.textContent).to.equal('.com');
    });
  });

  describe('Accessibility', () => {
    it('should have correct input type', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input></monk-text-input>`);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.type).to.equal('text');
    });

    it('should set aria-invalid on invalid state', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input invalid></monk-text-input>`);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should have aria-describedby for error message', async () => {
      const element = await fixture<MonkTextInput>(html`
        <monk-text-input invalid error-message="Error"></monk-text-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      expect(input?.hasAttribute('aria-describedby')).to.be.true;
    });
  });

  describe('CSS Parts', () => {
    it('should expose wrapper part', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input></monk-text-input>`);

      const wrapper = element.shadowRoot?.querySelector('[part="wrapper"]');
      expect(wrapper).to.exist;
    });

    it('should expose input-container part', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input></monk-text-input>`);

      const container = element.shadowRoot?.querySelector('[part="input-container"]');
      expect(container).to.exist;
    });

    it('should expose input part', async () => {
      const element = await fixture<MonkTextInput>(html`<monk-text-input></monk-text-input>`);

      const input = element.shadowRoot?.querySelector('[part="input"]');
      expect(input).to.exist;
    });
  });
});
