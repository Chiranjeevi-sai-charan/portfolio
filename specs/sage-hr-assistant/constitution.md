# Constitution: Sage — AI HR Assistant

Project-wide principles the Sage product adheres to, extracted from patterns
that hold consistently *across* the codebase rather than being scoped to one
feature. In spec-kit's model, a constitution sits above `spec.md`: any new
feature spec should be checked against these articles rather than each
feature re-deriving its own ground rules. Like the rest of `specs/`, this was
written *after* Sage shipped, by finding the rules the code already follows
everywhere — see spec.md's Provenance note.

## Article I — Client-only, no real backend

Sage has no server, no database, no API. `localStorage` is the only
persistence layer (`src/utils/storage.ts`). Every feature must be
implementable within this constraint: no feature spec may assume a backend
call, a real auth server, or real file storage exists. Where a real product
would need one (AI inference, file storage, authentication), the feature is
built as an explicit, documented simulation rather than a partial or
misleading approximation (see spec.md's Simulated / Out of Scope).

## Article II — Public-demo integrity over persistence

Because any visitor can act as any role, no visitor's action may be allowed
to persist into another visitor's session. `resetSageDemoData()` runs on
every load and wipes/reseeds all state (`storage.ts:821-828`). A feature that
needs state to survive a reload (e.g. "remember my last document filter") is
out of constitutional bounds unless it's scoped to `sessionStorage` or
in-memory state that a reload legitimately clears anyway.

## Article III — Privacy-by-design in anything that logs usage

Any feature that records user activity (currently: analytics) must be
structurally incapable of storing free-text user input — not merely
policy-compliant by convention. `QueryEvent` (`storage.ts:66-76`) has no
field a raw question could be written into; this is enforced by the type,
not by a rule developers must remember. New logging features must follow the
same pattern: derive and store a bounded, categorical signal, never the
verbatim input.

## Article IV — Bilingual by default (en / ja)

Every user-facing string ships with both an English and Japanese variant at
the time a feature is built, not as a follow-up pass. `sageStrings.ts` and
`mockAIResponses.ts`'s `TOPIC_LABELS`/`CITATION_LABELS` hold every string
Sage renders; no component renders a hardcoded English string outside these
tables. A feature spec that introduces new user-facing text must include
its Japanese counterpart before the feature is considered done.

## Article V — Two-step confirmation before irreversible loss

Any action that destroys data must pass through a soft state first
(`status: 'deleted'`, restorable) before a second, explicit, dialog-gated
action makes it permanent (`RoleWorkspace.tsx:462-478`, `ConfirmDialog`).
No feature may wire a destructive action (delete user, permanently remove a
document) directly to a single click.

## Article VI — Access scoping enforced at the data-read boundary

Role/department scoping is applied where data is fetched
(`RoleWorkspace.refreshData`, `storage.ts:210-219`), not by hiding UI
elements while leaving the underlying data reachable. A feature that adds a
new scoped resource must filter it at the same boundary, so scoping can't be
bypassed by an unfiltered read elsewhere in the same feature.

## Article VII — One token system, no arbitrary values

All visual styling reads from `src/styles/sage/tokens.ts` (colors, spacing,
typography, radii, shadows, chart palette). No component may hardcode a
color, spacing, or font-size value that isn't a token. This is what makes
the component library mechanically re-extractable into a design tool
(`README.md`'s Figma Reverse-Engineering section) — an arbitrary inline
value breaks that traceability.

## Article VIII — Documented divergence over silent drift

Where the shipped implementation differs from an earlier plan (e.g. the
`README.md`'s `sage-green-500` primary color and separate
`AdminLayout`/`SystemAdminLayout` files, superseded by `accent-blue` and the
shared `RoleWorkspace.tsx`), the spec/plan documentation is corrected to
match the code — the code is the source of truth, and stale planning docs
are treated as a defect to fix, not a historical record to preserve as-is.

## Amendment process

Since there is no live team shipping against this constitution, "amending"
it means: when a future change to Sage would violate an article above, this
file is updated in the same change that introduces the violation, with a
one-line note on why the article no longer holds. An article should never
silently stop being true.
