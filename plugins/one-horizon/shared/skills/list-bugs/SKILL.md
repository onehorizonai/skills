---
name: list-bugs
description: List bug tasks in One Horizon with optional team/assignee/status filters. Use when asked "show open bugs", "what bugs are active", or "what defects should I pick up". Requires One Horizon MCP.
---

# List Bugs

Fetch bug tasks for triage and execution.

## Instructions

Call `list-bugs`.

```json
list-bugs({
  "workspaceId": "<workspaceId>",
  "statuses": ["Open", "Planned", "In Progress", "In Review"],
  "teamIds": ["<teamId>"],
  "assigneeIds": ["<userId>"]
})
```

If `statuses` is omitted, the tool defaults to active statuses:
- `Open`
- `Planned`
- `In Progress`
- `In Review`

Use `get-task-details` after selection when detailed description or full context is required.
