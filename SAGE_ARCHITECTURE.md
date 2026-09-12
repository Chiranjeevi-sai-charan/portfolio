# Sage Product Architecture

Complete architecture guide for building Sage: AI-Powered HR Assistant in the portfolio repo.

## Project Structure Overview

```
Portfolio Repo (Single Source of Truth)
│
├── src/
│   ├── pages/
│   │   ├── CaseStudy.jsx                          # Case study narrative page
│   │   ├── sage/
│   │   │   ├── EmployeeChatbot.tsx               # Full employee chatbot interface
│   │   │   ├── AdminDashboard.tsx                # Admin document management dashboard
│   │   │   ├── SystemAdminDashboard.tsx          # System admin analytics & compliance
│   │   │   └── SageApp.tsx                       # Main app entry point (routing, auth, layout)
│   │   └── ...
│   │
│   ├── components/
│   │   ├── sage-product/                         # ← FIGMA READS THIS FOLDER
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── layouts/
│   │   │   │   ├── ChatLayout.tsx
│   │   │   │   ├── AdminLayout.tsx
│   │   │   │   └── SystemAdminLayout.tsx
│   │   │   ├── index.ts                          # Central export
│   │   │   └── README.md                         # Component guidelines
│   │   │
│   │   ├── sage-product-stories/                 # Storybook stories
│   │   │   ├── Button.stories.tsx
│   │   │   ├── ChatBubble.stories.tsx
│   │   │   └── ...
│   │   │
│   │   ├── sage-case-study-prototypes/           # Embedded demos in case study
│   │   │   ├── ChatPrototype.tsx                 # Small interactive chat demo
│   │   │   ├── AdminDemoModal.tsx                # Small admin feature demo
│   │   │   └── ...
│   │   │
│   │   └── ... (other portfolio components)
│   │
│   ├── styles/
│   │   └── sage/
│   │       ├── tokens.ts                         # TypeScript design tokens (for code)
│   │       ├── tokens.json                       # JSON design tokens (for Figma agent)
│   │       └── global.css                        # Global Sage styles (optional)
│   │
│   └── ...
│
├── .storybook/                                   # Storybook configuration
│   ├── main.ts
│   └── preview.ts
│
├── Case Studies/Sage/                            # Case study markdown/assets
│   └── ...
│
├── package.json                                  # Add Storybook scripts
├── vite.config.js
└── SAGE_ARCHITECTURE.md                          # This file

```

## Build Sequence

### Phase 1: Foundation (Design Tokens + Core Components)
**Status:** IN PROGRESS

Files created:
- ✅ `src/styles/sage/tokens.ts` (TypeScript)
- ✅ `src/styles/sage/tokens.json` (JSON for Figma)
- ✅ `src/components/sage-product/index.ts` (component exports)
- ✅ `src/components/sage-product/Button.tsx` (example component)
- ✅ `src/components/sage-product/README.md` (guidelines)

**Next:**
- [ ] Create remaining foundation components:
  - Input, Select, Checkbox, Radio, Toggle, Textarea
  - Form validation utilities

### Phase 2: Navigation Components
Files to create:
- [ ] `Header.tsx` — Top bar with logo, search, language toggle, user profile
- [ ] `Sidebar.tsx` — Left navigation with menu items for three roles
- [ ] `Tabs.tsx` — Tab navigation (Active/Archived/Deleted for admin)
- [ ] `Breadcrumbs.tsx` — Navigation breadcrumbs

### Phase 3: Content Display Components
Files to create:
- [ ] `ChatBubble.tsx` — User message (right-aligned), AI response (left-aligned), citations
- [ ] `Card.tsx` — Reusable card with optional header, body, footer
- [ ] `Table.tsx` — Data table with sorting, filtering, pagination
- [ ] `Badge.tsx` — Status badges (Active/Archived/Deleted, role badges)
- [ ] `Avatar.tsx` — User avatar with initials or icon

### Phase 4: Modal & Overlay Components
Files to create:
- [ ] `Modal.tsx` — Base modal dialog
- [ ] `DocumentUploadModal.tsx` — Modal for uploading HR documents
- [ ] `UserManagementModal.tsx` — Modal for managing users
- [ ] `Dropdown.tsx` — Dropdown menu
- [ ] `Alert.tsx` — Alert messages (success, error, warning, info)
- [ ] `Toast.tsx` — Toast notifications

### Phase 5: Utility Components
Files to create:
- [ ] `LoadingSpinner.tsx` — Loading indicator
- [ ] `EmptyState.tsx` — Empty state with illustration
- [ ] `Pagination.tsx` — Pagination controls
- [ ] `SearchBar.tsx` — Search input with filters

### Phase 6: Layout Components
Files to create:
- [ ] `layouts/ChatLayout.tsx` — Left sidebar + center chat + right document panel
- [ ] `layouts/AdminLayout.tsx` — Left sidebar + top header + main content
- [ ] `layouts/SystemAdminLayout.tsx` — Analytics dashboard layout

### Phase 7: Main Application Pages
Files to create:
- [ ] `sage/SageApp.tsx` — Main app wrapper (routing, auth context, theme)
- [ ] `sage/EmployeeChatbot.tsx` — Full employee chat experience (3+ screens)
- [ ] `sage/AdminDashboard.tsx` — Full admin dashboard (document management, users, analytics)
- [ ] `sage/SystemAdminDashboard.tsx` — System admin analytics & compliance dashboard

### Phase 8: Storybook Setup
- [ ] Initialize Storybook
- [ ] Create stories for all components
- [ ] Deploy Storybook to Vercel

### Phase 9: Case Study Integration
- [ ] Create embedded prototypes (`sage-case-study-prototypes/`)
- [ ] Update case study page with prototype demos
- [ ] Add link to full Sage product route (`/sage`)

### Phase 10: Figma Reverse Engineering
- [ ] Push code to GitHub
- [ ] Create Figma agent brief with GitHub repo link + tokens.json
- [ ] Figma agent extracts design system and components

---

## Three Application Experiences

### 1. Employee Chatbot (`EmployeeChatbot.tsx`)

**User:** Aditya (Operations Supervisor)

**Layout:** ChatLayout (sidebar + chat + document panel)

**Key Screens/States:**
1. Chat Interface - Idle (no messages yet)
2. Chat Interface - With messages (user question + AI response with citation)
3. Chat Interface - With source document sidebar (showing policy document)
4. Chat Interface - Loading (AI generating response)
5. Chat Interface - Error state (failed query)

**Key Components Used:**
- Header (with language toggle EN/JP)
- Sidebar (navigation menu)
- ChatBubble (user + AI messages)
- Input (chat message input)
- Card (source document card in sidebar)
- Avatar (user profile)
- LoadingSpinner (when AI is thinking)

---

### 2. Admin Dashboard (`AdminDashboard.tsx`)

**User:** Priya (HR Admin)

**Layout:** AdminLayout (sidebar + header + main content)

**Key Screens/States:**
1. Document Management - Active tab (list of active documents)
2. Document Management - Archived tab (archived documents)
3. Document Management - Deleted tab (deleted documents, restore option)
4. User Management - List of users in department
5. User Management - Add user modal
6. Analytics - Usage metrics (which policies accessed, by whom, when)

**Key Components Used:**
- Header (with profile, settings)
- Sidebar (navigation: Documents, Users, Analytics, Settings)
- Tabs (Active/Archived/Deleted)
- Table (document list, user list, analytics data)
- Card (stat cards showing metrics)
- Button (upload, delete, restore, add user)
- Modal (upload document, add user)
- Badge (status badges: Active, Archived, Deleted)
- Dropdown (filters: Department, Content Type, Sensitivity)

---

### 3. System Admin Dashboard (`SystemAdminDashboard.tsx`)

**User:** Kenji (IT Manager / System Admin)

**Layout:** SystemAdminLayout (analytics-focused)

**Key Screens/States:**
1. Analytics Dashboard - Overview (stat cards: total queries, active users, documents accessed)
2. Analytics Dashboard - Usage chart (time-series graph of queries over time)
3. Analytics Dashboard - Popular policies table (which HR policies accessed most)
4. Analytics Dashboard - Audit log table (who accessed what, when, from where)
5. Compliance Dashboard - User activity log

**Key Components Used:**
- Header (with date range picker)
- Sidebar (Analytics, Compliance, User Management, System Health)
- Card (stat tiles)
- Table (usage data, audit logs)
- Chart component (time-series usage data) — may use external library
- Badge (compliance status)
- Pagination (for large data sets)

---

## Design Tokens

All tokens defined in `src/styles/sage/tokens.ts`:

```typescript
// Colors
colors.sage-green-500    // Primary action
colors.neutral-900       // Text primary
colors.error-red         // Errors, destructive actions
colors.warning-amber     // Warnings, archived state
colors.success-green     // Success, verified

// Spacing (4px base unit)
spacing.xs = "4px"
spacing.sm = "8px"
spacing.md = "12px"
spacing.lg = "16px"
spacing.xl = "24px"

// Typography
typography.fontSize.h1 = "32px"
typography.fontSize.body-md = "15px"
typography.fontWeight.bold = 700

// Component Sizes
componentSizes.button.md = { height: "44px", padding: "0 16px" }
componentSizes.header.height = "64px"
componentSizes.sidebar.width = "200px"
```

## Component Development Checklist

For each component, ensure:

- [ ] **TypeScript Props Interface** — All props documented
- [ ] **JSDoc Comments** — Component purpose, variants, sizes, states
- [ ] **Design Token Usage** — No arbitrary pixel values
- [ ] **Variant Support** — All documented variants implemented
- [ ] **State Support** — Default, hover, active, disabled, loading (if applicable)
- [ ] **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation
- [ ] **Responsive** — Works on mobile, tablet, desktop (if applicable)
- [ ] **Story File** — Created in `sage-product-stories/`
- [ ] **Export** — Added to `index.ts`
- [ ] **Documentation** — Added to component comment with usage example

---

## Deployment

### Local Development
```bash
npm run dev                 # Start dev server
npm run storybook          # Start Storybook (after setup)
```

### Routes
- `/` — Portfolio home
- `/case-study/sage` — Sage case study (with embedded prototypes)
- `/sage` — Full Sage application
- `/storybook` — Component library (after Storybook deployed)

### Vercel Deployment
```bash
vercel deploy              # Deploy entire repo
# Single deployment, all routes available
```

---

## Reverse Engineering for Figma

When code is complete:

1. **GitHub Source:** `https://github.com/[user]/UIUX-Design-Portfolio`
2. **Component Folder:** `/src/components/sage-product/`
3. **Design Tokens:** `/src/styles/sage/tokens.json`
4. **Storybook:** `https://sage-storybook.vercel.app` (deployed)

**Figma Agent Brief:**
- Read component code from GitHub
- Extract TypeScript props → component variants
- Read tokens.json → design variables
- View Storybook → rendered components
- Create Figma design system matching code exactly

---

## Development Tips

1. **Use TypeScript** — Props document what's available
2. **Consistent Naming** — PascalCase components, camelCase props
3. **Design Tokens Only** — Never use arbitrary values
4. **Comment Variants** — JSDoc shows Figma agent what to extract
5. **Keep Components Small** — Single responsibility principle
6. **Test Multilingual** — Sage supports English + Japanese

---

## Next Steps

1. **Create Input component** — Form foundation
2. **Create ChatBubble component** — Core for employee experience
3. **Create Header + Sidebar** — Navigation for all three experiences
4. **Build EmployeeChatbot page** — First complete user experience
5. **Build AdminDashboard page** — Second complete user experience

Ready to start component development?
