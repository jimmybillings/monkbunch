import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './password-input.js';
import './email-input.js';
import '../typography/heading.js';
import '../typography/text.js';
import '../layout/stack.js';
import '../button/button.js';

const meta: Meta = {
  title: 'Components/Input/PasswordInput',
  component: 'monk-password-input',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The PasswordInput component provides a password input field with optional show/hide toggle.

## Features

- Masked password input
- Optional show/hide toggle button
- All BaseInput features (variants, sizes, states, helper text, etc.)
- Character count for password strength
- Autocomplete support for password managers

## Usage

\`\`\`html
<monk-password-input label="Password" show-toggle></monk-password-input>
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
    <monk-password-input
      label="Password"
      placeholder="Enter your password"
      style="max-width: 400px;"
    ></monk-password-input>
  `,
};

export const WithToggle: Story = {
  render: () => html`
    <monk-password-input
      label="Password"
      placeholder="Enter your password"
      show-toggle
      style="max-width: 400px;"
    ></monk-password-input>
  `,
};

export const Variants: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-password-input
        variant="outline"
        label="Outline"
        show-toggle
      ></monk-password-input>
      <monk-password-input
        variant="filled"
        label="Filled"
        show-toggle
      ></monk-password-input>
      <monk-password-input
        variant="flushed"
        label="Flushed"
        show-toggle
      ></monk-password-input>
    </monk-stack>
  `,
};

export const WithValidation: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-password-input
        label="Password"
        required
        show-toggle
        helper-text="Must be at least 8 characters"
      ></monk-password-input>

      <monk-password-input
        label="Weak Password"
        value="123"
        invalid
        show-toggle
        error-message="Password must be at least 8 characters"
      ></monk-password-input>
    </monk-stack>
  `,
};

export const WithCharacterCount: Story = {
  render: () => html`
    <monk-password-input
      label="New Password"
      maxlength="128"
      show-count
      show-toggle
      helper-text="Choose a strong password"
      style="max-width: 400px;"
    ></monk-password-input>
  `,
};

export const States: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-password-input
        label="Required Password"
        required
        show-toggle
      ></monk-password-input>

      <monk-password-input
        label="Disabled Password"
        value="secret123"
        disabled
        show-toggle
      ></monk-password-input>

      <monk-password-input
        label="Readonly Password"
        value="readonly-password"
        readonly
        show-toggle
      ></monk-password-input>
    </monk-stack>
  `,
};

export const FormExamples: Story = {
  render: () => html`
    <monk-stack spacing="10">
      <monk-stack spacing="4">
        <monk-heading level="h3">Login Form</monk-heading>
        <monk-stack spacing="4" style="max-width: 400px;">
          <monk-email-input
            label="Email"
            placeholder="you@example.com"
            required
            autocomplete="email"
          ></monk-email-input>

          <monk-password-input
            label="Password"
            required
            show-toggle
            autocomplete="current-password"
          ></monk-password-input>

          <monk-button variant="solid" full-width>Sign In</monk-button>
        </monk-stack>
      </monk-stack>

      <monk-stack spacing="4">
        <monk-heading level="h3">Sign Up Form</monk-heading>
        <monk-stack spacing="4" style="max-width: 400px;">
          <monk-email-input
            label="Email"
            placeholder="you@example.com"
            required
            autocomplete="email"
          ></monk-email-input>

          <monk-password-input
            label="Create Password"
            required
            show-toggle
            maxlength="128"
            show-count
            helper-text="Must be at least 8 characters"
            autocomplete="new-password"
          ></monk-password-input>

          <monk-password-input
            label="Confirm Password"
            required
            show-toggle
            autocomplete="new-password"
          ></monk-password-input>

          <monk-button variant="solid" full-width>Create Account</monk-button>
        </monk-stack>
      </monk-stack>

      <monk-stack spacing="4">
        <monk-heading level="h3">Change Password</monk-heading>
        <monk-stack spacing="4" style="max-width: 400px;">
          <monk-password-input
            label="Current Password"
            required
            show-toggle
            autocomplete="current-password"
          ></monk-password-input>

          <monk-password-input
            label="New Password"
            required
            show-toggle
            maxlength="128"
            show-count
            helper-text="Use a strong password with letters, numbers, and symbols"
            autocomplete="new-password"
          ></monk-password-input>

          <monk-password-input
            label="Confirm New Password"
            required
            show-toggle
            autocomplete="new-password"
          ></monk-password-input>

          <monk-button variant="solid">Update Password</monk-button>
        </monk-stack>
      </monk-stack>
    </monk-stack>
  `,
};
