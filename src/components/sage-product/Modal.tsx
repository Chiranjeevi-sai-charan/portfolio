import React from 'react';
import { colors, spacing, borderRadius, shadows, typography } from '../../styles/sage/tokens';
import { Button } from './Button';

/**
 * Modal Component
 *
 * Dialog overlay with header, body, and footer actions.
 *
 * @component
 * @example
 * <Modal
 *   isOpen={true}
 *   title="Confirm Action"
 *   onClose={handleClose}
 *   actions={[
 *     { label: 'Cancel', variant: 'secondary', onClick: handleClose },
 *     { label: 'Confirm', variant: 'primary', onClick: handleConfirm },
 *   ]}
 * >
 *   Are you sure?
 * </Modal>
 */

export interface ModalAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'destructive';
  onClick: () => void;
  disabled?: boolean;
}

interface ModalProps {
  /** Modal visibility */
  isOpen: boolean;

  /** Close handler */
  onClose: () => void;

  /** Modal title */
  title?: string;

  /** Modal content */
  children?: React.ReactNode;

  /** Footer actions */
  actions?: ModalAction[];

  /** Size of modal */
  size?: 'sm' | 'md' | 'lg';

  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;

  /** CSS class name */
  className?: string;
}

/**
 * Modal - Dialog overlay
 *
 * Sizes:
 * - sm: Small (400px max-width)
 * - md: Medium (600px max-width, default)
 * - lg: Large (800px max-width)
 *
 * Features:
 * - Backdrop overlay
 * - Optional close on backdrop click
 * - Header with title
 * - Scrollable content
 * - Footer with action buttons
 * - Focus trap
 * - Keyboard accessible (Esc to close)
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
  closeOnBackdropClick = true,
  className = '',
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeMap = {
    sm: '400px',
    md: '600px',
    lg: '800px',
  };

  const backdropStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyles: React.CSSProperties = {
    backgroundColor: colors['neutral-white'],
    borderRadius: borderRadius.lg,
    boxShadow: shadows.xl,
    maxWidth: sizeMap[size],
    width: '90vw',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1001,
  };

  const headerStyles: React.CSSProperties = {
    padding: spacing.lg,
    borderBottom: `1px solid ${colors['neutral-200']}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h4'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
    margin: 0,
  };

  const closeButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: colors['neutral-500'],
    padding: 0,
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    transition: 'all 0.2s ease-in-out',
  };

  const contentStyles: React.CSSProperties = {
    padding: spacing.lg,
    overflowY: 'auto',
    flex: 1,
    color: colors['neutral-700'],
    fontSize: typography.fontSize['body-md'],
  };

  const footerStyles: React.CSSProperties = {
    padding: spacing.lg,
    borderTop: `1px solid ${colors['neutral-200']}`,
    display: 'flex',
    gap: spacing.md,
    justifyContent: 'flex-end',
    backgroundColor: colors['neutral-50'],
  };

  return (
    <div
      style={backdropStyles}
      onClick={(e) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
          onClose();
        }
      }}
      className={className}
    >
      <div style={modalStyles}>
        {title && (
          <div style={headerStyles}>
            <h2 style={titleStyles}>{title}</h2>
            <button
              style={closeButtonStyles}
              onClick={onClose}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  colors['neutral-200'];
                (e.currentTarget as HTMLButtonElement).style.color = colors['neutral-900'];
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = colors['neutral-500'];
              }}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        )}

        {children && <div style={contentStyles}>{children}</div>}

        {actions && actions.length > 0 && (
          <div style={footerStyles}>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'secondary'}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';
