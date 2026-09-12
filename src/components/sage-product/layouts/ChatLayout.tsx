import React, { useState } from 'react';
import { colors, spacing, typography } from '../../../styles/sage/tokens';
import { Header } from '../Header';
import { Sidebar, SidebarItem } from '../Sidebar';
import { Input } from '../Input';
import { Button } from '../Button';
import { ChatBubble } from '../ChatBubble';

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
      icon: '➕',
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
          onCollapse={setIsCollapsed}
          activeItemId={chatHistory[0]?.id}
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
                      isUser={msg.type === 'user'}
                      citations={msg.citations}
                      loading={msg.type === 'ai' && !msg.content}
                    />
                  ))
                )}
              </div>

              {/* Input Area */}
              <div style={inputAreaStyles}>
                <div style={inputGroupStyles}>
                  <Input
                    placeholder="Ask me anything..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    variant="primary"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                  >
                    Send
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
