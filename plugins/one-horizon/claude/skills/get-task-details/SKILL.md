---
name: get-task-details
description: Get full details for a single task in One Horizon (TODO, INITIATIVE, or BUG). Use when list/recap output is not enough and you need description, full metadata, or exact task context. Requires One Horizon MCP.
---

# Get Task Details

Fetch full task details for one task ID.

## Instructions

Call `get-task-details` with `taskId`.

```json
get-task-details({
  "taskId": "<taskId>",
  "workspaceId": "<workspaceId>"
})
```

Notes:
- `taskId` is required.
- `workspaceId` is optional.
- Supports task type mapping: `TODO | INITIATIVE | BUG`.
