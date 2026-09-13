import React, { useState, useMemo } from 'react';
import { colors, spacing, typography, borderRadius } from '../../styles/sage/tokens';
import { User } from '../../utils/storage';
import { ROLE_LABELS } from '../../utils/sageConstants';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Select';
import { MaterialIcon } from './MaterialIcon';
import { ConfirmDialog } from './ConfirmDialog';

interface UserManagementTableProps {
  users: User[];
  showSearch?: boolean;
  /** Show a department filter dropdown (useful when users span multiple departments, e.g. System Admin) */
  showDepartmentFilter?: boolean;
  /** Roles the current viewer is allowed to delete (e.g. an Admin cannot remove a System Admin) */
  deletableRoles?: Array<User['role']>;
  /** Whether the viewer can change a user's role inline (System Admin only) */
  canEditRoles?: boolean;
  /** Roles assignable when editing (used alongside canEditRoles) */
  roleOptions?: Array<User['role']>;
  onUserDelete?: (userId: string) => void;
  onRoleChange?: (userId: string, newRole: User['role']) => void;
  onAddUserClick?: () => void;
}

const ROLE_TABS: { id: 'all' | User['role']; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'user', label: ROLE_LABELS['user'] },
  { id: 'admin', label: ROLE_LABELS['admin'] },
  { id: 'system-admin', label: ROLE_LABELS['system-admin'] },
];

export const UserManagementTable: React.FC<UserManagementTableProps> = ({
  users,
  showSearch = true,
  showDepartmentFilter = false,
  deletableRoles = ['user', 'admin', 'system-admin'],
  canEditRoles = false,
  roleOptions = ['user', 'admin', 'system-admin'],
  onUserDelete,
  onRoleChange,
  onAddUserClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleTab, setRoleTab] = useState<'all' | User['role']>('all');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [pendingDeleteUser, setPendingDeleteUser] = useState<User | null>(null);

  const departmentOptions = useMemo(
    () => Array.from(new Set(users.map((u) => u.department))).sort(),
    [users]
  );

  const roleCounts = useMemo(() => {
    const counts: Record<string, number> = { all: users.length, user: 0, admin: 0, 'system-admin': 0 };
    users.forEach((u) => {
      counts[u.role] = (counts[u.role] || 0) + 1;
    });
    return counts;
  }, [users]);

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleTab === 'all' || user.role === roleTab;
    const matchesDepartment = !departmentFilter || user.department === departmentFilter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesDepartment && matchesSearch;
  });

  const containerStyles: React.CSSProperties = {
    padding: spacing.lg,
    backgroundColor: colors['neutral-white'],
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h3'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
  };

  const tableStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as const,
  };

  const theadStyles: React.CSSProperties = {
    backgroundColor: colors['neutral-100'],
    borderBottom: `2px solid ${colors['neutral-200']}`,
  };

  const thStyles: React.CSSProperties = {
    padding: spacing.md,
    textAlign: 'left',
    fontSize: typography.fontSize['label-md'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
  };

  const tbodyTdStyles: React.CSSProperties = {
    padding: spacing.md,
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-700'],
    borderBottom: `1px solid ${colors['neutral-200']}`,
  };

  const avatarStyles: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: borderRadius.full,
    backgroundColor: colors['neutral-100'],
    color: colors['neutral-600'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '12px',
    marginRight: spacing.sm,
    flexShrink: 0,
  };

  const userNameStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
  };

  const userEmailStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-xs'],
    color: colors['neutral-500'],
  };

  const roleBadgeMap: Record<string, { bg: string; text: string }> = {
    user: { bg: colors['neutral-100'], text: colors['neutral-900'] },
    admin: { bg: colors['warning-amber'], text: colors['neutral-white'] },
    'system-admin': { bg: colors['neutral-900'], text: colors['neutral-white'] },
  };

  const getRoleBadgeStyle = (role: string) => {
    const style = roleBadgeMap[role] || roleBadgeMap['user'];
    return {
      padding: '4px 12px',
      borderRadius: borderRadius.full,
      fontSize: typography.fontSize['label-sm'],
      fontWeight: typography.fontWeight.semibold,
      backgroundColor: style.bg,
      color: style.text,
      display: 'inline-block',
      textTransform: 'uppercase' as const,
    };
  };

  const roleSelectStyles: React.CSSProperties = {
    width: '160px',
  };

  const departmentPillStyles: React.CSSProperties = {
    padding: '4px 12px',
    borderRadius: borderRadius.full,
    fontSize: typography.fontSize['body-xs'],
    backgroundColor: colors['neutral-100'],
    color: colors['neutral-700'],
    display: 'inline-block',
    marginRight: spacing.sm,
  };

  const actionButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: spacing.xs,
    transition: 'transform 0.2s',
  };

  const emptyStateStyles: React.CSSProperties = {
    textAlign: 'center',
    padding: spacing.xl,
    color: colors['neutral-500'],
  };

  const roleTabsStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  };

  const roleTabButtonStyles = (active: boolean): React.CSSProperties => ({
    padding: `${spacing.xs} ${spacing.md}`,
    borderRadius: borderRadius.full,
    border: `1px solid ${active ? colors['neutral-900'] : colors['neutral-200']}`,
    backgroundColor: active ? colors['neutral-900'] : colors['neutral-white'],
    color: active ? colors['neutral-white'] : colors['neutral-700'],
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
  });

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <div>
          <div style={titleStyles}>User Management</div>
          <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'], marginTop: spacing.sm }}>
            Manage users and administrator access.
          </div>
        </div>
        <div style={{ display: 'flex', gap: spacing.md, alignItems: 'center' }}>
          {showDepartmentFilter && departmentOptions.length > 1 && (
            <div style={{ width: '190px' }}>
              <Select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                options={[
                  { label: 'All Departments', value: '' },
                  ...departmentOptions.map((d) => ({ label: d, value: d })),
                ]}
              />
            </div>
          )}
          {showSearch && (
            <div style={{ width: '250px' }}>
              <Input
                type="search"
                placeholder="Search for Admins or System Admin"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
          {onAddUserClick && (
            <Button variant="primary" onClick={onAddUserClick}>
              <MaterialIcon name="person_add" size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Add User
            </Button>
          )}
        </div>
      </div>

      <div style={roleTabsStyles}>
        {ROLE_TABS.map((tab) => (
          <button
            key={tab.id}
            style={roleTabButtonStyles(roleTab === tab.id)}
            onClick={() => setRoleTab(tab.id)}
          >
            {tab.label} ({roleCounts[tab.id] || 0})
          </button>
        ))}
      </div>

      {filteredUsers.length === 0 ? (
        <div style={emptyStateStyles}>
          {searchQuery ? 'No users found matching your search.' : 'No users found.'}
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyles}>
            <thead style={theadStyles}>
              <tr>
                <th style={thStyles}>User</th>
                <th style={thStyles}>Role</th>
                <th style={thStyles}>Departments</th>
                <th style={thStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                      colors['neutral-50'];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={tbodyTdStyles}>
                    <div style={userNameStyles}>
                      <div style={avatarStyles}>{user.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{user.name}</div>
                        <div style={userEmailStyles}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={tbodyTdStyles}>
                    {canEditRoles && onRoleChange ? (
                      <div style={roleSelectStyles}>
                        <Select
                          value={user.role}
                          onChange={(e) => onRoleChange(user.id, e.target.value as User['role'])}
                          options={roleOptions.map((r) => ({ label: ROLE_LABELS[r], value: r }))}
                        />
                      </div>
                    ) : (
                      <div style={getRoleBadgeStyle(user.role)}>{ROLE_LABELS[user.role] || user.role}</div>
                    )}
                  </td>
                  <td style={tbodyTdStyles}>
                    <div style={departmentPillStyles}>{user.department}</div>
                  </td>
                  <td style={tbodyTdStyles}>
                    <div style={{ display: 'flex', gap: spacing.sm }}>
                      {onUserDelete && deletableRoles.includes(user.role) && (
                        <button
                          onClick={() => setPendingDeleteUser(user)}
                          style={{
                            ...actionButtonStyles,
                            color: colors['error-red'],
                          }}
                          title="Delete user"
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.2)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                          }}
                        >
                          <MaterialIcon name="delete" size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!pendingDeleteUser}
        title="Delete User"
        message={`Delete user "${pendingDeleteUser?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteUser) onUserDelete?.(pendingDeleteUser.id);
          setPendingDeleteUser(null);
        }}
        onCancel={() => setPendingDeleteUser(null)}
      />
    </div>
  );
};

UserManagementTable.displayName = 'UserManagementTable';
