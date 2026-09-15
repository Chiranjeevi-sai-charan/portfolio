import React from 'react';
import { colors, fileTypeColors } from '../../styles/sage/tokens';

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

  const labels: Record<string, { label: string; labelSize: number }> = {
    pdf: { label: 'PDF', labelSize: 6.5 },
    doc: { label: 'DOC', labelSize: 6 },
    docx: { label: 'DOC', labelSize: 6 },
    xls: { label: 'XLS', labelSize: 6 },
    xlsx: { label: 'XLS', labelSize: 6 },
    ppt: { label: 'PPT', labelSize: 6 },
    pptx: { label: 'PPT', labelSize: 6 },
  };

  const colorVariant = fileTypeColors[ext as keyof typeof fileTypeColors];
  const labelVariant = labels[ext];

  if (!colorVariant || !labelVariant) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={FILE_SHAPE_PATH} fill={fileTypeColors.default.fill} />
        <path d={FOLD_PATH} fill={fileTypeColors.default.fold} />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={FILE_SHAPE_PATH} fill={colorVariant.fill} />
      <path d={FOLD_PATH} fill={colorVariant.fold} />
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fontSize={labelVariant.labelSize}
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
        fill={colors['neutral-white']}
        letterSpacing="0.2"
      >
        {labelVariant.label}
      </text>
    </svg>
  );
};

FileTypeIcon.displayName = 'FileTypeIcon';
