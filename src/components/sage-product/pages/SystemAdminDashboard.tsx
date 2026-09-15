import React from 'react';
import { RoleWorkspace } from './RoleWorkspace';

/**
 * SystemAdminDashboard Page
 *
 * System-level admin workspace: same chatbot experience as Employee, with
 * Documents and User Management reachable from the user profile footer
 * menu, scoped across every department.
 *
 * @component
 * @example
 * <SystemAdminDashboard />
 */
export const SystemAdminDashboard: React.FC = () => (
  <RoleWorkspace role="system-admin" userName="Chiranjeevi" userEmail="Chiranjeevi.Kondaka@gmail.com" />
);

SystemAdminDashboard.displayName = 'SystemAdminDashboard';
