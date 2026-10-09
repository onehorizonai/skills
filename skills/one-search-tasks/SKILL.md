---
name: one-search-tasks
description: Run a literal text search over One Horizon tasks when the user explicitly asks to search by title or indexed content. Prefer one-task-management when search is only one step in a larger operational request. Returns ranked summary hits, not full task details. Requires One Horizon MCP.
---

# Search Tasks

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Run a direct text search for task titles or indexed content. Use `one-task-management` when search is part of a larger operation.

## Instructions

Call `search-tasks` with required `query`, optional `workspaceId` (MCP default if omitted), `categories`, and `limit` (default `10`).

Default categories: `initiative`, `ongoing`, `bug`, `triage-bug`, `triage-item`. Also accepted: `triage-initiative`, `review-bug`, `review-item`, `review-initiative`, `day-task`. Include `day-task` for personal day-scoped follow-ups.

Results are ranked summaries, not full details. Call `get-task-details` with a relevant result's `taskId`.
