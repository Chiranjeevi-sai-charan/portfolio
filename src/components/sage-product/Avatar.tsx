import React from 'react';
import { colors, spacing, borderRadius } from '../../styles/sage/tokens';

/**
 * Avatar Component
 *
 * User profile picture or initials display.
 *
 * @component
 * @example
 * <Avatar name="John Doe" />
 *
 * <Avatar size="lg" src="https://..." alt="John" status="online" />
 *
 * <Avatar icon="👤" />
 */

type AvatarStatus = 'online' | 'offline' | 'away';

interface AvatarProps {
  /** User name (generates initials if no src) */
  name?: string;

  /** Image source URL */
  src?: string;

  /** Alt text for image */
  alt?: string;

  /** Icon to display (alternative to name/image) */
  icon?: string;

  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Online status indicator */
  status?: AvatarStatus;

  /** Background color (for initials) */
  backgroundColor?: string;

  /** Text color (for initials) */
  textColor?: string;

  /** CSS class name */
  className?: string;
}

/**
 * Avatar - User profile display
 *
 * Sizes:
 * - xs: 24px
 * - sm: 32px
 * - md: 40px (default)
 * - lg: 48px
 * - xl: 64px
 *
 * Display modes:
 * - Image: src provided
 * - Initials: name provided, generates from first letters
 * - Icon: icon provided (emoji or SVG)
 *
 * Features:
 * - Online status indicator (dot in corner)
 * - Circular design
 * - Fallback to initials if image fails
 * - Multiple sizes
 * - Custom colors
 */
export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  alt,
  icon,
  size = 'md',
  status,
  backgroundColor = colors['sage-green-500'],
  textColor = colors['neutral-white'],
  className = '',
}) => {
  const sizeMap: Record<string, { size: string; fontSize: string; statusSize: string }> = {
    xs: { size: '24px', fontSize: '10px', statusSize: '6px' },
    sm: { size: '32px', fontSize: '12px', statusSize: '8px' },
    md: { size: '40px', fontSize: '14px', statusSize: '10px' },
    lg: { size: '48px', fontSize: '16px', statusSize: '12px' },
    xl: { size: '64px', fontSize: '20px', statusSize: '16px' },
  };

  const sizeStyle = sizeMap[size];

  const avatarContainerStyles: React.CSSProperties = {
    position: 'relative',
    width: sizeStyle.size,
    height: sizeStyle.size,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const initialsAvatarStyles: React.CSSProperties = {
    ...avatarContainerStyles,
    backgroundColor,
    color: textColor,
    fontSize: sizeStyle.fontSize,
    fontWeight: 600,
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const iconStyles: React.CSSProperties = {
    fontSize: sizeStyle.fontSize,
    lineHeight: 1,
  };

  const statusIndicatorStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: sizeStyle.statusSize,
    height: sizeStyle.statusSize,
    borderRadius: borderRadius.full,
    backgroundColor:
      status === 'online'
        ? colors['success-green']
        : status === 'away'
          ? colors['warning-amber']
          : colors['neutral-400'],
    border: `2px solid ${colors['neutral-white']}`,
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div style={avatarContainerStyles} className={className}>
      {src ? (
        <img src={src} alt={alt || name || 'Avatar'} style={imageStyles} />
      ) : icon ? (
        <span style={iconStyles}>{icon}</span>
      ) : name ? (
        <div style={initialsAvatarStyles}>{getInitials(name)}</div>
      ) : (
        <span style={iconStyles}>👤</span>
      )}

      {status && <div style={statusIndicatorStyles} title={status} />}
    </div>
  );
};

Avatar.displayName = 'Avatar';

/**
 * AvatarGroup - Display multiple avatars stacked
 */

interface AvatarGroupProps {
  /** Array of avatars to display */
  avatars: Array<Omit<AvatarProps, 'size'>>;

  /** Size of all avatars */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Maximum avatars to show before '+X more' */
  max?: number;

  /** CSS class name */
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = 'md',
  max = 3,
  className = '',
}) => {
  const sizeMap: Record<string, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  const avatarSize = sizeMap[size];
  const overlapOffset = avatarSize * 0.3;

  const groupStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: `${-overlapOffset}px`,
  };

  const moreAvatarStyles: React.CSSProperties = {
    width: `${avatarSize}px`,
    height: `${avatarSize}px`,
    borderRadius: borderRadius.full,
    backgroundColor: colors['neutral-200'],
    color: colors['neutral-600'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size === 'xs' ? '10px' : size === 'sm' ? '12px' : '14px',
    fontWeight: 600,
    border: `2px solid ${colors['neutral-white']}`,
  };

  const displayAvatars = avatars.slice(0, max);
  const moreCount = avatars.length - max;

  return (
    <div style={groupStyles} className={className}>
      {displayAvatars.map((avatar, index) => (
        <div key={index} style={{ position: 'relative', zIndex: displayAvatars.length - index }}>
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {moreCount > 0 && <div style={moreAvatarStyles}>+{moreCount}</div>}
    </div>
  );
};

AvatarGroup.displayName = 'AvatarGroup';
