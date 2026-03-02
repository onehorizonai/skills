---
name: update-initiative
description: Update initiative tasks in One Horizon, including status, ownership, parent linkage, and taxonomy labels. Use when asked to "update initiative status", "reassign initiative", or "move this under another initiative". Requires One Horizon MCP.
---

# Update Initiative

Update an existing initiative task.

## Instructions

Call `update-initiative`.

```json
update-initiative({
  "initiativeId": "<initiativeId>",
  "workspaceId": "<workspaceId>",
  "status": "In Progress",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"],
  "parentInitiativeId": "<parentInitiativeId>",
  "taxonomyLabelIds": ["<labelId>"]
})
```

Resolve initiative IDs with `list-initiatives` first when needed.
