import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './search-input.js';
import '../typography/heading.js';
import '../typography/text.js';
import '../layout/stack.js';
import '../button/button.js';

const meta: Meta = {
  title: 'Components/Input/SearchInput',
  component: 'monk-search-input',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The SearchInput component provides a search field with browser-specific UI.

## Features

- Native HTML5 search input
- Browser-provided search icon and clear button
- All BaseInput features (variants, sizes, states)
- Optimized for search UX

## Usage

\`\`\`html
<monk-search-input placeholder="Search..."></monk-search-input>
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
    <monk-search-input
      placeholder="Search..."
      style="max-width: 400px;"
    ></monk-search-input>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <monk-search-input
      label="Search"
      placeholder="Type to search..."
      style="max-width: 400px;"
    ></monk-search-input>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <monk-search-input
      label="Search Products"
      value="wireless headphones"
      style="max-width: 400px;"
    ></monk-search-input>
  `,
};

export const Variants: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-search-input
        variant="outline"
        label="Outline"
        placeholder="Search..."
      ></monk-search-input>
      <monk-search-input
        variant="filled"
        label="Filled"
        placeholder="Search..."
      ></monk-search-input>
      <monk-search-input
        variant="flushed"
        label="Flushed"
        placeholder="Search..."
      ></monk-search-input>
    </monk-stack>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-search-input
        size="sm"
        label="Small"
        placeholder="Search..."
      ></monk-search-input>
      <monk-search-input
        size="md"
        label="Medium"
        placeholder="Search..."
      ></monk-search-input>
      <monk-search-input
        size="lg"
        label="Large"
        placeholder="Search..."
      ></monk-search-input>
    </monk-stack>
  `,
};

export const States: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-search-input
        placeholder="Normal search..."
      ></monk-search-input>

      <monk-search-input
        placeholder="Disabled search..."
        disabled
      ></monk-search-input>

      <monk-search-input
        value="readonly search"
        readonly
      ></monk-search-input>
    </monk-stack>
  `,
};

export const WithPrefix: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-search-input
        placeholder="Search products..."
      >
        <span slot="prefix">🔍</span>
      </monk-search-input>

      <monk-search-input
        label="Search Documents"
        placeholder="Find documents..."
      >
        <span slot="prefix">📄</span>
      </monk-search-input>
    </monk-stack>
  `,
};

export const WithHelperText: Story = {
  render: () => html`
    <monk-stack spacing="6" style="max-width: 400px;">
      <monk-search-input
        label="Product Search"
        placeholder="Search by name, SKU, or category..."
        helper-text="You can use wildcards (* and ?)"
      >
        <span slot="prefix">🔍</span>
      </monk-search-input>
    </monk-stack>
  `,
};

export const SearchBar: Story = {
  render: () => html`
    <monk-stack spacing="4" style="max-width: 600px;">
      <monk-heading level="h3">Product Catalog</monk-heading>

      <monk-search-input
        size="lg"
        placeholder="Search thousands of products..."
        helper-text="Try searching for 'laptop', 'phone', or 'headphones'"
      >
        <span slot="prefix">🔍</span>
      </monk-search-input>
    </monk-stack>
  `,
};

export const SidebarSearch: Story = {
  render: () => html`
    <div style="max-width: 300px; padding: 16px; background: var(--monk-color-bg-surface); border-radius: 8px;">
      <monk-stack spacing="4">
        <monk-heading level="h4">Navigation</monk-heading>

        <monk-search-input
          size="sm"
          placeholder="Filter menu..."
        >
          <span slot="prefix">🔍</span>
        </monk-search-input>

        <monk-stack spacing="2">
          <monk-text>Dashboard</monk-text>
          <monk-text>Products</monk-text>
          <monk-text>Orders</monk-text>
          <monk-text>Customers</monk-text>
          <monk-text>Settings</monk-text>
        </monk-stack>
      </monk-stack>
    </div>
  `,
};

export const HeaderSearch: Story = {
  render: () => html`
    <div style="background: var(--monk-color-bg-surface); padding: 16px; border-radius: 8px;">
      <div style="display: flex; align-items: center; gap: 16px; max-width: 800px; margin: 0 auto;">
        <monk-heading level="h4" style="margin: 0; flex-shrink: 0;">MyApp</monk-heading>

        <monk-search-input
          variant="filled"
          placeholder="Search..."
          style="flex: 1;"
        >
          <span slot="prefix">🔍</span>
        </monk-search-input>

        <monk-button variant="ghost">Login</monk-button>
      </div>
    </div>
  `,
};

export const WithEvents: Story = {
  render: () => {
    const handleSearch = (e: CustomEvent) => {
      const message = document.getElementById('search-results');
      if (message) {
        message.textContent = 'Searching for: "' + e.detail.value + '"...';
      }
    };

    return html`
      <monk-stack spacing="6" style="max-width: 400px;">
        <monk-heading level="h3">Live Search</monk-heading>
        <monk-text>
          Type to see search event firing.
        </monk-text>

        <monk-search-input
          label="Search"
          placeholder="Type something..."
          @input-change=${handleSearch}
        >
          <span slot="prefix">🔍</span>
        </monk-search-input>

        <div
          id="search-results"
          style="padding: 12px; border-radius: 6px; background: var(--monk-color-bg-subtle); font-family: var(--monk-font-family-mono); font-size: var(--monk-font-size-sm);"
        >
          Waiting for search...
        </div>
      </monk-stack>
    `;
  },
};
