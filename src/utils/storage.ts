/**
 * Local Storage Utilities for Sage Product
 * Handles persistence of chat, documents, and user data
 */

// ============================================================================
// Type Definitions
// ============================================================================

export interface ChatConversation {
  id: string;
  title: string;
  department: string;
  messages: ChatMessage[];
  timestamp: number;
  updated: number;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  citations?: string[];
  timestamp: string;
  liked?: boolean;
  disliked?: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  department: string;
  sensitivity: string;
  date: string;
  uploadedBy: string;
  status: 'active' | 'archived' | 'deleted';
  uploadedAt: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'system-admin';
  department: string;
  createdAt: number;
}

export interface SageAppState {
  currentUser: User | null;
  currentRole: 'user' | 'admin' | 'system-admin';
  currentConversationId: string | null;
  selectedDepartments: string[];
}

// ============================================================================
// Storage Keys
// ============================================================================

const STORAGE_KEYS = {
  CONVERSATIONS: 'sage_conversations',
  DOCUMENTS: 'sage_documents',
  USERS: 'sage_users',
  APP_STATE: 'sage_app_state',
  CURRENT_USER: 'sage_current_user',
};

// ============================================================================
// Conversation Storage
// ============================================================================

export const conversationStorage = {
  save: (conversation: ChatConversation) => {
    try {
      const conversations = conversationStorage.getAll();
      const index = conversations.findIndex((c) => c.id === conversation.id);
      if (index >= 0) {
        conversations[index] = conversation;
      } else {
        conversations.push(conversation);
      }
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    } catch (err) {
      console.error('Error saving conversation:', err);
    }
  },

  getById: (id: string): ChatConversation | null => {
    try {
      const conversations = conversationStorage.getAll();
      return conversations.find((c) => c.id === id) || null;
    } catch (err) {
      console.error('Error getting conversation:', err);
      return null;
    }
  },

  getAll: (): ChatConversation[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error getting conversations:', err);
      return [];
    }
  },

  delete: (id: string) => {
    try {
      const conversations = conversationStorage.getAll();
      const filtered = conversations.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(filtered));
    } catch (err) {
      console.error('Error deleting conversation:', err);
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
    } catch (err) {
      console.error('Error clearing conversations:', err);
    }
  },
};

// ============================================================================
// Document Storage
// ============================================================================

export const documentStorage = {
  save: (document: Document) => {
    try {
      const documents = documentStorage.getAll();
      const index = documents.findIndex((d) => d.id === document.id);
      if (index >= 0) {
        documents[index] = document;
      } else {
        documents.push(document);
      }
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
    } catch (err) {
      console.error('Error saving document:', err);
    }
  },

  getById: (id: string): Document | null => {
    try {
      const documents = documentStorage.getAll();
      return documents.find((d) => d.id === id) || null;
    } catch (err) {
      console.error('Error getting document:', err);
      return null;
    }
  },

  getAll: (): Document[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error getting documents:', err);
      return [];
    }
  },

  getByStatus: (status: 'active' | 'archived' | 'deleted'): Document[] => {
    try {
      const documents = documentStorage.getAll();
      return documents.filter((d) => d.status === status);
    } catch (err) {
      console.error('Error getting documents by status:', err);
      return [];
    }
  },

  getByDepartment: (department: string): Document[] => {
    try {
      const documents = documentStorage.getAll();
      return documents.filter((d) => d.department === department && d.status === 'active');
    } catch (err) {
      console.error('Error getting documents by department:', err);
      return [];
    }
  },

  delete: (id: string) => {
    try {
      const documents = documentStorage.getAll();
      const filtered = documents.filter((d) => d.id !== id);
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(filtered));
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  },

  archive: (id: string) => {
    try {
      const doc = documentStorage.getById(id);
      if (doc) {
        doc.status = 'archived';
        documentStorage.save(doc);
      }
    } catch (err) {
      console.error('Error archiving document:', err);
    }
  },

  restore: (id: string) => {
    try {
      const doc = documentStorage.getById(id);
      if (doc) {
        doc.status = 'active';
        documentStorage.save(doc);
      }
    } catch (err) {
      console.error('Error restoring document:', err);
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.DOCUMENTS);
    } catch (err) {
      console.error('Error clearing documents:', err);
    }
  },
};

// ============================================================================
// User Storage
// ============================================================================

export const userStorage = {
  save: (user: User) => {
    try {
      const users = userStorage.getAll();
      const index = users.findIndex((u) => u.id === user.id);
      if (index >= 0) {
        users[index] = user;
      } else {
        users.push(user);
      }
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (err) {
      console.error('Error saving user:', err);
    }
  },

  getById: (id: string): User | null => {
    try {
      const users = userStorage.getAll();
      return users.find((u) => u.id === id) || null;
    } catch (err) {
      console.error('Error getting user:', err);
      return null;
    }
  },

  getAll: (): User[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error getting users:', err);
      return [];
    }
  },

  getByRole: (role: string): User[] => {
    try {
      const users = userStorage.getAll();
      return users.filter((u) => u.role === role);
    } catch (err) {
      console.error('Error getting users by role:', err);
      return [];
    }
  },

  getByDepartment: (department: string): User[] => {
    try {
      const users = userStorage.getAll();
      return users.filter((u) => u.department === department);
    } catch (err) {
      console.error('Error getting users by department:', err);
      return [];
    }
  },

  delete: (id: string) => {
    try {
      const users = userStorage.getAll();
      const filtered = users.filter((u) => u.id !== id);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USERS);
    } catch (err) {
      console.error('Error clearing users:', err);
    }
  },
};

// ============================================================================
// App State Storage
// ============================================================================

export const appStateStorage = {
  save: (state: SageAppState) => {
    try {
      localStorage.setItem(STORAGE_KEYS.APP_STATE, JSON.stringify(state));
    } catch (err) {
      console.error('Error saving app state:', err);
    }
  },

  get: (): SageAppState | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APP_STATE);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Error getting app state:', err);
      return null;
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.APP_STATE);
    } catch (err) {
      console.error('Error clearing app state:', err);
    }
  },
};

// ============================================================================
// Initialization - Seed with Mock Data
// ============================================================================

export const initializeMockData = () => {
  // Only seed if no data exists
  if (userStorage.getAll().length === 0) {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Sai Ganesh',
        email: 'Sai.Ganesh@motherson.com',
        role: 'system-admin',
        department: 'General',
        createdAt: Date.now(),
      },
      {
        id: '2',
        name: 'Kiruthiga Ramaswami',
        email: 'Kiruthiga.Ramaswami@motherson.com',
        role: 'admin',
        department: 'Human Resources (HR)',
        createdAt: Date.now(),
      },
      {
        id: '3',
        name: 'Chiranjeevi Kondaka',
        email: 'Chiranjeevi.Kondaka@motherson.com',
        role: 'user',
        department: 'Human Resources (HR)',
        createdAt: Date.now(),
      },
      {
        id: '4',
        name: 'Rahul Pal',
        email: 'Rahul.pal02@motherson.com',
        role: 'admin',
        department: 'General',
        createdAt: Date.now(),
      },
    ];

    mockUsers.forEach((user) => userStorage.save(user));

    const mockDocuments: Document[] = [
      {
        id: 'doc1',
        name: 'yachiyo_queries.docx',
        type: 'docx',
        department: 'Human Resources (HR)',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-21',
        uploadedBy: 'Rahul.pal02@motherson.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 2,
      },
      {
        id: 'doc2',
        name: 'Supplier B-Maruti 2.xlsx',
        type: 'xlsx',
        department: 'General',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-20',
        uploadedBy: 'Rahul.pal02@motherson.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 1,
      },
    ];

    mockDocuments.forEach((doc) => documentStorage.save(doc));

    // Initialize default app state
    appStateStorage.save({
      currentUser: mockUsers[0],
      currentRole: 'system-admin',
      currentConversationId: null,
      selectedDepartments: ['General'],
    });
  }
};
