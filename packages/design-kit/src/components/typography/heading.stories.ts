import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './heading.js';
import '../layout/box.js';
import type { MonkHeading } from './heading.js';

const meta: Meta<MonkHeading> = {
  title: 'Typography/Heading',
  component: 'monk-heading',
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The semantic heading level to render (h1-h6)',
      table: {
        defaultValue: { summary: 'h2' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Heading color variant (semantic)',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    transform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Text transformation',
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    italic: {
      control: 'boolean',
      description: 'Whether text should be italic',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    nowrap: {
      control: 'boolean',
      description: 'Whether text should wrap',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    truncate: {
      control: 'boolean',
      description: 'Whether to truncate text with ellipsis',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    lineClamp: {
      control: 'number',
      description: 'Number of lines to clamp (for multi-line truncation)',
      if: { arg: 'truncate', truthy: true },
    },
  },
  args: {
    level: 'h2',
    color: 'primary',
    align: 'left',
    transform: 'none',
    italic: false,
    nowrap: false,
    truncate: false,
  },
};

export default meta;
type Story = StoryObj<MonkHeading>;

export const Default: Story = {
  render: (args) => html`
    <monk-heading
      level=${args.level}
      color=${args.color}
      align=${args.align}
      transform=${args.transform}
      ?italic=${args.italic}
      ?nowrap=${args.nowrap}
      ?truncate=${args.truncate}
      line-clamp=${args.lineClamp || ''}
    >
      The Quick Brown Fox Jumps Over the Lazy Dog
    </monk-heading>
  `,
};

export const AllLevels: Story = {
  render: () => html`
    <monk-box display="flex" style="flex-direction: column; gap: 1rem;">
      <monk-heading level="h1">Heading 1 - Main Page Title</monk-heading>
      <monk-heading level="h2">Heading 2 - Section Title</monk-heading>
      <monk-heading level="h3">Heading 3 - Subsection Title</monk-heading>
      <monk-heading level="h4">Heading 4 - Minor Heading</monk-heading>
      <monk-heading level="h5">Heading 5 - Small Heading</monk-heading>
      <monk-heading level="h6">Heading 6 - Smallest Heading</monk-heading>
    </monk-box>
  `,
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-heading level="h2" color="primary">Primary Heading Color (gray-900) - Default</monk-heading>
      <monk-heading level="h2" color="secondary">Secondary Heading Color (gray-600)</monk-heading>
      <monk-heading level="h2" color="tertiary">Tertiary Heading Color (gray-500)</monk-heading>
    </div>
  `,
};

export const Alignment: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-heading level="h2" align="left">Left Aligned Heading</monk-heading>
      <monk-heading level="h2" align="center">Center Aligned Heading</monk-heading>
      <monk-heading level="h2" align="right">Right Aligned Heading</monk-heading>
      <monk-heading level="h2" align="justify">
        Justified Heading With A Longer Text To Show Justification Effect When Wrapping To Multiple Lines
      </monk-heading>
    </div>
  `,
};

export const TextTransform: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-heading level="h3" transform="none">
        Normal Case Text
      </monk-heading>
      <monk-heading level="h3" transform="uppercase">
        uppercase text
      </monk-heading>
      <monk-heading level="h3" transform="lowercase">
        LOWERCASE TEXT
      </monk-heading>
      <monk-heading level="h3" transform="capitalize">
        capitalize each word
      </monk-heading>
    </div>
  `,
};

export const Italic: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-heading level="h3">Regular Heading</monk-heading>
      <monk-heading level="h3" italic>Italic Heading</monk-heading>
    </div>
  `,
};

export const Truncation: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
      <div>
        <p style="margin: 0 0 0.5rem 0; font-size: 14px; color: #666;">Single line truncation:</p>
        <monk-heading level="h3" truncate>
          This is a very long heading that will be truncated with an ellipsis when it exceeds the container width
        </monk-heading>
      </div>

      <div>
        <p style="margin: 0 0 0.5rem 0; font-size: 14px; color: #666;">Two line clamp:</p>
        <monk-heading level="h3" truncate line-clamp="2">
          This is a very long heading that will be truncated after two lines with an ellipsis when it exceeds the container width
        </monk-heading>
      </div>

      <div>
        <p style="margin: 0 0 0.5rem 0; font-size: 14px; color: #666;">Three line clamp:</p>
        <monk-heading level="h3" truncate line-clamp="3">
          This is an even longer heading that will be truncated after three lines with an ellipsis. This demonstrates the multi-line truncation feature which is useful for maintaining consistent layouts.
        </monk-heading>
      </div>
    </div>
  `,
};

export const Accessibility: Story = {
  render: () => html`
    <monk-box display="flex" style="flex-direction: column; gap: 1rem;">
      <p style="margin: 0; font-size: 14px; color: #666;">
        All headings use proper semantic HTML elements (h1-h6):
      </p>
      <monk-heading level="h1">This renders as &lt;h1&gt; element</monk-heading>
      <monk-heading level="h2">This renders as &lt;h2&gt; element</monk-heading>
      <monk-heading level="h3">This renders as &lt;h3&gt; element</monk-heading>
      <p style="margin: 1rem 0 0 0; font-size: 14px; color: #666;">
        Open the Accessibility panel below to verify WCAG compliance.
      </p>
    </monk-box>
  `,
};

/**
 * Composition with MonkBox - demonstrates how headings work within layout primitives
 */
export const CompositionWithLayout: Story = {
  render: () => html`
    <monk-box display="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
      <!-- Card 1 -->
      <monk-box padding="8" bg="surface" radius="lg" shadow="md" border="1px">
        <monk-heading level="h3" style="margin-bottom: 12px;">Feature Card</monk-heading>
        <monk-text>Headings compose naturally with MonkBox layout primitives.</monk-text>
      </monk-box>

      <!-- Card 2 -->
      <monk-box padding="8" bg="surface" radius="lg" shadow="md" border="1px">
        <monk-heading level="h3" color="secondary" style="margin-bottom: 12px;">Secondary Heading</monk-heading>
        <monk-text>Use different colors to create visual hierarchy.</monk-text>
      </monk-box>

      <!-- Card 3 -->
      <monk-box padding="8" bg="accent-subtle" radius="lg" shadow="md">
        <monk-heading level="h3" style="margin-bottom: 12px;">Accent Background</monk-heading>
        <monk-text>Headings work on different backgrounds using semantic tokens.</monk-text>
      </monk-box>
    </monk-box>
  `,
};
