import React from 'react';
import { colors, spacing, borderRadius, shadows, typography } from '../../styles/sage/tokens';

/**
 * Card Component
 *
 * Reusable container for content with optional header and footer.
 *
 * @component
 * @example
 * <Card title="Documents">
 *   <p>List of documents here...</p>
 * </Card>
 *
 * <Card
 *   title="User"
 *   subtitle="Active"
 *   footer={<button>Edit</button>}
 *   elevation="lg"
 * >
 *   Card content
 * </Card>
 */

interface CardProps {
  /** Card title */
  title?: string;

  /** Subtitle displayed below title */
  subtitle?: string;

  /** Card content */
  children?: React.ReactNode;

  /** Footer content */
  footer?: React.ReactNode;

  /** Elevation level (shadow) */
  elevation?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Padding inside card */
  padding?: 'sm' | 'md' | 'lg';

  /** Hover effect */
  hoverable?: boolean;

  /** Border color (optional) */
  borderColor?: string;

  /** Click handler */
  onClick?: () => void;

  /** CSS class name */
  className?: string;

  /** Background color */
  backgroundColor?: string;
}

/**
 * Card - Content container
 *
 * Elevation levels:
 * - xs: Subtle shadow
 * - sm: Slight elevation (default)
 * - md: Moderate elevation
 * - lg: Pronounced elevation
 * - xl: Maximum elevation (modals, overlays)
 *
 * Padding options:
 * - sm: Compact (12px)
 * - md: Standard (16px)
 * - lg: Generous (24px)
 *
 * Features:
 * - Optional header with title/subtitle
 * - Optional footer
 * - Hoverable with elevation change
 * - Flexible border and background
 * - Responsive
 */
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  elevation = 'sm',
  padding = 'md',
  hoverable = false,
  borderColor,
  onClick,
  className = '',
  backgroundColor = colors['neutral-white'],
}) => {
  const shadowMap = {
    xs: shadows.xs,
    sm: shadows.sm,
    md: shadows.md,
    lg: shadows.lg,
    xl: shadows.xl,
  };

  const paddingMap = {
    sm: spacing.md,
    md: spacing.lg,
    lg: spacing.xl,
  };

  const cardStyles: React.CSSProperties = {
    backgroundColor,
    borderRadius: borderRadius.lg,
    border: borderColor ? `1px solid ${borderColor}` : 'none',
    boxShadow: shadowMap[elevation],
    transition: hoverable ? 'all 0.2s ease-in-out' : 'none',
    cursor: onClick || hoverable ? 'pointer' : 'default',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyles: React.CSSProperties = {
    padding: paddingMap[padding],
    borderBottom: title ? `1px solid ${colors['neutral-200']}` : 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h4'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
    margin: 0,
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-500'],
    margin: 0,
  };

  const contentStyles: React.CSSProperties = {
    padding: paddingMap[padding],
    flex: 1,
  };

  const footerStyles: React.CSSProperties = {
    padding: paddingMap[padding],
    borderTop: `1px solid ${colors['neutral-200']}`,
    backgroundColor: colors['neutral-50'],
    display: 'flex',
    gap: spacing.md,
    alignItems: 'center',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverable) {
      (e.currentTarget as HTMLDivElement).style.boxShadow = shadowMap['lg'];
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverable) {
      (e.currentTarget as HTMLDivElement).style.boxShadow = shadowMap[elevation];
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
    }
  };

  return (
    <div
      style={cardStyles}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {title && (
        <div style={headerStyles}>
          <h3 style={titleStyles}>{title}</h3>
          {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        </div>
      )}

      {children && <div style={contentStyles}>{children}</div>}

      {footer && <div style={footerStyles}>{footer}</div>}
    </div>
  );
};

Card.displayName = 'Card';
