import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './badge.js';
import '../layout/flex.js';
import '../layout/stack.js';
import '../layout/box.js';
import '../typography/heading.js';
import '../typography/text.js';
import '../button/button.js';
import type { MonkBadge } from './badge.js';

const meta: Meta<MonkBadge> = {
  title: 'Components/Badge',
  component: 'monk-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'neutral', 'success', 'error', 'warning', 'info'],
      description: 'Semantic color scheme',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<MonkBadge>;

/**
 * Default badge with primary color scheme and solid variant
 */
export const Default: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
  },
  render: (args) => html`
    <monk-badge variant=${args.variant} color-scheme=${args.colorScheme} size=${args.size}>
      Active
    </monk-badge>
  `,
};

/**
 * All badge variants in a row
 */
export const Variants: Story = {
  render: () => html`
    <monk-flex gap="4" wrap="wrap" align="center">
      <monk-badge variant="solid">Solid</monk-badge>
      <monk-badge variant="subtle">Subtle</monk-badge>
      <monk-badge variant="outline">Outline</monk-badge>
    </monk-flex>
  `,
};

/**
 * All color schemes with solid variant
 */
export const ColorSchemes: Story = {
  render: () => html`
    <monk-flex gap="4" wrap="wrap" align="center">
      <monk-badge color-scheme="primary">Primary</monk-badge>
      <monk-badge color-scheme="neutral">Neutral</monk-badge>
      <monk-badge color-scheme="success">Success</monk-badge>
      <monk-badge color-scheme="error">Error</monk-badge>
      <monk-badge color-scheme="warning">Warning</monk-badge>
      <monk-badge color-scheme="info">Info</monk-badge>
    </monk-flex>
  `,
};

/**
 * All sizes from sm to lg
 */
export const Sizes: Story = {
  render: () => html`
    <monk-flex gap="4" align="center" wrap="wrap">
      <monk-badge size="sm">Small</monk-badge>
      <monk-badge size="md">Medium</monk-badge>
      <monk-badge size="lg">Large</monk-badge>
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
          ${(['primary', 'neutral', 'success', 'error', 'warning', 'info'] as const).map(
            (color) => html`
              <monk-badge variant="solid" color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-badge>
            `
          )}
        </monk-flex>
      </monk-stack>

      <!-- Subtle -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Subtle</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          ${(['primary', 'neutral', 'success', 'error', 'warning', 'info'] as const).map(
            (color) => html`
              <monk-badge variant="subtle" color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-badge>
            `
          )}
        </monk-flex>
      </monk-stack>

      <!-- Outline -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Outline</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          ${(['primary', 'neutral', 'success', 'error', 'warning', 'info'] as const).map(
            (color) => html`
              <monk-badge variant="outline" color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-badge>
            `
          )}
        </monk-flex>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Status indicators - common use case
 */
export const StatusIndicators: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <!-- Active statuses -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Active Statuses</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          <monk-badge color-scheme="success">Active</monk-badge>
          <monk-badge color-scheme="success">Online</monk-badge>
          <monk-badge color-scheme="success">Available</monk-badge>
          <monk-badge color-scheme="success">Verified</monk-badge>
        </monk-flex>
      </monk-stack>

      <!-- Pending/In Progress statuses -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Pending Statuses</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          <monk-badge color-scheme="warning">Pending</monk-badge>
          <monk-badge color-scheme="warning">In Progress</monk-badge>
          <monk-badge color-scheme="warning">Reviewing</monk-badge>
          <monk-badge color-scheme="warning">Processing</monk-badge>
        </monk-flex>
      </monk-stack>

      <!-- Error/Inactive statuses -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Error Statuses</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          <monk-badge color-scheme="error">Failed</monk-badge>
          <monk-badge color-scheme="error">Offline</monk-badge>
          <monk-badge color-scheme="error">Rejected</monk-badge>
          <monk-badge color-scheme="error">Expired</monk-badge>
        </monk-flex>
      </monk-stack>

      <!-- Info statuses -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Info Statuses</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          <monk-badge color-scheme="info">Draft</monk-badge>
          <monk-badge color-scheme="info">Beta</monk-badge>
          <monk-badge color-scheme="info">Preview</monk-badge>
          <monk-badge color-scheme="info">New</monk-badge>
        </monk-flex>
      </monk-stack>

      <!-- Neutral statuses -->
      <monk-stack spacing="3">
        <monk-heading level="h4">Neutral Statuses</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          <monk-badge color-scheme="neutral">Inactive</monk-badge>
          <monk-badge color-scheme="neutral">Archived</monk-badge>
          <monk-badge color-scheme="neutral">Paused</monk-badge>
          <monk-badge color-scheme="neutral">Disabled</monk-badge>
        </monk-flex>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Notification counts - common pattern
 */
export const NotificationCounts: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-stack spacing="3">
        <monk-heading level="h4">With Buttons</monk-heading>
        <monk-flex gap="3" wrap="wrap">
          <monk-button>
            Inbox
            <monk-badge color-scheme="error" size="sm">12</monk-badge>
          </monk-button>
          <monk-button variant="outline">
            Messages
            <monk-badge color-scheme="primary" size="sm">3</monk-badge>
          </monk-button>
          <monk-button variant="ghost">
            Notifications
            <monk-badge color-scheme="warning" size="sm">5</monk-badge>
          </monk-button>
        </monk-flex>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">With Text</monk-heading>
        <monk-flex gap="4" wrap="wrap" direction="column" align="start">
          <monk-flex gap="2" align="center">
            <monk-text>Unread messages</monk-text>
            <monk-badge color-scheme="error">24</monk-badge>
          </monk-flex>
          <monk-flex gap="2" align="center">
            <monk-text>Active users</monk-text>
            <monk-badge color-scheme="success">1,234</monk-badge>
          </monk-flex>
          <monk-flex gap="2" align="center">
            <monk-text>Pending reviews</monk-text>
            <monk-badge color-scheme="warning">7</monk-badge>
          </monk-flex>
        </monk-flex>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Category tags - subtle variant
 */
export const CategoryTags: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-stack spacing="3">
        <monk-heading level="h4">Technology Tags</monk-heading>
        <monk-flex gap="2" wrap="wrap">
          <monk-badge variant="subtle" color-scheme="primary" size="sm">TypeScript</monk-badge>
          <monk-badge variant="subtle" color-scheme="primary" size="sm">React</monk-badge>
          <monk-badge variant="subtle" color-scheme="primary" size="sm">Node.js</monk-badge>
          <monk-badge variant="subtle" color-scheme="primary" size="sm">CSS</monk-badge>
          <monk-badge variant="subtle" color-scheme="primary" size="sm">HTML</monk-badge>
        </monk-flex>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Priority Tags</monk-heading>
        <monk-flex gap="2" wrap="wrap">
          <monk-badge variant="subtle" color-scheme="error" size="sm">High Priority</monk-badge>
          <monk-badge variant="subtle" color-scheme="warning" size="sm">Medium Priority</monk-badge>
          <monk-badge variant="subtle" color-scheme="neutral" size="sm">Low Priority</monk-badge>
        </monk-flex>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Role indicators - outline variant
 */
export const RoleIndicators: Story = {
  render: () => html`
    <monk-stack spacing="3">
      <monk-heading level="h4">User Roles</monk-heading>
      <monk-flex gap="3" wrap="wrap">
        <monk-badge variant="outline" color-scheme="primary">Admin</monk-badge>
        <monk-badge variant="outline" color-scheme="success">Moderator</monk-badge>
        <monk-badge variant="outline" color-scheme="info">Member</monk-badge>
        <monk-badge variant="outline" color-scheme="neutral">Guest</monk-badge>
      </monk-flex>
    </monk-stack>
  `,
};

/**
 * Composition with other components
 */
export const Composition: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <!-- With headings -->
      <monk-stack spacing="3">
        <monk-heading level="h4">With Headings</monk-heading>
        <monk-flex gap="3" direction="column" align="start">
          <monk-flex gap="2" align="center">
            <monk-heading level="h3">Documentation</monk-heading>
            <monk-badge color-scheme="success" size="sm">Complete</monk-badge>
          </monk-flex>
          <monk-flex gap="2" align="center">
            <monk-heading level="h3">API Reference</monk-heading>
            <monk-badge color-scheme="info" size="sm">Beta</monk-badge>
          </monk-flex>
          <monk-flex gap="2" align="center">
            <monk-heading level="h3">Testing Guide</monk-heading>
            <monk-badge color-scheme="warning" size="sm">In Progress</monk-badge>
          </monk-flex>
        </monk-flex>
      </monk-stack>

      <!-- In cards -->
      <monk-stack spacing="3">
        <monk-heading level="h4">In Cards</monk-heading>
        <monk-stack spacing="3">
          <monk-box padding="4" bg="surface" radius="md" shadow="sm" border="1px">
            <monk-flex justify="between" align="center">
              <monk-stack spacing="1">
                <monk-text weight="semibold">Project Alpha</monk-text>
                <monk-text size="sm" color="secondary">Last updated 2 hours ago</monk-text>
              </monk-stack>
              <monk-badge color-scheme="success">Active</monk-badge>
            </monk-flex>
          </monk-box>

          <monk-box padding="4" bg="surface" radius="md" shadow="sm" border="1px">
            <monk-flex justify="between" align="center">
              <monk-stack spacing="1">
                <monk-text weight="semibold">Project Beta</monk-text>
                <monk-text size="sm" color="secondary">Last updated 1 day ago</monk-text>
              </monk-stack>
              <monk-badge color-scheme="warning">Pending</monk-badge>
            </monk-flex>
          </monk-box>

          <monk-box padding="4" bg="surface" radius="md" shadow="sm" border="1px">
            <monk-flex justify="between" align="center">
              <monk-stack spacing="1">
                <monk-text weight="semibold">Project Gamma</monk-text>
                <monk-text size="sm" color="secondary">Last updated 1 week ago</monk-text>
              </monk-stack>
              <monk-badge color-scheme="neutral">Archived</monk-badge>
            </monk-flex>
          </monk-box>
        </monk-stack>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Custom colors - use bg, color, and border-color props for unlimited color flexibility
 */
export const CustomColors: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-stack spacing="3">
        <monk-heading level="h4">Custom Solid Colors (Using Props)</monk-heading>
        <monk-text color="secondary">
          Override badge colors using bg and color props - works just like React!
        </monk-text>
        <monk-flex gap="3" wrap="wrap">
          <monk-badge bg="#ff6b6b" color="white">Red</monk-badge>
          <monk-badge bg="#ffd93d" color="#333">Gold</monk-badge>
          <monk-badge bg="#6bcf7f" color="white">Green</monk-badge>
          <monk-badge bg="#4d96ff" color="white">Blue</monk-badge>
          <monk-badge bg="#a855f7" color="white">Purple</monk-badge>
          <monk-badge bg="#ff9770" color="white">Orange</monk-badge>
          <monk-badge bg="#ec4899" color="white">Pink</monk-badge>
          <monk-badge bg="#14b8a6" color="white">Teal</monk-badge>
        </monk-flex>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Custom Outline Colors (Using Props)</monk-heading>
        <monk-text color="secondary">
          Override outline badge colors using border-color and color props
        </monk-text>
        <monk-flex gap="3" wrap="wrap">
          <monk-badge variant="outline" border-color="#ff6b6b" color="#ff6b6b">Red</monk-badge>
          <monk-badge variant="outline" border-color="#ffd93d" color="#d4a300">Gold</monk-badge>
          <monk-badge variant="outline" border-color="#6bcf7f" color="#6bcf7f">Green</monk-badge>
          <monk-badge variant="outline" border-color="#4d96ff" color="#4d96ff">Blue</monk-badge>
          <monk-badge variant="outline" border-color="#a855f7" color="#a855f7">Purple</monk-badge>
          <monk-badge variant="outline" border-color="#ff9770" color="#ff9770">Orange</monk-badge>
        </monk-flex>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Custom Subtle Colors (Using Props)</monk-heading>
        <monk-text color="secondary">
          Create subtle variants with custom background and text colors
        </monk-text>
        <monk-flex gap="3" wrap="wrap">
          <monk-badge variant="subtle" bg="#ffe5e5" color="#d32f2f">Light Red</monk-badge>
          <monk-badge variant="subtle" bg="#fff4e5" color="#e65100">Light Orange</monk-badge>
          <monk-badge variant="subtle" bg="#e5ffe5" color="#2e7d32">Light Green</monk-badge>
          <monk-badge variant="subtle" bg="#e5f3ff" color="#1565c0">Light Blue</monk-badge>
          <monk-badge variant="subtle" bg="#f3e5ff" color="#6a1b9a">Light Purple</monk-badge>
        </monk-flex>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Brand Colors (Using Props)</monk-heading>
        <monk-text color="secondary">
          Use your brand colors for custom badge schemes - no CSS required!
        </monk-text>
        <monk-flex gap="3" wrap="wrap">
          <monk-badge bg="#1da1f2" color="white">Twitter</monk-badge>
          <monk-badge bg="#0077b5" color="white">LinkedIn</monk-badge>
          <monk-badge bg="#6e5494" color="white">GitHub</monk-badge>
          <monk-badge bg="#ff0000" color="white">YouTube</monk-badge>
          <monk-badge bg="#25d366" color="white">WhatsApp</monk-badge>
        </monk-flex>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Using CSS Classes (Alternative Approach)</monk-heading>
        <monk-text color="secondary">
          You can also apply custom colors via CSS classes for reusable color schemes
        </monk-text>
        <style>
          .badge-coral {
            --badge-bg: #ff7f50;
            --badge-color: white;
          }
          .badge-mint {
            --badge-bg: #98ff98;
            --badge-color: #2d5016;
          }
          .badge-lavender {
            --badge-bg: #e6e6fa;
            --badge-color: #6b46c1;
          }
        </style>
        <monk-flex gap="3" wrap="wrap">
          <monk-badge class="badge-coral">Coral</monk-badge>
          <monk-badge class="badge-mint">Mint</monk-badge>
          <monk-badge class="badge-lavender">Lavender</monk-badge>
        </monk-flex>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Accessibility demonstration
 */
export const Accessibility: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-stack spacing="3">
        <monk-heading level="h4">Color Contrast (WCAG AA compliant)</monk-heading>
        <monk-text color="secondary">
          All badge color combinations meet WCAG AA contrast requirements
        </monk-text>
        <monk-flex gap="3" wrap="wrap">
          ${(['primary', 'neutral', 'success', 'error', 'warning', 'info'] as const).map(
            (color) => html`
              <monk-badge color-scheme=${color}>
                ${color.charAt(0).toUpperCase() + color.slice(1)}
              </monk-badge>
            `
          )}
        </monk-flex>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-heading level="h4">Semantic Meaning</monk-heading>
        <monk-text color="secondary">
          Badges convey status through both color and text for accessibility
        </monk-text>
        <monk-flex gap="3" wrap="wrap">
          <monk-badge color-scheme="success">✓ Verified</monk-badge>
          <monk-badge color-scheme="error">✗ Failed</monk-badge>
          <monk-badge color-scheme="warning">⚠ Warning</monk-badge>
          <monk-badge color-scheme="info">ℹ Info</monk-badge>
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
