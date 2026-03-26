---
name: update-task
description: Update any task in One Horizon (TODO, initiative, bug, or feature request). Use when asked "mark this done", "update this task", "reassign", "change status", "update initiative", "update bug", or "update feature request". Requires One Horizon MCP.
---

# Update Task

Update an existing task. Pick the right MCP tool based on task type.

## Shared rules

- Always append to existing description; never prepend or replace.
- If setting status to `Completed`, append a `## Changes` block with root cause / code changes / why. Never send status-only completion updates.
- Use `## Changes` + `Why` only when real implementation work was delivered.
- For research/planning-only progress, append `## Update` with a concise summary.
- Resolve IDs first with `list-work` or `get-task-details` when needed.

## By task type

### TODO

Call `update-todo`:

```json
update-todo({
  "taskId": "<taskId>",
  "workspaceId": "<workspaceId>",
  "status": "Completed",
  "title": "Finalize HubSpot webhook retries",
  "description": "<existingDescription>\\n\\n---\\n\\n## Changes\\n- What changed: Added retry backoff and idempotency guard\\n- Why: Prevent duplicate processing on transient failures"
})
```

### Initiative

Call `update-initiative`. Supports `assigneeIds`, `teamIds`, `parentInitiativeId`, and `taxonomyLabelIds`:

```json
update-initiative({
  "initiativeId": "<initiativeId>",
  "workspaceId": "<workspaceId>",
  "status": "In Progress",
  "description": "<existingDescription>\\n\\n---\\n\\n## Changes\\n- What changed: Implemented OAuth callback and token persistence\\n- Why: Enable first end-to-end auth handshake",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"]
})
```

### Bug

Call `update-bug`. When writing back a fix, include root cause, concrete code changes, and why:

```json
update-bug({
  "taskId": "<taskId>",
  "workspaceId": "<workspaceId>",
  "status": "In Progress",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"],
  "description": "<existingDescription>\\n\\n---\\n\\n## Changes\\n- What changed: Fixed stale cache key invalidation\\n- Why: Totals were computed with outdated cache entries"
})
```

### Feature request

Call `update-feature-request`:

```json
update-feature-request({
  "taskId": "<taskId>",
  "workspaceId": "<workspaceId>",
  "status": "Planned",
  "description": "<existingDescription>\\n\\n---\\n\\n## Update\\n- Summary: Scoped implementation approach and acceptance criteria",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"]
})
```
