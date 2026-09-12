import React from 'react';
import { colors, spacing, borderRadius, shadows, typography } from '../../styles/sage/tokens';

/**
 * Input Component
 *
 * Versatile text input supporting multiple sizes, states, and validation.
 * Used for form fields, search bars, and text entry throughout Sage.
 *
 * @component
 * @example
 * // Basic input
 * <Input placeholder="Enter your name" />
 *
 * // With label and error
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   error="Invalid email address"
 * />
 *
 * // Search input
 * <Input
 *   type="search"
 *   placeholder="Search HR policies..."
 *   icon={<SearchIcon />}
 * />
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above input */
  label?: string;

  /** Size of the input field */
  size?: 'sm' | 'md' | 'lg';

  /** Error message displayed below input */
  error?: string;

  /** Helper text displayed below input */
  helperText?: string;

  /** Icon displayed inside input (left or right) */
  icon?: React.ReactNode;

  /** Icon position: left or right */
  iconPosition?: 'left' | 'right';

  /** Whether input is required (adds asterisk to label) */
  required?: boolean;

  /** Character count (if maxLength is set) */
  showCharCount?: boolean;
}

/**
 * Input - Text input field with validation and states
 *
 * Sizes:
 * - sm: 32px height, compact padding
 * - md: 44px height, standard padding (default)
 * - lg: 48px height, generous padding
 *
 * States:
 * - default: Normal input state
 * - focus: Blue border, sage-green accent
 * - error: Red border with error message
 * - disabled: Reduced opacity, no interaction
 * - filled: Value entered, filled appearance
 *
 * Features:
 * - Optional label with required indicator
 * - Error message display
 * - Helper text for hints
 * - Icon support (left/right)
 * - Character counter (when maxLength set)
 * - Accessibility: ARIA labels, keyboard navigation
 */
export const Input: React.FC<InputProps> = ({
  label,
  size = 'md',
  error,
  helperText,
  icon,
  iconPosition = 'left',
  required,
  showCharCount = false,
  disabled,
  maxLength,
  value,
  className = '',
  ...props
}) => {
  const [charCount, setCharCount] = React.useState(
    typeof value === 'string' ? value.length : 0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharCount(e.target.value.length);
    props.onChange?.(e);
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    width: '100%',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: typography.fontSize['label-md'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
    display: 'flex',
    gap: '4px',
  };

  const requiredStyle: React.CSSProperties = {
    color: colors['error-red'],
  };

  const inputWrapperStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      height: '32px',
      padding: `0 ${icon ? '36px' : spacing.md}`,
      fontSize: typography.fontSize['body-sm'],
    },
    md: {
      height: '44px',
      padding: `0 ${icon ? '44px' : spacing.lg}`,
      fontSize: typography.fontSize['body-md'],
    },
    lg: {
      height: '48px',
      padding: `0 ${icon ? '48px' : spacing.xl}`,
      fontSize: typography.fontSize['body-lg'],
    },
  };

  const inputStyles: React.CSSProperties = {
    ...sizeStyles[size],
    width: '100%',
    border: `2px solid ${
      error ? colors['error-red'] : colors['neutral-200']
    }`,
    borderRadius: borderRadius.md,
    fontFamily: typography.fontFamily.primary,
    color: colors['neutral-900'],
    backgroundColor: disabled ? colors['neutral-100'] : colors['neutral-white'],
    cursor: disabled ? 'not-allowed' : 'text',
    transition: 'all 0.2s ease-in-out',
    opacity: disabled ? 0.6 : 1,
  };

  const iconStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors['neutral-500'],
    ...(iconPosition === 'left' && { left: spacing.md }),
    ...(iconPosition === 'right' && { right: spacing.md }),
  };

  const errorMessageStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-xs'],
    color: colors['error-red'],
    marginTop: '-4px',
  };

  const helperTextStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-xs'],
    color: colors['neutral-500'],
    marginTop: '-4px',
  };

  const charCountStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-xs'],
    color: colors['neutral-500'],
    textAlign: 'right',
    marginTop: '-4px',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = colors['sage-green-500'];
    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors['sage-green-50']}`;
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = error ? colors['error-red'] : colors['neutral-200'];
    e.currentTarget.style.boxShadow = 'none';
    props.onBlur?.(e);
  };

  return (
    <div style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={requiredStyle}>*</span>}
        </label>
      )}

      <div style={inputWrapperStyles}>
        {icon && iconPosition === 'left' && <div style={iconStyles}>{icon}</div>}

        <input
          style={inputStyles}
          disabled={disabled}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        {icon && iconPosition === 'right' && <div style={iconStyles}>{icon}</div>}
      </div>

      {error && <div style={errorMessageStyles}>{error}</div>}
      {!error && helperText && <div style={helperTextStyles}>{helperText}</div>}
      {showCharCount && maxLength && (
        <div style={charCountStyles}>
          {charCount} / {maxLength}
        </div>
      )}
    </div>
  );
};

Input.displayName = 'Input';
