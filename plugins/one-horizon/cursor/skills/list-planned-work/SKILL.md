---
name: list-planned-work
description: Show planned work items from One Horizon — tasks, issues, and calendar events. Use when asked "what's on my plate", "show my planned work", "what is the team working on", "what's assigned to me", or "show upcoming work". Requires One Horizon MCP.
---

# List Planned Work

Fetch planned and in-progress tasks, issues, and calendar events from One Horizon.

## When to Use

- "What's on my plate today / this week?"
- "Show my planned work"
- "What is the team working on?"
- "What's [person name] working on?" (use `find-team-member` first to get userId + teamId)
- "Show all open issues for the frontend team"

## Instructions

Call the `list-planned-work` MCP tool. Route based on what the user asked:

**My own work (no arguments):**
```
list-planned-work()
```

**All work for a specific team:**
```
list-planned-work({ teamId: "<teamId>" })
```

**A specific team member's work (requires both):**
```
list-planned-work({ userId: "<userId>", teamId: "<teamId>" })
```

> If you need a userId or teamId, call `find-team-member` first with the person's name.

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `userId` | string | No | Target user's ID. Requires `teamId` when used. |
| `teamId` | string | No | Team ID. Alone = team view. With `userId` = member view. |

## Output

Returns activities across tasks, issues, and calendar events. Present them grouped by type with status and title. If the result is empty, say so — don't invent work items.
