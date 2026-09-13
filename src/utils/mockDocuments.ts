/**
 * Mock document content for the Sage product demo.
 *
 * Maps each citation name (as generated in EmployeeChatbot's
 * generateCitations) to a document with paragraphs of realistic-looking
 * policy text. One paragraph is marked as the "highlight" — the specific
 * excerpt the AI's answer was drawn from — so the DocumentPanel can show
 * it with a light-yellow highlight, matching how a real citation-lookup
 * experience would jump straight to the relevant passage.
 */

export interface MockDocument {
  title: string;
  paragraphs: string[];
  /** Index into paragraphs that should be highlighted as the cited excerpt */
  highlightIndex: number;
}

export const MOCK_DOCUMENTS: Record<string, MockDocument> = {
  'Company Handbook - Time Off Policy': {
    title: 'Company Handbook — Time Off Policy',
    paragraphs: [
      'Section 4: Time Off and Leave Policies',
      'This section outlines the paid time off benefits available to all full-time employees, including vacation, sick leave, and other forms of leave.',
      'Employees accrue 20 days of paid vacation per year, which resets on January 1st of each calendar year. Unused vacation days do not roll over unless approved in writing by a manager.',
      'Vacation requests should be submitted through the HR portal at least 5 business days in advance for approval. Requests may be submitted up to 30 days in advance to allow for team planning.',
      'Managers are expected to respond to vacation requests within 2 business days. Denied requests must include a written explanation.',
    ],
    highlightIndex: 2,
  },
  'HR Portal - Vacation Request Guide': {
    title: 'HR Portal — Vacation Request Guide',
    paragraphs: [
      'How to Request Time Off',
      'All vacation and time-off requests are managed through the HR Portal under "My Time Off".',
      'To submit a request, navigate to My Time Off > New Request, select your dates, and submit for manager approval. You can request time off through the HR portal up to 30 days in advance.',
      'You will receive an email notification once your request has been approved or denied. Approved requests are automatically reflected on the team calendar.',
    ],
    highlightIndex: 2,
  },
  'Company Handbook - Sick Leave': {
    title: 'Company Handbook — Sick Leave',
    paragraphs: [
      'Section 4.2: Sick Leave',
      'Sick leave is provided to support employees during periods of illness or for medical appointments.',
      'Employees have 10 paid sick days per year for illness or medical appointments. Extended absences may require medical documentation from a licensed physician.',
      'Sick leave does not carry over to the following calendar year and is not paid out upon termination.',
    ],
    highlightIndex: 2,
  },
  'Employee Benefits Summary': {
    title: 'Employee Benefits Summary',
    paragraphs: [
      'Overview of Employee Benefits',
      'This summary outlines the core benefits package offered to all eligible employees.',
      'Benefits include health insurance, 401(k) matching, gym membership reimbursement, and a professional development budget of $1,500 per year.',
      'Sick leave: employees have 10 paid sick days per year for illness or medical appointments, in addition to the standard vacation allowance.',
      'For a full breakdown of benefit elections, see the annual Open Enrollment Guide.',
    ],
    highlightIndex: 2,
  },
  'Company Handbook - Health Benefits': {
    title: 'Company Handbook — Health Benefits',
    paragraphs: [
      'Section 5: Health Benefits',
      'The company is committed to providing comprehensive health coverage to support employee wellbeing.',
      'We offer comprehensive health insurance with 80% coverage of premiums for employees and eligible dependents. Open enrollment is in November each year.',
      'Employees may choose between two PPO plans and one HDHP plan with an HSA option, depending on their coverage needs.',
    ],
    highlightIndex: 2,
  },
  'Open Enrollment Guide 2024': {
    title: 'Open Enrollment Guide 2024',
    paragraphs: [
      'Welcome to Open Enrollment',
      'Open enrollment for the 2024 plan year runs from November 1st through November 30th.',
      'During this window, you may enroll in, change, or cancel your health insurance elections. The company offers comprehensive health insurance with 80% coverage of premiums.',
      'Changes made during open enrollment take effect on January 1st of the following year. Outside of this window, changes require a qualifying life event.',
    ],
    highlightIndex: 2,
  },
  'Compensation & Benefits Package': {
    title: 'Compensation & Benefits Package',
    paragraphs: [
      'Total Rewards Overview',
      'Your total compensation package includes base salary, benefits, and additional perks designed to support your wellbeing and growth.',
      'Standard benefits include health insurance, 401(k) matching up to 4% of salary, gym membership reimbursement, and a professional development budget.',
      'Salary information is considered confidential. Any questions about compensation adjustments should be directed to your manager.',
    ],
    highlightIndex: 2,
  },
  'Company Handbook - Work Arrangements': {
    title: 'Company Handbook — Work Arrangements',
    paragraphs: [
      'Section 6: Work Arrangements',
      'The company supports flexible work arrangements to help employees balance productivity and personal needs.',
      'Our work-from-home policy allows up to 3 days per week of remote work. Employees should coordinate remote days with their manager and ensure regular team presence for collaboration.',
      'Fully remote arrangements may be approved on a case-by-case basis for roles that do not require regular in-office presence.',
    ],
    highlightIndex: 2,
  },
  'Remote Work Policy v2.0': {
    title: 'Remote Work Policy v2.0',
    paragraphs: [
      'Remote Work Guidelines',
      'This policy defines expectations for employees working outside of the primary office location.',
      'Employees may work remotely up to 3 days per week, coordinated in advance with their manager. Core collaboration hours (10am–3pm local time) should be maintained regardless of work location.',
      'Equipment and expense reimbursement for home office setup is available up to $300 per year — see the Expense Policy for details.',
    ],
    highlightIndex: 2,
  },
  'Company Handbook': {
    title: 'Company Handbook',
    paragraphs: [
      'Welcome to the Company Handbook',
      'This handbook is your guide to company policies, benefits, and expectations. It is reviewed and updated annually.',
      "For questions not covered here, please reach out to the HR team at hr@company.com. They can provide personalized guidance for your specific situation.",
      'This handbook does not constitute an employment contract and policies may be updated at the company’s discretion.',
    ],
    highlightIndex: 2,
  },
  'HR Portal': {
    title: 'HR Portal',
    paragraphs: [
      'HR Portal — Self-Service Center',
      'The HR Portal is your central resource for managing time off, benefits elections, pay stubs, and company policies.',
      'If you can’t find what you’re looking for, reach out to the HR team at hr@company.com for detailed information and personalized guidance.',
    ],
    highlightIndex: 2,
  },
};

export function getMockDocument(citation: string): MockDocument {
  return (
    MOCK_DOCUMENTS[citation] || {
      title: citation,
      paragraphs: [
        citation,
        'This document is referenced as a source for the assistant’s response, but detailed content is not available in this demo.',
      ],
      highlightIndex: 1,
    }
  );
}
