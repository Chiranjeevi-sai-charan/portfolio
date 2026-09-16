import React from 'react';
import { colors, spacing, iconSizes, borderRadius } from '../../styles/sage/tokens';
import { MaterialIcon } from './MaterialIcon';
import { Language } from '../../utils/mockAIResponses';

const STRINGS = {
  en: {
    like: 'Like this response',
    dislike: 'Dislike this response',
    comment: 'Leave feedback',
    copy: 'Copy to clipboard',
    speak: 'Listen to this response',
    share: 'Share',
    regenerate: 'Try again',
    edit: 'Edit message',
  },
  ja: {
    like: 'この回答を高評価',
    dislike: 'この回答を低評価',
    comment: 'フィードバックを送る',
    copy: 'クリップボードにコピー',
    speak: 'この回答を読み上げる',
    share: '共有',
    regenerate: 'もう一度試す',
    edit: 'メッセージを編集',
  },
};

interface MessageActionsProps {
  onLike?: () => void;
  onDislike?: () => void;
  onComment?: () => void;
  onCopy?: () => void;
  onSpeak?: () => void;
  onShare?: () => void;
  onRegenerate?: () => void;
  onEdit?: () => void;
  liked?: boolean;
  disliked?: boolean;
  compact?: boolean;
  language?: Language;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  onLike,
  onDislike,
  onComment,
  onCopy,
  onSpeak,
  onShare,
  onRegenerate,
  onEdit,
  liked = false,
  disliked = false,
  compact = false,
  language = 'en',
}) => {
  const t = STRINGS[language];
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
              ? { ...buttonStyle, backgroundColor: colors['neutral-200'], borderRadius: borderRadius.sm }
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
          title={t.like}
          aria-label={t.like}
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
              ? { ...buttonStyle, backgroundColor: colors['neutral-200'], borderRadius: borderRadius.sm }
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
          title={t.dislike}
          aria-label={t.dislike}
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
          title={t.comment}
          aria-label={t.comment}
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
          title={t.copy}
          aria-label={t.copy}
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
          title={t.speak}
          aria-label={t.speak}
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
          title={t.share}
          aria-label={t.share}
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
          title={t.regenerate}
          aria-label={t.regenerate}
        >
          <MaterialIcon name="refresh" size={compact ? 16 : 18} />
        </button>
      )}

      {/* Edit Button */}
      {onEdit && (
        <button
          onClick={onEdit}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors['neutral-700'];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors['neutral-500'];
          }}
          title={t.edit}
          aria-label={t.edit}
        >
          <MaterialIcon name="edit" size={compact ? 16 : 18} />
        </button>
      )}
    </div>
  );
};

MessageActions.displayName = 'MessageActions';
