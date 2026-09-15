import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { spacing, colors, borderRadius, typography, interactionTints, zIndex } from '../../styles/sage/tokens';
import { MaterialIcon } from './MaterialIcon';

/**
 * Select Component
 *
 * Custom-styled dropdown (not a native <select>) so the open menu can be
 * fully themed — native <select> menus render via the OS and can't be
 * styled consistently across browsers.
 *
 * @component
 * @example
 * <Select label="Department" options={[{ value: 'hr', label: 'HR' }]} />
 *
 * <Select
 *   label="Priority"
 *   options={[{ value: 'high', label: 'High' }]}
 *   error="This field is required"
 * />
 */

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  /** Label text displayed above select */
  label?: string;

  /** Size of the select field */
  size?: 'sm' | 'md' | 'lg';

  /** Array of options to display */
  options: SelectOption[];

  /** Placeholder text, shown when value is empty */
  placeholder?: string;

  /** Current value */
  value?: string | number;

  /** Called with a native-select-shaped event so existing onChange={(e) => ...e.target.value} callers keep working */
  onChange?: (e: { target: { value: string } }) => void;

  /** Error message displayed below select */
  error?: string;

  /** Helper text displayed below select */
  helperText?: string;

  /** Whether select is required (adds asterisk to label) */
  required?: boolean;

  disabled?: boolean;

  name?: string;

  id?: string;
}

/**
 * Select - Dropdown select field
 *
 * Sizes:
 * - sm: 32px height
 * - md: 44px height (default)
 * - lg: 48px height
 *
 * States:
 * - default: Normal state
 * - focus/open: Blue border + glow
 * - error: Red border with error message
 * - disabled: Reduced opacity
 * - hover: Subtle highlight
 *
 * Features:
 * - Optional label with required indicator
 * - Custom-themed popover menu with hover/selected states
 * - Keyboard accessible (Arrow Up/Down, Enter, Escape)
 * - Closes on outside click
 * - Error and helper text
 */
export const Select: React.FC<SelectProps> = ({
  label,
  size = 'md',
  options,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required,
  disabled,
  name,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [menuRect, setMenuRect] = useState<{ top?: number; bottom?: number; left: number; width: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => String(o.value) === String(value));

  const MENU_ESTIMATED_HEIGHT = 260;

  const computeMenuRect = () => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUpward = spaceBelow < MENU_ESTIMATED_HEIGHT && spaceAbove > spaceBelow;
    setMenuRect(
      openUpward
        ? { bottom: window.innerHeight - rect.top + 6, left: rect.left, width: rect.width }
        : { top: rect.bottom + 6, left: rect.left, width: rect.width }
    );
  };

  const openMenu = () => {
    computeMenuRect();
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        rootRef.current &&
        !rootRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleReposition = () => computeMenuRect();
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const idx = options.findIndex((o) => String(o.value) === String(value));
      setHighlightedIndex(idx >= 0 ? idx : 0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const el = listRef.current.children[highlightedIndex] as HTMLElement | undefined;
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const commitSelection = (option: SelectOption) => {
    if (option.disabled) return;
    onChange?.({ target: { value: String(option.value) } });
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!isOpen) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = options[highlightedIndex];
      if (opt) commitSelection(opt);
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    width: '100%',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: typography.fontSize['label-md'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
    display: 'flex',
    gap: '4px',
  };

  const requiredStyle: React.CSSProperties = {
    color: colors['error-red'],
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      height: '32px',
      padding: `0 ${spacing.md}`,
      fontSize: typography.fontSize['body-sm'],
    },
    md: {
      height: '44px',
      padding: `0 ${spacing.lg}`,
      fontSize: typography.fontSize['body-md'],
    },
    lg: {
      height: '48px',
      padding: `0 ${spacing.xl}`,
      fontSize: typography.fontSize['body-lg'],
    },
  };

  const triggerBorderColor = error
    ? colors['error-red']
    : isOpen
    ? colors['accent-blue']
    : colors['neutral-200'];

  const triggerStyles: React.CSSProperties = {
    ...sizeStyles[size],
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    border: `1px solid ${triggerBorderColor}`,
    borderRadius: borderRadius.md,
    fontFamily: typography.fontFamily.primary,
    fontWeight: 500,
    color: selectedOption ? colors['neutral-900'] : colors['neutral-400'],
    backgroundColor: disabled ? colors['neutral-100'] : colors['neutral-white'],
    boxShadow: isOpen ? `0 0 0 3px ${interactionTints.accentRing}` : '0 1px 2px rgba(16, 24, 40, 0.04)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, background-color 0.15s ease-in-out',
    opacity: disabled ? 0.6 : 1,
    textAlign: 'left',
    outline: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const wrapperStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
  };

  const chevronStyles: React.CSSProperties = {
    display: 'flex',
    flexShrink: 0,
    color: isOpen ? colors['neutral-700'] : colors['neutral-400'],
    transition: 'color 0.15s ease-in-out, transform 0.15s ease-in-out',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  };

  const menuStyles: React.CSSProperties = {
    position: 'fixed',
    top: menuRect?.top,
    bottom: menuRect?.bottom,
    left: menuRect?.left ?? 0,
    width: menuRect?.width ?? undefined,
    zIndex: zIndex.popover,
    backgroundColor: colors['neutral-white'],
    border: `1px solid ${colors['neutral-200']}`,
    borderRadius: borderRadius.md,
    boxShadow: '0 12px 24px rgba(16, 24, 40, 0.12), 0 2px 6px rgba(16, 24, 40, 0.06)',
    padding: '4px',
    maxHeight: '260px',
    overflowY: 'auto',
  };

  const optionStyles = (opt: SelectOption, index: number): React.CSSProperties => {
    const isSelected = String(opt.value) === String(value);
    const isHighlighted = index === highlightedIndex;
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.sm,
      padding: `${spacing.sm} ${spacing.sm}`,
      borderRadius: borderRadius.sm,
      fontSize: typography.fontSize['body-sm'],
      fontWeight: isSelected ? 600 : 500,
      color: opt.disabled ? colors['neutral-300'] : isSelected ? colors['accent-blue'] : colors['neutral-800'],
      backgroundColor: isSelected
        ? interactionTints.accentSoft
        : isHighlighted
        ? colors['neutral-50']
        : 'transparent',
      cursor: opt.disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.1s ease-in-out',
    };
  };

  const errorMessageStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-xs'],
    color: colors['error-red'],
    marginTop: '-4px',
  };

  const helperTextStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-xs'],
    color: colors['neutral-500'],
    marginTop: '-4px',
  };

  return (
    <div style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={requiredStyle}>*</span>}
        </label>
      )}

      <div style={wrapperStyles} ref={rootRef}>
        <button
          type="button"
          id={id}
          name={name}
          style={triggerStyles}
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            if (isOpen) setIsOpen(false);
            else openMenu();
          }}
          onKeyDown={handleTriggerKeyDown}
          onMouseEnter={(e) => {
            if (disabled || isOpen) return;
            (e.currentTarget as HTMLButtonElement).style.borderColor = colors['neutral-300'];
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-50'];
          }}
          onMouseLeave={(e) => {
            if (disabled || isOpen) return;
            (e.currentTarget as HTMLButtonElement).style.borderColor = error ? colors['error-red'] : colors['neutral-200'];
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-white'];
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {selectedOption ? selectedOption.label : placeholder || 'Select...'}
          </span>
          <span style={chevronStyles}>
            <MaterialIcon name="keyboard_arrow_down" size={20} />
          </span>
        </button>

        {isOpen &&
          menuRect &&
          createPortal(
            <div
              style={menuStyles}
              role="listbox"
              ref={(node) => {
                (listRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                (menuRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
              }}
            >
              {options.map((opt, index) => (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={String(opt.value) === String(value)}
                  style={optionStyles(opt, index)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => commitSelection(opt)}
                >
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {opt.label}
                  </span>
                  {String(opt.value) === String(value) && (
                    <MaterialIcon name="check" size={16} color={colors['accent-blue']} />
                  )}
                </div>
              ))}
            </div>,
            document.body
          )}
      </div>

      {error && <div style={errorMessageStyles}>{error}</div>}
      {!error && helperText && <div style={helperTextStyles}>{helperText}</div>}
    </div>
  );
};

Select.displayName = 'Select';
