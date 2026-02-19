---
name: team-work-recap
description: Get a full team work recap from One Horizon including what team members completed, planned, and are blocked on. Use when asked for "team recap", "team standup", "what did the team ship", "team status update", or "what is everyone working on". Requires One Horizon MCP.
---

# Team Work Recap

Fetch a comprehensive work recap for your whole team (or a specific team): completed work, planned work, and blockers across all team members.

## When to Use

- "Give me a team recap for last week"
- "What did the team ship this sprint?"
- "Team standup summary"
- "What is everyone working on?"
- "What's the status of the backend team?" (get teamId from `list-my-teams` first)

## Instructions

Call the `team-work-recap` MCP tool.

**All your teams (past 72 hours):**
```
team-work-recap()
```

**Specific team:**
```
team-work-recap({ teamId: "<teamId>" })
```

**With a date range:**
```
team-work-recap({
  teamId: "<teamId>",
  startDate: "2024-01-20T00:00:00Z",
  endDate: "2024-01-26T23:59:59Z"
})
```

> If you don't know the teamId, call `list-my-teams` first.

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `teamId` | string | No | Team ID. If omitted, returns work from all your teams |
| `startDate` | string | No | ISO date string. Defaults to 72 hours ago |
| `endDate` | string | No | ISO date string. Defaults to now |

## Output

Returns completed, planned, and blocked items across team members. Present by section. After presenting, offer to format it as a team standup using `team-standup-prep`.
