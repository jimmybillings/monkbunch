import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './text-input.js';
import '../typography/heading.js';
import '../typography/text.js';
import '../layout/stack.js';
import '../layout/flex.js';
import '../button/button.js';

const meta: Meta = {
  title: 'Components/Input/TextInput',
  component: 'monk-text-input',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The TextInput component provides a single-line text input field with support for labels, helper text, error messages, and prefix/suffix content.

## Features

- **Variants**: Outline (default), filled, flushed (underline only)
- **Sizes**: Small, medium (default), large
- **States**: Default, hover, focus, disabled, readonly, error
- **Labels**: Optional label with required indicator
- **Helper Text**: Contextual hints below the input
- **Error Messages**: Validation feedback that replaces helper text
- **Prefix/Suffix**: Slots for icons, text, or buttons
- **Character Count**: Optional character counter with maxlength
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Usage

\`\`\`html
<!-- Basic text input -->
<monk-text-input label="Name" placeholder="Enter your name"></monk-text-input>

<!-- With helper text -->
<monk-text-input
  label="Username"
  helper-text="Choose a unique username"
></monk-text-input>

<!-- With error -->
<monk-text-input
  label="Email"
  invalid
  error-message="This field is required"
></monk-text-input>

<!-- With prefix/suffix -->
<monk-text-input label="Website">
  <span slot="prefix">https://</span>
  <span slot="suffix">.com</span>
</monk-text-input>

<!-- With character count -->
<monk-text-input
  label="Bio"
  maxlength="100"
  show-count
></monk-text-input>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'outline' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (replaces helper text)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Required state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Invalid state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showCount: {
      control: 'boolean',
      description: 'Show character count',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default text input with label and placeholder
 */
export const Default: Story = {
  render: () => html`
    <monk-text-input
      label="Full Name"
      placeholder="Enter your full name"
      style="max-width: 400px;"
    ></monk-text-input>
  `,
};

/**
 * All three visual variants
 */
export const Variants: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-stack spacing="3">
        <monk-heading level="h4">Outline (Default)</monk-heading>
        <monk-text color="secondary">Border with background</monk-text>
        <monk-text-input
          variant="outline"
          label="Username"
          placeholder="johndoe"
        ></monk-text-input>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Filled</monk-heading>
        <monk-text color="secondary">Subtle background, no border until focus</monk-text>
        <monk-text-input
          variant="filled"
          label="Username"
          placeholder="johndoe"
        ></monk-text-input>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Flushed</monk-heading>
        <monk-text color="secondary">Underline only, minimal style</monk-text>
        <monk-text-input
          variant="flushed"
          label="Username"
          placeholder="johndoe"
        ></monk-text-input>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Different input sizes
 */
export const Sizes: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-text-input
        size="sm"
        label="Small (32px)"
        placeholder="Small input"
      ></monk-text-input>

      <monk-text-input
        size="md"
        label="Medium (40px - Default)"
        placeholder="Medium input"
      ></monk-text-input>

      <monk-text-input
        size="lg"
        label="Large (48px)"
        placeholder="Large input"
      ></monk-text-input>
    </monk-stack>
  `,
};

/**
 * Input states (disabled, readonly, required, invalid)
 */
export const States: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-text-input
        label="Default State"
        placeholder="Enter text..."
        helper-text="This is a normal input"
      ></monk-text-input>

      <monk-text-input
        label="Required Field"
        placeholder="This field is required"
        required
        helper-text="Required fields are marked with *"
      ></monk-text-input>

      <monk-text-input
        label="Disabled Input"
        value="Cannot edit this"
        disabled
        helper-text="This input is disabled"
      ></monk-text-input>

      <monk-text-input
        label="Readonly Input"
        value="Can select but not edit"
        readonly
        helper-text="This input is readonly"
      ></monk-text-input>

      <monk-text-input
        label="Invalid Input"
        value="invalid@"
        invalid
        error-message="Please enter a valid email address"
      ></monk-text-input>
    </monk-stack>
  `,
};

/**
 * Helper text and error messages
 */
export const HelperAndError: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-stack spacing="3">
        <monk-heading level="h4">With Helper Text</monk-heading>
        <monk-text-input
          label="Username"
          placeholder="johndoe"
          helper-text="Choose a unique username between 3-20 characters"
        ></monk-text-input>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">With Error Message</monk-heading>
        <monk-text-input
          label="Email"
          value="invalid-email"
          invalid
          error-message="Please enter a valid email address"
        ></monk-text-input>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Error Replaces Helper</monk-heading>
        <monk-text color="secondary" size="sm">
          When both helper text and error message are present, error message takes precedence
        </monk-text>
        <monk-text-input
          label="Password"
          value="123"
          invalid
          helper-text="This won't be shown"
          error-message="Password must be at least 8 characters"
        ></monk-text-input>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Prefix and suffix slots for icons and text
 */
export const PrefixSuffix: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-stack spacing="3">
        <monk-heading level="h4">With Prefix</monk-heading>
        <monk-text-input label="Amount" placeholder="0.00">
          <span slot="prefix">$</span>
        </monk-text-input>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">With Suffix</monk-heading>
        <monk-text-input label="Website" placeholder="example">
          <span slot="suffix">.com</span>
        </monk-text-input>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">With Both</monk-heading>
        <monk-text-input label="Website URL" placeholder="mysite">
          <span slot="prefix">https://</span>
          <span slot="suffix">.com</span>
        </monk-text-input>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">With Search Icon</monk-heading>
        <monk-text-input label="Search" placeholder="Search...">
          <span slot="prefix">🔍</span>
        </monk-text-input>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Character count with maxlength
 */
export const CharacterCount: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-stack spacing="3">
        <monk-heading level="h4">With Character Count</monk-heading>
        <monk-text-input
          label="Bio"
          placeholder="Tell us about yourself"
          maxlength="100"
          show-count
          helper-text="Keep it short and sweet"
        ></monk-text-input>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Count with Pre-filled Value</monk-heading>
        <monk-text-input
          label="Tweet"
          value="Hello, world!"
          maxlength="280"
          show-count
        ></monk-text-input>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Count with Error</monk-heading>
        <monk-text-input
          label="Comment"
          value="This is a very long comment that exceeds the maximum allowed length"
          maxlength="50"
          show-count
          invalid
          error-message="Comment is too long"
        ></monk-text-input>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Real-world form examples
 */
export const FormExamples: Story = {
  render: () => html`
    <monk-stack spacing="10">
      <monk-stack spacing="4">
        <monk-heading level="h3">Login Form</monk-heading>
        <monk-stack spacing="4" style="max-width: 400px;">
          <monk-text-input
            label="Email"
            placeholder="you@example.com"
            required
          ></monk-text-input>

          <monk-text-input
            label="Password"
            placeholder="Enter your password"
            required
          ></monk-text-input>

          <monk-button variant="solid" full-width>Sign In</monk-button>
        </monk-stack>
      </monk-stack>

      <monk-stack spacing="4">
        <monk-heading level="h3">Profile Settings</monk-heading>
        <monk-stack spacing="4" style="max-width: 500px;">
          <monk-text-input
            label="Display Name"
            value="John Doe"
            helper-text="This is how your name will appear to others"
          ></monk-text-input>

          <monk-text-input
            label="Username"
            value="johndoe"
            helper-text="Your unique username"
          >
            <span slot="prefix">@</span>
          </monk-text-input>

          <monk-text-input
            label="Website"
            value="johndoe"
            helper-text="Your personal website or portfolio"
          >
            <span slot="prefix">https://</span>
            <span slot="suffix">.com</span>
          </monk-text-input>

          <monk-text-input
            label="Bio"
            value="Software developer and designer"
            maxlength="160"
            show-count
            helper-text="Brief description for your profile"
          ></monk-text-input>

          <monk-flex gap="3">
            <monk-button variant="outline">Cancel</monk-button>
            <monk-button variant="solid">Save Changes</monk-button>
          </monk-flex>
        </monk-stack>
      </monk-stack>

      <monk-stack spacing="4">
        <monk-heading level="h3">Payment Form</monk-heading>
        <monk-stack spacing="4" style="max-width: 400px;">
          <monk-text-input
            label="Cardholder Name"
            placeholder="John Doe"
            required
          ></monk-text-input>

          <monk-text-input label="Card Number" placeholder="1234 5678 9012 3456" required>
            <span slot="prefix">💳</span>
          </monk-text-input>

          <monk-flex gap="4">
            <monk-text-input
              label="Expiry"
              placeholder="MM/YY"
              required
              style="flex: 1;"
            ></monk-text-input>
            <monk-text-input label="CVV" placeholder="123" required style="flex: 1;"></monk-text-input>
          </monk-flex>

          <monk-button variant="solid" full-width>Pay $99.00</monk-button>
        </monk-stack>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Playground for interactive testing
 */
export const Playground: Story = {
  args: {
    size: 'md',
    variant: 'outline',
    label: 'Label',
    placeholder: 'Enter text...',
    helperText: 'This is helper text',
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    showCount: false,
  },
  render: (args) => html`
    <monk-text-input
      size=${args.size}
      variant=${args.variant}
      label=${args.label || ''}
      placeholder=${args.placeholder || ''}
      helper-text=${args.helperText || ''}
      error-message=${args.errorMessage || ''}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
      ?invalid=${args.invalid}
      ?show-count=${args.showCount}
      maxlength=${args.showCount ? 100 : undefined}
      style="max-width: 400px;"
      @input-change=${(e: CustomEvent) => console.log('Input change:', e.detail.value)}
      @input-changed=${(e: CustomEvent) => console.log('Input changed:', e.detail.value)}
    ></monk-text-input>
  `,
};
