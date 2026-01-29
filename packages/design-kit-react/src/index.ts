/**
 * Monkbunch Design Kit - React Components
 * React wrappers for Lit web components with accessibility built-in
 *
 * @packageDocumentation
 */

// Typography components
export {
  Heading,
  Text,
  Link,
  type HeadingProps,
  type TextProps,
  type LinkProps,
  type HeadingLevel,
  type TextSize,
  type TextWeight,
  type TextColor,
  type LinkTarget,
  type TextAlign,
  type TextTransform,
} from './typography.js';

// Layout components
export {
  Box,
  Stack,
  Flex,
  Container,
  Grid,
  type BoxProps,
  type StackProps,
  type FlexProps,
  type ContainerProps,
  type GridProps,
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
} from './layout.js';

// Button component
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonColorScheme,
  type ButtonSize,
} from './button.js';

// Badge component
export {
  Badge,
  type BadgeProps,
  type BadgeVariant,
  type BadgeColorScheme,
  type BadgeSize,
} from './badge.js';

// Divider component
export {
  Divider,
  type DividerProps,
  type DividerOrientation,
  type DividerVariant,
  type DividerThickness,
} from './divider.js';

// Card component
export { Card, type CardProps, type CardVariant } from './card.js';

// Input components
export {
  TextInput,
  type TextInputProps,
  type InputSize,
  type InputVariant,
} from './text-input.js';
export { EmailInput, type EmailInputProps } from './email-input.js';
export { PasswordInput, type PasswordInputProps } from './password-input.js';
