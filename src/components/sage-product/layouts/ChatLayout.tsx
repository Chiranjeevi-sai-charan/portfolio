import React, { useState } from 'react';
import { colors, spacing, typography, componentSizes, borderRadius, shadows } from '../../../styles/sage/tokens';
import { Sidebar, SidebarItem } from '../Sidebar';
import { ChatBubble } from '../ChatBubble';
import { MaterialIcon } from '../MaterialIcon';

/**
 * ChatLayout Component
 *
 * Main layout for employee chatbot interface, styled after ChatGPT's
 * minimal black & white interface.
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

const SUGGESTIONS = [
  { icon: 'beach_access', label: 'Ask about the vacation policy' },
  { icon: 'local_hospital', label: 'Check health insurance coverage' },
  { icon: 'menu_book', label: 'Search the company handbook' },
];

/**
 * ChatLayout - Employee chatbot layout
 *
 * Components:
 * - Header: Brand, search, language
 * - Sidebar: Chat filter, chat history, pinned user footer
 * - Main: Empty-state greeting + pill input, or chat messages and input area
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

  const handleSendMessage = (text?: string) => {
    const value = (text ?? inputValue).trim();
    if (value) {
      onSendMessage?.(value);
      setInputValue('');
    }
  };

  const layoutStyles: React.CSSProperties = {
    display: 'flex',
    height: '100%',
    backgroundColor: colors['neutral-white'],
    flexDirection: 'column',
  };

  const headerStyles: React.CSSProperties = {
    height: '56px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${spacing.lg}`,
    borderBottom: `1px solid ${colors['neutral-200']}`,
    backgroundColor: colors['neutral-white'],
  };

  const brandStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h4'],
    fontWeight: typography.fontWeight.bold,
    color: colors['neutral-900'],
    letterSpacing: '0.5px',
  };

  const headerActionsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  };

  const langButtonStyles = (active: boolean): React.CSSProperties => ({
    padding: `4px ${spacing.sm}`,
    borderRadius: borderRadius.sm,
    border: 'none',
    fontSize: typography.fontSize['body-xs'],
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
    backgroundColor: active ? colors['neutral-900'] : colors['neutral-100'],
    color: active ? colors['neutral-white'] : colors['neutral-600'],
  });

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
    padding: `${spacing.lg} ${spacing.xl}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  };

  const emptyStateStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.xl,
  };

  const greetingStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h2'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
    textAlign: 'center',
  };

  const pillFormStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '680px',
  };

  const pillInputWrapperStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.sm} ${spacing.sm} ${spacing.sm} ${spacing.lg}`,
    border: `1px solid ${colors['neutral-300']}`,
    borderRadius: borderRadius.full,
    backgroundColor: colors['neutral-white'],
    boxShadow: shadows.sm,
  };

  const pillInputStyles: React.CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: typography.fontSize['body-md'],
    fontFamily: typography.fontFamily.primary,
    color: colors['neutral-900'],
    backgroundColor: 'transparent',
  };

  const roundIconButtonStyles: React.CSSProperties = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: colors['neutral-600'],
    transition: 'background-color 0.15s ease',
    flexShrink: 0,
  };

  const sendButtonStyles = (enabled: boolean): React.CSSProperties => ({
    ...roundIconButtonStyles,
    backgroundColor: enabled ? colors['accent-blue'] : colors['neutral-200'],
    color: colors['neutral-white'],
    cursor: enabled ? 'pointer' : 'not-allowed',
  });

  const suggestionsRowStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  };

  const suggestionPillStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.sm} ${spacing.lg}`,
    borderRadius: borderRadius.full,
    border: `1px solid ${colors['neutral-200']}`,
    backgroundColor: colors['neutral-white'],
    color: colors['neutral-700'],
    fontSize: typography.fontSize['body-sm'],
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  };

  const inputAreaStyles: React.CSSProperties = {
    padding: `${spacing.md} ${spacing.xl} ${spacing.lg}`,
    backgroundColor: colors['neutral-white'],
    display: 'flex',
    justifyContent: 'center',
  };

  const inputAreaInnerStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '680px',
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

  const renderPillInput = () => (
    <div style={pillInputWrapperStyles}>
      <input
        style={pillInputStyles}
        placeholder="Ask anything"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <button
        style={roundIconButtonStyles}
        onClick={() => console.log('Voice input clicked')}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors['neutral-100'];
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        title="Use voice input"
        aria-label="Voice input"
      >
        <MaterialIcon name="mic" size={20} />
      </button>
      <button
        style={sendButtonStyles(!!inputValue.trim())}
        onClick={() => handleSendMessage()}
        disabled={!inputValue.trim()}
        title="Send"
        aria-label="Send"
      >
        <MaterialIcon name="arrow_upward" size={18} />
      </button>
    </div>
  );

  return (
    <div style={layoutStyles} className={className}>
      {/* Header */}
      <div style={headerStyles}>
        <div style={brandStyles}>SAGE</div>
        <div style={headerActionsStyles}>
          <button style={langButtonStyles(true)}>EN</button>
          <button style={langButtonStyles(false)}>JA</button>
          <button
            style={{ ...roundIconButtonStyles, color: colors['neutral-700'] }}
            title="Notifications"
            aria-label="Notifications"
          >
            <MaterialIcon name="notifications" size={20} />
          </button>
        </div>
      </div>

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
          user={{ name: userName, role: userRole }}
          onUserMenuAction={(action) => console.log('User menu action:', action)}
        />

        {/* Main Chat Area */}
        <div style={mainStyles}>
          {children ? (
            children
          ) : messages.length === 0 ? (
            <div style={emptyStateStyles}>
              <div style={greetingStyles}>What's on your mind today?</div>
              <div style={pillFormStyles}>{renderPillInput()}</div>
              <div style={suggestionsRowStyles}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    style={suggestionPillStyles}
                    onClick={() => handleSendMessage(s.label)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors['neutral-50'];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors['neutral-white'];
                    }}
                  >
                    <MaterialIcon name={s.icon} size={18} color={colors['neutral-500']} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div style={messagesContainerStyles}>
                {messages.map((msg) => (
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
                ))}
              </div>

              {/* Input Area */}
              <div style={inputAreaStyles}>
                <div style={inputAreaInnerStyles}>{renderPillInput()}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

ChatLayout.displayName = 'ChatLayout';
