---
name: find-team
description: Resolve One Horizon team and member IDs when the user explicitly asks who is on a team or needs exact IDs. Prefer task-management when team lookup is only one step in a larger operational request. Requires One Horizon MCP.
---

# Find Team

Resolve team structure and member IDs for subsequent calls.

## Instructions

### List teams and members

Call `list-my-teams`:

```json
list-my-teams()
```

Optional workspace filter:

```json
list-my-teams({ "workspaceId": "<workspaceId>" })
```

### Find a specific person

Call `find-team-member`:

```json
find-team-member({ "query": "Jane" })
```

Use returned `userId` and `teamId` in `list-work`, `work-recap`, and other team-scoped tools.
