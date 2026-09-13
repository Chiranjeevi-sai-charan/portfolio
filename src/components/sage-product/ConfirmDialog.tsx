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
 *   title="Delete User"
 *   message={`Delete user "${pendingDelete?.name}"? This cannot be undone.`}
 *   confirmLabel="Delete"
 *   onConfirm={handleConfirmDelete}
 *   onCancel={() => setPendingDelete(null)}
 * />
 */

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
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onCancel}
    title={title}
    size="sm"
    actions={[
      { label: cancelLabel, variant: 'secondary', onClick: onCancel },
      { label: confirmLabel, variant: destructive ? 'destructive' : 'primary', onClick: onConfirm },
    ]}
  >
    {message}
  </Modal>
);

ConfirmDialog.displayName = 'ConfirmDialog';
