---
name: task-management
description: Handle operational One Horizon requests that need task lookup, creation, updates, assignment, tagging, or document lookup. Use when asked "mark this done", "assign this", "create a bug", "log a follow-up", "find the task for X", "find the spec for Y", "show comments", or "tag this initiative". Do not use for retros, standups, handoff notes, or stakeholder summaries. Requires One Horizon MCP.
---

# Task Management

Handle messy operational requests over One Horizon tasks by choosing the right lookup, create, update, and comment flow.

## One Horizon work model

- Initiative: roadmap-first planned work. Use for work that moves the product plan forward, usually spans multiple steps or days, and should roll up to goals, products, companies, components, or team reporting. Treat initiatives as agent-ready specs for meaningful product work.
- Bug: unplanned defect, regression, or broken behavior that should be tracked as issue intake and worked like a fix stream rather than planned roadmap expansion.
- Personal task: simple personal follow-up. Use for small, private, owner-level tasks that do not need to show up as roadmap structure for the wider team. A completed implementation slice can also be written back as a personal task linked to an initiative.
- Ongoing work: recurring owner-driven work without a defined end date, such as code reviews, routine support, or inbox maintenance, when the workspace uses that concept. This is not the same as roadmap work.

## Work type heuristic for "create a task"

- If the user describes planned product work that should tie back to the roadmap, default to an initiative.
- If the user describes something broken, failing, regressed, or needing a fix, default to a bug.
- If the user describes recurring operational work like code reviews, support rotation, or ongoing triage, treat it as ongoing work when the workspace already uses that concept.
- If the user describes a small personal reminder or one-off follow-up that only they need to see, default to a personal task.
- If implementation work was done in service of an initiative and the user wants write-back, a completed personal task linked to that initiative is an acceptable delivery record.
- If the user just says "create a task" without enough signal, classify in this order: initiative for roadmap work, bug for defects, ongoing for recurring operational work, personal task for private follow-up.

## Use when

- The user wants to find, inspect, create, assign, tag, or update work.
- The request is operational and may require multiple One Horizon calls.
- IDs, workspace, team, or task type must be resolved before taking action.

## Do not use when

- The user wants a retro, standup update, handoff notes, bug triage notes, or stakeholder summary.
- The main job is narrative output rather than task operations.
- The user wants help drafting or refining a structured initiative brief before creating roadmap work. Use `initiative-brief`.

## Operating rules

- Prefer the smallest action that completes the request.
- Resolve ambiguity before mutating data: identify workspace, task type, assignee, and team as needed.
- Use comments for progress notes or write-back. Do not rewrite descriptions just to log status.
- When editing an initiative description, use `patch-document` with `workspaceId`, `taskId` set to the initiative ID, and precise `ops`. The server resolves or creates the linked content document automatically.
- Prefer precise patch operations over rewriting the entire initiative description.
- Use `update-initiative` only for initiative metadata: `title`, `status`, `assigneeIds`, `teamIds`, `taxonomyLabelIds`, and `parentInitiativeId`.
- If both initiative description and metadata change, do `patch-document(taskId=initiativeId, ...)` first, then `update-initiative(...)`. Call `get-task-details` after the mutations if you need the refreshed full initiative.
- If a patch fails because the target or anchor is stale or missing, call `get-task-details`, then retry with corrected ops.
- If list output is too thin, call `get-task-details` before acting.
- When status changes materially, add a short comment explaining what changed and why.
- If there are multiple plausible task types, infer from the request first and ask one concise clarifying question only when mutation would otherwise be risky.
- If multiple task matches are found, summarize the best matches and ask the user to pick before updating the wrong record.
- If a step fails after earlier steps succeeded, report exactly what changed, what did not, and what input is still missing.
- When the user asks generically to "create a task", infer the work type from roadmap relevance, defect language, recurring nature, and visibility expectations before choosing a tool.
- Do not create a personal task for work that should clearly live on the roadmap.
- Do not create an initiative for private follow-up or routine recurring work.
- If the request sounds like ongoing work but no direct ongoing-work create path is available, explain that distinction and ask one concise question before creating the wrong record type.

## Decision flow

### 1. Resolve scope

- If the user needs team or member IDs, call `find-team`.
- If the user needs to locate existing work by text, call `search-tasks`.
- If the user asks for active, completed, or blocked work rather than a specific item, call `list-work`.
- If the user needs to find a document by name or title, call `find-documents` with the `query` parameter. Combine with optional `taskId`, `types`, or `statuses` filters to narrow results. Treat results as metadata plus `excerpt` only.
- If the user has multiple workspaces or `workspaceId` is ambiguous, call `list-workspaces` to identify the right one.
- If the user's own ID is needed (e.g. for filtering by assignee or creator), call `who-am-i`.

### 2. Inspect before editing

- If the request mentions an existing task but the task ID is missing, search or list first.
- If the action depends on full task context, call `get-task-details`.
- If the action depends on a standalone workspace document body, use `find-documents` only to identify the candidate `documentId`, then call `get-document` for the full content.

### 3. Choose the right mutation path

- Personal follow-up or small owned work: personal task via `create-todo` or `update-todo`
- Roadmap work create: `create-initiative`
- Roadmap initiative metadata edits: `update-initiative`
- Roadmap initiative description edits: `patch-document(taskId=initiativeId, ...)`
- Defect intake or triage: `report-bug` or `update-bug`
- Product ask: `report-feature-request` or `update-feature-request`
- Comments or reactions: `add-task-comment`, `list-task-comments`, `toggle-task-comment-reaction`
- Taxonomy tagging: `list-taxonomy` before `update-initiative`

### Taxonomy policy

- Only look up taxonomy when the user asks to tag, categorize, or align work to goals, products, companies, or components.
- For new initiatives, use taxonomy only when it affects roadmap placement or reporting.
- Do not add taxonomy speculatively.

### 4. Normalize the result

- Confirm what changed.
- Include the task title and status when relevant.
- Call out any follow-up needed, such as unresolved ambiguity or missing ownership.

## Common patterns

### Find or inspect work

1. Use `search-tasks`, `list-work`, or `find-team` to resolve the target.
2. Use `get-task-details` if the user needs full context.
3. To find a standalone workspace document by name or title, call `find-documents` with `query` as a top-level string. Optionally add `taskId`, `types`, or `statuses` to narrow results. Results include IDs, titles, metadata, and `excerpt` only. They omit document bodies:

```json
find-documents({
  "workspaceId": "<workspaceId>",
  "query": "login spec",
  "types": ["spec"],
  "statuses": ["Published"]
})
```

4. If the user needs the full standalone document body, call `get-document` with the selected `documentId`:

```json
get-document({
  "workspaceId": "<workspaceId>",
  "documentId": "<documentId>"
})
```

### Create work

1. Infer whether the request is an initiative, bug, ongoing work case, personal task, or feature request.
2. Resolve assignees, teams, and taxonomy only when needed.
3. If it is ongoing work and there is no direct create path in scope, do not force it into an initiative or personal task without confirming intent.
4. Create the record with the matching tool.

## Classification cues

### Choose initiative when

- The work is planned and should map back to the roadmap.
- The user is describing a spec, project, integration, feature area, or multi-step delivery.
- The work should be visible in rollups, reporting, or strategic planning.
- If the initiative is still fuzzy and the user needs help writing it well, use `initiative-brief` before creating it.

### Choose bug when

- The user reports broken behavior, regressions, failures, incidents, or unexpected behavior to fix.

### Choose personal task when

- The task is a small personal follow-up, reminder, or private next step.
- The task mainly exists so one person can remember or track a simple action.

### Treat as ongoing work when

- The work is recurring, owner-driven, and does not have a clear end state.
- Examples include code reviews, inbox triage, support rotation, and routine maintenance.
- When the workspace uses ongoing work, prefer that framing over roadmap initiative or private personal task.

### Update work

1. Confirm the exact target task.
2. Apply the correct update tool for the task type.
3. For initiative description edits, use `patch-document` with the initiative `taskId`.
4. If both initiative description and metadata change, patch first and then call `update-initiative` for metadata only.
5. If a patch fails because the target or anchor is stale or missing, call `get-task-details` and retry with corrected ops.
6. Call `get-task-details` after the mutations if refreshed initiative content is needed.
7. Add a comment if the change reflects progress, delivery, or a decision.

### Tag or assign work

1. Resolve user, team, or taxonomy IDs first.
2. Update only the relevant fields.
3. Report the new owner or labels in the response.
