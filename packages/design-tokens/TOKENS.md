# Design Tokens Reference

Complete reference for all design tokens in the Monkbunch Design System.

## Token Structure

Tokens are organized in a 3-tier hierarchy:

1. **Base Tokens** (`tokens/base/`) - Raw values (colors, spacing, typography, radii)
2. **Semantic Tokens** (`tokens/themes/`) - Contextual meanings that adapt to theme (light/dark)
3. **Component Tokens** (`tokens/component/`) - Component-specific tokens (future)

## Semantic Color Tokens

All semantic tokens automatically adapt between light and dark themes.

### Text Colors

Use these for all text and icon colors:

| Token | CSS Variable | Usage | Light Value | Dark Value |
|-------|-------------|--------|-------------|------------|
| `text.primary` | `--monk-color-text-primary` | Main content text | gray.900 | gray.100 |
| `text.secondary` | `--monk-color-text-secondary` | Supporting text | gray.600 | gray.400 |
| `text.tertiary` | `--monk-color-text-tertiary` | De-emphasized text | gray.500 | gray.500 |
| `text.disabled` | `--monk-color-text-disabled` | Disabled state text | gray.400 | gray.600 |
| `text.on-accent` | `--monk-color-text-on-accent` | Text on colored backgrounds | white | white |
| `text.on-muted` | `--monk-color-text-on-muted` | Text on muted backgrounds | gray.700 | gray.300 |
| `text.link` | `--monk-color-text-link` | Hyperlinks | blue.500 | blue.300 |
| `text.success` | `--monk-color-text-success` | Success messages | green.600 | green.500 |
| `text.warning` | `--monk-color-text-warning` | Warning messages | yellow.600 | yellow.500 |
| `text.error` | `--monk-color-text-error` | Error messages | red.600 | red.500 |
| `text.info` | `--monk-color-text-info` | Info messages | blue.600 | blue.400 |

**Examples:**
```css
/* Component styles */
.heading {
  color: var(--monk-color-text-primary);
}

.helper-text {
  color: var(--monk-color-text-secondary);
}

.button-primary {
  color: var(--monk-color-text-on-accent);
}
```

### Background Colors

Use these for all background colors:

| Token | CSS Variable | Usage | Light Value | Dark Value |
|-------|-------------|--------|-------------|------------|
| `bg.canvas` | `--monk-color-bg-canvas` | Page background | white | gray.900 |
| `bg.surface` | `--monk-color-bg-surface` | Cards, panels, modals | white | gray.800 |
| `bg.surface-raised` | `--monk-color-bg-surface-raised` | Dropdowns, popovers | white | gray.700 |
| `bg.subtle` | `--monk-color-bg-subtle` | Subtle hover, alt rows | gray.50 | gray.800 |
| `bg.muted` | `--monk-color-bg-muted` | Muted/disabled | gray.100 | gray.700 |
| `bg.hover` | `--monk-color-bg-hover` | Hover state | gray.100 | gray.700 |
| `bg.active` | `--monk-color-bg-active` | Active/pressed state | gray.200 | gray.600 |
| `bg.accent` | `--monk-color-bg-accent` | Accent backgrounds | blue.500 | blue.500 |
| `bg.accent-subtle` | `--monk-color-bg-accent-subtle` | Subtle accent | blue.50 | blue.900 |
| `bg.accent-hover` | `--monk-color-bg-accent-hover` | Accent hover | blue.600 | blue.600 |
| `bg.accent-active` | `--monk-color-bg-accent-active` | Accent active | blue.700 | blue.700 |

**Examples:**
```css
/* Layering */
body {
  background: var(--monk-color-bg-canvas);
}

.card {
  background: var(--monk-color-bg-surface);
}

.dropdown {
  background: var(--monk-color-bg-surface-raised);
}

/* States */
.button:hover {
  background: var(--monk-color-bg-hover);
}

.button-primary {
  background: var(--monk-color-bg-accent);
}
```

### Border Colors

Use these for all borders and dividers:

| Token | CSS Variable | Usage | Light Value | Dark Value |
|-------|-------------|--------|-------------|------------|
| `border.default` | `--monk-color-border-default` | Standard borders | gray.300 | gray.600 |
| `border.muted` | `--monk-color-border-muted` | Subtle borders, dividers | gray.200 | gray.700 |
| `border.emphasized` | `--monk-color-border-emphasized` | Strong borders | gray.400 | gray.500 |
| `border.disabled` | `--monk-color-border-disabled` | Disabled state | gray.200 | gray.700 |
| `border.hover` | `--monk-color-border-hover` | Hover state | gray.400 | gray.500 |
| `border.focus` | `--monk-color-border-focus` | Focus state | blue.500 | blue.400 |
| `border.success` | `--monk-color-border-success` | Success state | green.500 | green.500 |
| `border.warning` | `--monk-color-border-warning` | Warning state | yellow.500 | yellow.500 |
| `border.error` | `--monk-color-border-error` | Error state | red.500 | red.500 |
| `border.info` | `--monk-color-border-info` | Info state | blue.500 | blue.400 |

**Examples:**
```css
.input {
  border: 1px solid var(--monk-color-border-default);
}

.input:hover {
  border-color: var(--monk-color-border-hover);
}

.input:focus {
  border-color: var(--monk-color-border-focus);
}

.input[aria-invalid="true"] {
  border-color: var(--monk-color-border-error);
}
```

### Brand Colors

| Token | CSS Variable | Usage |
|-------|-------------|--------|
| `brand.primary` | `--monk-color-brand-primary` | Primary brand color |

## Focus Ring Tokens

Dedicated tokens for consistent focus indicators across all interactive elements:

| Token | CSS Variable | Value |
|-------|-------------|--------|
| `focus.ring.color` | `--monk-focus-ring-color` | blue.500 (light), blue.400 (dark) |
| `focus.ring.width` | `--monk-focus-ring-width` | 2px |
| `focus.ring.offset` | `--monk-focus-ring-offset` | 2px |

**Example:**
```css
:host(:focus-visible) {
  outline: var(--monk-focus-ring-width) solid var(--monk-focus-ring-color);
  outline-offset: var(--monk-focus-ring-offset);
}
```

## Base Tokens (Non-Semantic)

These tokens don't change with theme and are used as building blocks for semantic tokens.

### Colors

Full color palette with 50-900 scales for blue and gray, plus semantic colors (green, red, yellow).

**Gray Scale:**
- `gray.50` through `gray.900`

**Blue Scale:**
- `blue.50` through `blue.900`

**Semantic Colors:**
- `green.500`, `green.600`, `green.700`
- `red.500`, `red.600`, `red.700`
- `yellow.500`, `yellow.600`, `yellow.700`

**Primitives:**
- `white` (#ffffff)
- `black` (#1c1d1f)

### Spacing

Uses a 4px grid system:

| Token | Value |
|-------|-------|
| `space.0` | 0px |
| `space.1` | 4px |
| `space.2` | 8px |
| `space.3` | 12px |
| `space.4` | 16px |
| `space.5` | 20px |
| `space.6` | 24px |
| `space.8` | 32px |
| `space.10` | 40px |
| `space.12` | 48px |
| `space.16` | 64px |

### Typography

**Font Families:**
- `font.family.base` - System font stack
- `font.family.mono` - Monospace font stack

**Font Sizes:**
- `font.size.xs` - 12px
- `font.size.sm` - 14px
- `font.size.md` - 16px
- `font.size.lg` - 18px
- `font.size.xl` - 20px
- `font.size.2xl` - 24px
- `font.size.3xl` - 30px
- `font.size.4xl` - 36px

**Font Weights:**
- `font.weight.regular` - 400
- `font.weight.medium` - 500
- `font.weight.semibold` - 600
- `font.weight.bold` - 700

**Line Heights:**
- `font.lineHeight.tight` - 1.2
- `font.lineHeight.normal` - 1.5
- `font.lineHeight.relaxed` - 1.75

### Border Radius

- `radius.none` - 0px
- `radius.sm` - 2px
- `radius.md` - 4px
- `radius.lg` - 8px
- `radius.xl` - 12px
- `radius.full` - 9999px

## Component Usage Patterns

### Button (Primary)
```css
.button-primary {
  background: var(--monk-color-bg-accent);
  color: var(--monk-color-text-on-accent);
  border: none;
}

.button-primary:hover {
  background: var(--monk-color-bg-accent-hover);
}

.button-primary:focus-visible {
  outline: var(--monk-focus-ring-width) solid var(--monk-focus-ring-color);
  outline-offset: var(--monk-focus-ring-offset);
}
```

### Button (Secondary)
```css
.button-secondary {
  background: transparent;
  color: var(--monk-color-text-primary);
  border: 1px solid var(--monk-color-border-default);
}

.button-secondary:hover {
  background: var(--monk-color-bg-hover);
  border-color: var(--monk-color-border-hover);
}
```

### Input Field
```css
.input {
  background: var(--monk-color-bg-surface);
  color: var(--monk-color-text-primary);
  border: 1px solid var(--monk-color-border-default);
}

.input::placeholder {
  color: var(--monk-color-text-tertiary);
}

.input:hover {
  border-color: var(--monk-color-border-hover);
}

.input:focus {
  border-color: var(--monk-color-border-focus);
  outline: var(--monk-focus-ring-width) solid var(--monk-focus-ring-color);
  outline-offset: var(--monk-focus-ring-offset);
}

.input[aria-invalid="true"] {
  border-color: var(--monk-color-border-error);
}

.input:disabled {
  background: var(--monk-color-bg-muted);
  color: var(--monk-color-text-disabled);
  border-color: var(--monk-color-border-disabled);
}
```

### Card
```css
.card {
  background: var(--monk-color-bg-surface);
  border: 1px solid var(--monk-color-border-muted);
  border-radius: var(--monk-radius-lg);
}
```

## Responsive Design Tokens

### Breakpoints

Use these for responsive media queries (mobile-first):

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|--------|
| `breakpoint.xs` | `--monk-breakpoint-xs` | 0px | Extra small devices |
| `breakpoint.sm` | `--monk-breakpoint-sm` | 640px | Small devices (landscape phones) |
| `breakpoint.md` | `--monk-breakpoint-md` | 768px | Medium devices (tablets) |
| `breakpoint.lg` | `--monk-breakpoint-lg` | 1024px | Large devices (desktops) |
| `breakpoint.xl` | `--monk-breakpoint-xl` | 1280px | Extra large devices |
| `breakpoint.2xl` | `--monk-breakpoint-2xl` | 1536px | 2X Extra large devices |

**Examples:**
```css
/* Mobile-first responsive design */
.container {
  padding: 16px;
}

@media (min-width: 768px) {
  .container {
    padding: 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 32px;
  }
}
```

### Container Widths

Use these for max-width containers:

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `container.sm` | `--monk-container-sm` | 640px |
| `container.md` | `--monk-container-md` | 768px |
| `container.lg` | `--monk-container-lg` | 1024px |
| `container.xl` | `--monk-container-xl` | 1280px |
| `container.2xl` | `--monk-container-2xl` | 1536px |
| `container.full` | `--monk-container-full` | 100% |

**Examples:**
```css
.container {
  max-width: var(--monk-container-lg);
  margin: 0 auto;
}

.container-full {
  max-width: var(--monk-container-full);
}
```

## Visual Design Tokens

### Shadows (Elevation)

Use these for visual hierarchy and elevation:

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|--------|
| `shadow.none` | `--monk-shadow-none` | none | No shadow |
| `shadow.sm` | `--monk-shadow-sm` | 0 1px 2px 0 rgba(0,0,0,0.05) | Subtle elevation |
| `shadow.md` | `--monk-shadow-md` | 0 4px 6px -1px rgba(0,0,0,0.1) | Cards, panels |
| `shadow.lg` | `--monk-shadow-lg` | 0 10px 15px -3px rgba(0,0,0,0.1) | Dropdowns |
| `shadow.xl` | `--monk-shadow-xl` | 0 20px 25px -5px rgba(0,0,0,0.1) | Modals |
| `shadow.2xl` | `--monk-shadow-2xl` | 0 25px 50px -12px rgba(0,0,0,0.25) | Large modals |
| `shadow.inner` | `--monk-shadow-inner` | inset 0 2px 4px 0 rgba(0,0,0,0.05) | Inner shadow |

#### Semantic Shadows

Theme-aware shadow tokens that adapt to light/dark mode:

| Token | CSS Variable | Light Value | Dark Value |
|-------|-------------|-------------|------------|
| `shadow.card` | `--monk-shadow-card` | shadow.md | shadow.lg |
| `shadow.dropdown` | `--monk-shadow-dropdown` | shadow.lg | shadow.xl |
| `shadow.modal` | `--monk-shadow-modal` | shadow.2xl | shadow.2xl |

**Examples:**
```css
.card {
  box-shadow: var(--monk-shadow-card);
}

.dropdown {
  box-shadow: var(--monk-shadow-dropdown);
}

.modal {
  box-shadow: var(--monk-shadow-modal);
}
```

### Z-Index Scale

Use these for proper layering of stacked elements:

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|--------|
| `z-index.hide` | `--monk-z-index-hide` | -1 | Hidden behind content |
| `z-index.base` | `--monk-z-index-base` | 0 | Normal flow |
| `z-index.dropdown` | `--monk-z-index-dropdown` | 1000 | Dropdown menus |
| `z-index.sticky` | `--monk-z-index-sticky` | 1100 | Sticky headers |
| `z-index.fixed` | `--monk-z-index-fixed` | 1200 | Fixed positioning |
| `z-index.overlay` | `--monk-z-index-overlay` | 1300 | Modal overlays |
| `z-index.modal` | `--monk-z-index-modal` | 1400 | Modal dialogs |
| `z-index.popover` | `--monk-z-index-popover` | 1500 | Popovers |
| `z-index.toast` | `--monk-z-index-toast` | 1600 | Toast notifications |
| `z-index.tooltip` | `--monk-z-index-tooltip` | 1700 | Tooltips |

**Examples:**
```css
.dropdown {
  z-index: var(--monk-z-index-dropdown);
}

.modal-overlay {
  z-index: var(--monk-z-index-overlay);
}

.modal {
  z-index: var(--monk-z-index-modal);
}

.tooltip {
  z-index: var(--monk-z-index-tooltip);
}
```

## Animation Tokens

### Duration

Use these for consistent animation timing:

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|--------|
| `duration.instant` | `--monk-duration-instant` | 0ms | Immediate changes |
| `duration.fast` | `--monk-duration-fast` | 150ms | Quick transitions |
| `duration.normal` | `--monk-duration-normal` | 250ms | Standard animations |
| `duration.slow` | `--monk-duration-slow` | 350ms | Deliberate animations |
| `duration.slower` | `--monk-duration-slower` | 500ms | Slow transitions |

### Easing

Use these for animation easing curves:

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|--------|
| `easing.linear` | `--monk-easing-linear` | linear | Constant speed |
| `easing.ease-in` | `--monk-easing-ease-in` | cubic-bezier(0.4, 0, 1, 1) | Accelerating |
| `easing.ease-out` | `--monk-easing-ease-out` | cubic-bezier(0, 0, 0.2, 1) | Decelerating |
| `easing.ease-in-out` | `--monk-easing-ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | Smooth |
| `easing.bounce` | `--monk-easing-bounce` | cubic-bezier(0.68, -0.55, 0.265, 1.55) | Bouncy effect |

**Examples:**
```css
.button {
  transition: background var(--monk-duration-fast) var(--monk-easing-ease-out);
}

.modal {
  animation: slideIn var(--monk-duration-normal) var(--monk-easing-ease-in-out);
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: var(--monk-duration-instant) !important;
    transition-duration: var(--monk-duration-instant) !important;
  }
}
```

## Theme Switching

Themes are controlled via a `data-theme` attribute on the document root:

```javascript
// Light theme (default)
document.documentElement.setAttribute('data-theme', 'light');

// Dark theme
document.documentElement.setAttribute('data-theme', 'dark');

// Or use the theme utility
import { setTheme } from '@monkbunch/design-kit/utils/theme';
setTheme('dark');
```

All semantic tokens automatically update when the theme changes.
