import * as React from 'react';
import { createComponent, EventName } from '@lit/react';
import { MonkCard as MonkCardWC, type CardVariant } from '@monkbunch/design-kit';

/**
 * Props for the Card component
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style variant */
  variant?: CardVariant;
  /** Whether the card is interactive (adds hover effects) */
  interactive?: boolean;
  /** Padding using space scale */
  padding?: string;
  /** Border radius */
  radius?: string;
  /** Shadow level (for elevated variant) */
  shadow?: string;
  /** Custom background color (overrides variant default) */
  bg?: string;
  /** Hidden state */
  hidden?: boolean;
  /** Children content */
  children?: React.ReactNode;
  /** Click handler for interactive cards */
  onCardClick?: (event: CustomEvent) => void;
}

/**
 * Card component - Container for related content and actions
 *
 * @example
 * ```tsx
 * // Basic elevated card
 * <Card>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 *
 * // Outline card
 * <Card variant="outline">
 *   <h3>Card Title</h3>
 *   <p>Card with border</p>
 * </Card>
 *
 * // Interactive card
 * <Card interactive onCardClick={(e) => console.log('Clicked!')}>
 *   <h3>Clickable Card</h3>
 *   <p>This card responds to clicks</p>
 * </Card>
 *
 * // Custom styling
 * <Card padding="8" radius="lg" shadow="xl">
 *   <h3>Custom Card</h3>
 *   <p>With custom spacing and shadow</p>
 * </Card>
 *
 * // Custom background
 * <Card bg="#fef3c7">
 *   <h3>Colored Card</h3>
 *   <p>With custom background color</p>
 * </Card>
 * ```
 */
export const Card = createComponent({
  tagName: 'monk-card',
  elementClass: MonkCardWC,
  react: React,
  events: {
    onCardClick: 'card-click' as EventName<CustomEvent>,
  },
});

// Re-export types
export type { CardVariant };
