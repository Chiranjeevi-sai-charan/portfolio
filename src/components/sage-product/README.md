# Sage Product Component Library

Complete component library for Sage: AI-Powered HR Assistant.

## Directory Structure

```
sage-product/
├── Button.tsx                 # Primary button component
├── Input.tsx                  # Text input component
├── Select.tsx                 # Dropdown select
├── Checkbox.tsx               # Checkbox input
├── Radio.tsx                  # Radio button
├── Toggle.tsx                 # Toggle switch
├── Header.tsx                 # Top navigation bar
├── Sidebar.tsx                # Left sidebar navigation
├── Tabs.tsx                   # Tab navigation
├── Breadcrumbs.tsx           # Breadcrumb navigation
├── ChatBubble.tsx            # Chat message bubble (user + AI)
├── Card.tsx                  # Reusable card component
├── Table.tsx                 # Data table/grid
├── Badge.tsx                 # Status badge
├── Modal.tsx                 # Modal dialog
├── Dropdown.tsx              # Dropdown menu
├── Alert.tsx                 # Alert message
├── Toast.tsx                 # Toast notification
├── Avatar.tsx                # User avatar
├── LoadingSpinner.tsx        # Loading indicator
├── EmptyState.tsx            # Empty state illustration
├── Pagination.tsx            # Pagination controls
├── layouts/
│   ├── ChatLayout.tsx        # Employee chat interface layout
│   ├── AdminLayout.tsx       # Admin dashboard layout
│   └── SystemAdminLayout.tsx # System admin dashboard layout
├── index.ts                  # Central export file
└── README.md                 # This file
```

## Component Naming Conventions

- **File names:** PascalCase (e.g., `Button.tsx`)
- **Export names:** PascalCase React component (e.g., `export const Button`)
- **Props interface:** `[ComponentName]Props` (e.g., `ButtonProps`)

## TypeScript Structure

Each component follows this structure:

```tsx
import React from 'react';
import { /* design tokens */ } from '../../styles/sage/tokens';

/**
 * [ComponentName] Component
 *
 * Description of what this component does.
 * Key features and use cases.
 *
 * @component
 * @example
 * <Button variant="primary">Click me</Button>
 */

interface [ComponentName]Props extends React.HTMLAttributes<HTMLElement> {
  /** Prop description */
  prop1?: string;
  
  /** Another prop */
  prop2: boolean;
  
  children?: React.ReactNode;
}

/**
 * [ComponentName] - Full description with variants, sizes, states
 *
 * Variants:
 * - variant1: Description
 * - variant2: Description
 *
 * Sizes:
 * - sm: Compact size
 * - md: Standard size
 * - lg: Large size
 *
 * States:
 * - default: Normal
 * - hover: On hover
 * - active: Active/pressed
 * - disabled: Disabled
 * - loading: Loading (if applicable)
 */
export const [ComponentName]: React.FC<[ComponentName]Props> = ({
  // props
}) => {
  // implementation
};

[ComponentName].displayName = '[ComponentName]';
```

## Design Tokens Usage

All components use design tokens from `src/styles/sage/tokens.ts`:

```tsx
import { colors, spacing, shadows, borderRadius, typography } from '../../styles/sage/tokens';

// Usage in component
const styles = {
  backgroundColor: colors['sage-green-500'],
  padding: spacing.lg,
  borderRadius: borderRadius.md,
  boxShadow: shadows.sm,
};
```

## Component Variants

Each component should support these common variants:

### Buttons
- `variant`: primary | secondary | tertiary | destructive
- `size`: sm | md | lg
- `state`: default | hover | active | disabled | loading

### Form Inputs
- `size`: sm | md | lg
- `state`: default | focus | error | disabled
- Error message and validation support

### Cards
- Shadow levels based on elevation
- Hover states with elevation changes

### Badges
- Color variants (success, warning, error, info)
- Size variants (sm, md, lg)

## Color Usage Guidelines

- **Primary action:** `sage-green-500`
- **Hover state:** `sage-green-600`
- **Active state:** `sage-green-700`
- **Text (primary):** `neutral-900`
- **Text (secondary):** `neutral-600`
- **Background (primary):** `neutral-white`
- **Background (secondary):** `neutral-50`
- **Success:** `success-green`
- **Warning:** `warning-amber`
- **Error:** `error-red`
- **Info:** `info-cyan`

## Spacing Guidelines

- Use consistent spacing from the scale: xs(4px), sm(8px), md(12px), lg(16px), xl(24px), 2xl(32px), 3xl(48px), 4xl(64px)
- Never use arbitrary pixel values
- Padding/margin should be consistent with spacing scale

## Creating New Components

1. **Create component file** in appropriate directory
2. **Define TypeScript interface** with Props
3. **Add JSDoc comments** with component description and variants
4. **Implement component** using design tokens
5. **Add to index.ts** export list
6. **Create story file** in `sage-product-stories/` for Storybook

Example:

```tsx
// src/components/sage-product/MyComponent.tsx
export const MyComponent: React.FC<MyComponentProps> = ({...}) => {
  // ...
};

// Add to index.ts
export { MyComponent } from "./MyComponent";

// Create story
// src/components/sage-product-stories/MyComponent.stories.tsx
import { MyComponent } from '../sage-product/MyComponent';

export default {
  title: 'Sage/MyComponent',
  component: MyComponent,
};

export const Default = {
  args: { /* default props */ },
};

export const Variant = {
  args: { /* variant props */ },
};
```

## Testing & Verification

- Each component should support all documented variants
- Test with different content lengths (English + Japanese text)
- Verify accessibility (keyboard navigation, screen readers)
- Ensure hover/active states are clearly visible
- Test disabled and loading states

## Figma Reverse-Engineering

For Figma agent:
- Component folder path: `/src/components/sage-product/`
- Design tokens: `/src/styles/sage/tokens.json`
- Storybook: Will be deployed when set up
- Each component file includes TypeScript props that define available variants
- Each component's JSDoc includes variant documentation

Figma agent will extract:
1. Component structure from TypeScript interfaces
2. Visual styles from inline CSS
3. Variants from component prop definitions
4. Color/spacing values from tokens.json

## Next Steps

1. Build foundational form components (Input, Select, Checkbox, etc.)
2. Build navigation components (Header, Sidebar, Tabs, etc.)
3. Build content components (ChatBubble, Card, Table, Badge, etc.)
4. Build modal/overlay components (Modal, Dropdown, Alert, Toast, etc.)
5. Build layout components (ChatLayout, AdminLayout, etc.)
6. Create Storybook stories for each component
7. Build three main product pages (EmployeeChatbot, AdminDashboard, SystemAdminDashboard)
