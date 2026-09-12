import React, { useState } from 'react';
import { colors, spacing, typography } from '../../../styles/sage/tokens';
import { AdminLayout } from '../layouts/AdminLayout';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Table, TableColumn } from '../Table';
import { Alert } from '../Alert';

/**
 * AdminDashboard Page
 *
 * HR admin dashboard for managing employees, policies, and documents.
 *
 * @component
 * @example
 * <AdminDashboard />
 */

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

interface Policy {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  status: 'Active' | 'Draft' | 'Archived';
}

/**
 * AdminDashboard - HR admin interface
 *
 * Sections:
 * - Quick stats (employees, policies, documents)
 * - Recent policies (with status)
 * - Employee directory (sortable)
 * - Pending actions
 */
export const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const employees: Employee[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Product Manager',
      department: 'Product',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Mike Chen',
      role: 'Senior Engineer',
      department: 'Engineering',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Emma Davis',
      role: 'Designer',
      department: 'Design',
      status: 'On Leave',
    },
    {
      id: '4',
      name: 'James Wilson',
      role: 'Data Analyst',
      department: 'Analytics',
      status: 'Active',
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      role: 'HR Specialist',
      department: 'Human Resources',
      status: 'Active',
    },
  ];

  const policies: Policy[] = [
    {
      id: 'p1',
      title: 'Remote Work Policy v2.0',
      category: 'Work Arrangements',
      lastUpdated: '2024-09-10',
      status: 'Active',
    },
    {
      id: 'p2',
      title: 'Professional Development Guide',
      category: 'Benefits',
      lastUpdated: '2024-09-05',
      status: 'Draft',
    },
    {
      id: 'p3',
      title: 'Performance Review Process',
      category: 'Management',
      lastUpdated: '2024-08-28',
      status: 'Active',
    },
  ];

  const employeeColumns: TableColumn<Employee>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department', sortable: true },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge
          variant={value === 'Active' ? 'success' : value === 'On Leave' ? 'warning' : 'default'}
          size="sm"
        >
          {value}
        </Badge>
      ),
    },
  ];

  const policyColumns: TableColumn<Policy>[] = [
    { key: 'title', label: 'Policy Title', sortable: true },
    { key: 'category', label: 'Category' },
    { key: 'lastUpdated', label: 'Last Updated', sortable: true },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge
          variant={value === 'Active' ? 'success' : value === 'Draft' ? 'warning' : 'default'}
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

  const contentAreaStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.lg,
  };

  const fullWidthStyles: React.CSSProperties = {
    gridColumn: '1 / -1',
  };

  return (
    <AdminLayout
      title="Dashboard"
      breadcrumbs={[{ label: 'Admin' }, { label: 'Dashboard' }]}
      activeItemId="dashboard"
    >
      {/* Alert Section */}
      <Alert variant="warning" icon="⚠️" onClose={() => {}}>
        <strong>3 pending policy reviews</strong> — Several new policies are waiting for your approval.
      </Alert>

      {/* Stats */}
      <div style={statsStyles}>
        <div style={statCardStyles}>
          <div style={statLabelStyles}>Total Employees</div>
          <div style={statNumberStyles}>245</div>
          <Badge variant="success" size="sm">
            ↑ 12 this month
          </Badge>
        </div>
        <div style={statCardStyles}>
          <div style={statLabelStyles}>Active Policies</div>
          <div style={statNumberStyles}>18</div>
          <Badge variant="warning" size="sm">
            3 pending review
          </Badge>
        </div>
        <div style={statCardStyles}>
          <div style={statLabelStyles}>Documents</div>
          <div style={statNumberStyles}>156</div>
          <Badge variant="info" size="sm">
            12 new this month
          </Badge>
        </div>
        <div style={statCardStyles}>
          <div style={statLabelStyles}>On Leave Today</div>
          <div style={statNumberStyles}>8</div>
          <Badge variant="default" size="sm">
            Updated now
          </Badge>
        </div>
      </div>

      {/* Content Grid */}
      <div style={contentAreaStyles}>
        {/* Recent Policies */}
        <Card title="Recent Policies" elevation="sm">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.md,
            }}
          >
            {policies.map((policy) => (
              <div
                key={policy.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: spacing.md,
                  backgroundColor: colors['neutral-50'],
                  borderRadius: '6px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: colors['neutral-900'] }}>
                    {policy.title}
                  </div>
                  <div style={{ fontSize: '12px', color: colors['neutral-500'] }}>
                    {policy.category}
                  </div>
                </div>
                <Badge
                  variant={
                    policy.status === 'Active'
                      ? 'success'
                      : policy.status === 'Draft'
                        ? 'warning'
                        : 'default'
                  }
                  size="sm"
                >
                  {policy.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions" elevation="sm">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.md,
            }}
          >
            <button
              style={{
                padding: `${spacing.md} ${spacing.lg}`,
                backgroundColor: colors['sage-green-100'],
                color: colors['sage-green-600'],
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s ease-in-out',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  colors['sage-green-200'];
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  colors['sage-green-100'];
              }}
            >
              ➕ Add New Employee
            </button>
            <button
              style={{
                padding: `${spacing.md} ${spacing.lg}`,
                backgroundColor: colors['info-cyan'],
                color: colors['neutral-white'],
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s ease-in-out',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              }}
            >
              📋 Create Policy
            </button>
            <button
              style={{
                padding: `${spacing.md} ${spacing.lg}`,
                backgroundColor: colors['neutral-100'],
                color: colors['neutral-900'],
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s ease-in-out',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  colors['neutral-200'];
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  colors['neutral-100'];
              }}
            >
              📊 Generate Report
            </button>
          </div>
        </Card>
      </div>

      {/* Employee Directory */}
      <Card title="Employee Directory" elevation="sm" className="" style={fullWidthStyles}>
        <Table
          columns={employeeColumns}
          data={employees}
          striped={true}
          hoverable={true}
          sortBy="name"
        />
      </Card>
    </AdminLayout>
  );
};

AdminDashboard.displayName = 'AdminDashboard';
