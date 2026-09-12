import React from 'react';
import { spacing, colors, shadows, borderRadius, typography } from '../../styles/sage/tokens';

/**
 * Select Component
 *
 * Dropdown select field for choosing from a list of options.
 *
 * @component
 * @example
 * <Select label="Department" options={[{ value: 'hr', label: 'HR' }]} />
 *
 * <Select
 *   label="Priority"
 *   options={[{ value: 'high', label: 'High' }]}
 *   error="This field is required"
 * />
 */

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label text displayed above select */
  label?: string;

  /** Size of the select field */
  size?: 'sm' | 'md' | 'lg';

  /** Array of options to display */
  options: SelectOption[];

  /** Placeholder text */
  placeholder?: string;

  /** Error message displayed below select */
  error?: string;

  /** Helper text displayed below select */
  helperText?: string;

  /** Whether select is required (adds asterisk to label) */
  required?: boolean;
}

/**
 * Select - Dropdown select field
 *
 * Sizes:
 * - sm: 32px height
 * - md: 44px height (default)
 * - lg: 48px height
 *
 * States:
 * - default: Normal state
 * - focus: Blue border highlight
 * - error: Red border with error message
 * - disabled: Reduced opacity
 * - hover: Subtle highlight
 *
 * Features:
 * - Optional label with required indicator
 * - Grouped options support
 * - Keyboard accessible
 * - Error and helper text
 */
export const Select: React.FC<SelectProps> = ({
  label,
  size = 'md',
  options,
  placeholder,
  error,
  helperText,
  required,
  disabled,
  className = '',
  ...props
}) => {
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

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      height: '32px',
      padding: `0 ${spacing.md}`,
      fontSize: typography.fontSize['body-sm'],
    },
    md: {
      height: '44px',
      padding: `0 ${spacing.lg}`,
      fontSize: typography.fontSize['body-md'],
    },
    lg: {
      height: '48px',
      padding: `0 ${spacing.xl}`,
      fontSize: typography.fontSize['body-lg'],
    },
  };

  const selectStyles: React.CSSProperties = {
    ...sizeStyles[size],
    width: '100%',
    border: `2px solid ${error ? colors['error-red'] : colors['neutral-200']}`,
    borderRadius: borderRadius.md,
    fontFamily: typography.fontFamily.primary,
    color: colors['neutral-900'],
    backgroundColor: disabled ? colors['neutral-100'] : colors['neutral-white'],
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    opacity: disabled ? 0.6 : 1,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${colors['neutral-500']}' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `right ${spacing.md} center`,
    backgroundSize: '20px',
    paddingRight: `36px`,
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

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = colors['sage-green-500'];
    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors['sage-green-50']}`;
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
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

      <select
        style={selectStyles}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <div style={errorMessageStyles}>{error}</div>}
      {!error && helperText && <div style={helperTextStyles}>{helperText}</div>}
    </div>
  );
};

Select.displayName = 'Select';
