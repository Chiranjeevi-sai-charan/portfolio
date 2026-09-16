import React, { useMemo, useState } from 'react';
import { colors, spacing, typography, borderRadius, shadows, interactionTints, chartPalette } from '../../styles/sage/tokens';
import { MaterialIcon } from './MaterialIcon';
import { BarChart, DonutChart, RadarChart, Sparkline } from './Charts';
import { CreateEventModal } from './CreateEventModal';
import { analyticsStorage } from '../../utils/storage';
import { TOPIC_LABELS, localizeTopic, localizeCitation, Language } from '../../utils/mockAIResponses';

/**
 * AnalyticsDashboard Component
 *
 * System-Admin-only view of chatbot usage. By design, the user's raw
 * question text is never stored anywhere — only the matched topic
 * category and which documents were cited, so this dashboard can surface
 * real usage patterns without capturing anything sensitive someone typed.
 *
 * @component
 */

interface AnalyticsDashboardProps {
  onBackToChat: () => void;
  language: Language;
}

type DateRange = '7d' | '30d' | 'all';
type RoleFilterKey = 'user' | 'admin' | 'system-admin';

const ROLE_FILTER_OPTIONS: { key: RoleFilterKey; label: string; color: string }[] = [
  { key: 'user', label: 'Employee', color: chartPalette.blue },
  { key: 'admin', label: 'Admin', color: chartPalette.amber },
  { key: 'system-admin', label: 'System Admin', color: chartPalette.slate },
];

const TOPIC_COLOR_ORDER = [
  chartPalette.blue,
  chartPalette.green,
  chartPalette.amber,
  chartPalette.cyan,
  chartPalette.purple,
  chartPalette.pink,
  chartPalette.teal,
  colors['neutral-300'],
];

const STRINGS = {
  en: {
    title: 'Analytics',
    subtitle: "Aggregate usage patterns from the chatbot. Question text is never stored, only topic categories and cited documents.",
    filters: 'Filters',
    role: 'Role',
    allRoles: 'All',
    dateRange: 'Date range',
    last7: 'Last 7 days',
    last30: 'Last 30 days',
    allTime: 'All time',
    kpiTotal: 'Questions Answered',
    kpiTopTopic: 'Most Active Topic',
    kpiDocsReferenced: 'Documents Referenced',
    kpiFallbackRate: 'Fallback Rate',
    topicsTitle: 'Most Asked Topics',
    docsTitle: 'Most Cited Documents',
    deptTitle: 'Usage by Department',
    roleTitle: 'Usage by Role',
    langTitle: 'Language Split',
    activityTitle: 'Activity Over Time',
    noData: 'Not enough data yet for this range.',
    times: 'times',
    aiInsights: 'AI Insights',
    aiInsightsSubtitle: "Sage's read on what your organization is asking about, and what to do next.",
    scheduleSession: 'Schedule Awareness Session',
  },
  ja: {
    title: '分析',
    subtitle: 'チャットボットの利用傾向の集計です。質問文自体は保存されず、トピックと参照文書のみを記録しています。',
    filters: 'フィルター',
    role: 'ロール',
    allRoles: 'すべて',
    dateRange: '期間',
    last7: '過去7日間',
    last30: '過去30日間',
    allTime: 'すべての期間',
    kpiTotal: '回答した質問数',
    kpiTopTopic: '最も多いトピック',
    kpiDocsReferenced: '参照された文書数',
    kpiFallbackRate: 'フォールバック率',
    topicsTitle: 'よく聞かれるトピック',
    docsTitle: 'よく参照される文書',
    deptTitle: '部門別の利用状況',
    roleTitle: 'ロール別の利用状況',
    langTitle: '言語の割合',
    activityTitle: '期間別のアクティビティ',
    noData: 'この期間のデータはまだ十分にありません。',
    times: '回',
    aiInsights: 'AIインサイト',
    aiInsightsSubtitle: '組織内でよく聞かれている内容と、次のアクションについてのSageの提案です。',
    scheduleSession: '説明会を予定する',
  },
};

const withinRange = (timestamp: number, range: DateRange): boolean => {
  if (range === 'all') return true;
  const days = range === '7d' ? 7 : 30;
  return Date.now() - timestamp <= days * 86400000;
};

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ onBackToChat, language }) => {
  const t = STRINGS[language];
  const [roleFilter, setRoleFilter] = useState<Set<RoleFilterKey>>(
    new Set(['user', 'admin', 'system-admin'])
  );
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [showEventModal, setShowEventModal] = useState(false);

  const allEvents = useMemo(() => analyticsStorage.getAll(), []);

  const events = useMemo(
    () => allEvents.filter((e) => roleFilter.has(e.role) && withinRange(e.timestamp, dateRange)),
    [allEvents, roleFilter, dateRange]
  );

  const ALL_ROLES: RoleFilterKey[] = ['user', 'admin', 'system-admin'];
  const isAllRolesSelected = ALL_ROLES.every((r) => roleFilter.has(r));

  const toggleRole = (key: RoleFilterKey) => {
    setRoleFilter((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key); // keep at least one selected
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const selectAllRoles = () => setRoleFilter(new Set(ALL_ROLES));

  // ---- Aggregations ----

  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach((e) => {
      counts[e.topic] = (counts[e.topic] || 0) + 1;
    });
    return counts;
  }, [events]);

  const topicBarData = useMemo(
    () =>
      Object.entries(topicCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([topic, count], idx) => ({
          label: localizeTopic(topic, language),
          value: count,
          color: TOPIC_COLOR_ORDER[idx % TOPIC_COLOR_ORDER.length],
        })),
    [topicCounts, language]
  );

  const docCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach((e) => e.citations.forEach((c) => {
      counts[c] = (counts[c] || 0) + 1;
    }));
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [events]);

  const deptCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach((e) => {
      counts[e.department] = (counts[e.department] || 0) + 1;
    });
    return counts;
  }, [events]);

  const roleCounts = useMemo(() => {
    const counts: Record<RoleFilterKey, number> = { user: 0, admin: 0, 'system-admin': 0 };
    events.forEach((e) => {
      counts[e.role] = (counts[e.role] || 0) + 1;
    });
    return counts;
  }, [events]);

  const langCounts = useMemo(() => {
    const counts = { en: 0, ja: 0 };
    events.forEach((e) => {
      counts[e.language] = (counts[e.language] || 0) + 1;
    });
    return counts;
  }, [events]);

  const fallbackCount = topicCounts['uncategorized'] || 0;
  const fallbackRate = events.length > 0 ? Math.round((fallbackCount / events.length) * 100) : 0;
  const totalDocsReferenced = Object.keys(
    events.reduce((acc, e) => {
      e.citations.forEach((c) => (acc[c] = true));
      return acc;
    }, {} as Record<string, boolean>)
  ).length;

  const topTopic = topicBarData[0];

  const activityDays = dateRange === '7d' ? 7 : 30;
  const activitySeries = useMemo(() => {
    const buckets = new Array(activityDays).fill(0);
    events.forEach((e) => {
      const daysAgo = Math.floor((Date.now() - e.timestamp) / 86400000);
      const idx = activityDays - 1 - daysAgo;
      if (idx >= 0 && idx < activityDays) buckets[idx] += 1;
    });
    return buckets;
  }, [events, activityDays]);

  const activityLabels = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(language === 'ja' ? 'ja-JP' : 'en-US', { month: 'short', day: 'numeric' });
    return Array.from({ length: activityDays }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (activityDays - 1 - i));
      return fmt.format(d);
    });
  }, [activityDays, language]);

  const peakDayIndex = activitySeries.reduce((best, v, i) => (v > activitySeries[best] ? i : best), 0);
  const peakDayValue = activitySeries[peakDayIndex] || 0;

  const radarData = useMemo(
    () =>
      Object.keys(TOPIC_LABELS)
        .filter((k) => k !== 'uncategorized')
        .map((topic) => ({
          label: localizeTopic(topic, language).split(' ')[0],
          value: 0,
          _raw: topicCounts[topic] || 0,
        })),
    [topicCounts, language]
  );
  const maxRadarValue = Math.max(1, ...radarData.map((d) => d._raw));
  const normalizedRadarData = radarData.map((d) => ({ label: d.label, value: (d._raw / maxRadarValue) * 100 }));

  // ---- AI Insight narrative (rule-based, computed from aggregate data only) ----

  const insightLines: string[] = [];
  if (topTopic) {
    const topPct = Math.round((topTopic.value / Math.max(1, events.length)) * 100);
    insightLines.push(
      language === 'ja'
        ? `この期間の質問のうち ${topPct}% が「${topTopic.label}」に関するものでした。反復的な質問を減らすため、このトピックについての説明会を検討してください。`
        : `${topPct}% of questions in this period were about "${topTopic.label}". Consider running a short awareness session on this topic to cut down on repeat questions.`
    );
  }
  if (fallbackRate >= 10) {
    insightLines.push(
      language === 'ja'
        ? `質問の ${fallbackRate}% は特定の文書に一致しませんでした。関連文書が不足している可能性があります。`
        : `${fallbackRate}% of questions couldn't be matched to a specific policy document. This may signal a documentation gap worth filling.`
    );
  }
  if (langCounts.ja > 0) {
    const jaPct = Math.round((langCounts.ja / Math.max(1, events.length)) * 100);
    insightLines.push(
      language === 'ja'
        ? `質問の ${jaPct}% が日本語で行われています。日本語話者向けの案内を優先する価値があります。`
        : `${jaPct}% of questions came in Japanese. Worth prioritizing Japanese-language guidance and documentation.`
    );
  }
  if (insightLines.length === 0) {
    insightLines.push(
      language === 'ja'
        ? 'このフィルターでは十分なデータがまだありません。'
        : 'Not enough data yet for this filter to generate insights.'
    );
  }

  const eventSubject =
    language === 'ja'
      ? `${topTopic ? topTopic.label : 'HRポリシー'} 説明会`
      : `Awareness Session: ${topTopic ? topTopic.label : 'HR Policies'}`;
  const eventBody =
    language === 'ja'
      ? `Sage の利用状況分析に基づき、${topTopic ? topTopic.label : 'HRポリシー'} について従業員向けの説明会を企画しました。`
      : `Based on Sage usage analytics, this session covers ${topTopic ? topTopic.label : 'common HR policy questions'} to help reduce repeat questions and improve self-service.`;

  // ---- Styles ----

  const outerWrapperStyles: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };
  const scrollWrapperStyles: React.CSSProperties = {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    padding: spacing.lg,
    backgroundColor: 'transparent',
  };
  const backBarStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.md} ${spacing.lg} 0`,
    flexShrink: 0,
  };
  const backButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    background: 'none',
    border: 'none',
    color: colors['neutral-700'],
    cursor: 'pointer',
    fontSize: typography.fontSize['body-sm'],
    fontWeight: typography.fontWeight.semibold,
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: borderRadius.sm,
    transition: 'background-color 0.15s ease-in-out',
  };
  const titleStyles: React.CSSProperties = { fontSize: typography.fontSize['h1'], fontWeight: 700, color: colors['neutral-900'], margin: 0 };
  const subtitleStyles: React.CSSProperties = { fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'], marginTop: spacing.xs, marginBottom: spacing.lg, maxWidth: '640px' };

  const filterBarStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xl,
    padding: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: `1px solid ${interactionTints.accentSubtle}`,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xl,
    flexWrap: 'wrap',
  };
  const filterGroupLabelStyles: React.CSSProperties = { fontSize: typography.fontSize['label-sm'], fontWeight: 700, color: colors['neutral-500'], textTransform: 'uppercase', letterSpacing: '0.4px', marginRight: spacing.sm };
  const pillStyles = (active: boolean): React.CSSProperties => ({
    padding: `4px ${spacing.md}`,
    borderRadius: borderRadius.full,
    border: `1px solid ${active ? colors['accent-blue'] : colors['neutral-300']}`,
    backgroundColor: active ? interactionTints.accentSubtle : colors['neutral-white'],
    color: active ? colors['accent-blue'] : colors['neutral-600'],
    fontSize: typography.fontSize['body-xs'],
    fontWeight: 600,
    cursor: 'pointer',
  });

  const kpiGridStyles: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: spacing.md, marginBottom: spacing.xl };
  const kpiCardStyles: React.CSSProperties = {
    padding: spacing.lg,
    border: `1px solid ${interactionTints.accentSubtle}`,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: shadows.cardHover,
    transition: 'box-shadow 0.15s ease, border-color 0.15s ease, transform 0.15s ease',
  };
  const kpiValueStyles: React.CSSProperties = { fontSize: typography.fontSize['h1'], fontWeight: 700, color: colors['neutral-900'] };
  const kpiLabelStyles: React.CSSProperties = { fontSize: typography.fontSize['body-xs'], color: colors['neutral-500'], marginTop: spacing.xs };

  const panelGridStyles: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg, marginBottom: spacing.lg };
  const panelStyles: React.CSSProperties = {
    padding: spacing.lg,
    border: `1px solid ${interactionTints.accentSubtle}`,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: shadows.cardHover,
  };
  const panelTitleStyles: React.CSSProperties = { fontSize: typography.fontSize['h4'], fontWeight: 600, color: colors['neutral-900'], marginBottom: spacing.md };
  const emptyStyles: React.CSSProperties = { fontSize: typography.fontSize['body-sm'], color: colors['neutral-500'], padding: spacing.lg, textAlign: 'center' };

  const insightsPanelStyles: React.CSSProperties = {
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    border: `1px solid ${colors['neutral-200']}`,
    background: 'linear-gradient(135deg, rgba(26, 117, 219, 0.06) 0%, rgba(26, 117, 219, 0.02) 100%)',
  };
  const insightsHeaderStyles: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.xs };

  return (
    <div style={outerWrapperStyles}>
      <div style={backBarStyles}>
        <button
          style={backButtonStyles}
          onClick={onBackToChat}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors['neutral-100'];
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
        >
          <MaterialIcon name="arrow_back" size={16} />
          Back to Chat
        </button>
      </div>

      <div style={{ padding: `${spacing.sm} ${spacing.lg} 0` }}>
        <h1 style={titleStyles}>{t.title}</h1>
      </div>

      <div style={scrollWrapperStyles}>
      <div style={subtitleStyles}>{t.subtitle}</div>

      {/* Filters */}
      <div style={filterBarStyles}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={filterGroupLabelStyles}>{t.role}</span>
          <div style={{ display: 'flex', gap: spacing.xs }}>
            <button
              style={pillStyles(isAllRolesSelected)}
              onClick={selectAllRoles}
            >
              {t.allRoles}
            </button>
            {ROLE_FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                style={pillStyles(!isAllRolesSelected && roleFilter.has(opt.key))}
                onClick={() => toggleRole(opt.key)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={filterGroupLabelStyles}>{t.dateRange}</span>
          <div style={{ display: 'flex', gap: spacing.xs }}>
            {(['7d', '30d', 'all'] as DateRange[]).map((r) => (
              <button
                key={r}
                style={pillStyles(dateRange === r)}
                onClick={() => setDateRange(r)}
              >
                {r === '7d' ? t.last7 : r === '30d' ? t.last30 : t.allTime}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={kpiGridStyles}>
        {[
          { value: events.length, label: t.kpiTotal },
          { value: topTopic ? topTopic.label : '-', label: t.kpiTopTopic, small: true },
          { value: totalDocsReferenced, label: t.kpiDocsReferenced },
          {
            value: `${fallbackRate}%`,
            label: t.kpiFallbackRate,
            color: fallbackRate >= 10 ? colors['warning-amber'] : colors['neutral-900'],
          },
        ].map((kpi, idx) => (
          <div
            key={idx}
            style={kpiCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(26, 117, 219, 0.12)';
              e.currentTarget.style.borderColor = interactionTints.accentSoft;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = shadows.cardHover;
              e.currentTarget.style.borderColor = interactionTints.accentSubtle;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ ...kpiValueStyles, fontSize: kpi.small ? typography.fontSize['h3'] : kpiValueStyles.fontSize, color: kpi.color ?? kpiValueStyles.color }}>
              {kpi.value}
            </div>
            <div style={kpiLabelStyles}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Panels */}
      <div style={panelGridStyles}>
        <div style={panelStyles}>
          <div style={panelTitleStyles}>{t.topicsTitle}</div>
          {topicBarData.length > 0 ? <BarChart data={topicBarData} /> : <div style={emptyStyles}>{t.noData}</div>}
        </div>
        <div style={panelStyles}>
          <div style={panelTitleStyles}>{t.docsTitle}</div>
          {docCounts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
              {docCounts.map(([doc, count]) => (
                <div key={doc} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: typography.fontSize['body-sm'] }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, overflow: 'hidden' }}>
                    <MaterialIcon name="description" size={16} color={colors['neutral-400']} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: colors['neutral-800'] }}>
                      {localizeCitation(doc, language)}
                    </span>
                  </div>
                  <span style={{ color: colors['neutral-500'], flexShrink: 0, marginLeft: spacing.sm }}>{count} {t.times}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={emptyStyles}>{t.noData}</div>
          )}
        </div>
      </div>

      <div style={panelGridStyles}>
        <div style={panelStyles}>
          <div style={panelTitleStyles}>{t.deptTitle}</div>
          {events.length > 0 ? (
            <DonutChart
              data={Object.entries(deptCounts).map(([dept, count], idx) => ({
                label: dept,
                value: count,
                color: TOPIC_COLOR_ORDER[idx % TOPIC_COLOR_ORDER.length],
              }))}
            />
          ) : (
            <div style={emptyStyles}>{t.noData}</div>
          )}
        </div>
        <div style={panelStyles}>
          <div style={panelTitleStyles}>{t.roleTitle}</div>
          {events.length > 0 ? (
            <DonutChart
              data={ROLE_FILTER_OPTIONS.map((opt) => ({ label: opt.label, value: roleCounts[opt.key], color: opt.color }))}
            />
          ) : (
            <div style={emptyStyles}>{t.noData}</div>
          )}
        </div>
      </div>

      <div style={panelGridStyles}>
        <div style={panelStyles}>
          <div style={panelTitleStyles}>{t.langTitle}</div>
          {events.length > 0 ? (
            <DonutChart
              data={[
                { label: 'English', value: langCounts.en, color: chartPalette.blue },
                { label: '日本語 (Japanese)', value: langCounts.ja, color: chartPalette.green },
              ]}
            />
          ) : (
            <div style={emptyStyles}>{t.noData}</div>
          )}
        </div>
        <div style={panelStyles}>
          <div style={panelTitleStyles}>{t.activityTitle}</div>
          {events.length > 0 ? (
            <>
              <Sparkline
                data={activitySeries}
                labels={activityLabels}
                unitLabel={language === 'ja' ? '件の質問' : 'questions'}
              />
              <div style={{ fontSize: typography.fontSize['body-xs'], color: colors['neutral-500'], marginTop: spacing.sm }}>
                {language === 'ja'
                  ? `ピーク: ${activityLabels[peakDayIndex]} に ${peakDayValue}件`
                  : `Peak: ${peakDayValue} question${peakDayValue === 1 ? '' : 's'} on ${activityLabels[peakDayIndex]}`}
              </div>
            </>
          ) : (
            <div style={emptyStyles}>{t.noData}</div>
          )}
        </div>
      </div>

      {/* AI Insights */}
      <div style={insightsPanelStyles}>
        <div style={insightsHeaderStyles}>
          <MaterialIcon name="auto_awesome" size={20} color={colors['accent-blue']} />
          <div style={{ fontSize: typography.fontSize['h3'], fontWeight: 700, color: colors['neutral-900'] }}>{t.aiInsights}</div>
        </div>
        <div style={{ fontSize: typography.fontSize['body-sm'], color: colors['neutral-600'], marginBottom: spacing.lg }}>{t.aiInsightsSubtitle}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: spacing.xl, alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {events.length > 0 ? (
              <RadarChart data={normalizedRadarData} />
            ) : (
              <div style={emptyStyles}>{t.noData}</div>
            )}
          </div>
          <div>
            <ul style={{ margin: 0, paddingLeft: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
              {insightLines.map((line, idx) => (
                <li key={idx} style={{ fontSize: typography.fontSize['body-md'], color: colors['neutral-800'], lineHeight: 1.6 }}>
                  {line}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowEventModal(true)}
              style={{
                marginTop: spacing.lg,
                display: 'inline-flex',
                alignItems: 'center',
                gap: spacing.sm,
                padding: `${spacing.sm} ${spacing.lg}`,
                backgroundColor: colors['accent-blue'],
                color: colors['neutral-white'],
                border: 'none',
                borderRadius: borderRadius.md,
                fontSize: typography.fontSize['body-sm'],
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: shadows.sm,
              }}
            >
              <MaterialIcon name="calendar_add_on" size={18} />
              {t.scheduleSession}
            </button>
          </div>
        </div>
      </div>
      </div>

      <CreateEventModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        defaultSubject={eventSubject}
        defaultBody={eventBody}
        language={language}
      />
    </div>
  );
};

AnalyticsDashboard.displayName = 'AnalyticsDashboard';
