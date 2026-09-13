/**
 * Shared reference data for the Sage product (departments, content types, roles).
 * Centralized so Document upload, filters, and user management all agree.
 */

export const DEPARTMENTS = ['General', 'Human Resources (HR)', 'Quality Assurance (QA)'];

export const CONTENT_TYPES = [
  'Manual',
  'Report',
  'Regulations and Guidelines',
  'Work Standards',
  'Process quality control sheet',
  'Inspection Standards',
  'External Documents',
  'Others',
];

export const SENSITIVITIES = ['Sensitive', 'Non-Sensitive'];

export const ROLE_LABELS: Record<string, string> = {
  user: 'Employee',
  admin: 'Admin',
  'system-admin': 'System Admin',
};
