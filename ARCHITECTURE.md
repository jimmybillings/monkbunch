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
