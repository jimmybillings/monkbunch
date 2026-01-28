/**
 * React wrappers for Monkbunch Design Kit layout components
 * These components wrap the web components for use in React applications
 */

import * as React from 'react';
import { createComponent } from '@lit/react';
import {
  MonkBox as MonkBoxWC,
  MonkStack as MonkStackWC,
  MonkFlex as MonkFlexWC,
  MonkContainer as MonkContainerWC,
  MonkGrid as MonkGridWC,
  type BoxDisplay,
  type StackDirection,
  type StackSpacing,
  type StackAlign,
  type StackJustify,
  type FlexDirection,
  type FlexAlign,
  type FlexJustify,
  type FlexWrap,
  type FlexGap,
  type ContainerSize,
  type GridGap,
  type GridAutoFlow,
} from '@monkbunch/design-kit';

/**
 * Box component props
 */
export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Display mode
   * @default 'block'
   */
  display?: BoxDisplay;

  /**
   * Padding (uses space scale: 0-16)
   * Can be single value or space-separated (top right bottom left)
   */
  padding?: string;

  /**
   * Margin (uses space scale: 0-16)
   */
  margin?: string;

  /**
   * Background color (semantic token name without --monk-color- prefix)
   * Example: "bg-surface" uses var(--monk-color-bg-surface)
   */
  bg?: string;

  /**
   * Border width
   */
  border?: string;

  /**
   * Border radius (uses radius scale)
   */
  radius?: string;

  /**
   * Box shadow (uses shadow scale)
   */
  shadow?: string;

  /**
   * Whether the element is hidden
   * @default false
   */
  hidden?: boolean;
}

/**
 * Stack component props
 */
export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Stack direction (vertical or horizontal)
   * @default 'vertical'
   */
  direction?: StackDirection;

  /**
   * Spacing between items (uses space scale: 0-16)
   * @default '4'
   */
  spacing?: StackSpacing;

  /**
   * Alignment on cross-axis
   * @default 'stretch'
   */
  align?: StackAlign;

  /**
   * Justification on main-axis
   * @default 'start'
   */
  justify?: StackJustify;

  /**
   * Whether items should wrap
   * @default false
   */
  wrap?: boolean;

  /**
   * Whether the element is hidden
   * @default false
   */
  hidden?: boolean;
}

/**
 * Flex component props
 */
export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Flex direction
   * @default 'row'
   */
  direction?: FlexDirection;

  /**
   * Alignment on cross-axis
   * @default 'stretch'
   */
  align?: FlexAlign;

  /**
   * Justification on main-axis
   * @default 'start'
   */
  justify?: FlexJustify;

  /**
   * Wrap behavior
   * @default 'nowrap'
   */
  wrap?: FlexWrap;

  /**
   * Gap between items (uses space scale: 0-16)
   */
  gap?: FlexGap;

  /**
   * Whether to use inline-flex instead of flex
   * @default false
   */
  inline?: boolean;

  /**
   * Whether the element is hidden
   * @default false
   */
  hidden?: boolean;
}

/**
 * Box component - The foundational layout primitive
 *
 * @example
 * ```tsx
 * <Box padding="4" bg="surface">
 *   <p>Content goes here</p>
 * </Box>
 * ```
 */
export const Box = createComponent({
  tagName: 'monk-box',
  elementClass: MonkBoxWC,
  react: React,
});

/**
 * Stack component - Layout primitive for vertical/horizontal spacing
 *
 * @example
 * ```tsx
 * <Stack spacing="4">
 *   <Text>Item 1</Text>
 *   <Text>Item 2</Text>
 *   <Text>Item 3</Text>
 * </Stack>
 * ```
 */
export const Stack = createComponent({
  tagName: 'monk-stack',
  elementClass: MonkStackWC,
  react: React,
});

/**
 * Flex component - Flexbox layout primitive
 *
 * @example
 * ```tsx
 * <Flex gap="4" align="center" justify="between">
 *   <Text>Left</Text>
 *   <Text>Right</Text>
 * </Flex>
 * ```
 */
export const Flex = createComponent({
  tagName: 'monk-flex',
  elementClass: MonkFlexWC,
  react: React,
});

/**
 * Container component props
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Maximum width of the container (maps to breakpoint tokens)
   * @default 'xl'
   */
  size?: ContainerSize;

  /**
   * Whether to center content horizontally
   * @default true
   */
  centerContent?: boolean;

  /**
   * Whether the element is hidden
   * @default false
   */
  hidden?: boolean;
}

/**
 * Grid component props
 */
export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Number of columns (can be a number or custom grid-template-columns value)
   * @example columns="3" → grid-template-columns: repeat(3, 1fr)
   * @example columns="200px 1fr 2fr" → grid-template-columns: 200px 1fr 2fr
   */
  columns?: string;

  /**
   * Number of rows (can be a number or custom grid-template-rows value)
   * @example rows="3" → grid-template-rows: repeat(3, 1fr)
   * @example rows="auto 1fr auto" → grid-template-rows: auto 1fr auto
   */
  rows?: string;

  /**
   * Gap between grid items (uses spacing scale)
   */
  gap?: GridGap;

  /**
   * Column gap (overrides gap for columns)
   */
  columnGap?: GridGap;

  /**
   * Row gap (overrides gap for rows)
   */
  rowGap?: GridGap;

  /**
   * Minimum column width for auto-fit columns
   * @example minColumnWidth="200px" → grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
   */
  minColumnWidth?: string;

  /**
   * Grid auto-flow
   * @default 'row'
   */
  autoFlow?: GridAutoFlow;

  /**
   * Whether to use inline-grid instead of grid
   * @default false
   */
  inline?: boolean;

  /**
   * Whether the element is hidden
   * @default false
   */
  hidden?: boolean;
}

/**
 * Container component - Constrains content width for responsive layouts
 *
 * @example
 * ```tsx
 * <Container size="lg">
 *   <Stack spacing="8">
 *     <Heading level="h1">Welcome</Heading>
 *     <Text>Content automatically centers and constrains at lg breakpoint.</Text>
 *   </Stack>
 * </Container>
 * ```
 */
export const Container = createComponent({
  tagName: 'monk-container',
  elementClass: MonkContainerWC,
  react: React,
});

/**
 * Grid component - CSS Grid layout primitive
 *
 * @example
 * ```tsx
 * <Grid columns="3" gap="4">
 *   <Box>1</Box>
 *   <Box>2</Box>
 *   <Box>3</Box>
 * </Grid>
 * ```
 */
export const Grid = createComponent({
  tagName: 'monk-grid',
  elementClass: MonkGridWC,
  react: React,
});

// Re-export types for convenience
export type {
  BoxDisplay,
  StackDirection,
  StackSpacing,
  StackAlign,
  StackJustify,
  FlexDirection,
  FlexAlign,
  FlexJustify,
  FlexWrap,
  FlexGap,
  ContainerSize,
  GridGap,
  GridAutoFlow,
};
