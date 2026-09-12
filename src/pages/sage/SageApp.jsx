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
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Header Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Left: Back Link */}
        <Link
          to="/case-studies/sage"
          style={{
            color: '#4CAF50',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          ← Case Study
        </Link>

        {/* Center: Logo/Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#111827', fontSize: '14px' }}>
          <span style={{ fontSize: '18px' }}>🧠</span>
          Sage Product Demo
        </div>

        {/* Right: Role Selector */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              style={{
                padding: '6px 14px',
                backgroundColor: activeRole === role.id ? '#2E7D32' : '#f3f4f6',
                color: activeRole === role.id ? 'white' : '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '13px',
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap',
              }}
              title={role.description}
              onMouseEnter={(e) => {
                if (activeRole !== role.id) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (activeRole !== role.id) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              {role.icon} {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Content */}
      <div style={{ flex: 1, overflow: 'hidden', backgroundColor: '#ffffff' }}>
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}
