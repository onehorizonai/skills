---
name: create-initiative
description: Create an initiative task in One Horizon for larger scoped work. Use when asked "create an initiative", "plan this project", or "start a roadmap initiative". Requires One Horizon MCP.
---

# Create Initiative

Create a new initiative task.

## Instructions

Call `create-initiative`.

```json
create-initiative({
  "title": "Build Asana integration",
  "description": "OAuth, sync jobs, task mapping, and observability",
  "status": "Planned",
  "workspaceId": "<workspaceId>",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"],
  "parentInitiativeId": "<parentInitiativeId>",
  "taxonomyLabelIds": ["<labelId>"]
})
```
