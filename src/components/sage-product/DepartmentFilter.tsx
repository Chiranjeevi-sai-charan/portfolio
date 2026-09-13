import React from 'react';
import { colors, spacing, typography, borderRadius } from '../../styles/sage/tokens';
import { MaterialIcon } from './MaterialIcon';

interface DepartmentFilterProps {
  departments: string[];
  selectedDepartments: string[];
  onDepartmentChange: (department: string) => void;
  collapsed?: boolean;
}

export const DepartmentFilter: React.FC<DepartmentFilterProps> = ({
  departments,
  selectedDepartments,
  onDepartmentChange,
  collapsed = false,
}) => {
  const containerStyles: React.CSSProperties = {
    padding: spacing.md,
    borderBottom: `1px solid ${colors['neutral-200']}`,
    backgroundColor: colors['neutral-white'],
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
    marginBottom: spacing.md,
    display: collapsed ? 'none' : 'block',
  };

  const checkboxGroupStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'collapsed' ? 'row' : ('column' as any),
    gap: collapsed ? spacing.sm : spacing.md,
  };

  const checkboxStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    cursor: 'pointer',
    padding: spacing.xs,
  };

  const checkboxInputStyles: React.CSSProperties = {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    accentColor: colors['sage-green-500'],
  };

  const labelStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-700'],
    cursor: 'pointer',
    userSelect: 'none',
    display: collapsed ? 'none' : 'block',
  };

  return (
    <div style={containerStyles}>
      {!collapsed && (
        <div style={titleStyles}>
          <MaterialIcon name="filter_alt" size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          Chat Filter
        </div>
      )}
      <div style={checkboxGroupStyles}>
        {departments.map((dept) => (
          <label key={dept} style={checkboxStyles} title={dept}>
            <input
              type="checkbox"
              checked={selectedDepartments.includes(dept)}
              onChange={() => onDepartmentChange(dept)}
              style={checkboxInputStyles}
              aria-label={`Filter by ${dept}`}
            />
            <span style={labelStyles}>{dept}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

DepartmentFilter.displayName = 'DepartmentFilter';
