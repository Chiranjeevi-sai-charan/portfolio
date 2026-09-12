import React from 'react';
import { colors, spacing, typography, componentSizes, shadows } from '../../styles/sage/tokens';

/**
 * Sidebar Component
 *
 * Left navigation sidebar for Sage application.
 * Displays menu items with icons, labels, and active states.
 *
 * @component
 * @example
 * <Sidebar
 *   items={[
 *     { icon: '💬', label: 'Chatbot', href: '/chat' },
 *     { icon: '📄', label: 'Documents', href: '/docs' },
 *   ]}
 *   activeItem="Chatbot"
 *   onItemClick={(item) => navigate(item.href)}
 * />
 */

export interface SidebarItem {
  icon: string;
  label: string;
  href?: string;
  badge?: number;
  disabled?: boolean;
  children?: SidebarItem[];
}

interface SidebarProps {
  /** Menu items to display */
  items: SidebarItem[];

  /** Currently active item label */
  activeItem?: string;

  /** Menu item click handler */
  onItemClick?: (item: SidebarItem) => void;

  /** Whether sidebar is collapsed */
  collapsed?: boolean;

  /** Collapse toggle handler */
  onCollapseToggle?: () => void;

  /** Logo/brand element */
  logo?: React.ReactNode;
}

/**
 * Sidebar - Left navigation menu
 *
 * Layout:
 * - Logo section (top)
 * - Menu items (scrollable)
 * - Icons + labels (or icons only when collapsed)
 * - Active indicator (left green border)
 * - Badges for counts/notifications
 * - Collapse/expand toggle
 *
 * Width: 200px (from design tokens)
 * Fixed positioning with shadow
 *
 * Features:
 * - Icons for visual recognition
 * - Active state highlighting
 * - Badge support for counts
 * - Collapse to icon-only mode
 * - Nested item support
 * - Keyboard accessible
 */
export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeItem,
  onItemClick,
  collapsed = false,
  onCollapseToggle,
  logo,
}) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const sidebarStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: collapsed ? '64px' : componentSizes.sidebar.width,
    height: '100vh',
    backgroundColor: colors['neutral-white'],
    borderRight: `1px solid ${colors['neutral-200']}`,
    boxShadow: shadows.sm,
    transition: 'width 0.3s ease-in-out',
    overflow: 'hidden',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 300,
  };

  const logoSectionStyles: React.CSSProperties = {
    padding: spacing.lg,
    borderBottom: `1px solid ${colors['neutral-200']}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: componentSizes.header.height,
  };

  const menuStyles: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  };

  const menuItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.md} ${spacing.lg}`,
    backgroundColor: colors['neutral-50'],
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    borderLeft: `3px solid transparent`,
    width: '100%',
    textAlign: 'left',
  };

  const activeMenuItemStyles: React.CSSProperties = {
    backgroundColor: colors['sage-green-50'],
    borderLeftColor: colors['sage-green-500'],
    color: colors['sage-green-700'],
  };

  const menuItemIconStyles: React.CSSProperties = {
    fontSize: '20px',
    minWidth: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const menuItemLabelStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.medium,
    color: colors['neutral-700'],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
  };

  const badgeStyles: React.CSSProperties = {
    backgroundColor: colors['error-red'],
    color: colors['neutral-white'],
    padding: `0 ${spacing.sm}`,
    borderRadius: '12px',
    fontSize: typography.fontSize['body-xs'],
    fontWeight: typography.fontWeight.bold,
    minWidth: '24px',
    textAlign: 'center',
    flexShrink: 0,
  };

  const collapseSectionStyles: React.CSSProperties = {
    padding: spacing.md,
    borderTop: `1px solid ${colors['neutral-200']}`,
    display: 'flex',
    justifyContent: 'center',
  };

  const collapseButtonStyles: React.CSSProperties = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors['neutral-100'],
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    fontSize: '18px',
  };

  const renderMenuItem = (item: SidebarItem, level = 0) => {
    const isActive = activeItem === item.label;
    const isExpanded = expandedItems.includes(item.label);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.label}>
        <button
          style={{
            ...menuItemStyles,
            ...(isActive && activeMenuItemStyles),
            marginLeft: `${level * 12}px`,
            paddingLeft: level > 0 ? spacing.md : spacing.lg,
            opacity: item.disabled ? 0.5 : 1,
            cursor: item.disabled ? 'not-allowed' : 'pointer',
          }}
          onClick={() => {
            if (!item.disabled) {
              onItemClick?.(item);
              if (hasChildren) {
                toggleExpanded(item.label);
              }
            }
          }}
          onMouseEnter={(e) => {
            if (!item.disabled && !isActive) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                colors['neutral-100'];
            }
          }}
          onMouseLeave={(e) => {
            if (!item.disabled && !isActive) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                colors['neutral-50'];
            }
          }}
          disabled={item.disabled}
        >
          <div style={menuItemIconStyles}>{item.icon}</div>
          {!collapsed && (
            <>
              <div style={menuItemLabelStyles}>{item.label}</div>
              {item.badge && !collapsed && (
                <div style={badgeStyles}>{item.badge > 99 ? '99+' : item.badge}</div>
              )}
              {hasChildren && (
                <span style={{ fontSize: '12px', color: colors['neutral-500'] }}>
                  {isExpanded ? '▼' : '▶'}
                </span>
              )}
            </>
          )}
        </button>

        {/* Nested Items */}
        {hasChildren && isExpanded && !collapsed && (
          <div>
            {item.children!.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={sidebarStyles}>
      {/* Logo Section */}
      <div style={logoSectionStyles}>{logo || '🧠'}</div>

      {/* Menu Items */}
      <div style={menuStyles}>{items.map((item) => renderMenuItem(item))}</div>

      {/* Collapse Toggle */}
      <div style={collapseSectionStyles}>
        <button
          style={collapseButtonStyles}
          onClick={onCollapseToggle}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              colors['neutral-200'];
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              colors['neutral-100'];
          }}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
    </div>
  );
};

Sidebar.displayName = 'Sidebar';
