import React from 'react';
import { spacing, colors, shadows, borderRadius } from '../../styles/sage/tokens';

/**
 * Button Component
 *
 * A versatile button component supporting multiple variants, sizes, and states.
 *
 * @component
 * @example
 * // Primary button
 * <Button variant="primary" size="md">Click me</Button>
 *
 * // Secondary button with icon
 * <Button variant="secondary" size="sm" icon={<CheckIcon />}>Confirm</Button>
 *
 * // Destructive button (error state)
 * <Button variant="destructive" size="md" disabled={isDeleting} loading={isDeleting}>
 *   Delete
 * </Button>
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';

  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';

  /** Whether button is in loading state */
  loading?: boolean;

  /** Icon to display (optional) */
  icon?: React.ReactNode;

  /** Icon position relative to text */
  iconPosition?: 'left' | 'right';

  /** Children content */
  children: React.ReactNode;
}

/**
 * Button component with multiple variants and states
 *
 * Variants:
 * - primary: Sage green, primary action (sage-green-500)
 * - secondary: Neutral, secondary action (neutral-200 bg)
 * - tertiary: Ghost/text-only button
 * - destructive: Red, destructive action (error-red)
 *
 * Sizes:
 * - sm: 32px height, compact padding
 * - md: 44px height, standard padding
 * - lg: 48px height, generous padding
 *
 * States:
 * - default: Normal state
 * - hover: Darker/elevated
 * - active: Pressed state
 * - disabled: Reduced opacity, no interaction
 * - loading: Shows spinner, disabled interaction
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 600,
    border: 'none',
    borderRadius: borderRadius.md,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    transition: 'all 0.2s ease-in-out',
    opacity: disabled || loading ? 0.6 : 1,
  };

  // Size styles
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      height: '32px',
      padding: `0 ${spacing.md}`,
      fontSize: '14px',
    },
    md: {
      height: '44px',
      padding: `0 ${spacing.lg}`,
      fontSize: '15px',
    },
    lg: {
      height: '48px',
      padding: `0 ${spacing.xl}`,
      fontSize: '16px',
    },
  };

  // Variant styles
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: colors['sage-green-500'],
      color: colors['neutral-white'],
      boxShadow: shadows.sm,
    },
    secondary: {
      backgroundColor: colors['neutral-200'],
      color: colors['neutral-900'],
      boxShadow: shadows.xs,
    },
    tertiary: {
      backgroundColor: 'transparent',
      color: colors['sage-green-500'],
      border: `2px solid ${colors['sage-green-500']}`,
    },
    destructive: {
      backgroundColor: colors['error-red'],
      color: colors['neutral-white'],
      boxShadow: shadows.sm,
    },
  };

  // Hover states
  const hoverStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: colors['sage-green-600'],
      boxShadow: shadows.md,
    },
    secondary: {
      backgroundColor: colors['neutral-300'],
      boxShadow: shadows.sm,
    },
    tertiary: {
      backgroundColor: colors['sage-green-50'],
    },
    destructive: {
      backgroundColor: '#DC2626', // Darker error
      boxShadow: shadows.md,
    },
  };

  const combinedStyle: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      Object.assign(e.currentTarget.style, hoverStyles[variant]);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      Object.assign(e.currentTarget.style, variantStyles[variant]);
    }
  };

  return (
    <button
      style={combinedStyle}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {loading && (
        <span style={{
          display: 'inline-block',
          width: '16px',
          height: '16px',
          border: '2px solid currentColor',
          borderTop: '2px solid transparent',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      )}

      {!loading && icon && iconPosition === 'left' && icon}

      {!loading && children}

      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
};

Button.displayName = 'Button';
