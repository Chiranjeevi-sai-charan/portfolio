/**
 * Shared reference data for the Sage product (departments, content types, roles).
 * Centralized so Document upload, filters, and user management all agree.
 *
 * Both lists model Sage as a company-wide HR assistant: any employee can
 * query documents from any department, but each department has its own
 * Admin responsible for uploading and curating that department's content
 * (see RoleWorkspace - an Admin is scoped to their own department; a
 * System Admin oversees all of them). 'General' covers company-wide
 * policies that aren't owned by one specific function.
 */
export const DEPARTMENTS = [
  'General',
  'Human Resources (HR)',
  'Information Technology (IT)',
  'Finance & Accounts',
];

/**
 * What kind of document this is, independent of which department owns it -
 * drives how it's presented/filtered, e.g. a "Form" implies the employee
 * needs to fill something out, while a "Policy" is read-only reference.
 */
export const CONTENT_TYPES = ['Policy', 'Handbook', 'Guide', 'Form', 'Report', 'FAQ', 'Other'];

export const SENSITIVITIES = ['Sensitive', 'Non-Sensitive'];

export const ROLE_LABELS: Record<string, string> = {
  user: 'Employee',
  admin: 'Admin',
  'system-admin': 'System Admin',
};
