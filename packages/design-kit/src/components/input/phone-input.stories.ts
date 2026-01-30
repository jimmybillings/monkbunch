import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './phone-input.js';
import '../typography/heading.js';
import '../typography/text.js';
import '../layout/stack.js';
import '../button/button.js';

const meta: Meta = {
  title: 'Components/Input/PhoneInput',
  component: 'monk-phone-input',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The PhoneInput component provides a masked input for US phone numbers in (XXX) XXX-XXXX format.

## Features

- Automatic formatting with (XXX) XXX-XXXX mask
- Smart cursor positioning during editing
- Paste handling - formats pasted phone numbers
- All BaseInput features (variants, sizes, states, validation)
- Returns unmasked value for API submission

## Usage

\`\`\`html
<monk-phone-input label="Phone Number"></monk-phone-input>
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
    <monk-phone-input
      label="Phone Number"
      placeholder="(###) ###-####"
      style="max-width: 400px;"
    ></monk-phone-input>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <monk-phone-input
      label="Phone Number"
      value="(555) 123-4567"
      style="max-width: 400px;"
    ></monk-phone-input>
  `,
};

export const Variants: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-phone-input
        variant="outline"
        label="Outline"
        value="(555) 123-4567"
      ></monk-phone-input>
      <monk-phone-input
        variant="filled"
        label="Filled"
        value="(555) 123-4567"
      ></monk-phone-input>
      <monk-phone-input
        variant="flushed"
        label="Flushed"
        value="(555) 123-4567"
      ></monk-phone-input>
    </monk-stack>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-phone-input
        size="sm"
        label="Small"
        value="(555) 123-4567"
      ></monk-phone-input>
      <monk-phone-input
        size="md"
        label="Medium"
        value="(555) 123-4567"
      ></monk-phone-input>
      <monk-phone-input
        size="lg"
        label="Large"
        value="(555) 123-4567"
      ></monk-phone-input>
    </monk-stack>
  `,
};

export const WithValidation: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-phone-input
        label="Phone Number"
        required
        validate
        helper-text="Enter your 10-digit phone number"
      ></monk-phone-input>

      <monk-phone-input
        label="Invalid Phone"
        value="(555) 12"
        invalid
        error-message="Please enter a complete phone number"
      ></monk-phone-input>
    </monk-stack>
  `,
};

export const States: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-phone-input
        label="Required"
        required
      ></monk-phone-input>

      <monk-phone-input
        label="Disabled"
        value="(555) 123-4567"
        disabled
      ></monk-phone-input>

      <monk-phone-input
        label="Readonly"
        value="(555) 123-4567"
        readonly
      ></monk-phone-input>
    </monk-stack>
  `,
};

export const WithPrefix: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-phone-input
        label="Phone Number"
        value="(555) 123-4567"
      >
        <span slot="prefix">📱</span>
      </monk-phone-input>
    </monk-stack>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <monk-stack spacing="4" style="max-width: 400px;">
      <monk-heading level="h3">Contact Form</monk-heading>

      <monk-phone-input
        label="Mobile Phone"
        required
        validate
        autocomplete="tel"
        helper-text="We'll send you a verification code"
      >
        <span slot="prefix">📱</span>
      </monk-phone-input>

      <monk-phone-input
        label="Home Phone"
        autocomplete="tel-national"
        helper-text="Optional"
      >
        <span slot="prefix">🏠</span>
      </monk-phone-input>

      <monk-button variant="solid" full-width>Continue</monk-button>
    </monk-stack>
  `,
};

export const GetUnmaskedValue: Story = {
  render: () => {
    const handleGetValue = () => {
      const input = document.getElementById('phone-demo') as any;
      const masked = input?.getMaskedValue();
      const unmasked = input?.getUnmaskedValue();
      alert('Masked: ' + masked + '\nUnmasked (for API): ' + unmasked);
    };

    return html`
      <monk-stack spacing="6" style="max-width: 400px;">
        <monk-heading level="h3">API Value Demo</monk-heading>
        <monk-text>
          Type a phone number and click the button to see masked vs unmasked values.
        </monk-text>

        <monk-phone-input
          id="phone-demo"
          label="Phone Number"
          value="(555) 123-4567"
        ></monk-phone-input>

        <monk-button variant="outline" @click=${handleGetValue}>
          Get Values
        </monk-button>
      </monk-stack>
    `;
  },
};
