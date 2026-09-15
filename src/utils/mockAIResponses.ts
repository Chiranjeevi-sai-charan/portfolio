/**
 * Mock HR chatbot responses for the Sage product demo.
 *
 * Keyword-matched, hardcoded responses used by both the Employee and
 * Admin/System Admin chat workspaces so their demo behavior stays in sync.
 *
 * Response text embeds inline citation markers as `[[1]]`, `[[2]]`, etc.,
 * placed right after the sentence a citation supports. `citations[n - 1]`
 * is the source for marker `[[n]]`. ChatBubble parses these markers into
 * clickable numbered references that open the same source-document panel
 * as the "Sources" list at the bottom of the message.
 *
 * Citation keys stay in English (they double as lookup keys into
 * mockDocuments), but the citation label shown to the user is localized.
 */

export type Language = 'en' | 'ja';

export interface AIResponse {
  text: string;
  citations: string[];
  /** Topic category this response was matched under — used for privacy-safe analytics (never the raw question text) */
  topic: string;
}

interface LocalizedResponse {
  /** Topic id, doubles as the analytics category key */
  topic: string;
  /** Keywords (in either language) that trigger this response */
  keywords: string[];
  text: Record<Language, string>;
  citations: string[];
}

export const TOPIC_LABELS: Record<string, Record<Language, string>> = {
  vacation: { en: 'Vacation & Time Off', ja: '有給休暇' },
  sick: { en: 'Sick Leave', ja: '病気休暇' },
  insurance: { en: 'Health Insurance', ja: '健康保険' },
  benefits: { en: 'Benefits', ja: '福利厚生' },
  remote: { en: 'Remote Work', ja: '在宅勤務' },
  salary: { en: 'Salary & Compensation', ja: '給与' },
  handbook: { en: 'Employee Handbook', ja: '従業員ハンドブック' },
  uncategorized: { en: 'Other / Uncategorized', ja: 'その他' },
};

export function localizeTopic(topic: string, language: Language): string {
  return TOPIC_LABELS[topic]?.[language] || topic;
}

const CITATION_LABELS: Record<string, Record<Language, string>> = {
  'Company Handbook - Time Off Policy': {
    en: 'Company Handbook - Time Off Policy',
    ja: '従業員ハンドブック - 休暇規定',
  },
  'HR Portal - Vacation Request Guide': {
    en: 'HR Portal - Vacation Request Guide',
    ja: '人事ポータル - 休暇申請ガイド',
  },
  'Company Handbook - Sick Leave': {
    en: 'Company Handbook - Sick Leave',
    ja: '従業員ハンドブック - 病気休暇',
  },
  'Employee Benefits Summary': {
    en: 'Employee Benefits Summary',
    ja: '福利厚生の概要',
  },
  'Company Handbook - Health Benefits': {
    en: 'Company Handbook - Health Benefits',
    ja: '従業員ハンドブック - 健康保険',
  },
  'Open Enrollment Guide 2024': {
    en: 'Open Enrollment Guide 2024',
    ja: '2024年度 加入手続きガイド',
  },
  'Compensation & Benefits Package': {
    en: 'Compensation & Benefits Package',
    ja: '報酬・福利厚生パッケージ',
  },
  'Company Handbook - Work Arrangements': {
    en: 'Company Handbook - Work Arrangements',
    ja: '従業員ハンドブック - 勤務形態',
  },
  'Remote Work Policy v2.0': {
    en: 'Remote Work Policy v2.0',
    ja: 'リモートワーク規定 v2.0',
  },
  'Employee Handbook - Compensation Policy': {
    en: 'Employee Handbook - Compensation Policy',
    ja: '従業員ハンドブック - 給与規定',
  },
  'HR Portal': {
    en: 'HR Portal',
    ja: '人事ポータル',
  },
  'Company Handbook': {
    en: 'Company Handbook',
    ja: '従業員ハンドブック',
  },
};

export function localizeCitation(citation: string, language: Language): string {
  return CITATION_LABELS[citation]?.[language] || citation;
}

const RESPONSES: LocalizedResponse[] = [
  {
    topic: 'vacation',
    keywords: ['vacation', '有給', '休暇'],
    text: {
      en: 'You have 20 days of paid vacation per year, which resets on January 1st.[[1]] You can request time off through the HR portal up to 30 days in advance.[[2]]',
      ja: '有給休暇は年間20日付与され、1月1日にリセットされます。[[1]]休暇申請は人事ポータルから最大30日前までに行うことができます。[[2]]',
    },
    citations: ['Company Handbook - Time Off Policy', 'HR Portal - Vacation Request Guide'],
  },
  {
    topic: 'sick',
    keywords: ['sick', '病気休暇', '病欠'],
    text: {
      en: 'You have 10 paid sick days per year for illness or medical appointments.[[1]] Extended absences may require medical documentation.[[2]]',
      ja: '病気や通院のための有給の病気休暇は年間10日利用できます。[[1]]長期の休暇には医師の診断書が必要になる場合があります。[[2]]',
    },
    citations: ['Company Handbook - Sick Leave', 'Employee Benefits Summary'],
  },
  {
    topic: 'insurance',
    keywords: ['insurance', '保険'],
    text: {
      en: 'We offer comprehensive health insurance with 80% coverage of premiums.[[1]] Open enrollment is in November each year.[[2]]',
      ja: '保険料の80%を会社が負担する総合的な健康保険を提供しています。[[1]]加入手続きは毎年11月に行われます。[[2]]',
    },
    citations: ['Company Handbook - Health Benefits', 'Open Enrollment Guide 2024'],
  },
  {
    topic: 'benefits',
    keywords: ['benefits', '福利厚生'],
    text: {
      en: 'Benefits include health insurance, 401(k) matching, gym membership reimbursement, and professional development budget.[[1]][[2]]',
      ja: '福利厚生には健康保険、確定拠出年金のマッチング拠出、ジム会員費の補助、能力開発予算が含まれます。[[1]][[2]]',
    },
    citations: ['Employee Benefits Summary', 'Compensation & Benefits Package'],
  },
  {
    topic: 'remote',
    keywords: ['remote', 'work-from-home', '在宅勤務', '在宅'],
    text: {
      en: 'Our work-from-home policy allows up to 3 days per week remote work.[[1]] Please coordinate with your manager and ensure regular team presence.[[2]]',
      ja: '在宅勤務は週最大3日まで認められています。[[1]]上司と調整のうえ、定期的にチームと顔を合わせるようにしてください。[[2]]',
    },
    citations: ['Company Handbook - Work Arrangements', 'Remote Work Policy v2.0'],
  },
  {
    topic: 'salary',
    keywords: ['salary', '給与', '報酬'],
    text: {
      en: 'Salary information is confidential.[[1]] Your compensation was discussed during your offer. For adjustments, please discuss with your manager.[[2]]',
      ja: '給与情報は機密事項です。[[1]]あなたの報酬は内定時に説明されています。変更については上司にご相談ください。[[2]]',
    },
    citations: ['Employee Handbook - Compensation Policy', 'HR Portal'],
  },
  {
    topic: 'handbook',
    keywords: ['handbook', 'ハンドブック'],
    text: {
      en: 'The employee handbook covers all company policies and is available in the HR Portal.[[1]] Let me know if you have a specific policy question.[[2]]',
      ja: '従業員ハンドブックには会社の全規定が記載されており、人事ポータルから閲覧できます。[[1]]特定の規定についてご質問があればお知らせください。[[2]]',
    },
    citations: ['Company Handbook', 'HR Portal'],
  },
];

const DEFAULT_RESPONSE: LocalizedResponse = {
  topic: 'uncategorized',
  text: {
    en: "That's a great question! Based on our company policies, I recommend reaching out to the HR team at hr@company.com for detailed information.[[1]] They can provide personalized guidance for your situation.[[2]]",
    ja: 'ご質問ありがとうございます。詳細については人事チーム（hr@company.com）にお問い合わせいただくことをお勧めします。[[1]]状況に応じた個別のご案内をいたします。[[2]]',
  },
  citations: ['Company Handbook', 'HR Portal'],
};

export function generateAIResponse(userMessage: string, language: Language = 'en'): AIResponse {
  const lowerMessage = userMessage.toLowerCase();
  const match =
    RESPONSES.find((r) => r.keywords.some((k) => lowerMessage.includes(k.toLowerCase()))) ||
    DEFAULT_RESPONSE;
  return {
    text: match.text[language] || match.text.en,
    // Citation keys stay in English — they're used to look up the source
    // document in mockDocuments. Display labels are localized at render time
    // via `localizeCitation`.
    citations: match.citations,
    topic: match.topic,
  };
}
