import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmployeeChatbot, AdminDashboard, SystemAdminDashboard } from '../../components/sage-product';

// Add Material Symbols font
const materialSymbolsStyle = document.createElement('link');
materialSymbolsStyle.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-200..200';
materialSymbolsStyle.rel = 'stylesheet';
if (document.head && !document.querySelector('link[href*="Material+Symbols"]')) {
  document.head.appendChild(materialSymbolsStyle);
}

export default function SageApp() {
  const [activeRole, setActiveRole] = useState('employee');

  const roles = [
    {
      id: 'employee',
      label: 'Employee',
      icon: 'person',
      description: 'Try the AI-powered chatbot',
      component: EmployeeChatbot,
    },
    {
      id: 'hr-admin',
      label: 'HR Admin',
      icon: 'group',
      description: 'Manage employees & policies',
      component: AdminDashboard,
    },
    {
      id: 'system-admin',
      label: 'System Admin',
      icon: 'settings',
      description: 'System controls & settings',
      component: SystemAdminDashboard,
    },
  ];

  const MaterialIcon = ({ name, size = 20 }) => (
    <span style={{ fontSize: size, fontFamily: 'Material Symbols Outlined', fontWeight: 400 }}>
      {name}
    </span>
  );

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
              <MaterialIcon name={role.icon} size={18} />
              {role.label}
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
