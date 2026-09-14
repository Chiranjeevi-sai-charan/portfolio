import React from 'react';

/**
 * MaterialIcon Component
 *
 * Renders a Google Material Symbols (Outlined) icon.
 * The font is loaded once via a <link> tag in index.html — this component
 * never touches document.head itself, avoiding the render-time side effects
 * that broke the previous implementation.
 *
 * @component
 * @example
 * <MaterialIcon name="person" />
 * <MaterialIcon name="settings" size={20} filled />
 */

interface MaterialIconProps {
  /** Material Symbols ligature name, e.g. "person", "settings", "group" */
  name: string;
  /** Icon size in pixels */
  size?: number;
  /** Icon color (defaults to currentColor) */
  color?: string;
  /** Use the filled variant */
  filled?: boolean;
  /** Font weight (100-700) */
  weight?: number;
  /** Additional class name */
  className?: string;
  /** Inline style overrides */
  style?: React.CSSProperties;
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  filled = false,
  weight = 400,
  className = '',
  style,
}) => {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: `${size}px`,
        color,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
        ...style,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};

MaterialIcon.displayName = 'MaterialIcon';
