import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './number-input.js';
import { validators } from './validators.js';
import '../typography/heading.js';
import '../typography/text.js';
import '../layout/stack.js';
import '../button/button.js';

const meta: Meta = {
  title: 'Components/Input/NumberInput',
  component: 'monk-number-input',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The NumberInput component provides a numeric input with spinner controls.

## Features

- Native HTML5 number input
- Browser-provided spinner controls
- Keyboard arrow key support
- All BaseInput features (variants, sizes, states, validation)
- Built-in numeric validation

## Usage

\`\`\`html
<monk-number-input label="Age"></monk-number-input>
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
    <monk-number-input
      label="Number"
      placeholder="Enter a number"
      style="max-width: 400px;"
    ></monk-number-input>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <monk-number-input
      label="Age"
      value="25"
      style="max-width: 400px;"
    ></monk-number-input>
  `,
};

export const Variants: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-number-input
        variant="outline"
        label="Outline"
        value="42"
      ></monk-number-input>
      <monk-number-input
        variant="filled"
        label="Filled"
        value="42"
      ></monk-number-input>
      <monk-number-input
        variant="flushed"
        label="Flushed"
        value="42"
      ></monk-number-input>
    </monk-stack>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-number-input
        size="sm"
        label="Small"
        value="10"
      ></monk-number-input>
      <monk-number-input
        size="md"
        label="Medium"
        value="10"
      ></monk-number-input>
      <monk-number-input
        size="lg"
        label="Large"
        value="10"
      ></monk-number-input>
    </monk-stack>
  `,
};

export const WithValidation: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-number-input
        label="Age"
        required
        validate
        .validators=${[validators.min(18), validators.max(120)]}
        validation-message="Age must be between 18 and 120"
        helper-text="You must be 18 or older"
      ></monk-number-input>

      <monk-number-input
        label="Quantity"
        required
        validate
        .validators=${[validators.min(1), validators.max(100)]}
        validation-message="Quantity must be between 1 and 100"
        helper-text="How many do you need?"
      ></monk-number-input>

      <monk-number-input
        label="Invalid Number"
        value="5"
        invalid
        error-message="Minimum value is 10"
      ></monk-number-input>
    </monk-stack>
  `,
};

export const States: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-number-input
        label="Required"
        required
      ></monk-number-input>

      <monk-number-input
        label="Disabled"
        value="100"
        disabled
      ></monk-number-input>

      <monk-number-input
        label="Readonly"
        value="100"
        readonly
      ></monk-number-input>
    </monk-stack>
  `,
};

export const WithPrefix: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-number-input
        label="Rating"
        value="5"
      >
        <span slot="prefix">⭐</span>
      </monk-number-input>

      <monk-number-input
        label="Temperature"
        value="72"
      >
        <span slot="prefix">🌡️</span>
      </monk-number-input>
    </monk-stack>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <monk-stack spacing="4" style="max-width: 400px;">
      <monk-heading level="h3">Product Order</monk-heading>

      <monk-number-input
        label="Quantity"
        value="1"
        required
        validate
        .validators=${[validators.min(1), validators.max(999)]}
        helper-text="Maximum 999 per order"
      >
        <span slot="prefix">📦</span>
      </monk-number-input>

      <monk-number-input
        label="Priority Level"
        value="1"
        required
        validate
        .validators=${[validators.min(1), validators.max(5)]}
        helper-text="1 = Low, 5 = High"
      >
        <span slot="prefix">🚀</span>
      </monk-number-input>

      <monk-button variant="solid" full-width>Place Order</monk-button>
    </monk-stack>
  `,
};

export const DifferentRanges: Story = {
  render: () => html`
    <monk-stack spacing="4" style="max-width: 400px;">
      <monk-heading level="h4">Different Numeric Ranges</monk-heading>

      <monk-number-input
        label="Percentage (0-100)"
        value="75"
        validate
        .validators=${[validators.min(0), validators.max(100)]}
      >
        <span slot="suffix">%</span>
      </monk-number-input>

      <monk-number-input
        label="Age (18-120)"
        value="30"
        validate
        .validators=${[validators.min(18), validators.max(120)]}
      ></monk-number-input>

      <monk-number-input
        label="Days (1-365)"
        value="90"
        validate
        .validators=${[validators.min(1), validators.max(365)]}
      ></monk-number-input>
    </monk-stack>
  `,
};
