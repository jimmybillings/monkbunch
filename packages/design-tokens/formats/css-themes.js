/**
 * Custom Style Dictionary format for generating theme-aware CSS variables
 * Generates CSS custom properties scoped to theme selectors
 */

/**
 * Format CSS variables for a specific theme
 * @param {object} dictionary - Style Dictionary object
 * @param {object} options - Format options
 * @returns {string} - CSS output
 */
export default function cssThemes({ dictionary, options }) {
  const { selector = ':root', outputReferences = true } = options;

  // Helper to get the value with optional references
  const getValue = (token) => {
    if (outputReferences && token.original.value.startsWith('{')) {
      // Convert token reference to CSS variable reference
      const ref = token.original.value
        .replace(/\{|\}/g, '')
        .split('.')
        .join('-');
      return `var(--monk-${ref})`;
    }
    return token.value;
  };

  // Generate CSS
  const cssVariables = dictionary.allTokens
    .map((token) => {
      const value = getValue(token);
      const comment = token.comment ? `  /* ${token.comment} */\n` : '';
      return `${comment}  --monk-${token.path.join('-')}: ${value};`;
    })
    .join('\n');

  return `${selector} {\n${cssVariables}\n}\n`;
}
