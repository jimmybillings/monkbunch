import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './button.js';
import '../layout/flex.js';
import '../layout/stack.js';
import '../layout/box.js';
import '../layout/container.js';
import '../typography/heading.js';
import '../typography/text.js';
import type { MonkButton } from './button.js';

const meta: Meta<MonkButton> = {
  title: 'Components/Button',
  component: 'monk-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'neutral', 'success', 'error', 'warning'],
      description: 'Semantic color scheme',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type for forms',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<MonkButton>;

/**
 * Default button with primary color scheme and solid variant
 */
export const Default: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
  },
  render: (args) => html`
    <monk-button
      variant=${args.variant}
      color-scheme=${args.colorScheme}
      size=${args.size}
      ?disabled=${args.disabled}
      ?full-width=${args.fullWidth}
      type=${args.type}
    >
      Click me
    </monk-button>
  `,
};

/**
 * All button variants in a row
 */
export const Variants: Story = {
  render: () => html`
    <monk-flex gap="4" wrap="wrap">
      <monk-button variant="solid">Solid</monk-button>
      <monk-button variant="outline">Outline</monk-button>
      <monk-button variant="ghost">Ghost</monk-button>
      <monk-button variant="link">Link</monk-button>
    </monk-flex>
  `,
};

/**
 * All color schemes with solid variant
 */
export const ColorSchemes: Story = {
  render: () => html`
    <monk-flex gap="4" wrap="wrap">
      <monk-button color-scheme="primary">Primary</monk-button>
      <monk-button color-scheme="neutral">Neutral</monk-button>
      <monk-button color-scheme="success">Success</monk-button>
      <monk-button color-scheme="error">Error</monk-button>
      <monk-button color-scheme="warning">Warning</monk-button>
    </monk-flex>
  `,
};

/**
 * All sizes from xs to xl
 */
export const Sizes: Story = {
  render: () => html`
    <monk-flex gap="4" align="center" wrap="wrap">
      <monk-button size="xs">Extra Small</monk-button>
      <monk-button size="sm">Small</monk-button>
      <monk-button size="md">Medium</monk-button>
      <monk-button size="lg">Large</monk-button>
      <monk-button size="xl">Extra Large</monk-button>
    </monk-flex>
  `,
};

/**
 * Matrix of all variants and color schemes
 */
export const VariantColorMatrix: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <!-- Solid -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Solid</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          ${(['primary', 'neutral', 'success', 'error', 'warning'] as const).map(
            (color) => html`
              <monk-button variant="solid" color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-button>
            `
          )}
        </monk-flex>
      </monk-stack>

      <!-- Outline -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Outline</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          ${(['primary', 'neutral', 'success', 'error', 'warning'] as const).map(
            (color) => html`
              <monk-button variant="outline" color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-button>
            `
          )}
        </monk-flex>
      </monk-stack>

      <!-- Ghost -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Ghost</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          ${(['primary', 'neutral', 'success', 'error', 'warning'] as const).map(
            (color) => html`
              <monk-button variant="ghost" color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-button>
            `
          )}
        </monk-flex>
      </monk-stack>

      <!-- Link -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Link</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          ${(['primary', 'neutral', 'success', 'error', 'warning'] as const).map(
            (color) => html`
              <monk-button variant="link" color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-button>
            `
          )}
        </monk-flex>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Disabled state for all variants
 */
export const DisabledState: Story = {
  render: () => html`
    <monk-flex gap="4" wrap="wrap">
      <monk-button disabled>Solid Disabled</monk-button>
      <monk-button variant="outline" disabled>Outline Disabled</monk-button>
      <monk-button variant="ghost" disabled>Ghost Disabled</monk-button>
      <monk-button variant="link" disabled>Link Disabled</monk-button>
    </monk-flex>
  `,
};

/**
 * Full width button
 */
export const FullWidth: Story = {
  render: () => html`
    <monk-container size="sm">
      <monk-button full-width>Full Width Button</monk-button>
    </monk-container>
  `,
};

/**
 * Common use cases and patterns
 */
export const UseCases: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <!-- Primary Actions -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Primary Actions</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          <monk-button>Save</monk-button>
          <monk-button>Submit</monk-button>
          <monk-button>Continue</monk-button>
        </monk-flex>
      </monk-stack>

      <!-- Secondary Actions -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Secondary Actions</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          <monk-button variant="outline" color-scheme="neutral">Cancel</monk-button>
          <monk-button variant="ghost" color-scheme="neutral">Skip</monk-button>
          <monk-button variant="link">Learn more</monk-button>
        </monk-flex>
      </monk-stack>

      <!-- Confirmation Actions -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Confirmation Actions</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          <monk-button color-scheme="success">Approve</monk-button>
          <monk-button color-scheme="success">Confirm</monk-button>
          <monk-button variant="outline" color-scheme="success">Save Draft</monk-button>
        </monk-flex>
      </monk-stack>

      <!-- Destructive Actions -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Destructive Actions</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          <monk-button color-scheme="error">Delete</monk-button>
          <monk-button color-scheme="error">Remove</monk-button>
          <monk-button variant="outline" color-scheme="error">Discard</monk-button>
        </monk-flex>
      </monk-stack>

      <!-- Warning Actions -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Warning Actions</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          <monk-button color-scheme="warning">Proceed Anyway</monk-button>
          <monk-button variant="outline" color-scheme="warning">Review</monk-button>
        </monk-flex>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Button groups with different alignments
 */
export const ButtonGroups: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <!-- Left aligned actions -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Left Aligned</monk-heading>
        <monk-flex gap="3">
          <monk-button>Save</monk-button>
          <monk-button variant="outline" color-scheme="neutral">Cancel</monk-button>
        </monk-flex>
      </monk-stack>

      <!-- Right aligned actions -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Right Aligned</monk-heading>
        <monk-flex gap="3" justify="end">
          <monk-button variant="outline" color-scheme="neutral">Cancel</monk-button>
          <monk-button>Save</monk-button>
        </monk-flex>
      </monk-stack>

      <!-- Space between -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Space Between</monk-heading>
        <monk-flex gap="3" justify="between">
          <monk-button variant="ghost" color-scheme="neutral">Back</monk-button>
          <monk-flex gap="3">
            <monk-button variant="outline" color-scheme="neutral">Cancel</monk-button>
            <monk-button>Continue</monk-button>
          </monk-flex>
        </monk-flex>
      </monk-stack>

      <!-- Vertical stack -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Vertical Stack</monk-heading>
        <monk-container size="sm">
          <monk-stack spacing="3">
            <monk-button full-width>Primary Action</monk-button>
            <monk-button variant="outline" color-scheme="neutral" full-width>
              Secondary Action
            </monk-button>
            <monk-button variant="link" full-width>Tertiary Action</monk-button>
          </monk-stack>
        </monk-container>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Form example with button types
 */
export const FormExample: Story = {
  render: () => html`
    <monk-container size="sm">
      <monk-box padding="6" bg="surface" radius="lg" shadow="md" border="1px">
        <form
          @submit=${(e: Event) => {
            e.preventDefault();
            console.log('Form submitted');
          }}
        >
          <monk-stack spacing="4">
            <monk-stack spacing="1">
              <monk-text weight="medium">Email</monk-text>
              <input
                type="email"
                placeholder="your@email.com"
                style="width: 100%; padding: 8px; border: 1px solid var(--monk-color-border-default); border-radius: var(--monk-radius-sm); font-family: var(--monk-font-family-base);"
              />
            </monk-stack>

            <monk-stack spacing="1">
              <monk-text weight="medium">Password</monk-text>
              <input
                type="password"
                style="width: 100%; padding: 8px; border: 1px solid var(--monk-color-border-default); border-radius: var(--monk-radius-sm); font-family: var(--monk-font-family-base);"
              />
            </monk-stack>

            <monk-flex gap="3">
              <monk-button type="submit" full-width>Sign In</monk-button>
              <monk-button type="reset" variant="outline" color-scheme="neutral" full-width>
                Reset
              </monk-button>
            </monk-flex>
          </monk-stack>
        </form>
      </monk-box>
    </monk-container>
  `,
};

/**
 * Accessibility demonstration
 */
export const Accessibility: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-stack spacing="3">
        <monk-heading level="h4">Keyboard Navigation</monk-heading>
        <monk-text color="secondary">
          Tab to focus, Enter/Space to activate, Tab+Shift to reverse
        </monk-text>
        <monk-flex gap="3">
          <monk-button>First Button</monk-button>
          <monk-button variant="outline">Second Button</monk-button>
          <monk-button variant="ghost">Third Button</monk-button>
        </monk-flex>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Disabled State (not focusable)</monk-heading>
        <monk-flex gap="3">
          <monk-button disabled>Disabled Button</monk-button>
          <monk-button>Enabled Button</monk-button>
        </monk-flex>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Color Contrast (WCAG AA compliant)</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          ${(['primary', 'neutral', 'success', 'error', 'warning'] as const).map(
            (color) => html`
              <monk-button color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-button>
            `
          )}
        </monk-flex>
      </monk-stack>
    </monk-stack>
  `,
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};
