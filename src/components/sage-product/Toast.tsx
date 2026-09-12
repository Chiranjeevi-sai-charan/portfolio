import React, { useEffect } from 'react';
import { colors, spacing, borderRadius, shadows, typography } from '../../styles/sage/tokens';

/**
 * Toast Component
 *
 * Temporary notification that appears and disappears automatically.
 *
 * @component
 * @example
 * <Toast
 *   variant="success"
 *   message="Action completed!"
 *   duration={3000}
 *   onClose={handleClose}
 * />
 */

interface ToastProps {
  /** Toast message */
  message: string;

  /** Toast variant */
  variant?: 'info' | 'success' | 'warning' | 'error';

  /** Auto-dismiss duration (ms), 0 to disable */
  duration?: number;

  /** Close handler */
  onClose: () => void;

  /** Position on screen */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

  /** CSS class name */
  className?: string;
}

/**
 * Toast - Temporary notification
 *
 * Variants:
 * - info: Blue (informational)
 * - success: Green (positive action)
 * - warning: Amber (caution)
 * - error: Red (problem)
 *
 * Positions:
 * - top-left, top-center, top-right
 * - bottom-left, bottom-center, bottom-right
 *
 * Features:
 * - Auto-dismiss after duration
 * - Fade in/out animation
 * - Color-coded variants
 * - Manual close button
 * - Configurable position
 */
export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  duration = 3000,
  onClose,
  position = 'bottom-right',
  className = '',
}) => {
  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const variantConfig: Record<string, { bg: string; border: string; text: string }> = {
    info: {
      bg: colors['info-cyan'],
      border: colors['info-cyan'],
      text: colors['neutral-white'],
    },
    success: {
      bg: colors['success-green'],
      border: colors['success-green'],
      text: colors['neutral-white'],
    },
    warning: {
      bg: colors['warning-amber'],
      border: colors['warning-amber'],
      text: colors['neutral-900'],
    },
    error: {
      bg: colors['error-red'],
      border: colors['error-red'],
      text: colors['neutral-white'],
    },
  };

  const config = variantConfig[variant];

  const positionMap: Record<string, React.CSSProperties> = {
    'top-left': { top: spacing.xl, left: spacing.xl },
    'top-center': { top: spacing.xl, left: '50%', transform: 'translateX(-50%)' },
    'top-right': { top: spacing.xl, right: spacing.xl },
    'bottom-left': { bottom: spacing.xl, left: spacing.xl },
    'bottom-center': { bottom: spacing.xl, left: '50%', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: spacing.xl, right: spacing.xl },
  };

  const toastStyles: React.CSSProperties = {
    position: 'fixed',
    ...positionMap[position],
    backgroundColor: config.bg,
    border: `1px solid ${config.border}`,
    borderRadius: borderRadius.md,
    boxShadow: shadows.lg,
    padding: `${spacing.md} ${spacing.lg}`,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    color: config.text,
    fontSize: typography.fontSize['body-md'],
    minWidth: '300px',
    maxWidth: '500px',
    zIndex: 9999,
    animation: 'fadeIn 0.3s ease-in-out',
  };

  const closeButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: 'inherit',
    padding: '0',
    marginLeft: 'auto',
    opacity: 0.7,
    transition: 'opacity 0.2s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const iconMap: Record<string, string> = {
    info: 'ℹ',
    success: '✓',
    warning: '⚠',
    error: '✕',
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div style={toastStyles} className={className} role="status" aria-live="polite">
        <span style={{ fontSize: '16px', fontWeight: 600 }}>{iconMap[variant]}</span>
        <span style={{ flex: 1 }}>{message}</span>
        <button
          style={closeButtonStyles}
          onClick={onClose}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '0.7';
          }}
          aria-label="Close toast"
        >
          ✕
        </button>
      </div>
    </>
  );
};

Toast.displayName = 'Toast';
