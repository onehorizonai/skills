---
name: create-task
description: Create a TODO or initiative task in One Horizon. Use when asked "log this task", "create a todo", "track this small task", "create an initiative", "plan this project", or "start a roadmap initiative". For bugs or feature requests, use report-issue instead. Requires One Horizon MCP.
---

# Create Task

Create a new TODO or initiative.

## Instructions

### TODO

Call `create-todo`. Use `initiativeId` to link via `PART_OF` relation:

```json
create-todo({
  "title": "Implement HubSpot OAuth callback handler",
  "description": "Handle auth code exchange and token persistence",
  "status": "Planned",
  "workspaceId": "<workspaceId>",
  "initiativeId": "<initiativeId>"
})
```

For completed implementation write-back:

```json
create-todo({
  "title": "Implemented HubSpot lead sync auth + sync",
  "description": "## Changes\n- What changed: Built OAuth callback flow, sync worker, and retry handling\n- Why: Enable stable end-to-end HubSpot lead sync flow",
  "status": "Completed",
  "workspaceId": "<workspaceId>",
  "initiativeId": "<initiativeId>"
})
```

Use `Changes/Why` only when the TODO represents completed external implementation work.

### Initiative

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
