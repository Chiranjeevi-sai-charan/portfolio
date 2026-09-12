/**
 * Sage Design Tokens
 * Source of truth for colors, spacing, typography, and other design values
 * These values are used throughout the Sage product and exported for Figma reverse-engineering
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Primary: Sage Green (trust, growth, HR)
  "sage-green-50": "#F1F8F6",
  "sage-green-100": "#E0F0EB",
  "sage-green-500": "#4CAF50",
  "sage-green-600": "#388E3C",
  "sage-green-700": "#2E7D32",

  // Neutral Grays (Light Mode)
  "neutral-white": "#FFFFFF",
  "neutral-50": "#F9FAFB",
  "neutral-100": "#F3F4F6",
  "neutral-200": "#E5E7EB",
  "neutral-300": "#D1D5DB",
  "neutral-400": "#9CA3AF",
  "neutral-500": "#6B7280",
  "neutral-600": "#4B5563",
  "neutral-700": "#374151",
  "neutral-900": "#111827",

  // Semantic Colors
  "success-green": "#10B981",
  "warning-amber": "#F59E0B",
  "error-red": "#EF4444",
  "info-cyan": "#06B6D4",
  "accent-blue": "#2563EB",
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  fontFamily: {
    primary: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Courier New', monospace",
  },

  fontSize: {
    // Headings
    "h1": "32px",
    "h2": "24px",
    "h3": "20px",
    "h4": "18px",

    // Body text
    "body-lg": "16px",
    "body-md": "15px",
    "body-sm": "14px",
    "body-xs": "12px",

    // Labels
    "label-md": "12px",
    "label-sm": "11px",

    // Code
    "code": "13px",
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: "1.2",
    normal: "1.5",
    relaxed: "1.6",
    loose: "1.7",
  },

  letterSpacing: {
    tight: "-0.5px",
    normal: "0px",
    loose: "0.5px",
    looser: "0.6px",
  },
};

// ============================================================================
// SPACING SCALE (4px base unit)
// ============================================================================

export const spacing = {
  "xs": "4px",
  "sm": "8px",
  "md": "12px",
  "lg": "16px",
  "xl": "24px",
  "2xl": "32px",
  "3xl": "48px",
  "4xl": "64px",
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  "none": "0px",
  "sm": "4px",
  "md": "8px",
  "lg": "12px",
  "full": "9999px",
};

// ============================================================================
// SHADOWS (Elevation System)
// ============================================================================

export const shadows = {
  "xs": "0 1px 2px rgba(0, 0, 0, 0.05)",
  "sm": "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  "md": "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
  "lg": "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
  "xl": "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
};

// ============================================================================
// ICON SIZES
// ============================================================================

export const iconSizes = {
  "xs": "16px",
  "sm": "20px",
  "md": "24px",
  "lg": "32px",
  "xl": "48px",
};

// ============================================================================
// TEXT STYLES (Semantic)
// ============================================================================

export const textStyles = {
  "heading-h1": {
    fontSize: typography.fontSize["h1"],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  "heading-h2": {
    fontSize: typography.fontSize["h2"],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  "heading-h3": {
    fontSize: typography.fontSize["h3"],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  "heading-h4": {
    fontSize: typography.fontSize["h4"],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  "body-lg": {
    fontSize: typography.fontSize["body-lg"],
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.relaxed,
    letterSpacing: typography.letterSpacing.normal,
  },
  "body-md": {
    fontSize: typography.fontSize["body-md"],
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  "body-sm": {
    fontSize: typography.fontSize["body-sm"],
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  "body-xs": {
    fontSize: typography.fontSize["body-xs"],
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  "label-md": {
    fontSize: typography.fontSize["label-md"],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.loose,
  },
  "label-sm": {
    fontSize: typography.fontSize["label-sm"],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.looser,
  },
};

// ============================================================================
// SEMANTIC TEXT COLORS
// ============================================================================

export const textColors = {
  primary: colors["neutral-900"],
  secondary: colors["neutral-600"],
  tertiary: colors["neutral-500"],
  inverse: colors["neutral-white"],
};

// ============================================================================
// SEMANTIC BACKGROUND COLORS
// ============================================================================

export const bgColors = {
  primary: colors["neutral-white"],
  secondary: colors["neutral-50"],
  tertiary: colors["neutral-100"],
};

// ============================================================================
// COMPONENT SIZES
// ============================================================================

export const componentSizes = {
  button: {
    sm: { height: "32px", padding: "0 12px" },
    md: { height: "44px", padding: "0 16px" },
    lg: { height: "48px", padding: "0 20px" },
  },
  input: {
    height: "44px",
    padding: "12px 16px",
  },
  header: {
    height: "64px",
  },
  sidebar: {
    width: "200px",
  },
};

// ============================================================================
// BREAKPOINTS (Responsive)
// ============================================================================

export const breakpoints = {
  mobile: "375px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1440px",
};

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modal: 400,
  tooltip: 500,
  notification: 600,
};

// ============================================================================
// EXPORT AS JSON (for Figma agent)
// ============================================================================

export const tokensJSON = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  iconSizes,
  textColors,
  bgColors,
  componentSizes,
  breakpoints,
  zIndex,
};
