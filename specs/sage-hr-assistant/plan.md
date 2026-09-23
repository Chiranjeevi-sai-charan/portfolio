# Implementation Plan: Sage — AI HR Assistant

Companion to [spec.md](./spec.md). Describes *how* the requirements there are
met in the shipped code — architecture, data flow, and key technical
decisions — written the same way plan.md normally is in spec-kit: derived
from and constrained by the spec, not the other way around.

## Architecture

Single-page React app mounted inside the portfolio's router at `/sage` via
`src/pages/sage/SageApp.jsx`. No separate backend, no API layer — the entire
product is client-only.

```
SageApp.jsx                       role switcher shell (public demo only)
├── EmployeeChatbot.tsx           role: user
└── RoleWorkspace.tsx             role: admin | system-admin (shared page, scoped by props)
    ├── ChatLayout                shared chrome: Sidebar + Header + chat pane
    ├── DocumentUpload / DocumentList
    ├── UserManagementTable / AddUserModal
    └── AnalyticsDashboard        system-admin only
```

`EmployeeChatbot` and `RoleWorkspace` are deliberately separate components
rather than one component branching three ways: an Employee's chat has no
department scoping or management links at all, while Admin/System Admin share
~90% of their UI and differ only in *scope* (own department vs. all). Splitting
along that boundary — "does this role manage anything" — kept the shared
`RoleWorkspace` free of Employee-only special-casing.

## State & persistence

- **Source of truth:** `localStorage`, wrapped by typed accessor objects in
  `src/utils/storage.ts` (`documentStorage`, `userStorage`, `analyticsStorage`,
  `conversationStorage`, `appStateStorage`). Every accessor follows the same
  `save/getAll/getById/delete` shape so callers never touch `localStorage`
  directly.
- **Reset-on-load:** `resetSageDemoData()` runs once per mount (`SageApp.jsx`
  `useEffect`), wiping and reseeding all four stores. This was chosen over
  "seed only if empty" specifically because the product is a public demo —
  every visitor must see the same baseline, and nothing they do should leak
  into the next visitor's session.
- **In-memory UI state:** chat messages and the active conversation are plain
  `useState` in `EmployeeChatbot`/`RoleWorkspace`, not persisted — a page
  reload always returns to a blank chat, which is consistent with the
  reset-on-load policy above rather than an oversight.

## AI response simulation

`generateAIResponse()` (`src/utils/mockAIResponses.ts`) does keyword
substring matching against a fixed table of ~7 topics, returning a canned,
pre-localized (`en`/`ja`) string with embedded `[[n]]` citation markers. This
stands in for what would be a retrieval-augmented generation pipeline
(embedding search over real documents → LLM call with sources) in a real
implementation. The simulation was scoped deliberately: it needed to (a) look
identical in the UI to a real RAG response — same citation format, same
typing delay — and (b) drive believable analytics, without requiring an
actual backend or API key for a static portfolio deploy.

`ChatBubble` parses `[[n]]` markers out of the response text and renders them
as clickable numbered references; `citations[n-1]` resolves the source label,
which opens the same `DocumentPanel` as the message's "Sources" list.

## Access scoping

Department scoping is enforced at the data-read boundary, not in the UI:
`RoleWorkspace.refreshData()` (`RoleWorkspace.tsx:92-97`) filters
`documentStorage.getAll()` / `userStorage.getAll()` down to the caller's
department unless `isSystemAdmin`. Because this is a demo with no real auth,
this filtering is a UX/data-shaping concern rather than a security boundary —
documented explicitly in spec.md's Out of Scope section so it isn't mistaken
for one.

## Analytics pipeline

Every chat turn logs one `QueryEvent` (`analyticsStorage.log`) carrying only
`{ topic, citations, role, department, language }` — never the question text.
`AnalyticsDashboard` reads the full event log once (`useMemo`, `getAll()`)
and derives every chart/KPI from client-side aggregation (`Object.entries`
+ `reduce` over the in-memory array) rather than a query API, since the
dataset is capped at 1000 events (`storage.ts:376`) and never leaves the
browser.

The "AI Insights" panel is a second, smaller simulation layer: a handful of
`if` statements over the aggregated counts (top-topic %, fallback rate,
language split) generating templated sentences — not a real LLM summarization
call, chosen for the same static-deploy constraint as the chat responses.

## Internationalization

No i18n library. Every user-facing string is a manually maintained lookup:
`sageStrings.ts` for UI chrome/labels, `mockAIResponses.ts`'s
`TOPIC_LABELS`/`CITATION_LABELS` for chat-specific content. This was a
scope trade-off — two languages, a bounded and known string set, and no
plurals/ICU-message complexity — that didn't justify pulling in `i18next` for
a portfolio demo.

## Design system

All Sage UI reads from one token module, `src/styles/sage/tokens.ts`
(`colors`, `spacing`, `typography`, `borderRadius`, `shadows`,
`interactionTints`, `chartPalette`). Components apply tokens via inline
`style` objects rather than CSS Modules (unlike the rest of the portfolio) —
a deliberate split so the Sage product's styling is self-contained and could,
per `README.md`'s Figma Reverse-Engineering section, be mechanically
re-extracted into a design tool from the TypeScript prop/token definitions
alone.

## Known limitations carried forward from the plan

- No real file upload/storage; a `File` object's metadata is read
  synchronously and discarded (`DocumentUpload.tsx:262-279`).
- No backend means no true multi-department, multi-tenant enforcement beyond
  client-side filtering.
- Storybook is referenced in `README.md` as the intended component-doc
  destination but was never actually set up in this repo.
