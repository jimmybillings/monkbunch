/**
 * React wrappers for Monkbunch Design Kit typography components
 * These components wrap the web components for use in React applications
 */

import * as React from 'react';
import { createComponent } from '@lit/react';
import {
  MonkHeading as MonkHeadingWC,
  MonkText as MonkTextWC,
  MonkLink as MonkLinkWC,
  type HeadingLevel,
  type HeadingColor,
  type TextSize,
  type TextWeight,
  type TextColor,
  type LinkTarget,
  type TextAlign,
  type TextTransform,
} from '@monkbunch/design-kit';

/**
 * Heading component props
 */
export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * The semantic heading level to render (h1-h6)
   * @default 'h2'
   */
  level?: HeadingLevel;

  /**
   * The color variant for the heading
   * @default 'primary'
   */
  color?: HeadingColor;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: TextAlign;

  /**
   * Text transformation
   * @default 'none'
   */
  transform?: TextTransform;

  /**
   * Whether text should be italic
   * @default false
   */
  italic?: boolean;

  /**
   * Whether text should wrap
   * @default false
   */
  nowrap?: boolean;

  /**
   * Whether to truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;

  /**
   * Number of lines to clamp (for multi-line truncation)
   */
  lineClamp?: number;

  /**
   * Whether the element is hidden
   * @default false
   */
  hidden?: boolean;

  /**
   * Event handler for level changes
   */
  onChange?: (event: CustomEvent<{ level: HeadingLevel }>) => void;

  /**
   * Event handler for alignment changes
   */
  onAlignChange?: (event: CustomEvent<{ align: TextAlign }>) => void;
}

/**
 * Text component props
 */
export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Text size variant
   * @default 'md'
   */
  size?: TextSize;

  /**
   * Text weight variant
   * @default 'regular'
   */
  weight?: TextWeight;

  /**
   * Text color variant (semantic)
   * @default 'primary'
   */
  color?: TextColor;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: TextAlign;

  /**
   * Text transformation
   * @default 'none'
   */
  transform?: TextTransform;

  /**
   * Whether text should be italic
   * @default false
   */
  italic?: boolean;

  /**
   * Whether text should wrap
   * @default false
   */
  nowrap?: boolean;

  /**
   * Whether to truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;

  /**
   * Number of lines to clamp (for multi-line truncation)
   */
  lineClamp?: number;

  /**
   * Whether the element is hidden
   * @default false
   */
  hidden?: boolean;

  /**
   * Event handler for alignment changes
   */
  onAlignChange?: (event: CustomEvent<{ align: TextAlign }>) => void;
}

/**
 * Link component props
 */
export interface LinkProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * URL the link points to
   * @required
   */
  href: string;

  /**
   * Where to open the linked document
   * @default '_self'
   */
  target?: LinkTarget;

  /**
   * Whether to show underline decoration
   * @default true
   */
  underline?: boolean;

  /**
   * Download attribute - prompts to save linked URL instead of navigating
   */
  download?: string;

  /**
   * Relationship of the linked document to the current document
   * Automatically set to "noopener noreferrer" when target="_blank"
   */
  rel?: string;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: TextAlign;

  /**
   * Text transformation
   * @default 'none'
   */
  transform?: TextTransform;

  /**
   * Whether text should be italic
   * @default false
   */
  italic?: boolean;

  /**
   * Whether text should wrap
   * @default false
   */
  nowrap?: boolean;

  /**
   * Whether to truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;

  /**
   * Number of lines to clamp (for multi-line truncation)
   */
  lineClamp?: number;

  /**
   * Whether the element is hidden
   * @default false
   */
  hidden?: boolean;

  /**
   * Event handler for link clicks
   */
  onMonkClick?: (
    event: CustomEvent<{ href: string; target: LinkTarget; originalEvent: MouseEvent }>
  ) => void;

  /**
   * Event handler for alignment changes
   */
  onAlignChange?: (event: CustomEvent<{ align: TextAlign }>) => void;
}

/**
 * Heading component for displaying semantic headings (h1-h6)
 *
 * @example
 * ```tsx
 * <Heading level="h1">Main Page Title</Heading>
 * <Heading level="h2" align="center">Centered Section Heading</Heading>
 * ```
 */
export const Heading = createComponent({
  tagName: 'monk-heading',
  elementClass: MonkHeadingWC,
  react: React,
  events: {
    onChange: 'change',
    onAlignChange: 'align-change',
  },
});

/**
 * Text component for displaying body text with various size, weight, and color options
 *
 * @example
 * ```tsx
 * <Text>Default paragraph text</Text>
 * <Text size="lg" weight="semibold">Large, semi-bold text</Text>
 * <Text color="secondary" size="sm">Small secondary text</Text>
 * ```
 */
export const Text = createComponent({
  tagName: 'monk-text',
  elementClass: MonkTextWC,
  react: React,
  events: {
    onAlignChange: 'align-change',
  },
});

/**
 * Link component for creating accessible hyperlinks
 *
 * @example
 * ```tsx
 * <Link href="/about">About Us</Link>
 * <Link href="https://example.com" target="_blank">External Link</Link>
 * <Link href="/contact" underline={false}>No Underline</Link>
 * ```
 */
export const Link = createComponent({
  tagName: 'monk-link',
  elementClass: MonkLinkWC,
  react: React,
  events: {
    onMonkClick: 'monk-click',
    onAlignChange: 'align-change',
  },
});

// Re-export types for convenience
export type {
  HeadingLevel,
  TextSize,
  TextWeight,
  TextColor,
  LinkTarget,
  TextAlign,
  TextTransform,
};
