import React, { useMemo, useState } from 'react';
import { ChatLayout } from '../layouts/ChatLayout';
import { SidebarItem } from '../Sidebar';
import { DocumentList } from '../DocumentList';
import { MaterialIcon } from '../MaterialIcon';
import { generateAIResponse } from '../../../utils/mockAIResponses';
import { analyticsStorage, documentStorage } from '../../../utils/storage';
import { colors, spacing, typography, borderRadius } from '../../../styles/sage/tokens';

/**
 * EmployeeChatbot Page
 *
 * Employee-facing HR chatbot interface for asking HR questions.
 *
 * @component
 * @example
 * <EmployeeChatbot />
 */

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  citations?: string[];
  liked?: boolean;
  disliked?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  icon: string;
  createdAt: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;

const SEED_CONVERSATIONS: Conversation[] = [
  { id: 'chat-1', title: 'Vacation Policy Questions', icon: 'chat', createdAt: Date.now() - 1 * DAY_MS },
  { id: 'chat-2', title: 'Health Insurance Coverage', icon: 'chat', createdAt: Date.now() - 2 * DAY_MS },
  { id: 'chat-3', title: 'Performance Review Process', icon: 'chat', createdAt: Date.now() - 4 * DAY_MS },
  { id: 'chat-4', title: 'Work from Home Policy', icon: 'chat', createdAt: Date.now() - 5 * DAY_MS },
];

/** Groups a conversation into "Today" or "Previous 7 Days" based on its createdAt */
const conversationSection = (createdAt: number): string =>
  Date.now() - createdAt < DAY_MS ? 'Today' : 'Previous 7 Days';

/**
 * EmployeeChatbot - Main employee chat interface
 *
 * Features:
 * - AI-powered HR question answering
 * - Chat history that updates dynamically as new conversations start
 * - Message citations and source documents
 * - Real-time typing simulation
 */
const EMPLOYEE_DEPARTMENT = 'Human Resources (HR)';

export const EmployeeChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(SEED_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'ja'>('en');
  const [activeView, setActiveView] = useState<'chat' | 'documents'>('chat');

  const visibleDocuments = useMemo(
    () => documentStorage.getVisibleForEmployee(EMPLOYEE_DEPARTMENT),
    [activeView]
  );

  const managementLinks =
    language === 'ja'
      ? [{ id: 'documents', label: 'マイドキュメント', icon: 'description' }]
      : [{ id: 'documents', label: 'My Documents', icon: 'description' }];

  const handleUserMenuAction = (action: string) => {
    if (action === 'documents') {
      setActiveView('documents');
    } else {
      console.log('User menu action:', action);
    }
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
        if (item.id === activeConversationId) {
          handleNewChat();
        }
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
    // If this is the first message of a fresh conversation, add it to the sidebar history
    if (!activeConversationId) {
      const newId = String(Date.now());
      const title =
        userMessage.length > 40 ? `${userMessage.slice(0, 40).trim()}...` : userMessage;
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

    // Simulate AI response delay
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
        role: 'user',
        department: 'Human Resources (HR)',
        language,
      });
    }, 1000);
  };

  const containerStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
  };

  const backRowStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.md} ${spacing.lg} 0`,
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

  const renderDocumentsView = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
          Back to Chat
        </button>
      </div>
      <div style={{ padding: `${spacing.sm} ${spacing.lg} 0` }}>
        <h1 style={pageTitleStyles}>My Documents</h1>
        <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'], marginTop: spacing.xs }}>
          Policies and resources available to you, from Human Resources (HR) and General.
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <DocumentList
          documents={visibleDocuments}
          showSearch
          onDocumentDownload={(doc) => console.log(`Downloading "${doc.name}"...`)}
        />
      </div>
    </div>
  );

  return (
    <div style={containerStyles}>
      <ChatLayout
        userRole="Employee"
        userName="Aditya"
        userDepartment="Human Resources (HR)"
        userInitials="A"
        messages={messages}
        onSendMessage={handleSendMessage}
        chatHistory={chatHistory}
        activeConversationId={activeView === 'chat' ? activeConversationId : null}
        onNewChat={handleNewChat}
        onChatMenuAction={handleChatMenuAction}
        managementLinks={managementLinks}
        onUserMenuAction={handleUserMenuAction}
        language={language}
        onLanguageChange={setLanguage}
      >
        {activeView === 'documents' ? renderDocumentsView() : undefined}
      </ChatLayout>
    </div>
  );
};

EmployeeChatbot.displayName = 'EmployeeChatbot';
