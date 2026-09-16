import React, { useState, useMemo } from 'react';
import { colors, spacing, typography, borderRadius, statusColors, interactionTints } from '../../styles/sage/tokens';
import { Document } from '../../utils/storage';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Select';
import { MaterialIcon } from './MaterialIcon';
import { FileTypeIcon } from './FileTypeIcon';
import { ConfirmDialog } from './ConfirmDialog';
import { IconButton } from './IconButton';
import { Badge } from './Badge';
import { t, Lang } from '../../utils/sageStrings';

interface DocumentListProps {
  documents: Document[];
  showSearch?: boolean;
  /** Show a department filter dropdown (useful when documents span multiple departments, e.g. System Admin) */
  showDepartmentFilter?: boolean;
  onDocumentDelete?: (docId: string) => void;
  onDocumentDownload?: (doc: Document) => void;
  language?: Lang;
}

const PAGE_SIZE = 8;

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  showSearch = true,
  showDepartmentFilter = false,
  onDocumentDelete,
  onDocumentDownload,
  language,
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
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    padding: spacing.lg,
    backgroundColor: 'transparent',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    flexShrink: 0,
    marginBottom: spacing.lg,
  };

  const scrollAreaStyles: React.CSSProperties = {
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
  };

  // Shared column template for the header row and every body row, so they
  // stay aligned without relying on native <table> layout. A native
  // <table>'s position:sticky <thead> has a persistent Chromium rendering
  // bug in this scroll setup (tbody rows paint through above the stuck
  // header) that survives every standard CSS mitigation, so the header is
  // built as a separate sticky div instead of living inside the table.
  const GRID_TEMPLATE_COLUMNS = '36px minmax(200px, 2fr) 160px 130px 110px 130px 96px';

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h3'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
  };

  const tableCardStyles: React.CSSProperties = {
    border: `1px solid ${colors['neutral-200']}`,
    borderRadius: borderRadius.md,
  };

  const headerRowStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
    alignItems: 'center',
  };

  const thStyles: React.CSSProperties = {
    padding: `${spacing.md} ${spacing.md}`,
    textAlign: 'left',
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-600'],
    backgroundColor: colors['neutral-50'],
  };

  const tbodyTrStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
    alignItems: 'center',
    borderBottom: `1px solid ${colors['neutral-100']}`,
    backgroundColor: colors['neutral-white'],
    transition: 'background-color 0.15s ease',
  };

  const tbodyTdStyles: React.CSSProperties = {
    padding: `${spacing.md} ${spacing.md}`,
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-700'],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const paginationBarStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.sm} ${spacing.md}`,
    marginTop: spacing.md,
    flexShrink: 0,
    fontSize: typography.fontSize['body-sm'],
    color: colors['neutral-500'],
  };

  const pageButtonStyles = (active: boolean): React.CSSProperties => ({
    minWidth: '28px',
    height: '28px',
    padding: '0 6px',
    borderRadius: borderRadius.sm,
    border: `1px solid ${active ? colors['accent-blue'] : colors['neutral-200']}`,
    backgroundColor: active ? colors['accent-blue'] : colors['neutral-white'],
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
    padding: `${spacing['3xl']} ${spacing.xl}`,
    color: colors['neutral-500'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
  };

  const emptyStateIconWrapStyles: React.CSSProperties = {
    width: '56px',
    height: '56px',
    borderRadius: borderRadius.full,
    backgroundColor: interactionTints.accentSubtle,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  };

  const checkboxStyles: React.CSSProperties = {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    accentColor: colors['accent-blue'],
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
        <div style={titleStyles}>{t(language, 'documentsCount')(documents.length)}</div>
        <div style={{ display: 'flex', gap: spacing.sm, alignItems: 'center', flexWrap: 'wrap' }}>
          {showDepartmentFilter && departmentOptions.length > 1 && (
            <div style={{ width: '220px' }}>
              <Select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                options={[
                  { label: t(language, 'allDepartments'), value: '' },
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
                  { label: t(language, 'allContentTypes'), value: '' },
                  ...contentTypeOptions.map((ct) => ({ label: ct, value: ct })),
                ]}
              />
            </div>
          )}
          <div style={{ width: '180px' }}>
            <Select
              value={sensitivityFilter}
              onChange={(e) => setSensitivityFilter(e.target.value)}
              options={[
                { label: t(language, 'allSensitivity'), value: '' },
                { label: t(language, 'sensitive'), value: 'Sensitive' },
                { label: t(language, 'nonSensitive'), value: 'Non-Sensitive' },
              ]}
            />
          </div>
          {showSearch && (
            <div style={{ width: '220px' }}>
              <Input
                type="search"
                placeholder={t(language, 'searchDocuments')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {filteredDocs.length === 0 ? (
        <div style={emptyStateStyles}>
          <div style={emptyStateIconWrapStyles}>
            <MaterialIcon name={searchQuery ? 'search_off' : 'folder_open'} size={26} color={colors['accent-blue']} />
          </div>
          {searchQuery ? t(language, 'noDocumentsFound') : t(language, 'noDocumentsUploaded')}
        </div>
      ) : (
        <div style={scrollAreaStyles}>
        <div style={tableCardStyles} role="table" aria-label={t(language, 'documentColumn')}>
          <div style={{ position: 'sticky', top: 0, zIndex: 2, borderBottom: `1px solid ${colors['neutral-200']}`, backgroundColor: colors['neutral-white'] }}>
            {selectedIds.size > 0 && (
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
                    aria-label={t(language, 'selectAllOnPage')}
                  />
                  <span style={{ fontSize: typography.fontSize['body-sm'], fontWeight: 600, color: colors['neutral-900'] }}>
                    {t(language, 'selectedCount')(selectedIds.size)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: spacing.xs, alignItems: 'center' }}>
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
                      {t(language, 'download')}
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
                      {t(language, 'delete')}
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
                    {t(language, 'clear')}
                  </button>
                </div>
              </div>
            )}
            <div style={headerRowStyles} role="row">
              <div style={thStyles} role="columnheader">
                <input
                  type="checkbox"
                  style={checkboxStyles}
                  checked={allOnPageSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someOnPageSelected && !allOnPageSelected;
                  }}
                  onChange={toggleAllOnPage}
                  aria-label={t(language, 'selectAllOnPage')}
                />
              </div>
              <div style={thStyles} role="columnheader">{t(language, 'documentColumn')}</div>
              <div style={thStyles} role="columnheader">{t(language, 'departmentColumn')}</div>
              <div style={thStyles} role="columnheader">{t(language, 'sensitivityColumn')}</div>
              <div style={thStyles} role="columnheader">{t(language, 'lastUpdatedColumn')}</div>
              <div style={thStyles} role="columnheader">{t(language, 'uploadedByColumn')}</div>
              <div style={thStyles} role="columnheader">{t(language, 'actionsColumn')}</div>
            </div>
          </div>
          <div role="rowgroup">
            {pagedDocs.map((doc) => (
              <div
                key={doc.id}
                style={tbodyTrStyles}
                role="row"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    colors['neutral-50'];
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    colors['neutral-white'];
                }}
              >
                <div style={tbodyTdStyles} role="cell">
                  <input
                    type="checkbox"
                    style={checkboxStyles}
                    checked={selectedIds.has(doc.id)}
                    onChange={() => toggleRow(doc.id)}
                    aria-label={`Select ${doc.name}`}
                  />
                </div>
                <div style={tbodyTdStyles} role="cell">
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: borderRadius.sm,
                        backgroundColor: colors['neutral-100'],
                        flexShrink: 0,
                      }}
                    >
                      <FileTypeIcon fileName={doc.name} size={18} />
                    </div>
                    <span style={{ fontWeight: 500, color: colors['neutral-900'] }}>{doc.name}</span>
                  </div>
                </div>
                <div style={tbodyTdStyles} role="cell">{doc.department}</div>
                <div style={tbodyTdStyles} role="cell">
                  <Badge
                    size="sm"
                    backgroundColor={doc.sensitivity === 'Sensitive' ? statusColors.sensitive.bg : statusColors.nonSensitive.bg}
                    color={doc.sensitivity === 'Sensitive' ? statusColors.sensitive.text : statusColors.nonSensitive.text}
                  >
                    {doc.sensitivity === 'Sensitive' ? t(language, 'sensitive') : t(language, 'nonSensitive')}
                  </Badge>
                </div>
                <div style={tbodyTdStyles} role="cell">
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </div>
                <div style={tbodyTdStyles} role="cell">{doc.uploadedBy.split('@')[0]}</div>
                <div style={tbodyTdStyles} role="cell">
                  <div style={{ display: 'flex', gap: spacing.sm }}>
                    <IconButton
                      onClick={() => onDocumentDownload?.(doc)}
                      color={colors['accent-blue']}
                      hoverBackgroundColor={interactionTints.accentSoft}
                      title={t(language, 'download')}
                      aria-label={`${t(language, 'download')} ${doc.name}`}
                    >
                      <MaterialIcon name="download" size={18} />
                    </IconButton>
                    {onDocumentDelete && (
                      <IconButton
                        onClick={() => setPendingDeleteDoc(doc)}
                        color={colors['error-red']}
                        hoverBackgroundColor={interactionTints.dangerHover}
                        title={t(language, 'delete')}
                        aria-label={`${t(language, 'delete')} ${doc.name}`}
                      >
                        <MaterialIcon name="delete" size={18} />
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      )}

      {totalPages > 1 && (
        <div style={paginationBarStyles}>
          <span>
            {t(language, 'showingRange')(
              (currentPage - 1) * PAGE_SIZE + 1,
              Math.min(currentPage * PAGE_SIZE, filteredDocs.length),
              filteredDocs.length
            )}
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
        language={language}
        cancelLabel={t(language, 'cancel')}
        isOpen={!!pendingDeleteDoc}
        title={t(language, 'deleteDocumentTitle')}
        message={t(language, 'deleteDocumentMsg')(pendingDeleteDoc?.name)}
        confirmLabel={t(language, 'delete')}
        onConfirm={() => {
          if (pendingDeleteDoc) onDocumentDelete?.(pendingDeleteDoc.id);
          setPendingDeleteDoc(null);
        }}
        onCancel={() => setPendingDeleteDoc(null)}
      />

      <ConfirmDialog
        language={language}
        cancelLabel={t(language, 'cancel')}
        isOpen={bulkDeleteConfirm}
        title={t(language, 'deleteDocumentsTitle')}
        message={t(language, 'deleteDocumentsMsg')(selectedIds.size)}
        confirmLabel={t(language, 'delete')}
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
