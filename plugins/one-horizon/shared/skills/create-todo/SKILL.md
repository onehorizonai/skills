---
name: create-todo
description: Create a TODO task in One Horizon, with optional initiative linking. Use when asked to "log this task", "create a todo", "track this small task", or "connect this task to initiative X". Do not use for creating initiatives, bugs, or feature-request intake tasks. Requires One Horizon MCP.
---

# Create Todo

Create a day-level TODO task.

## Instructions

Call `create-todo`.

```json
create-todo({
  "title": "Implement Asana OAuth callback handler",
  "description": "Handle auth code exchange and token persistence",
  "status": "Planned",
  "workspaceId": "<workspaceId>",
  "initiativeId": "<initiativeId>"
})
```

Use `initiativeId` when the task should be linked via `PART_OF` relation.

For implementation write-back, prefer a completed task linked to the initiative:

```json
create-todo({
  "title": "Implemented Asana integration auth + sync",
  "description": "## Changes\n- What changed: Built OAuth callback flow, sync worker, and retry handling\n- Why: Enable stable end-to-end Asana integration flow",
  "status": "Completed",
  "workspaceId": "<workspaceId>",
  "initiativeId": "<initiativeId>"
})
```
