import React from 'react';
import { colors, spacing, shadows, typography, componentSizes } from '../../styles/sage/tokens';

/**
 * Header Component
 *
 * Top navigation bar for Sage application.
 * Contains logo, search, language toggle, and user profile.
 *
 * @component
 * @example
 * <Header
 *   logoText="Sage"
 *   onLanguageChange={(lang) => console.log(lang)}
 *   user={{ name: "John", role: "Employee" }}
 * />
 */

interface User {
  name: string;
  role: 'Employee' | 'Admin' | 'System Admin';
  avatar?: string;
}

interface HeaderProps {
  /** Logo text or brand name */
  logoText?: string;

  /** Logo click handler */
  onLogoClick?: () => void;

  /** Search input value */
  searchValue?: string;

  /** Search input change handler */
  onSearchChange?: (value: string) => void;

  /** Search placeholder text */
  searchPlaceholder?: string;

  /** Current language */
  language?: 'en' | 'ja';

  /** Language change handler */
  onLanguageChange?: (language: 'en' | 'ja') => void;

  /** Current user info */
  user?: User;

  /** User profile click handler */
  onUserClick?: () => void;

  /** Notification count */
  notificationCount?: number;

  /** Notification bell click handler */
  onNotificationClick?: () => void;

  /** Additional header actions */
  children?: React.ReactNode;
}

/**
 * Header - Top navigation bar
 *
 * Layout (left to right):
 * - Logo/Brand (left)
 * - Search bar (center, flexible)
 * - Language toggle (right)
 * - Notifications (right)
 * - User profile (right)
 *
 * Height: 64px (from design tokens)
 * Fixed positioning with shadow
 *
 * Features:
 * - Logo with click handler
 * - Search input with icon
 * - Language toggle (EN/JP)
 * - Notification bell with badge
 * - User profile dropdown indicator
 * - Role-based badge
 */
export const Header: React.FC<HeaderProps> = ({
  logoText = 'Sage',
  onLogoClick,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  language = 'en',
  onLanguageChange,
  user,
  onUserClick,
  notificationCount = 0,
  onNotificationClick,
  children,
}) => {
  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: componentSizes.header.height,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    backgroundColor: colors['neutral-white'],
    borderBottom: `1px solid ${colors['neutral-200']}`,
    boxShadow: shadows.sm,
    gap: spacing.xl,
    position: 'sticky',
    top: 0,
    zIndex: 200,
  };

  const logoStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    cursor: 'pointer',
    fontSize: typography.fontSize['h3'],
    fontWeight: typography.fontWeight.bold,
    color: colors['sage-green-500'],
    transition: 'color 0.2s ease-in-out',
    userSelect: 'none',
  };

  const centerStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xl,
    justifyContent: 'flex-start',
  };

  const searchContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
    maxWidth: '400px',
    padding: `0 ${spacing.lg}`,
    border: `1px solid ${colors['neutral-200']}`,
    borderRadius: '8px',
    backgroundColor: colors['neutral-50'],
    transition: 'all 0.2s ease-in-out',
  };

  const searchInputStyles: React.CSSProperties = {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: typography.fontSize['body-md'],
    color: colors['neutral-900'],
    outline: 'none',
    padding: `${spacing.sm} 0`,
  };

  const rightStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.lg,
  };

  const languageButtonStyles: React.CSSProperties = {
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: language === 'en' ? colors['sage-green-50'] : colors['neutral-100'],
    border: `1px solid ${colors['neutral-200']}`,
    borderRadius: '6px',
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  };

  const notificationButtonStyles: React.CSSProperties = {
    position: 'relative',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    transition: 'transform 0.2s ease-in-out',
  };

  const badgeStyles: React.CSSProperties = {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: colors['error-red'],
    color: colors['neutral-white'],
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: typography.fontSize['label-sm'],
    fontWeight: typography.fontWeight.bold,
  };

  const userProfileStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  };

  const avatarStyles: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: colors['sage-green-500'],
    color: colors['neutral-white'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.bold,
  };

  const userInfoStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  };

  const userNameStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
  };

  const userRoleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-xs'],
    color: colors['neutral-500'],
  };

  const roleBadgeStyles: React.CSSProperties = {
    padding: `2px ${spacing.sm}`,
    backgroundColor: colors['sage-green-50'],
    color: colors['sage-green-700'],
    borderRadius: '4px',
    fontSize: typography.fontSize['body-xs'],
    fontWeight: typography.fontWeight.semibold,
    whiteSpace: 'nowrap',
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header style={headerStyles}>
      {/* Logo */}
      <div
        style={logoStyles}
        onClick={onLogoClick}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.color = colors['sage-green-600'];
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.color = colors['sage-green-500'];
        }}
      >
        🧠 {logoText}
      </div>

      {/* Center: Search */}
      <div style={centerStyles}>
        <div
          style={searchContainerStyles}
          onFocus={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = colors['sage-green-500'];
            (e.currentTarget as HTMLDivElement).style.backgroundColor = colors['neutral-white'];
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = colors['neutral-200'];
            (e.currentTarget as HTMLDivElement).style.backgroundColor = colors['neutral-50'];
          }}
        >
          <span style={{ fontSize: '16px' }}>🔍</span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            style={searchInputStyles}
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div style={rightStyles}>
        {/* Language Toggle */}
        <div style={{ display: 'flex', gap: spacing.sm }}>
          {['en', 'ja'].map((lang) => (
            <button
              key={lang}
              style={{
                ...languageButtonStyles,
                backgroundColor:
                  language === lang ? colors['sage-green-50'] : colors['neutral-100'],
                color: language === lang ? colors['sage-green-700'] : colors['neutral-600'],
              }}
              onClick={() => onLanguageChange?.(lang as 'en' | 'ja')}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Notification Bell */}
        <button style={notificationButtonStyles} onClick={onNotificationClick}>
          🔔
          {notificationCount > 0 && (
            <div style={badgeStyles}>{notificationCount > 9 ? '9+' : notificationCount}</div>
          )}
        </button>

        {/* User Profile */}
        {user && (
          <div style={userProfileStyles} onClick={onUserClick}>
            <div style={avatarStyles}>{getUserInitials(user.name)}</div>
            <div style={userInfoStyles}>
              <div style={userNameStyles}>{user.name}</div>
              <div style={roleBadgeStyles}>{user.role}</div>
            </div>
          </div>
        )}

        {/* Additional Actions */}
        {children}
      </div>
    </header>
  );
};

Header.displayName = 'Header';
