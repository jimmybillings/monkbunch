import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './email-input.js';
import '../typography/heading.js';
import '../typography/text.js';
import '../layout/stack.js';
import '../button/button.js';

const meta: Meta = {
  title: 'Components/Input/EmailInput',
  component: 'monk-email-input',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The EmailInput component provides an email address input field with built-in browser validation.

## Features

- Browser email validation
- All BaseInput features (variants, sizes, states, helper text, etc.)
- Autocomplete support for email addresses
- Prefix/suffix slots for icons

## Usage

\`\`\`html
<monk-email-input label="Email" placeholder="you@example.com"></monk-email-input>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <monk-email-input
      label="Email Address"
      placeholder="you@example.com"
      style="max-width: 400px;"
    ></monk-email-input>
  `,
};

export const Variants: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-email-input
        variant="outline"
        label="Outline"
        placeholder="you@example.com"
      ></monk-email-input>
      <monk-email-input
        variant="filled"
        label="Filled"
        placeholder="you@example.com"
      ></monk-email-input>
      <monk-email-input
        variant="flushed"
        label="Flushed"
        placeholder="you@example.com"
      ></monk-email-input>
    </monk-stack>
  `,
};

export const WithIcon: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-email-input label="Email" placeholder="you@example.com">
        <span slot="prefix">📧</span>
      </monk-email-input>

      <monk-email-input label="Work Email" placeholder="you@company.com">
        <span slot="prefix">💼</span>
      </monk-email-input>
    </monk-stack>
  `,
};

export const States: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-email-input
        label="Required Email"
        placeholder="you@example.com"
        required
        helper-text="We'll never share your email"
      ></monk-email-input>

      <monk-email-input
        label="Invalid Email"
        value="not-an-email"
        invalid
        error-message="Please enter a valid email address"
      ></monk-email-input>

      <monk-email-input
        label="Disabled"
        value="user@example.com"
        disabled
      ></monk-email-input>
    </monk-stack>
  `,
};

export const FormExamples: Story = {
  render: () => html`
    <monk-stack spacing="10">
      <monk-stack spacing="4">
        <monk-heading level="h3">Newsletter Signup</monk-heading>
        <monk-stack spacing="4" style="max-width: 400px;">
          <monk-email-input
            label="Email Address"
            placeholder="you@example.com"
            required
            helper-text="Get updates delivered to your inbox"
          >
            <span slot="prefix">📧</span>
          </monk-email-input>
          <monk-button variant="solid" full-width>Subscribe</monk-button>
        </monk-stack>
      </monk-stack>

      <monk-stack spacing="4">
        <monk-heading level="h3">Contact Form</monk-heading>
        <monk-stack spacing="4" style="max-width: 500px;">
          <monk-email-input
            label="Your Email"
            placeholder="you@example.com"
            required
            autocomplete="email"
          ></monk-email-input>
          <monk-button variant="solid">Send Message</monk-button>
        </monk-stack>
      </monk-stack>
    </monk-stack>
  `,
};

export const AutomaticValidation: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-heading level="h3">Automatic Validation</monk-heading>
      <monk-text>
        Try typing an invalid email and clicking outside the field (blur). The
        validation will automatically trigger.
      </monk-text>

      <monk-email-input
        label="Email (validate on blur)"
        placeholder="you@example.com"
        required
        validate
        validate-on="blur"
        helper-text="Validation triggers when you leave the field"
      ></monk-email-input>

      <monk-email-input
        label="Email (validate on input)"
        placeholder="you@example.com"
        required
        validate
        validate-on="input"
        helper-text="Validation triggers as you type"
      ></monk-email-input>

      <monk-email-input
        label="Email (validate on change)"
        placeholder="you@example.com"
        required
        validate
        validate-on="change"
        helper-text="Validation triggers on change event"
      ></monk-email-input>
    </monk-stack>
  `,
};

export const CustomValidationMessage: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-heading level="h3">Custom Validation Message</monk-heading>

      <monk-email-input
        label="Work Email"
        placeholder="you@company.com"
        required
        validate
        validation-message="Please enter a valid work email address"
        helper-text="Use your company email"
      ></monk-email-input>
    </monk-stack>
  `,
};

export const ValidationEvents: Story = {
  render: () => {
    const handleInvalid = (e: CustomEvent) => {
      console.log('Input is invalid:', e.detail);
      const message = document.getElementById('validation-message');
      if (message) {
        message.textContent = `Invalid: ${e.detail.message}`;
        message.style.color = 'var(--monk-color-text-error)';
      }
    };

    const handleValid = (e: CustomEvent) => {
      console.log('Input is valid:', e.detail);
      const message = document.getElementById('validation-message');
      if (message) {
        message.textContent = 'Valid email address!';
        message.style.color = 'var(--monk-color-text-success)';
      }
    };

    return html`
      <monk-stack spacing="6" style="max-width: 400px;">
        <monk-heading level="h3">Validation Events</monk-heading>
        <monk-text>
          Type an email to see validation events in the console and below.
        </monk-text>

        <monk-email-input
          label="Email"
          placeholder="you@example.com"
          required
          validate
          validate-on="blur"
          @input-invalid=${handleInvalid}
          @input-valid=${handleValid}
        ></monk-email-input>

        <div
          id="validation-message"
          style="padding: 12px; border-radius: 6px; background: var(--monk-color-bg-subtle); font-family: var(--monk-font-family-mono); font-size: var(--monk-font-size-sm);"
        >
          Waiting for validation...
        </div>
      </monk-stack>
    `;
  },
};

export const ProgrammaticValidation: Story = {
  render: () => {
    const handleSetError = () => {
      const input = document.getElementById(
        'api-email'
      ) as any;
      input?.setError('This email is already registered');
    };

    const handleClearError = () => {
      const input = document.getElementById(
        'api-email'
      ) as any;
      input?.clearError();
    };

    const handleCheckValidity = () => {
      const input = document.getElementById(
        'api-email'
      ) as any;
      const isValid = input?.checkValidity();
      alert('Email is ' + (isValid ? 'valid' : 'invalid'));
    };

    return html`
      <monk-stack spacing="6" style="max-width: 400px;">
        <monk-heading level="h3">Programmatic Validation</monk-heading>
        <monk-text>
          Use the buttons to test the validation API methods.
        </monk-text>

        <monk-email-input
          id="api-email"
          label="Email"
          placeholder="you@example.com"
          required
          helper-text="Try the buttons below"
        ></monk-email-input>

        <monk-stack spacing="3" direction="row">
          <monk-button variant="outline" size="sm" @click=${handleSetError}>
            Set API Error
          </monk-button>
          <monk-button variant="outline" size="sm" @click=${handleClearError}>
            Clear Error
          </monk-button>
          <monk-button variant="outline" size="sm" @click=${handleCheckValidity}>
            Check Validity
          </monk-button>
        </monk-stack>
      </monk-stack>
    `;
  },
};
