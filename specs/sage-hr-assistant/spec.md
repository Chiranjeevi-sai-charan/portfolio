# Feature Specification: Sage — AI HR Assistant

**Status:** Reverse-engineered from the shipped implementation (see `## Provenance` below)
**Feature branch reference:** `feature/sage-my-support-bot`
**Related:** [constitution.md](./constitution.md) · [plan.md](./plan.md) · [tasks.md](./tasks.md)

## Provenance

This spec was written *after* Sage was built, by reading the actual source under
`src/pages/sage/` and `src/components/sage-product/`, not by planning the feature
up front. It documents Sage in the [GitHub spec-kit](https://github.com/github/spec-kit)
format — `spec.md` (what/why) → `plan.md` (how) → `tasks.md` (checklist) — as a
retroactive record of requirements the shipped product actually satisfies, and as a
demonstration of writing to that format. Every requirement below is backed by a
file reference; nothing here is aspirational.

## Overview

Sage is a company-wide AI HR assistant. Employees ask HR policy questions in a
chat interface and get cited answers drawn from company documents. HR Admins
curate the documents and users for their own department. A System Admin has
company-wide oversight plus usage analytics. The whole product runs as an
in-browser demo with no backend: `localStorage` stands in for a database, and
AI responses are keyword-matched canned text rather than a live model call
(see [Simulated / Out of Scope](#simulated--out-of-scope)).

## Users & Roles

Three roles, defined in `src/utils/sageConstants.ts:28` (`ROLE_LABELS`) and
modeled in `src/utils/storage.ts:42` (`User.role: 'user' | 'admin' | 'system-admin'`):

| Role | Label shown in UI | Scope |
|---|---|---|
| `user` | Employee | Can query any department's non-sensitive documents company-wide; cannot manage documents or users |
| `admin` | Admin (HR Admin) | Scoped to their own department (`RoleWorkspace.tsx:57`); manages users and documents within it |
| `system-admin` | System Admin | Unscoped — sees every department's documents, users, and the Analytics dashboard (`RoleWorkspace.tsx:73`, `AnalyticsDashboard.tsx:20`) |

The public demo entry point (`SageApp.jsx:15`) lets a visitor switch between
all three roles from a top-bar selector, rather than requiring login — this is
a demo affordance, not a simulated auth boundary (see Out of Scope).

## User Stories

### US-1 — Employee asks an HR policy question
As an Employee, I want to ask a plain-language HR question and get a cited
answer, so I don't have to search through documents or wait on HR.

**Acceptance criteria:**
- Given I type a message and send it, a response appears after a short delay simulating a live query (`EmployeeChatbot.tsx:139`, 1000ms).
- The response text includes inline numbered citation markers (`[[1]]`, `[[2]]`) tied to specific source documents (`mockAIResponses.ts:7-15`).
- A "Sources" list at the end of the message lets me open the cited document (`ChatBubble`/`DocumentPanel`).
- If my question doesn't match a known topic, I get a fallback response directing me to `hr@company.com` rather than a dead end (`mockAIResponses.ts:171-178`).
- My question can be asked in English or Japanese; the UI and response are localized to my selected language (`sageStrings.ts`, `mockAIResponses.ts:17`).

### US-2 — Employee manages their own chat history
As an Employee, I want to revisit, rename, or delete past conversations, so I can find previous answers without re-asking.

**Acceptance criteria:**
- New conversations are added to a sidebar, grouped into "Today" / "Previous 7 Days" by recency (`EmployeeChatbot.tsx:47-49`).
- I can rename a conversation via a rename action in its context menu (`EmployeeChatbot.tsx:105-113`).
- I can delete a conversation; if it was the active one, the chat resets to a blank state (`EmployeeChatbot.tsx:99-104`).

### US-3 — Employee views documents relevant to them
As an Employee, I want to browse HR documents directly, not just through chat, so I can self-serve without asking a question.

**Acceptance criteria:**
- A "My Documents" view lists every active, non-sensitive document company-wide, regardless of department (`storage.ts:210-219`, `getVisibleForEmployee`).
- Documents marked `Sensitive` are never shown to an Employee (`storage.ts:214`).
- The list supports search (`EmployeeChatbot.tsx:220-225`).

### US-4 — Admin curates documents for their department
As an HR Admin, I want to upload and organize documents for my department, so employees always get answers grounded in current policy.

**Acceptance criteria:**
- Upload supports drag-and-drop or multi-file browse, accepting `.pdf`/`.docx` (`DocumentUpload.tsx:236-248`, `379`).
- Every upload requires department, content type, sensitivity, and a document date before the Upload button is enabled (`DocumentUpload.tsx:250-260`).
- An Admin's department is locked to their own; only a System Admin can choose a different department (`RoleWorkspace.tsx:377-380`).
- Re-uploading a file with the same name and department, dated later than an existing active version, automatically archives the older one (`storage.ts:248-271`, `archiveOlderVersions`).
- Documents move through three lifecycle states — Active, Archived, Deleted — each viewable in its own tab (`RoleWorkspace.tsx:329-334`).
- Deleting a document is soft (status flips to `deleted`, `RoleWorkspace.tsx:182-190`) and reversible via Restore (`RoleWorkspace.tsx:192-197`); a second, explicit confirmation step is required to permanently erase it (`RoleWorkspace.tsx:462-478`, `ConfirmDialog`).

### US-5 — Admin manages users in their department
As an HR Admin, I want to add users and adjust their roles within my department, so access stays current without System Admin involvement.

**Acceptance criteria:**
- An Admin sees and manages only users whose `departments` include their own (`RoleWorkspace.tsx:96`).
- An Admin can promote a user to Admin but not to System Admin (`RoleWorkspace.tsx:504`, `roleOptions`).
- Every add/role-change/delete action shows a confirmation toast naming the user and the new role (`RoleWorkspace.tsx:203-223`).

### US-6 — System Admin oversees the whole organization
As a System Admin, I want visibility and control across every department, so I can manage the org as a whole rather than one silo at a time.

**Acceptance criteria:**
- Documents and users are unfiltered by department for a System Admin (`RoleWorkspace.tsx:95-96`).
- A System Admin can create or promote both Admins and System Admins (`RoleWorkspace.tsx:493`, `504`).
- Only a System Admin sees the Analytics nav entry (`RoleWorkspace.tsx:230`, `235`).

### US-7 — System Admin reviews usage analytics
As a System Admin, I want aggregate insight into what employees are asking, so I can spot documentation gaps and reduce repeat questions — without ever seeing what anyone actually typed.

**Acceptance criteria:**
- The raw question text is never persisted anywhere; only a matched topic category and the citations returned are logged (`storage.ts:59-65`, `QueryEvent`; enforced at every call site, e.g. `RoleWorkspace.tsx:161-169`).
- The dashboard shows: total questions answered, most active topic, distinct documents referenced, and a fallback rate (percentage of questions that hit the uncategorized/default response) (`AnalyticsDashboard.tsx:449-456`, `194-195`).
- Usage can be filtered by role and by date range (7 days / 30 days / all time) (`AnalyticsDashboard.tsx:108-119`).
- Breakdowns are shown by topic, cited document, department, role, language, and activity over time (`AnalyticsDashboard.tsx:481-568`).
- A rule-based "AI Insights" panel surfaces plain-language observations computed from the aggregates (e.g. "38% of questions were about Vacation & Time Off") and lets the admin schedule a follow-up awareness session directly from an insight, producing a real downloadable `.ics` calendar file / Outlook Web deep link — the one genuinely functional file export in the product (`AnalyticsDashboard.tsx:244-283`, `594-614`, `CreateEventModal`).

### US-8 — Visitor explores the product safely as a public demo
As a portfolio visitor, I want to freely try every role — upload files, delete users, edit data — without worrying about breaking the demo for the next visitor.

**Acceptance criteria:**
- On every page load, users, documents, and analytics are wiped and reseeded to a known-good baseline (`storage.ts:821-828`, `resetSageDemoData`, called from `SageApp.jsx:11-13`).
- Seed data includes 6 users across all three roles and all four departments, and 19 documents spanning Active/Archived/Deleted states (`storage.ts:445-728`).
- Baseline analytics history is pre-seeded (90 synthetic events over a 30-day window, weighted toward common HR topics) so the dashboard is never empty on first view (`storage.ts:749-803`).

## Data Model

Defined in `src/utils/storage.ts`; persisted to `localStorage` under keys prefixed `sage_*`.

- **User** — `id, name, email, role ('user'|'admin'|'system-admin'), departments: string[], createdAt` (`storage.ts:42-50`)
- **Document** — `id, name, type, contentType, department, sensitivity ('Sensitive'|'Non-Sensitive'), date, uploadedBy, status ('active'|'archived'|'deleted'), uploadedAt` (`storage.ts:29-40`)
- **QueryEvent** (analytics) — `id, topic, citations: string[], role, department, language ('en'|'ja'), timestamp` — deliberately excludes the raw question (`storage.ts:66-76`)
- **ChatConversation / ChatMessage** — conversation metadata and per-message `citations`, `liked`/`disliked` flags (`storage.ts:10-27`)

Reference/lookup data in `src/utils/sageConstants.ts`:
- Departments: General, Human Resources (HR), Information Technology (IT), Finance & Accounts
- Content types: Policy, Handbook, Guide, Form, Report, FAQ, Other
- Sensitivities: Sensitive, Non-Sensitive

## Non-Functional Requirements

- **Privacy by design (analytics):** raw user input must never be written to any store — only derived topic/citation metadata. This is enforced structurally (no function in `analyticsStorage` accepts free text) rather than by convention alone.
- **Bilingual UI:** every user-facing string in the chat, document, user-management, and analytics surfaces has an English and Japanese variant (`sageStrings.ts`, `mockAIResponses.ts` `CITATION_LABELS`/`TOPIC_LABELS`).
- **Session isolation:** no visitor's edits may persist to another visitor's session; the reset-on-load behavior is the sole mechanism guaranteeing this (no server-side session boundary exists).
- **Soft-delete before hard-delete:** destructive document actions require two distinct steps (delete → permanent delete with confirmation dialog) before data loss is irreversible within a session.

## Simulated / Out of Scope

Documented explicitly so the spec doesn't overclaim what a hiring manager might reasonably infer:

- **No real AI model.** `generateAIResponse` (`mockAIResponses.ts:180-193`) is keyword matching against ~7 hardcoded topics, not an LLM or retrieval pipeline. There is no vector search, no embeddings, no actual document parsing.
- **No backend or auth.** All data lives in `localStorage`; the role switcher is a UI toggle, not an authentication/authorization system. Any "role" is selectable by anyone.
- **No real file storage.** Uploaded files are never persisted or actually stored — `DocumentUpload` records only the file's metadata (name, type, size) as a `Document` row; the file bytes are discarded.
- **No real document downloads.** "Download" actions show a toast (`RoleWorkspace.tsx:392`) rather than serving a file — the calendar export in US-7 is the sole exception.
- **Source document text is fabricated.** Opening a citation's source in `DocumentPanel` shows placeholder paragraph text, not the content of any real uploaded file.
- **README documents features that were never built.** `sage-product/README.md` still names `sage-green-500` as the primary color (the shipped tokens use `accent-blue #1A75DB`) and references separate `AdminLayout.tsx`/`SystemAdminLayout.tsx` files; both roles actually share the single `RoleWorkspace.tsx`. Treat the README as an early plan, not documentation of the shipped state.
- **Storybook is referenced but not present.** The component README (`src/components/sage-product/README.md:167,211`) describes a `sage-product-stories/` Storybook workflow that does not exist in this repo (see project memory: Storybook Gap).

## Success Metrics (as a portfolio case study)

Since there is no real deployment or user base, "success" for this feature is
evaluated as a design/engineering artifact:
- Coverage: every role's primary workflow (ask → cite → curate → analyze) is fully clickable end-to-end in the live demo.
- Fidelity: the component library (`src/components/sage-product/`, 30+ components) follows a single token system (`src/styles/sage/tokens.ts`) rather than ad hoc styles per screen.
- Realism: seed data and analytics are internally consistent (e.g. seeded chat history matches seeded analytics anchors — see `storage.ts:752-756`) so a reviewer doesn't spot disconnected placeholder data.
