import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './button.js';
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
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <monk-button variant="solid">Solid</monk-button>
      <monk-button variant="outline">Outline</monk-button>
      <monk-button variant="ghost">Ghost</monk-button>
      <monk-button variant="link">Link</monk-button>
    </div>
  `,
};

/**
 * All color schemes with solid variant
 */
export const ColorSchemes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <monk-button color-scheme="primary">Primary</monk-button>
      <monk-button color-scheme="neutral">Neutral</monk-button>
      <monk-button color-scheme="success">Success</monk-button>
      <monk-button color-scheme="error">Error</monk-button>
      <monk-button color-scheme="warning">Warning</monk-button>
    </div>
  `,
};

/**
 * All sizes from xs to xl
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <monk-button size="xs">Extra Small</monk-button>
      <monk-button size="sm">Small</monk-button>
      <monk-button size="md">Medium</monk-button>
      <monk-button size="lg">Large</monk-button>
      <monk-button size="xl">Extra Large</monk-button>
    </div>
  `,
};

/**
 * Matrix of all variants and color schemes
 */
export const VariantColorMatrix: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Solid -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Solid</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          ${(['primary', 'neutral', 'success', 'error', 'warning'] as const).map(
            (color) => html`
              <monk-button variant="solid" color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-button>
            `
          )}
        </div>
      </div>

      <!-- Outline -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Outline</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          ${(['primary', 'neutral', 'success', 'error', 'warning'] as const).map(
            (color) => html`
              <monk-button variant="outline" color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-button>
            `
          )}
        </div>
      </div>

      <!-- Ghost -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Ghost</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          ${(['primary', 'neutral', 'success', 'error', 'warning'] as const).map(
            (color) => html`
              <monk-button variant="ghost" color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-button>
            `
          )}
        </div>
      </div>

      <!-- Link -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Link</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          ${(['primary', 'neutral', 'success', 'error', 'warning'] as const).map(
            (color) => html`
              <monk-button variant="link" color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-button>
            `
          )}
        </div>
      </div>
    </div>
  `,
};

/**
 * Disabled state for all variants
 */
export const DisabledState: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <monk-button disabled>Solid Disabled</monk-button>
      <monk-button variant="outline" disabled>Outline Disabled</monk-button>
      <monk-button variant="ghost" disabled>Ghost Disabled</monk-button>
      <monk-button variant="link" disabled>Link Disabled</monk-button>
    </div>
  `,
};

/**
 * Full width button
 */
export const FullWidth: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <monk-button full-width>Full Width Button</monk-button>
    </div>
  `,
};

/**
 * Common use cases and patterns
 */
export const UseCases: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <!-- Primary Actions -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Primary Actions</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <monk-button>Save</monk-button>
          <monk-button>Submit</monk-button>
          <monk-button>Continue</monk-button>
        </div>
      </div>

      <!-- Secondary Actions -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Secondary Actions</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <monk-button variant="outline" color-scheme="neutral">Cancel</monk-button>
          <monk-button variant="ghost" color-scheme="neutral">Skip</monk-button>
          <monk-button variant="link">Learn more</monk-button>
        </div>
      </div>

      <!-- Confirmation Actions -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Confirmation Actions</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <monk-button color-scheme="success">Approve</monk-button>
          <monk-button color-scheme="success">Confirm</monk-button>
          <monk-button variant="outline" color-scheme="success">Save Draft</monk-button>
        </div>
      </div>

      <!-- Destructive Actions -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Destructive Actions</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <monk-button color-scheme="error">Delete</monk-button>
          <monk-button color-scheme="error">Remove</monk-button>
          <monk-button variant="outline" color-scheme="error">Discard</monk-button>
        </div>
      </div>

      <!-- Warning Actions -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Warning Actions</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <monk-button color-scheme="warning">Proceed Anyway</monk-button>
          <monk-button variant="outline" color-scheme="warning">Review</monk-button>
        </div>
      </div>
    </div>
  `,
};

/**
 * Button groups with different alignments
 */
export const ButtonGroups: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <!-- Left aligned actions -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Left Aligned</h4>
        <div style="display: flex; gap: 12px;">
          <monk-button>Save</monk-button>
          <monk-button variant="outline" color-scheme="neutral">Cancel</monk-button>
        </div>
      </div>

      <!-- Right aligned actions -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Right Aligned</h4>
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <monk-button variant="outline" color-scheme="neutral">Cancel</monk-button>
          <monk-button>Save</monk-button>
        </div>
      </div>

      <!-- Space between -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Space Between</h4>
        <div style="display: flex; gap: 12px; justify-content: space-between;">
          <monk-button variant="ghost" color-scheme="neutral">Back</monk-button>
          <div style="display: flex; gap: 12px;">
            <monk-button variant="outline" color-scheme="neutral">Cancel</monk-button>
            <monk-button>Continue</monk-button>
          </div>
        </div>
      </div>

      <!-- Vertical stack -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">Vertical Stack</h4>
        <div style="display: flex; flex-direction: column; gap: 12px; max-width: 200px;">
          <monk-button full-width>Primary Action</monk-button>
          <monk-button variant="outline" color-scheme="neutral" full-width>
            Secondary Action
          </monk-button>
          <monk-button variant="link" full-width>Tertiary Action</monk-button>
        </div>
      </div>
    </div>
  `,
};

/**
 * Form example with button types
 */
export const FormExample: Story = {
  render: () => html`
    <form
      style="max-width: 400px; padding: 24px; border: 1px solid #ddd; border-radius: 8px;"
      @submit=${(e: Event) => {
        e.preventDefault();
        console.log('Form submitted');
      }}
    >
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">
          Email
        </label>
        <input
          type="email"
          placeholder="your@email.com"
          style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
        />
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">
          Password
        </label>
        <input
          type="password"
          style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
        />
      </div>

      <div style="display: flex; gap: 12px;">
        <monk-button type="submit" full-width>Sign In</monk-button>
        <monk-button type="reset" variant="outline" color-scheme="neutral" full-width>
          Reset
        </monk-button>
      </div>
    </form>
  `,
};

/**
 * Accessibility demonstration
 */
export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">
          Keyboard Navigation
        </h4>
        <p style="margin: 0 0 12px 0; color: #666;">
          Tab to focus, Enter/Space to activate, Tab+Shift to reverse
        </p>
        <div style="display: flex; gap: 12px;">
          <monk-button>First Button</monk-button>
          <monk-button variant="outline">Second Button</monk-button>
          <monk-button variant="ghost">Third Button</monk-button>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">
          Disabled State (not focusable)
        </h4>
        <div style="display: flex; gap: 12px;">
          <monk-button disabled>Disabled Button</monk-button>
          <monk-button>Enabled Button</monk-button>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; font-weight: 600;">
          Color Contrast (WCAG AA compliant)
        </h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          ${(['primary', 'neutral', 'success', 'error', 'warning'] as const).map(
            (color) => html`
              <monk-button color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-button>
            `
          )}
        </div>
      </div>
    </div>
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
