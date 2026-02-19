---
name: list-my-teams
description: List all One Horizon teams and team members the user belongs to. Use when asked "what teams am I on", "show my teams", "who is on my team", "list team members", or when you need a teamId to make another call. Requires One Horizon MCP.
---

# List My Teams

Fetch all workspaces, teams, and team member details for the current user.

## When to Use

- "What teams am I on?"
- "Who is on the platform team?"
- "List my team members"
- Before calling `team-work-recap`, `list-blockers` with a teamId, or any call that requires a teamId or userId you don't already have

## Instructions

Call the `list-my-teams` MCP tool.

```
list-my-teams()
```

**Optional: filter to a specific workspace:**
```
list-my-teams({ workspaceId: "<workspaceId>" })
```

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `workspaceId` | string | No | Filter to a specific workspace |

## Output

Returns workspaces → teams → members, each with their IDs, names, and roles. Use the returned `teamId` and `userId` values in subsequent calls like `team-work-recap` or `find-team-member`.
