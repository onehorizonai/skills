---
name: get-task-details
description: Fetch the full details for one known One Horizon task when the task ID is already available and the user needs exact task context. Prefer task-management when details are only one step in a larger operational request. Requires One Horizon MCP.
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
- Supports task type mapping for personal tasks, initiatives, and bugs.

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
