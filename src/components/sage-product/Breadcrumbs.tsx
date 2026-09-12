import React from 'react';
import { colors, spacing, typography } from '../../styles/sage/tokens';

/**
 * Breadcrumbs Component
 *
 * Hierarchical navigation showing current location in app.
 *
 * @component
 * @example
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Documents', href: '/docs' },
 *     { label: 'Active Policies' },
 *   ]}
 *   onNavigate={(href) => navigate(href)}
 * />
 */

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];

  /** Navigate handler called with href */
  onNavigate?: (href: string) => void;

  /** Separator between items */
  separator?: string | React.ReactNode;

  /** Size of breadcrumbs */
  size?: 'sm' | 'md';

  /** CSS class name */
  className?: string;
}

/**
 * Breadcrumbs - Hierarchical navigation path
 *
 * Sizes:
 * - sm: Compact (12px font)
 * - md: Standard (14px font)
 *
 * Features:
 * - Clickable links (when href provided)
 * - Last item non-clickable (current page)
 * - Customizable separator
 * - Keyboard accessible
 * - Responsive (truncates on small screens)
 *
 * Last item is always non-interactive and bold.
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
  separator = '/',
  size = 'md',
  className = '',
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    fontSize: size === 'sm' ? typography.fontSize['body-xs'] : typography.fontSize['body-sm'],
    color: colors['neutral-600'],
  };

  const itemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  };

  const linkStyles: React.CSSProperties = {
    color: colors['accent-blue'],
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease-in-out',
    padding: `2px ${spacing.sm}`,
    borderRadius: '4px',
  };

  const currentItemStyles: React.CSSProperties = {
    color: colors['neutral-900'],
    fontWeight: typography.fontWeight.semibold,
    padding: `2px ${spacing.sm}`,
    borderRadius: '4px',
  };

  const separatorStyles: React.CSSProperties = {
    color: colors['neutral-300'],
    margin: `0 ${spacing.sm}`,
  };

  return (
    <nav style={containerStyles} className={className}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} style={itemStyles}>
            {isLast ? (
              <span style={currentItemStyles}>{item.label}</span>
            ) : (
              <>
                <a
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.href) {
                      e.preventDefault();
                      onNavigate?.(item.href);
                    }
                  }}
                  style={linkStyles}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      colors['sage-green-600'];
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                      colors['sage-green-50'];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = colors['accent-blue'];
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                      'transparent';
                  }}
                >
                  {item.label}
                </a>
                {index < items.length - 1 && (
                  <span style={separatorStyles} role="presentation">
                    {separator}
                  </span>
                )}
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
