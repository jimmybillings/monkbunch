#!/usr/bin/env node

/**
 * Build script for design tokens
 * Generates CSS and JavaScript tokens for light and dark themes
 */

import StyleDictionary from 'style-dictionary';
import cssThemes from './formats/css-themes.js';

// Register custom format
StyleDictionary.registerFormat({
  name: 'css/themes',
  format: cssThemes,
});

// Build configuration for light theme
const lightThemeConfig = {
  source: ['tokens/base/**/*.json', 'tokens/themes/light.json'],
  platforms: {
    'css-light': {
      transformGroup: 'css',
      prefix: 'monk',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'theme-light.css',
          format: 'css/themes',
          options: {
            selector: ':root, [data-theme="light"]',
            outputReferences: true,
          },
        },
      ],
    },
  },
};

// Build configuration for dark theme
const darkThemeConfig = {
  source: ['tokens/base/**/*.json', 'tokens/themes/dark.json'],
  platforms: {
    'css-dark': {
      transformGroup: 'css',
      prefix: 'monk',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'theme-dark.css',
          format: 'css/themes',
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: true,
          },
        },
      ],
    },
  },
};

// Build configuration for base tokens
const baseConfig = {
  source: ['tokens/base/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'monk',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'base.css',
          format: 'css/variables',
          options: {
            outputReferences: false,
          },
        },
      ],
    },
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

console.log('Building design tokens...\n');

// Build base tokens
console.log('Building base tokens...');
const baseSD = new StyleDictionary(baseConfig);
await baseSD.buildAllPlatforms();

// Build light theme
console.log('Building light theme...');
const lightSD = new StyleDictionary(lightThemeConfig);
await lightSD.buildAllPlatforms();

// Build dark theme
console.log('Building dark theme...');
const darkSD = new StyleDictionary(darkThemeConfig);
await darkSD.buildAllPlatforms();

console.log('\n✓ Design tokens built successfully!');
