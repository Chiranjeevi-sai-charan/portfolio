import React from 'react';
import { colors, spacing, typography, componentSizes, shadows, borderRadius } from '../../styles/sage/tokens';
import { MaterialIcon } from './MaterialIcon';

/**
 * Sidebar Component
 *
 * Left navigation sidebar for the Sage application, styled after ChatGPT's
 * minimal black & white interface.
 *
 * @component
 * @example
 * <Sidebar
 *   items={[
 *     { icon: 'chat', label: 'Chatbot', href: '/chat' },
 *     { icon: 'description', label: 'Documents', href: '/docs' },
 *   ]}
 *   activeItem="Chatbot"
 *   onItemClick={(item) => navigate(item.href)}
 * />
 */

export interface SidebarItem {
  /** Unique identifier, used to determine the active item. Falls back to label matching if omitted. */
  id?: string;
  icon: string;
  label: string;
  href?: string;
  badge?: number;
  disabled?: boolean;
  children?: SidebarItem[];
  /** Show a "..." context menu (Share, Rename, Pin chat, Archive, Delete) on hover */
  hasMenu?: boolean;
}

interface SidebarUser {
  name: string;
  role: string;
}

interface SidebarProps {
  /** Menu items to display */
  items: SidebarItem[];

  /** Currently active item label (fallback matching when items have no id) */
  activeItem?: string;

  /** Currently active item id (preferred — avoids matching multiple items with the same label) */
  activeItemId?: string;

  /** Menu item click handler */
  onItemClick?: (item: SidebarItem) => void;

  /** Whether sidebar is collapsed */
  collapsed?: boolean;

  /** Collapse toggle handler */
  onCollapseToggle?: () => void;

  /** Logo/brand element */
  logo?: React.ReactNode;

  /** User pinned to the bottom of the sidebar, with a dropdown menu */
  user?: SidebarUser;

  /** Called when a dropdown menu item is clicked ('personalization' | 'profile' | 'settings' | 'help' | 'logout') */
  onUserMenuAction?: (action: string) => void;

  /** Called when a chat item's context menu action is clicked ('share' | 'rename' | 'pin' | 'archive' | 'delete') */
  onItemMenuAction?: (item: SidebarItem, action: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeItem,
  activeItemId,
  onItemClick,
  collapsed = false,
  onCollapseToggle,
  logo,
  user,
  onUserMenuAction,
  onItemMenuAction,
}) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [language, setLanguage] = React.useState<'en' | 'ja'>('en');
  const [hoveredItemKey, setHoveredItemKey] = React.useState<string | null>(null);
  const [openItemMenuKey, setOpenItemMenuKey] = React.useState<string | null>(null);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  React.useEffect(() => {
    if (!userMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  React.useEffect(() => {
    if (!openItemMenuKey) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-sidebar-item-menu]')) {
        setOpenItemMenuKey(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openItemMenuKey]);

  const sidebarStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: collapsed ? '64px' : componentSizes.sidebar.width,
    flexShrink: 0,
    height: '100%',
    backgroundColor: colors['neutral-50'],
    borderRight: `1px solid ${colors['neutral-200']}`,
    transition: 'width 0.3s ease-in-out',
    overflow: 'visible',
    position: 'relative',
    zIndex: 10,
  };

  const logoSectionStyles: React.CSSProperties = {
    padding: `${spacing.md} ${spacing.md}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'space-between',
    minHeight: '56px',
    gap: spacing.sm,
  };

  const brandTextStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h4'],
    fontWeight: typography.fontWeight.bold,
    color: colors['neutral-900'],
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap',
  };

  const logoActionsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  };

  const iconButtonStyles: React.CSSProperties = {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    color: colors['neutral-700'],
    flexShrink: 0,
  };

  const menuStyles: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: `0 ${spacing.sm}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  };

  const menuItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    width: '100%',
    textAlign: 'left',
  };

  const activeMenuItemStyles: React.CSSProperties = {
    backgroundColor: colors['neutral-200'],
    color: colors['neutral-900'],
  };

  const menuItemIconStyles: React.CSSProperties = {
    minWidth: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors['neutral-700'],
  };

  const menuItemLabelStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.medium,
    color: colors['neutral-900'],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
  };

  const sectionLabelStyles: React.CSSProperties = {
    fontSize: typography.fontSize['label-sm'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-500'],
    padding: `${spacing.md} ${spacing.md} ${spacing.xs}`,
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  };

  const itemMenuTriggerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: borderRadius.sm,
    border: 'none',
    background: 'transparent',
    color: colors['neutral-600'],
    cursor: 'pointer',
    flexShrink: 0,
  };

  const itemMenuPopupStyles: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '2px',
    backgroundColor: colors['neutral-white'],
    border: `1px solid ${colors['neutral-200']}`,
    borderRadius: borderRadius.md,
    boxShadow: shadows.lg,
    padding: spacing.xs,
    zIndex: 60,
    minWidth: '180px',
  };

  const itemMenuActionStyles = (destructive = false): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    background: 'none',
    border: 'none',
    borderRadius: borderRadius.sm,
    cursor: 'pointer',
    fontSize: typography.fontSize['body-sm'],
    color: destructive ? colors['error-red'] : colors['neutral-900'],
    textAlign: 'left',
  });

  const itemMenuDividerStyles: React.CSSProperties = {
    borderTop: `1px solid ${colors['neutral-200']}`,
    margin: `${spacing.xs} 0`,
  };

  const ITEM_MENU_ACTIONS = [
    { id: 'share', label: 'Share', icon: 'ios_share' },
    { id: 'rename', label: 'Rename', icon: 'edit' },
  ];

  const ITEM_MENU_ACTIONS_2 = [
    { id: 'pin', label: 'Pin chat', icon: 'push_pin' },
    { id: 'archive', label: 'Archive', icon: 'archive' },
  ];

  const badgeStyles: React.CSSProperties = {
    backgroundColor: colors['neutral-900'],
    color: colors['neutral-white'],
    padding: `0 ${spacing.sm}`,
    borderRadius: '12px',
    fontSize: typography.fontSize['body-xs'],
    fontWeight: typography.fontWeight.bold,
    minWidth: '24px',
    textAlign: 'center',
    flexShrink: 0,
  };

  const renderMenuItem = (item: SidebarItem, level = 0) => {
    const key = item.id || item.label;
    const isActive = item.id ? item.id === activeItemId : activeItem === item.label;
    const isExpanded = expandedItems.includes(item.label);
    const hasChildren = item.children && item.children.length > 0;
    const showMenuTrigger =
      item.hasMenu && !collapsed && (hoveredItemKey === key || openItemMenuKey === key);

    return (
      <div
        key={key}
        style={{ position: 'relative' }}
        onMouseEnter={() => setHoveredItemKey(key)}
        onMouseLeave={() => setHoveredItemKey((prev) => (prev === key ? null : prev))}
      >
        <button
          style={{
            ...menuItemStyles,
            ...(isActive && activeMenuItemStyles),
            marginLeft: `${level * 12}px`,
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
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }
          }}
          disabled={item.disabled}
        >
          <div style={menuItemIconStyles}>
            <MaterialIcon name={item.icon} size={20} />
          </div>
          {!collapsed && (
            <>
              <div style={menuItemLabelStyles}>{item.label}</div>
              {item.badge && !collapsed && (
                <div style={badgeStyles}>{item.badge > 99 ? '99+' : item.badge}</div>
              )}
              {hasChildren && (
                <MaterialIcon
                  name={isExpanded ? 'expand_more' : 'chevron_right'}
                  size={16}
                  color={colors['neutral-500']}
                />
              )}
            </>
          )}
        </button>

        {showMenuTrigger && (
          <button
            style={{
              ...itemMenuTriggerStyles,
              position: 'absolute',
              right: spacing.sm,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: openItemMenuKey === key ? colors['neutral-200'] : colors['neutral-white'],
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpenItemMenuKey((prev) => (prev === key ? null : key));
            }}
            title="More options"
            aria-label="More options"
          >
            <MaterialIcon name="more_horiz" size={18} />
          </button>
        )}

        {openItemMenuKey === key && (
          <div style={itemMenuPopupStyles} data-sidebar-item-menu>
            {ITEM_MENU_ACTIONS.map((action) => (
              <button
                key={action.id}
                style={itemMenuActionStyles()}
                onClick={() => {
                  setOpenItemMenuKey(null);
                  onItemMenuAction?.(item, action.id);
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
              >
                <MaterialIcon name={action.icon} size={18} color={colors['neutral-700']} />
                {action.label}
              </button>
            ))}
            <div style={itemMenuDividerStyles} />
            {ITEM_MENU_ACTIONS_2.map((action) => (
              <button
                key={action.id}
                style={itemMenuActionStyles()}
                onClick={() => {
                  setOpenItemMenuKey(null);
                  onItemMenuAction?.(item, action.id);
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
              >
                <MaterialIcon name={action.icon} size={18} color={colors['neutral-700']} />
                {action.label}
              </button>
            ))}
            <div style={itemMenuDividerStyles} />
            <button
              style={itemMenuActionStyles(true)}
              onClick={() => {
                setOpenItemMenuKey(null);
                onItemMenuAction?.(item, 'delete');
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }}
            >
              <MaterialIcon name="delete" size={18} color={colors['error-red']} />
              Delete
            </button>
          </div>
        )}

        {/* Nested Items */}
        {hasChildren && isExpanded && !collapsed && (
          <div>{item.children!.map((child) => renderMenuItem(child, level + 1))}</div>
        )}
      </div>
    );
  };

  const userFooterStyles: React.CSSProperties = {
    position: 'relative',
    borderTop: `1px solid ${colors['neutral-200']}`,
    padding: spacing.sm,
  };

  const userRowStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    width: '100%',
    background: 'none',
    border: 'none',
    textAlign: 'left',
  };

  const userAvatarStyles: React.CSSProperties = {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: colors['neutral-900'],
    color: colors['neutral-white'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    flexShrink: 0,
  };

  const userNameStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const userRoleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-xs'],
    color: colors['neutral-500'],
  };

  const userMenuStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '100%',
    left: spacing.sm,
    right: spacing.sm,
    marginBottom: spacing.xs,
    backgroundColor: colors['neutral-white'],
    border: `1px solid ${colors['neutral-200']}`,
    borderRadius: borderRadius.md,
    boxShadow: shadows.lg,
    padding: spacing.xs,
    zIndex: 50,
  };

  const userMenuItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    background: 'none',
    border: 'none',
    borderRadius: borderRadius.sm,
    cursor: 'pointer',
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-900'],
    textAlign: 'left',
  };

  const userMenuDividerStyles: React.CSSProperties = {
    borderTop: `1px solid ${colors['neutral-200']}`,
    margin: `${spacing.xs} 0`,
  };

  const languageRowStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
  };

  const languageLabelStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-900'],
  };

  const langToggleGroupStyles: React.CSSProperties = {
    display: 'flex',
    gap: '4px',
  };

  const langButtonStyles = (active: boolean): React.CSSProperties => ({
    padding: `2px ${spacing.sm}`,
    borderRadius: borderRadius.sm,
    border: 'none',
    fontSize: typography.fontSize['body-xs'],
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
    backgroundColor: active ? colors['neutral-900'] : colors['neutral-100'],
    color: active ? colors['neutral-white'] : colors['neutral-600'],
  });

  const getUserInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const menuActions = [
    { id: 'personalization', label: 'Personalization', icon: 'tune' },
    { id: 'profile', label: 'Profile', icon: 'account_circle' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <div style={sidebarStyles}>
      {/* Logo Section */}
      <div style={logoSectionStyles}>
        {!collapsed && (logo || <div style={brandTextStyles}>SAGE</div>)}
        <div style={logoActionsStyles}>
          {!collapsed && (
            <button
              style={iconButtonStyles}
              onClick={() => console.log('Search clicked')}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }}
              title="Search"
              aria-label="Search"
            >
              <MaterialIcon name="search" size={20} />
            </button>
          )}
          <button
            style={iconButtonStyles}
            onClick={onCollapseToggle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <MaterialIcon name="left_panel_close" size={20} />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div style={menuStyles}>{items.map((item) => renderMenuItem(item))}</div>

      {/* User Footer */}
      {user && (
        <div style={userFooterStyles} ref={userMenuRef}>
          {userMenuOpen && (
            <div style={userMenuStyles}>
              <div style={languageRowStyles}>
                <div style={languageLabelStyles}>
                  <MaterialIcon name="language" size={18} color={colors['neutral-700']} />
                  Language
                </div>
                <div style={langToggleGroupStyles}>
                  <button style={langButtonStyles(language === 'en')} onClick={() => setLanguage('en')}>
                    EN
                  </button>
                  <button style={langButtonStyles(language === 'ja')} onClick={() => setLanguage('ja')}>
                    JA
                  </button>
                </div>
              </div>
              <div style={userMenuDividerStyles} />
              {menuActions.map((action) => (
                <button
                  key={action.id}
                  style={userMenuItemStyles}
                  onClick={() => {
                    setUserMenuOpen(false);
                    onUserMenuAction?.(action.id);
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <MaterialIcon name={action.icon} size={18} color={colors['neutral-700']} />
                  {action.label}
                </button>
              ))}
              <div style={userMenuDividerStyles} />
              <button
                style={userMenuItemStyles}
                onClick={() => {
                  setUserMenuOpen(false);
                  onUserMenuAction?.('logout');
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
              >
                <MaterialIcon name="logout" size={18} color={colors['neutral-700']} />
                Log out
              </button>
            </div>
          )}

          <button
            style={userRowStyles}
            onClick={() => setUserMenuOpen((v) => !v)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }}
          >
            <div style={userAvatarStyles}>{getUserInitials(user.name)}</div>
            {!collapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div style={userNameStyles}>{user.name}</div>
                <div style={userRoleStyles}>{user.role}</div>
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

Sidebar.displayName = 'Sidebar';
