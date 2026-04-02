---
name: standup-prep
description: Turn recent work into standup talking points for one person or a whole team. Use when asked "prep my standup", "what should I say", "give me my standup update", "team standup summary", or "what should we cover in standup". Requires One Horizon MCP.
---

# Standup Prep

Generate concise standup updates for a person or a team.

## Instructions

### Personal standup

1. Fetch data with `my-work-recap`.
2. Call `personal-standup-prep`:

```json
personal-standup-prep({
  "completedTasks": "<json-array>",
  "plannedTasks": "<json-array>",
  "initiatives": "<json-array>",
  "blockers": "<json-array>",
  "timeframe": "since last standup"
})
```

### Team standup

1. Fetch data with `team-work-recap`.
2. Build member updates.
3. Call `team-standup-prep`:

```json
team-standup-prep({
  "teamMemberUpdates": "<json-array>",
  "team_name": "Platform",
  "timeframe": "yesterday"
})
```
