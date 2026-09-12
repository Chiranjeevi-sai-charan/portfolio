import React, { useState } from 'react';
import { colors, spacing, typography } from '../../../styles/sage/tokens';
import { Header } from '../Header';
import { Sidebar, SidebarItem } from '../Sidebar';
import { Card } from '../Card';
import { Breadcrumbs } from '../Breadcrumbs';

/**
 * AdminLayout Component
 *
 * Main layout for HR admin dashboard interface.
 *
 * @component
 * @example
 * <AdminLayout
 *   title="Policies"
 *   breadcrumbs={[
 *     { label: 'Dashboard', href: '#' },
 *     { label: 'Policies' }
 *   ]}
 * >
 *   Dashboard content
 * </AdminLayout>
 */

interface Breadcrumb {
  label: string;
  href?: string;
}

interface AdminLayoutProps {
  /** Page title */
  title?: string;

  /** Breadcrumb navigation */
  breadcrumbs?: Breadcrumb[];

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
 * AdminLayout - HR admin dashboard layout
 *
 * Components:
 * - Header: Logo, search, language, notifications, profile
 * - Sidebar: Navigation menu with active state
 * - Main: Breadcrumbs, title, content area
 *
 * Features:
 * - Persistent sidebar
 * - Breadcrumb navigation
 * - Page title
 * - Responsive design
 * - Content card wrapper
 */
export const AdminLayout: React.FC<AdminLayoutProps> = ({
  title,
  breadcrumbs = [],
  children,
  sidebarItems = [],
  activeItemId,
  sidebarCollapsed = false,
  onSidebarCollapse,
  className = '',
}) => {
  const [isCollapsed, setIsCollapsed] = useState(sidebarCollapsed);

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    onSidebarCollapse?.(collapsed);
  };

  const defaultSidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      onClick: () => console.log('Dashboard'),
    },
    {
      id: 'employees',
      label: 'Employees',
      icon: '👥',
      onClick: () => console.log('Employees'),
    },
    {
      id: 'policies',
      label: 'Policies',
      icon: '📋',
      onClick: () => console.log('Policies'),
      badge: { label: '3', variant: 'warning' },
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: '📁',
      onClick: () => console.log('Documents'),
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📈',
      onClick: () => console.log('Reports'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      onClick: () => console.log('Settings'),
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

  const contentStyles: React.CSSProperties = {
    padding: spacing.lg,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  };

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

          {/* Content Section */}
          <div style={contentStyles}>
            {children ? (
              children
            ) : (
              <Card
                title="Welcome to Admin Dashboard"
                subtitle="HR Management & Policy Administration"
              >
                <p style={{ color: colors['neutral-600'], margin: 0 }}>
                  Use the sidebar to navigate through different sections of the HR admin panel.
                  Manage employees, policies, documents, and generate reports.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

AdminLayout.displayName = 'AdminLayout';
