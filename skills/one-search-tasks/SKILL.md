---
name: one-search-tasks
description: Run a literal text search over One Horizon tasks when the user explicitly asks to search by title or indexed content. Prefer one-task-management when search is only one step in a larger operational request. Returns ranked summary hits, not full task details. Requires One Horizon MCP.
---

# Search Tasks

Find tasks by text within a workspace and return ranked summary matches.

## Instructions

Call `search-tasks` when the user wants to find tasks by title or indexed content, not when search is only a hidden step in a larger operation.

```json
search-tasks({
  "query": "<query>",
  "workspaceId": "<workspaceId>",
  "categories": ["initiative", "ongoing", "bug", "triage-bug", "triage-item"],
  "limit": 10
})
```

Notes:
- `query` is required. It matches titles and indexed content.
- `workspaceId` is optional. If omitted, the MCP default workspace is used.
- `categories` is optional. Defaults to `initiative`, `ongoing`, `bug`, `triage-bug`, and `triage-item`.
- Accepted categories: `initiative`, `ongoing`, `bug`, `triage-bug`, `triage-item`, `triage-initiative`, `review-bug`, `review-item`, `review-initiative`, `day-task`.
- Add `day-task` to `categories` when the user wants personal day-scoped follow-ups included.
- `limit` is optional and defaults to `10`.
- Results are ranked summary hits, not full detail views.
- If a result looks relevant, call `get-task-details` with its `taskId`.
