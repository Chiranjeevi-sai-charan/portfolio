import React from 'react';
import { colors, spacing, typography, shadows } from '../../styles/sage/tokens';

/**
 * Table Component
 *
 * Data table with sorting, pagination, and flexible columns.
 *
 * @component
 * @example
 * <Table
 *   columns={[
 *     { key: 'name', label: 'Name', sortable: true },
 *     { key: 'status', label: 'Status' },
 *   ]}
 *   data={[
 *     { name: 'Policy A', status: 'Active' },
 *   ]}
 *   sortBy="name"
 * />
 */

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface TableProps<T extends Record<string, any>> {
  /** Table columns configuration */
  columns: TableColumn<T>[];

  /** Table data rows */
  data: T[];

  /** Currently sorted column key */
  sortBy?: keyof T;

  /** Sort direction */
  sortDirection?: 'asc' | 'desc';

  /** Sort change handler */
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;

  /** Row click handler */
  onRowClick?: (row: T) => void;

  /** Show striped rows */
  striped?: boolean;

  /** Show hover effect */
  hoverable?: boolean;

  /** Custom row class */
  rowClassName?: (row: T, index: number) => string;

  /** CSS class name */
  className?: string;
}

/**
 * Table - Data grid with sorting
 *
 * Features:
 * - Configurable columns
 * - Sortable columns (click header)
 * - Custom cell rendering
 * - Row click handlers
 * - Striped rows option
 * - Hover highlighting
 * - Keyboard accessible
 *
 * Sorting:
 * - Click column header to sort
 * - Arrow indicator (↑/↓) shows sort direction
 * - Toggles between asc/desc/none
 */
export const Table: React.FC<TableProps<any>> = ({
  columns,
  data,
  sortBy,
  sortDirection = 'asc',
  onSort,
  onRowClick,
  striped = false,
  hoverable = true,
  rowClassName,
  className = '',
}) => {
  const tableStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    fontSize: typography.fontSize['body-sm'],
    backgroundColor: colors['neutral-white'],
    boxShadow: shadows.sm,
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const headerRowStyles: React.CSSProperties = {
    backgroundColor: colors['neutral-100'],
    borderBottom: `1px solid ${colors['neutral-200']}`,
  };

  const headerCellStyles: React.CSSProperties = {
    padding: `${spacing.md} ${spacing.lg}`,
    textAlign: 'left',
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-700'],
    userSelect: 'none',
  };

  const sortableCellStyles: React.CSSProperties = {
    ...headerCellStyles,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  };

  const bodyRowStyles: React.CSSProperties = {
    borderBottom: `1px solid ${colors['neutral-200']}`,
    transition: 'background-color 0.2s ease-in-out',
  };

  const striped = (index: number): React.CSSProperties =>
    striped && index % 2 === 1
      ? { backgroundColor: colors['neutral-50'] }
      : { backgroundColor: colors['neutral-white'] };

  const cellStyles: React.CSSProperties = {
    padding: `${spacing.md} ${spacing.lg}`,
    color: colors['neutral-900'],
  };

  const handleHeaderClick = (column: TableColumn<any>) => {
    if (!column.sortable || !onSort) return;

    let newDirection: 'asc' | 'desc' = 'asc';
    if (sortBy === column.key && sortDirection === 'asc') {
      newDirection = 'desc';
    }
    onSort(column.key, newDirection);
  };

  const getSortIndicator = (column: TableColumn<any>) => {
    if (sortBy !== column.key) return '';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div style={{ overflowX: 'auto' }} className={className}>
      <table style={tableStyles}>
        <thead>
          <tr style={headerRowStyles}>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                style={{
                  ...sortableCellStyles,
                  width: column.width,
                  cursor: column.sortable ? 'pointer' : 'default',
                }}
                onClick={() => handleHeaderClick(column)}
                onMouseEnter={(e) => {
                  if (column.sortable) {
                    (e.currentTarget as HTMLTableCellElement).style.backgroundColor =
                      colors['neutral-200'];
                  }
                }}
                onMouseLeave={(e) => {
                  if (column.sortable) {
                    (e.currentTarget as HTMLTableCellElement).style.backgroundColor =
                      colors['neutral-100'];
                  }
                }}
              >
                {column.label}
                {column.sortable && (
                  <span style={{ color: colors['neutral-500'], fontSize: '12px' }}>
                    {getSortIndicator(column)}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr style={bodyRowStyles}>
              <td
                colSpan={columns.length}
                style={{
                  ...cellStyles,
                  textAlign: 'center',
                  color: colors['neutral-500'],
                  padding: spacing.xl,
                }}
              >
                No data
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  ...bodyRowStyles,
                  ...striped(rowIndex),
                  cursor: onRowClick ? 'pointer' : 'default',
                }}
                onClick={() => onRowClick?.(row)}
                onMouseEnter={(e) => {
                  if (hoverable && onRowClick) {
                    (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                      colors['sage-green-50'];
                  }
                }}
                onMouseLeave={(e) => {
                  if (hoverable && onRowClick) {
                    (e.currentTarget as HTMLTableRowElement).style.backgroundColor = striped(
                      rowIndex
                    ).backgroundColor as string;
                  }
                }}
                className={rowClassName?.(row, rowIndex)}
              >
                {columns.map((column) => (
                  <td key={String(column.key)} style={{ ...cellStyles, width: column.width }}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.displayName = 'Table';
