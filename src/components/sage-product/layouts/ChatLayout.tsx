import React, { useState } from 'react';
import { colors, spacing, typography, componentSizes } from '../../../styles/sage/tokens';
import { Header } from '../Header';
import { Sidebar, SidebarItem } from '../Sidebar';
import { Input } from '../Input';
import { Button } from '../Button';
import { ChatBubble } from '../ChatBubble';
import { MaterialIcon } from '../MaterialIcon';

/**
 * ChatLayout Component
 *
 * Main layout for employee chatbot interface.
 *
 * @component
 * @example
 * <ChatLayout
 *   userRole="Employee"
 *   userName="John Doe"
 *   userInitials="JD"
 * >
 *   Chat content
 * </ChatLayout>
 */

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp?: string;
  citations?: string[];
}

interface ChatLayoutProps {
  /** User's role */
  userRole?: string;

  /** User's name */
  userName?: string;

  /** User initials (for avatar) */
  userInitials?: string;

  /** Chat messages */
  messages?: Message[];

  /** Message input handler */
  onSendMessage?: (message: string) => void;

  /** Chat history items for sidebar */
  chatHistory?: SidebarItem[];

  /** Sidebar collapsed state */
  sidebarCollapsed?: boolean;

  /** Search handler */
  onSearch?: (query: string) => void;

  /** Children (additional content) */
  children?: React.ReactNode;

  /** CSS class name */
  className?: string;
}

/**
 * ChatLayout - Employee chatbot layout
 *
 * Components:
 * - Header: Logo, search, language, notifications, profile
 * - Sidebar: Chat history, new chat button, collapse toggle
 * - Main: Chat messages and input area
 *
 * Features:
 * - Responsive design
 * - Persistent chat history
 * - User profile display
 * - Notification badge
 * - Language toggle
 */
export const ChatLayout: React.FC<ChatLayoutProps> = ({
  userRole = 'Employee',
  userName = 'User',
  userInitials = 'U',
  messages = [],
  onSendMessage,
  chatHistory = [],
  sidebarCollapsed = false,
  onSearch,
  children,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(sidebarCollapsed);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(['General']);

  const departments = ['General', 'Human Resources (HR)', 'Quality Assurance (QA)'];

  const toggleDepartment = (dept: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage?.(inputValue);
      setInputValue('');
    }
  };

  const layoutStyles: React.CSSProperties = {
    display: 'flex',
    height: '100vh',
    backgroundColor: colors['neutral-50'],
    flexDirection: 'column',
  };

  const contentWrapperStyles: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  };

  const mainStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors['neutral-white'],
    minWidth: 0,
  };

  const messagesContainerStyles: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  };

  const inputAreaStyles: React.CSSProperties = {
    borderTop: `1px solid ${colors['neutral-200']}`,
    padding: spacing.lg,
    backgroundColor: colors['neutral-white'],
    display: 'flex',
    gap: spacing.md,
  };

  const inputGroupStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing.md,
    flex: 1,
  };

  const defaultSidebarItems: SidebarItem[] = [
    {
      id: 'new-chat',
      label: 'New Chat',
      icon: 'add',
      onClick: () => console.log('New chat'),
    },
    ...chatHistory,
  ];

  return (
    <div style={layoutStyles} className={className}>
      {/* Header */}
      <Header />

      {/* Content Area */}
      <div style={contentWrapperStyles}>
        {/* Sidebar */}
        <Sidebar
          items={defaultSidebarItems}
          collapsed={isCollapsed}
          onCollapseToggle={() => setIsCollapsed(!isCollapsed)}
          activeItem={chatHistory[0]?.label}
          onItemClick={(item) => {
            console.log('Chat selected:', item);
          }}
          departmentFilter={{
            departments,
            selectedDepartments,
            onDepartmentChange: toggleDepartment,
          }}
        />

        {/* Main Chat Area */}
        <div style={mainStyles}>
          {children ? (
            children
          ) : (
            <>
              {/* Messages */}
              <div style={messagesContainerStyles}>
                {messages.length === 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      color: colors['neutral-400'],
                      fontSize: typography.fontSize['body-md'],
                    }}
                  >
                    Start a conversation
                  </div>
                ) : (
                  messages.map((msg) => (
                    <ChatBubble
                      key={msg.id}
                      message={msg.content}
                      type={msg.type}
                      citations={msg.citations}
                      loading={msg.type === 'ai' && !msg.content}
                      timestamp={msg.timestamp}
                      liked={(msg as any).liked}
                      disliked={(msg as any).disliked}
                    />
                  ))
                )}
              </div>

              {/* Input Area */}
              <div style={inputAreaStyles}>
                <div style={inputGroupStyles}>
                  <Input
                    placeholder="How can I help you today?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  {/* Voice Input Button */}
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      border: `1px solid ${colors['neutral-200']}`,
                      backgroundColor: colors['neutral-white'],
                      cursor: 'pointer',
                      color: colors['neutral-600'],
                      fontSize: '20px',
                      transition: 'all 0.2s ease',
                    }}
                    onClick={() => {
                      console.log('Voice input clicked');
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors['neutral-50'];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors['neutral-white'];
                    }}
                    title="Use voice input"
                    aria-label="Voice input"
                  >
                    <MaterialIcon name="mic" size={20} />
                  </button>
                  {/* Send Button */}
                  <Button
                    variant="primary"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                  >
                    <MaterialIcon name="send" size={18} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

ChatLayout.displayName = 'ChatLayout';
