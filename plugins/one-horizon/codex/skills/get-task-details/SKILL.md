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

## Output Notes

`get-task-details` always includes typed label formatting in text output:
- `Goals: ...`
- `Products: ...`
- `Labels: (none)` when no labels exist

Interpret `Products` broadly as product lines, feature areas, or service names.

Structured metadata includes:
- `labelsByType`
- `goals`

Use these fields when matching initiative context, validating scope, or preparing summaries.
