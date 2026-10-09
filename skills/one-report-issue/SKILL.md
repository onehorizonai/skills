---
name: one-report-issue
description: Create a One Horizon bug or feature request when work type is clear. Use for "log a bug", "file a feature request", or "report this issue". Prefer one-task-management for ambiguous requests. Requires One Horizon MCP.
---

# Report Issue

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Turn a defect or product ask into a bug or feature request. Use `one-task-management` for ambiguous, operational, or existing-work requests; use other skills for roadmap initiatives or personal follow-ups.

## Instructions

1. Confirm bug versus feature request. Understand the user-visible problem before proposing fixes; describe behavior, workflow, and scope rather than implementation.
2. Ask missing questions one at a time, stopping for answers and reusing prior context. Fast-track creation when told "just log it" or enough detail exists. Keep business context brief unless it affects priority.
3. Search for duplicates/overlap with 3-5 keywords via `search-tasks`. For clear duplicates or strong overlap, ask whether to add context there instead.
4. Write markdown with a brief TLDR and `###` headings, linking related work. Put remaining uncertainty in `### Open questions` and give a reason for each out-of-scope item.
5. Resolve needed team/assignee IDs; confirm title, description, workspace, and metadata. Create using the matching tool below.

`report-bug` and `report-feature-request` do not accept taxonomy IDs. If relevant, name products, customers, companies, components, or segments in the description; taxonomy tagging is for initiatives through `create-initiative`/`update-initiative` only.

## Bugs

Minimum: what's broken, where, expected versus actual, actionable repro (or explicitly unclear), and a way to verify the fix. Ask as needed about product/flow, consistency/regression, environment/browser/version, affected users/reach, invariants, customer context, workaround, and exclusions.

Description sections:

- TLDR: failure, affected users, repro trigger, impact
- Background: what changed and why it matters
- Affected flow / use case: user/workflow and location
- Expected behavior; Actual behavior (environment, consistency, regression)
- Reproduction: numbered steps and **Verified when:** success condition
- Invariants, if specific
- Known scope / boundaries, including reasons for exclusions
- Evidence, workaround, and open questions

Call `report-bug` with a symptom-based title, markdown `description`, `workspaceId`, and needed `teamIds`/`assigneeIds`.

## Feature requests

Default to feature-level scope. Minimum: user/workflow, desired change, in/out scope, and observable user-verifiable success. Ask as needed about product, phase audience, smallest useful version, customer context, and brief background.

Description sections:

- TLDR: request, user/workflow, scope, main boundary
- Background: missing behavior, why now, cost of inaction; business context secondary
- Concrete feature / use case headings: who, what changes, why, screen/entry point where helpful
- In scope: surfaces, flows, constraints
- Out of scope: excluded ideas and reasons
- Acceptance criteria: observable user behavior, not metrics; one end-to-end verification step
- Open questions

Call `report-feature-request` with a capability-based title, markdown `description`, `workspaceId`, and needed `teamIds`/`assigneeIds`.
