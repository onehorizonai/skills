---
name: create-task
description: Create a One Horizon personal task or roadmap initiative when the user explicitly asks for that exact record type and the scope is already clear. Prefer task-management for ambiguous or multi-step operational requests. For bugs or feature requests, use report-issue instead. Requires One Horizon MCP.
---

# Create Task

Create a new personal task or roadmap initiative.

## Work type boundary

- Initiative: use for roadmap-first planned work that should tie back to product goals, companies, components, or team progress.
- Personal task: use for simple personal follow-up that only the owner needs to track.
- Do not use this skill to guess between initiative, bug, ongoing work, and personal task from a vague request. Use `task-management` for that.
- Do not use personal tasks as a substitute for roadmap work.
- If the user needs help writing or structuring the initiative first, use `initiative-brief`.

## Instructions

### Personal task

Call `create-todo` for personal follow-up work. Use `initiativeId` to link it back to a roadmap initiative via `PART_OF` relation when the personal task represents a delivered slice of initiative work:

```json
create-todo({
  "title": "Implement HubSpot OAuth callback handler",
  "description": "Handle auth code exchange and token persistence",
  "status": "Planned",
  "workspaceId": "<workspaceId>",
  "initiativeId": "<initiativeId>"
})
```

For completed implementation write-back, create the personal task then add a comment with what changed:

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
