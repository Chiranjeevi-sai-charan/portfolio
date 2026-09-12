import React, { useState } from 'react';
import { colors, spacing, typography } from '../../../styles/sage/tokens';
import { SystemAdminLayout } from '../layouts/SystemAdminLayout';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Table, TableColumn } from '../Table';
import { Alert } from '../Alert';
import { Tabs } from '../Tabs';

/**
 * SystemAdminDashboard Page
 *
 * System-level admin interface for managing organizations, users, and system settings.
 *
 * @component
 * @example
 * <SystemAdminDashboard />
 */

interface User {
  id: string;
  name: string;
  email: string;
  role: 'System Admin' | 'Org Admin' | 'HR Admin' | 'Employee';
  organization: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

interface Organization {
  id: string;
  name: string;
  users: number;
  plan: 'Basic' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Trial' | 'Paused';
}

/**
 * SystemAdminDashboard - System admin interface
 *
 * Tabs:
 * - Overview: System health and stats
 * - Users: User management and permissions
 * - Organizations: Org management and billing
 * - Security: System security settings
 */
export const SystemAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sortBy, setSortBy] = useState<'name' | 'organization'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const users: User[] = [
    {
      id: 'u1',
      name: 'admin@sage.com',
      email: 'admin@sage.com',
      role: 'System Admin',
      organization: 'Sage',
      status: 'Active',
    },
    {
      id: 'u2',
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      role: 'Org Admin',
      organization: 'TechCorp',
      status: 'Active',
    },
    {
      id: 'u3',
      name: 'Mike Chen',
      email: 'mike@startupxyz.com',
      role: 'HR Admin',
      organization: 'StartupXYZ',
      status: 'Active',
    },
    {
      id: 'u4',
      name: 'Lisa Wang',
      email: 'lisa@globalcorp.com',
      role: 'Org Admin',
      organization: 'GlobalCorp',
      status: 'Pending',
    },
    {
      id: 'u5',
      name: 'James Wilson',
      email: 'james@oldcompany.com',
      role: 'Employee',
      organization: 'OldCompany',
      status: 'Inactive',
    },
  ];

  const organizations: Organization[] = [
    {
      id: 'org1',
      name: 'Sage Internal',
      users: 45,
      plan: 'Enterprise',
      status: 'Active',
    },
    {
      id: 'org2',
      name: 'TechCorp Inc',
      users: 234,
      plan: 'Enterprise',
      status: 'Active',
    },
    {
      id: 'org3',
      name: 'StartupXYZ',
      users: 28,
      plan: 'Professional',
      status: 'Active',
    },
    {
      id: 'org4',
      name: 'GlobalCorp',
      users: 512,
      plan: 'Enterprise',
      status: 'Active',
    },
    {
      id: 'org5',
      name: 'TrialCorp',
      users: 12,
      plan: 'Basic',
      status: 'Trial',
    },
  ];

  const userColumns: TableColumn<User>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'organization', label: 'Organization', sortable: true },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge
          variant={
            value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'default'
          }
          size="sm"
        >
          {value}
        </Badge>
      ),
    },
  ];

  const orgColumns: TableColumn<Organization>[] = [
    { key: 'name', label: 'Organization', sortable: true },
    {
      key: 'users',
      label: 'Users',
      render: (value) => <span>{value} members</span>,
    },
    {
      key: 'plan',
      label: 'Plan',
      render: (value) => (
        <Badge
          variant={
            value === 'Enterprise'
              ? 'success'
              : value === 'Professional'
                ? 'info'
                : 'default'
          }
          size="sm"
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge
          variant={
            value === 'Active'
              ? 'success'
              : value === 'Trial'
                ? 'warning'
                : 'default'
          }
          size="sm"
        >
          {value}
        </Badge>
      ),
    },
  ];

  const statsStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  };

  const statCardStyles: React.CSSProperties = {
    padding: spacing.lg,
    backgroundColor: colors['neutral-white'],
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const statNumberStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: colors['sage-green-500'],
    margin: `${spacing.md} 0`,
  };

  const statLabelStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-600'],
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  };

  return (
    <SystemAdminLayout
      title="System Administration"
      breadcrumbs={[{ label: 'System' }, { label: 'Administration' }]}
      tabs={[
        { id: 'overview', label: 'Overview' },
        { id: 'users', label: 'Users', badge: { label: '1', variant: 'warning' } },
        { id: 'organizations', label: 'Organizations' },
        { id: 'security', label: 'Security' },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      activeItemId="dashboard"
    >
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* System Health Alert */}
          <Alert variant="success" icon="✓" onClose={() => {}}>
            System operational — All services running normally. Last backup: 2 hours ago.
          </Alert>

          {/* Stats Grid */}
          <div style={statsStyles}>
            <div style={statCardStyles}>
              <div style={statLabelStyles}>Total Organizations</div>
              <div style={statNumberStyles}>5</div>
              <Badge variant="success" size="sm">
                1 on trial
              </Badge>
            </div>
            <div style={statCardStyles}>
              <div style={statLabelStyles}>Total Users</div>
              <div style={statNumberStyles}>831</div>
              <Badge variant="info" size="sm">
                ↑ 45 this week
              </Badge>
            </div>
            <div style={statCardStyles}>
              <div style={statLabelStyles}>System Admins</div>
              <div style={statNumberStyles}>1</div>
              <Badge variant="warning" size="sm">
                Add more recommended
              </Badge>
            </div>
            <div style={statCardStyles}>
              <div style={statLabelStyles}>API Calls (24h)</div>
              <div style={statNumberStyles}>28.4K</div>
              <Badge variant="default" size="sm">
                Within quota
              </Badge>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={gridStyles}>
            <Card title="System Health" elevation="sm">
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: `${spacing.sm} ${spacing.md}`,
                    backgroundColor: colors['neutral-50'],
                    borderRadius: '6px',
                  }}
                >
                  <span>Database</span>
                  <Badge variant="success" size="sm">
                    ✓ Healthy
                  </Badge>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: `${spacing.sm} ${spacing.md}`,
                    backgroundColor: colors['neutral-50'],
                    borderRadius: '6px',
                  }}
                >
                  <span>API Server</span>
                  <Badge variant="success" size="sm">
                    ✓ Healthy
                  </Badge>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: `${spacing.sm} ${spacing.md}`,
                    backgroundColor: colors['neutral-50'],
                    borderRadius: '6px',
                  }}
                >
                  <span>Backup Service</span>
                  <Badge variant="success" size="sm">
                    ✓ Healthy
                  </Badge>
                </div>
              </div>
            </Card>

            <Card title="Recent Activity" elevation="sm">
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'] }}>
                  <div>🔑 API key generated</div>
                  <div style={{ fontSize: '11px', color: colors['neutral-500'] }}>2 hours ago</div>
                </div>
                <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'] }}>
                  <div>👤 New user invited</div>
                  <div style={{ fontSize: '11px', color: colors['neutral-500'] }}>4 hours ago</div>
                </div>
                <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'] }}>
                  <div>🏢 Organization created</div>
                  <div style={{ fontSize: '11px', color: colors['neutral-500'] }}>1 day ago</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <Card title="User Management" elevation="sm">
          <Table columns={userColumns} data={users} striped={true} hoverable={true} />
        </Card>
      )}

      {/* Organizations Tab */}
      {activeTab === 'organizations' && (
        <Card title="Organizations" elevation="sm">
          <Table columns={orgColumns} data={organizations} striped={true} hoverable={true} />
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div style={{ display: 'grid', gap: spacing.lg }}>
          <Alert variant="info" icon="ℹ️" onClose={() => {}}>
            All security policies are up to date and compliance requirements are met.
          </Alert>

          <Card title="Security Settings" elevation="sm">
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
              <div
                style={{
                  padding: spacing.lg,
                  backgroundColor: colors['neutral-50'],
                  borderRadius: '6px',
                  borderLeft: `4px solid ${colors['sage-green-500']}`,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: spacing.sm }}>Two-Factor Authentication</div>
                <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'] }}>
                  Required for all system admins
                </div>
                <Badge variant="success" size="sm" style={{ marginTop: spacing.sm }}>
                  ✓ Enabled
                </Badge>
              </div>

              <div
                style={{
                  padding: spacing.lg,
                  backgroundColor: colors['neutral-50'],
                  borderRadius: '6px',
                  borderLeft: `4px solid ${colors['sage-green-500']}`,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: spacing.sm }}>IP Whitelist</div>
                <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'] }}>
                  Admin access restricted to approved IPs
                </div>
                <Badge variant="success" size="sm" style={{ marginTop: spacing.sm }}>
                  ✓ Configured
                </Badge>
              </div>

              <div
                style={{
                  padding: spacing.lg,
                  backgroundColor: colors['neutral-50'],
                  borderRadius: '6px',
                  borderLeft: `4px solid ${colors['warning-amber']}`,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: spacing.sm }}>SSL Certificate</div>
                <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'] }}>
                  Expires on 2025-03-15 (6 months remaining)
                </div>
                <Badge variant="warning" size="sm" style={{ marginTop: spacing.sm }}>
                  ⚠️ Renew soon
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      )}
    </SystemAdminLayout>
  );
};

SystemAdminDashboard.displayName = 'SystemAdminDashboard';
