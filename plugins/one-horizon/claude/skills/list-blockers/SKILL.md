---
name: list-blockers
description: Show blocked work items from One Horizon — tasks and issues that are stuck. Use when asked "what's blocking me", "show blockers", "what's blocked on the team", or "what is [person] blocked on". Requires One Horizon MCP.
---

# List Blockers

Fetch blocked tasks and issues from One Horizon.

## When to Use

- "What's blocking me?"
- "Show current blockers"
- "What's the team blocked on?"
- "What is [person] blocked on?" (use `find-team-member` first)
- "Surface any blockers before the standup"

## Instructions

Call the `list-blockers` MCP tool. Route based on scope:

**My own blockers:**
```
list-blockers()
```

**All blockers for a team:**
```
list-blockers({ teamId: "<teamId>" })
```

**A specific team member's blockers:**
```
list-blockers({ userId: "<userId>", teamId: "<teamId>" })
```

> If you need a userId or teamId, call `find-team-member` first.

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `userId` | string | No | Target user. Requires `teamId`. |
| `teamId` | string | No | Team ID. Alone = team view. With `userId` = member view. |

## Output

Returns blocked tasks and issues. Present clearly labelled as blockers. If none are found, confirm there are no current blockers — don't invent them.
