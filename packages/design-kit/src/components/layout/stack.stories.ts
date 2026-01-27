import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './stack.js';
import './box.js';
import '../typography/heading.js';
import '../typography/text.js';
import type { MonkStack } from './stack.js';

const meta: Meta<MonkStack> = {
  title: 'Layout/Stack',
  component: 'monk-stack',
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Direction of stack',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    spacing: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
      description: 'Spacing between children (uses space scale)',
      table: {
        defaultValue: { summary: '4' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Alignment of children on cross axis',
      table: {
        defaultValue: { summary: 'stretch' },
      },
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Justify children on main axis',
      table: {
        defaultValue: { summary: 'start' },
      },
    },
    wrap: {
      control: 'boolean',
      description: 'Whether to wrap children',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    direction: 'vertical',
    spacing: '4',
    align: 'stretch',
    justify: 'start',
    wrap: false,
  },
};

export default meta;
type Story = StoryObj<MonkStack>;

/**
 * Default vertical stack with medium spacing
 */
export const Default: Story = {
  render: (args) => html`
    <monk-stack
      direction=${args.direction}
      spacing=${args.spacing}
      align=${args.align}
      justify=${args.justify}
      ?wrap=${args.wrap}
    >
      <monk-box padding="4" bg="accent-subtle" radius="md">Item 1</monk-box>
      <monk-box padding="4" bg="accent-subtle" radius="md">Item 2</monk-box>
      <monk-box padding="4" bg="accent-subtle" radius="md">Item 3</monk-box>
    </monk-stack>
  `,
};

/**
 * Vertical stack with different spacing values
 */
export const VerticalSpacing: Story = {
  render: () => html`
    <monk-box display="grid" style="grid-template-columns: repeat(3, 1fr); gap: 24px;">
      <!-- Small spacing -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">spacing="2"</monk-text>
        <monk-stack spacing="2">
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 1</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 2</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 3</monk-box>
        </monk-stack>
      </div>

      <!-- Medium spacing -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">spacing="4"</monk-text>
        <monk-stack spacing="4">
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 1</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 2</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 3</monk-box>
        </monk-stack>
      </div>

      <!-- Large spacing -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">spacing="8"</monk-text>
        <monk-stack spacing="8">
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 1</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 2</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 3</monk-box>
        </monk-stack>
      </div>
    </monk-box>
  `,
};

/**
 * Horizontal stack with spacing
 */
export const HorizontalStack: Story = {
  render: () => html`
    <monk-stack direction="horizontal" spacing="4">
      <monk-box padding="6" bg="accent-subtle" radius="md">
        <monk-text weight="semibold">Item 1</monk-text>
      </monk-box>
      <monk-box padding="6" bg="accent-subtle" radius="md">
        <monk-text weight="semibold">Item 2</monk-text>
      </monk-box>
      <monk-box padding="6" bg="accent-subtle" radius="md">
        <monk-text weight="semibold">Item 3</monk-text>
      </monk-box>
    </monk-stack>
  `,
};

/**
 * Alignment examples for vertical stack
 */
export const VerticalAlignment: Story = {
  render: () => html`
    <monk-box display="grid" style="grid-template-columns: repeat(2, 1fr); gap: 24px;">
      <!-- Align start -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">align="start"</monk-text>
        <monk-stack spacing="3" align="start" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="3" bg="accent-subtle" radius="sm" style="width: 120px;">Item 1</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm" style="width: 80px;">Item 2</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm" style="width: 150px;">Item 3</monk-box>
        </monk-stack>
      </div>

      <!-- Align center -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">align="center"</monk-text>
        <monk-stack spacing="3" align="center" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="3" bg="accent-subtle" radius="sm" style="width: 120px;">Item 1</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm" style="width: 80px;">Item 2</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm" style="width: 150px;">Item 3</monk-box>
        </monk-stack>
      </div>

      <!-- Align end -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">align="end"</monk-text>
        <monk-stack spacing="3" align="end" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="3" bg="accent-subtle" radius="sm" style="width: 120px;">Item 1</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm" style="width: 80px;">Item 2</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm" style="width: 150px;">Item 3</monk-box>
        </monk-stack>
      </div>

      <!-- Align stretch -->
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 12px; display: block;">align="stretch"</monk-text>
        <monk-stack spacing="3" align="stretch" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 1</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 2</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 3</monk-box>
        </monk-stack>
      </div>
    </monk-box>
  `,
};

/**
 * Justify examples for horizontal stack
 */
export const HorizontalJustify: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 8px; display: block;">justify="start"</monk-text>
        <monk-stack direction="horizontal" spacing="3" justify="start" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 1</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 2</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 3</monk-box>
        </monk-stack>
      </div>

      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 8px; display: block;">justify="center"</monk-text>
        <monk-stack direction="horizontal" spacing="3" justify="center" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 1</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 2</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 3</monk-box>
        </monk-stack>
      </div>

      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 8px; display: block;">justify="end"</monk-text>
        <monk-stack direction="horizontal" spacing="3" justify="end" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 1</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 2</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 3</monk-box>
        </monk-stack>
      </div>

      <div>
        <monk-text size="sm" weight="semibold" style="margin-bottom: 8px; display: block;">justify="between"</monk-text>
        <monk-stack direction="horizontal" spacing="3" justify="between" style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 1</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 2</monk-box>
          <monk-box padding="3" bg="accent-subtle" radius="sm">Item 3</monk-box>
        </monk-stack>
      </div>
    </monk-stack>
  `,
};

/**
 * Form layout with vertical stack
 */
export const FormLayout: Story = {
  render: () => html`
    <monk-box padding="8" bg="surface" radius="lg" shadow="md" border="1px" style="max-width: 400px;">
      <monk-heading level="h3" style="margin-bottom: 16px;">Contact Form</monk-heading>
      <monk-stack spacing="5">
        <monk-stack spacing="2">
          <monk-text size="sm" weight="semibold">Name</monk-text>
          <monk-box padding="3" bg="canvas" border="1px" radius="md">
            <monk-text size="sm" color="tertiary">Enter your name</monk-text>
          </monk-box>
        </monk-stack>

        <monk-stack spacing="2">
          <monk-text size="sm" weight="semibold">Email</monk-text>
          <monk-box padding="3" bg="canvas" border="1px" radius="md">
            <monk-text size="sm" color="tertiary">Enter your email</monk-text>
          </monk-box>
        </monk-stack>

        <monk-stack spacing="2">
          <monk-text size="sm" weight="semibold">Message</monk-text>
          <monk-box padding="3" bg="canvas" border="1px" radius="md" style="min-height: 100px;">
            <monk-text size="sm" color="tertiary">Enter your message</monk-text>
          </monk-box>
        </monk-stack>

        <monk-box padding="3" bg="accent" radius="md" style="text-align: center; cursor: pointer;">
          <monk-text weight="semibold">Submit</monk-text>
        </monk-box>
      </monk-stack>
    </monk-box>
  `,
};

/**
 * Card list with vertical stack
 */
export const CardList: Story = {
  render: () => html`
    <monk-stack spacing="4" style="max-width: 600px;">
      ${Array.from({ length: 5 }, (_, i) => html`
        <monk-box padding="6" bg="surface" radius="md" shadow="sm" border="1px">
          <monk-stack spacing="2">
            <monk-heading level="h4">Article Title ${i + 1}</monk-heading>
            <monk-text size="sm" color="secondary">
              This is a preview of the article content. Stack makes it easy to create consistent spacing between elements.
            </monk-text>
            <monk-text size="xs" color="tertiary" style="margin-top: 8px;">
              Published on January ${i + 20}, 2026
            </monk-text>
          </monk-stack>
        </monk-box>
      `)}
    </monk-stack>
  `,
};

/**
 * Button group with horizontal stack
 */
export const ButtonGroup: Story = {
  render: () => html`
    <monk-box padding="6" bg="surface" radius="lg" border="1px">
      <monk-heading level="h4" style="margin-bottom: 16px;">Actions</monk-heading>
      <monk-stack direction="horizontal" spacing="3">
        <monk-box padding="3" bg="accent" radius="md" style="cursor: pointer;">
          <monk-text weight="semibold">Save</monk-text>
        </monk-box>
        <monk-box padding="3" bg="surface-raised" radius="md" border="1px" style="cursor: pointer;">
          <monk-text weight="semibold">Cancel</monk-text>
        </monk-box>
        <monk-box padding="3" bg="surface-raised" radius="md" border="1px" style="cursor: pointer;">
          <monk-text weight="semibold" color="error">Delete</monk-text>
        </monk-box>
      </monk-stack>
    </monk-box>
  `,
};

/**
 * Wrapping horizontal stack
 */
export const WrappingStack: Story = {
  render: () => html`
    <monk-box padding="6" bg="surface" radius="lg" border="1px">
      <monk-heading level="h4" style="margin-bottom: 16px;">Tags (wrapping enabled)</monk-heading>
      <monk-stack direction="horizontal" spacing="2" wrap>
        ${['JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Svelte', 'Node.js', 'Deno', 'Bun', 'Web Components', 'Lit', 'Stencil'].map(
          (tag) => html`
            <monk-box padding="2" bg="accent-subtle" radius="sm" style="white-space: nowrap;">
              <monk-text size="sm">${tag}</monk-text>
            </monk-box>
          `
        )}
      </monk-stack>
    </monk-box>
  `,
};

/**
 * Nested stacks for complex layouts
 */
export const NestedStacks: Story = {
  render: () => html`
    <monk-box padding="8" bg="surface" radius="lg" shadow="md" border="1px" style="max-width: 600px;">
      <monk-stack spacing="6">
        <!-- Header with horizontal stack -->
        <monk-stack direction="horizontal" justify="between" align="center">
          <monk-heading level="h3">Dashboard</monk-heading>
          <monk-box padding="2" bg="accent-subtle" radius="sm">
            <monk-text size="sm" weight="semibold">Pro</monk-text>
          </monk-box>
        </monk-stack>

        <!-- Stats grid with vertical stacks inside -->
        <monk-box display="grid" style="grid-template-columns: repeat(3, 1fr); gap: 16px;">
          ${[
            { label: 'Users', value: '1,234' },
            { label: 'Revenue', value: '$45.6K' },
            { label: 'Growth', value: '+12%' },
          ].map(
            (stat) => html`
              <monk-box padding="4" bg="accent-subtle" radius="md">
                <monk-stack spacing="1" align="center">
                  <monk-text size="xl" weight="bold">${stat.value}</monk-text>
                  <monk-text size="sm" color="secondary">${stat.label}</monk-text>
                </monk-stack>
              </monk-box>
            `
          )}
        </monk-box>

        <!-- Recent activity with vertical stack -->
        <monk-stack spacing="3">
          <monk-heading level="h4">Recent Activity</monk-heading>
          ${Array.from({ length: 3 }, (_, i) => html`
            <monk-box padding="3" bg="canvas" radius="sm">
              <monk-stack spacing="1">
                <monk-text size="sm" weight="semibold">Activity ${i + 1}</monk-text>
                <monk-text size="xs" color="tertiary">${i + 5} minutes ago</monk-text>
              </monk-stack>
            </monk-box>
          `)}
        </monk-stack>
      </monk-stack>
    </monk-box>
  `,
};

/**
 * Accessibility demonstration
 */
export const Accessibility: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 600px;">
      <monk-heading level="h2">Accessible Stack Examples</monk-heading>

      <!-- Navigation with ARIA -->
      <monk-stack
        role="navigation"
        aria-label="Main navigation"
        direction="horizontal"
        spacing="4"
      >
        <monk-text weight="semibold">Home</monk-text>
        <monk-text weight="semibold">About</monk-text>
        <monk-text weight="semibold">Services</monk-text>
        <monk-text weight="semibold">Contact</monk-text>
      </monk-stack>

      <!-- List with ARIA -->
      <monk-stack role="list" spacing="3">
        <monk-box role="listitem" padding="4" bg="surface" radius="md" border="1px">
          <monk-text>List item 1 - Stack maintains semantic HTML structure</monk-text>
        </monk-box>
        <monk-box role="listitem" padding="4" bg="surface" radius="md" border="1px">
          <monk-text>List item 2 - Spacing is consistent and predictable</monk-text>
        </monk-box>
        <monk-box role="listitem" padding="4" bg="surface" radius="md" border="1px">
          <monk-text>List item 3 - Works well with screen readers</monk-text>
        </monk-box>
      </monk-stack>

      <monk-text size="sm" color="secondary">
        Open the Accessibility panel below to verify WCAG compliance.
      </monk-text>
    </monk-stack>
  `,
};
