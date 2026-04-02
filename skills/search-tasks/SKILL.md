---
name: search-tasks
description: Run a literal text search over One Horizon tasks when the user explicitly asks to search by title or indexed content. Prefer task-management when search is only one step in a larger operational request. Returns ranked summary hits, not full task details. Requires One Horizon MCP.
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
