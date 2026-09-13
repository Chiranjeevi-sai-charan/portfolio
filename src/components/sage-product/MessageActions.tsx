import React from 'react';
import { colors, spacing, iconSizes } from '../../styles/sage/tokens';
import { MaterialIcon } from './MaterialIcon';

interface MessageActionsProps {
  onLike?: () => void;
  onDislike?: () => void;
  onComment?: () => void;
  onCopy?: () => void;
  onSpeak?: () => void;
  onShare?: () => void;
  onRegenerate?: () => void;
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
  onShare,
  onRegenerate,
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
              ? { ...buttonStyle, backgroundColor: colors['neutral-200'], borderRadius: '6px' }
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
          <MaterialIcon name="thumb_up" size={compact ? 16 : 18} filled={liked} />
        </button>
      )}

      {/* Dislike Button */}
      {onDislike && (
        <button
          onClick={onDislike}
          style={
            disliked
              ? { ...buttonStyle, backgroundColor: colors['neutral-200'], borderRadius: '6px' }
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
          <MaterialIcon name="thumb_down" size={compact ? 16 : 18} filled={disliked} />
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
          <MaterialIcon name="chat_bubble" size={compact ? 16 : 18} />
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
          <MaterialIcon name="content_copy" size={compact ? 16 : 18} />
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
          <MaterialIcon name="volume_up" size={compact ? 16 : 18} />
        </button>
      )}

      {/* Share Button */}
      {onShare && (
        <button
          onClick={onShare}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors['neutral-700'];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors['neutral-500'];
          }}
          title="Share"
          aria-label="Share"
        >
          <MaterialIcon name="ios_share" size={compact ? 16 : 18} />
        </button>
      )}

      {/* Regenerate Button */}
      {onRegenerate && (
        <button
          onClick={onRegenerate}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors['neutral-700'];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors['neutral-500'];
          }}
          title="Try again"
          aria-label="Try again"
        >
          <MaterialIcon name="refresh" size={compact ? 16 : 18} />
        </button>
      )}
    </div>
  );
};

MessageActions.displayName = 'MessageActions';
