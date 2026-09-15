import React, { useState, useMemo } from 'react';
import { colors, spacing, typography, borderRadius, statusColors, interactionTints } from '../../styles/sage/tokens';
import { Document } from '../../utils/storage';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Select';
import { MaterialIcon } from './MaterialIcon';
import { FileTypeIcon } from './FileTypeIcon';
import { ConfirmDialog } from './ConfirmDialog';

interface DocumentListProps {
  documents: Document[];
  showSearch?: boolean;
  /** Show a department filter dropdown (useful when documents span multiple departments, e.g. System Admin) */
  showDepartmentFilter?: boolean;
  onDocumentDelete?: (docId: string) => void;
  onDocumentDownload?: (doc: Document) => void;
}

const PAGE_SIZE = 8;

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  showSearch = true,
  showDepartmentFilter = false,
  onDocumentDelete,
  onDocumentDownload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [sensitivityFilter, setSensitivityFilter] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState('');
  const [pendingDeleteDoc, setPendingDeleteDoc] = useState<Document | null>(null);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  const departmentOptions = useMemo(
    () => Array.from(new Set(documents.map((d) => d.department))).sort(),
    [documents]
  );
  const contentTypeOptions = useMemo(
    () => Array.from(new Set(documents.map((d) => d.contentType).filter(Boolean))).sort(),
    [documents]
  );

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = !departmentFilter || doc.department === departmentFilter;
    const matchesSensitivity = !sensitivityFilter || doc.sensitivity === sensitivityFilter;
    const matchesContentType = !contentTypeFilter || doc.contentType === contentTypeFilter;
    return matchesSearch && matchesDepartment && matchesSensitivity && matchesContentType;
  });

  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedDocs = filteredDocs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  React.useEffect(() => {
    setPage(1);
    setSelectedIds(new Set());
  }, [searchQuery, departmentFilter, sensitivityFilter, contentTypeFilter]);

  const pagedIds = useMemo(() => pagedDocs.map((d) => d.id), [pagedDocs]);
  const allOnPageSelected = pagedIds.length > 0 && pagedIds.every((id) => selectedIds.has(id));
  const someOnPageSelected = pagedIds.some((id) => selectedIds.has(id));

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllOnPage = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) {
        pagedIds.forEach((id) => next.delete(id));
      } else {
        pagedIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const selectedDocs = documents.filter((d) => selectedIds.has(d.id));

  const containerStyles: React.CSSProperties = {
    height: '100%',
    padding: spacing.lg,
    backgroundColor: colors['neutral-white'],
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
    gap: spacing.sm,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h3'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
  };

  const tableCardStyles: React.CSSProperties = {
    border: `1px solid ${colors['neutral-200']}`,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  };

  const tableStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as const,
  };

  const theadStyles: React.CSSProperties = {
    backgroundColor: colors['neutral-50'],
    borderBottom: `1px solid ${colors['neutral-200']}`,
  };

  const thStyles: React.CSSProperties = {
    padding: `${spacing.md} ${spacing.md}`,
    textAlign: 'left',
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-600'],
  };

  const tbodyTrStyles: React.CSSProperties = {
    borderBottom: `1px solid ${colors['neutral-100']}`,
    backgroundColor: colors['neutral-white'],
    transition: 'background-color 0.15s ease',
  };

  const tbodyTdStyles: React.CSSProperties = {
    padding: `${spacing.md} ${spacing.md}`,
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-700'],
    verticalAlign: 'middle',
  };

  const paginationBarStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.sm} ${spacing.md}`,
    marginTop: spacing.md,
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-500'],
  };

  const pageButtonStyles = (active: boolean): React.CSSProperties => ({
    minWidth: '28px',
    height: '28px',
    padding: '0 6px',
    borderRadius: borderRadius.sm,
    border: `1px solid ${active ? colors['neutral-900'] : colors['neutral-200']}`,
    backgroundColor: active ? colors['neutral-900'] : colors['neutral-white'],
    color: active ? colors['neutral-white'] : colors['neutral-700'],
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease, color 0.15s ease',
  });

  const iconNavButtonStyles = (disabled: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: borderRadius.sm,
    border: `1px solid ${colors['neutral-200']}`,
    backgroundColor: colors['neutral-white'],
    color: disabled ? colors['neutral-300'] : colors['neutral-700'],
    cursor: disabled ? 'default' : 'pointer',
  });

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

  const checkboxStyles: React.CSSProperties = {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    accentColor: colors['neutral-900'],
  };

  const bulkBarStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: interactionTints.accentSubtle,
    borderBottom: `1px solid ${colors['neutral-200']}`,
    color: colors['neutral-900'],
  };

  const bulkActionButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: `6px ${spacing.sm}`,
    background: 'transparent',
    border: 'none',
    borderRadius: borderRadius.sm,
    color: colors['neutral-700'],
    cursor: 'pointer',
    fontSize: typography.fontSize['body-sm'],
    fontWeight: 600,
    transition: 'background-color 0.15s ease',
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <div style={titleStyles}>Documents ({documents.length})</div>
        <div style={{ display: 'flex', gap: spacing.sm, alignItems: 'center', flexWrap: 'wrap' }}>
          {showDepartmentFilter && departmentOptions.length > 1 && (
            <div style={{ width: '220px' }}>
              <Select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                options={[
                  { label: 'All Departments', value: '' },
                  ...departmentOptions.map((d) => ({ label: d, value: d })),
                ]}
              />
            </div>
          )}
          {contentTypeOptions.length > 1 && (
            <div style={{ width: '200px' }}>
              <Select
                value={contentTypeFilter}
                onChange={(e) => setContentTypeFilter(e.target.value)}
                options={[
                  { label: 'All Content Types', value: '' },
                  ...contentTypeOptions.map((t) => ({ label: t, value: t })),
                ]}
              />
            </div>
          )}
          <div style={{ width: '180px' }}>
            <Select
              value={sensitivityFilter}
              onChange={(e) => setSensitivityFilter(e.target.value)}
              options={[
                { label: 'All Sensitivity', value: '' },
                { label: 'Sensitive', value: 'Sensitive' },
                { label: 'Non-Sensitive', value: 'Non-Sensitive' },
              ]}
            />
          </div>
          {showSearch && (
            <div style={{ width: '220px' }}>
              <Input
                type="search"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {filteredDocs.length === 0 ? (
        <div style={emptyStateStyles}>
          {searchQuery ? 'No documents found matching your search.' : 'No documents uploaded yet.'}
        </div>
      ) : (
        <div style={tableCardStyles}>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyles}>
            {selectedIds.size > 0 ? (
              <thead>
                <tr>
                  <th colSpan={7} style={{ padding: 0, border: 'none' }}>
                    <div style={bulkBarStyles}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                        <input
                          type="checkbox"
                          style={checkboxStyles}
                          checked={allOnPageSelected}
                          ref={(el) => {
                            if (el) el.indeterminate = someOnPageSelected && !allOnPageSelected;
                          }}
                          onChange={toggleAllOnPage}
                          aria-label="Select all on this page"
                        />
                        <span style={{ fontSize: typography.fontSize['body-sm'], fontWeight: 600, color: colors['neutral-900'] }}>
                          {selectedIds.size} selected
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                        {onDocumentDownload && (
                          <button
                            onClick={() => selectedDocs.forEach((doc) => onDocumentDownload(doc))}
                            style={bulkActionButtonStyles}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.backgroundColor = interactionTints.neutralHover;
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                            }}
                          >
                            <MaterialIcon name="download" size={16} />
                            Download
                          </button>
                        )}
                        {onDocumentDelete && (
                          <button
                            onClick={() => setBulkDeleteConfirm(true)}
                            style={{ ...bulkActionButtonStyles, color: colors['error-red'] }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.backgroundColor = interactionTints.dangerHover;
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                            }}
                          >
                            <MaterialIcon name="delete" size={16} />
                            Delete
                          </button>
                        )}
                        <div style={{ width: '1px', height: '20px', backgroundColor: colors['neutral-200'], margin: `0 ${spacing.xs}` }} />
                        <button
                          onClick={() => setSelectedIds(new Set())}
                          style={{ ...bulkActionButtonStyles, color: colors['neutral-500'] }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = interactionTints.neutralHover;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
            ) : (
              <thead style={theadStyles}>
                <tr>
                  <th style={{ ...thStyles, width: '36px' }}>
                    <input
                      type="checkbox"
                      style={checkboxStyles}
                      checked={allOnPageSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someOnPageSelected && !allOnPageSelected;
                      }}
                      onChange={toggleAllOnPage}
                      aria-label="Select all on this page"
                    />
                  </th>
                  <th style={thStyles}>Document</th>
                  <th style={thStyles}>Department</th>
                  <th style={thStyles}>Sensitivity</th>
                  <th style={thStyles}>Last Updated</th>
                  <th style={thStyles}>Uploaded By</th>
                  <th style={thStyles}>Actions</th>
                </tr>
              </thead>
            )}
            <tbody>
              {pagedDocs.map((doc) => (
                <tr
                  key={doc.id}
                  style={tbodyTrStyles}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                      colors['neutral-50'];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                      colors['neutral-white'];
                  }}
                >
                  <td style={tbodyTdStyles}>
                    <input
                      type="checkbox"
                      style={checkboxStyles}
                      checked={selectedIds.has(doc.id)}
                      onChange={() => toggleRow(doc.id)}
                      aria-label={`Select ${doc.name}`}
                    />
                  </td>
                  <td style={tbodyTdStyles}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '30px',
                          height: '30px',
                          borderRadius: borderRadius.sm,
                          backgroundColor: colors['neutral-100'],
                          flexShrink: 0,
                        }}
                      >
                        <FileTypeIcon fileName={doc.name} size={18} />
                      </div>
                      <span style={{ fontWeight: 500, color: colors['neutral-900'] }}>{doc.name}</span>
                    </div>
                  </td>
                  <td style={tbodyTdStyles}>{doc.department}</td>
                  <td style={tbodyTdStyles}>
                    <span
                      style={{
                        padding: '2px 10px',
                        borderRadius: borderRadius.full,
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor:
                          doc.sensitivity === 'Sensitive'
                            ? statusColors.sensitive.bg
                            : statusColors.nonSensitive.bg,
                        color:
                          doc.sensitivity === 'Sensitive'
                            ? statusColors.sensitive.text
                            : statusColors.nonSensitive.text,
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
                        aria-label={`Download ${doc.name}`}
                      >
                        <MaterialIcon name="download" size={18} />
                      </button>
                      {onDocumentDelete && (
                        <button
                          onClick={() => setPendingDeleteDoc(doc)}
                          style={{
                            ...actionButtonStyles,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: colors['error-red'],
                          }}
                          title="Delete"
                          aria-label={`Delete ${doc.name}`}
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
        </div>
      )}

      {totalPages > 1 && (
        <div style={paginationBarStyles}>
          <span>
            Showing {(currentPage - 1) * PAGE_SIZE + 1}
            {'–'}
            {Math.min(currentPage * PAGE_SIZE, filteredDocs.length)} of {filteredDocs.length}
          </span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <button
              style={iconNavButtonStyles(currentPage === 1)}
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              <MaterialIcon name="chevron_left" size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} style={pageButtonStyles(p === currentPage)} onClick={() => setPage(p)}>
                {p}
              </button>
            ))}
            <button
              style={iconNavButtonStyles(currentPage === totalPages)}
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
            >
              <MaterialIcon name="chevron_right" size={16} />
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!pendingDeleteDoc}
        title="Delete Document"
        message={`Delete "${pendingDeleteDoc?.name}"? It will be moved to Deleted Documents, where it can be restored.`}
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteDoc) onDocumentDelete?.(pendingDeleteDoc.id);
          setPendingDeleteDoc(null);
        }}
        onCancel={() => setPendingDeleteDoc(null)}
      />

      <ConfirmDialog
        isOpen={bulkDeleteConfirm}
        title="Delete Documents"
        message={`Delete ${selectedIds.size} selected document${selectedIds.size === 1 ? '' : 's'}? They will be moved to Deleted Documents, where they can be restored.`}
        confirmLabel="Delete"
        onConfirm={() => {
          selectedDocs.forEach((doc) => onDocumentDelete?.(doc.id));
          setSelectedIds(new Set());
          setBulkDeleteConfirm(false);
        }}
        onCancel={() => setBulkDeleteConfirm(false)}
      />
    </div>
  );
};

DocumentList.displayName = 'DocumentList';
