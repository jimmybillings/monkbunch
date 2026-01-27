import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flex.js';
import './box.js';
import '../typography/heading.js';
import '../typography/text.js';
import type { MonkFlex } from './flex.js';

const meta: Meta<MonkFlex> = {
  title: 'Layout/Flex',
  component: 'monk-flex',
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'Flex direction',
      table: {
        defaultValue: { summary: 'row' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Align items on cross axis',
      table: {
        defaultValue: { summary: 'stretch' },
      },
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Justify content on main axis',
      table: {
        defaultValue: { summary: 'start' },
      },
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Flex wrap behavior',
      table: {
        defaultValue: { summary: 'nowrap' },
      },
    },
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
      description: 'Gap between flex items (uses space scale)',
    },
    inline: {
      control: 'boolean',
      description: 'Whether flex container should be inline-flex',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    wrap: 'nowrap',
    inline: false,
  },
};

export default meta;
type Story = StoryObj<MonkFlex>;

/**
 * Default flex row with items
 */
export const Default: Story = {
  render: (args) => html`
    <monk-flex
      direction=${args.direction}
      align=${args.align}
      justify=${args.justify}
      wrap=${args.wrap}
      gap=${args.gap || ''}
      ?inline=${args.inline}
    >
      <monk-box padding="6" bg="accent-subtle" radius="md">
        <monk-text weight="semibold">Item 1</monk-text>
      </monk-box>
      <monk-box padding="6" bg="accent-subtle" radius="md">
        <monk-text weight="semibold">Item 2</monk-text>
      </monk-box>
      <monk-box padding="6" bg="accent-subtle" radius="md">
        <monk-text weight="semibold">Item 3</monk-text>
      </monk-box>
    </monk-flex>
  `,
};

/**
 * Common flex patterns
 */
export const CommonPatterns: Story = {
  render: () => html`
    <monk-box display="flex" style="flex-direction: column; gap: 32px;">
      <!-- Centered content -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">Centered (justify="center" align="center")</monk-text>
        <monk-flex justify="center" align="center" style="background: #f5f5f5; padding: 32px; border-radius: 8px; min-height: 150px;">
          <monk-box padding="6" bg="accent" radius="md">
            <monk-text weight="semibold">Centered Content</monk-text>
          </monk-box>
        </monk-flex>
      </div>

      <!-- Space between -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">Space Between (justify="between" align="center")</monk-text>
        <monk-flex justify="between" align="center" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="4" bg="accent-subtle" radius="md">Left</monk-box>
          <monk-box padding="4" bg="accent-subtle" radius="md">Center</monk-box>
          <monk-box padding="4" bg="accent-subtle" radius="md">Right</monk-box>
        </monk-flex>
      </div>

      <!-- End aligned -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">End Aligned (justify="end" align="center")</monk-text>
        <monk-flex justify="end" align="center" gap="3" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="4" bg="accent-subtle" radius="md">Item 1</monk-box>
          <monk-box padding="4" bg="accent-subtle" radius="md">Item 2</monk-box>
        </monk-flex>
      </div>
    </monk-box>
  `,
};

/**
 * Flex directions
 */
export const Directions: Story = {
  render: () => html`
    <monk-box display="grid" style="grid-template-columns: repeat(2, 1fr); gap: 24px;">
      <!-- Row -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">direction="row"</monk-text>
        <monk-flex direction="row" gap="3" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="4" bg="accent-subtle" radius="md">1</monk-box>
          <monk-box padding="4" bg="accent-subtle" radius="md">2</monk-box>
          <monk-box padding="4" bg="accent-subtle" radius="md">3</monk-box>
        </monk-flex>
      </div>

      <!-- Row Reverse -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">direction="row-reverse"</monk-text>
        <monk-flex direction="row-reverse" gap="3" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="4" bg="accent-subtle" radius="md">1</monk-box>
          <monk-box padding="4" bg="accent-subtle" radius="md">2</monk-box>
          <monk-box padding="4" bg="accent-subtle" radius="md">3</monk-box>
        </monk-flex>
      </div>

      <!-- Column -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">direction="column"</monk-text>
        <monk-flex direction="column" gap="3" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="4" bg="accent-subtle" radius="md">1</monk-box>
          <monk-box padding="4" bg="accent-subtle" radius="md">2</monk-box>
          <monk-box padding="4" bg="accent-subtle" radius="md">3</monk-box>
        </monk-flex>
      </div>

      <!-- Column Reverse -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">direction="column-reverse"</monk-text>
        <monk-flex direction="column-reverse" gap="3" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="4" bg="accent-subtle" radius="md">1</monk-box>
          <monk-box padding="4" bg="accent-subtle" radius="md">2</monk-box>
          <monk-box padding="4" bg="accent-subtle" radius="md">3</monk-box>
        </monk-flex>
      </div>
    </monk-box>
  `,
};

/**
 * Alignment options
 */
export const Alignment: Story = {
  render: () => html`
    <monk-box display="flex" style="flex-direction: column; gap: 24px;">
      ${['start', 'center', 'end', 'stretch', 'baseline'].map(
        (align) => html`
          <div>
            <monk-text size="sm" weight="semibold" style="margin-bottom: 8px; display: block;">align="${align}"</monk-text>
            <monk-flex align=${align} gap="3" style="background: #f5f5f5; padding: 16px; border-radius: 8px; min-height: 120px;">
              <monk-box padding="4" bg="accent-subtle" radius="md" style="height: 60px;">60px</monk-box>
              <monk-box padding="4" bg="accent-subtle" radius="md" style="height: 80px;">80px</monk-box>
              <monk-box padding="4" bg="accent-subtle" radius="md" style="height: 100px;">100px</monk-box>
            </monk-flex>
          </div>
        `
      )}
    </monk-box>
  `,
};

/**
 * Justify options
 */
export const Justify: Story = {
  render: () => html`
    <monk-box display="flex" style="flex-direction: column; gap: 24px;">
      ${['start', 'center', 'end', 'between', 'around', 'evenly'].map(
        (justify) => html`
          <div>
            <monk-text size="sm" weight="semibold" style="margin-bottom: 8px; display: block;">justify="${justify}"</monk-text>
            <monk-flex justify=${justify} gap="3" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
              <monk-box padding="4" bg="accent-subtle" radius="md">Item 1</monk-box>
              <monk-box padding="4" bg="accent-subtle" radius="md">Item 2</monk-box>
              <monk-box padding="4" bg="accent-subtle" radius="md">Item 3</monk-box>
            </monk-flex>
          </div>
        `
      )}
    </monk-box>
  `,
};

/**
 * Wrapping behavior
 */
export const Wrapping: Story = {
  render: () => html`
    <monk-box display="flex" style="flex-direction: column; gap: 24px;">
      <!-- No wrap -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 8px; display: block;">wrap="nowrap" (default)</monk-text>
        <monk-flex wrap="nowrap" gap="3" style="background: #f5f5f5; padding: 16px; border-radius: 8px; max-width: 400px;">
          ${Array.from({ length: 8 }, (_, i) => html`
            <monk-box padding="4" bg="accent-subtle" radius="md" style="min-width: 80px;">
              <monk-text size="sm">Item ${i + 1}</monk-text>
            </monk-box>
          `)}
        </monk-flex>
      </div>

      <!-- Wrap -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 8px; display: block;">wrap="wrap"</monk-text>
        <monk-flex wrap="wrap" gap="3" style="background: #f5f5f5; padding: 16px; border-radius: 8px; max-width: 400px;">
          ${Array.from({ length: 8 }, (_, i) => html`
            <monk-box padding="4" bg="accent-subtle" radius="md" style="min-width: 80px;">
              <monk-text size="sm">Item ${i + 1}</monk-text>
            </monk-box>
          `)}
        </monk-flex>
      </div>
    </monk-box>
  `,
};

/**
 * Header with flex
 */
export const Header: Story = {
  render: () => html`
    <monk-box padding="6" bg="surface" radius="lg" shadow="md" border="1px">
      <monk-flex justify="between" align="center">
        <monk-heading level="h3">Dashboard</monk-heading>
        <monk-flex gap="3">
          <monk-box padding="3" bg="accent" radius="md" style="cursor: pointer;">
            <monk-text size="sm" weight="semibold">New</monk-text>
          </monk-box>
          <monk-box padding="3" bg="surface-raised" radius="md" border="1px" style="cursor: pointer;">
            <monk-text size="sm" weight="semibold">Settings</monk-text>
          </monk-box>
        </monk-flex>
      </monk-flex>
    </monk-box>
  `,
};

/**
 * Card with flex layout
 */
export const Card: Story = {
  render: () => html`
    <monk-box padding="8" bg="surface" radius="lg" shadow="md" border="1px" style="max-width: 500px;">
      <monk-flex direction="column" gap="4">
        <!-- Header -->
        <monk-flex justify="between" align="start">
          <div>
            <monk-heading level="h3" style="margin-bottom: 4px;">Product Name</monk-heading>
            <monk-text size="sm" color="secondary">Premium Edition</monk-text>
          </div>
          <monk-box padding="2" bg="accent-subtle" radius="sm">
            <monk-text size="xs" weight="semibold">New</monk-text>
          </monk-box>
        </monk-flex>

        <!-- Content -->
        <monk-text color="secondary">
          This is a product description demonstrating how MonkFlex can be used to create flexible card layouts with proper spacing and alignment.
        </monk-text>

        <!-- Footer -->
        <monk-flex justify="between" align="center">
          <monk-text size="xl" weight="bold">$49.99</monk-text>
          <monk-flex gap="2">
            <monk-box padding="3" bg="surface-raised" radius="md" border="1px" style="cursor: pointer;">
              <monk-text size="sm" weight="semibold">Details</monk-text>
            </monk-box>
            <monk-box padding="3" bg="accent" radius="md" style="cursor: pointer;">
              <monk-text size="sm" weight="semibold">Add to Cart</monk-text>
            </monk-box>
          </monk-flex>
        </monk-flex>
      </monk-flex>
    </monk-box>
  `,
};

/**
 * Media object pattern
 */
export const MediaObject: Story = {
  render: () => html`
    <monk-box display="flex" style="flex-direction: column; gap: 16px; max-width: 600px;">
      ${Array.from({ length: 3 }, (_, i) => html`
        <monk-box padding="4" bg="surface" radius="md" border="1px">
          <monk-flex gap="4">
            <!-- Avatar/Image -->
            <monk-box
              padding="0"
              bg="accent-subtle"
              radius="full"
              style="width: 64px; height: 64px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;"
            >
              <monk-text weight="bold">U${i + 1}</monk-text>
            </monk-box>

            <!-- Content -->
            <monk-flex direction="column" gap="2" style="flex: 1;">
              <monk-heading level="h4">User Name ${i + 1}</monk-heading>
              <monk-text size="sm" color="secondary">
                This is a comment or message from the user. The media object pattern is perfect for lists of items with images or icons.
              </monk-text>
              <monk-text size="xs" color="tertiary">${i + 2} hours ago</monk-text>
            </monk-flex>
          </monk-flex>
        </monk-box>
      `)}
    </monk-box>
  `,
};

/**
 * Toolbar/Action bar
 */
export const Toolbar: Story = {
  render: () => html`
    <monk-box padding="4" bg="surface" radius="lg" border="1px">
      <monk-flex justify="between" align="center">
        <monk-flex gap="2">
          <monk-box padding="2" bg="accent-subtle" radius="sm" style="cursor: pointer;">
            <monk-text size="sm" weight="semibold">Bold</monk-text>
          </monk-box>
          <monk-box padding="2" bg="accent-subtle" radius="sm" style="cursor: pointer;">
            <monk-text size="sm" weight="semibold">Italic</monk-text>
          </monk-box>
          <monk-box padding="2" bg="accent-subtle" radius="sm" style="cursor: pointer;">
            <monk-text size="sm" weight="semibold">Underline</monk-text>
          </monk-box>
        </monk-flex>

        <monk-box padding="2" bg="accent" radius="sm" style="cursor: pointer;">
          <monk-text size="sm" weight="semibold">Save</monk-text>
        </monk-box>
      </monk-flex>
    </monk-box>
  `,
};

/**
 * Inline flex
 */
export const InlineFlex: Story = {
  render: () => html`
    <div>
      <monk-text>
        This is a paragraph with
        <monk-flex inline gap="1" align="center" style="margin: 0 4px;">
          <monk-box padding="1" bg="accent-subtle" radius="sm">
            <monk-text size="xs" weight="semibold">inline</monk-text>
          </monk-box>
          <monk-box padding="1" bg="accent-subtle" radius="sm">
            <monk-text size="xs" weight="semibold">flex</monk-text>
          </monk-box>
        </monk-flex>
        elements that flow with the text content.
      </monk-text>
    </div>
  `,
};

/**
 * Baseline alignment
 */
export const BaselineAlignment: Story = {
  render: () => html`
    <monk-box padding="6" bg="surface" radius="lg" border="1px">
      <monk-flex align="baseline" gap="3">
        <monk-text size="xs">Small</monk-text>
        <monk-text size="md">Medium</monk-text>
        <monk-text size="xl">Large</monk-text>
        <monk-text size="sm">Text with different sizes aligned to baseline</monk-text>
      </monk-flex>
    </monk-box>
  `,
};

/**
 * Accessibility demonstration
 */
export const Accessibility: Story = {
  render: () => html`
    <monk-flex direction="column" gap="6" style="max-width: 600px;">
      <monk-heading level="h2">Accessible Flex Examples</monk-heading>

      <!-- Navigation with ARIA -->
      <monk-flex
        role="navigation"
        aria-label="Main navigation"
        gap="4"
      >
        <monk-text weight="semibold">Home</monk-text>
        <monk-text weight="semibold">About</monk-text>
        <monk-text weight="semibold">Services</monk-text>
        <monk-text weight="semibold">Contact</monk-text>
      </monk-flex>

      <!-- Toolbar with ARIA -->
      <monk-flex
        role="toolbar"
        aria-label="Text formatting"
        gap="2"
      >
        <monk-box padding="2" bg="accent-subtle" radius="sm" role="button" aria-label="Bold">
          <monk-text size="sm" weight="bold">B</monk-text>
        </monk-box>
        <monk-box padding="2" bg="accent-subtle" radius="sm" role="button" aria-label="Italic">
          <monk-text size="sm" italic>I</monk-text>
        </monk-box>
        <monk-box padding="2" bg="accent-subtle" radius="sm" role="button" aria-label="Underline">
          <monk-text size="sm" style="text-decoration: underline;">U</monk-text>
        </monk-box>
      </monk-flex>

      <monk-text size="sm" color="secondary">
        Open the Accessibility panel below to verify WCAG compliance.
      </monk-text>
    </monk-flex>
  `,
};
