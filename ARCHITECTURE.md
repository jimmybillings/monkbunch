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
│   └── radii.json          # Border radius values
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
