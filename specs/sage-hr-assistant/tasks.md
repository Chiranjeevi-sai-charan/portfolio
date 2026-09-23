# Task Breakdown: Sage — AI HR Assistant

Companion to [spec.md](./spec.md) and [plan.md](./plan.md). Reconstructed as
the granular checklist the spec/plan above would decompose into — grouped by
the same delivery order the git history shows the product was actually built
in (see branch `feature/sage-my-support-bot`), so this reads as a real task
list rather than an arbitrary reordering.

## Phase 1 — Design system foundation
- [x] Define shared design tokens (`src/styles/sage/tokens.ts`): colors, spacing, typography, radii, shadows, chart palette
- [x] Build primitive form components: `Input`, `Select`, `Checkbox`, `Radio`, `Textarea`, `Button`
- [x] Build feedback/overlay primitives: `Modal`, `ConfirmDialog`, `Toast` + `ToastProvider`, `LoadingSpinner`, `EmptyState`
- [x] Build data-display primitives: `Table`, `Badge`, `Avatar`, `Card`, `Pagination`, `Tabs`, `Breadcrumbs`, `Dropdown`
- [x] Build icon system (`MaterialIcon`, `FileTypeIcon`)

## Phase 2 — Core chat experience (Employee)
- [x] Build `ChatLayout` (Sidebar + Header + message pane composition)
- [x] Build `ChatBubble` with inline `[[n]]` citation-marker parsing
- [x] Build `MessageActions` (like/dislike, copy, etc. on AI messages)
- [x] Build `DocumentPanel` source viewer, opened from a citation or the Sources list
- [x] Implement `mockAIResponses.ts`: topic keyword table, bilingual response text, citation labels, fallback response
- [x] Implement `EmployeeChatbot` page: send message → simulated delay → AI response → analytics log
- [x] Implement chat history sidebar: seed conversations, Today/Previous-7-Days grouping, rename, delete, new chat
- [x] Add `SearchChatsModal` for searching prior conversations
- [x] Add language toggle (`en`/`ja`) wired through `sageStrings.ts`

## Phase 3 — Document management
- [x] Define `Document` type and `documentStorage` accessor (`storage.ts`)
- [x] Build `DocumentUpload`: drag-and-drop + multi-file browse, required-field validation, dropzone/file-list layout
- [x] Implement auto-archive-on-reupload (`archiveOlderVersions`)
- [x] Build `DocumentList` with search and (system-admin only) department filter
- [x] Implement Active / Archived / Deleted tabs with soft-delete + restore
- [x] Add permanent-delete confirmation flow (`ConfirmDialog`)
- [x] Scope Employee document visibility to non-sensitive, active documents only (`getVisibleForEmployee`)

## Phase 4 — Role-based workspace (Admin / System Admin)
- [x] Define `User` type and `userStorage` accessor, with department-array migration for legacy single-department records
- [x] Build `RoleWorkspace` shared page, parameterized by `role`/`department`
- [x] Implement department-scoped data filtering (`refreshData`) for Admin vs. unscoped for System Admin
- [x] Build `UserManagementTable`: search, department filter, role change, delete
- [x] Build `AddUserModal` with role/department constrained by caller's own role
- [x] Wire management links (Documents / User Management / Analytics) into the shared chat sidebar footer menu, gated by role

## Phase 5 — Analytics (System Admin only)
- [x] Define `QueryEvent` type and `analyticsStorage.log`, deliberately excluding raw question text
- [x] Log one event per chat turn from both `EmployeeChatbot` and `RoleWorkspace`
- [x] Build `Charts.tsx` primitives: `BarChart`, `DonutChart`, `RadarChart`, `Sparkline`
- [x] Build `AnalyticsDashboard`: KPI row (total questions, top topic, docs referenced, fallback rate)
- [x] Add role and date-range (7d/30d/all) filters
- [x] Add topic/document/department/role/language/activity breakdown panels
- [x] Implement rule-based "AI Insights" narrative generation from aggregates
- [x] Add `CreateEventModal` to turn an insight into a scheduled awareness session

## Phase 6 — Demo integrity & polish
- [x] Seed baseline users (6, across all roles/departments) and documents (19, across Active/Archived/Deleted) — `seedUsersAndDocuments`
- [x] Seed baseline analytics history (anchor events matching seeded chats + 90 weighted synthetic events over 30 days) — `seedAnalyticsIfEmpty`
- [x] Implement `resetSageDemoData()` and call it on every `SageApp` mount so no visitor's session persists to the next
- [x] Localize every user-facing string used in Phases 2-5 to `en`/`ja`
- [x] Fix sidebar/table sticky-header and scroll-region rendering bugs (see plan.md's Chromium overflow note in `RoleWorkspace`)
- [x] Replace ad hoc emoji icons with the Material Symbols icon system across all pages

## Explicitly not planned (see spec.md → Simulated / Out of Scope)
- [ ] Real LLM/RAG backend for chat responses
- [ ] Real authentication/authorization instead of a role-switcher UI
- [ ] Real file storage/download for uploaded documents
- [ ] Storybook stories for the component library (`README.md` describes the convention; never implemented)
