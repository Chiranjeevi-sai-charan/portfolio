import React from 'react';
import { RoleWorkspace } from './RoleWorkspace';

/**
 * AdminDashboard Page
 *
 * HR admin workspace: same chatbot experience as Employee, with Documents
 * and User Management reachable from the user profile footer menu, scoped
 * to the admin's own department.
 *
 * @component
 * @example
 * <AdminDashboard />
 */
export const AdminDashboard: React.FC = () => (
  <RoleWorkspace role="admin" userName="Kiruthiga Ramaswami" department="Human Resources (HR)" />
);

AdminDashboard.displayName = 'AdminDashboard';
