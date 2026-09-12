import React from 'react';
import { colors, spacing, iconSizes } from '../../styles/sage/tokens';

interface MessageActionsProps {
  onLike?: () => void;
  onDislike?: () => void;
  onComment?: () => void;
  onCopy?: () => void;
  onSpeak?: () => void;
  liked?: boolean;
  disliked?: boolean;
  compact?: boolean;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  onLike,
  onDislike,
  onComment,
  onCopy,
  onSpeak,
  liked = false,
  disliked = false,
  compact = false,
}) => {
  const buttonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: spacing.xs,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors['neutral-500'],
    fontSize: compact ? '14px' : '16px',
    transition: 'color 0.2s ease',
  };

  const hoverStyle: React.CSSProperties = {
    ...buttonStyle,
    color: colors['neutral-700'],
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: compact ? spacing.xs : spacing.sm,
    marginTop: spacing.sm,
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      {/* Like Button */}
      {onLike && (
        <button
          onClick={onLike}
          style={
            liked
              ? { ...buttonStyle, backgroundColor: colors['sage-green-50'], borderRadius: '6px' }
              : buttonStyle
          }
          onMouseEnter={(e) => {
            if (!liked) {
              e.currentTarget.style.color = colors['neutral-700'];
            }
          }}
          onMouseLeave={(e) => {
            if (!liked) {
              e.currentTarget.style.color = colors['neutral-500'];
            }
          }}
          title="Like this response"
          aria-label="Like"
        >
          👍
        </button>
      )}

      {/* Dislike Button */}
      {onDislike && (
        <button
          onClick={onDislike}
          style={
            disliked
              ? { ...buttonStyle, backgroundColor: '#FEE2E2', borderRadius: '6px' }
              : buttonStyle
          }
          onMouseEnter={(e) => {
            if (!disliked) {
              e.currentTarget.style.color = colors['neutral-700'];
            }
          }}
          onMouseLeave={(e) => {
            if (!disliked) {
              e.currentTarget.style.color = colors['neutral-500'];
            }
          }}
          title="Dislike this response"
          aria-label="Dislike"
        >
          👎
        </button>
      )}

      {/* Comment Button */}
      {onComment && (
        <button
          onClick={onComment}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors['neutral-700'];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors['neutral-500'];
          }}
          title="Leave feedback"
          aria-label="Comment"
        >
          💬
        </button>
      )}

      {/* Copy Button */}
      {onCopy && (
        <button
          onClick={onCopy}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors['neutral-700'];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors['neutral-500'];
          }}
          title="Copy to clipboard"
          aria-label="Copy"
        >
          📋
        </button>
      )}

      {/* Speaker Button (Text-to-Speech) */}
      {onSpeak && (
        <button
          onClick={onSpeak}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors['neutral-700'];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors['neutral-500'];
          }}
          title="Listen to this response"
          aria-label="Speak"
        >
          🔊
        </button>
      )}
    </div>
  );
};

MessageActions.displayName = 'MessageActions';
