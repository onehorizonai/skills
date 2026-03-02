---
name: list-initiatives
description: List initiative tasks in One Horizon, with optional hierarchy and status filtering. Use when asked "what initiatives are active", "find initiative for X", or "show roadmap initiatives". Requires One Horizon MCP.
---

# List Initiatives

Fetch initiative tasks.

## Instructions

Call `list-initiatives`.

```json
list-initiatives({
  "workspaceId": "<workspaceId>",
  "statuses": ["Open", "Planned", "In Progress", "In Review"],
  "includeHierarchy": true
})
```

If `statuses` is omitted, the tool defaults to active statuses:
- `Open`
- `Planned`
- `In Progress`
- `In Review`
