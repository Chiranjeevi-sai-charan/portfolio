import React, { useState } from 'react';
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
  liked?: boolean;
  disliked?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  icon: string;
}

const SEED_CONVERSATIONS: Conversation[] = [
  { id: 'chat-1', title: 'Vacation Policy Questions', icon: 'beach_access' },
  { id: 'chat-2', title: 'Health Insurance Coverage', icon: 'local_hospital' },
  { id: 'chat-3', title: 'Performance Review Process', icon: 'bar_chart' },
  { id: 'chat-4', title: 'Work from Home Policy', icon: 'home' },
];

/**
 * EmployeeChatbot - Main employee chat interface
 *
 * Features:
 * - AI-powered HR question answering
 * - Chat history that updates dynamically as new conversations start
 * - Message citations and source documents
 * - Real-time typing simulation
 */
export const EmployeeChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(SEED_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const chatHistory: SidebarItem[] = conversations.map((c) => ({
    id: c.id,
    label: c.title,
    icon: c.icon,
    hasMenu: true,
  }));

  const handleNewChat = () => {
    setMessages([]);
    setActiveConversationId(null);
  };

  const handleChatMenuAction = (item: SidebarItem, action: string) => {
    switch (action) {
      case 'delete':
        setConversations((prev) => prev.filter((c) => c.id !== item.id));
        if (item.id === activeConversationId) {
          handleNewChat();
        }
        break;
      case 'rename': {
        const newTitle = window.prompt('Rename chat', item.label);
        if (newTitle && newTitle.trim()) {
          setConversations((prev) =>
            prev.map((c) => (c.id === item.id ? { ...c, title: newTitle.trim() } : c))
          );
        }
        break;
      }
      default:
        console.log(`Chat action "${action}" on:`, item.label);
    }
  };

  const handleSendMessage = (userMessage: string) => {
    // If this is the first message of a fresh conversation, add it to the sidebar history
    if (!activeConversationId) {
      const newId = String(Date.now());
      const title =
        userMessage.length > 40 ? `${userMessage.slice(0, 40).trim()}...` : userMessage;
      setConversations((prev) => [{ id: newId, title, icon: 'chat' }, ...prev]);
      setActiveConversationId(newId);
    }

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

    return "That's a great question! Based on our company policies, I recommend reaching out to the HR team at hr@company.com for detailed information. They can provide personalized guidance for your situation.";
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

  const containerStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
  };

  return (
    <div style={containerStyles}>
      <ChatLayout
        userRole="Employee"
        userName="Sai Ganesh"
        userInitials="SG"
        messages={messages}
        onSendMessage={handleSendMessage}
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onChatMenuAction={handleChatMenuAction}
      />
    </div>
  );
};

EmployeeChatbot.displayName = 'EmployeeChatbot';
