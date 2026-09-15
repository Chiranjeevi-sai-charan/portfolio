import React from 'react';

interface FileTypeIconProps {
  /** File name, used to infer the extension (e.g. "policy.pdf") */
  fileName: string;
  size?: number;
}

const FILE_SHAPE_PATH =
  'M6 2C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2H6Z';
const FOLD_PATH = 'M13 3.5L18.5 9H14C13.45 9 13 8.55 13 8V3.5Z';

/**
 * Colored file-type icon, matching the familiar red-PDF / blue-Word /
 * green-Excel / orange-PowerPoint convention used by most document tools.
 * Falls back to a neutral generic file glyph for unrecognized extensions.
 */
export const FileTypeIcon: React.FC<FileTypeIconProps> = ({ fileName, size = 20 }) => {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';

  const variants: Record<string, { fill: string; fold: string; label: string; labelSize: number }> = {
    pdf: { fill: '#E5482F', fold: '#F5806A', label: 'PDF', labelSize: 6.5 },
    doc: { fill: '#2B579A', fold: '#5B8AD1', label: 'DOC', labelSize: 6 },
    docx: { fill: '#2B579A', fold: '#5B8AD1', label: 'DOC', labelSize: 6 },
    xls: { fill: '#1D6F42', fold: '#57A97E', label: 'XLS', labelSize: 6 },
    xlsx: { fill: '#1D6F42', fold: '#57A97E', label: 'XLS', labelSize: 6 },
    ppt: { fill: '#D24726', fold: '#E88863', label: 'PPT', labelSize: 6 },
    pptx: { fill: '#D24726', fold: '#E88863', label: 'PPT', labelSize: 6 },
  };

  const variant = variants[ext];

  if (!variant) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={FILE_SHAPE_PATH} fill="#9AA1AC" />
        <path d={FOLD_PATH} fill="#C3C9D1" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={FILE_SHAPE_PATH} fill={variant.fill} />
      <path d={FOLD_PATH} fill={variant.fold} />
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fontSize={variant.labelSize}
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="#FFFFFF"
        letterSpacing="0.2"
      >
        {variant.label}
      </text>
    </svg>
  );
};

FileTypeIcon.displayName = 'FileTypeIcon';
