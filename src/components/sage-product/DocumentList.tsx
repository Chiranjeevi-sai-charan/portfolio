import React, { useState } from 'react';
import { colors, spacing, typography, borderRadius } from '../../styles/sage/tokens';
import { Document, documentStorage } from '../../utils/storage';
import { Input } from './Input';
import { Button } from './Button';
import { MaterialIcon } from './MaterialIcon';

interface DocumentListProps {
  documents: Document[];
  showSearch?: boolean;
  onDocumentDelete?: (docId: string) => void;
  onDocumentArchive?: (docId: string) => void;
  onDocumentDownload?: (doc: Document) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  showSearch = true,
  onDocumentDelete,
  onDocumentArchive,
  onDocumentDownload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerStyles: React.CSSProperties = {
    padding: spacing.lg,
    backgroundColor: colors['neutral-white'],
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h3'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
  };

  const tableStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  };

  const theadStyles: React.CSSProperties = {
    backgroundColor: colors['neutral-100'],
    borderBottom: `2px solid ${colors['neutral-200']}`,
  };

  const thStyles: React.CSSProperties = {
    padding: spacing.md,
    textAlign: 'left',
    fontSize: typography.fontSize['label-md'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
  };

  const tbodyTrStyles: React.CSSProperties = {
    borderBottom: `1px solid ${colors['neutral-200']}`,
    transition: 'background-color 0.2s ease',
  };

  const tbodyTdStyles: React.CSSProperties = {
    padding: spacing.md,
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-700'],
  };

  const fileIconMap: Record<string, string> = {
    pdf: 'picture_as_pdf',
    docx: 'description',
    xlsx: 'table_chart',
    pptx: 'slideshow',
    default: 'folder',
  };

  const getFileIcon = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase() || 'default';
    return fileIconMap[ext] || fileIconMap['default'];
  };

  const actionButtonStyles: React.CSSProperties = {
    padding: '4px 8px',
    margin: '0 4px',
    fontSize: '12px',
    minHeight: 'auto',
  };

  const emptyStateStyles: React.CSSProperties = {
    textAlign: 'center',
    padding: spacing.xl,
    color: colors['neutral-500'],
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <div style={titleStyles}>Uploaded Files ({documents.length})</div>
        {showSearch && (
          <div style={{ width: '300px' }}>
            <Input
              type="search"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>

      {filteredDocs.length === 0 ? (
        <div style={emptyStateStyles}>
          {searchQuery ? 'No documents found matching your search.' : 'No documents uploaded yet.'}
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyles}>
            <thead style={theadStyles}>
              <tr>
                <th style={thStyles}>File</th>
                <th style={thStyles}>Department</th>
                <th style={thStyles}>Sensitivity</th>
                <th style={thStyles}>Last Updated</th>
                <th style={thStyles}>Uploaded By</th>
                <th style={thStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr
                  key={doc.id}
                  style={tbodyTrStyles}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                      colors['neutral-50'];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={tbodyTdStyles}>
                    <MaterialIcon
                      name={getFileIcon(doc.name)}
                      size={18}
                      color={colors['neutral-500']}
                      style={{ verticalAlign: 'middle', marginRight: spacing.sm }}
                    />
                    {doc.name}
                  </td>
                  <td style={tbodyTdStyles}>{doc.department}</td>
                  <td style={tbodyTdStyles}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: borderRadius.full,
                        fontSize: '11px',
                        backgroundColor:
                          doc.sensitivity === 'Sensitive'
                            ? colors['error-red']
                            : colors['success-green'],
                        color: colors['neutral-white'],
                        display: 'inline-block',
                      }}
                    >
                      {doc.sensitivity}
                    </span>
                  </td>
                  <td style={tbodyTdStyles}>
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </td>
                  <td style={tbodyTdStyles}>{doc.uploadedBy.split('@')[0]}</td>
                  <td style={tbodyTdStyles}>
                    <div style={{ display: 'flex', gap: spacing.sm }}>
                      <button
                        onClick={() => onDocumentDownload?.(doc)}
                        style={{
                          ...actionButtonStyles,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: colors['accent-blue'],
                        }}
                        title="Download"
                      >
                        <MaterialIcon name="download" size={18} />
                      </button>
                      {onDocumentArchive && (
                        <button
                          onClick={() => onDocumentArchive?.(doc.id)}
                          style={{
                            ...actionButtonStyles,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: colors['warning-amber'],
                          }}
                          title="Archive"
                        >
                          <MaterialIcon name="archive" size={18} />
                        </button>
                      )}
                      {onDocumentDelete && (
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${doc.name}"?`)) {
                              onDocumentDelete?.(doc.id);
                            }
                          }}
                          style={{
                            ...actionButtonStyles,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: colors['error-red'],
                          }}
                          title="Delete"
                        >
                          <MaterialIcon name="delete" size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

DocumentList.displayName = 'DocumentList';
