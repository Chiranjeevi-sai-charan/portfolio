import React from 'react';
import { spacing, borderRadius, typography } from '../../styles/sage/tokens';

/**
 * Badge Component
 *
 * Single source of truth for the small pill label used across the product
 * for status/category tags: document sensitivity (Sensitive/Non-Sensitive),
 * user role (Admin/System Admin/Employee), and department tags. Previously
 * each of these was a hand-rolled inline `<span>` duplicated in DocumentList
 * and UserManagementTable; consolidating the shape/typography here means a
 * future style change (padding, radius, font) only happens in one place.
 *
 * Deliberately presentational-only: it takes an explicit `backgroundColor`/
 * `color` pair rather than a fixed `variant` enum, so it stays decoupled
 * from domain concepts (sensitivity levels, roles) — the caller maps its
 * own data to a color pair (e.g. from `statusColors` or a local role map)
 * and Badge just renders it consistently.
 *
 * @component
 * @example
 * <Badge backgroundColor={statusColors.sensitive.bg} color={statusColors.sensitive.text}>
 *   Sensitive
 * </Badge>
 *
 * <Badge backgroundColor={colors['warning-amber']} color={colors['neutral-white']} uppercase>
 *   Admin
 * </Badge>
 */

interface BadgeProps {
  children: React.ReactNode;

  /** Background color (typically a soft tint or solid brand color) */
  backgroundColor: string;

  /** Text color, chosen to clear contrast against `backgroundColor` */
  color: string;

  /** Uppercase, letter-spaced treatment (used for role badges) */
  uppercase?: boolean;

  /** Compact (11px) vs standard (12px) label size — default 'md' */
  size?: 'sm' | 'md';

  /** Extra spacing/positioning the caller needs (e.g. marginRight when several pills sit inline) */
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  backgroundColor,
  color,
  uppercase = false,
  size = 'md',
  style,
}) => {
  const badgeStyles: React.CSSProperties = {
    display: 'inline-block',
    padding: `${spacing.xs} ${spacing.md}`,
    borderRadius: borderRadius.full,
    fontSize: size === 'sm' ? '11px' : typography.fontSize['body-xs'],
    fontWeight: typography.fontWeight.semibold,
    backgroundColor,
    color,
    textTransform: uppercase ? 'uppercase' : 'none',
    whiteSpace: 'nowrap',
    ...style,
  };

  return <span style={badgeStyles}>{children}</span>;
};

Badge.displayName = 'Badge';
