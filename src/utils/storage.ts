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
  contentType: string;
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
  /** Departments this user can access. 'General' is available to everyone and is always included. */
  departments: string[];
  createdAt: number;
}

export interface SageAppState {
  currentUser: User | null;
  currentRole: 'user' | 'admin' | 'system-admin';
  currentConversationId: string | null;
  selectedDepartments: string[];
}

/**
 * A single chatbot Q&A event, logged for the System Admin Analytics dashboard.
 *
 * Privacy: the user's actual question text is NEVER stored. Only the
 * matched topic category and which source documents were cited are kept,
 * alongside the asker's role/department/language for aggregate reporting.
 */
export interface QueryEvent {
  id: string;
  /** Topic category matched from the question (not the raw text) */
  topic: string;
  /** Source documents cited in the response, if any */
  citations: string[];
  role: 'user' | 'admin' | 'system-admin';
  department: string;
  language: 'en' | 'ja';
  timestamp: number;
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
  QUERY_EVENTS: 'sage_query_events',
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

  /** Active, non-sensitive documents visible to any employee company-wide. */
  getVisibleForEmployee: (): Document[] => {
    try {
      const documents = documentStorage.getAll();
      return documents.filter((d) => d.status === 'active' && d.sensitivity !== 'Sensitive');
    } catch (err) {
      console.error('Error getting employee-visible documents:', err);
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

  /**
   * Archives any active document in the same department with the same name
   * whose document date is older than `newDate` — treats a re-upload of the
   * same file as a newer version and retires the prior one automatically.
   */
  archiveOlderVersions: (name: string, department: string, newDate: string) => {
    try {
      if (!newDate) return;
      const documents = documentStorage.getAll();
      let changed = false;
      documents.forEach((d) => {
        if (
          d.status === 'active' &&
          d.name === name &&
          d.department === department &&
          d.date &&
          d.date < newDate
        ) {
          d.status = 'archived';
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
      }
    } catch (err) {
      console.error('Error auto-archiving older document versions:', err);
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
      const users = data ? JSON.parse(data) : [];
      // Migrate stale records saved under the old single `department` field
      return users.map((u: any) =>
        Array.isArray(u.departments) ? u : { ...u, departments: u.department ? [u.department] : ['General'] }
      );
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
      return users.filter((u) => u.departments.includes(department));
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
// Query Event Storage (Analytics)
// ============================================================================

export const analyticsStorage = {
  /** Logs a Q&A event. Never pass the user's raw question text here. */
  log: (event: Omit<QueryEvent, 'id' | 'timestamp'>) => {
    try {
      const events = analyticsStorage.getAll();
      events.push({ ...event, id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, timestamp: Date.now() });
      // Cap history to the most recent 1000 events to keep localStorage lean
      const trimmed = events.length > 1000 ? events.slice(events.length - 1000) : events;
      localStorage.setItem(STORAGE_KEYS.QUERY_EVENTS, JSON.stringify(trimmed));
    } catch (err) {
      console.error('Error logging query event:', err);
    }
  },

  getAll: (): QueryEvent[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUERY_EVENTS);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error getting query events:', err);
      return [];
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.QUERY_EVENTS);
    } catch (err) {
      console.error('Error clearing query events:', err);
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

/**
 * Users and documents are reseeded fresh on every app load (see
 * resetSageDemoData), not just when storage is empty. This is a public demo:
 * anything a visitor uploads, deletes, or edits during a session must not
 * outlive that session, so a page reload always returns to this known-good,
 * privacy-safe baseline.
 */
const seedUsersAndDocuments = () => {
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Chiranjeevi',
      email: 'Chiranjeevi.Kondaka@gmail.com',
      role: 'system-admin',
      departments: ['General'],
      createdAt: Date.now(),
    },
    {
      id: '2',
      name: 'Sai Ganesh',
      email: 'Sai.Ganesh@gmail.com',
      role: 'admin',
      departments: ['General', 'Human Resources (HR)'],
      createdAt: Date.now(),
    },
    {
      id: '3',
      name: 'Pragati',
      email: 'Pragati@gmail.com',
      role: 'admin',
      departments: ['General', 'Human Resources (HR)'],
      createdAt: Date.now(),
    },
    {
      id: '4',
      name: 'Shreyash',
      email: 'Shreyash@gmail.com',
      role: 'admin',
      departments: ['General', 'Information Technology (IT)'],
      createdAt: Date.now(),
    },
    {
      id: '5',
      name: 'Ananya Rao',
      email: 'Ananya.Rao@gmail.com',
      role: 'admin',
      departments: ['General', 'Finance & Accounts'],
      createdAt: Date.now(),
    },
    {
      id: '6',
      name: 'Ishita Malhotra',
      email: 'Ishita.Malhotra@gmail.com',
      role: 'system-admin',
      departments: ['General'],
      createdAt: Date.now(),
    },
  ];

  mockUsers.forEach((user) => userStorage.save(user));

    const mockDocuments: Document[] = [
      {
        id: 'doc1',
        name: 'HR Policy FAQ.docx',
        type: 'docx',
        contentType: 'FAQ',
        department: 'Human Resources (HR)',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-21',
        uploadedBy: 'Sai.Ganesh@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 2,
      },
      {
        id: 'doc2',
        name: 'Company Org Chart.pdf',
        type: 'pdf',
        contentType: 'Other',
        department: 'General',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-20',
        uploadedBy: 'Shreyash@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 1,
      },
      {
        id: 'doc3',
        name: 'Leave & Attendance Policy.pdf',
        type: 'pdf',
        contentType: 'Policy',
        department: 'Human Resources (HR)',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-18',
        uploadedBy: 'Pragati@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 3,
      },
      {
        id: 'doc4',
        name: 'Employee Benefits Handbook.pdf',
        type: 'pdf',
        contentType: 'Handbook',
        department: 'Human Resources (HR)',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-17',
        uploadedBy: 'Sai.Ganesh@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 4,
      },
      {
        id: 'doc5',
        name: 'Salary Structure FY24.xlsx',
        type: 'xlsx',
        contentType: 'Report',
        department: 'Human Resources (HR)',
        sensitivity: 'Sensitive',
        date: '2024-05-16',
        uploadedBy: 'Pragati@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 5,
      },
      {
        id: 'doc6',
        name: 'Code of Conduct.pdf',
        type: 'pdf',
        contentType: 'Policy',
        department: 'General',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-15',
        uploadedBy: 'Shreyash@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 6,
      },
      {
        id: 'doc7',
        name: 'Work From Home Guidelines.docx',
        type: 'docx',
        contentType: 'Guide',
        department: 'Human Resources (HR)',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-14',
        uploadedBy: 'Sai.Ganesh@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 7,
      },
      {
        id: 'doc8',
        name: 'IT Security & Acceptable Use Policy.pdf',
        type: 'pdf',
        contentType: 'Policy',
        department: 'Information Technology (IT)',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-13',
        uploadedBy: 'Shreyash@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 8,
      },
      {
        id: 'doc9',
        name: 'Onboarding Checklist - New Hires.pptx',
        type: 'pptx',
        contentType: 'Guide',
        department: 'Human Resources (HR)',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-12',
        uploadedBy: 'Pragati@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 9,
      },
      {
        id: 'doc10',
        name: 'IT Asset Request Form.docx',
        type: 'docx',
        contentType: 'Form',
        department: 'Information Technology (IT)',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-11',
        uploadedBy: 'Shreyash@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 10,
      },
      {
        id: 'doc11',
        name: 'Performance Review Template.xlsx',
        type: 'xlsx',
        contentType: 'Form',
        department: 'Human Resources (HR)',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-10',
        uploadedBy: 'Sai.Ganesh@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 11,
      },
      {
        id: 'doc12',
        name: 'Q1 Departmental Budget Report.xlsx',
        type: 'xlsx',
        contentType: 'Report',
        department: 'Finance & Accounts',
        sensitivity: 'Sensitive',
        date: '2024-05-09',
        uploadedBy: 'Ananya.Rao@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 12,
      },
      {
        id: 'doc13',
        name: 'Travel & Expense Reimbursement Guide.pdf',
        type: 'pdf',
        contentType: 'Guide',
        department: 'Finance & Accounts',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-08',
        uploadedBy: 'Ananya.Rao@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 13,
      },
      {
        id: 'doc14',
        name: 'Health Insurance Enrollment Guide.docx',
        type: 'docx',
        contentType: 'Guide',
        department: 'Human Resources (HR)',
        sensitivity: 'Non-Sensitive',
        date: '2024-05-07',
        uploadedBy: 'Pragati@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 14,
      },
      {
        id: 'doc15',
        name: 'Exit Interview Feedback Summary.xlsx',
        type: 'xlsx',
        contentType: 'Report',
        department: 'Human Resources (HR)',
        sensitivity: 'Sensitive',
        date: '2024-05-06',
        uploadedBy: 'Sai.Ganesh@gmail.com',
        status: 'active',
        uploadedAt: Date.now() - 86400000 * 15,
      },
      {
        id: 'doc16',
        name: 'Leave & Attendance Policy.pdf',
        type: 'pdf',
        contentType: 'Policy',
        department: 'Human Resources (HR)',
        sensitivity: 'Non-Sensitive',
        date: '2022-11-02',
        uploadedBy: 'Pragati@gmail.com',
        status: 'archived',
        uploadedAt: Date.now() - 86400000 * 220,
      },
      {
        id: 'doc17',
        name: 'FY22 Compensation Report.xlsx',
        type: 'xlsx',
        contentType: 'Report',
        department: 'Human Resources (HR)',
        sensitivity: 'Sensitive',
        date: '2022-04-15',
        uploadedBy: 'Sai.Ganesh@gmail.com',
        status: 'archived',
        uploadedAt: Date.now() - 86400000 * 260,
      },
      {
        id: 'doc18',
        name: 'Draft Remote Work Policy (unapproved).docx',
        type: 'docx',
        contentType: 'Policy',
        department: 'Human Resources (HR)',
        sensitivity: 'Non-Sensitive',
        date: '2024-01-09',
        uploadedBy: 'Pragati@gmail.com',
        status: 'deleted',
        uploadedAt: Date.now() - 86400000 * 60,
      },
      {
        id: 'doc19',
        name: 'Old IT Onboarding Checklist.xlsx',
        type: 'xlsx',
        contentType: 'Guide',
        department: 'Information Technology (IT)',
        sensitivity: 'Non-Sensitive',
        date: '2024-02-14',
        uploadedBy: 'Shreyash@gmail.com',
        status: 'deleted',
        uploadedAt: Date.now() - 86400000 * 30,
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
};

/**
 * Seeds demo Q&A analytics events if none exist yet. resetSageDemoData
 * clears analyticsStorage before calling this, so in practice this always
 * reseeds on a real page load; the empty-check just makes this safe to also
 * call from initializeMockData's safety net without duplicating events.
 * Real chat activity during a session logs on top of this baseline and
 * persists until the next reload/reset.
 */
const seedAnalyticsIfEmpty = () => {
  if (analyticsStorage.getAll().length > 0) return;

  // Anchor events matching the seeded sidebar chats (see SEED_CONVERSATIONS
  // in RoleWorkspace/EmployeeChatbot) so the Analytics dashboard visibly
  // reflects the same conversations a viewer sees in the chat history,
  // rather than showing disconnected random topics.
  const ANCHORS: { topic: string; citations: string[]; role: 'user' | 'admin'; daysAgo: number }[] = [
    { topic: 'vacation', citations: ['Company Handbook - Time Off Policy', 'HR Portal - Vacation Request Guide'], role: 'user', daysAgo: 1 },
    { topic: 'insurance', citations: ['Company Handbook - Health Benefits', 'Open Enrollment Guide 2024'], role: 'user', daysAgo: 2 },
    { topic: 'remote', citations: ['Company Handbook - Work Arrangements', 'Remote Work Policy v2.0'], role: 'user', daysAgo: 5 },
    { topic: 'vacation', citations: ['Company Handbook - Time Off Policy', 'HR Portal - Vacation Request Guide'], role: 'admin', daysAgo: 2 },
    { topic: 'insurance', citations: ['Company Handbook - Health Benefits', 'Open Enrollment Guide 2024'], role: 'admin', daysAgo: 3 },
  ];
  ANCHORS.forEach((a) => {
    analyticsStorage.log({ topic: a.topic, citations: a.citations, role: a.role, department: 'General', language: 'en' });
    const events = analyticsStorage.getAll();
    events[events.length - 1].timestamp = Date.now() - a.daysAgo * 86400000;
    localStorage.setItem('sage_query_events', JSON.stringify(events));
  });

  const TOPICS: { topic: string; citations: string[] }[] = [
    { topic: 'vacation', citations: ['Company Handbook - Time Off Policy', 'HR Portal - Vacation Request Guide'] },
    { topic: 'sick', citations: ['Company Handbook - Sick Leave', 'Employee Benefits Summary'] },
    { topic: 'insurance', citations: ['Company Handbook - Health Benefits', 'Open Enrollment Guide 2024'] },
    { topic: 'benefits', citations: ['Employee Benefits Summary', 'Compensation & Benefits Package'] },
    { topic: 'remote', citations: ['Company Handbook - Work Arrangements', 'Remote Work Policy v2.0'] },
    { topic: 'salary', citations: ['Employee Handbook - Compensation Policy', 'HR Portal'] },
    { topic: 'handbook', citations: ['Company Handbook', 'HR Portal'] },
    { topic: 'uncategorized', citations: [] },
  ];
  const ROLES: Array<'user' | 'admin' | 'system-admin'> = ['user', 'user', 'user', 'user', 'admin', 'admin', 'system-admin'];
  const DEPARTMENTS = ['General', 'Human Resources (HR)', 'Information Technology (IT)', 'Finance & Accounts'];
  const WEIGHTS = [8, 5, 4, 3, 3, 1, 2, 1]; // skews toward vacation/sick/insurance, mirrors research findings
  const weightedPool = TOPICS.flatMap((t, idx) => Array(WEIGHTS[idx]).fill(t));

  for (let i = 0; i < 90; i++) {
    const pick = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    // Bias toward more recent days (usage ramping up) while still covering
    // the full 30-day window, so the Activity Over Time chart doesn't show
    // an artificial flat stretch before a hard cutoff.
    const daysAgo = Math.floor(Math.min(Math.random(), Math.random()) * 29);
    analyticsStorage.log({
      topic: pick.topic,
      citations: pick.citations,
      role: ROLES[Math.floor(Math.random() * ROLES.length)],
      department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
      language: Math.random() < 0.22 ? 'ja' : 'en',
    });
    // Backdate the event (log() always stamps "now", so patch it after)
    const events = analyticsStorage.getAll();
    events[events.length - 1].timestamp = Date.now() - daysAgo * 86400000 - Math.floor(Math.random() * 86400000);
    localStorage.setItem('sage_query_events', JSON.stringify(events));
  }
};

/** Safety-net seed used by individual pages: only fills in data if storage is completely empty. */
export const initializeMockData = () => {
  if (userStorage.getAll().length === 0) {
    seedUsersAndDocuments();
  }
  seedAnalyticsIfEmpty();
};

/**
 * Resets users, documents, and analytics to the known-good demo baseline,
 * discarding anything a visitor uploaded, edited, or generated by chatting.
 * Called once per app load so a page reload can never leave real personal
 * data, a stale record, or a sparse/inconsistent analytics history sitting
 * in this public demo - every visitor starts from the same known-good
 * baseline regardless of what was already in their browser's localStorage.
 */
export const resetSageDemoData = () => {
  documentStorage.clear();
  userStorage.clear();
  analyticsStorage.clear();
  appStateStorage.clear();
  seedUsersAndDocuments();
  seedAnalyticsIfEmpty();
};
