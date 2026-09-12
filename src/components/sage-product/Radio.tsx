import React from 'react';
import { spacing, colors, typography } from '../../styles/sage/tokens';

/**
 * Radio Component
 *
 * Radio button for selecting one option from a group.
 * Always use within a RadioGroup or provide a name prop.
 *
 * @component
 * @example
 * <Radio name="option" value="a" label="Option A" />
 *
 * <Radio
 *   name="notification"
 *   value="email"
 *   label="Email"
 *   defaultChecked
 * />
 */

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed next to radio button */
  label?: string;

  /** Size of the radio button */
  size?: 'sm' | 'md' | 'lg';

  /** Helper text displayed below radio */
  helperText?: string;

  /** Whether radio is required */
  required?: boolean;
}

/**
 * Radio - Select one from mutually exclusive group
 *
 * Sizes:
 * - sm: 16px radio
 * - md: 20px radio (default)
 * - lg: 24px radio
 *
 * States:
 * - unselected: Empty circle
 * - selected: Filled circle with dot
 * - disabled: Reduced opacity
 * - focus: Highlight ring
 *
 * Features:
 * - Optional label with associated input
 * - Keyboard accessible
 * - Helper text support
 * - Multiple sizes
 * - Works with RadioGroup or standalone with name prop
 */
export const Radio: React.FC<RadioProps> = ({
  label,
  size = 'md',
  helperText,
  required,
  disabled,
  className = '',
  id,
  name,
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

  const radioStyles: React.CSSProperties = {
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

  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div style={containerStyles}>
      <div style={wrapperStyles}>
        <input
          type="radio"
          id={radioId}
          name={name}
          style={radioStyles}
          disabled={disabled}
          {...props}
        />
        {label && (
          <label htmlFor={radioId} style={labelStyles}>
            {label}
            {required && <span style={requiredStyle}>*</span>}
          </label>
        )}
      </div>
      {helperText && <div style={helperTextStyles}>{helperText}</div>}
    </div>
  );
};

Radio.displayName = 'Radio';

/**
 * RadioGroup - Container for mutually exclusive radio options
 */

interface RadioGroupProps {
  /** Label for the entire group */
  label?: string;

  /** Name attribute shared by all radios */
  name: string;

  /** Selected radio value */
  value?: string | number;

  /** Called when selection changes */
  onChange?: (value: string | number) => void;

  /** Array of radio options */
  options: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;

  /** Size of radio buttons */
  size?: 'sm' | 'md' | 'lg';

  /** Helper text for the group */
  helperText?: string;

  /** Whether group is required */
  required?: boolean;

  /** Whether radios are disabled */
  disabled?: boolean;

  /** Gap between options */
  gap?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  size = 'md',
  helperText,
  required,
  disabled,
  gap = spacing.lg,
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
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

  const groupStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap,
  };

  const helperTextStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-xs'],
    color: colors['neutral-500'],
  };

  return (
    <div style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={requiredStyle}>*</span>}
        </label>
      )}
      <div style={groupStyles}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            size={size}
            disabled={disabled || option.disabled}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
          />
        ))}
      </div>
      {helperText && <div style={helperTextStyles}>{helperText}</div>}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';
