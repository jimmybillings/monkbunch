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
