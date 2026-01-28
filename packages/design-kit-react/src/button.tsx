import * as React from 'react';
import { createComponent } from '@lit/react';
import {
  MonkButton as MonkButtonWC,
  type ButtonVariant,
  type ButtonColorScheme,
  type ButtonSize,
} from '@monkbunch/design-kit';

/**
 * Props for the Button component
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Semantic color scheme */
  colorScheme?: ButtonColorScheme;
  /** Button size */
  size?: ButtonSize;
  /** Disabled state */
  disabled?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Button type for forms */
  type?: 'button' | 'submit' | 'reset';
  /** Hidden state */
  hidden?: boolean;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Button component - Interactive element for user actions
 *
 * @example
 * ```tsx
 * // Primary action
 * <Button>Save Changes</Button>
 *
 * // Secondary action
 * <Button variant="outline" colorScheme="neutral">Cancel</Button>
 *
 * // Success action
 * <Button colorScheme="success">Approve</Button>
 *
 * // Destructive action
 * <Button colorScheme="error">Delete</Button>
 *
 * // Full width button
 * <Button fullWidth>Submit</Button>
 * ```
 */
export const Button = createComponent({
  tagName: 'monk-button',
  elementClass: MonkButtonWC,
  react: React,
});

// Re-export types
export type { ButtonVariant, ButtonColorScheme, ButtonSize };
