import React from 'react';
import { colors, spacing, typography } from '../../styles/sage/tokens';

/**
 * EmptyState Component
 *
 * Placeholder for empty content areas.
 *
 * @component
 * @example
 * <EmptyState
 *   icon="📋"
 *   title="No documents"
 *   description="Start by uploading a document"
 *   action={{ label: 'Upload', onClick: handleUpload }}
 * />
 */

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  /** Icon (emoji or component) */
  icon?: React.ReactNode;

  /** Title text */
  title: string;

  /** Description text */
  description?: string;

  /** Action button */
  action?: EmptyStateAction;

  /** CSS class name */
  className?: string;
}

/**
 * EmptyState - Content placeholder
 *
 * Features:
 * - Icon display (emoji or SVG)
 * - Title and description
 * - Optional action button
 * - Centered layout
 * - Semantic HTML
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${spacing.xl} ${spacing.lg}`,
    textAlign: 'center',
    minHeight: '300px',
    gap: spacing.lg,
  };

  const iconStyles: React.CSSProperties = {
    fontSize: '64px',
    opacity: 0.5,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h3'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
    margin: 0,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-md'],
    color: colors['neutral-500'],
    margin: 0,
    maxWidth: '400px',
  };

  const actionButtonStyles: React.CSSProperties = {
    backgroundColor: colors['sage-green-500'],
    color: colors['neutral-white'],
    border: 'none',
    borderRadius: '6px',
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: typography.fontSize['body-md'],
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    marginTop: spacing.md,
  };

  return (
    <div style={containerStyles} className={className}>
      {icon && <div style={iconStyles}>{icon}</div>}
      <h3 style={titleStyles}>{title}</h3>
      {description && <p style={descriptionStyles}>{description}</p>}
      {action && (
        <button
          style={actionButtonStyles}
          onClick={action.onClick}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              colors['sage-green-600'];
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              colors['sage-green-500'];
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
