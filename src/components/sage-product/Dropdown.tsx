import React, { useState, useRef, useEffect } from 'react';
import { colors, spacing, borderRadius, shadows, typography } from '../../styles/sage/tokens';

/**
 * Dropdown Component
 *
 * Contextual menu with customizable items and actions.
 *
 * @component
 * @example
 * <Dropdown
 *   trigger={<button>Menu</button>}
 *   items={[
 *     { label: 'Edit', onClick: handleEdit },
 *     { label: 'Delete', onClick: handleDelete, variant: 'destructive' },
 *   ]}
 * />
 */

export interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'destructive';
  divider?: boolean;
}

interface DropdownProps {
  /** Trigger element */
  trigger: React.ReactNode;

  /** Menu items */
  items: DropdownItem[];

  /** Position of dropdown */
  position?: 'left' | 'right';

  /** Close dropdown after item click */
  closeOnItemClick?: boolean;

  /** CSS class name */
  className?: string;
}

/**
 * Dropdown - Contextual menu
 *
 * Positions:
 * - left: Aligned to left edge (default)
 * - right: Aligned to right edge
 *
 * Features:
 * - Customizable trigger
 * - Multiple menu items
 * - Icon support
 * - Disabled items
 * - Destructive variant
 * - Divider support
 * - Click outside to close
 * - Keyboard navigation (Esc to close)
 */
export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  position = 'left',
  closeOnItemClick = true,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  };

  const triggerStyles: React.CSSProperties = {
    cursor: 'pointer',
  };

  const menuStyles: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    [position]: 0,
    marginTop: spacing.sm,
    backgroundColor: colors['neutral-white'],
    borderRadius: borderRadius.md,
    boxShadow: shadows.md,
    minWidth: '200px',
    zIndex: 999,
    overflow: 'hidden',
  };

  const itemStyles: React.CSSProperties = {
    padding: `${spacing.md} ${spacing.lg}`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    fontSize: typography.fontSize['body-md'],
    color: colors['neutral-900'],
    transition: 'background-color 0.2s ease-in-out',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    backgroundColor: colors['neutral-white'],
  };

  const disabledItemStyles: React.CSSProperties = {
    ...itemStyles,
    cursor: 'not-allowed',
    opacity: 0.5,
  };

  const destructiveItemStyles: React.CSSProperties = {
    ...itemStyles,
    color: colors['error-red'],
  };

  const dividerStyles: React.CSSProperties = {
    height: '1px',
    backgroundColor: colors['neutral-200'],
    margin: `${spacing.xs} 0`,
  };

  const iconStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  };

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick();
      if (closeOnItemClick) {
        setIsOpen(false);
      }
    }
  };

  return (
    <div style={containerStyles} className={className}>
      <div
        ref={triggerRef}
        style={triggerStyles}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <div ref={menuRef} style={menuStyles} role="menu">
          {items.map((item, index) => (
            <div key={index}>
              {item.divider ? (
                <div style={dividerStyles} />
              ) : (
                <button
                  style={
                    item.disabled
                      ? disabledItemStyles
                      : item.variant === 'destructive'
                        ? destructiveItemStyles
                        : itemStyles
                  }
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  onMouseEnter={(e) => {
                    if (!item.disabled) {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        item.variant === 'destructive'
                          ? colors['error-red']
                          : colors['sage-green-100'];
                      (e.currentTarget as HTMLButtonElement).style.color =
                        item.variant === 'destructive' ? colors['neutral-white'] : 'inherit';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      colors['neutral-white'];
                    (e.currentTarget as HTMLButtonElement).style.color =
                      item.variant === 'destructive'
                        ? colors['error-red']
                        : colors['neutral-900'];
                  }}
                  role="menuitem"
                >
                  {item.icon && <span style={iconStyles}>{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';
