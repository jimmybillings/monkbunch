import type { Preview } from '@storybook/web-components';
import { html } from 'lit';
import '../packages/design-tokens/dist/css/base.css';
import '../packages/design-tokens/dist/css/theme-light.css';
import '../packages/design-tokens/dist/css/theme-dark.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // Disable since we're using theme-aware backgrounds
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'button-name',
            enabled: true,
          },
          {
            id: 'link-name',
            enabled: true,
          },
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      // Update document attribute
      document.documentElement.setAttribute('data-theme', theme);

      // Use CSS custom property for theme-aware background
      return html`
        <div style="background: var(--monk-color-bg-canvas); padding: 2rem; min-height: 100vh;">
          ${Story()}
        </div>
      `;
    },
  ],
};

export default preview;
