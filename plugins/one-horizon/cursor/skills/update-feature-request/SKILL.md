---
name: update-feature-request
description: Update feature-request tasks in One Horizon for triage, ownership, status, and details. Use when asked "update this feature request", "change request priority", or "assign this enhancement". Requires One Horizon MCP.
---

# Update Feature Request

Update an existing feature-request task.

## Instructions

Call `update-feature-request`.

```json
update-feature-request({
  "taskId": "<taskId>",
  "workspaceId": "<workspaceId>",
  "status": "Planned",
  "description": "## Changes\n- What changed: Scoped implementation approach and acceptance criteria\n- Why: Clarify delivery path before scheduling",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"],
  "title": "Asana integration: configurable sync cadence"
})
```

When updating feature requests, include a markdown `description` summary, not only status/title changes.
