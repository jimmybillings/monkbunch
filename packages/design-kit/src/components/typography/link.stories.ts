import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './link.js';
import './text.js';
import './heading.js';
import '../layout/box.js';
import '../layout/stack.js';
import '../layout/flex.js';
import type { MonkLink } from './link.js';

const meta: Meta<MonkLink> = {
  title: 'Typography/Link',
  component: 'monk-link',
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'URL the link points to',
      table: {
        type: { summary: 'string' },
      },
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Where to open the linked document',
      table: {
        defaultValue: { summary: '_self' },
      },
    },
    underline: {
      control: 'boolean',
      description: 'Whether to show underline decoration',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    download: {
      control: 'text',
      description: 'Download attribute - prompts to save linked URL',
    },
    rel: {
      control: 'text',
      description: 'Relationship of the linked document (auto-set for target="_blank")',
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
  },
  args: {
    href: '#',
    target: '_self',
    underline: true,
  },
};

export default meta;
type Story = StoryObj<MonkLink>;

export const Default: Story = {
  render: (args) => html`
    <monk-link
      href=${args.href}
      target=${args.target}
      ?underline=${args.underline}
      download=${args.download || ''}
      rel=${args.rel || ''}
      align=${args.align || ''}
      transform=${args.transform || ''}
      ?italic=${args.italic}
    >
      Click this link
    </monk-link>
  `,
};

export const InlineLinks: Story = {
  render: () => html`
    <p style="max-width: 600px; font-size: 16px; line-height: 1.5;">
      This is a paragraph with <monk-link href="#internal">an internal link</monk-link> and
      <monk-link href="https://example.com" target="_blank">an external link</monk-link> that
      demonstrates how links work inline with text content. Links are keyboard accessible via Tab navigation.
    </p>
  `,
};

export const LinkTargets: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <monk-link href="#same-window" target="_self">
          Opens in same window (default)
        </monk-link>
      </div>
      <div>
        <monk-link href="https://example.com" target="_blank">
          Opens in new window (with security attributes)
        </monk-link>
        <span style="font-size: 12px; color: #666; margin-left: 0.5rem;">
          (Automatically adds rel="noopener noreferrer")
        </span>
      </div>
      <div>
        <monk-link href="#parent" target="_parent">
          Opens in parent frame
        </monk-link>
      </div>
      <div>
        <monk-link href="#top" target="_top">
          Opens in top-level frame
        </monk-link>
      </div>
    </div>
  `,
};

export const WithoutUnderline: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <monk-link href="#underlined" underline>
          Link with underline (default)
        </monk-link>
      </div>
      <div>
        <monk-link href="#no-underline" .underline=${false}>
          Link without underline
        </monk-link>
        <span style="font-size: 12px; color: #666; margin-left: 0.5rem;">
          (Still has hover effect)
        </span>
      </div>
    </div>
  `,
};

export const NavigationExample: Story = {
  render: () => html`
    <nav style="display: flex; gap: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
      <monk-link href="#home" .underline=${false}>Home</monk-link>
      <monk-link href="#about" .underline=${false}>About</monk-link>
      <monk-link href="#services" .underline=${false}>Services</monk-link>
      <monk-link href="#contact" .underline=${false}>Contact</monk-link>
    </nav>
  `,
};

export const DownloadLink: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-link href="/document.pdf" download="my-document.pdf">
        Download PDF Document
      </monk-link>
      <monk-link href="/image.jpg" download>
        Download Image (original filename)
      </monk-link>
    </div>
  `,
};

export const TextTransform: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-link href="#normal" transform="none">
        Normal Case Link
      </monk-link>
      <monk-link href="#uppercase" transform="uppercase">
        uppercase link
      </monk-link>
      <monk-link href="#lowercase" transform="lowercase">
        LOWERCASE LINK
      </monk-link>
      <monk-link href="#capitalize" transform="capitalize">
        capitalize each word
      </monk-link>
    </div>
  `,
};

export const StyledLinks: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-link href="#regular">Regular link</monk-link>
      <monk-link href="#italic" italic>Italic link</monk-link>
      <monk-link href="#bold" style="font-weight: 600;">Bold link (via style)</monk-link>
      <monk-link href="#large" style="font-size: 20px;">Large link (via style)</monk-link>
    </div>
  `,
};

export const KeyboardNavigation: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px;">
      <div>
        <p style="margin: 0 0 1rem 0; font-weight: 600;">Try keyboard navigation:</p>
        <p style="margin: 0 0 1rem 0; font-size: 14px; color: #666;">
          Press Tab to focus each link, Enter to activate. Links have visible focus indicators.
        </p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <monk-link href="#link1">First focusable link</monk-link>
        <monk-link href="#link2">Second focusable link</monk-link>
        <monk-link href="#link3">Third focusable link</monk-link>
        <monk-link href="#link4">Fourth focusable link</monk-link>
      </div>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <monk-link href="https://example.com" target="_blank">
        External Link →
      </monk-link>
      <monk-link href="/download" download>
        ⬇ Download File
      </monk-link>
      <monk-link href="mailto:hello@example.com">
        ✉ Send Email
      </monk-link>
    </div>
  `,
};

export const Accessibility: Story = {
  render: () => html`
    <monk-box display="flex" style="flex-direction: column; gap: 1.5rem; max-width: 600px;">
      <div>
        <p style="margin: 0 0 1rem 0; font-weight: 600;">Accessibility Features:</p>
        <ul style="margin: 0; font-size: 14px; color: #666; line-height: 1.6;">
          <li>Uses semantic &lt;a&gt; tag with proper href attribute</li>
          <li>Keyboard accessible (Tab to focus, Enter to activate)</li>
          <li>Visible focus indicator with 3:1 contrast ratio</li>
          <li>External links (target="_blank") include security attributes and ARIA label</li>
          <li>Color meets WCAG AA contrast standards (4.5:1 minimum)</li>
          <li>Hover state provides visual feedback</li>
        </ul>
      </div>
      <monk-box display="flex" style="flex-direction: column; gap: 0.5rem;">
        <monk-link href="#test1">Internal link - default behavior</monk-link>
        <monk-link href="https://example.com" target="_blank">
          External link - includes aria-label="opens in new window"
        </monk-link>
      </monk-box>
      <monk-text size="sm" color="secondary" style="margin-top: 1rem;">
        Open the Accessibility panel below to verify WCAG compliance.
      </monk-text>
    </monk-box>
  `,
};

/**
 * Composition with layout primitives - demonstrates how links work within MonkBox, MonkStack, and MonkFlex
 */
export const CompositionWithLayout: Story = {
  render: () => html`
    <monk-flex gap="6" wrap="wrap">
      <!-- Resource Card -->
      <monk-box padding="8" bg="surface" radius="lg" shadow="md" border="1px">
        <monk-stack spacing="4">
          <monk-heading level="h3">Documentation</monk-heading>
          <monk-text size="sm" color="secondary">
            Learn more about our platform with these helpful resources.
          </monk-text>
          <monk-stack spacing="2">
            <monk-link href="#getting-started">Getting Started Guide</monk-link>
            <monk-link href="#api-docs">API Documentation</monk-link>
            <monk-link href="#examples">Code Examples</monk-link>
            <monk-link href="https://github.com" target="_blank">View on GitHub →</monk-link>
          </monk-stack>
        </monk-stack>
      </monk-box>

      <!-- Navigation Card -->
      <monk-box padding="8" bg="surface" radius="lg" shadow="md" border="1px">
        <monk-stack spacing="4">
          <monk-heading level="h3">Quick Links</monk-heading>
          <monk-stack spacing="3">
            <monk-stack spacing="1">
              <monk-link href="#dashboard" .underline=${false}>
                Dashboard
              </monk-link>
              <monk-text size="xs" color="tertiary">
                View your analytics and metrics
              </monk-text>
            </monk-stack>
            <monk-stack spacing="1">
              <monk-link href="#settings" .underline=${false}>
                Settings
              </monk-link>
              <monk-text size="xs" color="tertiary">
                Manage your account preferences
              </monk-text>
            </monk-stack>
            <monk-stack spacing="1">
              <monk-link href="#support" .underline=${false}>
                Support
              </monk-link>
              <monk-text size="xs" color="tertiary">
                Get help when you need it
              </monk-text>
            </monk-stack>
          </monk-stack>
        </monk-stack>
      </monk-box>

      <!-- Footer Links Card -->
      <monk-box padding="8" bg="accent-subtle" radius="lg" shadow="md">
        <monk-stack spacing="3">
          <monk-heading level="h4">Connect With Us</monk-heading>
          <monk-text size="sm" color="secondary">
            Follow us on social media for updates.
          </monk-text>
          <monk-flex gap="4">
            <monk-link href="https://twitter.com" target="_blank" .underline=${false}>Twitter</monk-link>
            <monk-link href="https://github.com" target="_blank" .underline=${false}>GitHub</monk-link>
            <monk-link href="https://linkedin.com" target="_blank" .underline=${false}>LinkedIn</monk-link>
          </monk-flex>
        </monk-stack>
      </monk-box>
    </monk-flex>
  `,
};
