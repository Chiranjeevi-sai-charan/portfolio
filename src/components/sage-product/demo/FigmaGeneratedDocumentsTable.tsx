import React from 'react';
import { colors, spacing, borderRadius, typography, statusColors } from '../../../styles/sage/tokens';
import { Badge } from '../Badge';
import { IconButton } from '../IconButton';
import { MaterialIcon } from '../MaterialIcon';
import { FileTypeIcon } from '../FileTypeIcon';

/**
 * Generated from the "Table Card" frame in the Sage Figma file via Figma's
 * MCP (get_design_context), then adapted from the raw React+Tailwind
 * reference output to this project's actual conventions: inline style
 * objects from tokens.ts, and the existing Badge/IconButton/FileTypeIcon
 * components instead of the raw SVG constants and plain text the reference
 * output returned for file icons and action buttons.
 */

interface DocRow {
  name: string;
  department: string;
  sensitive: boolean;
  lastUpdated: string;
  uploadedBy: string;
}

const COLUMNS = ['Document', 'Department', 'Sensitivity', 'Last Updated', 'Uploaded By', 'Actions'];

const ROWS: DocRow[] = [
  { name: 'HR Policy FAQ.docx', department: 'Human Resources (HR)', sensitive: false, lastUpdated: '9/18/2026', uploadedBy: 'Sai.Ganesh' },
  { name: 'Leave & Attendance Policy.pdf', department: 'Human Resources (HR)', sensitive: false, lastUpdated: '9/17/2026', uploadedBy: 'Pragati' },
  { name: 'Employee Benefits Handbook.pdf', department: 'Human Resources (HR)', sensitive: false, lastUpdated: '9/16/2026', uploadedBy: 'Sai.Ganesh' },
  { name: 'Salary Structure FY24.xlsx', department: 'Human Resources (HR)', sensitive: true, lastUpdated: '9/15/2026', uploadedBy: 'Pragati' },
  { name: 'Work From Home Guidelines.docx', department: 'Human Resources (HR)', sensitive: false, lastUpdated: '9/13/2026', uploadedBy: 'Sai.Ganesh' },
  { name: 'Onboarding Checklist - New Hires.pptx', department: 'Human Resources (HR)', sensitive: false, lastUpdated: '9/11/2026', uploadedBy: 'Pragati' },
  { name: 'Performance Review Template.xlsx', department: 'Human Resources (HR)', sensitive: false, lastUpdated: '9/9/2026', uploadedBy: 'Sai.Ganesh' },
  { name: 'Health Insurance Enrollment Guide.docx', department: 'Human Resources (HR)', sensitive: false, lastUpdated: '9/6/2026', uploadedBy: 'Pragati' },
];

export const FigmaGeneratedDocumentsTable: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: colors['neutral-white'],
        border: `1px solid ${colors['neutral-200']}`,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing['3xl'],
          padding: `${spacing.sm} ${spacing.md}`,
          backgroundColor: colors['neutral-50'],
          borderBottom: `1px solid ${colors['neutral-200']}`,
        }}
      >
        <div style={{ width: 32 }} />
        <span style={{ width: 260, fontSize: typography.fontSize['body-sm'], fontWeight: typography.fontWeight.semibold, color: colors['neutral-600'] }}>{COLUMNS[0]}</span>
        {COLUMNS.slice(1).map((col) => (
          <span key={col} style={{ flex: 1, fontSize: typography.fontSize['body-sm'], fontWeight: typography.fontWeight.semibold, color: colors['neutral-600'] }}>
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
            gap: spacing['3xl'],
            padding: `${spacing.sm} ${spacing.md}`,
            borderBottom: `1px solid ${colors['neutral-200']}`,
          }}
        >
          <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileTypeIcon fileName={row.name} size={18} />
          </div>
          <span style={{ width: 260, fontSize: typography.fontSize['body-sm'], fontWeight: typography.fontWeight.medium, color: colors['neutral-900'] }}>
            {row.name}
          </span>
          <span style={{ flex: 1, fontSize: typography.fontSize['body-sm'], color: colors['neutral-700'] }}>
            {row.department}
          </span>
          <div style={{ flex: 1, display: 'flex' }}>
            <Badge
              backgroundColor={row.sensitive ? statusColors.sensitive.bg : statusColors.nonSensitive.bg}
              color={row.sensitive ? statusColors.sensitive.text : statusColors.nonSensitive.text}
            >
              {row.sensitive ? 'Sensitive' : 'Non-Sensitive'}
            </Badge>
          </div>
          <span style={{ flex: 1, fontSize: typography.fontSize['body-sm'], color: colors['neutral-700'] }}>
            {row.lastUpdated}
          </span>
          <span style={{ flex: 1, fontSize: typography.fontSize['body-sm'], color: colors['neutral-700'] }}>
            {row.uploadedBy}
          </span>
          <div style={{ flex: 1, display: 'flex', gap: spacing.sm }}>
            <IconButton
              size={18}
              color={colors['accent-blue']}
              hoverBackgroundColor="rgba(26, 117, 219, 0.08)"
              aria-label={`Download ${row.name}`}
            >
              <MaterialIcon name="download" size={18} />
            </IconButton>
            <IconButton
              size={18}
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
