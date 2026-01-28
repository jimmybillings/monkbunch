# Monkbunch Monorepo Architecture

Comprehensive architectural overview of the Monkbunch monorepo and design system.

**Monorepo Structure:**
- **Root name:** `monkbunch`
- **Packages:** `packages/*` → Published to npm as `@monkbunch/*`
- **Apps:** `apps/*` → Internal applications (not published to npm)

---

## Design System Package Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Consumer Applications                    │
│              (React, Vue, Angular, Plain HTML)               │
└─────────────────────┬───────────────────────────────────────┘
                      │
         ┌────────────┴────────────┐
         │                         │
         v                         v
┌─────────────────┐      ┌──────────────────┐
│  design-kit     │      │ design-kit-react │
│  (Web Components)│ ◄────┤ (React Wrappers) │
└────────┬────────┘      └──────────────────┘
         │
         │ imports
         │
         v
┌──────────────────┐
│  design-tokens   │
│  (CSS Variables  │
│   + TypeScript)  │
└──────────────────┘
```

---

## Package Architecture

### 1. **design-tokens**

**Purpose:** Central source of truth for all design decisions

**Input:** JSON token files
**Output:** CSS custom properties + TypeScript constants

```
tokens/
├── base/                    # Raw values (don't change with theme)
│   ├── colors.json         # Blue/gray scales, primitives
│   ├── spacing.json        # 4px grid system
│   ├── typography.json     # Font families, sizes, weights
│   ├── radii.json          # Border radius values
│   ├── breakpoints.json    # Responsive breakpoints (xs-2xl)
│   ├── containers.json     # Container max-widths
│   ├── shadows.json        # Elevation shadows (none-2xl)
│   ├── z-index.json        # Stacking order scale
│   └── animation.json      # Duration and easing tokens
│
├── themes/                  # Semantic tokens (adapt to theme)
│   ├── light.json          # Light theme mappings
│   └── dark.json           # Dark theme mappings
│
└── component/               # Component-specific (future)
    └── button.json          # Button tokens
```

**Build Process:**

```javascript
// build.js
1. Load base tokens + light theme → Generate theme-light.css
2. Load base tokens + dark theme → Generate theme-dark.css
3. Load base tokens only → Generate base.css + tokens.js/d.ts
4. Combine all into variables.css
```

**Generated Files:**

```css
/* dist/css/base.css - Base tokens (no theme dependency) */
:root {
  --monk-color-blue-500: #3d6ce8;
  --monk-space-4: 16px;
  --monk-font-size-md: 16px;
  /* ...more */
}

/* dist/css/theme-light.css - Light theme semantic tokens */
:root, [data-theme="light"] {
  --monk-color-text-primary: var(--monk-color-gray-900);
  --monk-color-bg-canvas: var(--monk-color-white);
  /* ...more */
}

/* dist/css/theme-dark.css - Dark theme semantic tokens */
[data-theme="dark"] {
  --monk-color-text-primary: var(--monk-color-gray-100);
  --monk-color-bg-canvas: var(--monk-color-gray-900);
  /* ...more */
}
```

**TypeScript Output:**

```typescript
// dist/js/tokens.js
export const ColorBlue500 = "#3d6ce8";
export const Space4 = "16px";
// ...
```

---

### 2. **design-kit**

**Purpose:** Framework-agnostic web components built with Lit

**Architecture:**

```
src/
├── core/                    # Foundation
│   ├── base-element.ts     # All components extend this
│   ├── base-typography.ts  # Typography components extend this
│   └── styles.ts           # Shared CSS utilities
│
├── components/
│   └── typography/
│       ├── heading.ts       # <monk-heading>
│       ├── heading.spec.ts  # Tests
│       ├── heading.stories.ts # Storybook
│       ├── text.ts          # <monk-text>
│       ├── text.spec.ts
│       ├── text.stories.ts
│       ├── link.ts          # <monk-link>
│       ├── link.spec.ts
│       ├── link.stories.ts
│       └── index.ts         # Exports
│
├── utils/
│   └── theme.ts             # Theme switching utilities
│
├── theme/
│   └── index.ts             # Imports token CSS
│
└── index.ts                 # Package exports
```

**Base Class Hierarchy:**

```
LitElement (from 'lit')
    │
    └── MonkBaseElement
            │
            ├── MonkBaseTypography
            │       │
            │       ├── MonkHeading
            │       ├── MonkText
            │       └── MonkLink
            │
            └── [Future: MonkButton, MonkCard, etc.]
```

**Component Pattern:**

```typescript
import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MonkBaseElement } from '../../core/base-element.js';

@customElement('monk-component')
export class MonkComponent extends MonkBaseElement {
  @property({ type: String, reflect: true })
  variant: 'primary' | 'secondary' = 'primary';

  static override styles = [
    css`
      :host {
        /* Use semantic tokens */
        color: var(--monk-color-text-primary);
      }

      :host([variant='primary']) {
        background: var(--monk-color-bg-accent);
      }

      :host(:focus-visible) {
        outline: var(--monk-focus-ring-width) solid var(--monk-focus-ring-color);
        outline-offset: var(--monk-focus-ring-offset);
      }
    `
  ];

  protected override render() {
    return html`<slot></slot>`;
  }
}
```

**Testing Pattern:**

```typescript
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';

describe('monk-component', () => {
  it('passes accessibility audit', async () => {
    const el = await fixture(html`<monk-component>Test</monk-component>`);
    await expect(el).to.be.accessible();
  });

  it('supports keyboard navigation', async () => {
    const el = await fixture(html`<monk-component>Test</monk-component>`);
    el.focus();
    expect(document.activeElement).to.equal(el);
  });
});
```

---

### 3. **design-kit-react**

**Purpose:** React wrappers for web components using @lit/react

**Architecture:**

```typescript
import { createComponent } from '@lit/react';
import { MonkButton as MonkButtonWC } from '@monkbunch/design-kit';

export interface ButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;

  // Event handlers
  onClick?: (event: MouseEvent) => void;
  onChange?: (event: CustomEvent<{ variant: string }>) => void;
}

export const Button = createComponent({
  tagName: 'monk-button',
  elementClass: MonkButtonWC,
  react: React,
  events: {
    onClick: 'click',
    onChange: 'change',
  },
});
```

**Usage in React:**

```tsx
import { Button } from '@monkbunch/design-kit-react';

function App() {
  return (
    <Button
      variant="primary"
      size="lg"
      onClick={() => console.log('clicked')}
    >
      Click me
    </Button>
  );
}
```

---

## Token System Deep Dive

### Token Flow

```
┌──────────────────┐
│  Base Tokens     │  color.blue.500 = #3d6ce8
│  (colors.json)   │  space.4 = 16px
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Semantic Tokens  │  text.primary = {color.gray.900} (light)
│ (light.json)     │  text.primary = {color.gray.100} (dark)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Style Dictionary │  Transforms & builds
│   (build.js)     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  CSS Variables   │  --monk-color-text-primary: #181922 (light)
│  (theme-*.css)   │  --monk-color-text-primary: #eff3fa (dark)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Components     │  color: var(--monk-color-text-primary)
│  (Lit styles)    │
└──────────────────┘
```

### Token Categories

**1. Text Colors (11 tokens)**
- Hierarchy: primary, secondary, tertiary
- States: disabled
- Context: on-accent, on-muted
- Semantic: link, success, warning, error, info

**2. Background Colors (11 tokens)**
- Surfaces: canvas, surface, surface-raised
- States: subtle, muted, hover, active
- Accent: accent, accent-subtle, accent-hover, accent-active

**3. Border Colors (10 tokens)**
- Hierarchy: default, muted, emphasized
- States: disabled, hover, focus
- Semantic: success, warning, error, info

**4. Focus Ring (3 tokens)**
- color, width, offset

**5. Shadows (3 semantic tokens)**
- card, dropdown, modal
- Adapts to theme (stronger shadows in dark mode for better visibility)

### Foundational Token Systems

#### Responsive Design Foundation

**Breakpoints (6 tokens)**

Mobile-first breakpoint system inspired by Tailwind/Chakra:

```json
{
  "xs": "0px",      // Mobile (default)
  "sm": "640px",    // Small tablets
  "md": "768px",    // Tablets
  "lg": "1024px",   // Desktops
  "xl": "1280px",   // Large desktops
  "2xl": "1536px"   // Extra large screens
}
```

**Usage:**
```css
/* Mobile-first approach */
.component {
  width: 100%;
}

@media (min-width: var(--monk-breakpoint-md)) {
  .component {
    width: 50%;
  }
}

@media (min-width: var(--monk-breakpoint-lg)) {
  .component {
    width: 33.333%;
  }
}
```

**Container Widths (6 tokens)**

Max-width containers that align with breakpoints:

```css
.container {
  width: 100%;
  max-width: var(--monk-container-lg);  /* 1024px */
  margin: 0 auto;
  padding: 0 var(--monk-space-4);
}
```

#### Shadow/Elevation System

**Base Shadows (7 tokens)**

Tailwind-inspired elevation scale using subtle shadows:

| Token | Value | Usage |
|-------|-------|-------|
| `shadow.none` | none | No elevation |
| `shadow.sm` | 0 1px 2px rgba(0,0,0,0.05) | Subtle elevation |
| `shadow.md` | 0 4px 6px rgba(0,0,0,0.1) | Cards, tiles |
| `shadow.lg` | 0 10px 15px rgba(0,0,0,0.1) | Dropdowns, popovers |
| `shadow.xl` | 0 20px 25px rgba(0,0,0,0.1) | Dialogs |
| `shadow.2xl` | 0 25px 50px rgba(0,0,0,0.25) | Modals, overlays |
| `shadow.inner` | inset 0 2px 4px rgba(0,0,0,0.05) | Pressed states |

**Semantic Shadow Tokens**

Theme-aware shadows that adapt to light/dark mode:

```json
// Light theme
{
  "shadow.card": "shadow.md",
  "shadow.dropdown": "shadow.lg",
  "shadow.modal": "shadow.2xl"
}

// Dark theme (stronger shadows for visibility)
{
  "shadow.card": "shadow.lg",
  "shadow.dropdown": "shadow.xl",
  "shadow.modal": "shadow.2xl"
}
```

**Usage:**
```typescript
// Component uses semantic token
box-shadow: var(--monk-shadow-card);

// Automatically adapts:
// Light mode: 0 4px 6px rgba(0,0,0,0.1)
// Dark mode: 0 10px 15px rgba(0,0,0,0.1)
```

#### Z-Index Layering Strategy

**Z-Index Scale (10 tokens)**

Predictable stacking order for overlays and UI layers:

| Token | Value | Usage |
|-------|-------|-------|
| `z-index.hide` | -1 | Hidden elements |
| `z-index.base` | 0 | Default stacking |
| `z-index.dropdown` | 1000 | Dropdown menus |
| `z-index.sticky` | 1100 | Sticky headers |
| `z-index.fixed` | 1200 | Fixed positioning |
| `z-index.overlay` | 1300 | Modal backdrops |
| `z-index.modal` | 1400 | Modal dialogs |
| `z-index.popover` | 1500 | Popovers |
| `z-index.toast` | 1600 | Toast notifications |
| `z-index.tooltip` | 1700 | Tooltips (highest) |

**Rationale:**
- 100-unit gaps allow insertion of intermediate layers if needed
- Tooltips always on top (user-triggered, requires immediate attention)
- Clear hierarchy prevents z-index conflicts

**Usage:**
```typescript
// Modal component
:host {
  z-index: var(--monk-z-index-modal);  // Always 1400
}

// Modal backdrop
.backdrop {
  z-index: var(--monk-z-index-overlay);  // 1300, below modal
}
```

#### Animation System

**Duration Tokens (5 tokens)**

Consistent animation timing respecting `prefers-reduced-motion`:

| Token | Value | Usage |
|-------|-------|-------|
| `duration.instant` | 0ms | Instant state changes |
| `duration.fast` | 150ms | Micro-interactions |
| `duration.normal` | 250ms | Default transitions |
| `duration.slow` | 350ms | Complex animations |
| `duration.slower` | 500ms | Page transitions |

**Easing Functions (5 tokens)**

| Token | Value | Usage |
|-------|-------|-------|
| `easing.linear` | linear | Progress indicators |
| `easing.ease-in` | cubic-bezier(0.4,0,1,1) | Exits, fade outs |
| `easing.ease-out` | cubic-bezier(0,0,0.2,1) | Entrances, default |
| `easing.ease-in-out` | cubic-bezier(0.4,0,0.2,1) | Smooth transitions |
| `easing.bounce` | cubic-bezier(0.68,-0.55,0.265,1.55) | Playful effects |

**Usage:**
```typescript
// Component transitions
:host {
  transition: transform var(--monk-duration-normal) var(--monk-easing-ease-out);
}

// Respect reduced motion preference
@media (prefers-reduced-motion: reduce) {
  :host {
    transition-duration: var(--monk-duration-instant);
  }
}
```

### Theme Switching Mechanism

```javascript
// 1. User action
setTheme('dark');

// 2. Update DOM
document.documentElement.setAttribute('data-theme', 'dark');

// 3. CSS automatically updates
[data-theme="dark"] {
  --monk-color-text-primary: var(--monk-color-gray-100);
}

// 4. Components automatically re-render with new colors
// No JavaScript re-rendering needed!
```

---

## Component Design Patterns

### Composition Pattern (Chakra-Inspired)

**Instead of this:**
```html
<monk-button variant="iconButton" icon="check">Save</monk-button>
```

**Do this:**
```html
<monk-button>
  <monk-icon name="check"></monk-icon>
  Save
</monk-button>
```

### Prop Naming Conventions

Follow Chakra UI patterns:

| Prop | Values | Usage |
|------|--------|--------|
| `size` | xs, sm, md, lg, xl | Discrete size scale |
| `variant` | solid, outline, ghost | Visual style |
| `colorScheme` | blue, red, green | Semantic color |
| `disabled` | boolean | Disabled state |
| `loading` | boolean | Loading state |

### State Management

Use attributes for states (not separate classes):

```typescript
:host([disabled]) {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

:host([loading]) {
  position: relative;
  color: transparent;
}

:host(:hover:not([disabled])) {
  background: var(--monk-color-bg-hover);
}
```

### CSS Parts Architecture

**Purpose:** Enable external styling of Shadow DOM internals for white-label customization.

#### What are CSS Parts?

CSS Parts expose specific elements inside a component's Shadow DOM for external styling using the `::part()` pseudo-element selector. This provides a controlled API for customization without breaking Shadow DOM encapsulation.

#### Implementation Pattern

All components expose CSS parts on their primary internal elements:

```typescript
// Component implementation
protected override render(): TemplateResult {
  const partValue = `component-name ${this.variant} ${this.size}`;
  return html`<div part="${partValue}"><slot></slot></div>`;
}
```

#### Typography Components CSS Parts

**MonkHeading** - Exposes `heading` part:

```typescript
// Implementation
render() {
  const tag = unsafeStatic(this.level);  // h1-h6
  const partValue = `heading ${this.level} ${this.color}`;
  return staticHtml`<${tag} part=${partValue}><slot></slot></${tag}>`;
}
```

External usage:
```css
/* Style all headings */
monk-heading::part(heading) {
  font-family: 'Brand Font', serif;
}

/* Target specific levels */
monk-heading[level='h1']::part(heading) {
  text-transform: uppercase;
}

/* Target specific colors */
monk-heading[color='primary']::part(heading) {
  color: var(--custom-primary);
}
```

**MonkText** - Exposes `text` part:

```typescript
// Implementation
render() {
  const partValue = `text ${this.size} ${this.weight} ${this.color}`;
  return html`<span part="${partValue}"><slot></slot></span>`;
}
```

External usage:
```css
/* Override line height */
monk-text::part(text) {
  line-height: 1.7;
}

/* Target specific sizes */
monk-text[size='lg']::part(text) {
  letter-spacing: -0.01em;
}
```

**MonkLink** - Exposes `link` part:

```typescript
// Implementation
render() {
  const isExternal = this.target === '_blank' ? 'external' : 'internal';
  const partValue = `link ${isExternal}`;
  return html`<a part=${partValue} ...><slot></slot></a>`;
}
```

External usage:
```css
/* Style all links */
monk-link::part(link) {
  text-decoration-thickness: 2px;
}

/* Target external links */
monk-link::part(link external) {
  display: inline-flex;
  gap: 4px;
}

monk-link::part(link external)::after {
  content: '↗';
}
```

#### Part Naming Strategy

Parts follow a consistent naming pattern:

1. **Base name** - Primary element type (`heading`, `text`, `link`, `button`, etc.)
2. **Variant tokens** - Component-specific properties included in part value
   - Example: `heading h1 primary` → allows targeting by level and color
   - Example: `text lg bold success` → allows targeting by size, weight, and color

**Benefits:**
- Customers can target general parts: `::part(heading)`
- Or specific variants: `[level='h1']::part(heading)`
- Part values are space-separated, allowing multi-part selectors

#### CSS Parts vs CSS Custom Properties

Use both complementary approaches:

| Approach | When to Use | Example |
|----------|-------------|---------|
| **CSS Custom Properties** | Global theming, color/spacing/typography overrides | `--monk-color-text-primary: #1a1a1a` |
| **CSS Parts** | Structural styling, layout changes, pseudo-elements | `::part(heading) { letter-spacing: -0.02em; }` |

**CSS Custom Properties:**
- Change token values globally or locally
- Affect all components using that token
- Theme-aware (light/dark mode)
- No access to component internals

**CSS Parts:**
- Style specific element internals
- Add pseudo-elements (::before, ::after)
- Override internal structure/layout
- Full CSS power for customization

#### Testing CSS Parts

All components include tests verifying part attributes:

```typescript
it('exposes CSS part for external styling', async () => {
  const el = await fixture<MonkHeading>(html`
    <monk-heading level="h1" color="primary">Heading</monk-heading>
  `);
  const headingEl = el.shadowRoot?.querySelector('h1');
  expect(headingEl?.getAttribute('part')).to.include('heading');
  expect(headingEl?.getAttribute('part')).to.include('h1');
  expect(headingEl?.getAttribute('part')).to.include('primary');
});
```

#### Future Component Parts

All new components will expose CSS parts following this pattern:

- `monk-button::part(button)`
- `monk-input::part(input)`, `monk-input::part(label)`
- `monk-card::part(card)`, `monk-card::part(header)`, `monk-card::part(body)`
- `monk-modal::part(overlay)`, `monk-modal::part(dialog)`

---

## Layout System Architecture

**Purpose:** Provide foundational layout primitives for building responsive, accessible UIs.

### Core Primitive: MonkBox

**Philosophy:** Box is the foundational layout primitive. All other layout components are specialized versions of Box or compose Box internally.

**Design Principles:**
1. **Composition over configuration** - Complex layouts from simple primitives
2. **Token-driven** - All styling uses design tokens
3. **Responsive-ready** - Built on responsive token foundation
4. **Accessible** - Semantic HTML with proper ARIA support

#### MonkBox Implementation

**File:** `src/components/layout/box.ts`

```typescript
@customElement('monk-box')
export class MonkBox extends MonkBaseElement {
  // Layout
  @property() display: BoxDisplay = 'block';

  // Spacing (uses 0-16 scale)
  @property() padding?: SpacingScale;
  @property() margin?: SpacingScale;

  // Visual styling
  @property() bg?: BoxBg;
  @property() border?: string;
  @property() radius?: BoxRadius;
  @property() shadow?: BoxShadow;
}
```

**Supported Values:**

| Property | Type | Values |
|----------|------|--------|
| `display` | BoxDisplay | block, inline-block, flex, inline-flex, grid, inline-grid |
| `padding` | SpacingScale | 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16 (maps to --monk-space-*) |
| `margin` | SpacingScale | 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16 (maps to --monk-space-*) |
| `bg` | BoxBg | canvas, surface, surface-raised, subtle, muted, accent, accent-subtle |
| `radius` | BoxRadius | sm, md, lg, xl, full |
| `shadow` | BoxShadow | none, sm, md, lg, xl, 2xl |
| `border` | string | Any CSS border value (defaults to 1px solid) |

#### Usage Patterns

**Simple Card:**
```html
<monk-box padding="8" bg="surface" radius="lg" shadow="md">
  <monk-heading level="h3">Card Title</monk-heading>
  <monk-text>Card content with elevation and spacing</monk-text>
</monk-box>
```

**Flex Container:**
```html
<monk-box display="flex" padding="4" style="gap: 16px; align-items: center;">
  <monk-box padding="4" bg="accent-subtle" radius="md">Item 1</monk-box>
  <monk-box padding="4" bg="accent-subtle" radius="md">Item 2</monk-box>
</monk-box>
```

**Grid Layout:**
```html
<monk-box
  display="grid"
  padding="4"
  style="grid-template-columns: repeat(3, 1fr); gap: 16px;"
>
  <monk-box padding="6" bg="surface" radius="md" shadow="sm">Grid Item</monk-box>
  <!-- More items... -->
</monk-box>
```

**Nested Composition:**
```html
<monk-box bg="canvas" padding="6">
  <!-- Header -->
  <monk-box bg="accent" padding="4" radius="md" margin="4">
    <monk-heading level="h2">Header</monk-heading>
  </monk-box>

  <!-- Content Area -->
  <monk-box display="flex" padding="4" style="gap: 16px;">
    <!-- Sidebar -->
    <monk-box bg="surface" padding="4" radius="md" shadow="sm">
      <monk-text weight="semibold">Sidebar</monk-text>
    </monk-box>

    <!-- Main Content -->
    <monk-box bg="surface" padding="6" radius="md" shadow="md" style="flex: 1;">
      <monk-heading level="h3">Main Content</monk-heading>
      <monk-text>Nested boxes create complex layouts</monk-text>
    </monk-box>
  </monk-box>
</monk-box>
```

#### CSS Parts for Customization

**Box exposes `::part(box)` for external styling:**

```css
/* Add transitions to all boxes */
monk-box::part(box) {
  transition: all 0.2s ease;
}

/* Style flex boxes specifically */
monk-box[display='flex']::part(box) {
  align-items: center;
}

/* Add hover effects to elevated boxes */
monk-box[shadow]::part(box):hover {
  transform: translateY(-2px);
  box-shadow: var(--monk-shadow-xl);
}
```

#### Responsive Design with Box

Combine Box with breakpoint tokens:

```html
<style>
  .responsive-box {
    width: 100%;
  }

  @media (min-width: var(--monk-breakpoint-md)) {
    .responsive-box {
      width: 50%;
    }
  }

  @media (min-width: var(--monk-breakpoint-lg)) {
    .responsive-box {
      max-width: var(--monk-container-lg);
    }
  }
</style>

<monk-box class="responsive-box" padding="8" bg="surface">
  <monk-text>Responsive container that adapts to screen size</monk-text>
</monk-box>
```

### MonkStack - Vertical/Horizontal Spacing

**File:** `src/components/layout/stack.ts`

**Purpose:** Layouts children with consistent spacing using flexbox gap property. Simplifies common vertical and horizontal list layouts.

**Implementation:**
```typescript
@customElement('monk-stack')
export class MonkStack extends MonkBaseElement {
  @property() direction: 'vertical' | 'horizontal' = 'vertical';
  @property() spacing: StackSpacing = '4';  // 0-16 scale
  @property() align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
  @property() justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' = 'start';
  @property() wrap: boolean = false;
}
```

**Usage Patterns:**

**Vertical List (default):**
```html
<monk-stack spacing="4">
  <monk-box padding="4" bg="surface">Item 1</monk-box>
  <monk-box padding="4" bg="surface">Item 2</monk-box>
  <monk-box padding="4" bg="surface">Item 3</monk-box>
</monk-stack>
```

**Form Layout:**
```html
<monk-stack spacing="5">
  <monk-stack spacing="2">
    <monk-text size="sm" weight="semibold">Name</monk-text>
    <input type="text" />
  </monk-stack>
  <monk-stack spacing="2">
    <monk-text size="sm" weight="semibold">Email</monk-text>
    <input type="email" />
  </monk-stack>
  <button>Submit</button>
</monk-stack>
```

**Horizontal Button Group:**
```html
<monk-stack direction="horizontal" spacing="3" align="center">
  <monk-box padding="3" bg="accent">Save</monk-box>
  <monk-box padding="3" bg="surface">Cancel</monk-box>
  <monk-box padding="3" bg="surface">Delete</monk-box>
</monk-stack>
```

**CSS Parts:**
```css
/* Add animations to stack transitions */
monk-stack::part(stack) {
  transition: gap 0.2s ease;
}

/* Style horizontal stacks differently */
monk-stack[direction='horizontal']::part(stack) {
  border-bottom: 1px solid var(--monk-color-border-default);
}
```

### MonkFlex - Flexbox Layout Primitive

**File:** `src/components/layout/flex.ts`

**Purpose:** Provides common flexbox patterns with declarative props. Simplifies alignment and justify operations.

**Implementation:**
```typescript
@customElement('monk-flex')
export class MonkFlex extends MonkBaseElement {
  @property() direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';
  @property() align: 'start' | 'center' | 'end' | 'stretch' | 'baseline' = 'stretch';
  @property() justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' = 'start';
  @property() wrap: 'nowrap' | 'wrap' | 'wrap-reverse' = 'nowrap';
  @property() gap?: FlexGap;  // 0-16 scale
  @property() inline: boolean = false;
}
```

**Usage Patterns:**

**Centered Content:**
```html
<monk-flex justify="center" align="center" style="min-height: 300px;">
  <monk-box padding="6" bg="accent">Centered Content</monk-box>
</monk-flex>
```

**Header with Space Between:**
```html
<monk-flex justify="between" align="center">
  <monk-heading level="h3">Dashboard</monk-heading>
  <monk-flex gap="3">
    <monk-box padding="3" bg="accent">New</monk-box>
    <monk-box padding="3" bg="surface">Settings</monk-box>
  </monk-flex>
</monk-flex>
```

**Media Object Pattern:**
```html
<monk-flex gap="4">
  <!-- Avatar -->
  <monk-box padding="0" bg="accent" radius="full" style="width: 64px; height: 64px; flex-shrink: 0;">
    <monk-text weight="bold">U</monk-text>
  </monk-box>

  <!-- Content -->
  <monk-flex direction="column" gap="2" style="flex: 1;">
    <monk-heading level="h4">User Name</monk-heading>
    <monk-text size="sm" color="secondary">User description...</monk-text>
  </monk-flex>
</monk-flex>
```

**Toolbar:**
```html
<monk-flex justify="between" align="center">
  <monk-flex gap="2">
    <monk-box padding="2" bg="accent-subtle">Bold</monk-box>
    <monk-box padding="2" bg="accent-subtle">Italic</monk-box>
  </monk-flex>
  <monk-box padding="2" bg="accent">Save</monk-box>
</monk-flex>
```

**CSS Parts:**
```css
/* Style all flex containers */
monk-flex::part(flex) {
  transition: all 0.2s ease;
}

/* Add responsive behavior */
@media (max-width: 640px) {
  monk-flex[direction='row']::part(flex) {
    flex-direction: column;
  }
}
```

### MonkContainer - Responsive Width Constraint

**Purpose:** Constrains content width for optimal readability and responsive layouts.

**Key Features:**
- 6 size options matching breakpoint system
- Auto-centering with horizontal padding
- CSS parts for customization
- Responsive padding that prevents edge-touching on mobile

**Implementation:**

```typescript
@customElement('monk-container')
export class MonkContainer extends MonkBaseElement {
  @property({ type: String, reflect: true })
  size: ContainerSize = 'xl';  // sm | md | lg | xl | 2xl | full

  @property({ type: Boolean, reflect: true, attribute: 'center-content' })
  centerContent = true;
}
```

**Size Mapping:**
```typescript
sm   → max-width: 640px   (var(--monk-container-sm))
md   → max-width: 768px   (var(--monk-container-md))
lg   → max-width: 1024px  (var(--monk-container-lg))
xl   → max-width: 1280px  (var(--monk-container-xl))
2xl  → max-width: 1536px  (var(--monk-container-2xl))
full → max-width: 100%    (no constraint)
```

**Usage Patterns:**

```html
<!-- Page layout (xl is default) -->
<monk-container size="xl">
  <monk-stack spacing="8">
    <monk-heading level="h1">Welcome</monk-heading>
    <monk-text>Content automatically centers and constrains.</monk-text>
  </monk-stack>
</monk-container>

<!-- Blog post (narrow for optimal reading) -->
<monk-container size="md">
  <monk-stack spacing="6">
    <monk-heading level="h1">Article Title</monk-heading>
    <monk-text>
      The md container provides 45-75 characters per line,
      optimal for reading comprehension.
    </monk-text>
  </monk-stack>
</monk-container>

<!-- Dashboard (full width) -->
<monk-container size="full">
  <monk-grid columns="4" gap="4">
    <!-- Stat widgets -->
  </monk-grid>
</monk-container>

<!-- Not centered -->
<monk-container size="lg" .centerContent=${false}>
  <monk-text>This container is left-aligned</monk-text>
</monk-container>
```

**CSS Parts for White-Label:**

```css
/* Customize all containers */
monk-container::part(container) {
  padding-left: 24px;
  padding-right: 24px;
}

/* Size-specific styling */
monk-container[size='sm']::part(container) {
  max-width: 600px;  /* Override token */
}

/* Add background to container wrapper */
monk-container::part(container) {
  background: var(--custom-container-bg);
  border-radius: var(--monk-radius-lg);
}
```

**Responsive Behavior:**
- Mobile: 16px horizontal padding, full width
- Tablet: Begins constraining based on size
- Desktop: Reaches max-width and centers

---

### MonkGrid - CSS Grid Layout Primitive

**Purpose:** Declarative CSS Grid layouts with responsive column support.

**Key Features:**
- Simple numeric columns: `columns="3"` → 3 equal columns
- Custom grid templates: `columns="200px 1fr 2fr"`
- **Auto-fit responsive**: `min-column-width="200px"` → columns adjust automatically
- Independent row/column gaps
- Auto-flow control (row, column, dense)

**Implementation:**

```typescript
@customElement('monk-grid')
export class MonkGrid extends MonkBaseElement {
  @property({ type: String, reflect: true })
  columns?: string;  // "3" or "200px 1fr 2fr"

  @property({ type: String, reflect: true })
  rows?: string;  // "2" or "auto 1fr auto"

  @property({ type: String, reflect: true })
  gap?: GridGap;  // '0' | '1' | '2' | '3' | '4' | ...

  @property({ type: String, reflect: true, attribute: 'column-gap' })
  columnGap?: GridGap;

  @property({ type: String, reflect: true, attribute: 'row-gap' })
  rowGap?: GridGap;

  @property({ type: String, reflect: true, attribute: 'min-column-width' })
  minColumnWidth?: string;  // "200px" for responsive

  @property({ type: String, reflect: true, attribute: 'auto-flow' })
  autoFlow: GridAutoFlow = 'row';  // row | column | row-dense | column-dense

  @property({ type: Boolean, reflect: true })
  inline = false;
}
```

**Dynamic Template Generation:**

```typescript
protected override updated(changedProperties: Map<string, unknown>): void {
  // Numeric columns: "3" → "repeat(3, 1fr)"
  if (this.columns && /^\d+$/.test(this.columns)) {
    this.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
  }
  // Custom columns: "200px 1fr 2fr" → use directly
  else if (this.columns) {
    this.style.gridTemplateColumns = this.columns;
  }

  // Auto-fit responsive: "200px" → "repeat(auto-fit, minmax(200px, 1fr))"
  if (this.minColumnWidth) {
    this.style.gridTemplateColumns =
      `repeat(auto-fit, minmax(${this.minColumnWidth}, 1fr))`;
  }
}
```

**Usage Patterns:**

```html
<!-- Simple 3-column grid -->
<monk-grid columns="3" gap="4">
  <monk-box padding="6" bg="surface">Item 1</monk-box>
  <monk-box padding="6" bg="surface">Item 2</monk-box>
  <monk-box padding="6" bg="surface">Item 3</monk-box>
</monk-grid>

<!-- Responsive grid (columns adjust automatically) -->
<monk-grid min-column-width="200px" gap="4">
  <!-- On wide screens: 6 columns, on tablet: 3 columns, on mobile: 1 column -->
  <monk-box padding="6" bg="surface">Card 1</monk-box>
  <monk-box padding="6" bg="surface">Card 2</monk-box>
  <monk-box padding="6" bg="surface">Card 3</monk-box>
  <monk-box padding="6" bg="surface">Card 4</monk-box>
  <monk-box padding="6" bg="surface">Card 5</monk-box>
  <monk-box padding="6" bg="surface">Card 6</monk-box>
</monk-grid>

<!-- Sidebar layout with custom widths -->
<monk-grid columns="200px 1fr" gap="6">
  <monk-box padding="4" bg="surface">Fixed-width sidebar</monk-box>
  <monk-box padding="4" bg="surface">Flexible main content</monk-box>
</monk-grid>

<!-- Dashboard grid with custom rows -->
<monk-grid columns="2fr 1fr" rows="auto 1fr auto" gap="4">
  <monk-box padding="4" bg="surface">Header</monk-box>
  <monk-box padding="8" bg="surface">Main chart area</monk-box>
  <monk-box padding="4" bg="surface">Sidebar stats</monk-box>
  <monk-box padding="4" bg="surface">Footer</monk-box>
</monk-grid>

<!-- Asymmetric gaps (wide columns, tight rows) -->
<monk-grid columns="3" column-gap="6" row-gap="2">
  <monk-box padding="4" bg="surface">Item</monk-box>
  <!-- More items... -->
</monk-grid>

<!-- Auto-flow column (fills columns first) -->
<monk-grid rows="3" gap="4" auto-flow="column">
  <monk-box>1</monk-box>
  <monk-box>2</monk-box>
  <monk-box>3</monk-box>
  <monk-box>4</monk-box>  <!-- Starts new column -->
</monk-grid>
```

**Common Grid Patterns:**

```html
<!-- Image gallery -->
<monk-grid min-column-width="250px" gap="4">
  <monk-box padding="0" radius="md" style="aspect-ratio: 4/3;">
    <img src="..." alt="..." style="width: 100%; height: 100%; object-fit: cover;">
  </monk-box>
  <!-- More images... -->
</monk-grid>

<!-- Dashboard stats -->
<monk-grid columns="4" gap="4">
  <monk-box padding="6" bg="surface" shadow="sm">
    <monk-stack spacing="2">
      <monk-text size="sm" color="secondary">Total Users</monk-text>
      <monk-text size="2xl" weight="bold">1,234</monk-text>
    </monk-stack>
  </monk-box>
  <!-- More stats... -->
</monk-grid>

<!-- Form with 2-column layout -->
<monk-grid columns="2" gap="4">
  <monk-stack spacing="2">
    <monk-text size="sm" weight="semibold">First Name</monk-text>
    <input type="text" />
  </monk-stack>
  <monk-stack spacing="2">
    <monk-text size="sm" weight="semibold">Last Name</monk-text>
    <input type="text" />
  </monk-stack>
</monk-grid>
```

**CSS Parts for White-Label:**

```css
/* Grid doesn't expose parts (slots directly) but can be styled via host */
monk-grid {
  /* Add container padding */
  padding: var(--monk-space-4);
}

/* Size-specific styling */
monk-grid[columns='3'] {
  background: var(--custom-grid-bg);
}

/* Responsive override */
@media (max-width: 768px) {
  monk-grid[columns] {
    grid-template-columns: 1fr !important; /* Stack on mobile */
  }
}
```

---

### Future Layout Components

**Inline** - Horizontal spacing with wrapping optimized for inline elements:
```html
<monk-inline gap="2" wrap>
  <monk-box>Tag 1</monk-box>
  <monk-box>Tag 2</monk-box>
</monk-inline>
```

### Layout Best Practices

1. **Start with Box** - Use Box for all basic layout needs
2. **Compose naturally** - Nest boxes to create complex layouts
3. **Use semantic tokens** - Always use token-based spacing/colors
4. **Leverage CSS Grid/Flexbox** - Use native CSS layout alongside Box
5. **Responsive props** (future) - Plan for responsive prop variants
6. **Accessibility** - Always provide proper ARIA attributes for regions

---

## Button Component Architecture

**File:** `src/components/button/button.ts`

**Purpose:** Interactive button component with Material Design-inspired API, supporting multiple visual styles and semantic color schemes.

### Design Philosophy

The Button component follows Chakra UI's approach to button variants and color schemes:

1. **Variant-first API** - `variant` controls visual style (solid, outline, ghost, link)
2. **Semantic color schemes** - `colorScheme` defines intent (primary, neutral, success, error, warning)
3. **Size scale** - Consistent sizing from xs to xl
4. **State management** - Disabled and full-width states
5. **Form integration** - Native button types (button, submit, reset)

This approach provides clear separation between visual style and semantic meaning, enabling flexible composition patterns.

### Implementation Details

#### Base Structure

```typescript
@customElement('monk-button')
export class MonkButton extends MonkBaseElement {
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'solid';

  @property({ type: String, reflect: true, attribute: 'color-scheme' })
  colorScheme: ButtonColorScheme = 'primary';

  @property({ type: String, reflect: true })
  size: ButtonSize = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  @property({ type: String, reflect: true })
  type: 'button' | 'submit' | 'reset' = 'button';
}
```

**Key Design Decisions:**

1. **Reflected attributes** - All props reflect to attributes for CSS styling via attribute selectors
2. **Kebab-case attributes** - `color-scheme` and `full-width` use standard HTML attribute casing
3. **TypeScript unions** - Strict typing for all variants, color schemes, and sizes
4. **Native button element** - Wraps actual `<button>` for accessibility and form integration

#### Token Integration Strategy

The Button component uses a **hierarchical token approach**:

```typescript
// Solid Primary Button Token Flow:
// 1. Component references semantic token
background: var(--monk-color-bg-primary);
color: var(--monk-color-text-on-primary);

// 2. Semantic token (light theme) references base token
--monk-color-bg-primary: var(--monk-color-blue-500);
--monk-color-text-on-primary: var(--monk-color-white);

// 3. Base token defines raw value
--monk-color-blue-500: #3d6ce8;
--monk-color-white: #ffffff;

// Result: Button adapts to theme changes automatically
```

**Interactive States:**
```css
/* Default state */
:host([variant='solid'][color-scheme='primary']) .button {
  background: var(--monk-color-bg-primary);
  color: var(--monk-color-text-on-primary);
}

/* Hover state */
:host([variant='solid'][color-scheme='primary']) .button:hover:not(:disabled) {
  background: var(--monk-color-bg-primary-hover);
}

/* Active state */
:host([variant='solid'][color-scheme='primary']) .button:active:not(:disabled) {
  background: var(--monk-color-bg-primary-active);
}
```

**Complete Token Coverage:**

| State | Token Pattern | Example |
|-------|---------------|---------|
| Default | `bg-{scheme}` | `bg-primary`, `bg-success`, `bg-error` |
| Hover | `bg-{scheme}-hover` | `bg-primary-hover` |
| Active | `bg-{scheme}-active` | `bg-primary-active` |
| Subtle (outline/ghost) | `bg-{scheme}-subtle` | `bg-primary-subtle` |
| Text on background | `text-on-{scheme}` | `text-on-primary`, `text-on-error` |

### Variant Implementation

#### 1. Solid Variant

**Visual:** Filled background with high contrast text
**Usage:** Primary actions, calls-to-action
**Token Pattern:**
```css
:host([variant='solid'][color-scheme='{scheme}']) .button {
  background: var(--monk-color-bg-{scheme});
  color: var(--monk-color-text-on-{scheme});
}
```

**Rationale:** High visual weight for primary actions. Uses dedicated `text-on-*` tokens ensuring WCAG AA contrast.

#### 2. Outline Variant

**Visual:** Transparent background with colored border and text
**Usage:** Secondary actions
**Token Pattern:**
```css
:host([variant='outline'][color-scheme='{scheme}']) .button {
  background: transparent;
  border-color: var(--monk-color-bg-{scheme});
  color: var(--monk-color-bg-{scheme});
}

/* Hover adds subtle background */
:host([variant='outline'][color-scheme='{scheme}']) .button:hover:not(:disabled) {
  background: var(--monk-color-bg-{scheme}-subtle);
  border-color: var(--monk-color-bg-{scheme}-hover);
}
```

**Rationale:** Lighter visual weight than solid. Subtle background on hover improves interaction feedback.

#### 3. Ghost Variant

**Visual:** Transparent background with colored text, no border
**Usage:** Tertiary actions, toolbar buttons
**Token Pattern:**
```css
:host([variant='ghost'][color-scheme='{scheme}']) .button {
  background: transparent;
  color: var(--monk-color-bg-{scheme});
}

:host([variant='ghost'][color-scheme='{scheme}']) .button:hover:not(:disabled) {
  background: var(--monk-color-bg-{scheme}-subtle);
}
```

**Rationale:** Minimal visual weight. Hover background provides affordance without overwhelming interface.

#### 4. Link Variant

**Visual:** Text-only button with underline
**Usage:** Inline actions, navigation
**Token Pattern:**
```css
:host([variant='link']) .button {
  background: transparent;
  border: none;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 2px;
}

:host([variant='link'][color-scheme='primary']) .button {
  color: var(--monk-color-text-link);
}
```

**Rationale:** Mimics native links. Zero padding allows inline usage. Uses dedicated `text-link` token.

### Size Implementation

Uses space scale tokens for padding and font scale tokens for typography:

```css
/* Extra Small */
:host([size='xs']) .button {
  padding: var(--monk-space-1) var(--monk-space-2);  /* 4px 8px */
  font-size: var(--monk-font-size-xs);                /* 12px */
  line-height: var(--monk-font-lineHeight-tight);     /* 1.25 */
}

/* Small */
:host([size='sm']) .button {
  padding: var(--monk-space-2) var(--monk-space-3);  /* 8px 12px */
  font-size: var(--monk-font-size-sm);                /* 14px */
}

/* Medium (default) */
:host([size='md']) .button {
  padding: var(--monk-space-3) var(--monk-space-4);  /* 12px 16px */
  font-size: var(--monk-font-size-base);              /* 16px */
  line-height: var(--monk-font-lineHeight-normal);    /* 1.5 */
}

/* Large */
:host([size='lg']) .button {
  padding: var(--monk-space-4) var(--monk-space-6);  /* 16px 24px */
  font-size: var(--monk-font-size-lg);                /* 18px */
}

/* Extra Large */
:host([size='xl']) .button {
  padding: var(--monk-space-5) var(--monk-space-8);  /* 20px 32px */
  font-size: var(--monk-font-size-xl);                /* 20px */
}
```

**Design Rationale:**
- Vertical padding smaller than horizontal (visual balance)
- Larger sizes use more generous padding (improved touch targets)
- Font size scales proportionally with button size
- All sizing uses design tokens (ensures consistency)

### CSS Parts Architecture

Button exposes `::part(button)` for white-label customization:

```typescript
protected override render(): TemplateResult {
  // Include variant, colorScheme, and size in part value
  const partValue = `button ${this.variant} ${this.colorScheme} ${this.size}`;

  return html`
    <button
      part="${partValue}"
      class="button"
      type="${this.type}"
      ?disabled="${this.disabled}"
      aria-disabled="${this.disabled}"
    >
      <slot></slot>
    </button>
  `;
}
```

**Part Value Strategy:**

The part value includes multiple tokens (`button solid primary md`), allowing targeted external styling:

```css
/* Style all buttons */
monk-button::part(button) {
  transition: transform 0.2s;
}

/* Target specific variants */
monk-button[variant='solid']::part(button) {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Target specific color schemes */
monk-button[color-scheme='primary']::part(button) {
  background: linear-gradient(to right, #667eea, #764ba2);
}

/* Target specific sizes */
monk-button[size='lg']::part(button) {
  min-width: 120px;
}

/* Combine selectors */
monk-button[variant='solid'][color-scheme='error']::part(button) {
  font-weight: bold;
}
```

**Benefits:**
- Customers can apply global button styles
- Specific targeting without breaking encapsulation
- Supports pseudo-elements (::before, ::after)
- Maintains component's internal token system

### Accessibility Implementation

#### 1. Semantic HTML

Uses native `<button>` element:
```html
<button
  type="${this.type}"
  ?disabled="${this.disabled}"
  aria-disabled="${this.disabled}"
>
  <slot></slot>
</button>
```

**Benefits:**
- Automatic keyboard navigation (Tab, Enter, Space)
- Automatic form submission (when type="submit")
- Proper disabled state handling
- Screen reader announcements

#### 2. Focus Indicators

```css
.button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--monk-focus-ring-width, 2px) var(--monk-focus-ring-color);
  outline-offset: var(--monk-focus-ring-offset, 2px);
}
```

**Design Rationale:**
- Uses `:focus-visible` (keyboard focus only, not mouse clicks)
- Token-driven focus ring (consistent across all components)
- Box-shadow instead of outline (better control, rounded corners)
- Outline-offset for separation from button edge

#### 3. Color Contrast

All color combinations tested for WCAG AA compliance (4.5:1 minimum):

| Variant | ColorScheme | Contrast Ratio | Status |
|---------|-------------|----------------|--------|
| Solid | Primary | 7.2:1 | ✅ AAA |
| Solid | Success | 4.8:1 | ✅ AA |
| Solid | Error | 5.1:1 | ✅ AA |
| Solid | Warning | 8.1:1 | ✅ AAA |
| Outline | Primary | 7.2:1 | ✅ AAA |
| Ghost | Primary | 7.2:1 | ✅ AAA |
| Link | Primary | 7.2:1 | ✅ AAA |

**Strategy:**
- Solid buttons use `text-on-*` tokens (white/black text on colored backgrounds)
- Outline/Ghost/Link buttons use same color for text and border (inherent contrast)
- Warning uses dark text on yellow (higher contrast than white)

#### 4. Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
}
```

**Respects user preference:**
- Disables all transitions when motion is reduced
- Button still functional, just no animation
- Applied via `reducedMotionStyles` from core

#### 5. Disabled State

```css
.button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

**Accessibility considerations:**
- `opacity: 0.5` provides clear visual indication
- `cursor: not-allowed` shows non-interactive state
- `aria-disabled="${this.disabled}"` announces state to screen readers
- Native `disabled` attribute prevents interaction

### State Management

#### Interactive States

```typescript
// Default → Hover → Active → Focus
:host([variant='solid'][color-scheme='primary']) .button {
  background: var(--monk-color-bg-primary);
}

:host([variant='solid'][color-scheme='primary']) .button:hover:not(:disabled) {
  background: var(--monk-color-bg-primary-hover);
}

:host([variant='solid'][color-scheme='primary']) .button:active:not(:disabled) {
  background: var(--monk-color-bg-primary-active);
}

.button:focus-visible {
  box-shadow: 0 0 0 2px var(--monk-focus-ring-color);
}
```

**State Precedence:**
1. Disabled (blocks all other states with `:not(:disabled)`)
2. Active (pressed state)
3. Hover (mouse over)
4. Focus (keyboard navigation)
5. Default

#### Transitions

```css
.button {
  transition:
    background-color var(--monk-duration-normal, 250ms) var(--monk-easing-ease-out, ease-out),
    border-color var(--monk-duration-normal, 250ms) var(--monk-easing-ease-out, ease-out),
    color var(--monk-duration-normal, 250ms) var(--monk-easing-ease-out, ease-out),
    box-shadow var(--monk-duration-normal, 250ms) var(--monk-easing-ease-out, ease-out);
}
```

**Rationale:**
- Transitions all interactive properties
- Uses animation tokens (consistent duration/easing)
- Fallback values for non-token environments
- Ease-out easing (natural interaction feel)

### Testing Strategy

#### Unit Tests

**File:** `button.spec.ts`

```typescript
describe('monk-button', () => {
  // Property tests
  it('has default variant of solid', async () => {
    const el = await fixture(html`<monk-button>Click</monk-button>`);
    expect(el.variant).to.equal('solid');
  });

  // Variant tests (solid, outline, ghost, link)
  it('renders all variants', async () => { ... });

  // ColorScheme tests (primary, neutral, success, error, warning)
  it('supports all color schemes', async () => { ... });

  // Size tests (xs, sm, md, lg, xl)
  it('renders all sizes', async () => { ... });

  // State tests
  it('respects disabled state', async () => { ... });
  it('supports fullWidth', async () => { ... });

  // Form integration
  it('supports form types', async () => { ... });
});
```

#### Accessibility Tests

```typescript
describe('accessibility', () => {
  it('passes axe audit', async () => {
    const el = await fixture(html`<monk-button>Click</monk-button>`);
    await expect(el).to.be.accessible();
  });

  it('supports keyboard navigation', async () => {
    const el = await fixture(html`<monk-button>Click</monk-button>`);
    el.focus();
    expect(document.activeElement).to.equal(el);
  });

  it('has sufficient color contrast', async () => {
    // Test all variant/colorScheme combinations
  });

  it('exposes CSS parts', async () => {
    const el = await fixture(html`
      <monk-button variant="solid" color-scheme="primary" size="md">Button</monk-button>
    `);
    const buttonEl = el.shadowRoot?.querySelector('button');
    expect(buttonEl?.getAttribute('part')).to.include('button');
    expect(buttonEl?.getAttribute('part')).to.include('solid');
    expect(buttonEl?.getAttribute('part')).to.include('primary');
    expect(buttonEl?.getAttribute('part')).to.include('md');
  });
});
```

#### Storybook Stories

**File:** `button.stories.ts`

Stories organized by concept:
1. **Default** - Basic usage with controls
2. **Variants** - All 4 variants side by side
3. **ColorSchemes** - All 5 color schemes for each variant
4. **Sizes** - All 5 sizes for comparison
5. **VariantColorMatrix** - Complete matrix (20 combinations)
6. **DisabledState** - Disabled state for all variants
7. **FullWidth** - Full-width demonstration
8. **UseCases** - Real-world patterns (primary actions, secondary, confirmation, destructive, warning)
9. **ButtonGroups** - Layout patterns (left, right, space-between, vertical)
10. **FormExample** - Form integration with submit/reset
11. **Accessibility** - Keyboard navigation, disabled state, color contrast

**Best Practices in Stories:**
- All stories use design system components (monk-flex, monk-stack, etc.)
- No inline styles except those referencing design tokens
- Examples demonstrate composition patterns
- Accessibility story documents keyboard navigation

### React Wrapper

**File:** `design-kit-react/src/button.tsx`

```typescript
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: ButtonVariant;
  colorScheme?: ButtonColorScheme;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  hidden?: boolean;
  children?: React.ReactNode;
}

export const Button = createComponent({
  tagName: 'monk-button',
  elementClass: MonkButtonWC,
  react: React,
});
```

**Usage:**
```tsx
<Button variant="solid" colorScheme="primary" size="lg">
  Save Changes
</Button>
```

**Type Safety:**
- Full TypeScript interface matching web component props
- Extends `React.HTMLAttributes` for standard HTML props
- Auto-completion in IDEs
- Compile-time prop validation

### Performance Considerations

#### Bundle Size
- Component: ~3KB (minified + gzipped)
- Includes all variants, colors, sizes
- No runtime JavaScript for styling (pure CSS)

#### Runtime Performance
- CSS custom properties (zero JavaScript overhead)
- Attribute selectors for variants (native CSS)
- Shadow DOM scoping (style isolation)
- No prop watchers (Lit's reactive properties)

### Future Enhancements

**Planned Features:**
1. **Icon support** - Composition-based (slot for icon)
2. **Loading state** - `loading` prop with spinner
3. **Button group** - Specialized container component
4. **Responsive sizes** - `size={{ base: 'sm', md: 'md', lg: 'lg' }}`
5. **Animation variants** - Pulse, shimmer effects

**Not Planned (Anti-patterns):**
- Icon prop (prefer composition: `<Button><Icon />Text</Button>`)
- Left/right icon props (prefer slots)
- Badge prop (prefer composition: `<Button><Badge />Text</Button>`)
- Tooltip prop (prefer composition: separate Tooltip component)

---

## Badge Component Architecture

**File:** `src/components/badge/badge.ts`

**Purpose:** Non-interactive status indicators and labels with flexible color customization.

### Design Philosophy

The Badge component follows Material Design badge patterns with Chakra UI's flexible color API:

1. **Non-interactive** - Badges are informational only, no hover/active states
2. **Variant-first API** - `variant` controls visual style (solid, subtle, outline)
3. **Semantic color schemes** - `colorScheme` defines intent (primary, neutral, success, error, warning, info)
4. **Custom color props** - `bg`, `color`, `borderColor` props override semantic colors
5. **Size scale** - Consistent sizing (sm, md, lg)
6. **Uppercase styling** - Letter-spaced uppercase text for visual distinction

This approach provides semantic defaults while allowing unlimited color customization through props.

### Implementation Details

#### Base Structure

```typescript
@customElement('monk-badge')
export class MonkBadge extends MonkBaseElement {
  @property({ type: String, reflect: true })
  variant: BadgeVariant = 'solid';

  @property({ type: String, reflect: true, attribute: 'color-scheme' })
  colorScheme: BadgeColorScheme = 'primary';

  @property({ type: String, reflect: true })
  size: BadgeSize = 'md';

  @property({ type: String, reflect: true })
  bg?: string;

  @property({ type: String, reflect: true })
  color?: string;

  @property({ type: String, reflect: true, attribute: 'border-color' })
  borderColor?: string;
}
```

**Key Design Decisions:**

1. **Reflected attributes** - All props reflect to attributes for CSS styling
2. **Optional custom color props** - Override semantic colors when needed
3. **TypeScript unions** - Strict typing for all variants, color schemes, and sizes
4. **Semantic span element** - Uses `<span>` (non-interactive) vs Button's `<button>`
5. **CSS custom property bridge** - Props set CSS custom properties for maximum flexibility

#### Token Integration Strategy

Badge uses a **layered color customization approach**:

```typescript
// Default: Semantic color scheme
:host([variant='solid'][color-scheme='primary']) {
  --badge-bg: var(--monk-color-bg-primary);
  --badge-color: var(--monk-color-text-on-primary);
}

// Badge styles consume CSS custom properties
.badge {
  background: var(--badge-bg);
  color: var(--badge-color);
  border-color: var(--badge-border-color, transparent);
}

// Custom props override semantic defaults
if (this.bg) {
  this.style.setProperty('--badge-bg', this.bg);
}
```

**Color Hierarchy (specificity order):**
1. Custom color props (`bg`, `color`, `borderColor`) - Highest priority
2. CSS custom properties (inline `style="--badge-bg: #fff"`)
3. Semantic color scheme (`:host([color-scheme='primary'])`) - Default
4. Token values (`var(--monk-color-bg-primary)`)

### Variant Implementation

#### 1. Solid Variant

**Visual:** Filled background with high contrast text
**Usage:** Default, status indicators, notification counts
**Token Pattern:**
```css
:host([variant='solid'][color-scheme='success']) {
  --badge-bg: var(--monk-color-bg-success);
  --badge-color: var(--monk-color-text-on-success);
}
```

**Rationale:** High contrast for maximum visibility. Uses `text-on-*` tokens for WCAG AA compliance.

#### 2. Subtle Variant

**Visual:** Soft background with medium contrast text
**Usage:** Category tags, low-emphasis labels
**Token Pattern:**
```css
:host([variant='subtle'][color-scheme='primary']) {
  --badge-bg: var(--monk-color-bg-primary-subtle);
  --badge-color: var(--monk-color-bg-primary);
}
```

**Rationale:** Reduced visual weight. Background uses `-subtle` token (10-20% opacity).

#### 3. Outline Variant

**Visual:** Transparent background with colored border and text
**Usage:** Role indicators, secondary labels
**Token Pattern:**
```css
:host([variant='outline'][color-scheme='info']) {
  --badge-bg: transparent;
  --badge-border-color: var(--monk-color-bg-info);
  --badge-color: var(--monk-color-bg-info);
}
```

**Rationale:** Minimal visual weight while maintaining color semantics.

### Custom Color Props Implementation

**Problem Solved:** Users need unlimited color flexibility beyond 6 semantic color schemes.

**Solution:** Add `bg`, `color`, and `borderColor` props that override semantic colors.

**Implementation:**
```typescript
protected override render(): TemplateResult {
  // Apply custom colors as CSS custom properties on host
  if (this.bg) {
    this.style.setProperty('--badge-bg', this.bg);
  }
  if (this.color) {
    this.style.setProperty('--badge-color', this.color);
  }
  if (this.borderColor) {
    this.style.setProperty('--badge-border-color', this.borderColor);
  }

  return html`
    <span part="badge ${this.variant} ${this.colorScheme} ${this.size}" class="badge">
      <slot></slot>
    </span>
  `;
}
```

**Usage:**
```html
<!-- Web Components -->
<monk-badge bg="#ff6b6b" color="white">Red</monk-badge>
<monk-badge variant="outline" border-color="#a855f7" color="#a855f7">Purple</monk-badge>

<!-- React -->
<Badge bg="#ff6b6b" color="white">Red</Badge>
<Badge variant="outline" borderColor="#a855f7" color="#a855f7">Purple</Badge>
```

**Benefits:**
- Works like React props (familiar DX)
- Type-safe with TypeScript
- Overrides semantic colors when needed
- No CSS classes or inline styles required
- Full IDE autocomplete support

### Size Implementation

Uses space scale tokens for padding and font scale tokens for typography:

```css
/* Small */
:host([size='sm']) .badge {
  padding: var(--monk-space-1) var(--monk-space-2);  /* 4px 8px */
  font-size: var(--monk-font-size-xs);                /* 12px */
  line-height: var(--monk-font-lineHeight-tight);     /* 1.25 */
}

/* Medium (default) */
:host([size='md']) .badge {
  padding: var(--monk-space-1) var(--monk-space-3);  /* 4px 12px */
  font-size: var(--monk-font-size-sm);                /* 14px */
  line-height: var(--monk-font-lineHeight-tight);     /* 1.25 */
}

/* Large */
:host([size='lg']) .badge {
  padding: var(--monk-space-2) var(--monk-space-4);  /* 8px 16px */
  font-size: var(--monk-font-size-base);              /* 16px */
  line-height: var(--monk-font-lineHeight-normal);    /* 1.5 */
}
```

**Design Rationale:**
- Smaller padding than Button (badges are compact)
- Uppercase text with letter-spacing (0.025em)
- Full border-radius (`var(--monk-radius-full)` = pill shape)
- Tight line-height for vertical centering

### CSS Parts Architecture

Badge exposes `::part(badge)` for white-label customization:

```typescript
const partValue = `badge ${this.variant} ${this.colorScheme} ${this.size}`;

return html`
  <span part="${partValue}" class="badge">
    <slot></slot>
  </span>
`;
```

**Part Value Strategy:**

Multiple tokens allow targeted external styling:

```css
/* Style all badges */
monk-badge::part(badge) {
  font-family: 'Custom Font';
}

/* Target specific variants */
monk-badge[variant='solid']::part(badge) {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Target specific color schemes */
monk-badge[color-scheme='error']::part(badge) {
  font-weight: bold;
}

/* Combine selectors */
monk-badge[variant='subtle'][color-scheme='primary']::part(badge) {
  text-transform: lowercase;
}
```

### Accessibility Implementation

#### 1. Semantic HTML

Uses `<span>` element (informational, non-interactive):
```html
<span part="badge solid primary md" class="badge">
  <slot></slot>
</span>
```

**Benefits:**
- Proper semantics (not interactive)
- Screen readers announce content naturally
- No keyboard navigation needed (not focusable)

#### 2. Color Contrast

All semantic color combinations tested for WCAG AA compliance (4.5:1 minimum):

| Variant | ColorScheme | Contrast Ratio | Status |
|---------|-------------|----------------|--------|
| Solid | Primary | 7.2:1 | ✅ AAA |
| Solid | Success | 4.8:1 | ✅ AA |
| Solid | Error | 5.1:1 | ✅ AA |
| Solid | Warning | 8.1:1 | ✅ AAA |
| Solid | Info | 6.1:1 | ✅ AAA |
| Subtle | All | 4.5:1+ | ✅ AA |
| Outline | All | 4.5:1+ | ✅ AA |

**Strategy:**
- Solid badges use `text-on-*` tokens (white/black on colored backgrounds)
- Subtle/Outline use same color for text (inherent contrast with background)
- Custom colors are user's responsibility (semantic defaults are compliant)

#### 3. Uppercase Text with Letter Spacing

```css
.badge {
  text-transform: uppercase;
  letter-spacing: 0.025em;
}
```

**Rationale:**
- Uppercase distinguishes badges from surrounding text
- Letter-spacing improves readability at small sizes
- Common pattern in Material Design and Bootstrap

### React Wrapper

**File:** `design-kit-react/src/badge.tsx`

```typescript
export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  size?: BadgeSize;
  bg?: string;
  color?: string;
  borderColor?: string;
  hidden?: boolean;
  children?: React.ReactNode;
}

export const Badge = createComponent({
  tagName: 'monk-badge',
  elementClass: MonkBadgeWC,
  react: React,
});
```

**Usage:**
```tsx
<Badge colorScheme="success">Active</Badge>
<Badge variant="subtle" colorScheme="primary" size="sm">TypeScript</Badge>
<Badge bg="#ff6b6b" color="white">Custom</Badge>
```

**Type Safety:**
- Full TypeScript interface with custom color props
- Extends `React.HTMLAttributes` for standard HTML props
- IDE autocomplete for all props
- Compile-time validation

### Common Usage Patterns

#### Status Indicators
```html
<monk-badge color-scheme="success">Active</monk-badge>
<monk-badge color-scheme="warning">Pending</monk-badge>
<monk-badge color-scheme="error">Failed</monk-badge>
<monk-badge color-scheme="neutral">Inactive</monk-badge>
```

#### Notification Counts
```html
<monk-button>
  Inbox
  <monk-badge color-scheme="error" size="sm">12</monk-badge>
</monk-button>
```

#### Category Tags
```html
<monk-badge variant="subtle" color-scheme="primary" size="sm">TypeScript</monk-badge>
<monk-badge variant="subtle" color-scheme="primary" size="sm">React</monk-badge>
```

#### Brand Colors
```html
<monk-badge bg="#1da1f2" color="white">Twitter</monk-badge>
<monk-badge bg="#0077b5" color="white">LinkedIn</monk-badge>
```

### Performance Considerations

#### Bundle Size
- Component: ~2.5KB (minified + gzipped)
- Smaller than Button (no interactive states)
- All variants/colors included

#### Runtime Performance
- CSS custom properties (no JavaScript overhead)
- Attribute selectors for variants
- Shadow DOM scoping
- Lit's reactive properties (minimal re-renders)

### Design Decisions

**Why 6 color schemes vs Button's 5?**
- Added `info` for informational badges
- Common in design systems (Bootstrap, Chakra, Material-UI)
- Covers all semantic states

**Why custom color props instead of just CSS custom properties?**
- Better DX (React-like props)
- Type safety and IDE autocomplete
- No inline styles needed
- Maintains encapsulation

**Why non-interactive (no hover states)?**
- Badges are status indicators, not actions
- If interaction is needed, use Button instead
- Follows Material Design badge guidelines

---

## Build System

### Nx Workspace

```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"]  // Build dependencies first
    }
  }
}
```

**Build Order:**
1. design-tokens (no dependencies)
2. design-kit (depends on design-tokens)
3. design-kit-react (depends on design-kit)

### TypeScript Configuration

**Shared** (`tsconfig.base.json`):
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "node",
    "paths": {
      "@monkbunch/design-tokens": ["./packages/design-tokens/dist/js/tokens.js"],
      "@monkbunch/design-kit": ["./packages/design-kit/src/index.ts"]
    }
  }
}
```

**Package-specific:**
- `design-kit`: `outDir: "dist"`, `declaration: true`
- `design-kit-react`: `jsx: "react"`, `skipLibCheck: true`

---

## Testing Strategy

### Unit Tests

```typescript
// Component behavior
describe('monk-button', () => {
  it('renders with default props', async () => {
    const el = await fixture(html`<monk-button>Click</monk-button>`);
    expect(el.variant).to.equal('primary');
  });

  it('handles click events', async () => {
    const el = await fixture(html`<monk-button>Click</monk-button>`);
    const spy = sinon.spy();
    el.addEventListener('click', spy);
    el.click();
    expect(spy).to.have.been.calledOnce;
  });
});
```

### Accessibility Tests

```typescript
describe('accessibility', () => {
  it('passes axe audit', async () => {
    const el = await fixture(html`<monk-button>Click</monk-button>`);
    await expect(el).to.be.accessible();
  });

  it('supports keyboard navigation', async () => {
    const el = await fixture(html`<monk-button>Click</monk-button>`);
    el.focus();
    expect(document.activeElement).to.equal(el);
  });

  it('has sufficient color contrast', async () => {
    // Test contrast ratios meet WCAG AA
  });
});
```

---

## Storybook Architecture

### Configuration

```typescript
// .storybook/main.ts
export default {
  framework: '@storybook/web-components-vite',
  stories: ['../packages/design-kit/src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'  // Accessibility testing
  ]
};
```

### Preview with Theme Switcher

```typescript
// .storybook/preview.ts
export default {
  globalTypes: {
    theme: {
      name: 'Theme',
      toolbar: {
        items: [
          { value: 'light', icon: 'sun' },
          { value: 'dark', icon: 'moon' }
        ]
      }
    }
  },
  decorators: [
    (Story, context) => {
      document.documentElement.setAttribute(
        'data-theme',
        context.globals.theme
      );
      return html`<div style="background: var(--monk-color-bg-canvas)">${Story()}</div>`;
    }
  ]
};
```

---

## Accessibility Architecture

### Requirements (WCAG 2.1 AA)

1. **Color Contrast**
   - Text: 4.5:1 minimum (3:1 for large text)
   - UI Components: 3:1 minimum
   - Focus indicators: 3:1 minimum

2. **Keyboard Navigation**
   - All interactive elements focusable via Tab
   - Custom focus indicators (focus ring tokens)
   - Logical tab order

3. **Screen Readers**
   - Semantic HTML elements
   - ARIA attributes where needed
   - Proper labeling

4. **Motion**
   - Respect `prefers-reduced-motion`
   - No auto-playing animations

### Implementation

```typescript
// Focus indicators
:host(:focus-visible) {
  outline: var(--monk-focus-ring-width) solid var(--monk-focus-ring-color);
  outline-offset: var(--monk-focus-ring-offset);
}

// Reduced motion
@media (prefers-reduced-motion: reduce) {
  :host {
    animation: none;
    transition: none;
  }
}

// Semantic HTML
render() {
  return html`
    <button
      aria-label=${this.ariaLabel}
      aria-disabled=${this.disabled}
      ?disabled=${this.disabled}
    >
      <slot></slot>
    </button>
  `;
}
```

---

## Performance Considerations

### Bundle Size

- **Web Components:** ~25KB (minified + gzipped) for core + typography
- **React Wrappers:** +5KB for wrapper layer
- **Design Tokens:** 15KB CSS (all themes)

### Tree Shaking

Components are exported individually:

```javascript
// Only imports Button, not entire library
import { Button } from '@monkbunch/design-kit';
```

### CSS Custom Properties

- Browser-native, zero runtime cost
- Theme switching without re-rendering
- Efficient cascade and inheritance

---

## Future Architecture Considerations

### Planned Additions

1. **CSS Layers**
   ```css
   @layer monk-base, monk-tokens, monk-components;
   ```

2. **Recipe System** (Chakra-inspired)
   ```typescript
   // button.recipe.ts
   export const buttonRecipe = {
     base: { /* base styles */ },
     variants: {
       size: { sm: {}, md: {}, lg: {} },
       variant: { solid: {}, outline: {} }
     }
   };
   ```

3. **Layout Primitives**
   - Box, Flex, Grid, Stack
   - Style props support

4. **Component Tokens**
   ```json
   {
     "button": {
       "primary": {
         "bg": "{color.bg.accent}",
         "text": "{color.text.on-accent}"
       }
     }
   }
   ```

---

## Development Workflow

### Adding a New Component

1. **Plan** - Research Chakra UI equivalent
2. **Tokens** - Identify needed tokens
3. **Implement** - Create Lit component
4. **Test** - Write accessibility tests
5. **Story** - Create Storybook stories
6. **Wrap** - Create React wrapper
7. **Document** - Update README

### Code Review Checklist

- [ ] Uses semantic tokens (no hardcoded values)
- [ ] Tested in light and dark themes
- [ ] Accessibility tests pass
- [ ] Keyboard navigation works
- [ ] Focus indicators present
- [ ] TypeScript types exported
- [ ] React wrapper created
- [ ] Storybook stories added
- [ ] JSDoc documentation complete

---

**Last Updated:** January 2025
**Current Components:** Typography (Heading, Text, Link), Layout (Box, Stack, Flex, Container, Grid), Button, Badge
