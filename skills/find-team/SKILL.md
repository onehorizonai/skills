---
name: find-team
description: Find the right team, teammate, or ID before doing anything else in One Horizon. Use when asked "what teams am I on", "who is on this team", or when you need teamId/userId before running other tools. Requires One Horizon MCP.
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
