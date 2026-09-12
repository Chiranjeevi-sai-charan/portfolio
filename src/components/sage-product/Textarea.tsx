import React from 'react';
import { colors, spacing, borderRadius, typography } from '../../styles/sage/tokens';

/**
 * Textarea Component
 *
 * Multi-line text input for longer text content.
 *
 * @component
 * @example
 * <Textarea label="Message" placeholder="Type your message..." />
 *
 * <Textarea
 *   label="Comments"
 *   rows={5}
 *   maxLength={500}
 *   showCharCount
 *   error="Please provide feedback"
 * />
 */

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text displayed above textarea */
  label?: string;

  /** Number of visible rows */
  rows?: number;

  /** Error message displayed below textarea */
  error?: string;

  /** Helper text displayed below textarea */
  helperText?: string;

  /** Whether textarea is required (adds asterisk to label) */
  required?: boolean;

  /** Show character count (requires maxLength) */
  showCharCount?: boolean;

  /** Custom resize behavior */
  resize?: 'vertical' | 'horizontal' | 'both' | 'none';
}

/**
 * Textarea - Multi-line text input
 *
 * Features:
 * - Optional label with required indicator
 * - Error message display
 * - Helper text support
 * - Character counter (when maxLength set)
 * - Resizable with configurable directions
 * - Auto-expand option (controlled)
 * - Keyboard accessible
 *
 * States:
 * - default: Normal state
 * - focus: Green border with highlight
 * - error: Red border with error message
 * - disabled: Reduced opacity
 * - filled: Value entered
 */
export const Textarea: React.FC<TextareaProps> = ({
  label,
  rows = 4,
  error,
  helperText,
  required,
  showCharCount = false,
  resize = 'vertical',
  disabled,
  maxLength,
  value,
  className = '',
  ...props
}) => {
  const [charCount, setCharCount] = React.useState(
    typeof value === 'string' ? value.length : 0
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const textareaStyles: React.CSSProperties = {
    width: '100%',
    minHeight: `calc(${typography.fontSize['body-md']} * ${rows} * 1.5 + ${spacing.lg} * 2)`,
    padding: spacing.lg,
    border: `2px solid ${error ? colors['error-red'] : colors['neutral-200']}`,
    borderRadius: borderRadius.md,
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize['body-md'],
    lineHeight: typography.lineHeight.normal,
    color: colors['neutral-900'],
    backgroundColor: disabled ? colors['neutral-100'] : colors['neutral-white'],
    cursor: disabled ? 'not-allowed' : 'text',
    transition: 'all 0.2s ease-in-out',
    opacity: disabled ? 0.6 : 1,
    resize: resize === 'none' ? 'none' : resize,
    boxSizing: 'border-box',
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

  const charCountContainerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: typography.fontSize['body-xs'],
    color: colors['neutral-500'],
    marginTop: '-4px',
  };

  const charCountStyles: React.CSSProperties = {
    textAlign: 'right',
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = colors['sage-green-500'];
    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors['sage-green-50']}`;
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
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

      <textarea
        style={textareaStyles}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />

      {error && <div style={errorMessageStyles}>{error}</div>}

      {!error && helperText && <div style={helperTextStyles}>{helperText}</div>}

      {showCharCount && maxLength && (
        <div style={charCountContainerStyles}>
          {!error && !helperText && <div />}
          <div style={charCountStyles}>
            {charCount} / {maxLength}
          </div>
        </div>
      )}
    </div>
  );
};

Textarea.displayName = 'Textarea';
