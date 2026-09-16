import React, { useState } from 'react';
import { colors, spacing, typography, borderRadius, interactionTints, shadows } from '../../../styles/sage/tokens';
import { Sidebar, SidebarItem } from '../Sidebar';
import { ChatBubble } from '../ChatBubble';
import { MaterialIcon } from '../MaterialIcon';
import { DocumentPanel } from '../DocumentPanel';
import { SearchChatsModal } from '../SearchChatsModal';

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

  /** User's department, shown under their role in the sidebar footer */
  userDepartment?: string;

  /** User initials (for avatar) */
  userInitials?: string;

  /** Chat messages */
  messages?: Message[];

  /** Message input handler */
  onSendMessage?: (message: string) => void;

  /** Chat history items for sidebar */
  chatHistory?: SidebarItem[];

  /** id of the conversation currently open (null/undefined when on the "New Chat" empty state) — used to highlight the right item in the sidebar */
  activeConversationId?: string | null;

  /** Sidebar collapsed state */
  sidebarCollapsed?: boolean;

  /** Search handler */
  onSearch?: (query: string) => void;

  /** Children (additional content) */
  children?: React.ReactNode;

  /** Called when the user clicks "New Chat" in the sidebar */
  onNewChat?: () => void;

  /** Called when a chat's context menu action is used ('share' | 'rename' | 'pin' | 'archive' | 'delete') */
  onChatMenuAction?: (item: SidebarItem, action: string) => void;

  /** Extra links shown at the top of the user dropdown (e.g. Documents, User Management) */
  managementLinks?: { id: string; label: string; icon: string }[];

  /** Called when a dropdown menu item (including managementLinks) is clicked */
  onUserMenuAction?: (action: string) => void;

  /** CSS class name */
  className?: string;

  /** Current interface language */
  language?: 'en' | 'ja';

  /** Called when the user switches the language toggle */
  onLanguageChange?: (language: 'en' | 'ja') => void;
}

const SUGGESTIONS: Record<'en' | 'ja', { icon: string; label: string }[]> = {
  en: [
    { icon: 'event_available', label: 'How many vacation days do I have left?' },
    { icon: 'health_and_safety', label: 'What does our health insurance cover?' },
    { icon: 'home_work', label: 'What is the work-from-home policy?' },
    { icon: 'menu_book', label: 'Where can I find the employee handbook?' },
  ],
  ja: [
    { icon: 'event_available', label: '残りの有給休暇は何日ありますか？' },
    { icon: 'health_and_safety', label: '健康保険の保障内容を教えてください' },
    { icon: 'home_work', label: '在宅勤務の規定を教えてください' },
    { icon: 'menu_book', label: '従業員ハンドブックはどこで見られますか？' },
  ],
};

const STRINGS = {
  en: {
    newChat: 'New Chat',
    chats: 'Chats',
    greeting: 'Hey, what can I help with?',
    welcomeSubline: "I'm Sage, your HR assistant. Ask me anything, from vacation days to benefits, and I'll point you to the exact policy.",
    placeholder: 'Ask anything',
    voiceInput: 'Use voice input',
    send: 'Send',
  },
  ja: {
    newChat: '新しいチャット',
    chats: 'チャット',
    greeting: 'こんにちは、何かお手伝いできますか？',
    welcomeSubline: 'HRアシスタントのSageです。休暇のことでも福利厚生のことでも、何でも聞いてください。該当する規定をすぐにお調べします。',
    placeholder: '何でも聞いてください',
    voiceInput: '音声入力を使う',
    send: '送信',
  },
};

/**
 * ChatLayout - Employee chatbot layout
 *
 * Components:
 * - Sidebar: Brand, search, chats/saved, pinned user footer (with language toggle)
 * - Main: Empty-state greeting + pill input, or chat messages and input area
 */
export const ChatLayout: React.FC<ChatLayoutProps> = ({
  userRole = 'Employee',
  userName = 'User',
  userDepartment,
  userInitials = 'U',
  messages = [],
  onSendMessage,
  chatHistory = [],
  activeConversationId,
  sidebarCollapsed = false,
  onSearch,
  children,
  onNewChat,
  onChatMenuAction,
  managementLinks,
  onUserMenuAction,
  className = '',
  language = 'en',
  onLanguageChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(sidebarCollapsed);
  const [selectedCitation, setSelectedCitation] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const t = STRINGS[language];

  const handleChatSelect = (item: SidebarItem) => {
    console.log('Chat selected:', item);
  };

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
    backgroundImage: `
      radial-gradient(ellipse 900px 600px at 12% 8%, rgba(26, 117, 219, 0.07), transparent 60%),
      radial-gradient(ellipse 800px 700px at 88% 15%, rgba(124, 107, 255, 0.06), transparent 60%),
      radial-gradient(ellipse 900px 800px at 50% 100%, rgba(26, 117, 219, 0.05), transparent 65%)
    `,
    backgroundRepeat: 'no-repeat',
    flexDirection: 'column',
    minHeight: 0,
  };

  const contentWrapperStyles: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    minHeight: 0,
  };

  const mainStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    minWidth: 0,
    minHeight: 0,
    position: 'relative',
    overflow: 'hidden',
  };

  const READING_WIDTH = '760px';

  const messagesScrollStyles: React.CSSProperties = {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
  };

  const messagesContainerStyles: React.CSSProperties = {
    maxWidth: READING_WIDTH,
    margin: '0 auto',
    padding: `${spacing.lg} ${spacing.xl}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  };

  const emptyStateStyles: React.CSSProperties = {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  };

  const greetingBlockStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xl,
  };

  const greetingStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h1'],
    fontWeight: typography.fontWeight.bold,
    color: colors['neutral-900'],
    textAlign: 'center',
  };

  const pillFormStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: READING_WIDTH,
    marginBottom: spacing.xl,
  };

  const pillInputWrapperStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.md} ${spacing.sm} ${spacing.md} ${spacing.lg}`,
    border: `1px solid ${colors['neutral-200']}`,
    borderRadius: borderRadius.xl,
    backgroundColor: colors['neutral-white'],
    boxShadow: shadows.glowInput,
    transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
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
    borderRadius: borderRadius.xl,
    backgroundColor: enabled ? colors['accent-blue'] : colors['neutral-200'],
    color: colors['neutral-white'],
    cursor: enabled ? 'pointer' : 'not-allowed',
  });

  const suggestionsListStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: READING_WIDTH,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing.md,
  };

  const suggestionCardStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.lg} ${spacing.lg}`,
    minHeight: '64px',
    border: `1px solid ${interactionTints.accentSubtle}`,
    background: 'rgba(255, 255, 255, 0.35)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    color: colors['neutral-700'],
    fontSize: typography.fontSize['body-md'],
    fontWeight: 500,
    cursor: 'pointer',
    borderRadius: borderRadius.lg,
    transition: 'background-color 0.15s ease, border-color 0.15s ease',
    textAlign: 'left',
    width: '100%',
  };

  const welcomeSublineStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-md'],
    color: colors['neutral-500'],
    textAlign: 'center',
    maxWidth: '480px',
  };

  const inputAreaStyles: React.CSSProperties = {
    padding: `${spacing.md} ${spacing.xl} ${spacing.lg}`,
    backgroundColor: colors['neutral-white'],
    display: 'flex',
    justifyContent: 'center',
  };

  const inputAreaInnerStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: READING_WIDTH,
  };

  const defaultSidebarItems: SidebarItem[] = [
    {
      id: 'new-chat',
      label: t.newChat,
      icon: 'add',
    },
    {
      id: 'chats',
      label: t.chats,
      icon: 'chat',
      children: chatHistory,
    },
    ...(managementLinks || []).map((link) => ({
      id: link.id,
      label: link.label,
      icon: link.icon,
    })),
  ];

  const renderPillInput = () => (
    <div style={pillInputWrapperStyles}>
      <input
        style={pillInputStyles}
        placeholder={t.placeholder}
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
        title={t.voiceInput}
        aria-label={t.voiceInput}
      >
        <MaterialIcon name="mic" size={20} />
      </button>
      <button
        style={sendButtonStyles(!!inputValue.trim())}
        onClick={() => handleSendMessage()}
        disabled={!inputValue.trim()}
        title={t.send}
        aria-label={t.send}
      >
        <MaterialIcon name="send" size={18} />
      </button>
    </div>
  );

  return (
    <div style={layoutStyles} className={className}>
      {/* Content Area */}
      <div style={contentWrapperStyles}>
        {/* Sidebar */}
        <Sidebar
          items={defaultSidebarItems}
          collapsed={isCollapsed}
          onCollapseToggle={() => setIsCollapsed(!isCollapsed)}
          onLogoClick={onNewChat}
          onSearchClick={() => setShowSearchModal(true)}
          activeItemId={activeConversationId ?? undefined}
          onItemClick={(item) => {
            if (item.id === 'new-chat') {
              onNewChat?.();
            } else if (managementLinks?.some((link) => link.id === item.id)) {
              onUserMenuAction?.(item.id!);
            } else {
              handleChatSelect(item);
            }
          }}
          user={{ name: userName, role: userRole, department: userDepartment }}
          onUserMenuAction={onUserMenuAction ?? ((action) => console.log('User menu action:', action))}
          onItemMenuAction={onChatMenuAction}
          language={language}
          onLanguageChange={onLanguageChange}
        />

        {/* Main Chat Area */}
        <div style={mainStyles}>
          {children ? (
            children
          ) : messages.length === 0 ? (
            <div style={emptyStateStyles}>
              <div style={greetingBlockStyles}>
                <div style={greetingStyles}>{t.greeting}</div>
                <div style={welcomeSublineStyles}>{t.welcomeSubline}</div>
              </div>
              <div style={pillFormStyles}>{renderPillInput()}</div>
              <div style={suggestionsListStyles}>
                {SUGGESTIONS[language].map((s) => (
                  <button
                    key={s.label}
                    style={suggestionCardStyles}
                    onClick={() => handleSendMessage(s.label)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(26, 117, 219, 0.08)';
                      e.currentTarget.style.borderColor = colors['accent-blue'];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';
                      e.currentTarget.style.borderColor = interactionTints.accentSubtle;
                    }}
                  >
                    <MaterialIcon name={s.icon} size={20} color={colors['accent-blue']} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div style={messagesScrollStyles}>
                <div style={messagesContainerStyles}>
                {messages.map((msg) => (
                  <ChatBubble
                    key={msg.id}
                    message={msg.content}
                    type={msg.type}
                    citations={msg.citations}
                    language={language}
                    loading={msg.type === 'ai' && !msg.content}
                    timestamp={msg.timestamp}
                    liked={(msg as any).liked}
                    disliked={(msg as any).disliked}
                    onShare={() => console.log('Share message:', msg.id)}
                    onRegenerate={() => console.log('Regenerate message:', msg.id)}
                    onCitationClick={(citation) => setSelectedCitation(citation)}
                  />
                ))}
                </div>
              </div>

              {/* Input Area */}
              <div style={inputAreaStyles}>
                <div style={inputAreaInnerStyles}>{renderPillInput()}</div>
              </div>
            </>
          )}

          <DocumentPanel citation={selectedCitation} onClose={() => setSelectedCitation(null)} language={language} />
        </div>
      </div>

      <SearchChatsModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        chats={chatHistory}
        onSelectChat={handleChatSelect}
        onNewChat={onNewChat}
        language={language}
      />
    </div>
  );
};

ChatLayout.displayName = 'ChatLayout';
