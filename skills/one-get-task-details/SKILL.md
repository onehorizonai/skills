---
name: one-get-task-details
description: Fetch the full details for one known One Horizon task when the task ID is already available and the user needs exact task context. Prefer one-task-management when details are only one step in a larger operational request. Requires One Horizon MCP.
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
- Supports task type mapping for Todos, initiatives, and bugs.

## Output notes

`get-task-details` always includes typed label formatting in text output:
- `Goals: ...`
- `Products: ...`
- `Skills: ...`

Interpret `Products` broadly as product lines, feature areas, or service names.

Structured metadata includes:
- `goals`
- `products`
- `skills`

Use these fields when matching roadmap labels, validating scope, or preparing summaries.
