---
name: update-todo
description: Update a TODO task in One Horizon. Use when asked to "mark this todo done", "update this task", or "edit this TODO". Do not use for initiatives or bug/feature-request updates. Requires One Horizon MCP.
---

# Update Todo

Update an existing TODO task.

## Instructions

Call `update-todo`.

```json
update-todo({
  "taskId": "<taskId>",
  "workspaceId": "<workspaceId>",
  "status": "Completed",
  "title": "Finalize Asana webhook retries"
})
```

If only a task title is available, resolve IDs with `list-planned-work` first, then call `get-task-details` when description context is needed.
