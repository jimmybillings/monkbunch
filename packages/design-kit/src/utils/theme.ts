/**
 * Theme utility for managing light/dark mode
 */

export type Theme = 'light' | 'dark' | 'auto';

/**
 * Get the current theme from the data attribute
 */
export function getCurrentTheme(): Theme {
  const dataTheme = document.documentElement.getAttribute('data-theme');
  if (dataTheme === 'dark' || dataTheme === 'light') {
    return dataTheme;
  }
  return 'auto';
}

/**
 * Set the theme on the document root element
 * @param theme - 'light', 'dark', or 'auto' (follows system preference)
 */
export function setTheme(theme: Theme): void {
  if (theme === 'auto') {
    // Remove the attribute to use default/system preference
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Store preference in localStorage
  try {
    localStorage.setItem('monk-theme', theme);
  } catch (e) {
    // localStorage might not be available
    console.warn('Could not save theme preference:', e);
  }
}

/**
 * Toggle between light and dark theme
 */
export function toggleTheme(): void {
  const current = getCurrentTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

/**
 * Initialize theme from localStorage or system preference
 */
export function initializeTheme(): void {
  try {
    const stored = localStorage.getItem('monk-theme') as Theme | null;
    if (stored && (stored === 'light' || stored === 'dark' || stored === 'auto')) {
      setTheme(stored);
      return;
    }
  } catch (e) {
    // localStorage might not be available
  }

  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Don't set attribute, let CSS handle it via media query
    setTheme('auto');
  }
}

/**
 * Listen for system theme preference changes
 * @param callback - Function to call when system preference changes
 * @returns Cleanup function to remove the listener
 */
export function watchSystemTheme(callback: (isDark: boolean) => void): () => void {
  if (!window.matchMedia) {
    return () => {}; // No-op cleanup
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent) => callback(e.matches);

  // Modern API
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }

  // Legacy API
  mediaQuery.addListener(handler);
  return () => mediaQuery.removeListener(handler);
}
