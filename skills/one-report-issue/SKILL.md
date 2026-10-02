---
name: one-report-issue
description: Create a One Horizon bug or feature request when work type is clear. Use for "log a bug", "file a feature request", or "report this issue". Prefer one-task-management for ambiguous requests. Requires One Horizon MCP.
---

# Report Issue

Turn a rough defect report or product ask into a clear bug or feature request.

## Core rule

- Understand the user-visible problem before proposing a fix
- Capture concrete behavior, workflow, and scope boundaries — not implementation
- Keep business context brief unless it changes priority
- Default feature requests to feature-level scoping, not roadmap planning
- Put product, customer, company, or component signals in the markdown description when they matter
- For each out-of-scope item, add a short reason so the boundary holds without chat context
- Code fixes and features: goal and why first (for a bug, the expected behavior); point to the code area and existing pattern, not helper call chains or a fix recipe; the repo's conventions decide how it's built; mark constraints required or suggested; name the repo's real validation commands
- Repo accessible: skim agent/contributor docs (`AGENTS.md`, `CONTRIBUTING`), package scripts, or CI for the area, pattern, and checks — enough to point, not to find the root cause or design the fix. Use repo-relative paths, not local checkout paths. Don't add interview questions. No repo: tell the implementer to run the existing checks. Never invent commands or paths
- Simple bugs stay short (aim for ~30 lines): drop sections that would be empty or say "none"

## Metadata

- `report-bug` and `report-feature-request` do not accept taxonomy label IDs
- Taxonomy tagging works for initiatives via `create-initiative` / `update-initiative` only
- If taxonomy context matters, name product, company, customer, component, or segment in the markdown description

## Boundaries

Use when:
- logging a new bug or feature request
- work type is clear enough to skip broader triage

Do not use when:
- the request should be a roadmap initiative, personal follow-up, or operational task
- the user wants to triage, assign, or update existing work

## Conversation

- Ask one question at a time; stop after each answer
- Reuse what the user already said; skip answered questions
- If the user says "just log it" or gives enough detail, fast-track and create the item
- A short background note is enough — do not keep digging for business goals

## Execution order

1. Confirm bug vs feature request
2. Gather missing minimum context
3. Check for duplicates or overlapping work
4. Write the markdown description
5. Confirm create fields are ready
6. Create the item

## Minimum intake

Stop asking once you have the essentials. Put remaining uncertainty in the template's open-questions section.

Bugs:
- what is broken
- where it happens
- expected vs actual behavior
- enough repro detail to act on, or a note that repro is unclear
- at least one way to verify the fix

Feature requests:
- which user or workflow this improves
- what should change
- in scope / out of scope
- at least one observable success condition the user can verify

## Output

- Write markdown before creating the item
- Start with a 1-paragraph TLDR; prefer `###` headings
- Reference related issues or initiatives as markdown links when available

## Bug intake

Ask only missing questions, one at a time:

- What is broken for the user?
- Which workflow, page, or feature is affected?
- Which product or product area?
- Expected vs actual behavior?
- How to reproduce?
- Consistent or intermittent? Recent regression?
- Environment, browser, or app version?
- Who is affected, and how broadly?
- What must not break when fixing this?
- Tied to a specific customer, company, or segment?
- Workaround? Anything explicitly out of scope?

### Duplicate check

1. Extract 3-5 keywords from the defect
2. `search-tasks` for likely matches before creating
3. If a clear duplicate exists, ask whether to add context there instead

### Description format

```markdown
TLDR (2-4 sentences): what is broken and what should happen instead, who it affects, main repro condition, current impact

### Background
One short paragraph on what changed and why it matters

### Affected flow / use case
- Which user or workflow?
- Where in the product? Code area if known (endpoint, component, file)

### Expected behavior
What should happen?

### Actual behavior
What happens instead? Note environment, consistency, regression

### Reproduction
Numbered repro steps
**Verified when:** what confirms the bug is resolved — rerun the repro; code fixes also name the repo's checks and a regression test on the behavior
**Report back:** code fixes only — root cause, what changed, checks run (pre-existing failures called out)

### Invariants
What must not break, including nearby edge cases? Omit if nothing specific

### Known scope / boundaries
What is affected? Out of scope: `- Item — excluded because <reason>`. Fix this bug only — no unrelated refactors

### Evidence, workaround, and open questions
Links, screenshots, logs, workarounds, unconfirmed details
```

### Create

1. Resolve team/assignee metadata if needed
2. Confirm: title, markdown description, workspace, team/assignee metadata
3. `report-bug` with symptom-based title

```json
report-bug({
  "title": "Checkout fails when coupon and gift card are combined",
  "description": "<full bug description in markdown>",
  "workspaceId": "<workspaceId>",
  "teamIds": ["<teamId>"],
  "assigneeIds": ["<userId>"]
})
```

## Feature request intake

Ask only missing questions, one at a time:

- User story or workflow to improve?
- Who is this for in this phase?
- Which product or product area?
- What should they be able to do?
- In scope / out of scope?
- Smallest useful version?
- Observable proof this shipped successfully?
- Tied to a customer, company, or segment?
- Short background worth capturing?

### Related work check

1. Extract 3-5 keywords
2. `search-tasks` for overlapping feature requests or initiatives
3. If strong overlap exists, ask whether to add context there instead

### Description format

```markdown
TLDR (2-4 sentences): goal and why, user/workflow, scope, main boundary

### Background
What is missing today, why now, what happens if nothing changes. Business reason brief and secondary.

### Feature / use case sections
Concrete titles like `### Add Login with Google`. Short paragraph per section: who, what changes, why. Name screen or entry point when it helps locate scope, and the existing pattern or component to build on.

### In scope
Included surfaces, flows, constraints (required vs suggested starting values). Lifecycle and edge cases that apply (loading, empty, error, permissions, cleanup, 0/1/many)

### Out of scope
`- Item — excluded because <reason>`. Adjacent ideas not pulled in. Code work: no unrelated refactors or dependency changes.

### Acceptance criteria
Observable user-verifiable statements — not business metrics; a performance budget needs how to measure it. One end-to-end verification step. Code work: the repo's validation commands, tests that check behavior not internals, and a report-back of what changed, checks run (pre-existing failures called out), and trade-offs.

### Open questions
Decisions or validation still needed
```

### Create

1. Resolve team/assignee metadata if needed
2. Confirm: title, markdown description, workspace, team/assignee metadata
3. `report-feature-request` with capability-based title

```json
report-feature-request({
  "title": "Allow per-pipeline HubSpot sync toggles",
  "description": "<full feature request description in markdown>",
  "workspaceId": "<workspaceId>",
  "teamIds": ["<teamId>"],
  "assigneeIds": ["<userId>"]
})
```
