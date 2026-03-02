---
name: update-feature-request
description: Update feature-request tasks in One Horizon for triage, ownership, status, and details. Use when asked "update this feature request", "change request priority", or "assign this enhancement". Requires One Horizon MCP.
---

# Update Feature Request

Update an existing feature-request task.

## Instructions

Call `update-feature-request`.

Append to existing description; do not prepend.

Research/planning update example:

```json
update-feature-request({
  "taskId": "<taskId>",
  "workspaceId": "<workspaceId>",
  "status": "Planned",
  "description": "<existingDescription>\\n\\n---\\n\\n## Update\\n- Summary: Scoped implementation approach and acceptance criteria",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"],
  "title": "Asana integration: configurable sync cadence"
})
```

Use `Changes/Why` only if implementation work was actually delivered. Otherwise append `Update` summary.
