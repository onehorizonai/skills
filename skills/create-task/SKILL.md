---
name: create-task
description: Capture follow-up work in One Horizon as a personal TODO or roadmap initiative. Use when asked "log this task", "create a todo", "track this small task", "create an initiative", "plan this project", or "start a roadmap initiative". For bugs or feature requests, use report-issue instead. Requires One Horizon MCP.
---

# Create Task

Create a new personal TODO or roadmap initiative.

## Instructions

### Personal TODO

Call `create-todo` for personal follow-up work. Use `initiativeId` to link it back to a roadmap initiative via `PART_OF` relation:

```json
create-todo({
  "title": "Implement HubSpot OAuth callback handler",
  "description": "Handle auth code exchange and token persistence",
  "status": "Planned",
  "workspaceId": "<workspaceId>",
  "initiativeId": "<initiativeId>"
})
```

For completed implementation write-back, create the TODO then add a comment with what changed:

```json
create-todo({
  "title": "Implemented HubSpot lead sync auth + sync",
  "status": "Completed",
  "workspaceId": "<workspaceId>",
  "initiativeId": "<initiativeId>"
})
```

```json
add-task-comment({
  "taskId": "<newTaskId>",
  "source": "skill",
  "comment": "**Changes**\n- What changed: Built OAuth callback flow, sync worker, and retry handling\n- Why: Enable stable end-to-end HubSpot lead sync flow"
})
```

### Roadmap initiative

Call `create-initiative`. Supports `parentInitiativeId` and `taxonomyLabelIds`:

```json
create-initiative({
  "title": "Build HubSpot lead sync integration",
  "description": "OAuth, sync jobs, task mapping, and observability",
  "status": "Planned",
  "workspaceId": "<workspaceId>",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"],
  "parentInitiativeId": "<parentInitiativeId>",
  "taxonomyLabelIds": ["<labelId>"]
})
```
