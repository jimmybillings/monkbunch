import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { MonkEmailInput } from './email-input.js';

describe('MonkEmailInput', () => {
  it('should be defined', () => {
    const element = document.createElement('monk-email-input');
    expect(element).to.be.instanceOf(MonkEmailInput);
  });

  it('should render with default properties', async () => {
    const element = await fixture<MonkEmailInput>(html`<monk-email-input></monk-email-input>`);

    expect(element.size).to.equal('md');
    expect(element.variant).to.equal('outline');
    expect(element.value).to.equal('');
    expect(element.disabled).to.be.false;
    expect(element.readonly).to.be.false;
    expect(element.required).to.be.false;
    expect(element.invalid).to.be.false;
  });

  it('should have correct input type', async () => {
    const element = await fixture<MonkEmailInput>(html`<monk-email-input></monk-email-input>`);

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.type).to.equal('email');
  });

  it('should render with label', async () => {
    const element = await fixture<MonkEmailInput>(html`
      <monk-email-input label="Email Address"></monk-email-input>
    `);

    expect(element.label).to.equal('Email Address');

    const label = element.shadowRoot?.querySelector('.label');
    expect(label).to.exist;
    expect(label?.textContent).to.include('Email Address');
  });

  it('should set initial value', async () => {
    const element = await fixture<MonkEmailInput>(html`
      <monk-email-input value="test@example.com"></monk-email-input>
    `);

    expect(element.value).to.equal('test@example.com');

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.value).to.equal('test@example.com');
  });

  it('should update value on input', async () => {
    const element = await fixture<MonkEmailInput>(html`<monk-email-input></monk-email-input>`);

    const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'new@example.com';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await element.updateComplete;

    expect(element.value).to.equal('new@example.com');
  });

  it('should emit input-change event', async () => {
    const element = await fixture<MonkEmailInput>(html`<monk-email-input></monk-email-input>`);

    const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

    setTimeout(() => {
      input.value = 'email@test.com';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const event = await oneEvent(element, 'input-change');
    expect(event.detail.value).to.equal('email@test.com');
  });

  it('should render with placeholder', async () => {
    const element = await fixture<MonkEmailInput>(html`
      <monk-email-input placeholder="you@example.com"></monk-email-input>
    `);

    expect(element.placeholder).to.equal('you@example.com');

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.placeholder).to.equal('you@example.com');
  });

  it('should render disabled state', async () => {
    const element = await fixture<MonkEmailInput>(html`<monk-email-input disabled></monk-email-input>`);

    expect(element.disabled).to.be.true;

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.disabled).to.be.true;
  });

  it('should render required state with indicator', async () => {
    const element = await fixture<MonkEmailInput>(html`
      <monk-email-input label="Email" required></monk-email-input>
    `);

    expect(element.required).to.be.true;

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.required).to.be.true;

    const indicator = element.shadowRoot?.querySelector('.required-indicator');
    expect(indicator).to.exist;
    expect(indicator?.textContent).to.equal('*');
  });

  it('should render invalid state', async () => {
    const element = await fixture<MonkEmailInput>(html`<monk-email-input invalid></monk-email-input>`);

    expect(element.invalid).to.be.true;

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).to.equal('true');
  });

  it('should render error message when invalid', async () => {
    const element = await fixture<MonkEmailInput>(html`
      <monk-email-input invalid error-message="Invalid email address"></monk-email-input>
    `);

    const errorMessage = element.shadowRoot?.querySelector('.error-message');
    expect(errorMessage).to.exist;
    expect(errorMessage?.textContent).to.equal('Invalid email address');
  });

  it('should render helper text', async () => {
    const element = await fixture<MonkEmailInput>(html`
      <monk-email-input helper-text="We'll never share your email"></monk-email-input>
    `);

    const helperText = element.shadowRoot?.querySelector('.helper-text');
    expect(helperText).to.exist;
    expect(helperText?.textContent).to.equal("We'll never share your email");
  });

  it('should render prefix slot', async () => {
    const element = await fixture<MonkEmailInput>(html`
      <monk-email-input>
        <span slot="prefix">📧</span>
      </monk-email-input>
    `);

    const prefix = element.querySelector('[slot="prefix"]');
    expect(prefix).to.exist;
    expect(prefix?.textContent).to.equal('📧');
  });

  it('should focus input when focus() is called', async () => {
    const element = await fixture<MonkEmailInput>(html`<monk-email-input></monk-email-input>`);

    element.focus();
    await element.updateComplete;

    const input = element.shadowRoot?.querySelector('input');
    expect(document.activeElement).to.equal(element);
    expect(element.shadowRoot?.activeElement).to.equal(input);
  });

  it('should emit focus event', async () => {
    const element = await fixture<MonkEmailInput>(html`<monk-email-input></monk-email-input>`);

    const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;

    setTimeout(() => input.focus());

    const event = await oneEvent(element, 'input-focus');
    expect(event).to.exist;
  });

  it('should have autocomplete attribute for email', async () => {
    const element = await fixture<MonkEmailInput>(html`
      <monk-email-input autocomplete="email"></monk-email-input>
    `);

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('autocomplete')).to.equal('email');
  });
});
