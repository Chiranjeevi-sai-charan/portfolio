import React, { useState, useEffect } from 'react';
import { colors, spacing, typography, borderRadius } from '../../../styles/sage/tokens';
import { Tabs } from '../Tabs';
import { DocumentUpload } from '../DocumentUpload';
import { DocumentList } from '../DocumentList';
import { UserManagementTable } from '../UserManagementTable';
import { MaterialIcon } from '../MaterialIcon';
import { Document, documentStorage, User, userStorage, initializeMockData } from '../../../utils/storage';

/**
 * AdminDashboard Page
 *
 * HR admin dashboard for managing documents and users by department.
 *
 * @component
 * @example
 * <AdminDashboard />
 */

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upload-documents');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  useEffect(() => {
    // Initialize mock data
    initializeMockData();

    // Load documents and users
    const allDocs = documentStorage.getAll();
    setDocuments(allDocs);

    const allUsers = userStorage.getAll();
    setUsers(allUsers);
  }, []);

  const departments = ['General', 'Human Resources (HR)', 'Quality Assurance (QA)'];
  const contentTypes = [
    'Manual',
    'Report',
    'Regulations and Guidelines',
    'Work Standards',
    'Process quality control sheet',
    'Inspection Standards',
    'External Documents',
    'Others',
  ];
  const sensitivities = ['Sensitive', 'Non-Sensitive'];

  const handleDocumentDelete = (docId: string) => {
    const doc = documentStorage.getById(docId);
    if (doc) {
      doc.status = 'deleted';
      documentStorage.save(doc);
      setDocuments(documentStorage.getAll());
    }
  };

  const handleDocumentArchive = (docId: string) => {
    documentStorage.archive(docId);
    setDocuments(documentStorage.getAll());
  };

  const handleDocumentRestore = (docId: string) => {
    documentStorage.restore(docId);
    setDocuments(documentStorage.getAll());
  };

  const handleUserDelete = (userId: string) => {
    userStorage.delete(userId);
    setUsers(userStorage.getAll());
  };

  const handleUploadSuccess = (doc: Document) => {
    setDocuments(documentStorage.getAll());
  };

  const activeDocuments = documents.filter((d) => d.status === 'active');
  const archivedDocuments = documents.filter((d) => d.status === 'archived');
  const deletedDocuments = documents.filter((d) => d.status === 'deleted');

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    backgroundColor: colors['neutral-50'],
    padding: spacing.lg,
    borderRadius: borderRadius.md,
  };

  const tabButtonStyles: React.CSSProperties = {
    padding: `${spacing.md} ${spacing.lg}`,
    backgroundColor: colors['neutral-white'],
    border: 'none',
    borderBottom: `2px solid transparent`,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: typography.fontSize['body-sm'],
    transition: 'all 0.2s ease',
  };

  const tabs = [
    { id: 'upload-documents', label: 'Upload Document', icon: 'upload_file' },
    { id: 'active-documents', label: 'Active Documents', icon: 'check_circle' },
    { id: 'archived-documents', label: 'Archived Documents', icon: 'archive' },
    { id: 'deleted-documents', label: 'Deleted Documents', icon: 'delete' },
    { id: 'user-management', label: 'User Management', icon: 'group' },
  ];

  const tabsContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing.md,
    borderBottom: `2px solid ${colors['neutral-200']}`,
    backgroundColor: colors['neutral-white'],
    padding: spacing.md,
    borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
  };

  return (
    <div style={containerStyles}>
      {/* Tabs Header */}
      <div style={tabsContainerStyles}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...tabButtonStyles,
              borderBottomColor:
                activeTab === tab.id ? colors['sage-green-500'] : 'transparent',
              color: activeTab === tab.id ? colors['sage-green-600'] : colors['neutral-600'],
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                (e.currentTarget as HTMLButtonElement).style.color = colors['neutral-900'];
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                (e.currentTarget as HTMLButtonElement).style.color = colors['neutral-600'];
              }
            }}
          >
            <MaterialIcon name={tab.icon} size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ backgroundColor: colors['neutral-white'] }}>
        {activeTab === 'upload-documents' && (
          <DocumentUpload
            departments={departments}
            contentTypes={contentTypes}
            sensitivities={sensitivities}
            onUploadSuccess={handleUploadSuccess}
          />
        )}

        {activeTab === 'active-documents' && (
          <DocumentList
            documents={activeDocuments}
            showSearch
            onDocumentDelete={handleDocumentDelete}
            onDocumentArchive={handleDocumentArchive}
            onDocumentDownload={(doc) => {
              console.log('Downloading document:', doc.name);
              alert(`Document "${doc.name}" would be downloaded here`);
            }}
          />
        )}

        {activeTab === 'archived-documents' && (
          <DocumentList
            documents={archivedDocuments}
            showSearch
            onDocumentDownload={(doc) => {
              console.log('Downloading document:', doc.name);
              alert(`Document "${doc.name}" would be downloaded here`);
            }}
          />
        )}

        {activeTab === 'deleted-documents' && (
          <div style={{ padding: spacing.lg }}>
            <div style={{ marginBottom: spacing.lg }}>
              <div style={{ fontSize: typography.fontSize['h3'], fontWeight: 600, marginBottom: spacing.md }}>
                Deleted Documents
              </div>
              <div
                style={{
                  padding: spacing.md,
                  backgroundColor: colors['neutral-50'],
                  borderRadius: borderRadius.md,
                  marginBottom: spacing.md,
                  fontSize: typography.fontSize['body-sm'],
                  color: colors['neutral-600'],
                }}
              >
                Documents which were earlier deleted can be restored if required.
              </div>
            </div>

            {deletedDocuments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: spacing.xl, color: colors['neutral-500'] }}>
                No deleted documents.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                  <thead
                    style={{
                      backgroundColor: colors['neutral-100'],
                      borderBottom: `2px solid ${colors['neutral-200']}`,
                    }}
                  >
                    <tr>
                      <th style={{ padding: spacing.md, textAlign: 'left', fontWeight: 600 }}>
                        File
                      </th>
                      <th style={{ padding: spacing.md, textAlign: 'left', fontWeight: 600 }}>
                        Department
                      </th>
                      <th style={{ padding: spacing.md, textAlign: 'left', fontWeight: 600 }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {deletedDocuments.map((doc) => (
                      <tr key={doc.id} style={{ borderBottom: `1px solid ${colors['neutral-200']}` }}>
                        <td style={{ padding: spacing.md }}>
                          <MaterialIcon name="description" size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                          {doc.name}
                        </td>
                        <td style={{ padding: spacing.md }}>{doc.department}</td>
                        <td style={{ padding: spacing.md }}>
                          <button
                            onClick={() => handleDocumentRestore(doc.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: colors['success-green'],
                              marginRight: spacing.md,
                            }}
                            title="Restore"
                          >
                            <MaterialIcon name="restore" size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                            Restore
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Permanently delete "${doc.name}"?`)) {
                                documentStorage.delete(doc.id);
                                setDocuments(documentStorage.getAll());
                              }
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: colors['error-red'],
                            }}
                            title="Permanently delete"
                          >
                            <MaterialIcon name="delete_forever" size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'user-management' && (
          <UserManagementTable
            users={users}
            showSearch
            onUserDelete={handleUserDelete}
            onAddUserClick={() => {
              alert('Add user modal would open here');
            }}
          />
        )}
      </div>
    </div>
  );
};

AdminDashboard.displayName = 'AdminDashboard';
