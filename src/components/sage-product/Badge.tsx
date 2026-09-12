import React from 'react';
import { colors, spacing, borderRadius, typography } from '../../styles/sage/tokens';

/**
 * Badge Component
 *
 * Small label for status, tags, or counts.
 *
 * @component
 * @example
 * <Badge variant="success">Active</Badge>
 *
 * <Badge variant="warning" size="lg">Archived</Badge>
 *
 * <Badge variant="error">Deleted</Badge>
 */

interface BadgeProps {
  /** Badge content */
  children: React.ReactNode;

  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';

  /** Size of badge */
  size?: 'sm' | 'md' | 'lg';

  /** Style variant */
  style?: 'solid' | 'outline';

  /** Leading icon */
  icon?: React.ReactNode;

  /** Removable badge with close handler */
  removable?: boolean;

  /** Remove handler */
  onRemove?: () => void;

  /** CSS class name */
  className?: string;
}

/**
 * Badge - Status indicator
 *
 * Variants:
 * - default: Neutral gray
 * - success: Green (Active, Verified)
 * - warning: Amber (Archived, Pending)
 * - error: Red (Deleted, Failed)
 * - info: Cyan (Info, Draft)
 *
 * Sizes:
 * - sm: Compact (11px font)
 * - md: Standard (12px font)
 * - lg: Large (14px font)
 *
 * Styles:
 * - solid: Full background (default)
 * - outline: Bordered only
 *
 * Features:
 * - Optional icon
 * - Removable with close button
 * - Multiple color variants
 * - Flexible sizing
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  style = 'solid',
  icon,
  removable = false,
  onRemove,
  className = '',
}) => {
  const variantStyles: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    default: {
      bg: colors['neutral-200'],
      text: colors['neutral-900'],
      border: colors['neutral-300'],
    },
    success: {
      bg: colors['success-green'],
      text: colors['neutral-white'],
      border: colors['success-green'],
    },
    warning: {
      bg: colors['warning-amber'],
      text: colors['neutral-white'],
      border: colors['warning-amber'],
    },
    error: {
      bg: colors['error-red'],
      text: colors['neutral-white'],
      border: colors['error-red'],
    },
    info: {
      bg: colors['info-cyan'],
      text: colors['neutral-white'],
      border: colors['info-cyan'],
    },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: `2px ${spacing.sm}`,
      fontSize: typography.fontSize['label-sm'],
      height: '20px',
    },
    md: {
      padding: `4px ${spacing.md}`,
      fontSize: typography.fontSize['label-md'],
      height: '24px',
    },
    lg: {
      padding: `6px ${spacing.lg}`,
      fontSize: typography.fontSize['body-sm'],
      height: '32px',
    },
  };

  const { bg, text, border } = variantStyles[variant];

  const badgeStyles: React.CSSProperties = {
    ...sizeStyles[size],
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: style === 'solid' ? bg : 'transparent',
    color: style === 'solid' ? text : bg,
    border: style === 'outline' ? `1px solid ${border}` : 'none',
    fontWeight: typography.fontWeight.semibold,
    whiteSpace: 'nowrap',
  };

  const iconStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size === 'sm' ? '12px' : size === 'md' ? '14px' : '16px',
  };

  const closeButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: '0',
    marginLeft: spacing.xs,
    fontSize: size === 'sm' ? '12px' : size === 'md' ? '14px' : '16px',
    transition: 'opacity 0.2s ease-in-out',
  };

  return (
    <span style={badgeStyles} className={className}>
      {icon && <span style={iconStyles}>{icon}</span>}
      <span>{children}</span>
      {removable && (
        <button
          style={closeButtonStyles}
          onClick={onRemove}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '1';
          }}
          title="Remove"
        >
          ✕
        </button>
      )}
    </span>
  );
};

Badge.displayName = 'Badge';
