import React from 'react';
import { borderRadius } from '../../styles/sage/tokens';

/**
 * IconButton Component
 *
 * Single source of truth for the small, circular icon-only action button
 * used throughout tables and toolbars (e.g. row-level Download/Delete
 * actions). Previously this exact pattern — 32px rounded hit area, tinted
 * hover background — was hand-rolled separately in DocumentList and
 * UserManagementTable; consolidating it here means a future style change
 * (hit area size, hover easing, etc.) only needs to happen in one place.
 *
 * @component
 * @example
 * <IconButton
 *   icon="download"
 *   color={colors['accent-blue']}
 *   hoverBackgroundColor={interactionTints.accentSoft}
 *   title="Download"
 *   aria-label={`Download ${doc.name}`}
 *   onClick={() => onDownload(doc)}
 * />
 */

interface IconButtonProps {
  /** Rendered icon element (typically a <MaterialIcon />) */
  children: React.ReactNode;

  /** Click handler */
  onClick?: () => void;

  /** Resting icon color */
  color: string;

  /** Background tint shown on hover */
  hoverBackgroundColor: string;

  /** Hit-area size in px (square) — default 32px */
  size?: number;

  /** Native title tooltip */
  title?: string;

  /** Accessible name */
  'aria-label'?: string;

  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  color,
  hoverBackgroundColor,
  size = 32,
  title,
  'aria-label': ariaLabel,
  disabled = false,
}) => {
  const baseStyles: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    background: 'none',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    color,
    transition: 'background-color 0.15s ease, transform 0.1s ease',
  };

  return (
    <button
      type="button"
      style={baseStyles}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.backgroundColor = hoverBackgroundColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

IconButton.displayName = 'IconButton';
