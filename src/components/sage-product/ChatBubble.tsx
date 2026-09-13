import React, { useState } from 'react';
import { colors, spacing, borderRadius, shadows } from '../../styles/sage/tokens';
import { MessageActions } from './MessageActions';
import { MaterialIcon } from './MaterialIcon';
import { useToast } from './ToastProvider';

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

  /** Called when a citation link is clicked, to open the source document viewer */
  onCitationClick?: (citation: string) => void;

  /** Timestamp of the message */
  timestamp?: string;

  /** Whether AI is generating response (loading state) */
  loading?: boolean;

  /** Callback when user likes the message */
  onLike?: () => void;

  /** Callback when user dislikes the message */
  onDislike?: () => void;

  /** Callback when user comments on the message */
  onComment?: () => void;

  /** Callback when user shares the message */
  onShare?: () => void;

  /** Callback when user asks to regenerate the response */
  onRegenerate?: () => void;

  /** Whether message is liked */
  liked?: boolean;

  /** Whether message is disliked */
  disliked?: boolean;
}

/**
 * ChatBubble - Message container for chat interface
 *
 * Types:
 * - user: Right-aligned, neutral-100 background
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
  onCitationClick,
  loading = false,
  onLike,
  onDislike,
  onComment,
  onShare,
  onRegenerate,
  liked = false,
  disliked = false,
}) => {
  const isUser = type === 'user';
  const [isHovering, setIsHovering] = useState(false);
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null);
  const { showToast } = useToast();

  const bubbleContainerStyles: React.CSSProperties = {
    display: 'flex',
    marginBottom: spacing.lg,
    justifyContent: isUser ? 'flex-end' : 'flex-start',
  };

  const bubbleStyles: React.CSSProperties = {
    maxWidth: isUser ? '480px' : '100%',
    width: 'fit-content',
    padding: isUser ? `${spacing.sm} ${spacing.lg}` : 0,
    borderRadius: borderRadius.lg,
    backgroundColor: isUser ? colors['neutral-100'] : 'transparent',
    color: colors['neutral-900'],
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
      showToast('Copied to clipboard', 'success');
    }
  };

  const handleShare = () => {
    if (message) {
      navigator.clipboard.writeText(message);
    }
    onShare?.();
    showToast('Share link copied to clipboard', 'success');
  };

  const handleRegenerate = () => {
    onRegenerate?.();
    showToast('Regenerating response...', 'info');
  };

  const handleEdit = () => {
    console.log('Editing message');
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window && message) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
    }
  };

  return (
    <div
      style={bubbleContainerStyles}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div style={{ flex: isUser ? '0 1 auto' : 1, maxWidth: '100%' }}>
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
                        onCitationClick?.(citation);
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
            </>
          )}
        </div>

        {/* Message Actions — always reserve the same height so hovering never
            shifts the content below (visibility is toggled, not mounting) */}
        {!loading && !isUser && (
          <div
            style={{
              height: '30px',
              visibility: isHovering || feedback ? 'visible' : 'hidden',
            }}
          >
            <MessageActions
              liked={feedback === 'liked'}
              disliked={feedback === 'disliked'}
              onLike={handleLike}
              onDislike={handleDislike}
              onComment={onComment}
              onCopy={handleCopy}
              onSpeak={handleSpeak}
              onShare={handleShare}
              onRegenerate={handleRegenerate}
              compact
            />
          </div>
        )}

        {!loading && isUser && (
          <div
            style={{
              height: '30px',
              display: 'flex',
              justifyContent: 'flex-end',
              visibility: isHovering ? 'visible' : 'hidden',
            }}
          >
            <MessageActions onCopy={handleCopy} onShare={handleShare} onEdit={handleEdit} compact />
          </div>
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
