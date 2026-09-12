import React from 'react';
import { spacing, colors, borderRadius, typography } from '../../styles/sage/tokens';

/**
 * Checkbox Component
 *
 * Checkbox input for boolean values.
 *
 * @component
 * @example
 * <Checkbox label="I agree to terms" />
 *
 * <Checkbox
 *   label="Subscribe to updates"
 *   defaultChecked
 *   disabled
 * />
 */

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed next to checkbox */
  label?: string;

  /** Size of the checkbox */
  size?: 'sm' | 'md' | 'lg';

  /** Helper text displayed below checkbox */
  helperText?: string;

  /** Whether checkbox is required */
  required?: boolean;
}

/**
 * Checkbox - Toggle boolean value
 *
 * Sizes:
 * - sm: 16px checkbox
 * - md: 20px checkbox (default)
 * - lg: 24px checkbox
 *
 * States:
 * - unchecked: Empty box
 * - checked: Box with checkmark
 * - disabled: Reduced opacity
 * - indeterminate: Dash (partial state)
 * - focus: Highlight ring
 *
 * Features:
 * - Optional label
 * - Keyboard accessible
 * - Helper text support
 * - Multiple sizes
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  size = 'md',
  helperText,
  required,
  disabled,
  className = '',
  id,
  ...props
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  };

  const wrapperStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      width: '16px',
      height: '16px',
    },
    md: {
      width: '20px',
      height: '20px',
    },
    lg: {
      width: '24px',
      height: '24px',
    },
  };

  const checkboxStyles: React.CSSProperties = {
    ...sizeStyles[size],
    cursor: disabled ? 'not-allowed' : 'pointer',
    accentColor: colors['sage-green-500'],
    opacity: disabled ? 0.6 : 1,
  };

  const labelStyles: React.CSSProperties = {
    fontSize: size === 'sm' ? typography.fontSize['body-sm'] : typography.fontSize['body-md'],
    fontWeight: typography.fontWeight.regular,
    color: colors['neutral-900'],
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    display: 'flex',
    gap: '4px',
  };

  const requiredStyle: React.CSSProperties = {
    color: colors['error-red'],
  };

  const helperTextStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-xs'],
    color: colors['neutral-500'],
    marginLeft: `calc(${sizeStyles[size].width} + ${spacing.md})`,
  };

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div style={containerStyles}>
      <div style={wrapperStyles}>
        <input
          type="checkbox"
          id={checkboxId}
          style={checkboxStyles}
          disabled={disabled}
          {...props}
        />
        {label && (
          <label htmlFor={checkboxId} style={labelStyles}>
            {label}
            {required && <span style={requiredStyle}>*</span>}
          </label>
        )}
      </div>
      {helperText && <div style={helperTextStyles}>{helperText}</div>}
    </div>
  );
};

Checkbox.displayName = 'Checkbox';
