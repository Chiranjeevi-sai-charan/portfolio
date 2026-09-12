/**
 * Sage Product Component Library Index
 * Central export point for all Sage components
 * Components are organized by category in subdirectories
 */

// Foundation Components
export { Button } from "./Button";
export { Input } from "./Input";
export { Select } from "./Select";
export { Checkbox } from "./Checkbox";
export { Radio, RadioGroup } from "./Radio";
export { Textarea } from "./Textarea";

// Navigation Components
export { Header } from "./Header";
export { Sidebar, type SidebarItem } from "./Sidebar";
export { Tabs } from "./Tabs";
export { Breadcrumbs } from "./Breadcrumbs";

// Content Display Components
export { ChatBubble } from "./ChatBubble";
export { Card } from "./Card";
export { Table, type TableColumn } from "./Table";
export { Badge } from "./Badge";
export { Avatar, AvatarGroup } from "./Avatar";

// Modal & Overlay Components
export { Modal, type ModalAction } from "./Modal";
export { Dropdown, type DropdownItem } from "./Dropdown";
export { Alert } from "./Alert";
export { Toast } from "./Toast";

// Utility Components
export { LoadingSpinner } from "./LoadingSpinner";
export { EmptyState, type EmptyStateAction } from "./EmptyState";
export { Tooltip } from "./Tooltip";
export { Pagination } from "./Pagination";

// Layout Components
export { ChatLayout } from "./layouts/ChatLayout";
export { AdminLayout } from "./layouts/AdminLayout";
export { SystemAdminLayout } from "./layouts/SystemAdminLayout";

// Pages
export { EmployeeChatbot } from "../pages/EmployeeChatbot";
export { AdminDashboard } from "../pages/AdminDashboard";
export { SystemAdminDashboard } from "../pages/SystemAdminDashboard";
