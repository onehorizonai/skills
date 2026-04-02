---
name: get-task-details
description: Pull the full spec for a single One Horizon task when the list view is too thin. Use when list/recap output is not enough and you need description, full metadata, or exact task context. Requires One Horizon MCP.
---

# Get Task Details

Fetch full details for one task ID.

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
- Supports task type mapping for personal TODOs, initiatives, and bugs.

## Output Notes

`get-task-details` always includes typed label formatting in text output:
- `Goals: ...`
- `Products: ...`
- `Labels: (none)` when no labels exist

Interpret `Products` broadly as product lines, feature areas, or service names.

Structured metadata includes:
- `labelsByType`
- `goals`

Use these fields when matching roadmap context, validating scope, or preparing summaries.
