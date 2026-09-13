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
 */

export interface AIResponse {
  text: string;
  citations: string[];
}

const RESPONSES: Record<string, AIResponse> = {
  vacation: {
    text: 'You have 20 days of paid vacation per year, which resets on January 1st.[[1]] You can request time off through the HR portal up to 30 days in advance.[[2]]',
    citations: ['Company Handbook - Time Off Policy', 'HR Portal - Vacation Request Guide'],
  },
  sick: {
    text: 'You have 10 paid sick days per year for illness or medical appointments.[[1]] Extended absences may require medical documentation.[[2]]',
    citations: ['Company Handbook - Sick Leave', 'Employee Benefits Summary'],
  },
  insurance: {
    text: 'We offer comprehensive health insurance with 80% coverage of premiums.[[1]] Open enrollment is in November each year.[[2]]',
    citations: ['Company Handbook - Health Benefits', 'Open Enrollment Guide 2024'],
  },
  benefits: {
    text: 'Benefits include health insurance, 401(k) matching, gym membership reimbursement, and professional development budget.[[1]][[2]]',
    citations: ['Employee Benefits Summary', 'Compensation & Benefits Package'],
  },
  remote: {
    text: 'Our work-from-home policy allows up to 3 days per week remote work.[[1]] Please coordinate with your manager and ensure regular team presence.[[2]]',
    citations: ['Company Handbook - Work Arrangements', 'Remote Work Policy v2.0'],
  },
  salary: {
    text: 'Salary information is confidential.[[1]] Your compensation was discussed during your offer. For adjustments, please discuss with your manager.[[2]]',
    citations: ['Employee Handbook - Compensation Policy', 'HR Portal'],
  },
};

const DEFAULT_RESPONSE: AIResponse = {
  text: "That's a great question! Based on our company policies, I recommend reaching out to the HR team at hr@company.com for detailed information.[[1]] They can provide personalized guidance for your situation.[[2]]",
  citations: ['Company Handbook', 'HR Portal'],
};

export function generateAIResponse(userMessage: string): AIResponse {
  const lowerMessage = userMessage.toLowerCase();
  for (const [key, response] of Object.entries(RESPONSES)) {
    if (lowerMessage.includes(key)) return response;
  }
  return DEFAULT_RESPONSE;
}
