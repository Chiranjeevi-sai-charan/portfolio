import React, { useState, useEffect } from 'react';
import { colors, spacing, typography, borderRadius } from '../../../styles/sage/tokens';
import { ChatLayout } from '../layouts/ChatLayout';
import { SidebarItem } from '../Sidebar';
import { DocumentUpload } from '../DocumentUpload';
import { DocumentList } from '../DocumentList';
import { UserManagementTable } from '../UserManagementTable';
import { AddUserModal } from '../AddUserModal';
import { ConfirmDialog } from '../ConfirmDialog';
import { MaterialIcon } from '../MaterialIcon';
import { useToast } from '../ToastProvider';
import {
  Document,
  documentStorage,
  User,
  userStorage,
  initializeMockData,
} from '../../../utils/storage';
import { DEPARTMENTS, CONTENT_TYPES, SENSITIVITIES, ROLE_LABELS } from '../../../utils/sageConstants';
import { generateAIResponse } from '../../../utils/mockAIResponses';

/**
 * RoleWorkspace Page
 *
 * Shared workspace for Admin and System Admin: the same HR chatbot experience
 * as Employees, with Documents and User Management reachable from the user
 * profile footer menu, scoped by role and department.
 *
 * @component
 */

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  citations?: string[];
}

interface Conversation {
  id: string;
  title: string;
  icon: string;
}

type ActiveView = 'chat' | 'documents' | 'user-management';

interface RoleWorkspaceProps {
  role: 'admin' | 'system-admin';
  userName: string;
  /** Required for admin (their own department); ignored for system-admin, who sees every department */
  department?: string;
}

const SEED_CONVERSATIONS: Conversation[] = [
  { id: 'chat-1', title: 'Vacation Policy Questions', icon: 'beach_access' },
  { id: 'chat-2', title: 'Health Insurance Coverage', icon: 'local_hospital' },
];

export const RoleWorkspace: React.FC<RoleWorkspaceProps> = ({ role, userName, department }) => {
  const isSystemAdmin = role === 'system-admin';

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(SEED_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('chat');
  const [documentTab, setDocumentTab] = useState<'upload' | 'active' | 'archived' | 'deleted'>('upload');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [pendingPermanentDeleteDoc, setPendingPermanentDeleteDoc] = useState<Document | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    initializeMockData();
    refreshData();
  }, []);

  const refreshData = () => {
    const allDocs = documentStorage.getAll();
    const allUsers = userStorage.getAll();
    setDocuments(isSystemAdmin ? allDocs : allDocs.filter((d) => d.department === department));
    setUsers(isSystemAdmin ? allUsers : allUsers.filter((u) => u.department === department));
  };

  const chatHistory: SidebarItem[] = conversations.map((c) => ({
    id: c.id,
    label: c.title,
    icon: c.icon,
    hasMenu: true,
  }));

  const handleNewChat = () => {
    setMessages([]);
    setActiveConversationId(null);
    setActiveView('chat');
  };

  const handleChatMenuAction = (item: SidebarItem, action: string) => {
    switch (action) {
      case 'delete':
        setConversations((prev) => prev.filter((c) => c.id !== item.id));
        if (item.id === activeConversationId) handleNewChat();
        break;
      case 'rename': {
        const newTitle = window.prompt('Rename chat', item.label);
        if (newTitle && newTitle.trim()) {
          setConversations((prev) =>
            prev.map((c) => (c.id === item.id ? { ...c, title: newTitle.trim() } : c))
          );
        }
        break;
      }
      default:
        console.log(`Chat action "${action}" on:`, item.label);
    }
  };

  const handleSendMessage = (userMessage: string) => {
    setActiveView('chat');
    if (!activeConversationId) {
      const newId = String(Date.now());
      const title = userMessage.length > 40 ? `${userMessage.slice(0, 40).trim()}...` : userMessage;
      setConversations((prev) => [{ id: newId, title, icon: 'chat' }, ...prev]);
      setActiveConversationId(newId);
    }

    const userMsg: Message = {
      id: String(Date.now()),
      type: 'user',
      content: userMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const response = generateAIResponse(userMessage);
      const aiMsg: Message = {
        id: String(Date.now() + 1),
        type: 'ai',
        content: response.text,
        timestamp: new Date().toLocaleTimeString(),
        citations: response.citations,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const handleUserMenuAction = (action: string) => {
    if (action === 'documents' || action === 'user-management') {
      setActiveView(action);
      if (action === 'documents') setDocumentTab('upload');
    } else {
      console.log('User menu action:', action);
    }
  };

  const handleDocumentDelete = (docId: string) => {
    const doc = documentStorage.getById(docId);
    if (doc) {
      doc.status = 'deleted';
      documentStorage.save(doc);
      refreshData();
      showToast(`"${doc.name}" deleted`, 'success');
    }
  };

  const handleDocumentRestore = (docId: string) => {
    const doc = documentStorage.getById(docId);
    documentStorage.restore(docId);
    refreshData();
    if (doc) showToast(`"${doc.name}" restored`, 'success');
  };

  const handleUserDelete = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    userStorage.delete(userId);
    refreshData();
    showToast(user ? `${user.name} removed` : 'User removed', 'success');
  };

  const handleUserRoleChange = (userId: string, newRole: User['role']) => {
    const user = userStorage.getById(userId);
    if (user) {
      userStorage.save({ ...user, role: newRole });
      refreshData();
      showToast(`${user.name}'s role changed to ${ROLE_LABELS[newRole]}`, 'success');
    }
  };

  const handleUserCreate = (newUser: Omit<User, 'id' | 'createdAt'>) => {
    userStorage.save({
      ...newUser,
      id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
    });
    refreshData();
    showToast(`${newUser.name} added as ${ROLE_LABELS[newUser.role]}`, 'success');
  };

  const managementLinks = [
    { id: 'documents', label: 'Documents', icon: 'description' },
    { id: 'user-management', label: 'User Management', icon: 'group' },
  ];

  const activeDocuments = documents.filter((d) => d.status === 'active');
  const archivedDocuments = documents.filter((d) => d.status === 'archived');
  const deletedDocuments = documents.filter((d) => d.status === 'deleted');

  const backBarStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.md} ${spacing.lg}`,
    borderBottom: `1px solid ${colors['neutral-200']}`,
  };

  const backButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    background: 'none',
    border: 'none',
    color: colors['neutral-700'],
    cursor: 'pointer',
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.semibold,
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: borderRadius.sm,
  };

  const viewWrapperStyles: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const viewScrollStyles: React.CSSProperties = {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
  };

  // Admins only view Active Documents for their own department; System Admin
  // additionally sees Archived and Deleted (and can restore/permanently delete).
  const docTabs: { id: typeof documentTab; label: string; icon: string }[] = [
    { id: 'upload', label: 'Upload Document', icon: 'upload_file' },
    { id: 'active', label: 'Active Documents', icon: 'check_circle' },
    ...(isSystemAdmin
      ? [
          { id: 'archived' as const, label: 'Archived Documents', icon: 'archive' },
          { id: 'deleted' as const, label: 'Deleted Documents', icon: 'delete' },
        ]
      : []),
  ];

  const renderDocumentsView = () => (
    <div style={viewWrapperStyles}>
      <div style={backBarStyles}>
        <button style={backButtonStyles} onClick={() => setActiveView('chat')}>
          <MaterialIcon name="arrow_back" size={18} />
          Back to Chat
        </button>
        <div style={{ display: 'flex', gap: spacing.sm, marginLeft: spacing.lg }}>
          {docTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDocumentTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: `${spacing.xs} ${spacing.md}`,
                borderRadius: borderRadius.full,
                border: `1px solid ${documentTab === tab.id ? colors['neutral-900'] : colors['neutral-200']}`,
                backgroundColor: documentTab === tab.id ? colors['neutral-900'] : colors['neutral-white'],
                color: documentTab === tab.id ? colors['neutral-white'] : colors['neutral-700'],
                fontSize: typography.fontSize['body-sm'],
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <MaterialIcon name={tab.icon} size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div style={viewScrollStyles}>
        {documentTab === 'upload' && (
          <DocumentUpload
            departments={isSystemAdmin ? DEPARTMENTS : [department || '']}
            contentTypes={CONTENT_TYPES}
            sensitivities={SENSITIVITIES}
            lockedDepartment={isSystemAdmin ? undefined : department}
            onUploadSuccess={refreshData}
          />
        )}
        {documentTab === 'active' && (
          <DocumentList
            documents={activeDocuments}
            showSearch
            showDepartmentFilter={isSystemAdmin}
            onDocumentDelete={isSystemAdmin ? handleDocumentDelete : undefined}
            onDocumentDownload={(doc) => showToast(`Downloading "${doc.name}"...`, 'info')}
          />
        )}
        {documentTab === 'archived' && isSystemAdmin && (
          <DocumentList
            documents={archivedDocuments}
            showSearch
            showDepartmentFilter
            onDocumentDelete={handleDocumentDelete}
            onDocumentDownload={(doc) => showToast(`Downloading "${doc.name}"...`, 'info')}
          />
        )}
        {documentTab === 'deleted' && isSystemAdmin && (
          <div style={{ padding: spacing.lg }}>
            <div style={{ fontSize: typography.fontSize['h3'], fontWeight: 600, marginBottom: spacing.md }}>
              Deleted Documents
            </div>
            {deletedDocuments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: spacing.xl, color: colors['neutral-500'] }}>
                No deleted documents.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                  <thead style={{ backgroundColor: colors['neutral-100'], borderBottom: `2px solid ${colors['neutral-200']}` }}>
                    <tr>
                      <th style={{ padding: spacing.md, textAlign: 'left', fontWeight: 600 }}>File</th>
                      <th style={{ padding: spacing.md, textAlign: 'left', fontWeight: 600 }}>Department</th>
                      <th style={{ padding: spacing.md, textAlign: 'left', fontWeight: 600 }}>Actions</th>
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
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors['success-green'], marginRight: spacing.md }}
                          >
                            <MaterialIcon name="restore" size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                            Restore
                          </button>
                          <button
                            onClick={() => setPendingPermanentDeleteDoc(doc)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors['error-red'] }}
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
      </div>

      <ConfirmDialog
        isOpen={!!pendingPermanentDeleteDoc}
        title="Permanently Delete Document"
        message={`Permanently delete "${pendingPermanentDeleteDoc?.name}"? This cannot be undone.`}
        confirmLabel="Delete Permanently"
        onConfirm={() => {
          if (pendingPermanentDeleteDoc) {
            documentStorage.delete(pendingPermanentDeleteDoc.id);
            refreshData();
            showToast(`"${pendingPermanentDeleteDoc.name}" permanently deleted`, 'success');
          }
          setPendingPermanentDeleteDoc(null);
        }}
        onCancel={() => setPendingPermanentDeleteDoc(null)}
      />
    </div>
  );

  const renderUserManagementView = () => (
    <div style={viewWrapperStyles}>
      <div style={backBarStyles}>
        <button style={backButtonStyles} onClick={() => setActiveView('chat')}>
          <MaterialIcon name="arrow_back" size={18} />
          Back to Chat
        </button>
      </div>
      <div style={viewScrollStyles}>
        <UserManagementTable
          users={users}
          showSearch
          showDepartmentFilter={isSystemAdmin}
          deletableRoles={isSystemAdmin ? ['user', 'admin', 'system-admin'] : ['user', 'admin']}
          canEditRoles={isSystemAdmin}
          roleOptions={['user', 'admin', 'system-admin']}
          onRoleChange={isSystemAdmin ? handleUserRoleChange : undefined}
          onUserDelete={handleUserDelete}
          onAddUserClick={() => setShowAddUserModal(true)}
        />
      </div>
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onCreate={handleUserCreate}
        availableRoles={isSystemAdmin ? ['user', 'admin', 'system-admin'] : ['user', 'admin']}
        availableDepartments={isSystemAdmin ? DEPARTMENTS : [department || '']}
        lockedDepartment={isSystemAdmin ? undefined : department}
      />
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ChatLayout
        userRole={ROLE_LABELS[role]}
        userName={userName}
        userDepartment={isSystemAdmin ? 'All Departments' : department}
        messages={messages}
        onSendMessage={handleSendMessage}
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onChatMenuAction={handleChatMenuAction}
        managementLinks={managementLinks}
        onUserMenuAction={handleUserMenuAction}
      >
        {activeView === 'chat'
          ? undefined
          : activeView === 'documents'
          ? renderDocumentsView()
          : renderUserManagementView()}
      </ChatLayout>
    </div>
  );
};

RoleWorkspace.displayName = 'RoleWorkspace';
