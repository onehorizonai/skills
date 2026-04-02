---
name: search-tasks
description: Search One Horizon tasks by text to find the right initiative, bug, ongoing item, or todo. Use when asked "find tasks about X", "search tasks for Y", "look up work mentioning Z", or "which task mentions this". Returns ranked summary hits, not full task details. Requires One Horizon MCP.
---

# Search Tasks

Find tasks by text within a workspace and return ranked summary matches.

## Instructions

Call `search-tasks` when the user wants to find tasks by title or indexed content.

```json
search-tasks({
  "query": "<query>",
  "workspaceId": "<workspaceId>",
  "categories": ["initiative", "ongoing", "bug", "review-bug", "review-item"],
  "limit": 10
})
```

Notes:
- `query` is required. It matches titles and indexed content.
- `workspaceId` is optional. If omitted, the MCP default workspace is used.
- `categories` is optional. Defaults to `initiative`, `ongoing`, `bug`, `review-bug`, and `review-item`.
- Add `day-task` to `categories` when the user wants personal day-scoped follow-ups included.
- `limit` is optional and defaults to `10`.
- Results are ranked summary hits, not full detail views.
- If a result looks relevant, call `get-task-details` with its `taskId`.
