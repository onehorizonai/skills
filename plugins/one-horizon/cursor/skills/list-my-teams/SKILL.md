---
name: list-my-teams
description: List workspaces, teams, and members in One Horizon. Use when asked "what teams am I on", "who is on this team", or when you need teamId/userId before running task tools. Requires One Horizon MCP.
---

# List My Teams

Fetch team structure and IDs for follow-up calls.

## Instructions

Call:

```json
list-my-teams()
```

Optional workspace filter:

```json
list-my-teams({ "workspaceId": "<workspaceId>" })
```
