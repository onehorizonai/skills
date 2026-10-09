---
name: one-release-notes
description: Draft release notes for external customers, internal teams, or stakeholders. Use when asked to "write release notes", "draft changelog", "prepare what's new", "summarize this release", or "announce this version". Defaults to external customer-facing copy that excludes internal jargon. Optionally pulls shipped work from One Horizon. Requires One Horizon MCP when sourcing content from workspace data.
---

# Release Notes

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Turn shipped work, a version bump, or a change list into audience-appropriate markdown release notes. Use `one-list-work`/`one-work-recap` for raw work summaries, `one-initiative-brief` for planning, and `one-manage-documents` to save notes when requested. In-flight status, bug reports, and handoffs belong elsewhere.

## Audience

- **External (default):** helpful, direct, benefit-led customer copy. Include visible features/fixes/UX improvements and required deprecation actions; omit refactors, migrations, infrastructure, tests, internal tooling, ticket IDs, and jargon unless there is a direct customer effect.
- **Internal:** specific, searchable engineering/product copy with fixes, migrations, breaking changes, flags, rollout, follow-ups, and known issues; no marketing filler.
- **Stakeholders:** concise business outcomes, adoption signals, launches, risks, and rollout; omit low-level detail and noisy bug lists.

## Discovery and sources

1. Confirm release communication and audience; reuse supplied context. Ask missing questions one at a time and wait for answers. A complete change list or "just write it" means draft immediately.
2. Gather product/surface, version/name/date if relevant, destination (calibrates length/tone), and theme if useful. Draft once audience and product are known, with at least three meaningful changes or explicit instruction to use what's available. Put remaining uncertainty in `### Open questions`.
3. For shipped-work sourcing: resolve unknown workspace via `list-workspaces`; use `list-taxonomy` with `types: ["releases", "products"]` if a release label applies; fetch `list-completed-work` for the window/team/product context. Use `search-tasks` for named releases, initiatives, or versions.
4. Manual lists, spreadsheets, PR summaries, or commit ranges are primary when supplied. Merge and deduplicate if both sources exist.
5. Classify each item: include (audience value), reframe (translate technical work to user outcome), exclude (internal-only, minor, duplicate, not customer-visible). Challenge weak items; omit or ask to reframe. External notes exclude disabled flags, test/dependency/CI/monitoring/admin work without visible impact, and vague "misc improvements" unless public wording is confirmed. Internally useful exclusions belong only in internal/stakeholder notes.
6. Ask unresolved audience questions: external flags/limited rollout, breaking actions, migration/downtime/support paths, internal-only items; internal traceability, flags/migrations/rollout, known issues/follow-ups; stakeholders business outcome, adoption/revenue/retention/risk, and post-launch signals.
7. Before writing, present concise release framing (audience, theme or mixed release, included/excluded counts, breaking changes/actions) and get agreement. Revise disagreements. Fast-track when already instructed to draft.

## Writing

Lead with the reader's changed behavior and why it matters. Make one coherent announcement; curate rather than mirror tickets.

- No H1. Short intro, sentence-case `###` headings, outcome-first bullets with only needed support.
- No trailing periods on any release-note list item. Use straight quotes, sparse em dashes, no emoji or repeated bold bullet labels.
- Put breaking changes/actions near the top. Ticket IDs, PR numbers, and engineer names appear only for internal audiences requesting traceability.
- External copy uses customer language such as "You can now" or "Fixed an issue where"; omit unknown system names, sprint names, codenames, and engineering shorthand.
- Consolidate related fixes and same-outcome changes across devices, browsers, screens, locales, and variants. Split only when behavior, rollout, or required action differs. Avoid comma-separated inventories and repeated "Updated/Fixed/Improved" structures for the same result.
- Name concrete screens/actions/problems, use simple verbs, and vary sentence length. No inflated significance, promotional filler, vague authority without sources, trailing `-ing` pseudo-depth, negative parallelisms, adjective triples, synonym cycling, generic optimism, or chatbot phrases. Avoid AI-heavy terms such as "delve", "pivotal", "seamless", "groundbreaking", "fostering", and "testament".
- Use Mermaid/tables sparingly when they clarify before/after behavior. Stakeholder notes should scan in under a minute; group minor fixes as quality/reliability outcomes.

## Existing note structures

Use the matching structure, keeping each section brief:

- **External:** intro; Highlights (2-5 key changes); New; Improved; Fixed; Deprecations or required actions only when needed; Open questions for uncertainty.
- **Internal:** intro with version/window/themes; Shipped (including migrations/flags/rollout); Breaking changes; Operational follow-ups; Known issues; Traceability only when requested.
- **Stakeholders:** intro; What changed; Why it matters; Rollout status (GA/phased/beta/pilot as relevant); Watch next (metrics, feedback, follow-on work).

## Review and finalize

Before sharing, run a humanizer pass: remove AI patterns, tighten, collapse inventories, keep concrete changes, and remove bullet periods. Check audience comprehension, real changes, visible required actions, destination-appropriate scanning (under 60 seconds), and natural wording. External notes must be suitable for paying customers. Revise failed checks.

After review/approval, offer relevant optional follow-ups: shorter changelog, email intro/subject plus highlights, social announcement, in-app "What's new", support macro/FAQ, or saving to One Horizon. Patch requested edits in place rather than restarting.

If asked to save, call `create-document` with workspace, title `Release notes - <product> <version>`, markdown content, `type: "Requirement"`, and `status: "Draft"` unless completion is requested.
