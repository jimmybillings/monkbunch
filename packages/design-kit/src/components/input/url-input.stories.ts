import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './url-input.js';
import { validators } from './validators.js';
import '../typography/heading.js';
import '../typography/text.js';
import '../layout/stack.js';
import '../button/button.js';

const meta: Meta = {
  title: 'Components/Input/URLInput',
  component: 'monk-url-input',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The URLInput component provides a URL input with browser validation.

## Features

- Native HTML5 URL validation
- Browser-provided URL validation
- All BaseInput features (variants, sizes, states, validation)
- Custom validators for stricter URL validation

## Usage

\`\`\`html
<monk-url-input label="Website" placeholder="https://example.com"></monk-url-input>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <monk-url-input
      label="Website URL"
      placeholder="https://example.com"
      style="max-width: 400px;"
    ></monk-url-input>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <monk-url-input
      label="Portfolio"
      value="https://portfolio.example.com"
      style="max-width: 400px;"
    ></monk-url-input>
  `,
};

export const Variants: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-url-input
        variant="outline"
        label="Outline"
        value="https://example.com"
      ></monk-url-input>
      <monk-url-input
        variant="filled"
        label="Filled"
        value="https://example.com"
      ></monk-url-input>
      <monk-url-input
        variant="flushed"
        label="Flushed"
        value="https://example.com"
      ></monk-url-input>
    </monk-stack>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-url-input
        size="sm"
        label="Small"
        value="https://example.com"
      ></monk-url-input>
      <monk-url-input
        size="md"
        label="Medium"
        value="https://example.com"
      ></monk-url-input>
      <monk-url-input
        size="lg"
        label="Large"
        value="https://example.com"
      ></monk-url-input>
    </monk-stack>
  `,
};

export const WithValidation: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-url-input
        label="Website"
        required
        validate
        .validators=${[validators.url]}
        validation-message="Please enter a valid URL"
        helper-text="Include https:// or http://"
      ></monk-url-input>

      <monk-url-input
        label="Portfolio URL"
        required
        validate
        .validators=${[validators.url]}
        helper-text="Your personal website or portfolio"
      ></monk-url-input>

      <monk-url-input
        label="Invalid URL"
        value="not-a-url"
        invalid
        error-message="Please enter a valid URL starting with https://"
      ></monk-url-input>
    </monk-stack>
  `,
};

export const States: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-url-input
        label="Required"
        required
      ></monk-url-input>

      <monk-url-input
        label="Disabled"
        value="https://example.com"
        disabled
      ></monk-url-input>

      <monk-url-input
        label="Readonly"
        value="https://example.com"
        readonly
      ></monk-url-input>
    </monk-stack>
  `,
};

export const WithPrefix: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-url-input
        label="Website"
        value="https://example.com"
      >
        <span slot="prefix">🌐</span>
      </monk-url-input>

      <monk-url-input
        label="Documentation"
        placeholder="https://docs.example.com"
      >
        <span slot="prefix">📚</span>
      </monk-url-input>
    </monk-stack>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <monk-stack spacing="4" style="max-width: 400px;">
      <monk-heading level="h3">Social Links</monk-heading>

      <monk-url-input
        label="Website"
        placeholder="https://yourwebsite.com"
        validate
        .validators=${[validators.url]}
      >
        <span slot="prefix">🌐</span>
      </monk-url-input>

      <monk-url-input
        label="LinkedIn"
        placeholder="https://linkedin.com/in/username"
        validate
        .validators=${[validators.url]}
      >
        <span slot="prefix">💼</span>
      </monk-url-input>

      <monk-url-input
        label="GitHub"
        placeholder="https://github.com/username"
        validate
        .validators=${[validators.url]}
      >
        <span slot="prefix">💻</span>
      </monk-url-input>

      <monk-button variant="solid" full-width>Save Links</monk-button>
    </monk-stack>
  `,
};

export const DifferentProtocols: Story = {
  render: () => html`
    <monk-stack spacing="4" style="max-width: 400px;">
      <monk-heading level="h4">Different URL Types</monk-heading>

      <monk-url-input
        label="HTTPS URL"
        value="https://secure.example.com"
      ></monk-url-input>

      <monk-url-input
        label="HTTP URL"
        value="http://example.com"
      ></monk-url-input>

      <monk-url-input
        label="FTP URL"
        value="ftp://ftp.example.com"
      ></monk-url-input>

      <monk-url-input
        label="With Path"
        value="https://example.com/docs/getting-started"
      ></monk-url-input>

      <monk-url-input
        label="With Query"
        value="https://example.com/search?q=test"
      ></monk-url-input>
    </monk-stack>
  `,
};
