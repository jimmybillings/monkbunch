import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './divider.js';
import '../typography/heading.js';
import '../typography/text.js';
import '../layout/stack.js';
import '../layout/flex.js';

const meta: Meta = {
  title: 'Components/Divider',
  component: 'monk-divider',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The Divider component provides visual separation between content sections. It supports horizontal and vertical orientations, multiple line styles, optional labels, and custom colors.

## Features

- **Orientations**: Horizontal (default) and vertical
- **Variants**: Solid, dashed, and dotted line styles
- **Thickness**: Thin, medium (default), and thick
- **Labels**: Optional text in the middle (horizontal only)
- **Custom Colors**: Override default border color with any CSS color value
- **Accessibility**: Proper ARIA roles and semantic HTML

## Usage

\`\`\`html
<!-- Simple horizontal divider -->
<monk-divider></monk-divider>

<!-- With label -->
<monk-divider label="OR"></monk-divider>

<!-- Vertical divider -->
<monk-divider orientation="vertical"></monk-divider>

<!-- Dashed style -->
<monk-divider variant="dashed"></monk-divider>

<!-- Custom color -->
<monk-divider color="#ff6b6b"></monk-divider>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the divider',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Visual style variant (line style)',
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    thickness: {
      control: 'select',
      options: ['thin', 'medium', 'thick'],
      description: 'Thickness of the divider line',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    label: {
      control: 'text',
      description: 'Optional label text (horizontal only)',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    color: {
      control: 'color',
      description: 'Custom divider color',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default horizontal divider with solid style
 */
export const Default: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-text>Content above divider</monk-text>
      <monk-divider></monk-divider>
      <monk-text>Content below divider</monk-text>
    </monk-stack>
  `,
};

/**
 * All three line style variants
 */
export const Variants: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <monk-stack spacing="3">
        <monk-heading level="h4">Solid (Default)</monk-heading>
        <monk-divider variant="solid"></monk-divider>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Dashed</monk-heading>
        <monk-divider variant="dashed"></monk-divider>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Dotted</monk-heading>
        <monk-divider variant="dotted"></monk-divider>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Different thickness options
 */
export const Thickness: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <monk-stack spacing="3">
        <monk-heading level="h4">Thin (1px)</monk-heading>
        <monk-divider thickness="thin"></monk-divider>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Medium (1px - Default)</monk-heading>
        <monk-divider thickness="medium"></monk-divider>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Thick (2px)</monk-heading>
        <monk-divider thickness="thick"></monk-divider>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Horizontal dividers with labels
 */
export const WithLabel: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <monk-stack spacing="6">
        <monk-heading level="h4">Login Form Separator</monk-heading>
        <monk-stack spacing="4">
          <monk-text>Sign in with email</monk-text>
          <monk-divider label="OR"></monk-divider>
          <monk-text>Sign in with social provider</monk-text>
        </monk-stack>
      </monk-stack>

      <monk-stack spacing="6">
        <monk-heading level="h4">Content Section Separator</monk-heading>
        <monk-stack spacing="4">
          <monk-text>Free tier features</monk-text>
          <monk-divider label="UPGRADE TO PRO"></monk-divider>
          <monk-text>Pro tier features</monk-text>
        </monk-stack>
      </monk-stack>

      <monk-stack spacing="6">
        <monk-heading level="h4">Timeline Separator</monk-heading>
        <monk-stack spacing="4">
          <monk-text>Previous messages</monk-text>
          <monk-divider label="TODAY"></monk-divider>
          <monk-text>Recent messages</monk-text>
        </monk-stack>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Vertical orientation for side-by-side content
 */
export const VerticalOrientation: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <monk-stack spacing="3">
        <monk-heading level="h4">Vertical Divider (100px height)</monk-heading>
        <monk-flex gap="4" align="center" style="height: 100px;">
          <monk-text>Left content</monk-text>
          <monk-divider orientation="vertical"></monk-divider>
          <monk-text>Right content</monk-text>
        </monk-flex>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Vertical with Variants</monk-heading>
        <monk-flex gap="6" align="center" style="height: 80px;">
          <monk-text>Solid</monk-text>
          <monk-divider orientation="vertical" variant="solid"></monk-divider>
          <monk-text>Dashed</monk-text>
          <monk-divider orientation="vertical" variant="dashed"></monk-divider>
          <monk-text>Dotted</monk-text>
          <monk-divider orientation="vertical" variant="dotted"></monk-divider>
        </monk-flex>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Vertical Thickness</monk-heading>
        <monk-flex gap="6" align="center" style="height: 80px;">
          <monk-text>Thin</monk-text>
          <monk-divider orientation="vertical" thickness="thin"></monk-divider>
          <monk-text>Medium</monk-text>
          <monk-divider orientation="vertical" thickness="medium"></monk-divider>
          <monk-text>Thick</monk-text>
          <monk-divider orientation="vertical" thickness="thick"></monk-divider>
        </monk-flex>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Custom colors using the color prop
 */
export const CustomColors: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <monk-stack spacing="3">
        <monk-heading level="h4">Custom Solid Colors (Using Props)</monk-heading>
        <monk-text color="secondary">
          Override divider color using the color prop - works just like React!
        </monk-text>
        <monk-stack spacing="4">
          <monk-divider color="#ff6b6b"></monk-divider>
          <monk-divider color="#ffd93d"></monk-divider>
          <monk-divider color="#6bcf7f"></monk-divider>
          <monk-divider color="#4d96ff"></monk-divider>
          <monk-divider color="#a855f7"></monk-divider>
        </monk-stack>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Custom Dashed Colors</monk-heading>
        <monk-stack spacing="4">
          <monk-divider variant="dashed" color="#ff6b6b"></monk-divider>
          <monk-divider variant="dashed" color="#ffd93d"></monk-divider>
          <monk-divider variant="dashed" color="#6bcf7f"></monk-divider>
        </monk-stack>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Custom Dotted Colors</monk-heading>
        <monk-stack spacing="4">
          <monk-divider variant="dotted" thickness="thick" color="#ff6b6b"></monk-divider>
          <monk-divider variant="dotted" thickness="thick" color="#4d96ff"></monk-divider>
          <monk-divider variant="dotted" thickness="thick" color="#a855f7"></monk-divider>
        </monk-stack>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">RGB and RGBA Colors</monk-heading>
        <monk-stack spacing="4">
          <monk-divider color="rgb(255, 107, 107)"></monk-divider>
          <monk-divider color="rgba(255, 107, 107, 0.5)"></monk-divider>
          <monk-divider color="rgba(77, 150, 255, 0.3)"></monk-divider>
        </monk-stack>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Combining variants, thickness, and labels
 */
export const Combinations: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <monk-stack spacing="3">
        <monk-heading level="h4">Thick Dashed with Label</monk-heading>
        <monk-divider variant="dashed" thickness="thick" label="OR"></monk-divider>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Dotted with Custom Color and Label</monk-heading>
        <monk-divider variant="dotted" thickness="thick" label="CHOOSE ONE" color="#a855f7"></monk-divider>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Vertical Dashed Thick</monk-heading>
        <monk-flex gap="4" align="center" style="height: 100px;">
          <monk-text>Left side</monk-text>
          <monk-divider orientation="vertical" variant="dashed" thickness="thick"></monk-divider>
          <monk-text>Right side</monk-text>
        </monk-flex>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Real-world use cases
 */
export const UseCases: Story = {
  render: () => html`
    <monk-stack spacing="10">
      <monk-stack spacing="4">
        <monk-heading level="h3">Card Footer Separator</monk-heading>
        <div
          style="border: 1px solid var(--monk-color-border-default); border-radius: var(--monk-radius-md); padding: var(--monk-space-6);"
        >
          <monk-stack spacing="4">
            <monk-heading level="h4">Product Title</monk-heading>
            <monk-text>This is the main content of the card with some description text.</monk-text>
            <monk-divider></monk-divider>
            <monk-flex gap="4" justify="space-between">
              <monk-text color="secondary">Posted 2 days ago</monk-text>
              <monk-text color="secondary">12 comments</monk-text>
            </monk-flex>
          </monk-stack>
        </div>
      </monk-stack>

      <monk-stack spacing="4">
        <monk-heading level="h3">Sidebar Navigation</monk-heading>
        <div style="width: 250px; padding: var(--monk-space-4); background: var(--monk-color-bg-surface);">
          <monk-stack spacing="4">
            <monk-text>Dashboard</monk-text>
            <monk-text>Projects</monk-text>
            <monk-text>Team</monk-text>
            <monk-divider></monk-divider>
            <monk-text color="secondary">Settings</monk-text>
            <monk-text color="secondary">Help</monk-text>
          </monk-stack>
        </div>
      </monk-stack>

      <monk-stack spacing="4">
        <monk-heading level="h3">Form Sections</monk-heading>
        <div
          style="border: 1px solid var(--monk-color-border-default); border-radius: var(--monk-radius-md); padding: var(--monk-space-6);"
        >
          <monk-stack spacing="6">
            <monk-stack spacing="3">
              <monk-heading level="h4">Personal Information</monk-heading>
              <monk-text color="secondary">Update your personal details</monk-text>
            </monk-stack>
            <monk-divider></monk-divider>
            <monk-stack spacing="3">
              <monk-heading level="h4">Account Settings</monk-heading>
              <monk-text color="secondary">Manage your account preferences</monk-text>
            </monk-stack>
            <monk-divider></monk-divider>
            <monk-stack spacing="3">
              <monk-heading level="h4">Notifications</monk-heading>
              <monk-text color="secondary">Configure notification preferences</monk-text>
            </monk-stack>
          </monk-stack>
        </div>
      </monk-stack>

      <monk-stack spacing="4">
        <monk-heading level="h3">Toolbar Separator</monk-heading>
        <monk-flex
          gap="4"
          align="center"
          style="padding: var(--monk-space-3); background: var(--monk-color-bg-surface); border-radius: var(--monk-radius-md);"
        >
          <monk-text>Bold</monk-text>
          <monk-text>Italic</monk-text>
          <monk-text>Underline</monk-text>
          <monk-divider orientation="vertical" style="height: 24px;"></monk-divider>
          <monk-text>Align Left</monk-text>
          <monk-text>Align Center</monk-text>
          <monk-text>Align Right</monk-text>
          <monk-divider orientation="vertical" style="height: 24px;"></monk-divider>
          <monk-text>Undo</monk-text>
          <monk-text>Redo</monk-text>
        </monk-flex>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Playground for interactive testing
 */
export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    thickness: 'medium',
    label: undefined,
    color: undefined,
  },
  render: (args) => html`
    <monk-stack spacing="6">
      <monk-text>Content above divider</monk-text>
      <monk-divider
        orientation=${args.orientation}
        variant=${args.variant}
        thickness=${args.thickness}
        label=${args.label || ''}
        color=${args.color || ''}
      ></monk-divider>
      <monk-text>Content below divider</monk-text>
    </monk-stack>
  `,
};
