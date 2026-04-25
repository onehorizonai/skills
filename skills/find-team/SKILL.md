---
name: find-team
description: Resolve One Horizon team, member, workspace, and identity context. Use when asked "who is on my team", "find Jane's user ID", "which workspace am I in", "list my workspaces", or "who am I". Prefer task-management when team or workspace lookup is only one step in a larger operational request. Requires One Horizon MCP.
---

# Find Team

Resolve team structure, member IDs, workspace IDs, and current user identity for subsequent calls.

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

Use the returned `userId` and `teamId` in `list-work`, `work-recap`, and other team-scoped tools.

## List workspaces

Use when the user has multiple workspaces or when `workspaceId` is unknown. Returns all workspaces with the default MCP workspace marked.

```json
list-workspaces()
```

Use the returned `workspaceId` values in any tool that requires one. The workspace marked `[default]` is the one used when no `workspaceId` is specified.

## Who am I

Use to get the current user's ID, name, email, and role — for example, to pass as `createdBy` or `assigneeIds` in other tools.

```json
who-am-i()
```
