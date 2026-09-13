import React, { useState } from 'react';
import { colors, spacing, typography, borderRadius, shadows } from '../../styles/sage/tokens';
import { Button } from './Button';
import { Select } from './Select';
import { Input } from './Input';
import { Document, documentStorage } from '../../utils/storage';
import { MaterialIcon } from './MaterialIcon';

interface DocumentUploadProps {
  departments: string[];
  contentTypes: string[];
  sensitivities: string[];
  onUploadSuccess?: (doc: Document) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  departments,
  contentTypes,
  sensitivities,
  onUploadSuccess,
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSensitivity, setSelectedSensitivity] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const containerStyles: React.CSSProperties = {
    padding: spacing.lg,
    backgroundColor: colors['neutral-white'],
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

  const fullWidthStyles: React.CSSProperties = {
    gridColumn: '1 / -1',
  };

  const dropzoneStyles: React.CSSProperties = {
    border: `2px dashed ${isDragging ? colors['sage-green-500'] : colors['neutral-300']}`,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    textAlign: 'center',
    backgroundColor: isDragging ? colors['sage-green-50'] : colors['neutral-50'],
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const dropzoneContentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.md,
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
    marginTop: spacing.lg,
    justifyContent: 'center',
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
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !selectedDepartment || !selectedType || !selectedSensitivity) {
      alert('Please fill all fields and select a file');
      return;
    }

    const newDoc: Document = {
      id: `doc_${Date.now()}`,
      name: selectedFile.name,
      type: selectedFile.name.split('.').pop() || 'unknown',
      department: selectedDepartment,
      sensitivity: selectedSensitivity,
      date: documentDate,
      uploadedBy: 'current.user@motherson.com',
      status: 'active',
      uploadedAt: Date.now(),
    };

    documentStorage.save(newDoc);
    onUploadSuccess?.(newDoc);

    // Reset form
    setSelectedFile(null);
    setSelectedDepartment('');
    setSelectedType('');
    setSelectedSensitivity('');
    setDocumentDate('');

    alert(`Document "${newDoc.name}" uploaded successfully!`);
  };

  return (
    <div style={containerStyles}>
      <div style={titleStyles}>Upload Document</div>
      <div style={descriptionStyles}>
        Upload your documents for AI-powered analysis and insights.
      </div>

      <div style={formRowStyles}>
        <div>
          <label style={{ display: 'block', marginBottom: spacing.sm, fontWeight: 600 }}>
            Department
          </label>
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            options={[
              { label: 'Select Department', value: '' },
              ...departments.map((d) => ({ label: d, value: d })),
            ]}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: spacing.sm, fontWeight: 600 }}>
            Content Type
          </label>
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            options={[
              { label: 'Select a Content Type', value: '' },
              ...contentTypes.map((t) => ({ label: t, value: t })),
            ]}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: spacing.sm, fontWeight: 600 }}>
            Sensitivity
          </label>
          <Select
            value={selectedSensitivity}
            onChange={(e) => setSelectedSensitivity(e.target.value)}
            options={[
              { label: 'Select Sensitivity', value: '' },
              ...sensitivities.map((s) => ({ label: s, value: s })),
            ]}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: spacing.sm, fontWeight: 600 }}>
            Document Date
          </label>
          <Input
            type="date"
            value={documentDate}
            onChange={(e) => setDocumentDate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </div>
      </div>

      {/* File Upload Area */}
      <div
        style={{ ...formRowStyles, ...fullWidthStyles }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div style={{ ...dropzoneStyles, ...fullWidthStyles }}>
          <div style={dropzoneContentStyles}>
            {selectedFile ? (
              <>
                <MaterialIcon name="check_circle" size={48} color={colors['sage-green-500']} />
                <div>
                  <div style={dropzoneTextStyles}>{selectedFile.name}</div>
                  <div style={{ fontSize: '12px', color: colors['neutral-500'], marginTop: spacing.xs }}>
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setSelectedFile(null)}
                  style={{ marginTop: spacing.md }}
                >
                  Change File
                </Button>
              </>
            ) : (
              <>
                <MaterialIcon name="folder" size={48} color={colors['neutral-400']} />
                <div style={dropzoneTextStyles}>Drag & drop files</div>
                <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'] }}>
                  OR
                </div>
                <button
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf,.docx,.xlsx,.pptx';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) setSelectedFile(file);
                    };
                    input.click();
                  }}
                  style={{
                    padding: `${spacing.md} ${spacing.lg}`,
                    backgroundColor: colors['sage-green-500'],
                    color: colors['neutral-white'],
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: typography.fontSize['body-sm'],
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['sage-green-600'];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['sage-green-500'];
                  }}
                >
                  Browse files
                </button>
                <div style={supportedFormatsStyles}>
                  Supported: PDF, DOCX, XLSX, PPTX • Up to 200MB
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={buttonGroupStyles}>
        <Button
          variant="primary"
          onClick={handleUpload}
          disabled={!selectedFile || !selectedDepartment || !selectedType || !selectedSensitivity}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

DocumentUpload.displayName = 'DocumentUpload';
