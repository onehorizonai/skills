---
name: update-bug
description: Update bug tasks in One Horizon for triage, ownership, status, and fix notes. Use when asked "update this bug", "reassign bug", or "mark bug resolved". Requires One Horizon MCP.
---

# Update Bug

Update an existing bug task.

## Instructions

Call `update-bug`.

```json
update-bug({
  "taskId": "<taskId>",
  "workspaceId": "<workspaceId>",
  "status": "In Progress",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"],
  "description": "## Changes\n- What changed: Fixed stale cache key invalidation in checkout totals\n- Why: Totals were computed with outdated cache entries"
})
```

Use `get-task-details` if you need full prior context before modifying.

When writing back a fix, ensure the bug update includes:
- root cause
- concrete code changes
- why the change was needed
