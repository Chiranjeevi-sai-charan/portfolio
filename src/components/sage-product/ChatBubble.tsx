import React from 'react';
import { colors, spacing, borderRadius, shadows } from '../../styles/sage/tokens';

/**
 * ChatBubble Component
 *
 * Displays chat messages in a conversational interface.
 * Supports two message types: user messages and AI responses.
 * AI responses can include source citations linking to HR policy documents.
 *
 * @component
 * @example
 * // User message
 * <ChatBubble type="user" message="What is the leave policy?" timestamp="2024-09-13 10:30" />
 *
 * // AI response with citation
 * <ChatBubble
 *   type="ai"
 *   message="The leave policy allows 20 days of paid leave per year."
 *   citation={{ title: "Leave Policy Document", link: "#" }}
 *   timestamp="2024-09-13 10:31"
 * />
 *
 * // Loading state
 * <ChatBubble type="ai" loading={true} />
 */

interface Citation {
  /** Title of the source HR policy document */
  title: string;
  /** Link to the policy document */
  link: string;
}

interface ChatBubbleProps {
  /** Type of message: user (right-aligned) or ai (left-aligned) */
  type: 'user' | 'ai';

  /** Message content (plain text or markdown) */
  message?: string;

  /** Optional source citation for AI responses */
  citation?: Citation;

  /** Timestamp of the message */
  timestamp?: string;

  /** Whether AI is generating response (loading state) */
  loading?: boolean;

  /** User avatar (for user messages) or AI icon (for AI messages) */
  avatar?: React.ReactNode;
}

/**
 * ChatBubble - Message container for chat interface
 *
 * Types:
 * - user: Right-aligned, sage-green-50 background
 * - ai: Left-aligned, neutral-100 background
 *
 * Features:
 * - User messages: Right-aligned with user initials/avatar
 * - AI messages: Left-aligned with source citation
 * - Citation: Clickable link to HR policy document
 * - Loading: Animated dots while AI generates response
 * - Timestamp: When message was sent/received
 *
 * States:
 * - default: Message rendered
 * - loading: Animated dots, no message content
 * - with-citation: AI response with linked source document
 */
export const ChatBubble: React.FC<ChatBubbleProps> = ({
  type,
  message,
  citation,
  timestamp,
  loading = false,
  avatar,
}) => {
  const isUser = type === 'user';

  const bubbleContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing.md,
    marginBottom: spacing.lg,
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    alignItems: 'flex-end',
  };

  const bubbleStyles: React.CSSProperties = {
    maxWidth: '70%',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: isUser ? colors['sage-green-50'] : colors['neutral-100'],
    color: isUser ? colors['neutral-900'] : colors['neutral-900'],
    boxShadow: shadows.sm,
    wordWrap: 'break-word',
  };

  const messageStyles: React.CSSProperties = {
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 8px 0',
    color: colors['neutral-900'],
  };

  const citationStyles: React.CSSProperties = {
    fontSize: '12px',
    color: colors['accent-blue'],
    textDecoration: 'none',
    cursor: 'pointer',
    marginTop: spacing.sm,
    display: 'inline-block',
    borderTop: `1px solid ${colors['neutral-200']}`,
    paddingTop: spacing.sm,
  };

  const timestampStyles: React.CSSProperties = {
    fontSize: '11px',
    color: colors['neutral-500'],
    marginTop: spacing.sm,
    textAlign: isUser ? 'right' : 'left',
  };

  const avatarContainerStyles: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: borderRadius.full,
    backgroundColor: isUser ? colors['sage-green-500'] : colors['neutral-200'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isUser ? colors['neutral-white'] : colors['neutral-900'],
    fontSize: '12px',
    fontWeight: 600,
    flexShrink: 0,
    order: isUser ? 1 : -1,
  };

  const loadingDotsStyles: React.CSSProperties = {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    padding: '8px 0',
  };

  const dotStyles: React.CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: borderRadius.full,
    backgroundColor: colors['neutral-500'],
    animation: 'pulse 1.4s infinite',
  };

  return (
    <div style={bubbleContainerStyles}>
      <div style={avatarContainerStyles}>
        {avatar || (isUser ? 'Y' : '🤖')}
      </div>

      <div style={bubbleStyles}>
        {loading ? (
          <div style={loadingDotsStyles}>
            <span style={{ ...dotStyles, animationDelay: '0s' }} />
            <span style={{ ...dotStyles, animationDelay: '0.2s' }} />
            <span style={{ ...dotStyles, animationDelay: '0.4s' }} />
          </div>
        ) : (
          <>
            {message && <p style={messageStyles}>{message}</p>}

            {citation && !isUser && (
              <a
                href={citation.link}
                style={citationStyles}
                title="View source document"
              >
                📎 {citation.title}
              </a>
            )}

            {timestamp && <div style={timestampStyles}>{timestamp}</div>}
          </>
        )}
      </div>
    </div>
  );
};

ChatBubble.displayName = 'ChatBubble';

// CSS Animation for pulse effect (add to global styles)
const pulseKeyframes = `
  @keyframes pulse {
    0%, 60%, 100% {
      opacity: 0.3;
    }
    30% {
      opacity: 1;
    }
  }
`;

// Inject styles (alternative: use CSS module or styled-components)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = pulseKeyframes;
  document.head.appendChild(style);
}
