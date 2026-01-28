import * as React from 'react';
import { createComponent } from '@lit/react';
import {
  MonkDivider as MonkDividerWC,
  type DividerOrientation,
  type DividerVariant,
  type DividerThickness,
} from '@monkbunch/design-kit';

/**
 * Props for the Divider component
 */
export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  /** Orientation of the divider */
  orientation?: DividerOrientation;
  /** Visual style variant (line style) */
  variant?: DividerVariant;
  /** Thickness of the divider line */
  thickness?: DividerThickness;
  /** Optional label text (horizontal only) */
  label?: string;
  /** Custom divider color (overrides semantic colors) */
  color?: string;
  /** Hidden state */
  hidden?: boolean;
}

/**
 * Divider component - Visual separator with optional label
 *
 * @example
 * ```tsx
 * // Simple horizontal divider
 * <Divider />
 *
 * // With label
 * <Divider label="OR" />
 *
 * // Vertical divider
 * <Divider orientation="vertical" />
 *
 * // Dashed style
 * <Divider variant="dashed" />
 *
 * // Custom color
 * <Divider color="#ff6b6b" />
 *
 * // Thick dotted divider with label
 * <Divider variant="dotted" thickness="thick" label="CHOOSE ONE" />
 * ```
 */
export const Divider = createComponent({
  tagName: 'monk-divider',
  elementClass: MonkDividerWC,
  react: React,
});

// Re-export types
export type { DividerOrientation, DividerVariant, DividerThickness };
