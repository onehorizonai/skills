---
name: report-issue
description: Report a bug or feature request in One Horizon. Use when asked "I found a bug", "track this issue", "log this defect", "log this feature request", "capture this product ask", or "track this enhancement". Requires One Horizon MCP.
---

# Report Issue

Create a bug or feature-request intake task.

## Instructions

### Bug

Call `report-bug`:

```json
report-bug({
  "title": "Checkout fails when coupon and gift card are combined",
  "description": "Repro: apply both on mobile Safari; submit returns 500",
  "workspaceId": "<workspaceId>",
  "teamIds": ["<teamId>"],
  "assigneeIds": ["<userId>"]
})
```

Then use `update-task` when execution starts.

### Feature request

Call `report-feature-request`:

```json
report-feature-request({
  "title": "Allow per-pipeline HubSpot sync toggles",
  "description": "Enterprise admins need workspace-level control",
  "workspaceId": "<workspaceId>",
  "teamIds": ["<teamId>"],
  "assigneeIds": ["<userId>"]
})
```
