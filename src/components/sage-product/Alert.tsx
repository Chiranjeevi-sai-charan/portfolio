import React from 'react';
import { colors, spacing, borderRadius, typography } from '../../styles/sage/tokens';

/**
 * Alert Component
 *
 * Inline message for warnings, errors, success, or info.
 *
 * @component
 * @example
 * <Alert variant="warning">
 *   This action cannot be undone.
 * </Alert>
 *
 * <Alert variant="success" icon="✓">
 *   Changes saved successfully.
 * </Alert>
 */

interface AlertProps {
  /** Alert content */
  children: React.ReactNode;

  /** Alert variant */
  variant?: 'info' | 'success' | 'warning' | 'error';

  /** Optional icon */
  icon?: React.ReactNode;

  /** Close handler (shows close button if provided) */
  onClose?: () => void;

  /** CSS class name */
  className?: string;

  /** Full width */
  fullWidth?: boolean;
}

/**
 * Alert - Inline notification
 *
 * Variants:
 * - info: Blue (informational)
 * - success: Green (positive action)
 * - warning: Amber (caution)
 * - error: Red (problem)
 *
 * Features:
 * - Color-coded backgrounds
 * - Optional icon
 * - Optional close button
 * - Full width option
 * - Semantic HTML (role="alert")
 */
export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  icon,
  onClose,
  className = '',
  fullWidth = false,
}) => {
  const variantConfig: Record<
    string,
    { bg: string; border: string; text: string; icon: string }
  > = {
    info: {
      bg: colors['info-cyan'],
      border: colors['info-cyan'],
      text: colors['neutral-900'],
      icon: 'ℹ',
    },
    success: {
      bg: colors['success-green'],
      border: colors['success-green'],
      text: colors['neutral-white'],
      icon: '✓',
    },
    warning: {
      bg: colors['warning-amber'],
      border: colors['warning-amber'],
      text: colors['neutral-900'],
      icon: '⚠',
    },
    error: {
      bg: colors['error-red'],
      border: colors['error-red'],
      text: colors['neutral-white'],
      icon: '✕',
    },
  };

  const config = variantConfig[variant];

  const alertStyles: React.CSSProperties = {
    backgroundColor: `${config.bg}20`,
    border: `1px solid ${config.border}`,
    borderRadius: borderRadius.md,
    padding: `${spacing.md} ${spacing.lg}`,
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.md,
    color: config.text,
    fontSize: typography.fontSize['body-md'],
    width: fullWidth ? '100%' : 'auto',
  };

  const iconStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 600,
    color: config.border,
    minWidth: '20px',
    marginTop: '2px',
  };

  const contentStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  };

  const closeButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: config.text,
    padding: '0',
    opacity: 0.6,
    transition: 'opacity 0.2s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={alertStyles} className={className} role="alert">
      <div style={iconStyles}>{icon || config.icon}</div>
      <div style={contentStyles}>
        <span>{children}</span>
      </div>
      {onClose && (
        <button
          style={closeButtonStyles}
          onClick={onClose}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '0.6';
          }}
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
