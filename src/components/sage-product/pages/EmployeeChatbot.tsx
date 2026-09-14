import React, { useState } from 'react';
import { ChatLayout } from '../layouts/ChatLayout';
import { SidebarItem } from '../Sidebar';
import { generateAIResponse } from '../../../utils/mockAIResponses';

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
  { id: 'chat-1', title: 'Vacation Policy Questions', icon: 'chat' },
  { id: 'chat-2', title: 'Health Insurance Coverage', icon: 'chat' },
  { id: 'chat-3', title: 'Performance Review Process', icon: 'chat' },
  { id: 'chat-4', title: 'Work from Home Policy', icon: 'chat' },
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
  const [language, setLanguage] = useState<'en' | 'ja'>('en');

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
      const response = generateAIResponse(userMessage, language);
      const aiMsg: Message = {
        id: String(Date.now() + 1),
        type: 'ai',
        content: response.text,
        timestamp: new Date().toLocaleTimeString(),
        citations: response.citations,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const containerStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
  };

  return (
    <div style={containerStyles}>
      <ChatLayout
        userRole="Employee"
        userName="Aditya"
        userDepartment="Human Resources (HR)"
        userInitials="A"
        messages={messages}
        onSendMessage={handleSendMessage}
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onChatMenuAction={handleChatMenuAction}
        language={language}
        onLanguageChange={setLanguage}
      />
    </div>
  );
};

EmployeeChatbot.displayName = 'EmployeeChatbot';
