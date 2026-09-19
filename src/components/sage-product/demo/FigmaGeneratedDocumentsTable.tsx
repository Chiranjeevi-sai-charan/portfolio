import React from 'react';
import { colors, spacing, borderRadius, typography, statusColors } from '../../../styles/sage/tokens';
import { Badge } from '../Badge';
import { IconButton } from '../IconButton';
import { MaterialIcon } from '../MaterialIcon';

/**
 * Generated from the "Documents Table" frame in the Sage Figma file via
 * Figma's MCP (get_design_context), then adapted from the raw React+Tailwind
 * reference output to this project's actual conventions: inline style
 * objects from tokens.ts, and the existing Badge/IconButton components
 * instead of the plain text the reference output returned for status pills
 * and action icons.
 */

interface DocRow {
  name: string;
  department: string;
  sensitive: boolean;
  lastUpdated: string;
  uploadedBy: string;
}

const COLUMNS = ['Document', 'Department', 'Sensitivity', 'Last Updated', 'Uploaded By', 'Actions'];
const COLUMN_WIDTHS = [340, 220, 160, 160, 140, 100];

const ROWS: DocRow[] = [
  { name: 'HR Policy FAQ.docx', department: 'Human Resources', sensitive: false, lastUpdated: '9/15/2026', uploadedBy: 'Sai.Ganesh' },
  { name: 'Leave & Attendance Policy.pdf', department: 'Human Resources', sensitive: false, lastUpdated: '9/14/2026', uploadedBy: 'Pragati' },
  { name: 'Salary Structure FY24.xlsx', department: 'Human Resources', sensitive: true, lastUpdated: '9/12/2026', uploadedBy: 'Pragati' },
  { name: 'Work From Home Guidelines.docx', department: 'Human Resources', sensitive: false, lastUpdated: '9/10/2026', uploadedBy: 'Sai.Ganesh' },
];

export const FigmaGeneratedDocumentsTable: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: colors['neutral-white'],
        border: `1px solid ${colors['neutral-200']}`,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 48,
          padding: `0 ${spacing.lg}`,
          backgroundColor: colors['neutral-50'],
        }}
      >
        {COLUMNS.map((col, i) => (
          <span
            key={col}
            style={{
              width: COLUMN_WIDTHS[i],
              fontSize: typography.fontSize['body-sm'],
              fontWeight: typography.fontWeight.semibold,
              color: colors['neutral-700'],
            }}
          >
            {col}
          </span>
        ))}
      </div>

      {ROWS.map((row) => (
        <div
          key={row.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 64,
            padding: `0 ${spacing.lg}`,
            borderTop: `1px solid ${colors['neutral-100']}`,
          }}
        >
          <span style={{ width: COLUMN_WIDTHS[0], fontSize: typography.fontSize['body-sm'], color: colors['neutral-900'] }}>
            {row.name}
          </span>
          <span style={{ width: COLUMN_WIDTHS[1], fontSize: typography.fontSize['body-sm'], color: colors['neutral-900'] }}>
            {row.department}
          </span>
          <span style={{ width: COLUMN_WIDTHS[2] }}>
            <Badge
              backgroundColor={row.sensitive ? statusColors.sensitive.bg : statusColors.nonSensitive.bg}
              color={row.sensitive ? statusColors.sensitive.text : statusColors.nonSensitive.text}
            >
              {row.sensitive ? 'Sensitive' : 'Non-Sensitive'}
            </Badge>
          </span>
          <span style={{ width: COLUMN_WIDTHS[3], fontSize: typography.fontSize['body-sm'], color: colors['neutral-900'] }}>
            {row.lastUpdated}
          </span>
          <span style={{ width: COLUMN_WIDTHS[4], fontSize: typography.fontSize['body-sm'], color: colors['neutral-900'] }}>
            {row.uploadedBy}
          </span>
          <div style={{ width: COLUMN_WIDTHS[5], display: 'flex', gap: spacing.xs }}>
            <IconButton
              color={colors['accent-blue']}
              hoverBackgroundColor="rgba(26, 117, 219, 0.08)"
              aria-label={`Download ${row.name}`}
            >
              <MaterialIcon name="download" size={18} />
            </IconButton>
            <IconButton
              color={colors['error-red']}
              hoverBackgroundColor="rgba(220, 38, 38, 0.08)"
              aria-label={`Delete ${row.name}`}
            >
              <MaterialIcon name="delete" size={18} />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

FigmaGeneratedDocumentsTable.displayName = 'FigmaGeneratedDocumentsTable';
