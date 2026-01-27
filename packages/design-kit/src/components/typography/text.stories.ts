import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './text.js';
import type { MonkText } from './text.js';

const meta: Meta<MonkText> = {
  title: 'Typography/Text',
  component: 'monk-text',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Text size variant',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
      description: 'Text weight variant',
      table: {
        defaultValue: { summary: 'regular' },
      },
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'link',
        'success',
        'warning',
        'error',
        'info',
      ],
      description: 'Text color variant (semantic)',
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
    size: 'md',
    weight: 'regular',
    color: 'primary',
    align: 'left',
    transform: 'none',
    italic: false,
    nowrap: false,
    truncate: false,
  },
};

export default meta;
type Story = StoryObj<MonkText>;

export const Default: Story = {
  render: (args) => html`
    <monk-text
      size=${args.size}
      weight=${args.weight}
      color=${args.color}
      align=${args.align}
      transform=${args.transform}
      ?italic=${args.italic}
      ?nowrap=${args.nowrap}
      ?truncate=${args.truncate}
      line-clamp=${args.lineClamp || ''}
    >
      The quick brown fox jumps over the lazy dog. This is sample text to demonstrate typography.
    </monk-text>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-text size="xs">Extra Small (xs) - 12px</monk-text>
      <monk-text size="sm">Small (sm) - 14px</monk-text>
      <monk-text size="md">Medium (md) - 16px - Default</monk-text>
      <monk-text size="lg">Large (lg) - 18px</monk-text>
      <monk-text size="xl">Extra Large (xl) - 20px</monk-text>
    </div>
  `,
};

export const Weights: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-text weight="regular">Regular Weight (400) - Default</monk-text>
      <monk-text weight="medium">Medium Weight (500)</monk-text>
      <monk-text weight="semibold">Semibold Weight (600)</monk-text>
      <monk-text weight="bold">Bold Weight (700)</monk-text>
    </div>
  `,
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-text color="primary">Primary Text Color (gray-900) - Default</monk-text>
      <monk-text color="secondary">Secondary Text Color (gray-600)</monk-text>
      <monk-text color="tertiary">Tertiary Text Color (gray-500)</monk-text>
      <monk-text color="link">Link Text Color (blue) - For inline links</monk-text>
      <monk-text color="success">Success Text Color (green) - For success messages</monk-text>
      <monk-text color="warning">Warning Text Color (yellow-orange) - For warning messages</monk-text>
      <monk-text color="error">Error Text Color (red) - For error messages</monk-text>
      <monk-text color="info">Info Text Color (blue) - For informational messages</monk-text>
    </div>
  `,
};

export const Combinations: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <monk-text size="xl" weight="bold" color="primary">
        Large, Bold, Primary Text
      </monk-text>
      <monk-text size="lg" weight="semibold" color="primary">
        Large, Semibold, Primary Text
      </monk-text>
      <monk-text size="md" weight="medium" color="secondary">
        Medium, Medium Weight, Secondary Text
      </monk-text>
      <monk-text size="sm" weight="regular" color="tertiary">
        Small, Regular, Tertiary Text
      </monk-text>
      <monk-text size="xs" weight="regular" color="tertiary">
        Extra Small, Regular, Tertiary Text
      </monk-text>
    </div>
  `,
};

export const Alignment: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-text align="left">
        Left aligned text. This is the default alignment for text content in most languages.
      </monk-text>
      <monk-text align="center">
        Center aligned text. Often used for headings, quotes, or featured content.
      </monk-text>
      <monk-text align="right">
        Right aligned text. Sometimes used for numerical data or in right-to-left languages.
      </monk-text>
      <monk-text align="justify">
        Justified text stretches each line to fill the full width of the container, creating clean edges on both sides. This is commonly used in newspapers and formal documents. However, it can sometimes create awkward spacing in narrow columns.
      </monk-text>
    </div>
  `,
};

export const TextTransform: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-text transform="none">
        Normal Case Text - No transformation applied
      </monk-text>
      <monk-text transform="uppercase">
        uppercase text becomes UPPERCASE
      </monk-text>
      <monk-text transform="lowercase">
        LOWERCASE TEXT becomes lowercase
      </monk-text>
      <monk-text transform="capitalize">
        capitalize each word in the sentence
      </monk-text>
    </div>
  `,
};

export const ItalicAndStyles: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-text>Regular text without any styling</monk-text>
      <monk-text italic>Italic text for emphasis</monk-text>
      <monk-text weight="bold">Bold text for strong emphasis</monk-text>
      <monk-text italic weight="bold">Bold and italic combined</monk-text>
    </div>
  `,
};

export const Truncation: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
      <div>
        <p style="margin: 0 0 0.5rem 0; font-size: 14px; color: #666;">Single line truncation:</p>
        <monk-text truncate>
          This is a very long paragraph that will be truncated with an ellipsis when it exceeds the container width. This helps maintain consistent layouts.
        </monk-text>
      </div>

      <div>
        <p style="margin: 0 0 0.5rem 0; font-size: 14px; color: #666;">Two line clamp:</p>
        <monk-text truncate line-clamp="2">
          This is a longer paragraph that will be truncated after two lines. The line-clamp property allows you to show multiple lines before truncating, which is useful for previews and cards.
        </monk-text>
      </div>

      <div>
        <p style="margin: 0 0 0.5rem 0; font-size: 14px; color: #666;">Three line clamp:</p>
        <monk-text truncate line-clamp="3">
          This is an even longer paragraph that demonstrates three-line truncation. This feature is particularly useful for maintaining consistent card heights in grid layouts while still showing enough content to give users context about what they're reading. The ellipsis indicates there's more content available.
        </monk-text>
      </div>
    </div>
  `,
};

export const Paragraph: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <monk-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </monk-text>
      <monk-text color="secondary" style="margin-top: 1rem; display: block;">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </monk-text>
    </div>
  `,
};

export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
      <monk-text size="lg" weight="semibold">Color Contrast Examples</monk-text>
      <monk-text color="primary">
        Primary text meets WCAG AA standards with a contrast ratio of at least 4.5:1 against the background.
      </monk-text>
      <monk-text color="secondary">
        Secondary text also meets WCAG AA standards for body text.
      </monk-text>
      <monk-text color="tertiary">
        Tertiary text meets minimum standards and is best used for less critical information.
      </monk-text>
      <monk-text size="sm" color="tertiary" style="margin-top: 1rem; display: block;">
        Open the Accessibility panel below to verify all text passes automated accessibility checks.
      </monk-text>
    </div>
  `,
};
