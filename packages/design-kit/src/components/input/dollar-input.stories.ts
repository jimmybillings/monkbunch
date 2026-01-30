import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dollar-input.js';
import { validators } from './validators.js';
import '../typography/heading.js';
import '../typography/text.js';
import '../layout/stack.js';
import '../button/button.js';

const meta: Meta = {
  title: 'Components/Input/DollarInput',
  component: 'monk-dollar-input',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The DollarInput component provides automatic currency formatting for dollar amounts.

## Features

- Automatic formatting with $X,XXX.XX display
- Stores unmasked numeric value
- Uses Intl.NumberFormat for proper currency formatting
- All BaseInput features (variants, sizes, states, validation)
- \`getNumericValue()\` returns number for API submission
- \`getFormattedValue()\` returns formatted currency string

## Usage

\`\`\`html
<monk-dollar-input label="Amount" value="250000"></monk-dollar-input>
<!-- Displays: $250,000 -->
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
    <monk-dollar-input
      label="Amount"
      placeholder="$0"
      style="max-width: 400px;"
    ></monk-dollar-input>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <monk-dollar-input
      label="Loan Amount"
      value="250000"
      style="max-width: 400px;"
    ></monk-dollar-input>
  `,
};

export const Variants: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-dollar-input
        variant="outline"
        label="Outline"
        value="50000"
      ></monk-dollar-input>
      <monk-dollar-input
        variant="filled"
        label="Filled"
        value="50000"
      ></monk-dollar-input>
      <monk-dollar-input
        variant="flushed"
        label="Flushed"
        value="50000"
      ></monk-dollar-input>
    </monk-stack>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-dollar-input
        size="sm"
        label="Small"
        value="1000"
      ></monk-dollar-input>
      <monk-dollar-input
        size="md"
        label="Medium"
        value="1000"
      ></monk-dollar-input>
      <monk-dollar-input
        size="lg"
        label="Large"
        value="1000"
      ></monk-dollar-input>
    </monk-stack>
  `,
};

export const WithValidation: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-dollar-input
        label="Loan Amount"
        required
        validate
        .validators=${[validators.min(1000)]}
        validation-message="Minimum loan amount is $1,000"
        helper-text="Enter desired loan amount"
      ></monk-dollar-input>

      <monk-dollar-input
        label="Down Payment"
        required
        validate
        .validators=${[validators.min(1000), validators.max(100000)]}
        validation-message="Down payment must be between $1,000 and $100,000"
      ></monk-dollar-input>

      <monk-dollar-input
        label="Invalid Amount"
        value="500"
        invalid
        error-message="Amount must be at least $1,000"
      ></monk-dollar-input>
    </monk-stack>
  `,
};

export const States: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-dollar-input
        label="Required"
        required
      ></monk-dollar-input>

      <monk-dollar-input
        label="Disabled"
        value="75000"
        disabled
      ></monk-dollar-input>

      <monk-dollar-input
        label="Readonly"
        value="75000"
        readonly
      ></monk-dollar-input>
    </monk-stack>
  `,
};

export const WithPrefix: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-dollar-input
        label="Salary"
        value="85000"
      >
        <span slot="prefix">💰</span>
      </monk-dollar-input>
    </monk-stack>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <monk-stack spacing="4" style="max-width: 400px;">
      <monk-heading level="h3">Loan Application</monk-heading>

      <monk-dollar-input
        label="Loan Amount"
        required
        validate
        .validators=${[validators.min(10000), validators.max(1000000)]}
        validation-message="Loan amount must be between $10,000 and $1,000,000"
        helper-text="How much do you need?"
      >
        <span slot="prefix">🏠</span>
      </monk-dollar-input>

      <monk-dollar-input
        label="Down Payment"
        required
        validate
        .validators=${[validators.min(1000)]}
        helper-text="Minimum 10% recommended"
      >
        <span slot="prefix">💵</span>
      </monk-dollar-input>

      <monk-dollar-input
        label="Annual Income"
        required
        validate
        .validators=${[validators.min(30000)]}
        helper-text="Pre-tax annual income"
      >
        <span slot="prefix">💼</span>
      </monk-dollar-input>

      <monk-button variant="solid" full-width>Calculate Monthly Payment</monk-button>
    </monk-stack>
  `,
};

export const NumericValueDemo: Story = {
  render: () => {
    const handleGetValue = () => {
      const input = document.getElementById('dollar-demo') as any;
      const formatted = input?.getFormattedValue();
      const numeric = input?.getNumericValue();
      const raw = input?.value;
      alert(
        'Formatted: ' + formatted +
        '\nNumeric (for API): ' + numeric +
        '\nRaw value: ' + raw
      );
    };

    return html`
      <monk-stack spacing="6" style="max-width: 400px;">
        <monk-heading level="h3">Numeric Value Demo</monk-heading>
        <monk-text>
          Enter an amount and click the button to see formatted display vs numeric value for API.
        </monk-text>

        <monk-dollar-input
          id="dollar-demo"
          label="Amount"
          value="125000"
        ></monk-dollar-input>

        <monk-button variant="outline" @click=${handleGetValue}>
          Get Values
        </monk-button>
      </monk-stack>
    `;
  },
};

export const LargeAmounts: Story = {
  render: () => html`
    <monk-stack spacing="4" style="max-width: 400px;">
      <monk-heading level="h4">Large Amount Formatting</monk-heading>
      <monk-dollar-input
        label="One Million"
        value="1000000"
      ></monk-dollar-input>
      <monk-dollar-input
        label="Ten Million"
        value="10000000"
      ></monk-dollar-input>
      <monk-dollar-input
        label="One Billion"
        value="1000000000"
      ></monk-dollar-input>
    </monk-stack>
  `,
};
