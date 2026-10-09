---
name: one-find-team
description: Resolve One Horizon team, member, workspace, and identity context. Use when asked "who is on my team", "find Jane's user ID", "which workspace am I in", "list my workspaces", or "who am I". Prefer one-task-management when team or workspace lookup is only one step in a larger operational request. Requires One Horizon MCP.
---

# Find Team

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Resolve teams, members, workspaces, and identity for One Horizon calls. Use `one-task-management` when lookup is part of a larger operation.

## Instructions

- `list-my-teams`: teams and members; optionally filter by `workspaceId`.
- `find-team-member({ "query": "<name>" })`: find a person. Use returned `userId` and `teamId` in `one-list-work`, `one-work-recap`, or other team-scoped calls.
- `list-workspaces`: use when the workspace is unknown or there are several. The `[default]` workspace is used when `workspaceId` is omitted; pass the ID when required.
- `who-am-i`: current user's ID, name, email, and role; use for fields such as `createdBy` or `assigneeIds`.
