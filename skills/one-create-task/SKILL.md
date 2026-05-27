---
name: one-create-task
description: Create a One Horizon Todo or roadmap initiative when the user asks for that exact work type and the scope is clear. Prefer one-task-management for ambiguous or multi-step operational requests. For bugs or feature requests, use one-report-issue instead. Requires One Horizon MCP.
---

# Create Task

Create a new Todo or roadmap initiative.

## Work type boundary

- Initiative: use for roadmap-first planned work that should tie back to product goals, companies, components, or team progress.
- Todo: use for simple personal follow-up that only the owner needs to track.
- Do not use this skill to guess between initiative, bug, ongoing work, and Todo from a vague request. Use `one-task-management` for that.
- Do not use Todos as a substitute for roadmap work.
- If the user needs help writing or structuring the initiative first, use `one-initiative-brief`.

## Instructions

### Todo

Call `create-todo` for personal follow-up work. Use `initiativeId` to link it back to a roadmap initiative via `PART_OF` relation when the Todo represents a delivered slice of initiative work:

```json
create-todo({
  "title": "Implement HubSpot OAuth callback handler",
  "description": "Handle auth code exchange and token persistence",
  "status": "Planned",
  "topic": "Auth",
  "workspaceId": "<workspaceId>",
  "initiativeId": "<initiativeId>"
})
```

For completed implementation write-back, create the Todo, then add a comment with what changed:

```json
create-todo({
  "title": "Implemented HubSpot lead sync auth + sync",
  "status": "Completed",
  "topic": "Integrations",
  "workspaceId": "<workspaceId>",
  "initiativeId": "<initiativeId>"
})
```

```json
add-task-comment({
  "taskId": "<newTaskId>",
  "source": "skill",
  "workspaceId": "<workspaceId>",
  "content": "**Changes**\n- What changed: Built OAuth callback flow, sync worker, and retry handling\n- Why: Enable stable end-to-end HubSpot lead sync flow"
})
```

### Roadmap initiative

Call `create-initiative` for planned product work that belongs on the roadmap. Supports `parentInitiativeId` and `taxonomyLabelIds`:

```json
create-initiative({
  "title": "Build HubSpot lead sync integration",
  "description": "OAuth, sync jobs, task mapping, and observability",
  "status": "Open",
  "workspaceId": "<workspaceId>",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"],
  "parentInitiativeId": "<parentInitiativeId>",
  "taxonomyLabelIds": ["<labelId>"]
})
```
