# Sage — Design System Reference

This documents the design decisions behind the Sage HR-assistant product: the
token system, the component inventory, and the rationale for each — written
to support the case study's **Design Handoff** / **Development Collaboration**
sections, and as an interview-prep reference. Everything below reflects the
actual code in `src/styles/sage/tokens.ts` and `src/components/sage-product/`
as of this writing, not an aspirational spec — where something in the folder
isn't actually live, that's called out explicitly rather than glossed over.

---

## 1. Typography

**Typeface:** `Inter`, with a system-font fallback stack (`-apple-system,
BlinkMacSystemFont, 'Segoe UI', sans-serif`); `Courier New` for any
monospace content.

**Why Inter:**
- Built for UI legibility at small sizes — tall x-height, open apertures, so
  11–14px body text stays readable in dense tables and filter bars.
- Familiar in the enterprise-SaaS category this product sits in (Figma,
  Linear, GitHub) — "looks like software they already trust" is a
  legitimate goal for an HR tool.
- Variable weight range (300–700) covers the whole hierarchy without
  switching families or paying for multiple font files.

**Why a system-font fallback:** if Inter fails to load, the product falls
back to the user's native OS font rather than a browser-default serif — it
degrades gracefully instead of looking broken.

**Type scale** (`typography.fontSize`):

| Token | Size | Used for |
|---|---|---|
| `label-sm` | 11px | Uppercase role badges, chart axis labels |
| `label-md` / `body-xs` | 12px | Table meta text, timestamps, pills |
| `body-sm` | 14px | Secondary body text, form labels |
| `body-md` | 15px | Primary body text (slightly larger than the 14px web default — reads as more considered) |
| `body-lg` | 16px | Chat input, emphasized body text |
| `h4` | 18px | Card/section titles |
| `h3` | 20px | Panel titles |
| `h2` | 24px | Sub-headings |
| `h1` | 32px | Page titles |

Deliberately a content-driven scale (11, 12, 14, 15, 16, 18, 20, 24, 32)
rather than a fixed 1.2×/1.5× ratio — steps are just large enough to
establish hierarchy without making a data-dense dashboard feel like a
marketing page.

---

## 2. Color

### 2.1 Brand vs. interactive color — the "why is a green-named product blue" question

`colors` includes a `sage-green-*` family (`#4CAF50`-based) — that's the
**brand** color, used for the logo/wordmark. It is deliberately **not** the
interactive/action color. Two reasons:

1. **Green is already claimed semantically** inside the product itself —
   it's `success-green` (toast/status success) and
   `statusColors.nonSensitive` (document badges). If the primary button,
   the active nav state, *and* "this succeeded" were all the same green,
   the color would stop carrying distinct meaning.
2. **Blue is the conventional "do this" color** in enterprise UI (Slack,
   Notion, Linear, Salesforce all default to blue for primary actions
   regardless of brand color) — it reads as neutral and trustworthy, which
   matters more for an HR tool handling sensitive employee data than
   green's more "financial/environmental" connotation.

Result: brand identity (green) lives in the logo only; every interactive
surface — buttons, links, active nav, focus rings — runs on
`accent-blue`. Clean separation, no collisions.

### 2.2 The specific blue — `#1A75DB`

This value has a real story, not an aesthetic one. It was originally
`#1F7AE0`. A contrast audit against white measured **4.27:1** — just under
the WCAG AA minimum of 4.5:1 for normal-size text. It was shifted to
`#1A75DB`, which measures **4.55:1** (passing AA) while staying in the same
"electric blue" family, so no other design decision had to change around
it. `accent-blue-hover` (`#1964B8`) and `accent-blue-dark` (`#155093`) are
darker steps of the same hue for pressed/emphasis states.

### 2.3 Neutral scale

A 9-step gray scale (`neutral-50` → `neutral-900`) rather than a single
gray, so hierarchy can be expressed through color as well as size/weight:
primary text at `900`, secondary/meta text at `500`–`600`, borders at
`200`, subtle surface tints at `50`/`100`. `neutral-400` was audited and
found to measure only **2.54:1** against white when used as real text (not
decoration) — every such usage was moved to `neutral-500` (4.84:1) during
the accessibility pass.

### 2.4 Semantic status colors

`statusColors.sensitive` / `.nonSensitive` use **darker text tokens than
the raw semantic colors** on purpose — `success-green`/`error-red` are
sized for white-on-solid buttons, but a badge needs its own text color to
clear 4.5:1 against its own light background tint. This is a real,
intentional divergence from "just reuse the semantic color," documented
inline in `tokens.ts` so a future contributor doesn't "simplify" it back
into a contrast failure.

### 2.5 Chart palette

`chartPalette` is a separate, soft/desaturated set (blue, green, amber,
cyan, purple, pink, teal, slate) used only for Analytics data
visualization. Kept apart from the brand/UI colors deliberately —
these are *categorical data* colors, not *interface state* colors, and
conflating the two would make "this bar is amber" compete visually with
"this button needs attention."

---

## 3. Spacing & sizing — the 4px grid

**Base unit: 4px**, not 8px. The scale (`spacing.xs` → `4xl`) runs
4/8/12/16/24/32/48/64. An 8px-only grid was considered and rejected
because `spacing.md` (12px) is genuinely useful in this UI (compact
padding on pills/rows) and isn't a multiple of 8 — rather than lose that
value, 4px was adopted as the base and the whole product was audited
against it (every `padding`/`margin`/`gap`/`width`/`height` literal was
checked and normalized; the only intentional exceptions are 1px hairline
dividers, which must stay exactly 1px to read as a hairline rather than a
bar).

`borderRadius` mirrors the same discipline: `sm`(4) / `md`(8) / `lg`(12) /
`xl`(16) / `full`(9999) — so a card's corner radius and its internal
padding always come from the same numeric family.

---

## 4. Component inventory — what's actually live

`src/components/sage-product/` contains more files than are actually
rendered by the product. Being precise about which is which matters for
credibility (and was the subject of an explicit cleanup pass this project
went through) — so this list only includes components with confirmed,
traced usage from the real pages:

**Primitives:** `Button`, `Input`, `Select`, `IconButton`, `Badge`,
`MaterialIcon`, `FileTypeIcon`

**Overlays:** `Modal`, `ConfirmDialog`, `Toast` / `ToastProvider`,
`SearchChatsModal`, `CreateEventModal`, `DocumentPanel`

**Feature components:** `ChatBubble`, `MessageActions`, `Sidebar`,
`DocumentList`, `DocumentUpload`, `UserManagementTable`, `AddUserModal`,
`AnalyticsDashboard`, `Charts` (BarChart/DonutChart/RadarChart/Sparkline)

**Layout:** `ChatLayout` (the one shared shell all three roles render
inside)

**Pages:** `RoleWorkspace` (shared by Admin + System Admin),
`EmployeeChatbot`, plus the two thin wrappers `AdminDashboard` /
`SystemAdminDashboard` that just parameterize `RoleWorkspace` with a role.

### Known dead weight (not currently part of the live system)

`Avatar`, `Breadcrumbs`, `Card`, `Checkbox`, `Dropdown`, `EmptyState`,
`Header`, `LoadingSpinner`, `Pagination`, `Radio`, `Table`, `Tabs`,
`Textarea`, `Tooltip` — these files exist in the folder but have **zero**
render call sites anywhere in the app. `Alert`, the old `Badge`, and two
layout components were already removed for this exact reason; this
remaining list is the next round of the same cleanup, not yet done. Worth
naming honestly rather than presenting the whole folder as "the design
system" — a hiring manager who clicks around the repo will find these,
and it's better you flagged it than they catch it.

### Why `IconButton` and `Badge` are shared, not duplicated

Both used to be hand-rolled inline in two different table components —
`DocumentList` and `UserManagementTable` each defined their own
`iconActionButtonStyles`/badge `<span>` with the same visual spec.
Extracted into single components so changing (say) the hover-tint easing
or the badge padding happens once and both tables follow. `Badge` is kept
deliberately presentational-only — it takes an explicit
`backgroundColor`/`color` pair rather than a fixed variant enum, so it
stays decoupled from domain concepts (sensitivity levels, roles); the
caller maps its own data to a color pair and `Badge` just renders it
consistently. (YAGNI note: the previous `Badge` had `removable`/`icon`
props with zero real usages — dropped rather than carried forward
speculatively.)

---

## 5. Internationalization

`src/utils/sageStrings.ts` is the central i18n dictionary (English/
Japanese) for any string that doesn't already have its own local
`STRINGS` object. Convention: **never hardcode a user-visible string** —
either add it to `sageStrings` or, for a component with tightly-scoped
copy, a local `STRINGS[language]` map, and thread a `language` prop down
to it. This was audited end-to-end this session, including toast
messages, `aria-label`/`title` attributes, and `window.prompt` dialogs —
not just visible body copy, since screen-reader-only text is exactly the
kind of thing that quietly stays English if you only test by eye.

---

## 6. Accessibility (WCAG 2.1 AA)

A full audit was run against this product; findings and fixes:

| Issue | Fix |
|---|---|
| `Select` trigger had `outline: none` with no replacement focus style — keyboard focus was invisible | Added a `:focus`-driven box-shadow ring |
| `Modal` had no focus trap, no initial focus, no `role="dialog"`/`aria-modal` | Added all three, plus focus-return-to-trigger on close |
| `Input`/`Select` labels had no `htmlFor`/`id` association | Wired via `useId()` |
| `neutral-400` used as real text measured 2.54:1 | Moved to `neutral-500` (4.84:1) everywhere it was text, not decoration |
| `accent-blue` measured 4.27:1 as text | Shifted to `#1A75DB` (4.55:1) |
| `Select` listbox didn't expose the highlighted option to screen readers | Wired `aria-activedescendant` |

---

## 7. Figma / code-to-design notes

If this repo is ever fed through a Figma-generation agent or MCP-based
reverse-engineering flow: it reads **source**, not rendered CSS, so a
named token reference (`colors['accent-blue']`) resolves to a mappable
Figma Variable while a literal `'#1A75DB'` does not — this is *the*
practical reason the whole codebase was audited to remove hardcoded
colors/radii/shadows in favor of token references (see `tokens.ts`'s
`chartPalette`, `fileTypeColors`, and named shadow tokens like
`shadows.modal`, added specifically so bespoke one-off values still have a
token home). `tokens.json` is kept as a synced, flat JSON mirror of
`tokens.ts` for tools that prefer reading JSON over parsing TypeScript.
Component boundaries help this process too, but in a different way than
tokens do — a shared `Badge` maps to one Figma Component; two
near-identical hand-rolled `<span>`s in different files don't tell a
reverse-engineering tool they're "the same thing" even if they render
identically.

---

## 8. Known gaps (for "what would you improve" answers)

- **Mobile responsiveness** is not implemented — the sidebar doesn't
  collapse and content clips below ~768px. Deliberately deprioritized
  since this is a portfolio artifact reviewed on desktop, not a shipped
  product — but it's a real, known gap, not an oversight to hide.
- **The dead-component list in §4** — next cleanup pass.
- **Toast auto-dismiss + a few icon-only buttons** (`Toast`'s own close
  button) aren't wired to `language` — small, scoped remainder of the i18n
  pass.
