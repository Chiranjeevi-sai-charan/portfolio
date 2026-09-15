import React, { useState } from 'react';
import { colors, spacing, typography, borderRadius, shadows } from '../../styles/sage/tokens';
import { Button } from './Button';
import { Select } from './Select';
import { Input } from './Input';
import { Document, documentStorage } from '../../utils/storage';
import { MaterialIcon } from './MaterialIcon';
import { useToast } from './ToastProvider';
import { t, Lang } from '../../utils/sageStrings';

interface DocumentUploadProps {
  departments: string[];
  contentTypes: string[];
  sensitivities: string[];
  onUploadSuccess?: (doc: Document) => void;
  /** When set, the department field is locked to this value (e.g. an Admin uploading for their own department) */
  lockedDepartment?: string;
  /** Who to record as the uploader */
  uploadedBy?: string;
  language?: Lang;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  departments,
  contentTypes,
  sensitivities,
  onUploadSuccess,
  lockedDepartment,
  uploadedBy,
  language,
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState(lockedDepartment || '');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSensitivity, setSelectedSensitivity] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { showToast } = useToast();

  const containerStyles: React.CSSProperties = {
    padding: spacing.lg,
    backgroundColor: 'transparent',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h3'],
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.md,
    color: colors['neutral-900'],
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-600'],
    marginBottom: spacing.lg,
  };

  const formRowStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  };

  const UPLOAD_PANEL_HEIGHT = '220px';

  const uploadRowStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'stretch',
  };

  const dropzoneStyles: React.CSSProperties = {
    height: UPLOAD_PANEL_HEIGHT,
    border: `2px dashed ${isDragging ? colors['neutral-900'] : colors['neutral-300']}`,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    textAlign: 'center',
    backgroundColor: isDragging ? colors['neutral-100'] : colors['neutral-50'],
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const dropzoneContentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
  };

  const iconStyles: React.CSSProperties = {
    fontSize: '48px',
  };

  const dropzoneTextStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-md'],
    fontWeight: typography.fontWeight.medium,
    color: colors['neutral-900'],
  };

  const supportedFormatsStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-500'],
    marginTop: spacing.md,
  };

  const buttonGroupStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing.md,
    marginTop: spacing.md,
    justifyContent: 'flex-end',
  };

  const dropzoneColumnStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const fileListPanelStyles: React.CSSProperties = {
    height: UPLOAD_PANEL_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${colors['neutral-200']}`,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  };

  const fileListHeaderStyles: React.CSSProperties = {
    fontSize: typography.fontSize['label-md'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
    padding: `${spacing.sm} ${spacing.md}`,
    borderBottom: `1px solid ${colors['neutral-200']}`,
    backgroundColor: colors['neutral-50'],
    flexShrink: 0,
  };

  const fileListBodyStyles: React.CSSProperties = {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const fileListEmptyStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-500'],
    textAlign: 'center',
    padding: spacing.lg,
  };

  const fileRowStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.sm} ${spacing.md}`,
    borderBottom: `1px solid ${colors['neutral-100']}`,
    backgroundColor: colors['neutral-white'],
    flexShrink: 0,
  };

  const fileRowNameStyles: React.CSSProperties = {
    flex: 1,
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-900'],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const fileRowSizeStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-xs'],
    color: colors['neutral-500'],
    flexShrink: 0,
  };

  const fileRowRemoveStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    border: 'none',
    borderRadius: borderRadius.sm,
    background: 'transparent',
    color: colors['neutral-500'],
    cursor: 'pointer',
    flexShrink: 0,
  };

  const fileIconMap: Record<string, string> = {
    pdf: 'picture_as_pdf',
    docx: 'description',
    doc: 'description',
    xlsx: 'table_chart',
    pptx: 'slideshow',
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  const addFiles = (files: FileList | File[]) => {
    setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
  };

  const handleUpload = () => {
    if (
      selectedFiles.length === 0 ||
      !selectedDepartment ||
      !selectedType ||
      !selectedSensitivity ||
      !documentDate
    ) {
      showToast('Please fill all fields, choose a document date, and select at least one file', 'warning');
      return;
    }

    selectedFiles.forEach((file) => {
      // Uploading a file with the same name for this department retires the older active version
      documentStorage.archiveOlderVersions(file.name, selectedDepartment, documentDate);

      const newDoc: Document = {
        id: `doc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        name: file.name,
        type: file.name.split('.').pop() || 'unknown',
        contentType: selectedType,
        department: selectedDepartment,
        sensitivity: selectedSensitivity,
        date: documentDate,
        uploadedBy: uploadedBy || '',
        status: 'active',
        uploadedAt: Date.now(),
      };

      documentStorage.save(newDoc);
      onUploadSuccess?.(newDoc);
    });

    const count = selectedFiles.length;

    // Reset form
    setSelectedFiles([]);
    setSelectedDepartment(lockedDepartment || '');
    setSelectedType('');
    setSelectedSensitivity('');
    setDocumentDate('');

    showToast(`${count} document${count > 1 ? 's' : ''} uploaded successfully`, 'success');
  };

  return (
    <div style={containerStyles}>
      <div style={titleStyles}>{t(language, 'uploadDocumentTitle')}</div>
      <div style={descriptionStyles}>
        {t(language, 'uploadDocumentDesc')}
      </div>

      <div style={formRowStyles}>
        <div>
          <label style={{ display: 'block', marginBottom: spacing.sm, fontWeight: 600 }}>
            {t(language, 'department')}
          </label>
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            disabled={!!lockedDepartment}
            options={[
              { label: t(language, 'selectDepartment'), value: '' },
              ...departments.map((d) => ({ label: d, value: d })),
            ]}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: spacing.sm, fontWeight: 600 }}>
            {t(language, 'contentType')}
          </label>
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            options={[
              { label: t(language, 'selectContentType'), value: '' },
              ...contentTypes.map((ct) => ({ label: ct, value: ct })),
            ]}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: spacing.sm, fontWeight: 600 }}>
            {t(language, 'sensitivityLabel')}
          </label>
          <Select
            value={selectedSensitivity}
            onChange={(e) => setSelectedSensitivity(e.target.value)}
            options={[
              { label: t(language, 'selectSensitivity'), value: '' },
              ...sensitivities.map((s) => ({ label: s, value: s })),
            ]}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: spacing.sm, fontWeight: 600 }}>
            {t(language, 'documentDate')}
          </label>
          <Input
            type="date"
            value={documentDate}
            onChange={(e) => setDocumentDate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </div>
      </div>

      {/* File Upload Area: dropzone + uploaded files, side by side */}
      <div style={uploadRowStyles}>
        <div style={dropzoneColumnStyles}>
          <div
            style={dropzoneStyles}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div style={dropzoneContentStyles}>
              <MaterialIcon name="folder" size={36} color={colors['neutral-400']} />
              <div style={dropzoneTextStyles}>{t(language, 'dragDrop')}</div>
              <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'] }}>
                {t(language, 'or')}
              </div>
              <button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.multiple = true;
                  input.accept = '.pdf,.docx';
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files && files.length > 0) addFiles(files);
                  };
                  input.click();
                }}
                style={{
                  padding: `${spacing.sm} ${spacing.lg}`,
                  backgroundColor: colors['accent-blue'],
                  color: colors['neutral-white'],
                  border: 'none',
                  borderRadius: borderRadius.sm,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: typography.fontSize['body-sm'],
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['accent-blue-hover'];
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['accent-blue'];
                }}
              >
                {t(language, 'browseDocuments')}
              </button>
              <div style={supportedFormatsStyles}>
                {t(language, 'supportedFormats')}
              </div>
            </div>
          </div>

          {/* Action Buttons: right-aligned under the dropzone */}
          <div style={buttonGroupStyles}>
            <Button
              variant="primary"
              onClick={handleUpload}
              disabled={
                selectedFiles.length === 0 ||
                !selectedDepartment ||
                !selectedType ||
                !selectedSensitivity ||
                !documentDate
              }
            >
              {t(language, 'upload')}{selectedFiles.length > 1 ? ` (${selectedFiles.length})` : ''}
            </Button>
          </div>
        </div>

        {/* Selected Documents List */}
        <div style={fileListPanelStyles}>
          <div style={fileListHeaderStyles}>
            {t(language, 'selectedDocuments')(selectedFiles.length)}
          </div>
          <div style={fileListBodyStyles}>
            {selectedFiles.length === 0 ? (
              <div style={fileListEmptyStyles}>
                <MaterialIcon name="draft" size={28} color={colors['neutral-300']} />
                {t(language, 'noDocumentsAdded')}
              </div>
            ) : (
              selectedFiles.map((file, index) => {
                const ext = file.name.split('.').pop()?.toLowerCase() || '';
                return (
                  <div key={`${file.name}-${index}`} style={fileRowStyles}>
                    <MaterialIcon
                      name={fileIconMap[ext] || 'description'}
                      size={20}
                      color={colors['neutral-500']}
                    />
                    <div style={fileRowNameStyles}>{file.name}</div>
                    <div style={fileRowSizeStyles}>{formatFileSize(file.size)}</div>
                    <button
                      style={fileRowRemoveStyles}
                      onClick={() => removeFile(index)}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
                        (e.currentTarget as HTMLButtonElement).style.color = colors['error-red'];
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                        (e.currentTarget as HTMLButtonElement).style.color = colors['neutral-500'];
                      }}
                      title={`Remove ${file.name}`}
                      aria-label={`Remove ${file.name}`}
                    >
                      <MaterialIcon name="close" size={18} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

DocumentUpload.displayName = 'DocumentUpload';
