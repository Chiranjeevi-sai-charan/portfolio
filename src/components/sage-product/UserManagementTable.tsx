import React, { useState } from 'react';
import { colors, spacing, typography, borderRadius } from '../../styles/sage/tokens';
import { User, userStorage } from '../../utils/storage';
import { Input } from './Input';
import { Button } from './Button';

interface UserManagementTableProps {
  users: User[];
  filterRole?: string;
  showSearch?: boolean;
  onUserDelete?: (userId: string) => void;
  onUserUpdate?: (user: User) => void;
  onAddUserClick?: () => void;
}

export const UserManagementTable: React.FC<UserManagementTableProps> = ({
  users,
  filterRole,
  showSearch = true,
  onUserDelete,
  onUserUpdate,
  onAddUserClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter((user) => {
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
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
    backgroundColor: colors['sage-green-500'],
    color: colors['neutral-white'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '12px',
    marginRight: spacing.sm,
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
    'system-admin': { bg: colors['sage-green-500'], text: colors['neutral-white'] },
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

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <div>
          <div style={titleStyles}>User Management</div>
          <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'], marginTop: spacing.sm }}>
            Manage users and administrator access.
          </div>
        </div>
        <div style={{ display: 'flex', gap: spacing.md', alignItems: 'center' }}>
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
              ➕ Add User
            </Button>
          )}
        </div>
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
                    <div style={getRoleBadgeStyle(user.role)}>
                      {user.role === 'system-admin' ? 'System Admin' : user.role}
                    </div>
                  </td>
                  <td style={tbodyTdStyles}>
                    <div style={departmentPillStyles}>{user.department}</div>
                  </td>
                  <td style={tbodyTdStyles}>
                    <div style={{ display: 'flex', gap: spacing.sm }}>
                      {onUserDelete && (
                        <button
                          onClick={() => {
                            if (confirm(`Delete user "${user.name}"?`)) {
                              onUserDelete?.(user.id);
                            }
                          }}
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
                          🗑️
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
    </div>
  );
};

UserManagementTable.displayName = 'UserManagementTable';
