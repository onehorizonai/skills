---
name: report-issue
description: Create a One Horizon bug or feature request when the user explicitly wants to log new issue intake and the record type is already clear. Prefer task-management for mixed or ambiguous operational requests. Requires One Horizon MCP.
---

# Report Issue

Turn a rough defect report or product ask into a clean bug or feature-request record.

## Core rule

- Understand the user-visible problem or request before proposing a fix.
- Capture concrete behavior, affected workflow, and scope boundaries. Do not jump straight to implementation.
- Keep business context brief and secondary unless it materially changes priority.
- Default feature requests to feature-level scoping, not broad roadmap planning.
- Pull taxonomy before creation when product, customer, company, or component signals are present.

## Metadata rules

- Use `list-taxonomy` before creation when the affected product, product area, customer, company, segment, or component is clear enough to tag.
- Prefer product labels first.
- Also attach customer or company labels when the issue is clearly tied to a specific account or customer context.
- Use `list-taxonomy` only after the issue type and core scope are clear enough to avoid premature tagging.
- Attach labels only for exact or high-confidence matches.
- If multiple labels are plausible for the same concept, ask one disambiguation question instead of guessing.
- Do not guess taxonomy from weak signals. If the match is unclear, leave it off.

## Use when

- The user wants to log a new bug.
- The user wants to log a new feature request.
- The record type is already clear enough to avoid a broader triage flow.

## Do not use when

- The request should become a roadmap initiative instead of a feature request.
- The request is a personal follow-up or operational task.
- The user wants to triage, assign, or update an existing record rather than create a new one.

## Conversation rules

- Ask one question at a time and stop after each answer.
- Reuse what the user already said. Skip answered questions.
- If the user says "just log it" or gives enough detail up front, fast-track the intake and create the record.
- Do not over-rotate on business goals. A short background note is usually enough.

## Execution order

Follow this sequence to keep the interaction predictable:

1. Confirm whether this is a bug or a feature request.
2. Gather only the missing minimum context for that record type.
3. Check for duplicates or overlapping work.
4. Resolve taxonomy only after the scope is stable.
5. Write the markdown description.
6. Confirm the minimum create fields are ready.
7. Create the record.

## Minimum viable intake threshold

Stop asking questions and create once you know the essentials.

For bugs:
- what is broken
- where it happens
- expected vs actual behavior
- enough repro detail to make the report actionable, or a clear note that repro is still unclear

For feature requests:
- which user or workflow this improves
- what should change
- what is in scope
- what is out of scope

Do not keep asking for business context once the record is actionable. Put remaining uncertainty in `### Open questions`.

## Output guidance

- Write a short markdown description before creating the record.
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
- Who is affected, and how broadly?
- Is this tied to a specific customer, company, or segment we should tag?
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

### Reproduction
- Clear repro steps or triggering conditions.

### Known scope / boundaries
- What is affected?
- What is explicitly not part of this bug as currently understood?

### Evidence, workaround, and open questions
- Links, screenshots, logs, or customer reports.
- Any workaround if known.
- Anything still unconfirmed.
```

### Create step

1. Resolve team or assignee metadata if needed.
2. Use `list-taxonomy` to attach matching product labels first, then customer/company or other relevant labels when the match is clear.
3. Before creation, confirm the minimum create fields are ready:
   - title
   - markdown description
   - workspace
   - any clear team/assignee metadata
   - any clear taxonomy labels
4. Call `report-bug` with a clear symptom-based title and the markdown description.

```json
report-bug({
  "title": "Checkout fails when coupon and gift card are combined",
  "description": "<full bug description in markdown>",
  "workspaceId": "<workspaceId>",
  "teamIds": ["<teamId>"],
  "assigneeIds": ["<userId>"],
  "taxonomyLabelIds": ["<productLabelId>", "<customerOrCompanyLabelId>"]
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
- Is this tied to a specific customer, company, or segment we should tag?
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

### In scope
- What is included in this request?
- Which surfaces, flows, or constraints matter?

### Out of scope
- What is explicitly not included?
- What adjacent ideas should not get pulled into this request?

### Success
- How will we know this request was fulfilled well enough?
- Prefer user and workflow outcomes over business framing.

### Open questions
- What still needs a decision or validation?
```

### Create step

1. Resolve team or assignee metadata if needed.
2. Use `list-taxonomy` to attach matching product labels first, then customer/company or other relevant labels when the match is clear.
3. Before creation, confirm the minimum create fields are ready:
   - title
   - markdown description
   - workspace
   - any clear team/assignee metadata
   - any clear taxonomy labels
4. Call `report-feature-request` with a capability-based title and the markdown description.

```json
report-feature-request({
  "title": "Allow per-pipeline HubSpot sync toggles",
  "description": "<full feature request description in markdown>",
  "workspaceId": "<workspaceId>",
  "teamIds": ["<teamId>"],
  "assigneeIds": ["<userId>"],
  "taxonomyLabelIds": ["<productLabelId>", "<customerOrCompanyLabelId>"]
})
```
