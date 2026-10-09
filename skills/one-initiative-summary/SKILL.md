---
name: one-initiative-summary
description: Turn initiative data into a concise status update. Use when asked "summarize these initiatives", "give me initiative status", or "prepare initiative update notes". Requires One Horizon MCP.
---

# Initiative Summary

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Summarize initiative progress for status updates.

## Instructions

1. Fetch `list-initiatives`: active statuses across all workspaces by default. Filter `teamIds`, `assigneeIds`, or `statuses` for the requested scope.
2. Lists omit descriptions. Use `get-task-details` for blocked, at-risk, or named initiatives only.
3. Put high-risk items and dependencies first. Include each initiative's status, progress, owner, next steps, and blockers.
4. Follow the requested format and audience: brief for executives, relevant delivery detail for teams.

Use only the data; do not infer progress from titles.
