import React, { useState, useRef, useEffect } from 'react';
import { colors, spacing, borderRadius, shadows, typography } from '../../styles/sage/tokens';

/**
 * Tooltip Component
 *
 * Helpful text that appears on hover or focus.
 *
 * @component
 * @example
 * <Tooltip text="Save changes">
 *   <button>Save</button>
 * </Tooltip>
 *
 * <Tooltip text="This field is required" position="right">
 *   <input type="text" />
 * </Tooltip>
 */

interface TooltipProps {
  /** Tooltip text */
  text: string;

  /** Content to trigger tooltip */
  children: React.ReactNode;

  /** Position relative to trigger */
  position?: 'top' | 'right' | 'bottom' | 'left';

  /** Show delay (ms) */
  delay?: number;

  /** CSS class name */
  className?: string;
}

/**
 * Tooltip - Contextual help text
 *
 * Positions:
 * - top: Above trigger
 * - right: Right of trigger
 * - bottom: Below trigger (default)
 * - left: Left of trigger
 *
 * Features:
 * - Show on hover/focus
 * - Configurable delay
 * - Automatic positioning
 * - Smooth fade animation
 * - Keyboard accessible
 */
export const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'bottom',
  delay = 200,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  };

  const triggerStyles: React.CSSProperties = {
    display: 'inline-block',
  };

  const positionMap: Record<string, React.CSSProperties> = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: spacing.sm,
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: spacing.sm,
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: spacing.sm,
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: spacing.sm,
    },
  };

  const tooltipStyles: React.CSSProperties = {
    position: 'absolute',
    ...positionMap[position],
    backgroundColor: colors['neutral-900'],
    color: colors['neutral-white'],
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: borderRadius.sm,
    fontSize: typography.fontSize['body-sm'],
    whiteSpace: 'nowrap',
    zIndex: 1000,
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden',
    transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
    boxShadow: shadows.md,
    pointerEvents: 'none',
  };

  const arrowSize = '6px';
  const arrowMap: Record<string, React.CSSProperties> = {
    top: {
      bottom: `-${arrowSize}`,
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: `${arrowSize} solid transparent`,
      borderRight: `${arrowSize} solid transparent`,
      borderTop: `${arrowSize} solid ${colors['neutral-900']}`,
    },
    right: {
      left: `-${arrowSize}`,
      top: '50%',
      transform: 'translateY(-50%)',
      borderTop: `${arrowSize} solid transparent`,
      borderBottom: `${arrowSize} solid transparent`,
      borderRight: `${arrowSize} solid ${colors['neutral-900']}`,
    },
    bottom: {
      top: `-${arrowSize}`,
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: `${arrowSize} solid transparent`,
      borderRight: `${arrowSize} solid transparent`,
      borderBottom: `${arrowSize} solid ${colors['neutral-900']}`,
    },
    left: {
      right: `-${arrowSize}`,
      top: '50%',
      transform: 'translateY(-50%)',
      borderTop: `${arrowSize} solid transparent`,
      borderBottom: `${arrowSize} solid transparent`,
      borderLeft: `${arrowSize} solid ${colors['neutral-900']}`,
    },
  };

  const arrowStyles: React.CSSProperties = {
    position: 'absolute',
    width: 0,
    height: 0,
    ...arrowMap[position],
  };

  return (
    <div
      style={containerStyles}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <div style={triggerStyles} ref={triggerRef}>
        {children}
      </div>

      {isVisible && (
        <div style={tooltipStyles} ref={tooltipRef} role="tooltip">
          {text}
          <div style={arrowStyles} />
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
