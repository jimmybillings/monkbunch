import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './container.js';
import './box.js';
import './stack.js';
import '../typography/heading.js';
import '../typography/text.js';
import type { MonkContainer } from './container.js';

const meta: Meta<MonkContainer> = {
  title: 'Layout/Container',
  component: 'monk-container',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Maximum width of the container',
      table: {
        defaultValue: { summary: 'xl' },
      },
    },
    centerContent: {
      control: 'boolean',
      description: 'Whether to center content horizontally',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    size: 'xl',
    centerContent: true,
  },
};

export default meta;
type Story = StoryObj<MonkContainer>;

/**
 * Default container with centered content
 */
export const Default: Story = {
  render: (args) => html`
    <monk-container size=${args.size} .centerContent=${args.centerContent}>
      <monk-box padding="8" bg="surface" radius="lg" shadow="md" border="1px">
        <monk-stack spacing="4">
          <monk-heading level="h2">Container Component</monk-heading>
          <monk-text>
            The container component constrains content width and centers it horizontally.
            This ensures readable line lengths and consistent layouts across different screen sizes.
          </monk-text>
          <monk-text color="secondary">
            Current size: ${args.size}
          </monk-text>
        </monk-stack>
      </monk-box>
    </monk-container>
  `,
};

/**
 * All container sizes demonstrated
 */
export const Sizes: Story = {
  render: () => html`
    <monk-stack spacing="8">
      ${(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map(
        (size) => html`
          <monk-stack spacing="2">
            <monk-text size="sm" weight="semibold">size="${size}"</monk-text>
            <monk-container size=${size}>
              <monk-box padding="6" bg="accent-subtle" radius="md">
                <monk-text align="center">
                  Container with size="${size}" (max-width: ${size === 'sm' ? '640px' : size === 'md' ? '768px' : size === 'lg' ? '1024px' : size === 'xl' ? '1280px' : size === '2xl' ? '1536px' : '100%'})
                </monk-text>
              </monk-box>
            </monk-container>
          </monk-stack>
        `
      )}
    </monk-stack>
  `,
};

/**
 * Container with centerContent disabled
 */
export const NotCentered: Story = {
  render: () => html`
    <monk-stack spacing="6">
      <monk-stack spacing="2">
        <monk-text size="sm" weight="semibold">Centered (default)</monk-text>
        <monk-container size="md">
          <monk-box padding="6" bg="accent-subtle" radius="md">
            <monk-text>This container is centered with margin: 0 auto</monk-text>
          </monk-box>
        </monk-container>
      </monk-stack>

      <monk-stack spacing="2">
        <monk-text size="sm" weight="semibold">Not centered (centerContent={false})</monk-text>
        <monk-container size="md" .centerContent=${false}>
          <monk-box padding="6" bg="accent-subtle" radius="md">
            <monk-text>This container is left-aligned</monk-text>
          </monk-box>
        </monk-container>
      </monk-stack>
    </monk-stack>
  `,
};

/**
 * Page layout example with container
 */
export const PageLayout: Story = {
  render: () => html`
    <monk-container size="lg">
      <monk-stack spacing="8">
        <!-- Hero section -->
        <monk-stack spacing="4" align="center">
          <monk-heading level="h1" align="center">Welcome to Our Platform</monk-heading>
          <monk-text size="lg" align="center" color="secondary">
            Build amazing applications with our design system
          </monk-text>
        </monk-stack>

        <!-- Features -->
        <monk-stack spacing="6">
          <monk-heading level="h2">Features</monk-heading>
          <monk-stack spacing="4">
            ${Array.from({ length: 3 }, (_, i) => html`
              <monk-box padding="6" bg="surface" radius="md" shadow="sm" border="1px">
                <monk-stack spacing="2">
                  <monk-heading level="h3">Feature ${i + 1}</monk-heading>
                  <monk-text color="secondary">
                    This is a description of feature ${i + 1}. The container ensures content
                    stays within a readable width.
                  </monk-text>
                </monk-stack>
              </monk-box>
            `)}
          </monk-stack>
        </monk-stack>
      </monk-stack>
    </monk-container>
  `,
};

/**
 * Blog post layout
 */
export const BlogPost: Story = {
  render: () => html`
    <monk-container size="md">
      <monk-stack spacing="8">
        <!-- Header -->
        <monk-stack spacing="4">
          <monk-heading level="h1">Understanding Design Systems</monk-heading>
          <monk-text color="secondary">
            Published on January 27, 2026 • 5 min read
          </monk-text>
        </monk-stack>

        <!-- Content -->
        <monk-stack spacing="6">
          <monk-text>
            A design system is a collection of reusable components, guided by clear standards,
            that can be assembled together to build any number of applications. The container
            component helps maintain optimal line length for readability, typically between
            45-75 characters per line.
          </monk-text>

          <monk-text>
            When building content-focused layouts like blog posts or articles, using a
            smaller container (md or lg) ensures text remains easy to read on larger screens.
            This prevents lines from becoming too long, which can make reading difficult and tiring.
          </monk-text>

          <monk-box padding="6" bg="accent-subtle" radius="md">
            <monk-stack spacing="2">
              <monk-text weight="semibold">Key Takeaway</monk-text>
              <monk-text size="sm">
                Container components are essential for creating responsive layouts that work
                well across all screen sizes while maintaining readability and visual hierarchy.
              </monk-text>
            </monk-stack>
          </monk-box>

          <monk-text>
            By using semantic sizing tokens (sm, md, lg, xl, 2xl), the container component
            makes it easy to create consistent, responsive layouts throughout your application.
          </monk-text>
        </monk-stack>
      </monk-stack>
    </monk-container>
  `,
};

/**
 * Nested containers for sections
 */
export const NestedContainers: Story = {
  render: () => html`
    <monk-stack spacing="12">
      <!-- Wide section -->
      <monk-container size="2xl">
        <monk-box padding="12" bg="accent-subtle" radius="lg">
          <monk-stack spacing="4" align="center">
            <monk-heading level="h2">Wide Section (2xl)</monk-heading>
            <monk-text align="center">
              This section uses a 2xl container for full-width content like image galleries or data tables.
            </monk-text>
          </monk-stack>
        </monk-box>
      </monk-container>

      <!-- Standard content -->
      <monk-container size="lg">
        <monk-stack spacing="6">
          <monk-heading level="h2">Standard Content (lg)</monk-heading>
          <monk-text>
            This section uses an lg container, which is perfect for most page content.
            It provides a comfortable reading width while making good use of screen space.
          </monk-text>
        </monk-stack>
      </monk-container>

      <!-- Narrow content -->
      <monk-container size="sm">
        <monk-box padding="8" bg="surface" radius="lg" shadow="md" border="1px">
          <monk-stack spacing="4" align="center">
            <monk-heading level="h3" align="center">Focused Content (sm)</monk-heading>
            <monk-text size="sm" align="center" color="secondary">
              Small containers work well for forms, login pages, or other focused content
              that benefits from a narrow, centered layout.
            </monk-text>
          </monk-stack>
        </monk-box>
      </monk-container>
    </monk-stack>
  `,
};

/**
 * Responsive container example
 */
export const Responsive: Story = {
  render: () => html`
    <monk-container size="lg">
      <monk-stack spacing="6">
        <monk-heading level="h2">Responsive Container Behavior</monk-heading>
        <monk-text>
          The container automatically adds horizontal padding on smaller screens to prevent
          content from touching the edges. On larger screens, it constrains content to the
          specified max-width and centers it.
        </monk-text>

        <monk-box padding="6" bg="surface" radius="md" border="1px">
          <monk-stack spacing="4">
            <monk-text weight="semibold">Try resizing your browser window</monk-text>
            <monk-stack spacing="2">
              <monk-text size="sm" color="secondary">
                • On mobile: Content spans full width with 16px padding
              </monk-text>
              <monk-text size="sm" color="secondary">
                • On tablet: Content begins to constrain based on size
              </monk-text>
              <monk-text size="sm" color="secondary">
                • On desktop: Content reaches max-width and centers
              </monk-text>
            </monk-stack>
          </monk-stack>
        </monk-box>
      </monk-stack>
    </monk-container>
  `,
};

/**
 * Full-width container
 */
export const FullWidth: Story = {
  render: () => html`
    <monk-container size="full">
      <monk-stack spacing="6">
        <monk-heading level="h2">Full Width Container</monk-heading>
        <monk-text>
          The "full" size removes the max-width constraint, allowing content to span the
          entire available width. Useful for dashboards, admin interfaces, or sections
          that need maximum horizontal space.
        </monk-text>
        <monk-box padding="8" bg="accent-subtle" radius="md">
          <monk-text align="center">
            This content spans the full width of its parent
          </monk-text>
        </monk-box>
      </monk-stack>
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
          <monk-text weight="semibold">Readability</monk-text>
          <monk-stack spacing="2">
            <monk-text size="sm" color="secondary">
              • Optimal line length (45-75 characters) improves reading comprehension
            </monk-text>
            <monk-text size="sm" color="secondary">
              • Consistent padding prevents content from touching screen edges
            </monk-text>
            <monk-text size="sm" color="secondary">
              • Centered content creates visual balance
            </monk-text>
          </monk-stack>
        </monk-stack>

        <monk-stack spacing="4">
          <monk-text weight="semibold">Responsive Design</monk-text>
          <monk-stack spacing="2">
            <monk-text size="sm" color="secondary">
              • Content remains accessible on all device sizes
            </monk-text>
            <monk-text size="sm" color="secondary">
              • No horizontal scrolling required
            </monk-text>
            <monk-text size="sm" color="secondary">
              • Maintains comfortable reading experience across breakpoints
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
