# Sage Design System

Complete design system documentation with colors, typography, spacing, and components.

## Architecture

```
Design System Hierarchy:
├── tokens.json                 (Source of truth - all values)
├── tokens.ts                   (JavaScript export of tokens)
├── global.css                  (CSS variables + global styles)
├── utilities.css               (Helper classes)
├── index.css                   (Import all CSS)
└── Components use tokens.ts    (TypeScript imports)
```

## Files Overview

### 1. **tokens.json** (Source of Truth)
Master file with all design values. Updated once, propagates everywhere.

**What it contains:**
- Colors (primary, neutral, semantic)
- Spacing scale (4px base unit)
- Typography (sizes, weights, line heights)
- Shadows (5 elevation levels)
- Component sizes (button, input, header, sidebar)
- Z-index values
- Responsive breakpoints

**For Figma Agent:** This is the cleanest source to read from.

### 2. **tokens.ts** (JavaScript Export)
Exports `tokens.json` data as JavaScript objects for TypeScript components.

**Usage in components:**
```typescript
import { colors, spacing, borderRadius, shadows } from '../../styles/sage/tokens';

const buttonStyles = {
  backgroundColor: colors['sage-green-500'],
  padding: spacing.lg,
  borderRadius: borderRadius.md,
  boxShadow: shadows.sm,
};
```

### 3. **global.css** (CSS Variables)
Converts `tokens.json` values to CSS variables (--variable-name).

**Available variables:**
- `--sage-green-500`, `--neutral-900`, etc. (colors)
- `--space-xs`, `--space-lg`, etc. (spacing)
- `--fs-h1`, `--fs-body-md`, etc. (font sizes)
- `--fw-bold`, `--fw-semibold`, etc. (font weights)
- `--radius-md`, `--radius-lg`, etc. (border radius)
- `--shadow-sm`, `--shadow-lg`, etc. (shadows)
- `--z-dropdown`, `--z-modal`, etc. (z-index)
- `--bp-mobile`, `--bp-desktop`, etc. (breakpoints)

**Global styles included:**
- CSS reset (normalization)
- HTML, body defaults
- Typography resets (h1-h6, p, a, etc.)
- Form element resets
- Animations (@keyframes spin, pulse, fadeIn, slideUp)
- Scrollbar styling
- Accessibility focus styles

### 4. **utilities.css** (Helper Classes)
Reusable CSS classes for common patterns.

**Categories:**
- **Spacing:** `.p-lg`, `.m-xl`, `.gap-md`, `.mx-auto`, etc.
- **Typography:** `.text-h1`, `.text-body-md`, `.font-bold`, `.leading-relaxed`, etc.
- **Colors:** `.text-primary`, `.bg-sage-green`, `.text-error`, etc.
- **Layout:** `.flex`, `.flex-center`, `.grid-3`, `.block`, `.hidden`, etc.
- **Borders:** `.rounded-md`, `.border`, `.border-error`, etc.
- **Shadows:** `.shadow-sm`, `.shadow-xl`, etc.
- **Sizing:** `.w-full`, `.max-w-xl`, `.min-h-screen`, etc.
- **Positioning:** `.relative`, `.absolute`, `.z-modal`, etc.
- **Transitions:** `.transition-fast`, `.transition-slow`, etc.
- **Responsive:** `.mobile-hidden`, `.tablet-hidden`, `.desktop-hidden`
- **Accessibility:** `.sr-only` (screen reader only)

### 5. **index.css** (Main Entry Point)
Single file that imports all design system files.

**In App.jsx:**
```typescript
import './styles/sage/index.css';
```

## How to Use

### Option A: Component Inline Styles (Recommended for Components)

```typescript
import { colors, spacing, borderRadius } from '../../styles/sage/tokens';

export const Button = ({ variant = 'primary', size = 'md', children }) => {
  const styles = {
    backgroundColor: colors['sage-green-500'],
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    cursor: 'pointer',
  };

  return <button style={styles}>{children}</button>;
};
```

**Why:** Components stay self-contained and don't rely on external CSS.

### Option B: CSS Variables (For Global Styles)

```css
.my-button {
  background-color: var(--sage-green-500);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
}
```

### Option C: Utility Classes (Quick Styling)

```jsx
<div className="flex gap-lg p-xl rounded-md bg-secondary shadow-sm">
  <button className="text-h4 font-bold">Click me</button>
</div>
```

## Design Tokens Reference

### Colors

**Primary (Sage Green - Trust & Growth):**
```
--sage-green-50:   #F1F8F6 (lightest)
--sage-green-100:  #E0F0EB
--sage-green-500:  #4CAF50 (primary action)
--sage-green-600:  #388E3C (hover state)
--sage-green-700:  #2E7D32 (active state, darkest)
```

**Neutral Grays:**
```
--neutral-white:   #FFFFFF
--neutral-50:      #F9FAFB (light background)
--neutral-100:     #F3F4F6
--neutral-200:     #E5E7EB (borders)
--neutral-300:     #D1D5DB
--neutral-400:     #9CA3AF
--neutral-500:     #6B7280
--neutral-600:     #4B5563
--neutral-700:     #374151
--neutral-900:     #111827 (darkest text)
```

**Semantic:**
```
--success-green:   #10B981 (confirmations)
--warning-amber:   #F59E0B (alerts)
--error-red:       #EF4444 (errors)
--info-cyan:       #06B6D4 (info)
--accent-blue:     #2563EB (secondary actions)
```

### Spacing Scale (4px base unit)

```
--space-xs:   4px
--space-sm:   8px
--space-md:   12px
--space-lg:   16px
--space-xl:   24px
--space-2xl:  32px
--space-3xl:  48px
--space-4xl:  64px
```

### Typography

**Font Sizes:**
```
--fs-h1:        32px (page titles)
--fs-h2:        24px (section headers)
--fs-h3:        20px (subsection headers)
--fs-h4:        18px (card titles)
--fs-body-lg:   16px (large body text)
--fs-body-md:   15px (standard body text)
--fs-body-sm:   14px (secondary text)
--fs-body-xs:   12px (captions)
--fs-label-md:  12px (form labels)
--fs-label-sm:  11px (small labels)
--fs-code:      13px (code snippets)
```

**Font Weights:**
```
--fw-light:     300
--fw-regular:   400
--fw-medium:    500
--fw-semibold:  600
--fw-bold:      700
```

**Line Heights:**
```
--lh-tight:     1.2 (headings)
--lh-normal:    1.5 (body)
--lh-relaxed:   1.6 (long text)
--lh-loose:     1.7 (extra space)
```

### Shadows (Elevation System)

```
--shadow-xs:  0 1px 2px rgba(0,0,0,0.05)         (subtle)
--shadow-sm:  0 1px 3px rgba(0,0,0,0.1)...       (slight elevation)
--shadow-md:  0 4px 6px rgba(0,0,0,0.1)...       (moderate)
--shadow-lg:  0 10px 15px rgba(0,0,0,0.1)...     (pronounced)
--shadow-xl:  0 20px 25px rgba(0,0,0,0.1)...     (maximum)
```

### Border Radius

```
--radius-none:  0px
--radius-sm:    4px    (buttons, small elements)
--radius-md:    8px    (cards, inputs)
--radius-lg:    12px   (large components)
--radius-full:  9999px (circles, pills)
```

### Component Sizes

```
--button-height-sm:  32px
--button-height-md:  44px (standard)
--button-height-lg:  48px
--input-height:      44px
--header-height:     64px
--sidebar-width:     200px
```

### Z-Index Scale

```
--z-dropdown:      100 (dropdowns)
--z-sticky:        200 (sticky elements)
--z-fixed:         300 (fixed elements)
--z-modal:         400 (modals)
--z-tooltip:       500 (tooltips)
--z-notification:  600 (toast messages)
```

## Component Guidelines

### Using Design Tokens

✅ **DO:**
```typescript
// Import and use tokens
const buttonStyles = {
  padding: spacing.lg,        // ✅ Correct
  backgroundColor: colors['sage-green-500'],
};
```

❌ **DON'T:**
```typescript
// Arbitrary values
const buttonStyles = {
  padding: '16px',            // ❌ Should use spacing.lg
  backgroundColor: '#4CAF50', // ❌ Should use colors
};
```

### Naming Convention

```typescript
// Token path: type → name → weight/level
colors['sage-green-500']     // color type: sage-green color: 500 level
spacing.lg                   // spacing type: lg (large)
shadows.md                   // shadow type: md (medium)
borderRadius.lg              // radius type: lg (large)
```

## For Figma Agent (Reverse Engineering)

Figma agent can extract the design system from:

1. **`tokens.json`** — Cleanest format (structured JSON)
   - Colors, spacing, typography, shadows, all organized
   - Agent can parse directly

2. **`tokens.ts`** — JavaScript objects
   - Shows how tokens are structured in code
   - Agent can understand exports and object hierarchy

3. **`global.css`** — CSS variables
   - Shows CSS variable declarations
   - Agent can extract CSS values

4. **Component code** — Usage examples
   - Shows how tokens are applied in real components
   - Agent can see actual implementation patterns

**Agent prompt should reference:** 
- GitHub source: `/src/styles/sage/`
- Primary source: `tokens.json`
- Implementation: See components in `/src/components/sage-product/`

## Next Steps

1. Import `src/styles/sage/index.css` in App.jsx
2. Build components using `tokens.ts` imports
3. Use CSS variables in global or component styles as needed
4. Reference utility classes for quick styling

All design values flow from `tokens.json` → components stay consistent and Figma agent can easily extract the system.
