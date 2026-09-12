import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmployeeChatbot, AdminDashboard, SystemAdminDashboard } from '../../components/sage-product';

export default function SageApp() {
  const [activeRole, setActiveRole] = useState('employee');

  const roles = [
    {
      id: 'employee',
      label: 'Employee',
      icon: '👤',
      description: 'Try the AI-powered chatbot',
      component: EmployeeChatbot,
    },
    {
      id: 'hr-admin',
      label: 'HR Admin',
      icon: '👥',
      description: 'Manage employees & policies',
      component: AdminDashboard,
    },
    {
      id: 'system-admin',
      label: 'System Admin',
      icon: '⚙️',
      description: 'System controls & settings',
      component: SystemAdminDashboard,
    },
  ];

  const activeRoleData = roles.find((r) => r.id === activeRole);
  const ActiveComponent = activeRoleData?.component;

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Role Selector */}
      <div
        style={{
          backgroundColor: '#f9fafb',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link
            to="/case-studies/sage"
            style={{
              color: '#4CAF50',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            ← Case Study
          </Link>
          <div style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }} />
          <span style={{ fontWeight: 600, color: '#111827' }}>Sage Product Demo</span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              style={{
                padding: '8px 16px',
                backgroundColor: activeRole === role.id ? '#2E7D32' : '#f3f4f6',
                color: activeRole === role.id ? 'white' : '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '14px',
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              title={role.description}
            >
              {role.icon} {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}
