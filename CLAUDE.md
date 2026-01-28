# Claude Agent Context: Monkbunch Monorepo

**For Claude Agents:** This document provides complete context for continuing work on the Monkbunch monorepo. Read this first to understand the project architecture, key decisions, and patterns.

---

## 🎯 Project Overview

**Location:** `/Users/jamesbillings/Desktop/monkbunch/`
**Monorepo Name:** `monkbunch`

This is a **monorepo** containing:
- **Publishable packages** (under `packages/`) - npm packages like `@monkbunch/design-kit`
- **Applications** (under `apps/` - to be added) - Internal apps like `portal` (not published to npm)

### Current Packages (Publishable to npm)

The design system is a **white-label design system** built with:
- **Web Components** (Lit 3.x) - Framework-agnostic components
- **React Wrappers** (@lit/react) - Optional React integration
- **Design Tokens** (Style Dictionary) - Theme-aware token system
- **Storybook** - Component documentation and testing
- **TypeScript** - Strict typing throughout
- **Accessibility First** - WCAG 2.1 AA compliance mandatory

**Inspiration:** Heavily inspired by Chakra UI's component API patterns and token system.

---

## 📁 Monorepo Structure

```
monkbunch/                         # Monorepo root
├── packages/                      # Publishable npm packages (@monkbunch/*)
│   ├── design-tokens/         # Style Dictionary → CSS variables + TypeScript
│   │   ├── tokens/
│   │   │   ├── base/          # Raw values (colors, spacing, typography)
│   │   │   ├── themes/        # light.json & dark.json (semantic tokens)
│   │   │   └── component/     # Component-specific tokens (future)
│   │   ├── formats/           # Custom Style Dictionary formats
│   │   ├── build.js           # Token build script
│   │   └── TOKENS.md          # Complete token reference
│   │
│   ├── design-kit/            # Lit web components
│   │   ├── src/
│   │   │   ├── core/          # Base classes & utilities
│   │   │   │   ├── base-element.ts
│   │   │   │   ├── base-typography.ts
│   │   │   │   └── styles.ts
│   │   │   ├── components/
│   │   │   │   ├── typography/  # Heading, Text, Link
│   │   │   │   └── layout/      # Box, Stack, Flex, Container, Grid
│   │   │   ├── utils/
│   │   │   │   └── theme.ts     # Theme switching utilities
│   │   │   └── theme/
│   │   │       └── index.ts     # Imports token CSS
│   │   └── web-test-runner.config.mjs
│   │
│   └── design-kit-react/      # React wrappers via @lit/react
│       └── src/
│           ├── typography.tsx  # React components (Heading, Text, Link)
│           ├── layout.tsx      # React components (Box, Stack, Flex, Container, Grid)
│           └── index.ts
│
├── apps/                      # Internal applications (NOT published to npm)
│   └── (to be added)          # Future apps like "portal" go here
│
├── .storybook/                # Unified Storybook config
│   ├── main.ts
│   └── preview.ts             # Theme switcher integration
│
├── CLAUDE.md                  # This file - read first!
├── ARCHITECTURE.md            # System architecture deep dive
├── nx.json                    # Nx configuration (apps/ and packages/ layout)
└── package.json               # Monorepo root (name: "monkbunch")
```

**Key Distinction:**
- `packages/*` → Published to npm as `@monkbunch/package-name`
- `apps/*` → Internal applications, not published

---

## 🎨 Token System Architecture

### **3-Tier Token Structure**

1. **Base Tokens** (`tokens/base/*.json`)
   - Raw values: colors, spacing, typography, border radius
   - These DON'T change with theme
   - Example: `color.blue.500`, `space.4`, `font.size.md`

2. **Semantic Tokens** (`tokens/themes/{light|dark}.json`)
   - Contextual meanings that ADAPT to theme
   - Example: `text.primary` (gray.900 in light, gray.100 in dark)
   - **38 semantic tokens** (text, bg, border, focus, shadows) - see TOKENS.md for complete reference

3. **Component Tokens** (`tokens/component/*.json`) - Future
   - Component-specific tokens
   - Example: `button.primary.bg`, `input.border.focus`

### **Token Categories**

**Text Colors** (11 tokens):
```json
text.primary, secondary, tertiary, disabled
text.on-accent, on-muted
text.link, success, warning, error, info
```

**Background Colors** (11 tokens):
```json
bg.canvas, surface, surface-raised
bg.subtle, muted, hover, active
bg.accent, accent-subtle, accent-hover, accent-active
```

**Border Colors** (10 tokens):
```json
border.default, muted, emphasized, disabled
border.hover, focus
border.success, warning, error, info
```

**Focus Ring** (3 tokens):
```json
focus.ring.color, width, offset
```

**Shadows** (3 semantic tokens):
```json
shadow.card, dropdown, modal
```

### **Responsive Design Tokens**

**Breakpoints** (6 tokens):
```json
breakpoint.xs, sm, md, lg, xl, 2xl
// Mobile-first: xs (0px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
```

**Containers** (6 tokens):
```json
container.sm, md, lg, xl, 2xl, full
// Max-width containers: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px), full (100%)
```

**Base Shadows** (7 tokens):
```json
shadow.none, sm, md, lg, xl, 2xl, inner
// Example: shadow.md → "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
```

**Z-Index Scale** (10 tokens):
```json
z-index.hide, base, dropdown, sticky, fixed, overlay, modal, popover, toast, tooltip
// Range: -1 (hide) to 1700 (tooltip)
```

**Animation** (10 tokens):
```json
// Duration
duration.instant, fast, normal, slow, slower
// 0ms, 150ms, 250ms, 350ms, 500ms

// Easing
easing.linear, ease-in, ease-out, ease-in-out, bounce
```

**Usage Examples:**
```typescript
// Responsive design
@media (min-width: var(--monk-breakpoint-md)) {
  max-width: var(--monk-container-lg);
}

// Elevation system
box-shadow: var(--monk-shadow-card);  // Adapts to light/dark theme

// Z-index layering
z-index: var(--monk-z-index-modal);   // Always 1400

// Animations
transition: transform var(--monk-duration-normal) var(--monk-easing-ease-out);
```

### **Theme System**

- Controlled via `data-theme` attribute on `<html>`
- CSS custom properties auto-update when theme changes
- No JavaScript re-rendering needed
- Supports: `light` (default), `dark`

```javascript
// Set theme
document.documentElement.setAttribute('data-theme', 'dark');

// Or use utility
import { setTheme } from '@monkbunch/design-kit/utils/theme';
setTheme('dark');
```

---

## 🧩 Component Architecture

### **Base Classes**

All components extend base classes:

**MonkBaseElement** (`core/base-element.ts`):
- Extends `LitElement`
- Common properties: `hidden`
- Shared utilities

**MonkBaseTypography** (`core/base-typography.ts`):
- Extends `MonkBaseElement`
- Typography properties: `align`, `transform`, `italic`, `nowrap`, `truncate`, `lineClamp`
- Used by: Heading, Text, Link

### **Typography Components** (Complete ✅)

**Heading** (`<monk-heading>`):
- Props: `level` (h1-h6), `color` (primary/secondary/tertiary)
- Extends: `MonkBaseTypography`
- File: `src/components/typography/heading.ts`

**Text** (`<monk-text>`):
- Props: `size` (xs/sm/md/lg/xl), `weight` (regular/medium/semibold/bold), `color` (8 variants)
- Extends: `MonkBaseTypography`
- File: `src/components/typography/text.ts`

**Link** (`<monk-link>`):
- Props: `href`, `target`, `underline`, `download`, `rel`
- Extends: `MonkBaseTypography`
- File: `src/components/typography/link.ts`

### **Layout Components** (Complete ✅)

**Box** (`<monk-box>`):
- The foundational layout primitive - all other layout components build on Box
- Props: `display`, `padding`, `margin`, `bg`, `border`, `radius`, `shadow`
- Extends: `MonkBaseElement`
- File: `src/components/layout/box.ts`

**Properties:**
```typescript
display: 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid'
padding: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16'
margin: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16'
bg: 'canvas' | 'surface' | 'surface-raised' | 'subtle' | 'muted' | 'accent' | 'accent-subtle'
radius: 'sm' | 'md' | 'lg' | 'xl' | 'full'
shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
border: string (e.g., '1px')
```

**Usage Examples:**
```html
<!-- Simple card -->
<monk-box padding="8" bg="surface" radius="lg" shadow="md">
  <monk-heading level="h3">Card Title</monk-heading>
  <monk-text>Card content goes here</monk-text>
</monk-box>

<!-- Flex container -->
<monk-box display="flex" padding="4" style="gap: 16px;">
  <monk-box padding="4" bg="accent-subtle">Item 1</monk-box>
  <monk-box padding="4" bg="accent-subtle">Item 2</monk-box>
</monk-box>

<!-- Grid layout -->
<monk-box
  display="grid"
  padding="4"
  style="grid-template-columns: repeat(3, 1fr); gap: 16px;"
>
  <monk-box padding="6" bg="surface" radius="md">Grid Item</monk-box>
  <!-- More items... -->
</monk-box>

<!-- Nested composition -->
<monk-box bg="canvas" padding="6">
  <monk-box bg="surface" padding="8" radius="lg" shadow="card">
    <monk-heading level="h2">Section Title</monk-heading>
    <monk-text>Boxes compose naturally for complex layouts</monk-text>
  </monk-box>
</monk-box>
```

**White-Label Customization:**
```css
/* Style all boxes */
monk-box::part(box) {
  transition: transform 0.2s;
}

/* Style flex boxes specifically */
monk-box[display='flex']::part(box) {
  align-items: center;
  justify-content: space-between;
}

/* Add hover effects */
monk-box[shadow]::part(box):hover {
  transform: translateY(-2px);
}
```

**Stack** (`<monk-stack>`):
- Layouts children with consistent spacing (vertical or horizontal)
- Props: `direction`, `spacing`, `align`, `justify`, `wrap`
- Extends: `MonkBaseElement`
- File: `src/components/layout/stack.ts`

**Properties:**
```typescript
direction: 'vertical' | 'horizontal'  // default: 'vertical'
spacing: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16'  // default: '4'
align: 'start' | 'center' | 'end' | 'stretch'  // default: 'stretch'
justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'  // default: 'start'
wrap: boolean  // default: false
```

**Usage Examples:**
```html
<!-- Vertical stack (default) -->
<monk-stack spacing="4">
  <monk-box padding="4" bg="surface">Item 1</monk-box>
  <monk-box padding="4" bg="surface">Item 2</monk-box>
  <monk-box padding="4" bg="surface">Item 3</monk-box>
</monk-stack>

<!-- Horizontal stack -->
<monk-stack direction="horizontal" spacing="3" align="center">
  <monk-box padding="3" bg="accent">Left</monk-box>
  <monk-box padding="3" bg="accent">Center</monk-box>
  <monk-box padding="3" bg="accent">Right</monk-box>
</monk-stack>

<!-- Form layout -->
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

**Flex** (`<monk-flex>`):
- Flexbox layout primitive with common patterns
- Props: `direction`, `align`, `justify`, `wrap`, `gap`, `inline`
- Extends: `MonkBaseElement`
- File: `src/components/layout/flex.ts`

**Properties:**
```typescript
direction: 'row' | 'row-reverse' | 'column' | 'column-reverse'  // default: 'row'
align: 'start' | 'center' | 'end' | 'stretch' | 'baseline'  // default: 'stretch'
justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'  // default: 'start'
wrap: 'nowrap' | 'wrap' | 'wrap-reverse'  // default: 'nowrap'
gap: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16'
inline: boolean  // default: false
```

**Usage Examples:**
```html
<!-- Centered content -->
<monk-flex justify="center" align="center" style="min-height: 300px;">
  <monk-box padding="6" bg="accent">Centered Content</monk-box>
</monk-flex>

<!-- Header with space-between -->
<monk-flex justify="between" align="center">
  <monk-heading level="h3">Dashboard</monk-heading>
  <monk-flex gap="3">
    <monk-box padding="3" bg="accent">New</monk-box>
    <monk-box padding="3" bg="surface">Settings</monk-box>
  </monk-flex>
</monk-flex>

<!-- Media object pattern -->
<monk-flex gap="4">
  <monk-box padding="0" bg="accent" radius="full" style="width: 64px; height: 64px;">
    <!-- Avatar -->
  </monk-box>
  <monk-flex direction="column" gap="2" style="flex: 1;">
    <monk-heading level="h4">User Name</monk-heading>
    <monk-text size="sm" color="secondary">User description...</monk-text>
  </monk-flex>
</monk-flex>
```

**Container** (`<monk-container>`):
- Constrains content width for responsive layouts
- Props: `size`, `centerContent`
- Extends: `MonkBaseElement`
- File: `src/components/layout/container.ts`

**Properties:**
```typescript
size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'  // default: 'xl'
centerContent: boolean  // default: true
```

**Usage Examples:**
```html
<!-- Page layout -->
<monk-container size="lg">
  <monk-stack spacing="8">
    <monk-heading level="h1">Welcome</monk-heading>
    <monk-text>
      Container ensures optimal reading width and centers content.
      Perfect for blog posts, documentation, and content-focused pages.
    </monk-text>
  </monk-stack>
</monk-container>

<!-- Blog post with smaller container -->
<monk-container size="md">
  <monk-stack spacing="6">
    <monk-heading level="h1">Article Title</monk-heading>
    <monk-text>
      The md container (768px max-width) provides optimal line length
      for reading, typically 45-75 characters per line.
    </monk-text>
  </monk-stack>
</monk-container>

<!-- Full-width section -->
<monk-container size="full">
  <monk-grid columns="4" gap="4">
    <!-- Dashboard widgets spanning full width -->
  </monk-grid>
</monk-container>
```

**Grid** (`<monk-grid>`):
- CSS Grid layout primitive with responsive features
- Props: `columns`, `rows`, `gap`, `columnGap`, `rowGap`, `minColumnWidth`, `autoFlow`, `inline`
- Extends: `MonkBaseElement`
- File: `src/components/layout/grid.ts`

**Properties:**
```typescript
columns: string  // Number or custom value: "3" or "200px 1fr 2fr"
rows: string  // Number or custom value: "2" or "auto 1fr auto"
gap: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16'
columnGap: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16'
rowGap: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16'
minColumnWidth: string  // For responsive auto-fit: "200px"
autoFlow: 'row' | 'column' | 'row-dense' | 'column-dense'  // default: 'row'
inline: boolean  // default: false
```

**Usage Examples:**
```html
<!-- 3-column grid -->
<monk-grid columns="3" gap="4">
  <monk-box padding="6" bg="surface">Item 1</monk-box>
  <monk-box padding="6" bg="surface">Item 2</monk-box>
  <monk-box padding="6" bg="surface">Item 3</monk-box>
  <monk-box padding="6" bg="surface">Item 4</monk-box>
  <monk-box padding="6" bg="surface">Item 5</monk-box>
  <monk-box padding="6" bg="surface">Item 6</monk-box>
</monk-grid>

<!-- Responsive grid (auto-fit) -->
<monk-grid min-column-width="200px" gap="4">
  <!-- Automatically adjusts columns based on available space -->
  <monk-box padding="6" bg="surface">Card 1</monk-box>
  <monk-box padding="6" bg="surface">Card 2</monk-box>
  <monk-box padding="6" bg="surface">Card 3</monk-box>
</monk-grid>

<!-- Custom column widths (sidebar layout) -->
<monk-grid columns="200px 1fr" gap="6">
  <monk-box padding="4" bg="surface">Sidebar</monk-box>
  <monk-box padding="4" bg="surface">Main Content</monk-box>
</monk-grid>

<!-- Dashboard grid with custom rows -->
<monk-grid columns="2fr 1fr" rows="auto 1fr auto" gap="4">
  <monk-box padding="4" bg="surface">Header (spans 2 columns)</monk-box>
  <monk-box padding="8" bg="surface">Main Chart</monk-box>
  <monk-box padding="4" bg="surface">Sidebar Stats</monk-box>
  <monk-box padding="4" bg="surface">Footer (spans 2 columns)</monk-box>
</monk-grid>

<!-- Different column and row gaps -->
<monk-grid columns="3" column-gap="6" row-gap="2">
  <!-- Wide horizontal spacing, tight vertical spacing -->
</monk-grid>
```

### **Component Patterns to Follow**

1. **Use semantic tokens** - Never hardcode colors
   ```typescript
   // ✅ Good
   color: var(--monk-color-text-primary);

   // ❌ Bad
   color: #181922;
   ```

2. **Support theme switching** - Use CSS custom properties
   ```typescript
   :host([variant='primary']) {
     background: var(--monk-color-bg-accent);
     color: var(--monk-color-text-on-accent);
   }
   ```

3. **Focus indicators** - Always use focus ring tokens
   ```typescript
   :host(:focus-visible) {
     outline: var(--monk-focus-ring-width) solid var(--monk-focus-ring-color);
     outline-offset: var(--monk-focus-ring-offset);
   }
   ```

4. **Accessibility mandatory**
   - WCAG 2.1 AA compliance
   - Semantic HTML
   - ARIA attributes
   - Keyboard navigation
   - Test with `@open-wc/testing`

5. **Prop naming conventions** (Chakra-inspired)
   - `size`: xs | sm | md | lg | xl
   - `variant`: visual style (solid, outline, ghost)
   - `colorScheme`: semantic color (not `color` for backgrounds)
   - States: `disabled`, `loading`, etc.

---

## 🛠️ Development Commands

```bash
# Build all packages
npm run build

# Build specific package
npm run build design-tokens
npm run build design-kit
npm run build design-kit-react

# Run tests
npm run test

# Storybook (port 6006)
npm run storybook

# Build Storybook
npm run build-storybook

# Watch tokens
npm run tokens:watch
```

### **Package-Specific Commands**

```bash
# Design tokens
cd packages/design-tokens
node build.js

# Design kit
cd packages/design-kit
npx tsc -p tsconfig.json                    # Build
npx web-test-runner                         # Test

# Design kit React
cd packages/design-kit-react
npx tsc -p tsconfig.json                    # Build
```

---

## 🚨 Critical Decisions Made (DO NOT CHANGE)

### 1. **Token Naming**
- ✅ Use `text.*` (not `fg.*`) - More explicit and beginner-friendly
- ✅ Use full words (not abbreviations) - `disabled` not `dsbl`
- ❌ DO NOT add `inverse` color back - Removed intentionally

### 2. **Build Artifacts**
- Compiled `.js` files ONLY in `dist/`
- `.gitignore` prevents pollution of `src/`
- Never commit compiled files in `src/`

### 3. **TypeScript Config**
- `skipLibCheck: true` - Necessary for React wrappers
- No `rootDir` - Allows importing from node_modules
- Strict mode enabled

### 4. **React Wrappers**
- Use `@lit/react` `createComponent()`
- Props: `Omit<React.HTMLAttributes<HTMLElement>, 'onChange'>` to avoid conflicts
- Events mapped: `onChange` → `change`, etc.

### 5. **Theme Structure**
- Semantic tokens in `tokens/themes/` (not `tokens/semantic/`)
- Tokens match exact path structure: `color.text.primary` → `--monk-color-text-primary`
- Base tokens reference: `{color.gray.900}` syntax

---

## 🎨 White-Label Customization

The design system supports white-label customization through two complementary approaches:

### 1. **CSS Custom Properties** (Primary Method)

Override design tokens at the root level or on specific elements:

```css
/* Global customization */
:root {
  --monk-color-text-primary: #1a1a1a;
  --monk-font-family-base: 'Inter', sans-serif;
  --monk-radius-md: 8px;
}

/* Scoped customization */
.my-app {
  --monk-color-bg-accent: #ff6b6b;
  --monk-color-text-link: #4ecdc4;
}
```

### 2. **CSS Parts** (Shadow DOM Styling)

All typography components expose CSS parts for external styling:

**MonkHeading** exposes `::part(heading)`:

```css
/* Style all headings */
monk-heading::part(heading) {
  font-family: 'Custom Font', serif;
  letter-spacing: -0.02em;
}

/* Target specific levels */
monk-heading[level='h1']::part(heading) {
  text-transform: uppercase;
}

/* Target specific colors */
monk-heading[color='primary']::part(heading) {
  background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**MonkText** exposes `::part(text)`:

```css
/* Style all text */
monk-text::part(text) {
  line-height: 1.7; /* Override --monk-font-lineHeight-normal */
}

/* Target specific sizes */
monk-text[size='lg']::part(text) {
  font-variant: small-caps;
}

/* Target specific colors */
monk-text[color='success']::part(text) {
  font-weight: 600;
}
```

**MonkLink** exposes `::part(link)`:

```css
/* Style all links */
monk-link::part(link) {
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
}

/* Style external links */
monk-link[target='_blank']::part(link external) {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

monk-link[target='_blank']::part(link external)::after {
  content: '↗';
  font-size: 0.875em;
}
```

### Best Practices

1. **Prefer CSS Custom Properties**: Override tokens for global changes
2. **Use CSS Parts for Specificity**: When you need to style internal structure
3. **Maintain Accessibility**: Ensure sufficient color contrast (4.5:1 minimum)
4. **Test Across Themes**: Verify customizations work in light and dark modes
5. **Respect Motion Preferences**: Keep animations minimal and respect `prefers-reduced-motion`

### Complete Customization Example

```css
/* Brand customization with tokens */
:root {
  /* Colors */
  --monk-color-blue-500: #your-brand-color;
  --monk-color-text-link: #your-brand-color;

  /* Typography */
  --monk-font-family-base: 'Your Brand Font', system-ui, sans-serif;
  --monk-font-lineHeight-normal: 1.6;

  /* Spacing */
  --monk-space-4: 20px; /* Custom grid system */

  /* Shadows */
  --monk-shadow-card: 0 8px 16px rgba(0, 0, 0, 0.08);
}

/* Fine-tune with CSS parts */
monk-heading::part(heading) {
  font-weight: 800;
  letter-spacing: -0.03em;
}

monk-text::part(text) {
  color: var(--custom-text-color, inherit);
}

monk-link::part(link) {
  text-decoration: none;
  border-bottom: 2px solid currentColor;
  transition: border-color 0.2s;
}

monk-link::part(link):hover {
  border-bottom-color: transparent;
}
```

---

## 📝 Key Files to Reference

**Token Reference:**
- `packages/design-tokens/TOKENS.md` - Complete token documentation

**Architecture:**
- `ARCHITECTURE.md` - Deep dive into system design

**Testing Patterns:**
- `packages/design-kit/src/components/typography/heading.spec.ts` - Example test file

**Stories Pattern:**
- `packages/design-kit/src/components/typography/text.stories.ts` - Example Storybook stories

**React Wrapper Pattern:**
- `packages/design-kit-react/src/typography.tsx` - Example React wrappers

---

## 🔄 When Building New Components

### Checklist:

1. **Create component** in `packages/design-kit/src/components/{category}/`
   - Extend `MonkBaseElement` or `MonkBaseTypography`
   - Use semantic tokens (never hardcode)
   - Include JSDoc with accessibility notes

2. **Create tests** (`*.spec.ts`)
   - Accessibility tests (axe-core)
   - Keyboard navigation
   - Props and states
   - Use `@open-wc/testing`

3. **Create Storybook stories** (`*.stories.ts`)
   - Default story with controls
   - Variant examples
   - Accessibility story
   - State demonstrations

4. **Export from index**
   - Add to `src/components/{category}/index.ts`
   - Export types

5. **Create React wrapper** in `packages/design-kit-react/src/`
   - Use `createComponent()` from `@lit/react`
   - Define TypeScript interface
   - Map events

6. **Document usage**
   - Update package README
   - Add API documentation

---

## 🎯 Current State

### ✅ Completed
- ✅ Nx workspace setup
- ✅ Design tokens (38 semantic + 39 base tokens = 77 total)
- ✅ Foundational tokens (breakpoints, containers, shadows, z-index, animation)
- ✅ Light/dark theme system
- ✅ Typography components (Heading, Text, Link) with CSS parts
- ✅ Layout primitives (Box, Stack, Flex, Container, Grid) with CSS parts
- ✅ React wrappers for typography and layout
- ✅ Storybook with theme switcher (50+ stories across all components)
- ✅ Accessibility testing setup
- ✅ Comprehensive token and component documentation
- ✅ White-label customization (CSS custom properties + CSS parts)

### 📋 Next Steps (Planned)
- Button component (solid, outline, ghost variants)
- Badge component (status indicators)
- Divider component
- Form components (Input, Textarea, Select, Checkbox, Radio)
- Card component (with shadow tokens)
- Modal/Dialog (with z-index tokens)
- Navigation components
- Icon system integration

---

## 🐛 Common Issues & Solutions

### Issue: Nx commands fail
```bash
# Use npm instead
npm run build
# or npx
npx nx build design-kit
```

### Issue: Storybook shows [object Object]
- Check that decorator uses `html` tagged template from 'lit'
- Never use plain template strings with Lit templates

### Issue: TypeScript errors in React wrappers
- Ensure `skipLibCheck: true` in tsconfig.json
- Use `Omit<React.HTMLAttributes, 'onChange'>` for props

### Issue: Compiled files in src/
- Check `.gitignore` includes `src/**/*.js`
- Run `find src -name "*.js" -delete` to clean

### Issue: Token not found during build
- Verify token exists in base colors
- Check JSON syntax (trailing commas not allowed)
- Ensure proper reference syntax: `{color.blue.500}`

---

## 💡 Tips for New Components

1. **Start with Chakra UI research**
   - Check how Chakra implements similar components
   - Adopt their prop naming conventions
   - Follow their composition patterns

2. **Token-first design**
   - Never hardcode values
   - Use semantic tokens for all colors, spacing, typography
   - Test in both light and dark themes

3. **Accessibility is mandatory**
   - Semantic HTML first
   - ARIA attributes when needed
   - Keyboard navigation
   - Focus indicators
   - Screen reader testing

4. **Test early and often**
   - Write tests alongside components
   - Use `@open-wc/testing` for accessibility
   - Test all interactive states

5. **Composition over configuration**
   - Prefer nested components over props
   - Keep prop APIs simple and predictable
   - Follow Chakra's patterns

---

## 📚 External Resources

**Inspiration:**
- Chakra UI: https://chakra-ui.com/
- Chakra UI Docs: https://chakra-ui.com/docs/components

**Technologies:**
- Lit: https://lit.dev/
- @lit/react: https://lit.dev/docs/frameworks/react/
- Style Dictionary: https://amzn.github.io/style-dictionary/
- @open-wc/testing: https://open-wc.org/docs/testing/testing-package/

---

## ✨ Project Philosophy

1. **Developer Experience First**
   - Intuitive APIs inspired by Chakra UI
   - Predictable prop patterns
   - Clear documentation

2. **Accessibility Non-Negotiable**
   - WCAG 2.1 AA minimum
   - Keyboard navigation everywhere
   - Screen reader friendly

3. **Theme-Aware Everything**
   - Light/dark mode built-in
   - White-label ready
   - CSS custom properties

4. **Framework Agnostic**
   - Web components at core
   - Optional React wrappers
   - Future: Vue, Angular, Svelte

5. **Type-Safe**
   - TypeScript throughout
   - Strict mode enabled
   - Comprehensive types

---

**Last Updated:** January 2025
**Current Version:** 0.1.0
**Status:** Active Development (Typography components complete)
