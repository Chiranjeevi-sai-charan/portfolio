import React from 'react';
import { Modal } from './Modal';

/**
 * ConfirmDialog Component
 *
 * A design-system confirmation prompt for destructive or important
 * actions, built on top of `Modal`. Use this instead of the browser's
 * native `window.confirm()` so the prompt matches the rest of the
 * product's visual language.
 *
 * @component
 * @example
 * <ConfirmDialog
 *   isOpen={!!pendingDelete}
 *   title="Remove user?"
 *   message={`This will remove **${pendingDelete?.name}** from your workspace. This action cannot be undone.`}
 *   confirmLabel="Remove user"
 *   onConfirm={handleConfirmDelete}
 *   onCancel={() => setPendingDelete(null)}
 * />
 */

/** Turns "**bold**" markers in a plain-string message into <strong> — mirrors the
 * "[[n]]" citation-marker parsing ChatBubble already uses for the same reason:
 * i18n strings stay plain strings, formatting is applied only at render time. */
function renderMessage(message: React.ReactNode): React.ReactNode {
  if (typeof message !== 'string') return message;
  const parts = message.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

interface ConfirmDialogProps {
  /** Dialog visibility */
  isOpen: boolean;

  /** Dialog title */
  title?: string;

  /** Confirmation message/body */
  message: React.ReactNode;

  /** Label for the confirming action */
  confirmLabel?: string;

  /** Label for the cancelling action */
  cancelLabel?: string;

  /** Whether the confirm button uses the destructive (red) style — default true */
  destructive?: boolean;

  /** Called when the user confirms */
  onConfirm: () => void;

  /** Called when the user cancels or dismisses the dialog */
  onCancel: () => void;

  /** Interface language, used only for the close button's accessible name */
  language?: 'en' | 'ja';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = true,
  onConfirm,
  onCancel,
  language,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onCancel}
    title={title}
    size="sm"
    language={language}
    actions={[
      { label: cancelLabel, variant: 'outline', onClick: onCancel },
      { label: confirmLabel, variant: destructive ? 'destructive' : 'primary', onClick: onConfirm },
    ]}
  >
    {renderMessage(message)}
  </Modal>
);

ConfirmDialog.displayName = 'ConfirmDialog';
