---
name: report-bug
description: Report a bug task in One Horizon for unplanned defects. Use when asked "I found a bug", "track this issue", or "log this defect". Requires One Horizon MCP.
---

# Report Bug

Create bug intake task.

## Instructions

Call `report-bug`.

```json
report-bug({
  "title": "Checkout fails when coupon and gift card are combined",
  "description": "Repro: apply both on mobile Safari; submit returns 500",
  "workspaceId": "<workspaceId>",
  "teamIds": ["<teamId>"],
  "assigneeIds": ["<userId>"]
})
```

Then use `update-bug` and initiative relation tooling when execution starts.
