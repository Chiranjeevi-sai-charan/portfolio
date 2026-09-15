/**
 * Mock document content for the Sage product demo.
 *
 * Maps each citation name (as generated in EmployeeChatbot's
 * generateCitations) to a document with paragraphs of realistic-looking
 * policy text. One paragraph is marked as the "highlight" - the specific
 * excerpt the AI's answer was drawn from - so the DocumentPanel can show
 * it with a light-yellow highlight, matching how a real citation-lookup
 * experience would jump straight to the relevant passage.
 *
 * Each document has both English and Japanese content so the source
 * document viewer matches whichever language the chatbot is set to.
 */

import { Language } from './mockAIResponses';

export interface MockDocument {
  title: string;
  paragraphs: string[];
  /** Index into paragraphs that should be highlighted as the cited excerpt */
  highlightIndex: number;
}

interface LocalizedMockDocument {
  title: Record<Language, string>;
  paragraphs: Record<Language, string[]>;
  highlightIndex: number;
}

export const MOCK_DOCUMENTS: Record<string, LocalizedMockDocument> = {
  'Company Handbook - Time Off Policy': {
    title: {
      en: 'Company Handbook - Time Off Policy',
      ja: '従業員ハンドブック - 休暇規定',
    },
    paragraphs: {
      en: [
        'Section 4: Time Off and Leave Policies',
        'This section outlines the paid time off benefits available to all full-time employees, including vacation, sick leave, and other forms of leave.',
        'Employees accrue 20 days of paid vacation per year, which resets on January 1st of each calendar year. Unused vacation days do not roll over unless approved in writing by a manager.',
        'Vacation requests should be submitted through the HR portal at least 5 business days in advance for approval. Requests may be submitted up to 30 days in advance to allow for team planning.',
        'Managers are expected to respond to vacation requests within 2 business days. Denied requests must include a written explanation.',
      ],
      ja: [
        '第4条：休暇規定',
        '本条項は、全ての正社員が利用できる有給休暇（年次休暇、病気休暇、その他の休暇）について定めます。',
        '従業員は年間20日の有給休暇を取得でき、毎年1月1日にリセットされます。未消化の休暇日数は、上司の書面による承認がない限り繰り越されません。',
        '休暇申請は、承認のために少なくとも5営業日前までに人事ポータルから提出してください。チームの計画のため、最大30日前まで申請が可能です。',
        '上司は休暇申請に対し2営業日以内に回答することが求められます。却下する場合は書面による説明が必要です。',
      ],
    },
    highlightIndex: 2,
  },
  'HR Portal - Vacation Request Guide': {
    title: {
      en: 'HR Portal - Vacation Request Guide',
      ja: '人事ポータル - 休暇申請ガイド',
    },
    paragraphs: {
      en: [
        'How to Request Time Off',
        'All vacation and time-off requests are managed through the HR Portal under "My Time Off".',
        'To submit a request, navigate to My Time Off > New Request, select your dates, and submit for manager approval. You can request time off through the HR portal up to 30 days in advance.',
        'You will receive an email notification once your request has been approved or denied. Approved requests are automatically reflected on the team calendar.',
      ],
      ja: [
        '休暇の申請方法',
        'すべての休暇申請は、人事ポータルの「マイ休暇」から管理されます。',
        '申請するには、マイ休暇 > 新規申請 に進み、日付を選択して上司の承認を得てください。休暇申請は人事ポータルから最大30日前までに行うことができます。',
        '承認または却下されると、メールで通知が届きます。承認された申請は自動的にチームカレンダーに反映されます。',
      ],
    },
    highlightIndex: 2,
  },
  'Company Handbook - Sick Leave': {
    title: {
      en: 'Company Handbook - Sick Leave',
      ja: '従業員ハンドブック - 病気休暇',
    },
    paragraphs: {
      en: [
        'Section 4.2: Sick Leave',
        'Sick leave is provided to support employees during periods of illness or for medical appointments.',
        'Employees have 10 paid sick days per year for illness or medical appointments. Extended absences may require medical documentation from a licensed physician.',
        'Sick leave does not carry over to the following calendar year and is not paid out upon termination.',
      ],
      ja: [
        '第4.2条：病気休暇',
        '病気休暇は、病気の療養や通院の際に従業員を支援するために付与されます。',
        '従業員は病気や通院のために年間10日の有給病気休暇を取得できます。長期の休暇には医師の診断書が必要になる場合があります。',
        '病気休暇は翌年に繰り越されず、退職時に金銭で支給されることもありません。',
      ],
    },
    highlightIndex: 2,
  },
  'Employee Benefits Summary': {
    title: {
      en: 'Employee Benefits Summary',
      ja: '福利厚生の概要',
    },
    paragraphs: {
      en: [
        'Overview of Employee Benefits',
        'This summary outlines the core benefits package offered to all eligible employees.',
        'Benefits include health insurance, 401(k) matching, gym membership reimbursement, and a professional development budget of $1,500 per year.',
        'Sick leave: employees have 10 paid sick days per year for illness or medical appointments, in addition to the standard vacation allowance.',
        'For a full breakdown of benefit elections, see the annual Open Enrollment Guide.',
      ],
      ja: [
        '福利厚生の概要',
        '本資料は、対象となる全従業員に提供される主要な福利厚生パッケージについてまとめたものです。',
        '福利厚生には、健康保険、確定拠出年金のマッチング拠出、ジム会員費の補助、年間1,500ドルの能力開発予算が含まれます。',
        '病気休暇：通常の年次休暇に加え、病気や通院のために年間10日の有給病気休暇が付与されます。',
        '福利厚生の選択内容の詳細については、年次の加入手続きガイドをご覧ください。',
      ],
    },
    highlightIndex: 2,
  },
  'Company Handbook - Health Benefits': {
    title: {
      en: 'Company Handbook - Health Benefits',
      ja: '従業員ハンドブック - 健康保険',
    },
    paragraphs: {
      en: [
        'Section 5: Health Benefits',
        'The company is committed to providing comprehensive health coverage to support employee wellbeing.',
        'We offer comprehensive health insurance with 80% coverage of premiums for employees and eligible dependents. Open enrollment is in November each year.',
        'Employees may choose between two PPO plans and one HDHP plan with an HSA option, depending on their coverage needs.',
      ],
      ja: [
        '第5条：健康保険',
        '当社は従業員の健康を支えるため、充実した医療保障の提供に努めています。',
        '従業員とその扶養家族を対象に、保険料の80%を会社が負担する総合的な健康保険を提供しています。加入手続きは毎年11月に行われます。',
        '従業員は必要な保障内容に応じて、2種類のPPOプランまたはHSA付きのHDHPプランから選択できます。',
      ],
    },
    highlightIndex: 2,
  },
  'Open Enrollment Guide 2024': {
    title: {
      en: 'Open Enrollment Guide 2024',
      ja: '2024年度 加入手続きガイド',
    },
    paragraphs: {
      en: [
        'Welcome to Open Enrollment',
        'Open enrollment for the 2024 plan year runs from November 1st through November 30th.',
        'During this window, you may enroll in, change, or cancel your health insurance elections. The company offers comprehensive health insurance with 80% coverage of premiums.',
        'Changes made during open enrollment take effect on January 1st of the following year. Outside of this window, changes require a qualifying life event.',
      ],
      ja: [
        '加入手続きへようこそ',
        '2024年度の加入手続き期間は11月1日から11月30日までです。',
        'この期間中、健康保険の加入・変更・解約が可能です。会社は保険料の80%を負担する総合的な健康保険を提供しています。',
        'この期間中に行った変更は翌年1月1日から適用されます。期間外の変更には、該当するライフイベントが必要です。',
      ],
    },
    highlightIndex: 2,
  },
  'Compensation & Benefits Package': {
    title: {
      en: 'Compensation & Benefits Package',
      ja: '報酬・福利厚生パッケージ',
    },
    paragraphs: {
      en: [
        'Total Rewards Overview',
        'Your total compensation package includes base salary, benefits, and additional perks designed to support your wellbeing and growth.',
        'Standard benefits include health insurance, 401(k) matching up to 4% of salary, gym membership reimbursement, and a professional development budget.',
        'Salary information is considered confidential. Any questions about compensation adjustments should be directed to your manager.',
      ],
      ja: [
        '総合報酬の概要',
        'あなたの報酬パッケージには、基本給、福利厚生、および成長と健康を支える各種特典が含まれます。',
        '標準的な福利厚生には、健康保険、給与の最大4%までの確定拠出年金マッチング拠出、ジム会員費の補助、能力開発予算が含まれます。',
        '給与情報は機密事項として扱われます。給与の見直しについてのご質問は上司にご相談ください。',
      ],
    },
    highlightIndex: 2,
  },
  'Company Handbook - Work Arrangements': {
    title: {
      en: 'Company Handbook - Work Arrangements',
      ja: '従業員ハンドブック - 勤務形態',
    },
    paragraphs: {
      en: [
        'Section 6: Work Arrangements',
        'The company supports flexible work arrangements to help employees balance productivity and personal needs.',
        'Our work-from-home policy allows up to 3 days per week of remote work. Employees should coordinate remote days with their manager and ensure regular team presence for collaboration.',
        'Fully remote arrangements may be approved on a case-by-case basis for roles that do not require regular in-office presence.',
      ],
      ja: [
        '第6条：勤務形態',
        '当社は、生産性と私生活の両立を支援するため、柔軟な勤務形態を導入しています。',
        '在宅勤務は週最大3日まで認められています。在宅勤務日は上司と調整し、チームでの連携のため定期的に出社するようにしてください。',
        '常時勤務を必要としない職務については、完全リモート勤務が個別に承認される場合があります。',
      ],
    },
    highlightIndex: 2,
  },
  'Remote Work Policy v2.0': {
    title: {
      en: 'Remote Work Policy v2.0',
      ja: 'リモートワーク規定 v2.0',
    },
    paragraphs: {
      en: [
        'Remote Work Guidelines',
        'This policy defines expectations for employees working outside of the primary office location.',
        'Employees may work remotely up to 3 days per week, coordinated in advance with their manager. Core collaboration hours (10am–3pm local time) should be maintained regardless of work location.',
        'Equipment and expense reimbursement for home office setup is available up to $300 per year - see the Expense Policy for details.',
      ],
      ja: [
        'リモートワークガイドライン',
        '本規定は、主要オフィス以外の場所で勤務する従業員に対する期待事項を定めます。',
        '従業員は上司と事前に調整のうえ、週最大3日までリモートで勤務できます。勤務地に関わらず、コアタイム（現地時間午前10時〜午後3時）は維持してください。',
        '在宅勤務の設備・費用については、年間最大300ドルまで補助されます。詳細は経費規定をご覧ください。',
      ],
    },
    highlightIndex: 2,
  },
  'Employee Handbook - Compensation Policy': {
    title: {
      en: 'Employee Handbook - Compensation Policy',
      ja: '従業員ハンドブック - 給与規定',
    },
    paragraphs: {
      en: [
        'Compensation Philosophy',
        'The company aims to offer competitive, fair compensation aligned with role, experience, and performance.',
        'Salary information is confidential. Your compensation was discussed during your offer, and any adjustments should be discussed with your manager during performance reviews.',
        'Compensation is reviewed annually, though adjustments are not guaranteed.',
      ],
      ja: [
        '報酬に関する考え方',
        '当社は、職務、経験、実績に見合った、競争力があり公正な報酬の提供を目指しています。',
        '給与情報は機密事項です。報酬は内定時に説明されており、変更については人事評価の際に上司とご相談ください。',
        '報酬は毎年見直されますが、変更が保証されるものではありません。',
      ],
    },
    highlightIndex: 2,
  },
  'Company Handbook': {
    title: {
      en: 'Company Handbook',
      ja: '従業員ハンドブック',
    },
    paragraphs: {
      en: [
        'Welcome to the Company Handbook',
        'This handbook is your guide to company policies, benefits, and expectations. It is reviewed and updated annually.',
        "For questions not covered here, please reach out to the HR team at hr@company.com. They can provide personalized guidance for your specific situation.",
        'This handbook does not constitute an employment contract and policies may be updated at the company’s discretion.',
      ],
      ja: [
        '従業員ハンドブックへようこそ',
        '本ハンドブックは、会社の規定・福利厚生・行動指針をまとめたガイドです。毎年見直しと更新が行われます。',
        'ここに記載のないご質問については、人事チーム（hr@company.com）までお問い合わせください。個別の状況に応じたご案内をいたします。',
        '本ハンドブックは雇用契約書に該当するものではなく、規定は会社の裁量により更新される場合があります。',
      ],
    },
    highlightIndex: 2,
  },
  'HR Portal': {
    title: {
      en: 'HR Portal',
      ja: '人事ポータル',
    },
    paragraphs: {
      en: [
        'HR Portal - Self-Service Center',
        'The HR Portal is your central resource for managing time off, benefits elections, pay stubs, and company policies.',
        'If you can’t find what you’re looking for, reach out to the HR team at hr@company.com for detailed information and personalized guidance.',
      ],
      ja: [
        '人事ポータル - セルフサービスセンター',
        '人事ポータルは、休暇管理、福利厚生の選択、給与明細、社内規定を一元的に確認できる窓口です。',
        'お探しの情報が見つからない場合は、人事チーム（hr@company.com）までお問い合わせください。詳細と個別のご案内をいたします。',
      ],
    },
    highlightIndex: 2,
  },
};

export function getMockDocument(citation: string, language: Language = 'en'): MockDocument {
  const doc = MOCK_DOCUMENTS[citation];
  if (!doc) {
    return {
      title: citation,
      paragraphs:
        language === 'ja'
          ? [citation, 'この文書は回答の出典として参照されていますが、本デモでは詳細な内容は用意されていません。']
          : [citation, 'This document is referenced as a source for the assistant’s response, but detailed content is not available in this demo.'],
      highlightIndex: 1,
    };
  }
  return {
    title: doc.title[language] || doc.title.en,
    paragraphs: doc.paragraphs[language] || doc.paragraphs.en,
    highlightIndex: doc.highlightIndex,
  };
}
