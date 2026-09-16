import React from 'react';
import { colors, spacing, borderRadius, shadows, typography, zIndex, interactionTints } from '../../styles/sage/tokens';
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

  /** Interface language, used only for the close button's accessible name */
  language?: 'en' | 'ja';
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
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
  closeOnBackdropClick = true,
  className = '',
  language = 'en',
}) => {
  const titleId = React.useId();
  const modalRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => el.offsetParent !== null);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      // Move focus into the modal (its first focusable element, falling back to the modal itself).
      const focusFirst = () => {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable && focusable.length > 0) {
          focusable[0].focus();
        } else {
          modalRef.current?.focus();
        }
      };
      const raf = requestAnimationFrame(focusFirst);

      return () => {
        cancelAnimationFrame(raf);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
        previouslyFocusedElement.current?.focus?.();
      };
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
    backgroundColor: 'rgba(17, 24, 39, 0.45)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: zIndex.modal,
    animation: 'sage-modal-backdrop-in 0.15s ease-out',
  };

  const modalStyles: React.CSSProperties = {
    backgroundColor: colors['neutral-white'],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    border: `1px solid ${colors['neutral-200']}`,
    boxShadow: shadows.modal,
    maxWidth: sizeMap[size],
    width: '90vw',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    zIndex: zIndex.modal + 1,
    animation: 'sage-modal-in 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const headerStyles: React.CSSProperties = {
    padding: spacing.lg,
    borderBottom: `1px solid ${colors['neutral-100']}`,
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
    borderTop: `1px solid ${colors['neutral-100']}`,
    display: 'flex',
    gap: spacing.md,
    justifyContent: 'flex-end',
    backgroundColor: colors['neutral-white'],
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
      <style>{`
        @keyframes sage-modal-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes sage-modal-in {
          from { opacity: 0; transform: scale(0.96) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div
        style={modalStyles}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        {title && (
          <div style={headerStyles}>
            <h2 id={titleId} style={titleStyles}>{title}</h2>
            <button
              style={closeButtonStyles}
              onClick={onClose}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  interactionTints.accentSoft;
                (e.currentTarget as HTMLButtonElement).style.color = colors['accent-blue'];
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = colors['neutral-500'];
              }}
              aria-label={language === 'ja' ? 'モーダルを閉じる' : 'Close modal'}
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
