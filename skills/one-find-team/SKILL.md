---
name: one-find-team
description: Resolve One Horizon team, member, workspace, and identity context. Use when asked "who is on my team", "find Jane's user ID", "which workspace am I in", "list my workspaces", or "who am I". Prefer one-task-management when team or workspace lookup is only one step in a larger operational request. Requires One Horizon MCP.
---

# Find Team

Resolve team structure, member IDs, workspace IDs, and current user identity for later One Horizon calls.

## List teams and members

```json
list-my-teams()
```

Optional workspace filter:

```json
list-my-teams({ "workspaceId": "<workspaceId>" })
```

## Find a specific person

```json
find-team-member({ "query": "Jane" })
```

Pass the returned `userId` and `teamId` to `one-list-work`, `one-work-recap`, and other team-scoped skills.

## List workspaces

Call this when the user has multiple workspaces or `workspaceId` is unknown. The result marks the default MCP workspace.

```json
list-workspaces()
```

Pass the returned `workspaceId` to tools that require one. The workspace marked `[default]` is used when no `workspaceId` is specified.

## Who am I

Call this to get the current user's ID, name, email, and role, for example when another tool needs `createdBy` or `assigneeIds`.

```json
who-am-i()
```
