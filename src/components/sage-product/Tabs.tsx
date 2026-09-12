import React from 'react';
import { colors, spacing, typography } from '../../styles/sage/tokens';

/**
 * Tabs Component
 *
 * Tab navigation for switching between content panels.
 * Used for document states (Active/Archived/Deleted) and feature sections.
 *
 * @component
 * @example
 * <Tabs
 *   tabs={[
 *     { label: 'Active', value: 'active', badge: 12 },
 *     { label: 'Archived', value: 'archived', badge: 8 },
 *   ]}
 *   activeTab="active"
 *   onTabChange={(value) => setTab(value)}
 * />
 */

interface Tab {
  label: string;
  value: string;
  badge?: number;
  disabled?: boolean;
}

interface TabsProps {
  /** Array of tabs */
  tabs: Tab[];

  /** Currently active tab value */
  activeTab: string;

  /** Tab change handler */
  onTabChange?: (value: string) => void;

  /** Tab variant */
  variant?: 'underline' | 'pill';

  /** Tab size */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Tabs - Tab navigation
 *
 * Variants:
 * - underline: Green underline on active tab (default)
 * - pill: Full background highlight
 *
 * Sizes:
 * - sm: Compact tabs
 * - md: Standard tabs (default)
 * - lg: Large tabs
 *
 * States:
 * - default: Inactive tab
 * - active: Selected tab with highlight
 * - hover: Hover state
 * - disabled: Non-interactive tab
 *
 * Features:
 * - Badge support for counts/alerts
 * - Smooth active indicator animation
 * - Keyboard accessible
 * - Responsive
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'underline',
  size = 'md',
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    borderBottom: variant === 'underline' ? `1px solid ${colors['neutral-200']}` : 'none',
    gap: variant === 'pill' ? spacing.md : 0,
    padding: variant === 'pill' ? spacing.md : 0,
    backgroundColor: variant === 'pill' ? colors['neutral-50'] : 'transparent',
    borderRadius: variant === 'pill' ? '8px' : 0,
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: typography.fontSize['body-sm'],
    },
    md: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: typography.fontSize['body-md'],
    },
    lg: {
      padding: `${spacing.lg} ${spacing.xl}`,
      fontSize: typography.fontSize['body-lg'],
    },
  };

  const tabButtonStyles: React.CSSProperties = {
    ...sizeStyles[size],
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: variant === 'underline' ? '3px solid transparent' : 'none',
    color: colors['neutral-600'],
    fontWeight: typography.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    whiteSpace: 'nowrap',
    borderRadius: variant === 'pill' ? '6px' : 0,
  };

  const activeTabButtonStyles: React.CSSProperties = {
    color: colors['sage-green-700'],
    fontWeight: typography.fontWeight.semibold,
    borderBottomColor: variant === 'underline' ? colors['sage-green-500'] : 'transparent',
    backgroundColor: variant === 'pill' ? colors['neutral-white'] : 'transparent',
    boxShadow: variant === 'pill' ? `0 1px 3px rgba(0, 0, 0, 0.1)` : 'none',
  };

  const badgeStyles: React.CSSProperties = {
    backgroundColor: colors['error-red'],
    color: colors['neutral-white'],
    padding: `0 ${spacing.sm}`,
    borderRadius: '12px',
    fontSize: typography.fontSize['body-xs'],
    fontWeight: typography.fontWeight.bold,
    minWidth: '20px',
    textAlign: 'center',
    flexShrink: 0,
  };

  return (
    <div style={containerStyles}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            style={{
              ...tabButtonStyles,
              ...(isActive && activeTabButtonStyles),
              opacity: tab.disabled ? 0.5 : 1,
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
            }}
            onClick={() => {
              if (!tab.disabled) {
                onTabChange?.(tab.value);
              }
            }}
            onMouseEnter={(e) => {
              if (!tab.disabled && !isActive) {
                (e.currentTarget as HTMLButtonElement).style.color = colors['neutral-900'];
              }
            }}
            onMouseLeave={(e) => {
              if (!tab.disabled && !isActive) {
                (e.currentTarget as HTMLButtonElement).style.color = colors['neutral-600'];
              }
            }}
            disabled={tab.disabled}
          >
            {tab.label}
            {tab.badge && <div style={badgeStyles}>{tab.badge > 99 ? '99+' : tab.badge}</div>}
          </button>
        );
      })}
    </div>
  );
};

Tabs.displayName = 'Tabs';
