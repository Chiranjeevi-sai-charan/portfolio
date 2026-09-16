import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EmployeeChatbot, AdminDashboard, SystemAdminDashboard, MaterialIcon, ToastProvider } from '../../components/sage-product';
import { resetSageDemoData } from '../../utils/storage';

export default function SageApp() {
  const [activeRole, setActiveRole] = useState('employee');

  // Public demo: reset users/documents to the known-good baseline on every
  // page load so nothing a visitor uploads or edits outlives the session.
  useEffect(() => {
    resetSageDemoData();
  }, []);

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

  const activeRoleData = roles.find((r) => r.id === activeRole);
  const ActiveComponent = activeRoleData?.component;

  return (
    <ToastProvider>
    <div className="sage-app" style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Header Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '12px 24px',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          height: '60px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Left: Back Link */}
        <Link
          to="/case-studies/sage"
          style={{
            color: '#111827',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'opacity 0.2s',
            justifySelf: 'start',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          ← Case Study
        </Link>

        {/* Center column intentionally left empty — keeps the 3-column grid
            balanced so the role selector stays pinned to the right edge. */}
        <div />

        {/* Right: Role Selector */}
        <div style={{ display: 'flex', gap: '8px', justifySelf: 'end' }}>
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              style={{
                padding: '8px 16px',
                backgroundColor: activeRole === role.id ? 'rgba(26, 117, 219, 0.08)' : '#ffffff',
                color: activeRole === role.id ? '#1A75DB' : '#374151',
                border: `1px solid ${activeRole === role.id ? '#1A75DB' : '#d1d5db'}`,
                borderRadius: '999px',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '13px',
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
              }}
              title={role.description}
              onMouseEnter={(e) => {
                if (activeRole !== role.id) {
                  e.currentTarget.style.borderColor = '#9ca3af';
                }
              }}
              onMouseLeave={(e) => {
                if (activeRole !== role.id) {
                  e.currentTarget.style.borderColor = '#d1d5db';
                }
              }}
            >
              <MaterialIcon name={role.icon} size={16} />
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Content */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', backgroundColor: '#ffffff' }}>
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
    </ToastProvider>
  );
}
