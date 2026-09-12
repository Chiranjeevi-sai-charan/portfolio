import React from 'react';
import { colors, spacing } from '../../styles/sage/tokens';

/**
 * LoadingSpinner Component
 *
 * Animated spinner for loading states.
 *
 * @component
 * @example
 * <LoadingSpinner />
 *
 * <LoadingSpinner size="lg" color="sage-green-500" />
 *
 * <LoadingSpinner overlay message="Loading data..." />
 */

interface LoadingSpinnerProps {
  /** Spinner size */
  size?: 'sm' | 'md' | 'lg';

  /** Spinner color */
  color?: string;

  /** Show as full-screen overlay */
  overlay?: boolean;

  /** Loading message (shown with overlay) */
  message?: string;

  /** CSS class name */
  className?: string;
}

/**
 * LoadingSpinner - Loading indicator
 *
 * Sizes:
 * - sm: 24px
 * - md: 40px (default)
 * - lg: 64px
 *
 * Features:
 * - Animated rotation
 * - Customizable color
 * - Optional overlay mode
 * - Optional message text
 * - Center alignment
 * - Accessibility support (aria-busy)
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = colors['sage-green-500'],
  overlay = false,
  message,
  className = '',
}) => {
  const sizeMap = {
    sm: '24px',
    md: '40px',
    lg: '64px',
  };

  const spinnerSize = sizeMap[size];

  const spinnerStyles: React.CSSProperties = {
    width: spinnerSize,
    height: spinnerSize,
    border: `4px solid ${color}20`,
    borderTop: `4px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  };

  const messageStyles: React.CSSProperties = {
    fontSize: '14px',
    color: colors['neutral-600'],
    marginTop: spacing.md,
  };

  if (overlay) {
    const overlayStyles: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
    };

    const contentStyles: React.CSSProperties = {
      backgroundColor: colors['neutral-white'],
      borderRadius: '8px',
      padding: spacing.xl,
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    };

    return (
      <>
        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <div style={overlayStyles} className={className} aria-busy="true">
          <div style={contentStyles}>
            <div style={spinnerStyles} />
            {message && <p style={messageStyles}>{message}</p>}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div style={containerStyles} className={className} aria-busy="true">
        <div style={spinnerStyles} />
        {message && <p style={messageStyles}>{message}</p>}
      </div>
    </>
  );
};

LoadingSpinner.displayName = 'LoadingSpinner';
