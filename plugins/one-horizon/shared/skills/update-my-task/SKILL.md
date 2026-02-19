---
name: update-my-task
description: Update an existing task in One Horizon — change its title, description, status, or topic. Use when asked to "mark this as done", "update my task", "change the status of", or "edit this task". Requires One Horizon MCP.
---

# Update My Task

Update an existing task in One Horizon. You can change the title, description, status, and topic.

## When to Use

- "Mark task [id] as completed"
- "Update the title of my task"
- "Change the status of [task] to In Review"
- "Edit the description of this task"

> You can only update tasks that belong to you.

## Instructions

Call the `update-my-task` MCP tool. Both `taskId` and `workspaceId` are required.

**Mark a task as completed:**
```
update-my-task({
  taskId: "<taskId>",
  workspaceId: "<workspaceId>",
  status: "Completed"
})
```

**Update title and status:**
```
update-my-task({
  taskId: "<taskId>",
  workspaceId: "<workspaceId>",
  title: "Migrated auth service to new OAuth provider",
  status: "Completed"
})
```

> If you don't know the taskId or workspaceId, use `list-planned-work` or `my-work-recap` first to find the task.

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `taskId` | string | **Yes** | ID of the task to update |
| `workspaceId` | string | **Yes** | Workspace the task belongs to |
| `title` | string | No | New title |
| `description` | string | No | New description |
| `status` | string | No | `"Completed"`, `"Planned"`, `"Blocked"`, `"In Review"` |
| `topic` | string | No | 1–3 words, e.g. `"API"`, `"UI"` |
| `completedAt` | string | No | ISO date. Defaults to now when status is Completed |

## Output

Confirm which fields were updated and the task's new state.
