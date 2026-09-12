import { Link } from 'react-router-dom';

export default function SageApp() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #F1F8F6 0%, #E0F0EB 100%)',
      padding: '24px',
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 700,
          color: '#2E7D32',
          marginBottom: '16px',
          margin: 0,
        }}>
          Sage
        </h1>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 400,
          color: '#111827',
          marginBottom: '32px',
          margin: '16px 0 32px 0',
        }}>
          AI-Powered HR Assistant
        </h2>

        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#374151',
          marginBottom: '48px',
        }}>
          The product is being built using React, TypeScript, and design tokens from Figma.
          <br /><br />
          Components and pages are in active development with a code-first approach:
          design tokens → components → full product → reverse-engineer to Figma.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '48px',
        }}>
          <Link
            to="/case-studies/sage"
            style={{
              padding: '14px 32px',
              backgroundColor: '#4CAF50',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '15px',
              transition: 'all 0.2s ease-in-out',
              cursor: 'pointer',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2E7D32';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4CAF50';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ← Back to Case Study
          </Link>
        </div>

        <div style={{
          background: 'white',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'left',
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '16px',
          }}>
            Product Status
          </h3>

          <div style={{
            display: 'grid',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px' }}>✅</span>
              <div>
                <strong style={{ color: '#111827' }}>Design System</strong>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0 0' }}>
                  Colors, spacing, typography, shadows, and component sizes defined
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px' }}>✅</span>
              <div>
                <strong style={{ color: '#111827' }}>Component Templates</strong>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0 0' }}>
                  Button, ChatBubble, Input components with full variants
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px' }}>🔄</span>
              <div>
                <strong style={{ color: '#111827' }}>Component Development</strong>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0 0' }}>
                  Building 20+ components (Select, Checkbox, Modal, Table, etc.)
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px' }}>⏳</span>
              <div>
                <strong style={{ color: '#111827' }}>Product Pages</strong>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0 0' }}>
                  Employee Chatbot, Admin Dashboard, System Admin Analytics
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px' }}>⏳</span>
              <div>
                <strong style={{ color: '#111827' }}>Figma Design System</strong>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0 0' }}>
                  Reverse-engineered from code once components are complete
                </p>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #E5E7EB',
            fontSize: '13px',
            color: '#6B7280',
          }}>
            <p style={{ margin: 0 }}>
              📚 <strong>Learn more:</strong> Check out the full{' '}
              <Link to="/case-studies/sage" style={{ color: '#4CAF50', textDecoration: 'none' }}>
                Sage case study
              </Link>
              {' '}with research, design, and architecture documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
