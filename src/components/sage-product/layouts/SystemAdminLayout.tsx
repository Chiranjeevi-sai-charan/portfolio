import React, { useState } from 'react';
import { colors, spacing, typography } from '../../../styles/sage/tokens';
import { Header } from '../Header';
import { Sidebar, SidebarItem } from '../Sidebar';
import { Tabs } from '../Tabs';
import { Card } from '../Card';
import { Breadcrumbs } from '../Breadcrumbs';

/**
 * SystemAdminLayout Component
 *
 * Main layout for system admin interface with advanced controls.
 *
 * @component
 * @example
 * <SystemAdminLayout
 *   title="System Settings"
 *   tabs={[
 *     { id: 'general', label: 'General' },
 *     { id: 'security', label: 'Security' },
 *     { id: 'users', label: 'Users' },
 *   ]}
 *   activeTab="general"
 * >
 *   {/* Settings content */}
 * </SystemAdminLayout>
 */

interface Tab {
  id: string;
  label: string;
  badge?: { label: string; variant?: 'default' | 'success' | 'warning' | 'error' | 'info' };
}

interface Breadcrumb {
  label: string;
  href?: string;
}

interface SystemAdminLayoutProps {
  /** Page title */
  title?: string;

  /** Breadcrumb navigation */
  breadcrumbs?: Breadcrumb[];

  /** Tab navigation */
  tabs?: Tab[];

  /** Active tab ID */
  activeTab?: string;

  /** Tab change handler */
  onTabChange?: (tabId: string) => void;

  /** Main content */
  children?: React.ReactNode;

  /** Sidebar menu items */
  sidebarItems?: SidebarItem[];

  /** Active sidebar item ID */
  activeItemId?: string;

  /** Sidebar collapsed state */
  sidebarCollapsed?: boolean;

  /** Sidebar collapse handler */
  onSidebarCollapse?: (collapsed: boolean) => void;

  /** CSS class name */
  className?: string;
}

/**
 * SystemAdminLayout - System admin interface layout
 *
 * Components:
 * - Header: Logo, search, language, notifications, profile
 * - Sidebar: System-level navigation (full admin menu)
 * - Tabs: Section navigation within pages
 * - Main: Breadcrumbs, title, content area
 *
 * Features:
 * - Advanced tabbed interface
 * - Persistent sidebar with full menu
 * - Breadcrumb navigation
 * - Page title
 * - System-level controls
 * - Responsive design
 */
export const SystemAdminLayout: React.FC<SystemAdminLayoutProps> = ({
  title,
  breadcrumbs = [],
  tabs = [],
  activeTab,
  onTabChange,
  children,
  sidebarItems = [],
  activeItemId,
  sidebarCollapsed = false,
  onSidebarCollapse,
  className = '',
}) => {
  const [isCollapsed, setIsCollapsed] = useState(sidebarCollapsed);
  const [currentTab, setCurrentTab] = useState(activeTab || tabs[0]?.id);

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    onSidebarCollapse?.(collapsed);
  };

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    onTabChange?.(tabId);
  };

  const defaultSidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'System Dashboard',
      icon: '🏠',
      onClick: () => console.log('System Dashboard'),
    },
    {
      id: 'users',
      label: 'User Management',
      icon: '👨‍💼',
      onClick: () => console.log('User Management'),
      badge: { label: '5', variant: 'warning' },
    },
    {
      id: 'organizations',
      label: 'Organizations',
      icon: '🏢',
      onClick: () => console.log('Organizations'),
    },
    {
      id: 'system-settings',
      label: 'System Settings',
      icon: '⚙️',
      onClick: () => console.log('System Settings'),
    },
    {
      id: 'security',
      label: 'Security',
      icon: '🔒',
      onClick: () => console.log('Security'),
    },
    {
      id: 'audit-logs',
      label: 'Audit Logs',
      icon: '📋',
      onClick: () => console.log('Audit Logs'),
    },
    {
      id: 'backups',
      label: 'Backups',
      icon: '💾',
      onClick: () => console.log('Backups'),
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: '🔗',
      onClick: () => console.log('Integrations'),
      badge: { label: '2', variant: 'info' },
    },
    {
      id: 'api-keys',
      label: 'API Keys',
      icon: '🔑',
      onClick: () => console.log('API Keys'),
    },
    ...sidebarItems,
  ];

  const layoutStyles: React.CSSProperties = {
    display: 'flex',
    height: '100vh',
    backgroundColor: colors['neutral-50'],
    flexDirection: 'column',
  };

  const contentWrapperStyles: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  };

  const mainStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors['neutral-50'],
    overflowY: 'auto',
  };

  const headerAreaStyles: React.CSSProperties = {
    padding: spacing.lg,
    backgroundColor: colors['neutral-white'],
    borderBottom: `1px solid ${colors['neutral-200']}`,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h2'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
    margin: `${spacing.md} 0 0 0`,
    marginTop: spacing.md,
  };

  const tabsAreaStyles: React.CSSProperties = {
    padding: `0 ${spacing.lg}`,
    backgroundColor: colors['neutral-white'],
    borderBottom: `1px solid ${colors['neutral-200']}`,
  };

  const contentStyles: React.CSSProperties = {
    padding: spacing.lg,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  };

  const convertedTabs = tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    badge: tab.badge,
  }));

  return (
    <div style={layoutStyles} className={className}>
      {/* Header */}
      <Header />

      {/* Content Area */}
      <div style={contentWrapperStyles}>
        {/* Sidebar */}
        <Sidebar
          items={defaultSidebarItems}
          collapsed={isCollapsed}
          onCollapse={handleCollapse}
          activeItemId={activeItemId}
        />

        {/* Main Content */}
        <div style={mainStyles}>
          {/* Header Section */}
          <div style={headerAreaStyles}>
            {breadcrumbs.length > 0 && (
              <Breadcrumbs
                items={breadcrumbs}
                onItemClick={(item) => {
                  if (item.href) {
                    window.location.href = item.href;
                  }
                }}
              />
            )}
            {title && <h1 style={titleStyles}>{title}</h1>}
          </div>

          {/* Tabs Section */}
          {convertedTabs.length > 0 && (
            <div style={tabsAreaStyles}>
              <Tabs
                tabs={convertedTabs}
                activeTabId={currentTab}
                onTabChange={handleTabChange}
              />
            </div>
          )}

          {/* Content Section */}
          <div style={contentStyles}>
            {children ? (
              children
            ) : (
              <Card
                title="System Administration Console"
                subtitle="Advanced controls and monitoring"
              >
                <p style={{ color: colors['neutral-600'], margin: 0, marginBottom: spacing.md }}>
                  Welcome to the System Admin interface. Use the sidebar to access system-level
                  controls including user management, organization settings, security policies, and
                  audit logs.
                </p>
                <p style={{ color: colors['neutral-500'], margin: 0, fontSize: typography.fontSize['body-sm'] }}>
                  ℹ️ Only system administrators can access this interface.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

SystemAdminLayout.displayName = 'SystemAdminLayout';
