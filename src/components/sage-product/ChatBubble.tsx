import React, { useState } from 'react';
import { colors, spacing, borderRadius, shadows } from '../../styles/sage/tokens';
import { MessageActions } from './MessageActions';
import { MaterialIcon } from './MaterialIcon';

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
 * // AI response with citations
 * <ChatBubble
 *   type="ai"
 *   message="The leave policy allows 20 days of paid leave per year."
 *   citations={["Leave Policy Document", "HR Portal - Vacation Request Guide"]}
 *   timestamp="2024-09-13 10:31"
 * />
 *
 * // Loading state
 * <ChatBubble type="ai" loading={true} />
 */

interface ChatBubbleProps {
  /** Type of message: user (right-aligned) or ai (left-aligned) */
  type: 'user' | 'ai';

  /** Message content (plain text or markdown) */
  message?: string;

  /** Optional source citations for AI responses (array of strings) */
  citations?: string[];

  /** Timestamp of the message */
  timestamp?: string;

  /** Whether AI is generating response (loading state) */
  loading?: boolean;

  /** User avatar (for user messages) or AI icon (for AI messages) */
  avatar?: React.ReactNode;

  /** Callback when user likes the message */
  onLike?: () => void;

  /** Callback when user dislikes the message */
  onDislike?: () => void;

  /** Callback when user comments on the message */
  onComment?: () => void;

  /** Whether message is liked */
  liked?: boolean;

  /** Whether message is disliked */
  disliked?: boolean;
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
 * - AI messages: Left-aligned with source citations
 * - Citations: Displayed in a gray box, clickable links to HR policy documents
 * - Message Actions: Like, dislike, comment, copy, speak buttons for AI responses
 * - Loading: Animated dots while AI generates response
 * - Timestamp: When message was sent/received
 *
 * States:
 * - default: Message rendered with actions on hover
 * - loading: Animated dots, no message content
 * - with-citations: AI response with linked source documents
 */
export const ChatBubble: React.FC<ChatBubbleProps> = ({
  type,
  message,
  citations,
  timestamp,
  loading = false,
  avatar,
  onLike,
  onDislike,
  onComment,
  liked = false,
  disliked = false,
}) => {
  const isUser = type === 'user';
  const [isHovering, setIsHovering] = useState(false);
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null);

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

  const citationsContainerStyles: React.CSSProperties = {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors['neutral-200']}`,
  };

  const citationsHeaderStyles: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: colors['neutral-600'],
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const citationStyles: React.CSSProperties = {
    fontSize: '12px',
    color: colors['accent-blue'],
    textDecoration: 'none',
    cursor: 'pointer',
    marginBottom: spacing.xs,
    display: 'block',
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
    transition: 'background-color 0.2s ease',
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

  const handleLike = () => {
    setFeedback(feedback === 'liked' ? null : 'liked');
    onLike?.();
  };

  const handleDislike = () => {
    setFeedback(feedback === 'disliked' ? null : 'disliked');
    onDislike?.();
  };

  const handleCopy = () => {
    if (message) {
      navigator.clipboard.writeText(message);
      console.log('Message copied to clipboard');
    }
  };

  const handleSpeak = () => {
    console.log('Text-to-speech: Playing audio for message');
    if ('speechSynthesis' in window && message) {
      const utterance = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      style={bubbleContainerStyles}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div style={avatarContainerStyles}>
        {avatar || (isUser ? 'U' : <MaterialIcon name="psychology" size={18} color={colors['sage-green-600']} />)}
      </div>

      <div style={{ flex: 1 }}>
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

              {citations && citations.length > 0 && !isUser && (
                <div style={citationsContainerStyles}>
                  <div style={citationsHeaderStyles}>Sources</div>
                  {citations.map((citation, idx) => (
                    <a
                      key={idx}
                      href="#"
                      style={citationStyles}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Viewing source:', citation);
                      }}
                      title={`View source: ${citation}`}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors['neutral-100'];
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <MaterialIcon name="attach_file" size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {citation}
                    </a>
                  ))}
                </div>
              )}

              {timestamp && <div style={timestampStyles}>{timestamp}</div>}
            </>
          )}
        </div>

        {/* Message Actions - Show for AI responses */}
        {!loading && !isUser && (isHovering || feedback) && (
          <MessageActions
            liked={feedback === 'liked'}
            disliked={feedback === 'disliked'}
            onLike={handleLike}
            onDislike={handleDislike}
            onComment={onComment}
            onCopy={handleCopy}
            onSpeak={handleSpeak}
            compact
          />
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
