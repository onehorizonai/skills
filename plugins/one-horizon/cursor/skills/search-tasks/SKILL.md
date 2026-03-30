---
name: search-tasks
description: Search tasks by text within a One Horizon workspace. Use when asked "find tasks about X", "search tasks for Y", "look up work mentioning Z", or "which task mentions this". Returns ranked summary hits, not full task details. Requires One Horizon MCP.
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
- `query` is required. It matches task titles and indexed task content.
- `workspaceId` is optional. If omitted, the MCP default workspace is used.
- `categories` is optional. Defaults to `initiative`, `ongoing`, `bug`, `review-bug`, and `review-item`.
- Add `day-task` to `categories` when the user wants day-scoped tasks included.
- `limit` is optional and defaults to `10`.
- Results are ranked summary hits, not full task details.
- If a result looks relevant, call `get-task-details` with its `taskId`.
