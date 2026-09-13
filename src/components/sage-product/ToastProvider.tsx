import React, { createContext, useCallback, useContext, useState } from 'react';
import { spacing } from '../../styles/sage/tokens';
import { Toast } from './Toast';

/**
 * ToastProvider
 *
 * App-level snackbar/toast manager built on top of the `Toast` component.
 * Wrap a subtree with `<ToastProvider>` once, then call `useToast()` from
 * any descendant to queue a message — no prop-drilling of onClose/state.
 *
 * @component
 * @example
 * // Once, near the root:
 * <ToastProvider><SageApp /></ToastProvider>
 *
 * // Anywhere inside:
 * const { showToast } = useToast();
 * showToast('Document uploaded successfully', 'success');
 */

type ToastVariant = 'info' | 'success' | 'warning' | 'error';

interface ToastEntry {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  /** Queue a snackbar message. Variant defaults to 'info'. */
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const showToast = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const stackStyles: React.CSSProperties = {
    position: 'fixed',
    bottom: spacing.xl,
    right: spacing.xl,
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
    gap: spacing.sm,
    zIndex: 9999,
    pointerEvents: 'none',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={stackStyles}>
        {toasts.map((t) => (
          <div key={t.id} style={{ pointerEvents: 'auto' }}>
            <Toast message={t.message} variant={t.variant} inline onClose={() => dismissToast(t.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';

/** Access the nearest ToastProvider's `showToast`. Must be used within a `<ToastProvider>`. */
export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return ctx;
};
