---
name: one-report-issue
description: Create a One Horizon bug or feature request when the user wants new issue intake and the work type is clear. Produces structured reports with observable acceptance criteria and regression constraints optimized for human review and AI execution. Prefer one-task-management for mixed or ambiguous operational requests. Requires One Horizon MCP.
---

# Report Issue

Turn a rough defect report or product ask into a clear bug or feature request.

## Core rule

- Understand the user-visible problem or request before proposing a fix.
- Capture concrete behavior, affected workflow, and scope boundaries. Do not jump straight to implementation.
- Keep business context brief and secondary unless it materially changes priority.
- Default feature requests to feature-level scoping, not broad roadmap planning.
- Capture product, customer, company, or component signals in the markdown description when they matter.
- For each out-of-scope item, include a brief reason so the boundary holds when read without context.

## Metadata rules

- `report-bug` and `report-feature-request` do not accept taxonomy label IDs.
- Taxonomy tagging is currently supported for initiatives through `create-initiative` and `update-initiative`, not bug or feature request report tools.
- If taxonomy context is important for a bug or feature request, include the clear product, company, customer, component, or segment in the markdown description.

## Use when

- The user wants to log a new bug.
- The user wants to log a new feature request.
- The work type is already clear enough to avoid a broader triage flow.

## Do not use when

- The request should become a roadmap initiative instead of a feature request.
- The request is a personal follow-up or operational task.
- The user wants to triage, assign, or update existing work rather than create a new item.

## Conversation rules

- Ask one question at a time and stop after each answer.
- Reuse what the user already said. Skip answered questions.
- If the user says "just log it" or gives enough detail up front, fast-track the intake and create the bug or feature request.
- Do not over-rotate on business goals. A short background note is usually enough.

## Execution order

Follow this sequence to keep the interaction predictable:

1. Confirm whether this is a bug or a feature request.
2. Gather only the missing minimum context for that work type.
3. Check for duplicates or overlapping work.
4. Write the markdown description.
5. Confirm the minimum create fields are ready.
6. Create the bug or feature request.

## Minimum viable intake threshold

Stop asking questions and create the item once you know the essentials.

For bugs:
- what is broken
- where it happens
- expected vs actual behavior
- enough repro detail to make the report actionable, or a clear note that repro is still unclear
- at least one way to verify the fix works (the repro steps should pass after fix)

For feature requests:
- which user or workflow this improves
- what should change
- what is in scope
- what is out of scope
- at least one observable success condition the user can verify

Do not keep asking for business context once the issue is actionable. Put remaining uncertainty in `### Open questions`.

## Output guidance

- Write a short markdown description before creating it.
- Start with a 1-paragraph TLDR.
- Prefer `###` headings for the main sections.
- Use clear feature or workflow language in titles and descriptions.
- If related issues or initiatives are relevant, reference them as markdown links when available.

## Bug intake

### What to learn

Ask only the missing questions, one at a time:

- What is broken for the user?
- Which workflow, page, or feature is affected?
- Which product or product area is this in?
- What should happen?
- What actually happens?
- How do we reproduce it?
- Is this consistent or intermittent — and did it recently start happening, or has it always been this way?
- What environment, browser, or app version is this happening in?
- Who is affected, and how broadly?
- What must not break as a result of fixing this? (existing workflows, adjacent features, integrations)
- Is this tied to a specific customer, company, or segment we should mention?
- Is there a workaround?
- What is explicitly known to be out of scope for this report?

### Duplicate check

1. Extract 3-5 meaningful keywords from the defect.
2. Use `search-tasks` to look for likely matching existing work before creating a new bug.
3. If a clear duplicate exists, say so and ask whether to add context there instead of creating a new bug.

### Description format

```markdown
Short TLDR paragraph:
In 2-4 sentences, summarize what is broken, who it affects, the main repro condition, and the current impact.

### Background
- In one short paragraph: what changed or what is happening now, and why this matters.

### Affected flow / use case
- Which user or workflow is hitting the issue?
- Where in the product does it happen?

### Expected behavior
- What should happen?

### Actual behavior
- What happens instead?
- Include environment, browser, or app version if relevant.
- Note whether it is consistent or intermittent, and whether it is a regression.

### Reproduction
- Numbered repro steps or triggering conditions.
- **Verified when:** state what a fixer should be able to do or see that confirms the bug is resolved (e.g., "following these steps no longer produces the error modal").

### Invariants
- What must not break as a result of fixing this?
- List adjacent workflows, integrations, or behaviors that should remain unaffected.
- Omit this section if nothing specific needs protecting.

### Known scope / boundaries
- What is affected?
- What is explicitly not part of this bug as currently understood? For each item, add a short reason: `- Item — excluded because <reason>`.

### Evidence, workaround, and open questions
- Links, screenshots, logs, or customer reports.
- Any workaround if known.
- Anything still unconfirmed.
```

### Create step

1. Resolve team or assignee metadata if needed.
2. Include clear product, customer, company, component, or segment context in the markdown description when relevant.
3. Before creation, confirm the minimum create fields are ready:
   - title
   - markdown description
   - workspace
   - any clear team/assignee metadata
4. Call `report-bug` with a clear symptom-based title and the markdown description.

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

### What to learn

Ask only the missing questions, one at a time:

- What user story or workflow are we trying to improve?
- Who is this for in this phase?
- Which product or product area is this for?
- What should they be able to do?
- What is definitely in scope?
- What is explicitly out of scope?
- What is the smallest useful version?
- What should a user or tester be able to do or see that proves this shipped successfully?
- Is this tied to a specific customer, company, or segment we should mention?
- Is there a short background note worth capturing?

### Related work check

1. Extract 3-5 meaningful keywords from the request.
2. Use `search-tasks` to look for overlapping feature requests or initiatives.
3. If strong overlap exists, surface it and ask whether to add context there instead of creating a new request.

### Description format

```markdown
Short TLDR paragraph:
In 2-4 sentences, summarize what is being requested, which user or workflow it improves, what this request includes, and the main boundary or constraint.

### Background
- In one short paragraph: what is missing today, why this matters now, and what happens if nothing changes.
- If there is a business reason, keep it brief and secondary.

### Feature / use case sections
- Use concrete section titles such as `### Add Login with Google` or `### Export filtered results`.
- Under each section, write a short paragraph covering who it is for, what changes, and why it matters to that workflow.
- Name the screen, entry point, or surface the change lives on when that helps locate the scope (e.g., "on the Billing settings page" or "in the onboarding email flow").

### In scope
- What is included in this request?
- Which surfaces, flows, or constraints matter?

### Out of scope
- What is explicitly not included? For each item, add a short reason: `- Item — excluded because <reason>`.
- What adjacent ideas should not get pulled into this request?

### Acceptance criteria
- Write observable, user-verifiable statements. Each criterion describes what a user can do or see after this ships.
- Avoid metrics and aspirational outcomes. Prefer: "User can export filtered results as CSV from the Reports page" over "Improve export adoption".
- Include one end-to-end verification step that proves the core use case works.

### Open questions
- What still needs a decision or validation?
```

### Create step

1. Resolve team or assignee metadata if needed.
2. Include clear product, customer, company, component, or segment context in the markdown description when relevant.
3. Before creation, confirm the minimum create fields are ready:
   - title
   - markdown description
   - workspace
   - any clear team/assignee metadata
4. Call `report-feature-request` with a capability-based title and the markdown description.

```json
report-feature-request({
  "title": "Allow per-pipeline HubSpot sync toggles",
  "description": "<full feature request description in markdown>",
  "workspaceId": "<workspaceId>",
  "teamIds": ["<teamId>"],
  "assigneeIds": ["<userId>"]
})
```
