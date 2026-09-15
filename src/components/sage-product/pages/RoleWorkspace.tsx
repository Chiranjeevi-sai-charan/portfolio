import React, { useState, useEffect } from 'react';
import { colors, spacing, typography, borderRadius, interactionTints } from '../../../styles/sage/tokens';
import { ChatLayout } from '../layouts/ChatLayout';
import { SidebarItem } from '../Sidebar';
import { DocumentUpload } from '../DocumentUpload';
import { DocumentList } from '../DocumentList';
import { UserManagementTable } from '../UserManagementTable';
import { AddUserModal } from '../AddUserModal';
import { ConfirmDialog } from '../ConfirmDialog';
import { AnalyticsDashboard } from '../AnalyticsDashboard';
import { MaterialIcon } from '../MaterialIcon';
import { useToast } from '../ToastProvider';
import {
  Document,
  documentStorage,
  User,
  userStorage,
  initializeMockData,
  analyticsStorage,
} from '../../../utils/storage';
import { DEPARTMENTS, CONTENT_TYPES, SENSITIVITIES, ROLE_LABELS } from '../../../utils/sageConstants';
import { generateAIResponse } from '../../../utils/mockAIResponses';
import { t, getRoleLabel } from '../../../utils/sageStrings';

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
  createdAt: number;
}

type ActiveView = 'chat' | 'documents' | 'user-management' | 'analytics';

interface RoleWorkspaceProps {
  role: 'admin' | 'system-admin';
  userName: string;
  /** Recorded as the uploader on documents this user uploads */
  userEmail?: string;
  /** Required for admin (their own department); ignored for system-admin, who sees every department */
  department?: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

const SEED_CONVERSATIONS: Conversation[] = [
  { id: 'chat-1', title: 'Vacation Policy Questions', icon: 'chat', createdAt: Date.now() - 2 * DAY_MS },
  { id: 'chat-2', title: 'Health Insurance Coverage', icon: 'chat', createdAt: Date.now() - 3 * DAY_MS },
];

/** Groups a conversation into "Today" or "Previous 7 Days" based on its createdAt */
const conversationSection = (createdAt: number): string =>
  Date.now() - createdAt < DAY_MS ? 'Today' : 'Previous 7 Days';

export const RoleWorkspace: React.FC<RoleWorkspaceProps> = ({ role, userName, userEmail, department }) => {
  const isSystemAdmin = role === 'system-admin';

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(SEED_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'ja'>('en');
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
    setUsers(isSystemAdmin ? allUsers : allUsers.filter((u) => u.departments.includes(department || '')));
  };

  const chatHistory: SidebarItem[] = conversations.map((c) => ({
    id: c.id,
    label: c.title,
    icon: c.icon,
    hasMenu: true,
    section: conversationSection(c.createdAt),
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
      setConversations((prev) => [{ id: newId, title, icon: 'chat', createdAt: Date.now() }, ...prev]);
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
      const response = generateAIResponse(userMessage, language);
      const aiMsg: Message = {
        id: String(Date.now() + 1),
        type: 'ai',
        content: response.text,
        timestamp: new Date().toLocaleTimeString(),
        citations: response.citations,
      };
      setMessages((prev) => [...prev, aiMsg]);

      // Privacy-safe analytics: log the matched topic and cited documents,
      // never the raw question text.
      analyticsStorage.log({
        topic: response.topic,
        citations: response.citations,
        role,
        department: isSystemAdmin ? 'All Departments' : department || 'General',
        language,
      });
    }, 1000);
  };

  const handleUserMenuAction = (action: string) => {
    if (action === 'documents' || action === 'user-management' || action === 'analytics') {
      setActiveView(action as ActiveView);
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

  const managementLinks =
    language === 'ja'
      ? [
          { id: 'documents', label: 'ドキュメント', icon: 'description' },
          { id: 'user-management', label: 'ユーザー管理', icon: 'group' },
          ...(isSystemAdmin ? [{ id: 'analytics', label: '分析', icon: 'monitoring' }] : []),
        ]
      : [
          { id: 'documents', label: 'Documents', icon: 'description' },
          { id: 'user-management', label: 'User Management', icon: 'group' },
          ...(isSystemAdmin ? [{ id: 'analytics', label: 'Analytics', icon: 'monitoring' }] : []),
        ];

  const activeDocuments = documents.filter((d) => d.status === 'active');
  const archivedDocuments = documents.filter((d) => d.status === 'archived');
  const deletedDocuments = documents.filter((d) => d.status === 'deleted');

  const backRowStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.md} ${spacing.lg} 0`,
  };

  const titleRowStyles: React.CSSProperties = {
    padding: `${spacing.sm} ${spacing.lg} ${spacing.md}`,
  };

  const tabBarStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.sm,
    padding: `0 ${spacing.lg} ${spacing.lg}`,
  };

  const headerDividerStyles: React.CSSProperties = {
    borderBottom: `1px solid ${colors['neutral-200']}`,
    margin: `0 ${spacing.lg} ${spacing.sm}`,
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
    transition: 'background-color 0.15s ease-in-out',
  };

  const pageTitleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h1'],
    fontWeight: 700,
    color: colors['neutral-900'],
    margin: 0,
  };

  const renderPageHeader = (title: string) => (
    <>
      <div style={backRowStyles}>
        <button
          style={backButtonStyles}
          onClick={() => setActiveView('chat')}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
        >
          <MaterialIcon name="arrow_back" size={16} />
          {t(language, 'backToChat')}
        </button>
      </div>
      <div style={titleRowStyles}>
        <h1 style={pageTitleStyles}>{title}</h1>
      </div>
    </>
  );

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

  // Both Admins and System Admin can view Active, Archived, and Deleted
  // documents (scoped to their own department for Admins).
  const docTabs: { id: typeof documentTab; label: string; icon: string }[] = [
    { id: 'upload', label: t(language, 'uploadDocumentTab'), icon: 'upload_file' },
    { id: 'active', label: t(language, 'activeDocumentsTab'), icon: 'check_circle' },
    { id: 'archived', label: t(language, 'archivedDocumentsTab'), icon: 'archive' },
    { id: 'deleted', label: t(language, 'deletedDocumentsTab'), icon: 'delete' },
  ];

  const renderDocumentsView = () => (
    <div style={viewWrapperStyles}>
      {renderPageHeader(t(language, 'documentsTitle'))}
      <div style={tabBarStyles}>
        {docTabs.map((tab) => {
          const active = documentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setDocumentTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: `${spacing.sm} ${spacing.lg}`,
                borderRadius: borderRadius.full,
                border: `1px solid ${active ? colors['accent-blue'] : colors['neutral-300']}`,
                backgroundColor: active ? interactionTints.accentSubtle : colors['neutral-white'],
                color: active ? colors['accent-blue'] : colors['neutral-700'],
                fontSize: typography.fontSize['body-sm'],
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s ease-in-out, border-color 0.15s ease-in-out, background-color 0.15s ease-in-out',
              }}
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = colors['neutral-400'];
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = colors['neutral-300'];
              }}
            >
              <MaterialIcon name={tab.icon} size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div style={viewScrollStyles}>
        {documentTab === 'upload' && (
          <DocumentUpload
            departments={isSystemAdmin ? DEPARTMENTS : [department || '']}
            contentTypes={CONTENT_TYPES}
            sensitivities={SENSITIVITIES}
            lockedDepartment={isSystemAdmin ? undefined : department}
            uploadedBy={userEmail || userName}
            onUploadSuccess={refreshData}
            language={language}
          />
        )}
        {documentTab === 'active' && (
          <DocumentList
            documents={activeDocuments}
            showSearch
            showDepartmentFilter={isSystemAdmin}
            onDocumentDelete={handleDocumentDelete}
            onDocumentDownload={(doc) => showToast(`Downloading "${doc.name}"...`, 'info')}
            language={language}
          />
        )}
        {documentTab === 'archived' && (
          <DocumentList
            documents={archivedDocuments}
            showSearch
            showDepartmentFilter={isSystemAdmin}
            onDocumentDelete={handleDocumentDelete}
            onDocumentDownload={(doc) => showToast(`Downloading "${doc.name}"...`, 'info')}
            language={language}
          />
        )}
        {documentTab === 'deleted' && (
          <div style={{ padding: spacing.lg }}>
            <div style={{ fontSize: typography.fontSize['h3'], fontWeight: 600, marginBottom: spacing.md }}>
              {t(language, 'deletedDocumentsHeading')}
            </div>
            {deletedDocuments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: `${spacing['3xl']} ${spacing.xl}`, color: colors['neutral-500'], display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing.sm }}>
                <div style={{ width: '56px', height: '56px', borderRadius: borderRadius.full, backgroundColor: interactionTints.accentSubtle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialIcon name="delete_sweep" size={26} color={colors['accent-blue']} />
                </div>
                {t(language, 'noDeletedDocuments')}
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
                  <thead style={{ backgroundColor: colors['neutral-100'], borderBottom: `2px solid ${colors['neutral-200']}` }}>
                    <tr>
                      <th style={{ padding: spacing.md, textAlign: 'left', fontWeight: 600 }}>{t(language, 'documentColumn')}</th>
                      <th style={{ padding: spacing.md, textAlign: 'left', fontWeight: 600 }}>{t(language, 'departmentColumn')}</th>
                      <th style={{ padding: spacing.md, textAlign: 'left', fontWeight: 600 }}>{t(language, 'actionsColumn')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deletedDocuments.map((doc) => (
                      <tr key={doc.id} style={{ borderBottom: `1px solid ${colors['neutral-200']}` }}>
                        <td style={{ padding: spacing.md }}>
                          <MaterialIcon name="description" size={16} style={{ verticalAlign: 'middle', marginRight: spacing.sm }} />
                          {doc.name}
                        </td>
                        <td style={{ padding: spacing.md }}>{doc.department}</td>
                        <td style={{ padding: spacing.md }}>
                          <button
                            onClick={() => handleDocumentRestore(doc.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors['success-green'], marginRight: spacing.md }}
                          >
                            <MaterialIcon name="restore" size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                            {t(language, 'restore')}
                          </button>
                          <button
                            onClick={() => setPendingPermanentDeleteDoc(doc)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors['error-red'] }}
                          >
                            <MaterialIcon name="delete_forever" size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                            {t(language, 'delete')}
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
        title={t(language, 'permanentlyDeleteTitle')}
        message={t(language, 'permanentlyDeleteMsg')(pendingPermanentDeleteDoc?.name)}
        confirmLabel={t(language, 'deletePermanently')}
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
      {renderPageHeader(t(language, 'userManagementTitle'))}
      <div style={headerDividerStyles} />
      <div style={viewScrollStyles}>
        <UserManagementTable
          users={users}
          showSearch
          showDepartmentFilter={isSystemAdmin}
          deletableRoles={isSystemAdmin ? ['user', 'admin', 'system-admin'] : ['user', 'admin']}
          canEditRoles
          roleOptions={isSystemAdmin ? ['user', 'admin', 'system-admin'] : ['user', 'admin']}
          onRoleChange={handleUserRoleChange}
          onUserDelete={handleUserDelete}
          onAddUserClick={() => setShowAddUserModal(true)}
          language={language}
        />
      </div>
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onCreate={handleUserCreate}
        availableRoles={isSystemAdmin ? ['user', 'admin', 'system-admin'] : ['user', 'admin']}
        availableDepartments={isSystemAdmin ? DEPARTMENTS : [department || '']}
        lockedDepartment={isSystemAdmin ? undefined : department}
        language={language}
      />
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ChatLayout
        userRole={getRoleLabel(role, language)}
        userName={userName}
        userDepartment={isSystemAdmin ? 'All Departments' : department}
        messages={messages}
        onSendMessage={handleSendMessage}
        chatHistory={chatHistory}
        activeConversationId={activeView === 'chat' ? activeConversationId : activeView}
        onNewChat={handleNewChat}
        onChatMenuAction={handleChatMenuAction}
        managementLinks={managementLinks}
        onUserMenuAction={handleUserMenuAction}
        language={language}
        onLanguageChange={setLanguage}
      >
        {activeView === 'chat'
          ? undefined
          : activeView === 'documents'
          ? renderDocumentsView()
          : activeView === 'user-management'
          ? renderUserManagementView()
          : (
              <AnalyticsDashboard
                onBackToChat={() => setActiveView('chat')}
                language={language}
              />
            )}
      </ChatLayout>
    </div>
  );
};

RoleWorkspace.displayName = 'RoleWorkspace';
