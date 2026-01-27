/**
 * Style Dictionary Configuration
 * Builds design tokens for light and dark themes
 */

import cssThemes from './formats/css-themes.js';

export default {
  source: ['tokens/base/**/*.json', 'tokens/component/**/*.json'],
  platforms: {
    // Base and component tokens (always available)
    css: {
      transformGroup: 'css',
      prefix: 'monk',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },

    // Light theme (default)
    'css-light': {
      transformGroup: 'css',
      prefix: 'monk',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'theme-light.css',
          format: cssThemes,
          filter: (token) => token.filePath.includes('themes/light'),
          options: {
            selector: ':root, [data-theme="light"]',
            outputReferences: true,
          },
        },
      ],
    },

    // Dark theme
    'css-dark': {
      transformGroup: 'css',
      prefix: 'monk',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'theme-dark.css',
          format: cssThemes,
          filter: (token) => token.filePath.includes('themes/dark'),
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: true,
          },
        },
        {
          destination: 'theme-dark-media.css',
          format: cssThemes,
          filter: (token) => token.filePath.includes('themes/dark'),
          options: {
            selector: '@media (prefers-color-scheme: dark) {\n  :root',
            outputReferences: true,
          },
        },
      ],
    },

    // JavaScript tokens
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
  },
};
