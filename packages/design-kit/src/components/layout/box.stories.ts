import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './box.js';
import type { MonkBox } from './box.js';

const meta: Meta<MonkBox> = {
  title: 'Layout/Box',
  component: 'monk-box',
  tags: ['autodocs'],
  argTypes: {
    display: {
      control: 'select',
      options: ['block', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid'],
      description: 'Display mode',
      table: {
        defaultValue: { summary: 'block' },
      },
    },
    padding: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
      description: 'Padding (spacing scale)',
    },
    margin: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
      description: 'Margin (spacing scale)',
    },
    bg: {
      control: 'select',
      options: ['canvas', 'surface', 'surface-raised', 'subtle', 'muted', 'accent', 'accent-subtle'],
      description: 'Background color (semantic token)',
    },
    border: {
      control: 'text',
      description: 'Border width',
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Box shadow',
    },
  },
};

export default meta;
type Story = StoryObj<MonkBox>;

/**
 * Default Box with minimal styling
 */
export const Default: Story = {
  args: {
    display: 'block',
  },
  render: (args) => html`
    <monk-box
      display=${args.display}
      ?hidden=${args.hidden}
    >
      <p>This is a basic box container. It's the foundational layout primitive for the design system.</p>
    </monk-box>
  `,
};

/**
 * Card-style box with padding, background, radius, and shadow
 */
export const Card: Story = {
  args: {
    display: 'block',
    padding: '8',
    bg: 'surface',
    radius: 'lg',
    shadow: 'md',
    border: '1px',
  },
  render: (args) => html`
    <monk-box
      display=${args.display}
      padding=${args.padding}
      bg=${args.bg}
      radius=${args.radius}
      shadow=${args.shadow}
      border=${args.border}
    >
      <monk-heading level="h3">Card Title</monk-heading>
      <monk-text>This box looks like a card with elevation and rounded corners.</monk-text>
    </monk-box>
  `,
};

/**
 * Flex container for horizontal layout
 */
export const FlexRow: Story = {
  args: {
    display: 'flex',
    padding: '4',
    bg: 'subtle',
  },
  render: (args) => html`
    <monk-box display=${args.display} padding=${args.padding} bg=${args.bg}>
      <monk-box padding="4" bg="accent-subtle" radius="md" style="margin-right: 16px;">
        <monk-text weight="semibold">Item 1</monk-text>
      </monk-box>
      <monk-box padding="4" bg="accent-subtle" radius="md" style="margin-right: 16px;">
        <monk-text weight="semibold">Item 2</monk-text>
      </monk-box>
      <monk-box padding="4" bg="accent-subtle" radius="md">
        <monk-text weight="semibold">Item 3</monk-text>
      </monk-box>
    </monk-box>
  `,
};

/**
 * Grid container for structured layouts
 */
export const GridLayout: Story = {
  args: {
    display: 'grid',
    padding: '4',
    bg: 'subtle',
  },
  render: (args) => html`
    <monk-box
      display=${args.display}
      padding=${args.padding}
      bg=${args.bg}
      style="grid-template-columns: repeat(3, 1fr); gap: 16px;"
    >
      ${Array.from({ length: 6 }, (_, i) => html`
        <monk-box padding="6" bg="surface" radius="md" shadow="sm" border="1px">
          <monk-text weight="semibold">Grid Item ${i + 1}</monk-text>
          <monk-text size="sm" color="secondary">Content goes here</monk-text>
        </monk-box>
      `)}
    </monk-box>
  `,
};

/**
 * Nested boxes for complex layouts
 */
export const NestedLayout: Story = {
  args: {
    display: 'block',
  },
  render: () => html`
    <monk-box bg="canvas" padding="6">
      <!-- Header -->
      <monk-box bg="accent" padding="4" radius="md" margin="4">
        <monk-heading level="h2" color="primary">Header Section</monk-heading>
      </monk-box>

      <!-- Content Area -->
      <monk-box display="flex" padding="4" style="gap: 16px;">
        <!-- Sidebar -->
        <monk-box bg="surface" padding="4" radius="md" shadow="sm" style="flex: 0 0 200px;">
          <monk-text weight="semibold">Sidebar</monk-text>
          <monk-text size="sm" color="secondary">Navigation items</monk-text>
        </monk-box>

        <!-- Main Content -->
        <monk-box bg="surface" padding="6" radius="md" shadow="md" border="1px" style="flex: 1;">
          <monk-heading level="h3">Main Content</monk-heading>
          <monk-text>This demonstrates how boxes can be nested to create complex layouts with different styling.</monk-text>
        </monk-box>
      </monk-box>
    </monk-box>
  `,
};

/**
 * All spacing options
 */
export const SpacingScale: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'].map(
        (spacing) => html`
          <monk-box display="flex" style="align-items: center; gap: 16px;">
            <monk-text style="width: 100px;" weight="semibold">padding="${spacing}"</monk-text>
            <monk-box padding=${spacing} bg="accent-subtle" border="1px">
              <monk-text>Content</monk-text>
            </monk-box>
          </monk-box>
        `
      )}
    </div>
  `,
};

/**
 * All shadow options
 */
export const ShadowScale: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 24px;">
      ${['none', 'sm', 'md', 'lg', 'xl', '2xl'].map(
        (shadow) => html`
          <monk-box padding="8" bg="surface" shadow=${shadow} radius="md">
            <monk-text weight="semibold" align="center">shadow="${shadow}"</monk-text>
            <monk-text size="sm" color="secondary" align="center">Elevation level</monk-text>
          </monk-box>
        `
      )}
    </div>
  `,
};

/**
 * All radius options
 */
export const RadiusScale: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      ${['sm', 'md', 'lg', 'xl', 'full'].map(
        (radius) => html`
          <monk-box padding="8" bg="accent-subtle" radius=${radius} border="1px">
            <monk-text weight="semibold" align="center">radius="${radius}"</monk-text>
          </monk-box>
        `
      )}
    </div>
  `,
};

/**
 * All background color options
 */
export const BackgroundColors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${['canvas', 'surface', 'surface-raised', 'subtle', 'muted', 'accent', 'accent-subtle'].map(
        (bg) => html`
          <monk-box padding="4" bg=${bg} border="1px" radius="md">
            <monk-text weight="semibold">bg="${bg}"</monk-text>
            <monk-text size="sm" color="secondary">Background color semantic token</monk-text>
          </monk-box>
        `
      )}
    </div>
  `,
};

/**
 * Accessibility demonstration
 */
export const Accessibility: Story = {
  render: () => html`
    <monk-box padding="6" bg="canvas">
      <monk-heading level="h2">Accessible Box Examples</monk-heading>

      <!-- Navigation with ARIA -->
      <monk-box
        role="navigation"
        aria-label="Main navigation"
        padding="4"
        bg="surface"
        radius="md"
        margin="4"
      >
        <monk-text weight="semibold">Navigation Container</monk-text>
        <monk-text size="sm">Uses role="navigation" and aria-label</monk-text>
      </monk-box>

      <!-- Article with ARIA -->
      <monk-box
        role="article"
        aria-labelledby="article-title"
        padding="4"
        bg="surface"
        radius="md"
        shadow="sm"
      >
        <monk-heading id="article-title" level="h3">Article Title</monk-heading>
        <monk-text>Content maintains proper color contrast and respects theme preferences.</monk-text>
      </monk-box>
    </monk-box>
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
