import React, { useState, useMemo } from 'react';
import { colors, spacing, typography, borderRadius, interactionTints } from '../../styles/sage/tokens';
import { User } from '../../utils/storage';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Select';
import { MaterialIcon } from './MaterialIcon';
import { ConfirmDialog } from './ConfirmDialog';
import { IconButton } from './IconButton';
import { Badge } from './Badge';
import { t, Lang, getRoleLabel } from '../../utils/sageStrings';

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
  language?: Lang;
}

const getRoleTabs = (language?: Lang): { id: 'all' | User['role']; label: string }[] => [
  { id: 'all', label: t(language, 'all') },
  { id: 'admin', label: t(language, 'admin') },
  { id: 'system-admin', label: t(language, 'systemAdmin') },
];

export const UserManagementTable: React.FC<UserManagementTableProps> = ({
  users,
  showSearch = true,
  showDepartmentFilter = false,
  deletableRoles = ['admin', 'system-admin'],
  canEditRoles = false,
  roleOptions = ['admin', 'system-admin'],
  onUserDelete,
  onRoleChange,
  onAddUserClick,
  language,
}) => {
  const ROLE_TABS = getRoleTabs(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleTab, setRoleTab] = useState<'all' | User['role']>('all');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [pendingDeleteUser, setPendingDeleteUser] = useState<User | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  const departmentOptions = useMemo(
    () => Array.from(new Set(users.flatMap((u) => u.departments))).sort(),
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
    const matchesDepartment = !departmentFilter || user.departments.includes(departmentFilter);
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesDepartment && matchesSearch;
  });

  React.useEffect(() => {
    setSelectedIds(new Set());
  }, [roleTab, departmentFilter, searchQuery]);

  const deletableFilteredUsers = filteredUsers.filter((u) => deletableRoles.includes(u.role));
  const deletableIds = deletableFilteredUsers.map((u) => u.id);
  const allSelected = deletableIds.length > 0 && deletableIds.every((id) => selectedIds.has(id));
  const someSelected = deletableIds.some((id) => selectedIds.has(id));

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        deletableIds.forEach((id) => next.delete(id));
      } else {
        deletableIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const selectedUsers = users.filter((u) => selectedIds.has(u.id));

  const containerStyles: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    padding: spacing.lg,
    backgroundColor: 'transparent',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    marginBottom: spacing.lg,
  };

  const scrollAreaStyles: React.CSSProperties = {
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
  };

  const tableCardStyles: React.CSSProperties = {
    border: `1px solid ${colors['neutral-200']}`,
    borderRadius: borderRadius.md,
  };

  // Shared column template for the header row and every body row, so they
  // stay aligned without relying on native <table> layout. A native
  // <table>'s position:sticky <thead> has a persistent Chromium rendering
  // bug in this scroll setup (tbody rows paint through above the stuck
  // header) that survives every standard CSS mitigation, so the header is
  // built as a separate sticky div instead of living inside the table.
  const GRID_TEMPLATE_COLUMNS = '36px minmax(200px, 2fr) 190px minmax(160px, 1.5fr) 80px';

  const headerRowStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
    alignItems: 'center',
  };

  const thStyles: React.CSSProperties = {
    padding: spacing.md,
    textAlign: 'left',
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-600'],
    backgroundColor: colors['neutral-50'],
  };

  const tbodyTrStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
    alignItems: 'center',
  };

  const tbodyTdStyles: React.CSSProperties = {
    padding: spacing.md,
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-700'],
    borderBottom: `1px solid ${colors['neutral-100']}`,
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

  const roleBadgeMap: Record<string, { backgroundColor: string; color: string }> = {
    user: { backgroundColor: colors['neutral-100'], color: colors['neutral-900'] },
    admin: { backgroundColor: colors['warning-amber'], color: colors['neutral-white'] },
    'system-admin': { backgroundColor: colors['neutral-900'], color: colors['neutral-white'] },
  };

  const getRoleBadgeColors = (role: string) => roleBadgeMap[role] || roleBadgeMap['user'];

  const roleSelectStyles: React.CSSProperties = {
    width: '180px',
  };


  const emptyStateStyles: React.CSSProperties = {
    textAlign: 'center',
    padding: `${spacing['3xl']} ${spacing.xl}`,
    color: colors['neutral-500'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
  };

  const emptyStateIconWrapStyles: React.CSSProperties = {
    width: '56px',
    height: '56px',
    borderRadius: borderRadius.full,
    backgroundColor: interactionTints.accentSubtle,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  };

  const roleTabsStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    flexShrink: 0,
  };

  const checkboxStyles: React.CSSProperties = {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    accentColor: colors['accent-blue'],
  };

  const bulkBarStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: interactionTints.accentSubtle,
    borderBottom: `1px solid ${colors['neutral-200']}`,
    color: colors['neutral-900'],
  };

  const bulkActionButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: `6px ${spacing.sm}`,
    background: 'transparent',
    border: 'none',
    borderRadius: borderRadius.sm,
    color: colors['neutral-700'],
    cursor: 'pointer',
    fontSize: typography.fontSize['body-sm'],
    fontWeight: 600,
    transition: 'background-color 0.15s ease',
  };

  const roleTabButtonStyles = (active: boolean): React.CSSProperties => ({
    padding: `${spacing.xs} ${spacing.md}`,
    borderRadius: borderRadius.full,
    border: `1px solid ${active ? colors['accent-blue'] : colors['neutral-300']}`,
    backgroundColor: active ? interactionTints.accentSubtle : colors['neutral-white'],
    color: active ? colors['accent-blue'] : colors['neutral-700'],
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
  });

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'] }}>
          {t(language, 'manageUsersDesc')}
        </div>
        <div style={{ display: 'flex', gap: spacing.md, alignItems: 'center' }}>
          {showDepartmentFilter && departmentOptions.length > 1 && (
            <div style={{ width: '220px' }}>
              <Select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                options={[
                  { label: t(language, 'allDepartments'), value: '' },
                  ...departmentOptions.map((d) => ({ label: d, value: d })),
                ]}
              />
            </div>
          )}
          {showSearch && (
            <div style={{ width: '248px' }}>
              <Input
                type="search"
                placeholder={t(language, 'searchUsers')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
          {onAddUserClick && (
            <Button variant="primary" onClick={onAddUserClick}>
              <MaterialIcon name="person_add" size={16} style={{ verticalAlign: 'middle', marginRight: spacing.sm }} />
              {t(language, 'addUser')}
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
          <div style={emptyStateIconWrapStyles}>
            <MaterialIcon name={searchQuery ? 'search_off' : 'person_search'} size={26} color={colors['accent-blue']} />
          </div>
          {searchQuery ? t(language, 'noUsersFound') : t(language, 'noUsersFoundEmpty')}
        </div>
      ) : (
        <div style={scrollAreaStyles}>
        <div style={tableCardStyles} role="table" aria-label={t(language, 'userColumn')}>
          <div style={{ position: 'sticky', top: 0, zIndex: 2, borderBottom: `1px solid ${colors['neutral-200']}`, backgroundColor: colors['neutral-white'] }}>
            {selectedIds.size > 0 && (
              <div style={bulkBarStyles}>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                  <input
                    type="checkbox"
                    style={checkboxStyles}
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected && !allSelected;
                    }}
                    onChange={toggleAll}
                    aria-label={t(language, 'selectAll')}
                  />
                  <span style={{ fontSize: typography.fontSize['body-sm'], fontWeight: 600, color: colors['neutral-900'] }}>
                    {t(language, 'selectedCount')(selectedIds.size)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: spacing.xs, alignItems: 'center' }}>
                  {onUserDelete && (
                    <button
                      onClick={() => setBulkDeleteConfirm(true)}
                      style={{ ...bulkActionButtonStyles, color: colors['error-red'] }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = interactionTints.dangerHover;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                      }}
                    >
                      <MaterialIcon name="delete" size={16} />
                      {t(language, 'delete')}
                    </button>
                  )}
                  <div style={{ width: '1px', height: '20px', backgroundColor: colors['neutral-200'], margin: `0 ${spacing.xs}` }} />
                  <button
                    onClick={() => setSelectedIds(new Set())}
                    style={{ ...bulkActionButtonStyles, color: colors['neutral-500'] }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = interactionTints.neutralHover;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    {t(language, 'clear')}
                  </button>
                </div>
              </div>
            )}
            <div style={headerRowStyles} role="row">
              <div style={thStyles} role="columnheader">
                <input
                  type="checkbox"
                  style={checkboxStyles}
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected && !allSelected;
                  }}
                  onChange={toggleAll}
                  aria-label={t(language, 'selectAll')}
                />
              </div>
              <div style={thStyles} role="columnheader">{t(language, 'userColumn')}</div>
              <div style={thStyles} role="columnheader">{t(language, 'roleColumn')}</div>
              <div style={thStyles} role="columnheader">{t(language, 'departmentsColumn')}</div>
              <div style={thStyles} role="columnheader">{t(language, 'actionsColumn')}</div>
            </div>
          </div>
          <div role="rowgroup">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                style={{ ...tbodyTrStyles, backgroundColor: colors['neutral-white'] }}
                role="row"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    colors['neutral-50'];
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    colors['neutral-white'];
                }}
              >
                <div style={tbodyTdStyles} role="cell">
                  {deletableRoles.includes(user.role) && (
                    <input
                      type="checkbox"
                      style={checkboxStyles}
                      checked={selectedIds.has(user.id)}
                      onChange={() => toggleRow(user.id)}
                      aria-label={`Select ${user.name}`}
                    />
                  )}
                </div>
                <div style={tbodyTdStyles} role="cell">
                  <div style={userNameStyles}>
                    <div style={avatarStyles}>{user.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{user.name}</div>
                      <div style={userEmailStyles}>{user.email}</div>
                    </div>
                  </div>
                </div>
                <div style={tbodyTdStyles} role="cell">
                  {canEditRoles && onRoleChange ? (
                    <div style={roleSelectStyles}>
                      <Select
                        value={user.role}
                        onChange={(e) => onRoleChange(user.id, e.target.value as User['role'])}
                        options={roleOptions.map((r) => ({ label: getRoleLabel(r, language), value: r }))}
                      />
                    </div>
                  ) : (
                    <Badge {...getRoleBadgeColors(user.role)} uppercase size="sm">
                      {getRoleLabel(user.role, language)}
                    </Badge>
                  )}
                </div>
                <div style={tbodyTdStyles} role="cell">
                  {user.departments.map((dept) => (
                    <Badge
                      key={dept}
                      backgroundColor={colors['neutral-100']}
                      color={colors['neutral-700']}
                      style={{ marginRight: spacing.sm }}
                    >
                      {dept}
                    </Badge>
                  ))}
                </div>
                <div style={tbodyTdStyles} role="cell">
                  <div style={{ display: 'flex', gap: spacing.sm }}>
                    {onUserDelete && deletableRoles.includes(user.role) && (
                      <IconButton
                        onClick={() => setPendingDeleteUser(user)}
                        color={colors['error-red']}
                        hoverBackgroundColor={interactionTints.dangerHover}
                        title={t(language, 'delete')}
                        aria-label={`${t(language, 'delete')} ${user.name}`}
                      >
                        <MaterialIcon name="delete" size={18} />
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      )}

      <ConfirmDialog
        language={language}
        cancelLabel={t(language, 'cancel')}
        isOpen={!!pendingDeleteUser}
        title={t(language, 'deleteUserTitle')}
        message={t(language, 'deleteUserMsg')(pendingDeleteUser?.name)}
        confirmLabel={t(language, 'delete')}
        onConfirm={() => {
          if (pendingDeleteUser) onUserDelete?.(pendingDeleteUser.id);
          setPendingDeleteUser(null);
        }}
        onCancel={() => setPendingDeleteUser(null)}
      />

      <ConfirmDialog
        language={language}
        cancelLabel={t(language, 'cancel')}
        isOpen={bulkDeleteConfirm}
        title={t(language, 'deleteUsersTitle')}
        message={t(language, 'deleteUsersMsg')(selectedIds.size)}
        confirmLabel={t(language, 'delete')}
        onConfirm={() => {
          selectedUsers.forEach((user) => onUserDelete?.(user.id));
          setSelectedIds(new Set());
          setBulkDeleteConfirm(false);
        }}
        onCancel={() => setBulkDeleteConfirm(false)}
      />
    </div>
  );
};

UserManagementTable.displayName = 'UserManagementTable';
