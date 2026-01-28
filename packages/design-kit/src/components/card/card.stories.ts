import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './card.js';
import '../typography/heading.js';
import '../typography/text.js';
import '../button/button.js';
import '../badge/badge.js';
import '../divider/divider.js';
import '../layout/stack.js';
import '../layout/flex.js';

const meta: Meta = {
  title: 'Components/Card',
  component: 'monk-card',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The Card component provides a flexible container for grouping related content and actions. It supports multiple visual styles, interactive states, and customizable spacing and shadows.

## Features

- **Variants**: Elevated (with shadow), outline (with border), filled (subtle background)
- **Interactive**: Optional hover effects and click handlers
- **Flexible Content**: Use slots for any content structure
- **Customizable**: Control padding, border radius, and shadow levels
- **Accessibility**: Proper ARIA roles and keyboard navigation for interactive cards

## Usage

\`\`\`html
<!-- Basic elevated card -->
<monk-card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</monk-card>

<!-- Outline card -->
<monk-card variant="outline">
  <h3>Card Title</h3>
  <p>Card content with border</p>
</monk-card>

<!-- Interactive card -->
<monk-card interactive>
  <h3>Clickable Card</h3>
  <p>This card responds to clicks</p>
</monk-card>

<!-- Custom styling -->
<monk-card padding="8" radius="lg" shadow="xl">
  <h3>Custom Card</h3>
  <p>With custom spacing and shadow</p>
</monk-card>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outline', 'filled'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'elevated' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is interactive (adds hover effects)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    padding: {
      control: 'select',
      options: ['0', '2', '4', '6', '8', '10', '12', '16'],
      description: 'Padding using space scale',
      table: {
        defaultValue: { summary: '6' },
      },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Border radius',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Shadow level (for elevated variant)',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    bg: {
      control: 'color',
      description: 'Custom background color',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default elevated card with shadow
 */
export const Default: Story = {
  render: () => html`
    <monk-card style="max-width: 400px;">
      <monk-stack spacing="3">
        <monk-heading level="h3">Card Title</monk-heading>
        <monk-text>
          This is a basic elevated card with shadow. It's perfect for displaying content that needs
          to stand out from the background.
        </monk-text>
      </monk-stack>
    </monk-card>
  `,
};

/**
 * All three visual variants
 */
export const Variants: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-stack spacing="3">
        <monk-heading level="h4">Elevated (Default)</monk-heading>
        <monk-text color="secondary">Card with shadow, appears raised above the surface</monk-text>
        <monk-card style="max-width: 400px;">
          <monk-stack spacing="3">
            <monk-heading level="h5">Elevated Card</monk-heading>
            <monk-text>This card uses a shadow to create depth and hierarchy.</monk-text>
          </monk-stack>
        </monk-card>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Outline</monk-heading>
        <monk-text color="secondary">Card with border, flat appearance</monk-text>
        <monk-card variant="outline" style="max-width: 400px;">
          <monk-stack spacing="3">
            <monk-heading level="h5">Outline Card</monk-heading>
            <monk-text>This card uses a border instead of a shadow for definition.</monk-text>
          </monk-stack>
        </monk-card>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Filled</monk-heading>
        <monk-text color="secondary">Card with subtle background, no border or shadow</monk-text>
        <monk-card variant="filled" style="max-width: 400px;">
          <monk-stack spacing="3">
            <monk-heading level="h5">Filled Card</monk-heading>
            <monk-text>This card uses a subtle background color for differentiation.</monk-text>
          </monk-stack>
        </monk-card>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Interactive cards with hover effects
 */
export const Interactive: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-text color="secondary">Click or focus these cards to see interactive effects</monk-text>

      <monk-flex gap="4" wrap="wrap">
        <monk-card
          interactive
          style="max-width: 300px;"
          @card-click="${(e: CustomEvent) => {
            alert('Elevated card clicked!');
            console.log('Card click event:', e.detail);
          }}"
        >
          <monk-stack spacing="3">
            <monk-heading level="h5">Interactive Elevated</monk-heading>
            <monk-text>Hover to see lift effect</monk-text>
          </monk-stack>
        </monk-card>

        <monk-card
          variant="outline"
          interactive
          style="max-width: 300px;"
          @card-click="${() => alert('Outline card clicked!')}"
        >
          <monk-stack spacing="3">
            <monk-heading level="h5">Interactive Outline</monk-heading>
            <monk-text>Hover to see border change</monk-text>
          </monk-stack>
        </monk-card>

        <monk-card
          variant="filled"
          interactive
          style="max-width: 300px;"
          @card-click="${() => alert('Filled card clicked!')}"
        >
          <monk-stack spacing="3">
            <monk-heading level="h5">Interactive Filled</monk-heading>
            <monk-text>Hover to see background change</monk-text>
          </monk-stack>
        </monk-card>
      </monk-flex>
    </monk-stack>
  `,
};

/**
 * Different padding options
 */
export const Padding: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-heading level="h4">Padding Scale</monk-heading>

      <monk-flex gap="4" wrap="wrap">
        <monk-card padding="4" style="max-width: 250px;">
          <monk-text>Padding: 4 (16px)</monk-text>
        </monk-card>

        <monk-card padding="6" style="max-width: 250px;">
          <monk-text>Padding: 6 (24px - default)</monk-text>
        </monk-card>

        <monk-card padding="8" style="max-width: 250px;">
          <monk-text>Padding: 8 (32px)</monk-text>
        </monk-card>

        <monk-card padding="12" style="max-width: 250px;">
          <monk-text>Padding: 12 (48px)</monk-text>
        </monk-card>
      </monk-flex>

      <monk-stack spacing="3">
        <monk-heading level="h5">Zero Padding (for custom content)</monk-heading>
        <monk-card padding="0" style="max-width: 400px;">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
            alt="Landscape"
            style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px 8px 0 0;"
          />
          <div style="padding: 24px;">
            <monk-stack spacing="3">
              <monk-heading level="h5">Card with Image</monk-heading>
              <monk-text>Zero padding allows full-width images at the top.</monk-text>
            </monk-stack>
          </div>
        </monk-card>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Different shadow levels
 */
export const Shadows: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-heading level="h4">Shadow Levels</monk-heading>

      <monk-flex gap="6" wrap="wrap">
        <monk-card shadow="sm" style="max-width: 200px;">
          <monk-stack spacing="2">
            <monk-heading level="h6">Small</monk-heading>
            <monk-text size="sm">Subtle shadow</monk-text>
          </monk-stack>
        </monk-card>

        <monk-card shadow="md" style="max-width: 200px;">
          <monk-stack spacing="2">
            <monk-heading level="h6">Medium</monk-heading>
            <monk-text size="sm">Default shadow</monk-text>
          </monk-stack>
        </monk-card>

        <monk-card shadow="lg" style="max-width: 200px;">
          <monk-stack spacing="2">
            <monk-heading level="h6">Large</monk-heading>
            <monk-text size="sm">Pronounced shadow</monk-text>
          </monk-stack>
        </monk-card>

        <monk-card shadow="xl" style="max-width: 200px;">
          <monk-stack spacing="2">
            <monk-heading level="h6">Extra Large</monk-heading>
            <monk-text size="sm">Heavy shadow</monk-text>
          </monk-stack>
        </monk-card>

        <monk-card shadow="2xl" style="max-width: 200px;">
          <monk-stack spacing="2">
            <monk-heading level="h6">2X Large</monk-heading>
            <monk-text size="sm">Maximum shadow</monk-text>
          </monk-stack>
        </monk-card>
      </monk-flex>
    </monk-stack>
  `,
};

/**
 * Custom background colors
 */
export const CustomColors: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-heading level="h4">Custom Background Colors</monk-heading>

      <monk-flex gap="4" wrap="wrap">
        <monk-card bg="#fef3c7" style="max-width: 250px;">
          <monk-stack spacing="2">
            <monk-heading level="h5">Warm Yellow</monk-heading>
            <monk-text>Custom background with bg prop</monk-text>
          </monk-stack>
        </monk-card>

        <monk-card bg="#dbeafe" style="max-width: 250px;">
          <monk-stack spacing="2">
            <monk-heading level="h5">Sky Blue</monk-heading>
            <monk-text>Custom background with bg prop</monk-text>
          </monk-stack>
        </monk-card>

        <monk-card bg="#fce7f3" style="max-width: 250px;">
          <monk-stack spacing="2">
            <monk-heading level="h5">Soft Pink</monk-heading>
            <monk-text>Custom background with bg prop</monk-text>
          </monk-stack>
        </monk-card>

        <monk-card bg="#dcfce7" style="max-width: 250px;">
          <monk-stack spacing="2">
            <monk-heading level="h5">Mint Green</monk-heading>
            <monk-text>Custom background with bg prop</monk-text>
          </monk-stack>
        </monk-card>
      </monk-flex>
    </monk-stack>
  `,
};

/**
 * Real-world use case examples
 */
export const UseCases: Story = {
  render: () => html`
    <monk-stack spacing="10">
      <monk-stack spacing="4">
        <monk-heading level="h3">Product Card</monk-heading>
        <monk-card style="max-width: 350px;">
          <monk-stack spacing="4">
            <monk-stack spacing="2">
              <monk-flex justify="between" align="start">
                <monk-heading level="h4">Premium Plan</monk-heading>
                <monk-badge color-scheme="success">Popular</monk-badge>
              </monk-flex>
              <monk-text size="2xl" weight="bold">$29<monk-text size="base">/month</monk-text></monk-text>
            </monk-stack>

            <monk-divider></monk-divider>

            <monk-stack spacing="2">
              <monk-text>✓ Unlimited projects</monk-text>
              <monk-text>✓ 50GB storage</monk-text>
              <monk-text>✓ Priority support</monk-text>
              <monk-text>✓ Advanced analytics</monk-text>
            </monk-stack>

            <monk-button variant="solid" color-scheme="primary" full-width>
              Get Started
            </monk-button>
          </monk-stack>
        </monk-card>
      </monk-stack>

      <monk-stack spacing="4">
        <monk-heading level="h3">User Profile Card</monk-heading>
        <monk-card variant="outline" style="max-width: 400px;">
          <monk-stack spacing="4">
            <monk-flex gap="4" align="center">
              <div
                style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
              ></div>
              <monk-stack spacing="1">
                <monk-heading level="h4">Jane Cooper</monk-heading>
                <monk-text color="secondary">Product Designer</monk-text>
                <monk-flex gap="2">
                  <monk-badge variant="subtle" color-scheme="primary" size="sm">Design</monk-badge>
                  <monk-badge variant="subtle" color-scheme="info" size="sm">UI/UX</monk-badge>
                </monk-flex>
              </monk-stack>
            </monk-flex>

            <monk-divider></monk-divider>

            <monk-flex gap="6">
              <monk-stack spacing="1">
                <monk-text weight="semibold">128</monk-text>
                <monk-text size="sm" color="secondary">Projects</monk-text>
              </monk-stack>
              <monk-stack spacing="1">
                <monk-text weight="semibold">2.4k</monk-text>
                <monk-text size="sm" color="secondary">Followers</monk-text>
              </monk-stack>
              <monk-stack spacing="1">
                <monk-text weight="semibold">456</monk-text>
                <monk-text size="sm" color="secondary">Following</monk-text>
              </monk-stack>
            </monk-flex>
          </monk-stack>
        </monk-card>
      </monk-stack>

      <monk-stack spacing="4">
        <monk-heading level="h3">Blog Post Card (Interactive)</monk-heading>
        <monk-card
          interactive
          style="max-width: 450px;"
          @card-click="${() => console.log('Navigate to blog post')}"
        >
          <monk-stack spacing="3">
            <monk-badge variant="subtle" color-scheme="primary" size="sm">Tutorial</monk-badge>
            <monk-heading level="h4">Getting Started with Web Components</monk-heading>
            <monk-text color="secondary">
              Learn how to build reusable, framework-agnostic components using the Web Components
              standard and Lit library.
            </monk-text>
            <monk-divider></monk-divider>
            <monk-flex justify="between" align="center">
              <monk-text size="sm" color="secondary">5 min read • Jan 24, 2025</monk-text>
              <monk-text size="sm" color="accent">Read more →</monk-text>
            </monk-flex>
          </monk-stack>
        </monk-card>
      </monk-stack>

      <monk-stack spacing="4">
        <monk-heading level="h3">Dashboard Stat Cards</monk-heading>
        <monk-flex gap="4" wrap="wrap">
          <monk-card variant="filled" style="min-width: 200px; flex: 1;">
            <monk-stack spacing="2">
              <monk-text size="sm" color="secondary">Total Revenue</monk-text>
              <monk-text size="2xl" weight="bold">$45,231</monk-text>
              <monk-text size="sm" color="success">+20.1% from last month</monk-text>
            </monk-stack>
          </monk-card>

          <monk-card variant="filled" style="min-width: 200px; flex: 1;">
            <monk-stack spacing="2">
              <monk-text size="sm" color="secondary">Active Users</monk-text>
              <monk-text size="2xl" weight="bold">2,350</monk-text>
              <monk-text size="sm" color="success">+180 this week</monk-text>
            </monk-stack>
          </monk-card>

          <monk-card variant="filled" style="min-width: 200px; flex: 1;">
            <monk-stack spacing="2">
              <monk-text size="sm" color="secondary">Conversion Rate</monk-text>
              <monk-text size="2xl" weight="bold">3.2%</monk-text>
              <monk-text size="sm" color="error">-0.4% from last month</monk-text>
            </monk-stack>
          </monk-card>
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
    variant: 'elevated',
    interactive: false,
    padding: '6',
    radius: 'md',
    shadow: 'md',
    bg: undefined,
  },
  render: (args) => html`
    <monk-card
      variant=${args.variant}
      ?interactive=${args.interactive}
      padding=${args.padding}
      radius=${args.radius}
      shadow=${args.shadow || ''}
      bg=${args.bg || ''}
      style="max-width: 400px;"
      @card-click="${() => args.interactive && alert('Card clicked!')}"
    >
      <monk-stack spacing="3">
        <monk-heading level="h4">Card Title</monk-heading>
        <monk-text>
          This is a customizable card. Use the controls to adjust variant, padding, radius, shadow,
          and other properties.
        </monk-text>
        <monk-button variant="solid" size="sm">Action Button</monk-button>
      </monk-stack>
    </monk-card>
  `,
};
