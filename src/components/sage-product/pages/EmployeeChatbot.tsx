import React, { useState } from 'react';
import { colors, spacing, typography } from '../../../styles/sage/tokens';
import { ChatLayout } from '../layouts/ChatLayout';
import { SidebarItem } from '../Sidebar';

/**
 * EmployeeChatbot Page
 *
 * Employee-facing HR chatbot interface for asking HR questions.
 *
 * @component
 * @example
 * <EmployeeChatbot />
 */

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  citations?: string[];
}

/**
 * EmployeeChatbot - Main employee chat interface
 *
 * Features:
 * - AI-powered HR question answering
 * - Chat history persistence
 * - Message citations and source documents
 * - Real-time typing simulation
 * - Conversation memory
 */
export const EmployeeChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! 👋 I\'m Sage, your HR assistant. I can help you with questions about company policies, benefits, time off, and more. What can I help you with today?',
      timestamp: new Date().toLocaleTimeString(),
      citations: ['Company Handbook - Section 1'],
    },
  ]);

  const chatHistory: SidebarItem[] = [
    {
      id: 'chat-1',
      label: 'Vacation Policy Questions',
      icon: '🏖️',
      onClick: () => loadConversation('chat-1'),
    },
    {
      id: 'chat-2',
      label: 'Health Insurance Coverage',
      icon: '🏥',
      onClick: () => loadConversation('chat-2'),
    },
    {
      id: 'chat-3',
      label: 'Performance Review Process',
      icon: '📊',
      onClick: () => loadConversation('chat-3'),
    },
    {
      id: 'chat-4',
      label: 'Work from Home Policy',
      icon: '🏠',
      onClick: () => loadConversation('chat-4'),
    },
  ];

  const handleSendMessage = (userMessage: string) => {
    // Add user message
    const userMsg: Message = {
      id: String(Date.now()),
      type: 'user',
      content: userMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMsg: Message = {
        id: String(Date.now() + 1),
        type: 'ai',
        content: generateAIResponse(userMessage),
        timestamp: new Date().toLocaleTimeString(),
        citations: generateCitations(userMessage),
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses: Record<string, string> = {
      vacation:
        'You have 20 days of paid vacation per year, which resets on January 1st. You can request time off through the HR portal up to 30 days in advance.',
      sick:
        'You have 10 paid sick days per year for illness or medical appointments. Extended absences may require medical documentation.',
      insurance:
        'We offer comprehensive health insurance with 80% coverage of premiums. Open enrollment is in November each year.',
      benefits:
        'Benefits include health insurance, 401(k) matching, gym membership reimbursement, and professional development budget.',
      remote:
        'Our work-from-home policy allows up to 3 days per week remote work. Please coordinate with your manager and ensure regular team presence.',
      salary:
        'Salary information is confidential. Your compensation was discussed during your offer. For adjustments, please discuss with your manager.',
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return 'That\'s a great question! Based on our company policies, I recommend reaching out to the HR team at hr@company.com for detailed information. They can provide personalized guidance for your situation.';
  };

  const generateCitations = (userMessage: string): string[] => {
    const citations: Record<string, string[]> = {
      vacation: ['Company Handbook - Time Off Policy', 'HR Portal - Vacation Request Guide'],
      sick: ['Company Handbook - Sick Leave', 'Employee Benefits Summary'],
      insurance: ['Company Handbook - Health Benefits', 'Open Enrollment Guide 2024'],
      benefits: ['Employee Benefits Summary', 'Compensation & Benefits Package'],
      remote: ['Company Handbook - Work Arrangements', 'Remote Work Policy v2.0'],
    };

    for (const [key, cits] of Object.entries(citations)) {
      if (userMessage.toLowerCase().includes(key)) {
        return cits;
      }
    }

    return ['Company Handbook', 'HR Portal'];
  };

  const loadConversation = (chatId: string) => {
    console.log('Loading conversation:', chatId);
    // In a real app, load the conversation history from backend
  };

  const containerStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
  };

  return (
    <div style={containerStyles}>
      <ChatLayout
        userRole="Employee"
        userName="Employee"
        userInitials="EMP"
        messages={messages}
        onSendMessage={handleSendMessage}
        chatHistory={chatHistory}
      />
    </div>
  );
};

EmployeeChatbot.displayName = 'EmployeeChatbot';
