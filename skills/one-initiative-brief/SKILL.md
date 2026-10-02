---
name: one-initiative-brief
description: Draft a structured initiative brief for roadmap-first planned work in One Horizon. Use for "write an initiative", "draft an initiative brief", "plan this initiative", or "scope this roadmap work". Requires One Horizon MCP.
---

# Initiative Brief

Turn a rough roadmap idea into a clear initiative brief, then create it or finalize an existing draft.

## Core rule

- Understand the problem before proposing solutions; produce a design doc, not code
- Decide mode early and keep it stable:
  - `new initiative` → flow ends in create
  - `existing initiative draft` → flow ends in finalize/update, not create
- Write in markdown; use tables or Mermaid only when they clarify the design
- Preserve existing media in canonical markdown exactly (`![alt](url)`, `[video](url#one-video=1)`, `[youtube](url#one-youtube=1)`, `[figma](url#one-figma=1)`) — do not remove, replace, or normalize unless the user asks
- Edit existing descriptions with `patch-document` + initiative `taskId`; use `update-initiative` for metadata only
- Outcomes and constraints, not implementation — no code, engineering task breakdowns, or estimates
- Code work (a coding agent or developer will build it in a repo): goal and why first; the repo's conventions win over the brief; mark constraints required or suggested; name real validation commands. Skip for GTM, content, or other non-code work
- Default to feature-level scoping unless the user describes broader product/company work
- Business goals are supporting context, not the backbone
- Acceptance criteria: observable, user-verifiable ("user can do X on Y screen")
- Name user-facing surfaces in feature sections
- Out-of-scope items need a short reason so boundaries hold without chat context

## Boundaries

Use when:
- shaping roadmap-first planned work
- initiative needs background, scope, non-goals, risk, or rollout clarity
- user needs a brief others can review and execute from

Do not use when:
- brief is complete and user only wants the record created
- request is a bug, ongoing work, or Todo
- user wants a status update, not a new brief

Other skills:
- `one-create-task` — initiative already clear enough to create directly
- `one-task-management` — operational lookup, assignment, tagging outside this flow
- `one-initiative-summary` — reporting on existing initiatives

## Metadata

- Pull taxonomy before creation when product, customer, company, goal, or component signals exist
- Prefer product labels first; attach goals, components, company/customer labels on high-confidence matches only
- `list-taxonomy` only after scope is stable
- Multiple plausible labels → ask, don't guess
- Clear parent roadmap effort → set `parentInitiativeId`
- Owner/parent in structured metadata — not `Owner:` lines in markdown unless requested
- Related work → URLs or markdown links, not plain text labels

## Conversation

- Open with what they want to build, who it is for, constraints, and ideas they already have
- Interview relentlessly — one question at a time, reuse prior answers — until you have shared understanding; do not draft early
- "Just do it" or fully formed plan → still cover missing design-discovery items and premise challenge before drafting
- Company mode (customers, revenue, GTM) → harder evidence-driven questions
- Take a position during discovery — no filler hedging

## Execution order

1. Confirm initiative-shaped work (not bug, feature request, or Todo)
2. Set mode: existing initiative/task ID/draft → `existing initiative draft`; else → `new initiative`
3. Opening intake + design discovery until shared understanding (or N/A for non-interface work)
4. Check related initiatives and parent linkage
5. Resolve taxonomy after scope is stable
6. Draft brief → resolve metadata gaps → after approval, follow mode end state

## Minimum brief

Draft only after design discovery is complete (or explicitly N/A for non-interface work) and premises are agreed.

Required before draft:
- user/workflow, JTBD, what they are trying to accomplish
- problem and solution direction (solution can be partial or TBD)
- what changes this phase; in/out scope
- what success looks like — observable, user-verifiable
- product (if known)

Put remaining uncertainty in `### Open questions`.

## Output

- Markdown brief, no H1; TLDR paragraph first; `###` major sections, `####` sub-sections
- Tables for tradeoffs/owners/phases; Mermaid for flows/rollout — only when they help
- Related work as URLs or markdown links
- `### Invariants` when behaviors or contracts must not break
- Scale to the work: drop sections that would be empty, say "none", or repeat another

## Phase 1: Context

1. `list-initiatives` (active statuses) + `list-completed-work` for relevant team/workspace
2. Opening intake (one question at a time, skip what's already answered):
   - What do you want to build?
   - Who is it for?
   - Constraints or requirements already fixed?
   - Ideas or directions you already have?
3. Product stage only when adoption changes scope/evidence/rollout (pre-product / has users / has paying customers); skip for internal or website content
4. Background only if unclear: why now, what's not good enough today
5. Scoping questions until answered: who, JTBD, what they are trying to accomplish, in/out scope, smallest useful version, proof of success, short business note
6. Missing taxonomy: product area, customer/company/segment tag
7. Code work, repo accessible: skim `AGENTS.md`/`CONTRIBUTING`, package scripts, Makefile, or CI for the pattern to reuse and the real check commands — inspect, don't add interview questions. No repo: tell the implementer to find and run the existing checks. Never invent commands or paths

## Design discovery

Required for user-facing interfaces, screens, or flows. Skip only when work has no interface surface — note "N/A — no user-facing interface" in the brief.

Cover every item below before drafting. Keep asking until each is answered or explicitly deferred:

- Primary user, JTBD, what they are trying to accomplish
- What success looks like for this interface
- Hard constraints: devices, accessibility, performance budgets, brand guidelines
- Content the interface will contain; what is placeholder vs real

## Phase 2: Related work

1. Extract 3-5 keywords after user states the problem
2. `search-tasks` with `categories: ["initiative"]`; `get-task-details` on hits
3. Strong overlap → `FYI: Related initiative found: [{title}](<url>). Key overlap: {one-line}.` Ask build on prior or start fresh
4. No match → proceed silently
5. Clear parent → propose `parentInitiativeId`

## Phase 3: Landscape (optional)

- Ask consent before external search (generalized terms only, not proprietary/stealth names)
- Skip if unavailable or declined
- Read 2-3 results; note standard approach vs what this conversation suggests
- Useful insight → state plainly; otherwise build on the standard path

## Phase 4: Premise challenge

Get agreement before solutions:

- Right problem? What if we do nothing?
- Existing workflows that partially solve this?
- Scoped as feature/phase, not full product?
- In/out boundaries crisp?
- What must stay true for the user?
- If users/paying customers exist, does evidence support this?

```text
PREMISES:
1. <statement>: agree or disagree?
2. <statement>: agree or disagree?
3. <statement>: agree or disagree?
```

Disagree → revise and loop.

## Phase 5: Brief template

Keep one canonical markdown brief updated through the session.

```markdown
TLDR (2-4 sentences): goal and why, user/workflow, this phase, main boundary

### Problem
Who is affected, what is broken or missing today, why it matters now

### Solution
Proposed direction for this phase — partial or TBD is fine; say what is decided vs still open. Code work: name the existing pattern, component, or area to build on; mark values as required or suggested starting points

### Background
What is changing, why now, cost of inaction. Business reason brief and secondary.

### Design (user-facing work only)
Primary user and JTBD; success for this interface; hard constraints; content (real vs placeholder). Omit if N/A.

### Feature / use case sections
Concrete titles like `### Add Login with Google`. Short paragraph each: who, what changes, why. Name screen/entry point when helpful. No `### User story` heading.

### In scope
Behaviors, surfaces, flows, constraints for this phase. Lifecycle and edge cases that apply (loading, empty, error, permissions, retry, cleanup, 0/1/many)

### Out of scope
`- Item — excluded because <reason>`. Related ideas not pulled in. Code work: no unrelated refactors or dependency changes.

### Acceptance criteria
Observable user-verifiable statements — not business metrics; a performance budget belongs here only with how to measure it. One end-to-end verification step. Code work: the repo's validation commands, plus tests that check behavior, not internals.

### Invariants
What must remain true; omit if nothing specific

### Assumptions, risks, and open questions
Assumptions, blockers, open decisions

### Rollout / handoff
Pilot vs first release vs full rollout; who to inform; post-launch owner. Code work: ask the implementer to report back what changed, checks run, and trade-offs
```

## Finalize

After user approves:

1. Resolve owner, team, taxonomy, parent via `one-find-team` and `list-taxonomy`
2. Brief body follows the Phase 5 template; owner, team, taxonomy, and parent stay in metadata
3. `new initiative` → confirm title, brief, workspace, owner/team, taxonomy → `create-initiative`
4. `existing initiative draft` → `patch-document` for description; `update-initiative` for metadata only
5. Closing question matches mode; never ask "ready to create?" in `existing initiative draft` mode

```json
create-initiative({
  "title": "<initiative name>",
  "description": "<full initiative brief in markdown>",
  "status": "Open",
  "workspaceId": "<workspaceId>",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"],
  "parentInitiativeId": "<parentInitiativeId>",
  "taxonomyLabelIds": ["<productLabelId>", "<customerOrCompanyLabelId>"]
})
```

Post-creation revisions: `patch-document` with precise `ops` (`replace_text`, `insert_before`, `insert_after`, `delete_text`); `update-initiative` for metadata only.
