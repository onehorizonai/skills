---
name: report-issue
description: Create a One Horizon bug or feature request when the user explicitly wants to log new issue intake and the record type is already clear. Prefer task-management for mixed or ambiguous operational requests. Requires One Horizon MCP.
---

# Report Issue

Create a bug or feature-request intake record.

## Work type boundary

- Bug: use for broken, failing, regressed, or incorrect behavior that needs a fix.
- Feature request: use for a new capability or product ask.
- Do not use this skill for planned roadmap work that should be an initiative.
- Do not use this skill for small private follow-up that should be a personal task.

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

Then use `update-task` when the bug is being picked up.

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
