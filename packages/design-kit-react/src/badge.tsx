import * as React from 'react';
import { createComponent } from '@lit/react';
import {
  MonkBadge as MonkBadgeWC,
  type BadgeVariant,
  type BadgeColorScheme,
  type BadgeSize,
} from '@monkbunch/design-kit';

/**
 * Props for the Badge component
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Semantic color scheme */
  colorScheme?: BadgeColorScheme;
  /** Badge size */
  size?: BadgeSize;
  /** Custom background color (overrides colorScheme) */
  bg?: string;
  /** Custom text color (overrides colorScheme) */
  color?: string;
  /** Custom border color (overrides colorScheme, for outline variant) */
  borderColor?: string;
  /** Hidden state */
  hidden?: boolean;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Badge component - Status indicators and labels
 *
 * @example
 * ```tsx
 * // Status badge
 * <Badge colorScheme="success">Active</Badge>
 *
 * // Notification count
 * <Badge colorScheme="error" size="sm">12</Badge>
 *
 * // Category tag
 * <Badge variant="subtle" colorScheme="primary">TypeScript</Badge>
 *
 * // Role indicator
 * <Badge variant="outline" colorScheme="info">Admin</Badge>
 *
 * // Custom colors
 * <Badge bg="#ff6b6b" color="white">Custom Red</Badge>
 * <Badge variant="outline" borderColor="#a855f7" color="#a855f7">Purple</Badge>
 * ```
 */
export const Badge = createComponent({
  tagName: 'monk-badge',
  elementClass: MonkBadgeWC,
  react: React,
});

// Re-export types
export type { BadgeVariant, BadgeColorScheme, BadgeSize };
