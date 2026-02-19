---
name: list-completed-work
description: Show completed work items from One Horizon — finished tasks and closed issues. Use when asked "what did I ship", "what did we complete", "what has [person] done", "show completed work", or "what got done last week". Requires One Horizon MCP.
---

# List Completed Work

Fetch completed tasks and closed issues from One Horizon, optionally filtered by date range.

## When to Use

- "What did I complete today / this week / last sprint?"
- "Show what got done in the last 24 hours"
- "What did [person] ship last week?" (use `find-team-member` first)
- "What did the backend team complete this month?"
- "Show me everything closed between [date] and [date]"

## Instructions

Call the `list-completed-work` MCP tool. Route based on what the user asked:

**My own completed work (defaults to last 24 hours):**
```
list-completed-work()
```

**With a date range:**
```
list-completed-work({
  startDate: "2024-01-20T00:00:00Z",
  endDate: "2024-01-26T23:59:59Z"
})
```

**All completed work for a team:**
```
list-completed-work({ teamId: "<teamId>", startDate: "...", endDate: "..." })
```

**A specific team member's completed work:**
```
list-completed-work({ userId: "<userId>", teamId: "<teamId>" })
```

> If you need a userId or teamId, call `find-team-member` first.

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `userId` | string | No | Target user. Requires `teamId`. |
| `teamId` | string | No | Team ID. Alone = team view. With `userId` = member view. |
| `startDate` | string | No | ISO date string. Defaults to 24 hours ago. |
| `endDate` | string | No | ISO date string. Defaults to now. |

## Output

Returns completed tasks and closed issues. Present with title and completion date. Summarize by theme if there are many items.
