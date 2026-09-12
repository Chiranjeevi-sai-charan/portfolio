import React from 'react';
import { colors, spacing, borderRadius, typography } from '../../styles/sage/tokens';
import { Button } from './Button';

/**
 * Pagination Component
 *
 * Navigation for multi-page data.
 *
 * @component
 * @example
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={handlePageChange}
 * />
 *
 * <Pagination
 *   currentPage={3}
 *   totalPages={20}
 *   onPageChange={handlePageChange}
 *   siblingsCount={2}
 * />
 */

interface PaginationProps {
  /** Current active page (1-indexed) */
  currentPage: number;

  /** Total number of pages */
  totalPages: number;

  /** Page change handler */
  onPageChange: (page: number) => void;

  /** Number of sibling pages to show */
  siblingsCount?: number;

  /** CSS class name */
  className?: string;
}

/**
 * Pagination - Page navigation
 *
 * Features:
 * - Current page highlighting
 * - Previous/Next buttons
 * - Configurable sibling count
 * - Ellipsis for hidden pages (...）
 * - Disabled state for first/last pages
 * - Keyboard accessible
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingsCount = 1,
  className = '',
}) => {
  const generatePages = () => {
    const pages: (number | string)[] = [];

    const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    // Always show first page
    pages.push(1);

    if (shouldShowLeftDots) {
      pages.push('...');
    }

    // Add sibling pages
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (shouldShowRightDots) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    justifyContent: 'center',
  };

  const pageButtonStyles = (isActive: boolean): React.CSSProperties => ({
    minWidth: '40px',
    height: '40px',
    padding: `${spacing.sm} ${spacing.md}`,
    border: isActive ? `2px solid ${colors['sage-green-500']}` : `1px solid ${colors['neutral-200']}`,
    backgroundColor: isActive ? colors['sage-green-50'] : colors['neutral-white'],
    color: isActive ? colors['sage-green-500'] : colors['neutral-900'],
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    fontSize: typography.fontSize['body-md'],
    fontWeight: isActive ? typography.fontWeight.semibold : typography.fontWeight.regular,
    transition: 'all 0.2s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const dotsStyles: React.CSSProperties = {
    padding: `${spacing.sm} ${spacing.xs}`,
    color: colors['neutral-500'],
    fontSize: typography.fontSize['body-md'],
    cursor: 'default',
    userSelect: 'none',
  };

  const pages = generatePages();

  return (
    <div style={containerStyles} className={className}>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Prev
      </Button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`dots-${index}`} style={dotsStyles}>
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            style={pageButtonStyles(isActive)}
            onClick={() => onPageChange(pageNum)}
            aria-label={`Go to page ${pageNum}`}
            aria-current={isActive ? 'page' : undefined}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  colors['neutral-100'];
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  colors['neutral-300'];
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                colors['neutral-white'];
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                colors['neutral-200'];
            }}
          >
            {pageNum}
          </button>
        );
      })}

      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </Button>
    </div>
  );
};

Pagination.displayName = 'Pagination';
