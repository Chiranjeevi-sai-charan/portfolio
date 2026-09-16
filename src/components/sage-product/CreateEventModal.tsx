import React, { useState } from 'react';
import { spacing, typography, colors, borderRadius } from '../../styles/sage/tokens';
import { Modal } from './Modal';
import { Input } from './Input';
import { useToast } from './ToastProvider';
import { Language } from '../../utils/mockAIResponses';

const STRINGS = {
  en: {
    title: 'Schedule Awareness Session',
    cancel: 'Cancel',
    downloadIcs: 'Download .ics',
    addToOutlook: 'Add to Outlook',
    subject: 'Subject',
    start: 'Start',
    duration: 'Duration (minutes)',
    description: 'Description',
    helperText: '"Add to Outlook" opens a pre-filled event in Outlook Web (using your current sign-in). "Download .ics" works with any calendar app, including Teams meetings.',
    openingOutlook: 'Opening Outlook to create the invite...',
    icsDownloaded: '.ics file downloaded. Import it into Outlook, Teams, or Google Calendar',
  },
  ja: {
    title: '説明会を予定する',
    cancel: 'キャンセル',
    downloadIcs: '.icsをダウンロード',
    addToOutlook: 'Outlookに追加',
    subject: '件名',
    start: '開始日時',
    duration: '所要時間（分）',
    description: '説明',
    helperText: '「Outlookに追加」では、現在サインイン中のOutlook Webに入力済みの予定が開きます。「.icsをダウンロード」はTeams会議を含む、あらゆるカレンダーアプリで利用できます。',
    openingOutlook: 'Outlookで招待状を作成しています...',
    icsDownloaded: '.icsファイルをダウンロードしました。Outlook、Teams、Googleカレンダーにインポートしてください。',
  },
};

/**
 * CreateEventModal Component
 *
 * Lets a System Admin turn an AI Insights suggestion (e.g. "run an awareness
 * session on Vacation Policy") directly into a calendar invite — either an
 * Outlook Web deep link (no auth handled here; opens in the admin's own
 * logged-in Outlook) or a downloadable .ics file that works with any
 * calendar app, including Outlook and Google Calendar, and can carry a
 * Teams meeting note in the body.
 *
 * @component
 */

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject: string;
  defaultBody: string;
  language?: Language;
}

const toLocalInputValue = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const defaultStart = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  d.setHours(11, 0, 0, 0);
  return d;
};

const toICSDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  defaultSubject,
  defaultBody,
  language = 'en',
}) => {
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);
  const [start, setStart] = useState(toLocalInputValue(defaultStart()));
  const [durationMinutes, setDurationMinutes] = useState(30);
  const { showToast } = useToast();
  const t = STRINGS[language];

  React.useEffect(() => {
    if (isOpen) {
      setSubject(defaultSubject);
      setBody(defaultBody);
      setStart(toLocalInputValue(defaultStart()));
      setDurationMinutes(30);
    }
  }, [isOpen, defaultSubject, defaultBody]);

  const getStartEndDates = () => {
    const startDate = new Date(start);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    return { startDate, endDate };
  };

  const handleAddToOutlook = () => {
    const { startDate, endDate } = getStartEndDates();
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject,
      body,
      location: 'Microsoft Teams Meeting',
      startdt: startDate.toISOString(),
      enddt: endDate.toISOString(),
    });
    window.open(`https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`, '_blank', 'noopener,noreferrer');
    showToast(t.openingOutlook, 'info');
  };

  const handleDownloadICS = () => {
    const { startDate, endDate } = getStartEndDates();
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sage//Awareness Session//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@sage-hr-assistant`,
      `DTSTAMP:${toICSDate(new Date())}`,
      `DTSTART:${toICSDate(startDate)}`,
      `DTEND:${toICSDate(endDate)}`,
      `SUMMARY:${subject}`,
      `DESCRIPTION:${body.replace(/\n/g, '\\n')}`,
      'LOCATION:Microsoft Teams Meeting',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject.replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'awareness-session'}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(t.icsDownloaded, 'success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      language={language}
      title={t.title}
      size="sm"
      actions={[
        { label: t.cancel, variant: 'secondary', onClick: onClose },
        { label: t.downloadIcs, variant: 'secondary', onClick: handleDownloadICS },
        { label: t.addToOutlook, variant: 'primary', onClick: handleAddToOutlook },
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        <Input label={t.subject} value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Input
          label={t.start}
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <Input
          label={t.duration}
          type="number"
          min={15}
          step={15}
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(Number(e.target.value) || 30)}
        />
        <div>
          <label style={{ display: 'block', marginBottom: spacing.sm, fontWeight: 600, fontSize: typography.fontSize['body-sm'], color: colors['neutral-900'] }}>
            {t.description}
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: spacing.sm,
              border: `1px solid ${colors['neutral-300']}`,
              borderRadius: borderRadius.md,
              fontFamily: typography.fontFamily.primary,
              fontSize: typography.fontSize['body-sm'],
              color: colors['neutral-900'],
              resize: 'vertical',
            }}
          />
        </div>
        <div style={{ fontSize: typography.fontSize['body-xs'], color: colors['neutral-500'] }}>
          {t.helperText}
        </div>
      </div>
    </Modal>
  );
};

CreateEventModal.displayName = 'CreateEventModal';
