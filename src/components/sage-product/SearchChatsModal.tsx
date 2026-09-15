import React, { useEffect, useRef, useState } from 'react';
import { colors, spacing, typography, borderRadius, shadows, zIndex } from '../../styles/sage/tokens';
import { MaterialIcon } from './MaterialIcon';
import { SidebarItem } from './Sidebar';

/**
 * SearchChatsModal Component
 *
 * ChatGPT-style search overlay: a centered panel with a search field at the
 * top and the filtered chat list below, opened from the search icon next to
 * "New Chat". Filters the real chat history live as you type.
 *
 * @component
 */

interface SearchChatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Flat list of chat history items (section-grouped items from the sidebar) */
  chats: SidebarItem[];
  onSelectChat: (chat: SidebarItem) => void;
  onNewChat?: () => void;
  language?: 'en' | 'ja';
}

const STRINGS = {
  en: {
    placeholder: 'Search chats...',
    newChat: 'New chat',
    recent: 'Recent chats',
    noResults: 'No chats found',
  },
  ja: {
    placeholder: 'チャットを検索...',
    newChat: '新しいチャット',
    recent: '最近のチャット',
    noResults: 'チャットが見つかりません',
  },
};

export const SearchChatsModal: React.FC<SearchChatsModalProps> = ({
  isOpen,
  onClose,
  chats,
  onSelectChat,
  onNewChat,
  language = 'en',
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = STRINGS[language];

  const filtered = chats.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      // Focus after the panel mounts
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (filtered[activeIndex]) {
          onSelectChat(filtered[activeIndex]);
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, activeIndex, onClose, onSelectChat]);

  if (!isOpen) return null;

  const backdropStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '12vh',
    zIndex: zIndex.modal,
  };

  const panelStyles: React.CSSProperties = {
    backgroundColor: colors['neutral-white'],
    borderRadius: borderRadius.lg,
    boxShadow: shadows.xl,
    width: '90vw',
    maxWidth: '560px',
    maxHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const inputRowStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.md} ${spacing.lg}`,
    borderBottom: `1px solid ${colors['neutral-200']}`,
    flexShrink: 0,
  };

  const inputStyles: React.CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: typography.fontSize['body-lg'],
    fontFamily: typography.fontFamily.primary,
    color: colors['neutral-900'],
    backgroundColor: 'transparent',
  };

  const closeButtonStyles: React.CSSProperties = {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: borderRadius.sm,
    background: 'transparent',
    color: colors['neutral-500'],
    cursor: 'pointer',
    flexShrink: 0,
  };

  const listStyles: React.CSSProperties = {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    padding: spacing.sm,
  };

  const sectionLabelStyles: React.CSSProperties = {
    fontSize: typography.fontSize['label-sm'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-500'],
    padding: `${spacing.sm} ${spacing.md} ${spacing.xs}`,
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  };

  const rowStyles = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: borderRadius.md,
    border: 'none',
    background: active ? colors['neutral-100'] : 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-900'],
  });

  const newChatRowStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: borderRadius.md,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: typography.fontSize['body-sm'],
    fontWeight: 600,
    color: colors['neutral-900'],
    marginBottom: spacing.xs,
  };

  const emptyStyles: React.CSSProperties = {
    padding: spacing.xl,
    textAlign: 'center',
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-500'],
  };

  let lastSection: string | undefined;

  return (
    <div style={backdropStyles} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={panelStyles} role="dialog" aria-label="Search chats">
        <div style={inputRowStyles}>
          <MaterialIcon name="search" size={20} color={colors['neutral-500']} />
          <input
            ref={inputRef}
            style={inputStyles}
            placeholder={t.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button style={closeButtonStyles} onClick={onClose} aria-label="Close" title="Close">
            <MaterialIcon name="close" size={18} />
          </button>
        </div>

        <div style={listStyles}>
          {!query && onNewChat && (
            <button
              style={newChatRowStyles}
              onClick={() => {
                onNewChat();
                onClose();
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }}
            >
              <MaterialIcon name="add" size={18} />
              {t.newChat}
            </button>
          )}

          {!query && chats.length > 0 && <div style={sectionLabelStyles}>{t.recent}</div>}

          {filtered.length === 0 ? (
            <div style={emptyStyles}>{t.noResults}</div>
          ) : (
            filtered.map((chat, idx) => {
              const showSection = query.length === 0 && chat.section && chat.section !== lastSection;
              lastSection = chat.section;
              return (
                <React.Fragment key={chat.id || chat.label}>
                  {showSection && idx > 0 && <div style={sectionLabelStyles}>{chat.section}</div>}
                  <button
                    style={rowStyles(idx === activeIndex)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      onSelectChat(chat);
                      onClose();
                    }}
                  >
                    <MaterialIcon name={chat.icon} size={16} color={colors['neutral-500']} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {chat.label}
                    </span>
                  </button>
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

SearchChatsModal.displayName = 'SearchChatsModal';
