import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './grid.js';
import './box.js';
import './stack.js';
import './container.js';
import '../typography/heading.js';
import '../typography/text.js';
import type { MonkGrid } from './grid.js';

const meta: Meta<MonkGrid> = {
  title: 'Layout/Grid',
  component: 'monk-grid',
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'text',
      description: 'Number of columns or custom grid-template-columns value',
    },
    rows: {
      control: 'text',
      description: 'Number of rows or custom grid-template-rows value',
    },
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
      description: 'Gap between grid items',
    },
    columnGap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
      description: 'Column gap (overrides gap)',
    },
    rowGap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'],
      description: 'Row gap (overrides gap)',
    },
    minColumnWidth: {
      control: 'text',
      description: 'Minimum column width for auto-fit responsive grids',
    },
    autoFlow: {
      control: 'select',
      options: ['row', 'column', 'row-dense', 'column-dense'],
      description: 'Grid auto-flow',
      table: {
        defaultValue: { summary: 'row' },
      },
    },
    inline: {
      control: 'boolean',
      description: 'Whether to use inline-grid',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    autoFlow: 'row',
    inline: false,
  },
};

export default meta;
type Story = StoryObj<MonkGrid>;

/**
 * Default grid with 3 columns
 */
export const Default: Story = {
  render: (args) => html`
    <monk-grid
      columns=${ifDefined(args.columns)}
      rows=${ifDefined(args.rows)}
      gap=${ifDefined(args.gap)}
      column-gap=${ifDefined(args.columnGap)}
      row-gap=${ifDefined(args.rowGap)}
      min-column-width=${ifDefined(args.minColumnWidth)}
      auto-flow=${args.autoFlow}
      ?inline=${args.inline}
    >
      ${Array.from({ length: 6 }, (_, i) => html`
        <monk-box padding="6" bg="accent-subtle" radius="md">
          <monk-text align="center" weight="semibold">Item ${i + 1}</monk-text>
        </monk-box>
      `)}
    </monk-grid>
  `,
  args: {
    columns: '3',
    gap: '4',
  },
};

/**
 * Common grid column patterns
 */
export const ColumnPatterns: Story = {
  render: () => html`
    <monk-container size="xl">
      <monk-stack spacing="8">
        <!-- 2 columns -->
        <monk-stack spacing="3">
          <monk-text size="sm" weight="semibold">2 Columns</monk-text>
          <monk-grid columns="2" gap="4">
            ${Array.from({ length: 4 }, (_, i) => html`
              <monk-box padding="6" bg="accent-subtle" radius="md">
                <monk-text align="center">Item ${i + 1}</monk-text>
              </monk-box>
            `)}
          </monk-grid>
        </monk-stack>

        <!-- 3 columns -->
        <monk-stack spacing="3">
          <monk-text size="sm" weight="semibold">3 Columns</monk-text>
          <monk-grid columns="3" gap="4">
            ${Array.from({ length: 6 }, (_, i) => html`
              <monk-box padding="6" bg="accent-subtle" radius="md">
                <monk-text align="center">Item ${i + 1}</monk-text>
              </monk-box>
            `)}
          </monk-grid>
        </monk-stack>

        <!-- 4 columns -->
        <monk-stack spacing="3">
          <monk-text size="sm" weight="semibold">4 Columns</monk-text>
          <monk-grid columns="4" gap="4">
            ${Array.from({ length: 8 }, (_, i) => html`
              <monk-box padding="6" bg="accent-subtle" radius="md">
                <monk-text align="center">Item ${i + 1}</monk-text>
              </monk-box>
            `)}
          </monk-grid>
        </monk-stack>
      </monk-stack>
    </monk-container>
  `,
};

/**
 * Custom column widths
 */
export const CustomColumns: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <!-- Sidebar layout -->
      <monk-stack spacing="3">
        <monk-text size="sm" weight="semibold">Sidebar Layout (200px auto)</monk-text>
        <monk-grid columns="200px auto" gap="4">
          <monk-box padding="6" bg="accent-subtle" radius="md">
            <monk-text>Sidebar</monk-text>
          </monk-box>
          <monk-box padding="6" bg="surface" radius="md" border="1px">
            <monk-text>Main Content</monk-text>
          </monk-box>
        </monk-grid>
      </monk-stack>

      <!-- Two columns with different ratios -->
      <monk-stack spacing="3">
        <monk-text size="sm" weight="semibold">Ratio Layout (1fr 2fr)</monk-text>
        <monk-grid columns="1fr 2fr" gap="4">
          <monk-box padding="6" bg="accent-subtle" radius="md">
            <monk-text>Narrow (1fr)</monk-text>
          </monk-box>
          <monk-box padding="6" bg="surface" radius="md" border="1px">
            <monk-text>Wide (2fr)</monk-text>
          </monk-box>
        </monk-grid>
      </monk-stack>

      <!-- Mixed units -->
      <monk-stack spacing="3">
        <monk-text size="sm" weight="semibold">Mixed Layout (200px 1fr 200px)</monk-text>
        <monk-grid columns="200px 1fr 200px" gap="4">
          <monk-box padding="6" bg="accent-subtle" radius="md">
            <monk-text>Left</monk-text>
          </monk-box>
          <monk-box padding="6" bg="surface" radius="md" border="1px">
            <monk-text>Center (flexible)</monk-text>
          </monk-box>
          <monk-box padding="6" bg="accent-subtle" radius="md">
            <monk-text>Right</monk-text>
          </monk-box>
        </monk-grid>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Responsive grid with min-column-width
 */
export const ResponsiveGrid: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-stack spacing="2">
        <monk-heading level="h3">Responsive Grid (auto-fit)</monk-heading>
        <monk-text size="sm" color="secondary">
          Automatically adjusts columns based on available space. Try resizing your browser window.
        </monk-text>
      </monk-stack>

      <monk-grid min-column-width="200px" gap="4">
        ${Array.from({ length: 12 }, (_, i) => html`
          <monk-box padding="6" bg="accent-subtle" radius="md">
            <monk-stack spacing="2" align="center">
              <monk-text weight="semibold">${i + 1}</monk-text>
              <monk-text size="xs" color="secondary">min-width: 200px</monk-text>
            </monk-stack>
          </monk-box>
        `)}
      </monk-grid>
    </monk-stack>
  `,
};

/**
 * Gap variations
 */
export const Gaps: Story = {
  render: () => html`
    <monk-stack spacing="8">
      ${(['2', '4', '8'] as const).map(
        (gap) => html`
          <monk-stack spacing="3">
            <monk-text size="sm" weight="semibold">gap="${gap}"</monk-text>
            <monk-grid columns="4" gap=${gap}>
              ${Array.from({ length: 4 }, (_, i) => html`
                <monk-box padding="4" bg="accent-subtle" radius="md">
                  <monk-text size="sm" align="center">${i + 1}</monk-text>
                </monk-box>
              `)}
            </monk-grid>
          </monk-stack>
        `
      )}
    </monk-stack>
  `,
};

/**
 * Different column and row gaps
 */
export const AsymmetricGaps: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <monk-stack spacing="3">
        <monk-text size="sm" weight="semibold">column-gap="6" row-gap="2"</monk-text>
        <monk-grid columns="3" column-gap="6" row-gap="2">
          ${Array.from({ length: 6 }, (_, i) => html`
            <monk-box padding="6" bg="accent-subtle" radius="md">
              <monk-text align="center">${i + 1}</monk-text>
            </monk-box>
          `)}
        </monk-grid>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-text size="sm" weight="semibold">column-gap="2" row-gap="6"</monk-text>
        <monk-grid columns="3" column-gap="2" row-gap="6">
          ${Array.from({ length: 6 }, (_, i) => html`
            <monk-box padding="6" bg="accent-subtle" radius="md">
              <monk-text align="center">${i + 1}</monk-text>
            </monk-box>
          `)}
        </monk-grid>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Grid with rows
 */
export const RowsExample: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <monk-stack spacing="3">
        <monk-text size="sm" weight="semibold">columns="3" rows="2"</monk-text>
        <monk-grid columns="3" rows="2" gap="4">
          ${Array.from({ length: 6 }, (_, i) => html`
            <monk-box padding="6" bg="accent-subtle" radius="md">
              <monk-text align="center">Item ${i + 1}</monk-text>
            </monk-box>
          `)}
        </monk-grid>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-text size="sm" weight="semibold">Custom row heights (auto 1fr auto)</monk-text>
        <monk-grid columns="1" rows="auto 1fr auto" gap="4">
          <monk-box padding="4" bg="accent-subtle" radius="md">
            <monk-text>Header (auto)</monk-text>
          </monk-box>
          <monk-box padding="12" bg="surface" radius="md" border="1px">
            <monk-text>Main Content (1fr - takes remaining space)</monk-text>
          </monk-box>
          <monk-box padding="4" bg="accent-subtle" radius="md">
            <monk-text>Footer (auto)</monk-text>
          </monk-box>
        </monk-grid>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Auto-flow examples
 */
export const AutoFlow: Story = {
  render: () => html`
    <monk-stack spacing="8">
      <monk-stack spacing="3">
        <monk-text size="sm" weight="semibold">auto-flow="row" (default)</monk-text>
        <monk-grid columns="3" gap="4" auto-flow="row">
          ${Array.from({ length: 5 }, (_, i) => html`
            <monk-box padding="6" bg="accent-subtle" radius="md">
              <monk-text align="center">${i + 1}</monk-text>
            </monk-box>
          `)}
        </monk-grid>
      </monk-stack>

      <monk-stack spacing="3">
        <monk-text size="sm" weight="semibold">auto-flow="column"</monk-text>
        <monk-grid rows="2" gap="4" auto-flow="column">
          ${Array.from({ length: 6 }, (_, i) => html`
            <monk-box padding="6" bg="accent-subtle" radius="md">
              <monk-text align="center">${i + 1}</monk-text>
            </monk-box>
          `)}
        </monk-grid>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Card grid example
 */
export const CardGrid: Story = {
  render: () => html`
    <monk-container size="xl">
      <monk-stack spacing="6">
        <monk-heading level="h2">Product Grid</monk-heading>
        <monk-grid min-column-width="280px" gap="6">
          ${Array.from({ length: 6 }, (_, i) => html`
            <monk-box padding="6" bg="surface" radius="lg" shadow="md" border="1px">
              <monk-stack spacing="4">
                <monk-box padding="8" bg="accent-subtle" radius="md">
                  <monk-text align="center" size="xl" weight="bold">${i + 1}</monk-text>
                </monk-box>
                <monk-stack spacing="2">
                  <monk-heading level="h3">Product ${i + 1}</monk-heading>
                  <monk-text size="sm" color="secondary">
                    This is a product description that demonstrates the grid layout.
                  </monk-text>
                </monk-stack>
                <monk-text size="lg" weight="bold">$${(i + 1) * 10}.99</monk-text>
              </monk-stack>
            </monk-box>
          `)}
        </monk-grid>
      </monk-stack>
    </monk-container>
  `,
};

/**
 * Dashboard layout
 */
export const Dashboard: Story = {
  render: () => html`
    <monk-container size="2xl">
      <monk-stack spacing="6">
        <monk-heading level="h2">Dashboard</monk-heading>

        <!-- Stats grid -->
        <monk-grid columns="4" gap="4">
          ${[
            { label: 'Total Users', value: '1,234' },
            { label: 'Revenue', value: '$45.6K' },
            { label: 'Growth', value: '+12%' },
            { label: 'Active', value: '892' },
          ].map(
            (stat) => html`
              <monk-box padding="6" bg="surface" radius="md" shadow="sm" border="1px">
                <monk-stack spacing="2">
                  <monk-text size="sm" color="secondary">${stat.label}</monk-text>
                  <monk-text size="2xl" weight="bold">${stat.value}</monk-text>
                </monk-stack>
              </monk-box>
            `
          )}
        </monk-grid>

        <!-- Main content grid -->
        <monk-grid columns="2fr 1fr" gap="6">
          <!-- Chart area -->
          <monk-box padding="8" bg="surface" radius="lg" shadow="md" border="1px">
            <monk-stack spacing="4">
              <monk-heading level="h3">Revenue Chart</monk-heading>
              <monk-box padding="20" bg="accent-subtle" radius="md">
                <monk-text align="center" color="secondary">Chart placeholder</monk-text>
              </monk-box>
            </monk-stack>
          </monk-box>

          <!-- Sidebar -->
          <monk-box padding="8" bg="surface" radius="lg" shadow="md" border="1px">
            <monk-stack spacing="4">
              <monk-heading level="h3">Recent Activity</monk-heading>
              <monk-stack spacing="3">
                ${Array.from({ length: 4 }, (_, i) => html`
                  <monk-box padding="3" bg="accent-subtle" radius="sm">
                    <monk-text size="sm">Activity ${i + 1}</monk-text>
                  </monk-box>
                `)}
              </monk-stack>
            </monk-stack>
          </monk-box>
        </monk-grid>
      </monk-stack>
    </monk-container>
  `,
};

/**
 * Image gallery
 */
export const ImageGallery: Story = {
  render: () => html`
    <monk-container size="xl">
      <monk-stack spacing="6">
        <monk-heading level="h2">Photo Gallery</monk-heading>
        <monk-grid min-column-width="250px" gap="4">
          ${Array.from({ length: 9 }, (_, i) => html`
            <monk-box
              padding="0"
              bg="accent-subtle"
              radius="md"
              style="aspect-ratio: 4/3; overflow: hidden;"
            >
              <monk-stack spacing="0" style="height: 100%;">
                <monk-box padding="8" bg="accent-subtle" style="flex: 1;">
                  <monk-text align="center" weight="semibold">Image ${i + 1}</monk-text>
                </monk-box>
              </monk-stack>
            </monk-box>
          `)}
        </monk-grid>
      </monk-stack>
    </monk-container>
  `,
};

/**
 * Form layout with grid
 */
export const FormLayout: Story = {
  render: () => html`
    <monk-container size="md">
      <monk-box padding="8" bg="surface" radius="lg" shadow="md" border="1px">
        <monk-stack spacing="6">
          <monk-heading level="h2">Contact Form</monk-heading>

          <monk-grid columns="2" gap="4">
            <monk-stack spacing="2">
              <monk-text size="sm" weight="semibold">First Name</monk-text>
              <monk-box padding="3" bg="canvas" border="1px" radius="md">
                <monk-text size="sm" color="tertiary">Enter first name</monk-text>
              </monk-box>
            </monk-stack>

            <monk-stack spacing="2">
              <monk-text size="sm" weight="semibold">Last Name</monk-text>
              <monk-box padding="3" bg="canvas" border="1px" radius="md">
                <monk-text size="sm" color="tertiary">Enter last name</monk-text>
              </monk-box>
            </monk-stack>
          </monk-grid>

          <monk-stack spacing="2">
            <monk-text size="sm" weight="semibold">Email</monk-text>
            <monk-box padding="3" bg="canvas" border="1px" radius="md">
              <monk-text size="sm" color="tertiary">Enter email address</monk-text>
            </monk-box>
          </monk-stack>

          <monk-stack spacing="2">
            <monk-text size="sm" weight="semibold">Message</monk-text>
            <monk-box padding="6" bg="canvas" border="1px" radius="md">
              <monk-text size="sm" color="tertiary">Enter your message</monk-text>
            </monk-box>
          </monk-stack>

          <monk-box padding="4" bg="accent" radius="md">
            <monk-text weight="semibold" align="center">Submit</monk-text>
          </monk-box>
        </monk-stack>
      </monk-box>
    </monk-container>
  `,
};

/**
 * Accessibility demonstration
 */
export const Accessibility: Story = {
  render: () => html`
    <monk-container size="lg">
      <monk-stack spacing="6">
        <monk-heading level="h2">Accessibility Features</monk-heading>

        <monk-stack spacing="4">
          <monk-text weight="semibold">Semantic HTML</monk-text>
          <monk-stack spacing="2">
            <monk-text size="sm" color="secondary">
              • Grid uses CSS Grid Layout, a standard web technology
            </monk-text>
            <monk-text size="sm" color="secondary">
              • Maintains natural document flow for screen readers
            </monk-text>
            <monk-text size="sm" color="secondary">
              • Grid order matches visual order by default
            </monk-text>
          </monk-stack>
        </monk-stack>

        <monk-stack spacing="4">
          <monk-text weight="semibold">Responsive Design</monk-text>
          <monk-stack spacing="2">
            <monk-text size="sm" color="secondary">
              • Auto-fit columns adapt to screen size
            </monk-text>
            <monk-text size="sm" color="secondary">
              • Content remains accessible on all devices
            </monk-text>
            <monk-text size="sm" color="secondary">
              • No horizontal scrolling required
            </monk-text>
          </monk-stack>
        </monk-stack>

        <monk-text size="sm" color="secondary">
          Open the Accessibility panel below to verify WCAG compliance.
        </monk-text>
      </monk-stack>
    </monk-container>
  `,
};
