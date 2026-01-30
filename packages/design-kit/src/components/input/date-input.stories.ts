import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './date-input.js';
import { validators } from './validators.js';
import '../typography/heading.js';
import '../typography/text.js';
import '../layout/stack.js';
import '../button/button.js';

const meta: Meta = {
  title: 'Components/Input/DateInput',
  component: 'monk-date-input',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The DateInput component provides a masked input for dates in MM/DD/YYYY format.

## Features

- Automatic formatting with MM/DD/YYYY mask
- Smart cursor positioning during editing
- ISO date conversion (YYYY-MM-DD ↔ MM/DD/YYYY)
- Paste handling - formats pasted dates
- All BaseInput features (variants, sizes, states, validation)
- \`getApiValue()\` returns ISO format for API submission

## Usage

\`\`\`html
<monk-date-input label="Birth Date"></monk-date-input>
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
    <monk-date-input
      label="Date"
      placeholder="MM/DD/YYYY"
      style="max-width: 400px;"
    ></monk-date-input>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <monk-date-input
      label="Birth Date"
      value="01/15/1990"
      style="max-width: 400px;"
    ></monk-date-input>
  `,
};

export const WithISOValue: Story = {
  render: () => html`
    <monk-stack spacing="4" style="max-width: 400px;">
      <monk-heading level="h4">ISO Date Conversion</monk-heading>
      <monk-text size="sm">
        Pass ISO format (YYYY-MM-DD) as value - it will be automatically converted to MM/DD/YYYY for display.
      </monk-text>
      <monk-date-input
        label="Start Date"
        value="2025-01-29"
      ></monk-date-input>
    </monk-stack>
  `,
};

export const Variants: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-date-input
        variant="outline"
        label="Outline"
        value="01/29/2025"
      ></monk-date-input>
      <monk-date-input
        variant="filled"
        label="Filled"
        value="01/29/2025"
      ></monk-date-input>
      <monk-date-input
        variant="flushed"
        label="Flushed"
        value="01/29/2025"
      ></monk-date-input>
    </monk-stack>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-date-input
        size="sm"
        label="Small"
        value="01/29/2025"
      ></monk-date-input>
      <monk-date-input
        size="md"
        label="Medium"
        value="01/29/2025"
      ></monk-date-input>
      <monk-date-input
        size="lg"
        label="Large"
        value="01/29/2025"
      ></monk-date-input>
    </monk-stack>
  `,
};

export const WithValidation: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-date-input
        label="Birth Date"
        required
        validate
        helper-text="Enter your date of birth"
      ></monk-date-input>

      <monk-date-input
        label="Future Date Only"
        required
        validate
        .validators=${[validators.futureDate]}
        validation-message="Date must be in the future"
        helper-text="Must be today or later"
      ></monk-date-input>

      <monk-date-input
        label="Invalid Date"
        value="13/45/2025"
        invalid
        error-message="Please enter a valid date"
      ></monk-date-input>
    </monk-stack>
  `,
};

export const States: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-date-input
        label="Required"
        required
      ></monk-date-input>

      <monk-date-input
        label="Disabled"
        value="01/29/2025"
        disabled
      ></monk-date-input>

      <monk-date-input
        label="Readonly"
        value="01/29/2025"
        readonly
      ></monk-date-input>
    </monk-stack>
  `,
};

export const WithPrefix: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-date-input
        label="Event Date"
        value="01/29/2025"
      >
        <span slot="prefix">📅</span>
      </monk-date-input>
    </monk-stack>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <monk-stack spacing="4" style="max-width: 400px;">
      <monk-heading level="h3">Event Registration</monk-heading>

      <monk-date-input
        label="Event Date"
        required
        validate
        .validators=${[validators.futureDate]}
        validation-message="Event must be in the future"
        helper-text="When is your event?"
      >
        <span slot="prefix">📅</span>
      </monk-date-input>

      <monk-date-input
        label="Registration Deadline"
        required
        validate
        .validators=${[validators.futureDate]}
        helper-text="Last day to register"
      >
        <span slot="prefix">⏰</span>
      </monk-date-input>

      <monk-button variant="solid" full-width>Create Event</monk-button>
    </monk-stack>
  `,
};

export const APIValueDemo: Story = {
  render: () => {
    const handleGetValue = () => {
      const input = document.getElementById('date-demo') as any;
      const uiValue = input?.value;
      const apiValue = input?.getApiValue();
      alert('UI Value: ' + uiValue + '\nAPI Value (ISO): ' + apiValue);
    };

    return html`
      <monk-stack spacing="6" style="max-width: 400px;">
        <monk-heading level="h3">ISO Conversion Demo</monk-heading>
        <monk-text>
          Enter a date and click the button to see UI format (MM/DD/YYYY) vs API format (YYYY-MM-DD).
        </monk-text>

        <monk-date-input
          id="date-demo"
          label="Select Date"
          value="01/29/2025"
        ></monk-date-input>

        <monk-button variant="outline" @click=${handleGetValue}>
          Get Values
        </monk-button>
      </monk-stack>
    `;
  },
};
