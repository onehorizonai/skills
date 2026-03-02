---
name: report-feature-request
description: Report a feature-request task in One Horizon for product intake. Use when asked "log this feature request", "capture this product ask", or "track this enhancement". Requires One Horizon MCP.
---

# Report Feature Request

Create feature-request intake task.

## Instructions

Call `report-feature-request`.

```json
report-feature-request({
  "title": "Allow per-pipeline HubSpot sync toggles",
  "description": "Enterprise admins need workspace-level control",
  "workspaceId": "<workspaceId>",
  "teamIds": ["<teamId>"],
  "assigneeIds": ["<userId>"]
})
```
