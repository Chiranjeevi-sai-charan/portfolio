import React from 'react';
import { colors, spacing, typography, borderRadius, shadows } from '../../styles/sage/tokens';
import { MaterialIcon } from './MaterialIcon';
import { getMockDocument } from '../../utils/mockDocuments';
import { Language } from '../../utils/mockAIResponses';
import { useToast } from './ToastProvider';

/**
 * DocumentPanel Component
 *
 * A slide-in panel (right edge, full height) that shows the source
 * document for a citation, with the specific excerpt the answer was
 * drawn from highlighted in light yellow — similar to jumping straight
 * to the relevant passage in a real document viewer.
 *
 * Note: this is a demo — there's no real backend document store, so the
 * "document" shown is realistic mock policy text rather than an actual
 * PDF file.
 *
 * @component
 * @example
 * <DocumentPanel citation="Company Handbook - Time Off Policy" onClose={() => setOpen(false)} />
 */

interface DocumentPanelProps {
  /** Citation name to look up mock content for. Panel is hidden when null. */
  citation: string | null;
  onClose: () => void;
  /** Language to render the source document in */
  language?: Language;
}

export const DocumentPanel: React.FC<DocumentPanelProps> = ({ citation, onClose, language = 'en' }) => {
  const isOpen = !!citation;
  const doc = citation ? getMockDocument(citation, language) : null;
  const { showToast } = useToast();
  const isJa = language === 'ja';

  const handleDownload = () => {
    if (!doc) return;
    showToast(
      isJa ? `"${doc.title}.pdf" をダウンロード中...` : `Downloading "${doc.title}.pdf"...`,
      'info'
    );
  };

  const overlayStyles: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: 'opacity 0.2s ease',
    zIndex: 40,
  };

  const panelStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 'min(520px, 100%)',
    backgroundColor: colors['neutral-50'],
    borderLeft: `1px solid ${colors['neutral-200']}`,
    boxShadow: shadows.xl,
    display: 'flex',
    flexDirection: 'column',
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.25s ease',
    zIndex: 41,
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottom: `1px solid ${colors['neutral-200']}`,
    backgroundColor: colors['neutral-white'],
    flexShrink: 0,
  };

  const headerTitleStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    fontSize: typography.fontSize['body-md'],
    fontWeight: typography.fontWeight.semibold,
    color: colors['neutral-900'],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const closeButtonStyles: React.CSSProperties = {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: borderRadius.md,
    background: 'transparent',
    color: colors['neutral-600'],
    cursor: 'pointer',
    flexShrink: 0,
  };

  const bodyStyles: React.CSSProperties = {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    padding: spacing.xl,
  };

  const pageStyles: React.CSSProperties = {
    backgroundColor: colors['neutral-white'],
    border: `1px solid ${colors['neutral-200']}`,
    borderRadius: borderRadius.md,
    boxShadow: shadows.sm,
    padding: spacing.xl,
    maxWidth: '480px',
    margin: '0 auto',
  };

  const paragraphStyles = (highlighted: boolean): React.CSSProperties => ({
    fontSize: typography.fontSize['body-md'],
    lineHeight: 1.7,
    color: colors['neutral-800'] || colors['neutral-900'],
    marginBottom: spacing.lg,
    backgroundColor: highlighted ? colors['highlight-yellow-bg'] : 'transparent',
    padding: highlighted ? spacing.sm : 0,
    borderRadius: highlighted ? borderRadius.sm : 0,
    boxShadow: highlighted ? `0 0 0 1px ${colors['highlight-yellow-border']}` : 'none',
  });

  const firstParagraphStyles: React.CSSProperties = {
    fontSize: typography.fontSize['h4'],
    fontWeight: typography.fontWeight.bold,
    color: colors['neutral-900'],
    marginBottom: spacing.lg,
  };

  const footerNoteStyles: React.CSSProperties = {
    fontSize: typography.fontSize['body-xs'],
    color: colors['neutral-500'],
    textAlign: 'center',
    marginTop: spacing.lg,
  };

  return (
    <>
      <div style={overlayStyles} onClick={onClose} />
      <div style={panelStyles} role="dialog" aria-label="Source document viewer">
        <div style={headerStyles}>
          <div style={headerTitleStyles}>
            <MaterialIcon name="description" size={20} color={colors['neutral-700']} />
            <span>{doc?.title || ''}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, flexShrink: 0 }}>
            <button
              style={closeButtonStyles}
              onClick={handleDownload}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }}
              title={isJa ? 'PDFをダウンロード' : 'Download PDF'}
              aria-label={isJa ? 'PDFをダウンロード' : 'Download PDF'}
            >
              <MaterialIcon name="download" size={20} />
            </button>
            <button
              style={closeButtonStyles}
              onClick={onClose}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }}
              title={isJa ? '閉じる' : 'Close'}
              aria-label={isJa ? '閉じる' : 'Close document viewer'}
            >
              <MaterialIcon name="close" size={20} />
            </button>
          </div>
        </div>

        <div style={bodyStyles}>
          {doc && (
            <div style={pageStyles}>
              {doc.paragraphs.map((p, idx) =>
                idx === 0 ? (
                  <div key={idx} style={firstParagraphStyles}>
                    {p}
                  </div>
                ) : (
                  <div key={idx} style={paragraphStyles(idx === doc.highlightIndex)}>
                    {p}
                  </div>
                )
              )}
              <div style={footerNoteStyles}>
                {isJa
                  ? 'ハイライトされた箇所がアシスタントの回答の出典です。'
                  : "Highlighted passage is the source for the assistant's answer."}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

DocumentPanel.displayName = 'DocumentPanel';
