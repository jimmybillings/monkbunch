import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { MonkPasswordInput } from './password-input.js';

describe('MonkPasswordInput', () => {
  it('should be defined', () => {
    const element = document.createElement('monk-password-input');
    expect(element).to.be.instanceOf(MonkPasswordInput);
  });

  it('should render with default properties', async () => {
    const element = await fixture<MonkPasswordInput>(html`<monk-password-input></monk-password-input>`);

    expect(element.size).to.equal('md');
    expect(element.variant).to.equal('outline');
    expect(element.value).to.equal('');
    expect(element.disabled).to.be.false;
    expect(element.readonly).to.be.false;
    expect(element.required).to.be.false;
    expect(element.invalid).to.be.false;
    expect(element.showToggle).to.be.false;
  });

  it('should have correct input type by default', async () => {
    const element = await fixture<MonkPasswordInput>(html`<monk-password-input></monk-password-input>`);

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.type).to.equal('password');
  });

  it('should render with label', async () => {
    const element = await fixture<MonkPasswordInput>(html`
      <monk-password-input label="Password"></monk-password-input>
    `);

    expect(element.label).to.equal('Password');

    const label = element.shadowRoot?.querySelector('.label');
    expect(label).to.exist;
    expect(label?.textContent).to.include('Password');
  });

  it('should set initial value', async () => {
    const element = await fixture<MonkPasswordInput>(html`
      <monk-password-input value="secret123"></monk-password-input>
    `);

    expect(element.value).to.equal('secret123');

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.value).to.equal('secret123');
  });

  it('should update value on input', async () => {
    const element = await fixture<MonkPasswordInput>(html`<monk-password-input></monk-password-input>`);

    const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'newpassword';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await element.updateComplete;

    expect(element.value).to.equal('newpassword');
  });

  it('should emit input-change event', async () => {
    const element = await fixture<MonkPasswordInput>(html`<monk-password-input></monk-password-input>`);

    const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

    setTimeout(() => {
      input.value = 'password123';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const event = await oneEvent(element, 'input-change');
    expect(event.detail.value).to.equal('password123');
  });

  describe('Show/Hide Toggle', () => {
    it('should not show toggle button by default', async () => {
      const element = await fixture<MonkPasswordInput>(html`<monk-password-input></monk-password-input>`);

      const toggleButton = element.shadowRoot?.querySelector('.toggle-button');
      expect(toggleButton).to.be.null;
    });

    it('should show toggle button when showToggle is true', async () => {
      const element = await fixture<MonkPasswordInput>(html`
        <monk-password-input show-toggle></monk-password-input>
      `);

      expect(element.showToggle).to.be.true;

      const toggleButton = element.shadowRoot?.querySelector('.toggle-button');
      expect(toggleButton).to.exist;
    });

    it('should toggle password visibility when button is clicked', async () => {
      const element = await fixture<MonkPasswordInput>(html`
        <monk-password-input show-toggle></monk-password-input>
      `);

      const input = element.shadowRoot?.querySelector('input');
      const toggleButton = element.shadowRoot?.querySelector('.toggle-button') as HTMLButtonElement;

      // Initially should be password type
      expect(input?.type).to.equal('password');

      // Click toggle
      toggleButton.click();
      await element.updateComplete;

      // Should now be text type
      expect(input?.type).to.equal('text');

      // Click toggle again
      toggleButton.click();
      await element.updateComplete;

      // Should be back to password type
      expect(input?.type).to.equal('password');
    });

    it('should have appropriate aria-label on toggle button', async () => {
      const element = await fixture<MonkPasswordInput>(html`
        <monk-password-input show-toggle></monk-password-input>
      `);

      const toggleButton = element.shadowRoot?.querySelector('.toggle-button') as HTMLButtonElement;

      // Initially should say "Show password"
      expect(toggleButton.getAttribute('aria-label')).to.equal('Show password');

      // Click to show
      toggleButton.click();
      await element.updateComplete;

      // Should now say "Hide password"
      expect(toggleButton.getAttribute('aria-label')).to.equal('Hide password');
    });

    it('should disable toggle button when input is disabled', async () => {
      const element = await fixture<MonkPasswordInput>(html`
        <monk-password-input show-toggle disabled></monk-password-input>
      `);

      const toggleButton = element.shadowRoot?.querySelector('.toggle-button') as HTMLButtonElement;
      expect(toggleButton.disabled).to.be.true;
    });
  });

  it('should render with placeholder', async () => {
    const element = await fixture<MonkPasswordInput>(html`
      <monk-password-input placeholder="Enter password"></monk-password-input>
    `);

    expect(element.placeholder).to.equal('Enter password');

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.placeholder).to.equal('Enter password');
  });

  it('should render disabled state', async () => {
    const element = await fixture<MonkPasswordInput>(html`
      <monk-password-input disabled></monk-password-input>
    `);

    expect(element.disabled).to.be.true;

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.disabled).to.be.true;
  });

  it('should render required state with indicator', async () => {
    const element = await fixture<MonkPasswordInput>(html`
      <monk-password-input label="Password" required></monk-password-input>
    `);

    expect(element.required).to.be.true;

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.required).to.be.true;

    const indicator = element.shadowRoot?.querySelector('.required-indicator');
    expect(indicator).to.exist;
    expect(indicator?.textContent).to.equal('*');
  });

  it('should render invalid state', async () => {
    const element = await fixture<MonkPasswordInput>(html`
      <monk-password-input invalid></monk-password-input>
    `);

    expect(element.invalid).to.be.true;

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).to.equal('true');
  });

  it('should render error message when invalid', async () => {
    const element = await fixture<MonkPasswordInput>(html`
      <monk-password-input
        invalid
        error-message="Password must be at least 8 characters"
      ></monk-password-input>
    `);

    const errorMessage = element.shadowRoot?.querySelector('.error-message');
    expect(errorMessage).to.exist;
    expect(errorMessage?.textContent).to.equal('Password must be at least 8 characters');
  });

  it('should render helper text', async () => {
    const element = await fixture<MonkPasswordInput>(html`
      <monk-password-input helper-text="Use a strong password"></monk-password-input>
    `);

    const helperText = element.shadowRoot?.querySelector('.helper-text');
    expect(helperText).to.exist;
    expect(helperText?.textContent).to.equal('Use a strong password');
  });

  it('should show character count when enabled', async () => {
    const element = await fixture<MonkPasswordInput>(html`
      <monk-password-input maxlength="128" show-count value="test"></monk-password-input>
    `);

    await element.updateComplete;

    const count = element.shadowRoot?.querySelector('.char-count');
    expect(count).to.exist;
    expect(count?.textContent).to.equal('4 / 128');
  });

  it('should focus input when focus() is called', async () => {
    const element = await fixture<MonkPasswordInput>(html`<monk-password-input></monk-password-input>`);

    element.focus();
    await element.updateComplete;

    const input = element.shadowRoot?.querySelector('input');
    expect(document.activeElement).to.equal(element);
    expect(element.shadowRoot?.activeElement).to.equal(input);
  });

  it('should have autocomplete attribute for password', async () => {
    const element = await fixture<MonkPasswordInput>(html`
      <monk-password-input autocomplete="current-password"></monk-password-input>
    `);

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('autocomplete')).to.equal('current-password');
  });
});
